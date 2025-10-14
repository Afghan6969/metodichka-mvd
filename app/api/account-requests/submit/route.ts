import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  getClientIp,
  checkRateLimit,
  checkPendingRequest,
  checkLoginExists,
  validateRequestFields,
  verifyCaptcha,
} from "@/lib/spam-protection";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nickname, login, password, role, captchaAnswer, captchaToken } = body;

    // Получаем IP адрес
    const ip = getClientIp(request);
    const userAgent = request.headers.get("user-agent") || "unknown";

    // 1. Проверка CAPTCHA
    if (!captchaAnswer || !captchaToken) {
      return NextResponse.json(
        { error: "Необходимо пройти проверку CAPTCHA" },
        { status: 400 }
      );
    }

    // Простая проверка CAPTCHA (в production лучше использовать reCAPTCHA или hCaptcha)
    const expectedAnswer = captchaToken; // В реальном приложении это должно быть на сервере
    if (!verifyCaptcha(captchaAnswer, expectedAnswer)) {
      return NextResponse.json(
        { error: "Неверный ответ на CAPTCHA" },
        { status: 400 }
      );
    }

    // 2. Валидация полей
    const validation = validateRequestFields({ nickname, login, password, role });
    if (!validation.valid) {
      return NextResponse.json(
        { error: "Ошибка валидации", details: validation.errors },
        { status: 400 }
      );
    }

    // 3. Проверка rate limit
    const rateLimitCheck = await checkRateLimit(ip);
    if (!rateLimitCheck.allowed) {
      return NextResponse.json(
        { error: rateLimitCheck.message || "Превышен лимит запросов" },
        { status: 429 }
      );
    }

    // 4. Проверка наличия pending запроса
    const pendingCheck = await checkPendingRequest(ip);
    if (pendingCheck.hasPending) {
      return NextResponse.json(
        { error: pendingCheck.message || "У вас уже есть активный запрос" },
        { status: 409 }
      );
    }

    // 5. Проверка существования логина
    const loginCheck = await checkLoginExists(login);
    if (loginCheck.exists) {
      return NextResponse.json(
        { error: loginCheck.message || "Логин уже занят" },
        { status: 409 }
      );
    }

    // 6. Хэшируем пароль
    const passwordHash = await bcrypt.hash(password, 10);

    // 7. Создаем запрос
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("account_requests")
      .insert({
        nickname: nickname.trim(),
        login: login.trim().toLowerCase(),
        password_hash: passwordHash,
        role: role?.trim() || null,
        ip_address: ip,
        user_agent: userAgent,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating account request:", error);
      return NextResponse.json(
        { error: "Ошибка при создании запроса" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Запрос успешно отправлен. Ожидайте рассмотрения.",
      requestId: data.id,
    });
  } catch (error) {
    console.error("Account request submission error:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
