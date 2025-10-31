import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import type { UpdateBugReportData } from '@/types/bug-reports';

export async function PATCH(
 request: Request,
 { params }: { params: { id: string } }
) {
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

 const supabase = await createClient();

 const body: UpdateBugReportData = await request.json();
 const updateData: any = {};

 if (body.status) {
 updateData.status = body.status;
 
 // If status is closed, set closed_at and closed_by
 if (body.status === 'closed') {
 updateData.closed_at = new Date().toISOString();
 updateData.closed_by = decoded.id;
 } else if (body.status === 'open') {
 // If reopening, clear closed fields
 updateData.closed_at = null;
 updateData.closed_by = null;
 }
 }

 if (body.priority) {
 updateData.priority = body.priority;
 }

 if (body.admin_comment !== undefined) {
 updateData.admin_comment = body.admin_comment;
 }

 if (Object.keys(updateData).length === 0) {
 return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
 }

 const { data: report, error: updateError } = await supabase
 .from('bug_reports')
 .update(updateData)
 .eq('id', params.id)
 .select()
 .single();

 if (updateError) {
 console.error('Error updating bug report:', updateError);
 return NextResponse.json({ error: 'Failed to update bug report' }, { status: 500 });
 }

 return NextResponse.json({ report });
 } catch (error) {
 console.error('Error in PATCH /api/bug-reports/[id]:', error);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}

export async function DELETE(
 request: Request,
 { params }: { params: { id: string } }
) {
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

 const supabase = await createClient();

 const { error: deleteError } = await supabase
 .from('bug_reports')
 .delete()
 .eq('id', params.id);

 if (deleteError) {
 console.error('Error deleting bug report:', deleteError);
 return NextResponse.json({ error: 'Failed to delete bug report' }, { status: 500 });
 }

 return NextResponse.json({ success: true });
 } catch (error) {
 console.error('Error in DELETE /api/bug-reports/[id]:', error);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
