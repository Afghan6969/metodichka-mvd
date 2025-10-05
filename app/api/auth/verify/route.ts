import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const token = request.headers.get('cookie')?.match(/auth_token=([^;]+)/)?.[1];
  if (!token) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string; role: string };
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: user } = await supabase
      .from('users')
      .select('id, nickname, username, role, status, created_at')
      .eq('id', decoded.id)
      .single();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    // Проверяем, что пользователь не деактивирован
    if (user.status === 'deactivated') {
      return NextResponse.json({ error: 'Account deactivated' }, { status: 403 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("[Auth] Verify error:", error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}