import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('user_logs').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }); // Изменено: оборачиваем в { data }
  } catch (err) {
    console.error('Error in /api/auth/user-logs:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}