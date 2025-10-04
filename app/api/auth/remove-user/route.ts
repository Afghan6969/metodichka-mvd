import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    console.log("[RemoveUser API] Request to delete user:", userId);
    
    const supabase = await createClient(); // <- Добавлен await
    
    const { error } = await supabase.from('users').delete().eq('id', userId);
    
    if (error) {
      console.error("[RemoveUser API] Error removing user:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    console.log("[RemoveUser API] User deleted successfully:", userId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[RemoveUser API] Exception:", err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}