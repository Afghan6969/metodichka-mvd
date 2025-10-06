import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    // Проверяем авторизацию
    const token = request.headers.get('cookie')?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) {
      console.error('No auth token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role?: string };
    } catch (e) {
      console.error('Invalid token:', e);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const supabase = await createClient();

    // Получаем актуальную роль из базы данных
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role, status')
      .eq('id', decoded.id)
      .single();

    if (userError || !userData) {
      console.error('User not found:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Проверяем статус пользователя
    if (userData.status === 'deactivated') {
      console.error('User is deactivated:', decoded.id);
      return NextResponse.json({ error: 'Account deactivated' }, { status: 403 });
    }

    // Проверяем права доступа (только те, кто может управлять пользователями)
    const allowedRoles = ['root', 'gs-gibdd', 'pgs-gibdd', 'gs-guvd', 'pgs-guvd'];
    if (!userData.role || !allowedRoles.includes(userData.role)) {
      console.error('Insufficient permissions:', userData.role);
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { data, error } = await supabase
      .from('user_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user logs:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('User logs fetched:', data?.length || 0, 'records for user:', decoded.id);
    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error('Error in /api/auth/user-logs:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}