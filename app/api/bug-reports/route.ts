import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import type { CreateBugReportData } from '@/types/bug-reports';

export async function GET(request: Request) {
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

    const supabase = await createClient();

    const isSuperAdmin = decoded.role === 'super-admin';
    const leadershipRoles = ['super-admin', 'root', 'gs-gibdd', 'gs-guvd', 'pgs-gibdd', 'pgs-guvd'];
    const canViewAll = leadershipRoles.includes(decoded.role);

    // Get bug reports with user information
    let query = supabase
      .from('bug_reports')
      .select('*')
      .order('created_at', { ascending: false });

    // If not leadership, only show own reports
    if (!canViewAll) {
      query = query.eq('user_id', decoded.id);
    }

    const { data: reports, error: reportsError } = await query;

    if (reportsError) {
      console.error('Error fetching bug reports:', reportsError);
      console.error('Error details:', JSON.stringify(reportsError, null, 2));
      return NextResponse.json({ 
        error: 'Failed to fetch bug reports', 
        details: reportsError.message 
      }, { status: 500 });
    }

    // Если есть отчеты и пользователь может видеть все, получаем информацию о пользователях
    if (reports && reports.length > 0 && canViewAll) {
      const userIds = Array.from(new Set(reports.map(r => r.user_id).filter(Boolean)));
      const resolverIds = Array.from(new Set(reports.map(r => r.resolved_by).filter(Boolean)));
      const allUserIds = Array.from(new Set([...userIds, ...resolverIds]));

      if (allUserIds.length > 0) {
        const { data: users } = await supabase
          .from('users')
          .select('id, full_name, email')
          .in('id', allUserIds);

        if (users) {
          const userMap = new Map(users.map(u => [u.id, u]));
          
          reports.forEach((report: any) => {
            if (report.user_id) {
              const user = userMap.get(report.user_id);
              if (user) {
                report.user = { full_name: user.full_name, email: user.email };
              }
            }
            if (report.resolved_by) {
              const resolver = userMap.get(report.resolved_by);
              if (resolver) {
                report.resolver = { full_name: resolver.full_name };
              }
            }
          });
        }
      }
    }

    return NextResponse.json({ 
      reports: reports || [], 
      isSuperAdmin,
      canViewAll 
    });
  } catch (error) {
    console.error('Error in GET /api/bug-reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
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

    const supabase = await createClient();

    const body: CreateBugReportData = await request.json();
    const { type, title, description } = body;

    // Validate input
    if (!type || !title || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['bug', 'suggestion'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    if (title.trim().length < 5) {
      return NextResponse.json({ error: 'Title must be at least 5 characters' }, { status: 400 });
    }

    if (description.trim().length < 10) {
      return NextResponse.json({ error: 'Description must be at least 10 characters' }, { status: 400 });
    }

    // Create bug report
    const { data: report, error: insertError } = await supabase
      .from('bug_reports')
      .insert({
        user_id: decoded.id,
        type,
        title: title.trim(),
        description: description.trim(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating bug report:', insertError);
      return NextResponse.json({ error: 'Failed to create bug report' }, { status: 500 });
    }

    return NextResponse.json({ report }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/bug-reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
