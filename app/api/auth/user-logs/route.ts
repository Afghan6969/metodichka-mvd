import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('user_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user logs:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('User logs fetched:', data?.length || 0, 'records');
    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error('Error in /api/auth/user-logs:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}