import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('system_settings')
      .select('setting_value')
      .eq('setting_key', 'bug_reports_enabled')
      .single();

    if (error) {
      console.error('Error fetching bug reports settings:', error);
      return NextResponse.json({ enabled: true }); // Default to enabled
    }

    return NextResponse.json({ enabled: data?.setting_value?.enabled ?? true });
  } catch (error) {
    console.error('Error in GET /api/settings/bug-reports:', error);
    return NextResponse.json({ enabled: true }); // Default to enabled
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let decoded: { id: string; username: string; role: string };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; username: string; role: string };
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (decoded.role !== 'super-admin') {
      return NextResponse.json({ error: 'Forbidden: Super admin access required' }, { status: 403 });
    }

    const { enabled } = await request.json();

    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'Invalid enabled value' }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase
      .from('system_settings')
      .update({ 
        setting_value: { enabled },
        updated_by: decoded.id 
      })
      .eq('setting_key', 'bug_reports_enabled');

    if (error) {
      console.error('Error updating bug reports settings:', error);
      return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }

    return NextResponse.json({ success: true, enabled });
  } catch (error) {
    console.error('Error in PATCH /api/settings/bug-reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
