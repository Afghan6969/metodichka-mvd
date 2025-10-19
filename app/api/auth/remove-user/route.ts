import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    console.log("[RemoveUser API] Запрос на деактивацию пользователя:", userId);
    
    // Получаем текущего пользователя из токена
    const token = request.headers.get('cookie')?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const currentUserId = decoded.id;
    
    const supabase = await createClient();
    
    // Получаем информацию о текущем пользователе
    const { data: currentUserData } = await supabase
      .from('users')
      .select('nickname, username, role')
      .eq('id', currentUserId)
      .single();
    
    // Получаем информацию о целевом пользователе
    const { data: targetUser } = await supabase
      .from('users')
      .select('nickname, username, role')
      .eq('id', userId)
      .single();
    
    // Защита: запретить root деактивировать super-admin пользователей
    if (String(targetUser?.role) === "super-admin" && String(currentUserData?.role) !== "super-admin") {
      return NextResponse.json({ error: "Cannot deactivate super-admin users" }, { status: 403 });
    }
    
    // Деактивируем пользователя вместо удаления
    const { error } = await supabase
      .from('users')
      .update({ 
        status: 'deactivated',
        deactivated_by: currentUserId,
        deactivated_at: new Date().toISOString()
      })
      .eq('id', userId);
    
    if (error) {
      console.error("[RemoveUser API] Ошибка деактивации пользователя:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Получаем IP адрес
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";

    // Логируем действие
    const logData = {
      user_id: currentUserId,
      action: 'deactivate',
      target_user_id: userId,
      target_user_nickname: targetUser?.nickname || targetUser?.username || 'Неизвестный',
      performed_by_id: currentUserId,
      performed_by_nickname: currentUserData?.nickname || currentUserData?.username || 'Неизвестный',
      details: `Деактивирован пользователь ${targetUser?.nickname || targetUser?.username || userId}`,
      ip_address: ip,
    };
    
    console.log("[RemoveUser API] Вставляем лог:", logData);
    
    const { error: logError } = await supabase.from('user_logs').insert(logData);
    
    if (logError) {
      console.error("[RemoveUser API] Ошибка вставки лога:", logError);
      // Не блокируем деактивацию, если лог не записался
    } else {
      console.log("[RemoveUser API] Лог успешно вставлен");
    }
    
    console.log("[RemoveUser API] Пользователь успешно деактивирован:", userId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[RemoveUser API] Исключение:", err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}