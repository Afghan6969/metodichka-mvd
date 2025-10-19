import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from "@/lib/supabase/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  // Получаем текущего пользователя из токена
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  let userId = null;
  let userNickname = "Неизвестный";

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string };
      userId = decoded.id;
      
      // Получаем nickname пользователя
      const supabase = await createClient();
      const { data: user } = await supabase
        .from("users")
        .select("nickname")
        .eq("id", userId)
        .single();
      
      if (user) {
        userNickname = user.nickname;
      }

      // Получаем IP адрес
      const forwarded = request.headers.get("x-forwarded-for");
      const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";

      // Логируем выход
      await supabase.from("user_logs").insert({
        action: "logout",
        target_user_id: userId,
        target_user_nickname: userNickname,
        performed_by_id: userId,
        performed_by_nickname: userNickname,
        details: `Выход из системы`,
        ip_address: ip,
      });
    } catch (error) {
      console.error("Ошибка логирования выхода:", error);
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    maxAge: 0,
    path: '/',
  });
  return response;
}