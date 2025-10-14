import { createClient } from "@/lib/supabase/server";

/**
 * Получает IP адрес из запроса
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
  return ip;
}

/**
 * Проверяет rate limit для IP адреса
 */
export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }> {
  const supabase = await createClient();

  // Вызываем функцию проверки rate limit
  const { data, error } = await supabase.rpc("check_rate_limit", {
    p_ip_address: ip,
  });

  if (error) {
    console.error("Rate limit check error:", error);
    // В случае ошибки разрешаем запрос, чтобы не блокировать легитимных пользователей
    return { allowed: true };
  }

  if (!data) {
    return {
      allowed: false,
      message: "Превышен лимит запросов. Вы можете отправить только 3 запроса в течение 24 часов.",
    };
  }

  return { allowed: true };
}

/**
 * Проверяет, есть ли уже pending запрос от этого IP за последние 24 часа
 */
export async function checkPendingRequest(ip: string): Promise<{ hasPending: boolean; message?: string }> {
  const supabase = await createClient();

  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  const { data, error } = await supabase
    .from("account_requests")
    .select("id, created_at")
    .eq("ip_address", ip)
    .eq("status", "pending")
    .gte("created_at", twentyFourHoursAgo.toISOString())
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    console.error("Pending request check error:", error);
    return { hasPending: false };
  }

  if (data) {
    return {
      hasPending: true,
      message: "У вас уже есть активный запрос. Дождитесь его рассмотрения.",
    };
  }

  return { hasPending: false };
}

/**
 * Проверяет, существует ли уже пользователь с таким логином
 */
export async function checkLoginExists(login: string): Promise<{ exists: boolean; message?: string }> {
  const supabase = await createClient();

  // Проверяем в таблице users
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("login", login)
    .maybeSingle();

  if (user) {
    return {
      exists: true,
      message: "Пользователь с таким логином уже существует.",
    };
  }

  // Проверяем в таблице account_requests (pending и approved)
  const { data: request } = await supabase
    .from("account_requests")
    .select("id, status")
    .eq("login", login)
    .in("status", ["pending", "approved"])
    .maybeSingle();

  if (request) {
    return {
      exists: true,
      message: request.status === "pending" 
        ? "Запрос с таким логином уже существует и ожидает рассмотрения."
        : "Этот логин уже занят.",
    };
  }

  return { exists: false };
}

/**
 * Валидация полей запроса
 */
export function validateRequestFields(data: {
  nickname: string;
  login: string;
  password: string;
  role?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Проверка nickname
  if (!data.nickname || data.nickname.trim().length === 0) {
    errors.push("Ник обязателен для заполнения");
  }
  if (data.nickname && data.nickname.length > 50) {
    errors.push("Ник не должен превышать 50 символов");
  }
  if (data.nickname && !/^[a-zA-Zа-яА-ЯёЁ_\-]+$/.test(data.nickname)) {
    errors.push("Ник может содержать только буквы, дефисы и подчеркивания");
  }

  // Проверка login
  if (!data.login || data.login.trim().length === 0) {
    errors.push("Логин обязателен для заполнения");
  }
  if (data.login && data.login.length > 30) {
    errors.push("Логин не должен превышать 30 символов");
  }
  if (data.login && !/^[a-zA-Z0-9_\-]+$/.test(data.login)) {
    errors.push("Логин может содержать только латинские буквы, цифры, дефисы и подчеркивания");
  }

  // Проверка password
  if (!data.password || data.password.length === 0) {
    errors.push("Пароль обязателен для заполнения");
  }
  if (data.password && data.password.length > 100) {
    errors.push("Пароль не должен превышать 100 символов");
  }

  // Проверка role (опционально)
  if (data.role && data.role.length > 50) {
    errors.push("Роль не должна превышать 50 символов");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Простая CAPTCHA проверка (можно заменить на reCAPTCHA или hCaptcha)
 */
export function verifyCaptcha(captchaAnswer: string, expectedAnswer: string): boolean {
  return captchaAnswer.toLowerCase().trim() === expectedAnswer.toLowerCase().trim();
}
