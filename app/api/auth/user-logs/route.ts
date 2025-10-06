import { createClient as createServerClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    // Проверяем авторизацию
    const token = request.headers.get('cookie')?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) {
      console.error('[user-logs] No auth token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role?: string };
      console.log('[user-logs] Token decoded, user ID:', decoded.id);
    } catch (e) {
      console.error('[user-logs] Invalid token:', e);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Используем service role для обхода RLS
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Получаем актуальную роль из базы данных
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role, status')
      .eq('id', decoded.id)
      .single();

    if (userError || !userData) {
      console.error('[user-logs] User not found:', decoded.id, userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('[user-logs] User role:', userData.role, 'status:', userData.status);

    // Проверяем статус пользователя
    if (userData.status === 'deactivated') {
      console.error('[user-logs] User is deactivated:', decoded.id);
      return NextResponse.json({ error: 'Account deactivated' }, { status: 403 });
    }

    // Проверяем права доступа (только те, кто может управлять пользователями)
    const allowedRoles = ['root', 'gs-gibdd', 'pgs-gibdd', 'gs-guvd', 'pgs-guvd'];
    if (!userData.role || !allowedRoles.includes(userData.role)) {
      console.error('[user-logs] Insufficient permissions:', userData.role);
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('user_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[user-logs] Error fetching logs:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('[user-logs] Success! Fetched', data?.length || 0, 'records for user:', decoded.id, 'role:', userData.role);
    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error('[user-logs] Exception:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}