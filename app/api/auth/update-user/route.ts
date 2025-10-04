import { createClient } from '@/lib/supabase/server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { userId, username, password, role } = await request.json();
    console.log("[UpdateUser API] Request received:", { userId, username, role });
    
    const token = request.headers.get('cookie')?.match(/auth_token=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json({ error: 'No token' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string; role: string };
    const supabase = await createClient();
    
    const normalizedRole = ["root", "moderator-gibdd", "moderator-guvd", "ss-gibdd", "ss-guvd", "gibdd", "guvd", "none"].includes(role.toLowerCase()) ? role.toLowerCase() : "none";

    // Проверка прав
    const { data: currentUser } = await supabase
      .from('users')
      .select('id, nickname, role')
      .eq('id', decoded.id)
      .single();

    if (!currentUser || !['root', 'moderator-gibdd', 'moderator-guvd'].includes(currentUser.role)) {
      console.error("[UpdateUser API] Unauthorized:", currentUser?.role);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Проверка существующего пользователя
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .neq('id', userId)
      .maybeSingle();

    if (existingUser) {
      console.log("[UpdateUser API] Username already exists:", username);
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Получение текущих данных пользователя
    const { data: oldUserData } = await supabase
      .from('users')
      .select('nickname, username, role')
      .eq('id', userId)
      .single();

    if (!oldUserData) {
      console.error("[UpdateUser API] User not found:", userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Обновление пользователя
    const updates: { username: string; role: string; password_hash?: string } = {
      username,
      role: normalizedRole,
    };

    if (password) {
      updates.password_hash = await bcrypt.hash(password, 10);
    }

    const { error } = await supabase.from('users').update(updates).eq('id', userId);

    if (error) {
      console.error("[UpdateUser API] Error updating user:", error);
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    // Логирование действия
    const changes: string[] = [];
    if (oldUserData.username !== username) changes.push(`логин: ${oldUserData.username} → ${username}`);
    if (oldUserData.role !== normalizedRole) changes.push(`роль: ${oldUserData.role} → ${normalizedRole}`);
    if (password) changes.push('пароль изменён');

    await supabase.from('user_logs').insert([
      {
        action: 'update_user',
        target_user_id: userId,
        target_user_nickname: oldUserData.nickname,
        performed_by_id: currentUser.id,
        performed_by_nickname: currentUser.nickname,
        details: `Изменён пользователь ${oldUserData.nickname}: ${changes.join(', ')}`,
      },
    ]);

    console.log("[UpdateUser API] User updated successfully:", userId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[UpdateUser API] Exception:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}