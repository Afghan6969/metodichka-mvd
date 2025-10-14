import { createClient } from "@/lib/supabase/server";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  const { username, password } = await request.json();

  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, nickname, username, password_hash, role, status, created_at")
    .eq("username", username)
    .maybeSingle();

  if (error || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Проверяем, что пользователь не деактивирован
  if (user.status === "deactivated") {
    return NextResponse.json({ error: "Account deactivated" }, { status: 403 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
  );

  // Получаем IP адрес
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";

  // Логируем вход
  await supabase.from("user_logs").insert({
    action: "login",
    target_user_id: user.id,
    target_user_nickname: user.nickname,
    performed_by_id: user.id,
    performed_by_nickname: user.nickname,
    details: `Успешный вход в систему`,
    ip_address: ip,
  });

  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      nickname: user.nickname,
      username: user.username,
      role: user.role,
      status: user.status || "active",
      created_at: user.created_at,
    },
  });

  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 172800, // ⏰ 48 часов = 48 * 60 * 60 секунд
    path: "/",
  });

  return response;
}