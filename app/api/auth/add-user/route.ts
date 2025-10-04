import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

// Создаём серверный клиент Supabase с service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  console.log("[AddUser API] Request received");
  
  // Проверка переменных окружения
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.JWT_SECRET) {
  console.error("[AddUser API] Missing environment variables");
  return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
}

  try {
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("[AddUser API] Failed to parse request body:", parseError);
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { nickname, username, password, role } = body;
    console.log("[AddUser API] Parsed body:", { nickname, username, role });

    // Получаем JWT из куки
    const token = req.headers.get('cookie')?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) {
      console.error("[AddUser API] No token found");
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    // Декодируем токен
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        username: string;
        role: string;
      };
    } catch (jwtError) {
      console.error("[AddUser API] JWT verification failed:", jwtError);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    console.log("[AddUser API] Token decoded for user:", decoded.id);

    // Проверяем текущего пользователя
    const { data: currentUsers, error: userErr } = await supabase
      .from('users')
      .select('id, nickname, role')
      .eq('id', decoded.id);

    if (userErr || !currentUsers || currentUsers.length === 0) {
      console.error("[AddUser API] Error fetching current user:", userErr);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const currentUser = currentUsers[0];
    console.log("[AddUser API] Current user:", currentUser.nickname, currentUser.role);

    if (!['root', 'moderator-gibdd', 'moderator-guvd'].includes(currentUser.role)) {
      console.error("[AddUser API] User lacks permissions:", currentUser.role);
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Проверяем уникальность username
    const { data: existingUsers, error: existingErr } = await supabase
      .from('users')
      .select('id')
      .eq('username', username);

    if (existingErr) {
      console.error("[AddUser API] Error checking existing user:", existingErr);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

if (existingUsers && existingUsers.length > 0) {
  console.log("[AddUser API] Username already exists:", username);
  return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
}

    // Хэшируем пароль
    const passwordHash = await bcrypt.hash(password, 10);

    // Нормализуем роль
    const validRoles = ["root", "moderator-gibdd", "moderator-guvd", "ss-gibdd", "ss-guvd", "gibdd", "guvd", "none"];
    const normalizedRole = role && validRoles.includes(role.toLowerCase()) ? role.toLowerCase() : "none";

    console.log("[AddUser API] Creating user with role:", normalizedRole);

    // Создаём пользователя
    const { data: newUsers, error: insertErr } = await supabase
      .from('users')
      .insert([{
        nickname,
        username,
        password_hash: passwordHash,
        role: normalizedRole,
        created_by: currentUser.id,
      }])
      .select();

    if (insertErr) {
      console.error("[AddUser API] Error inserting user:", insertErr);
      return NextResponse.json({ error: insertErr.message }, { status: 500 });
    }

    const newUser = newUsers?.[0];
    console.log("[AddUser API] User created successfully:", newUser?.id);

    // Добавляем лог
    const { error: logErr } = await supabase.from('user_logs').insert([{
      action: 'add_user',
      target_user_id: newUser.id,
      target_user_nickname: nickname,
      performed_by_id: currentUser.id,
      performed_by_nickname: currentUser.nickname,
      details: `Добавлен пользователь ${nickname} с ролью ${normalizedRole}`,
    }]);

    if (logErr) {
      console.error("[AddUser API] Error adding log:", logErr);
    }

    return NextResponse.json({ success: true, user: newUser });

  } catch (err: any) {
    console.error("[AddUser API] Exception:", err.message || err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}