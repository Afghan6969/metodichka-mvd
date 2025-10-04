import { createClient } from "@/lib/supabase/server";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const supabase = await createClient();

  const { data: user, error } = await supabase
    .from("users")
    .select("id, nickname, username, password_hash, role, created_at")
    .eq("username", username)
    .maybeSingle();

  if (error || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const response = NextResponse.json({
    success: true,
    user: {
      id: user.id,
      nickname: user.nickname,
      username: user.username,
      role: user.role,
      created_at: user.created_at,
    },
  });

  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600,
    path: "/",
  });

  return response;
}