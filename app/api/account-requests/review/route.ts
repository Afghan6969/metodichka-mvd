import { createClient } from"@/lib/supabase/server";
import { NextResponse } from"next/server";
import jwt from"jsonwebtoken";
import { cookies } from"next/headers";

export async function POST(request: Request) {
 try {
 // Проверяем аутентификацию
 const cookieStore = await cookies();
 const token = cookieStore.get("auth_token")?.value;

 if (!token) {
 return NextResponse.json({ error:"Unauthorized" }, { status: 401 });
 }

 let decoded: any;
 try {
 decoded = jwt.verify(token, process.env.JWT_SECRET!);
 } catch {
 return NextResponse.json({ error:"Invalid token" }, { status: 401 });
 }

 const supabase = await createClient();

 // Проверяем роль пользователя
 const { data: user, error: userError } = await supabase
 .from("users")
 .select("id, nickname, role, status")
 .eq("id", decoded.id)
 .maybeSingle();

 if (userError) {
 console.error("Error fetching user:", userError);
 return NextResponse.json({ error:"Error fetching user data", details: userError.message }, { status: 500 });
 }

 if (!user || user.status !=="active") {
 console.error("User not found or inactive. Decoded ID:", decoded.id);
 return NextResponse.json({ error:"User not found or inactive" }, { status: 403 });
 }

 // Только super-admin, root, ПГС, ГС, лидеры и СС могут рассматривать запросы
 const allowedRoles = ["super-admin","root","pgs-gibdd","pgs-guvd","gs-gibdd","gs-guvd","leader-gibdd","leader-guvd","ss-gibdd","ss-guvd"];
 if (!allowedRoles.includes(user.role)) {
 return NextResponse.json(
 { error:"Access denied. Only Leaders, GS, and SS can review requests." },
 { status: 403 }
 );
 }

 const body = await request.json();
 const { requestId, action, comment } = body;

 if (!requestId || !action) {
 return NextResponse.json(
 { error:"Request ID and action are required" },
 { status: 400 }
 );
 }

 if (!["approve","reject"].includes(action)) {
 return NextResponse.json(
 { error:"Invalid action. Must be 'approve' or 'reject'" },
 { status: 400 }
 );
 }

 // Получаем запрос
 const { data: accountRequest, error: fetchError } = await supabase
 .from("account_requests")
 .select("*")
 .eq("id", requestId)
 .maybeSingle();

 if (fetchError || !accountRequest) {
 return NextResponse.json(
 { error:"Request not found" },
 { status: 404 }
 );
 }

 // Проверяем, что запрос еще не рассмотрен
 if (accountRequest.status !=="pending") {
 return NextResponse.json(
 { error: `Request already ${accountRequest.status}` },
 { status: 409 }
 );
 }

 const newStatus = action ==="approve" ?"approved" :"rejected";

 // Проверяем, существует ли уже пользователь с таким логином
 if (action ==="approve") {
 const { data: existingUser } = await supabase
 .from("users")
 .select("id, username")
 .eq("username", accountRequest.login)
 .maybeSingle();

 if (existingUser) {
 return NextResponse.json(
 { error: `Пользователь с логином"${accountRequest.login}" уже существует` },
 { status: 409 }
 );
 }

 // Проверяем, что роль допустима для создания пользователя
 const validRoles = [
 'ГУВД', 'ГИБДД', 'ГИБДД - ГС', 'ГИБДД - ПГС', 'ГИБДД - Лидер', 'ГИБДД - СС',
 'ГУВД - ГС', 'ГУВД - ПГС', 'ГУВД - Лидер', 'ГУВД - СС',
 'super-admin', 'root'
 ];

 if (accountRequest.role && !validRoles.includes(accountRequest.role)) {
 return NextResponse.json(
 { error: `Недопустимая роль"${accountRequest.role}". Допустимые роли: ${validRoles.join(', ')}` },
 { status: 400 }
 );
 }
 }

 // Обновляем статус запроса
 const { data: updatedRequest, error: updateError } = await supabase
 .from("account_requests")
 .update({
 status: newStatus,
 comment: comment || null,
 reviewed_by: user.id,
 reviewed_at: new Date().toISOString(),
 })
 .eq("id", requestId)
 .select()
 .single();

 if (updateError) {
 console.error("Ошибка обновления запроса аккаунта:", updateError);
 console.error("User ID:", user.id);
 console.error("Request ID:", requestId);
 console.error("Full error details:", JSON.stringify(updateError, null, 2));
 return NextResponse.json(
 { error:"Failed to update request", details: updateError.message, code: updateError.code },
 { status: 500 }
 );
 }

 // Если запрос одобрен, триггер автоматически создаст пользователя
 // Логируем действие
 const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || 
 request.headers.get("x-real-ip") ||"unknown";

 await supabase.from("user_logs").insert({
 action: action ==="approve" ?"account_request_approved" :"account_request_rejected",
 target_user_id: null,
 target_user_nickname: accountRequest.nickname,
 performed_by_id: user.id,
 performed_by_nickname: user.nickname,
 details: `${action ==="approve" ?"Одобрен" :"Отклонен"} запрос на создание аккаунта для ${accountRequest.nickname} (${accountRequest.login})${comment ? `. Комментарий: ${comment}` :""}`,
 ip_address: ip,
 });

 return NextResponse.json({
 success: true,
 message: `Запрос успешно ${newStatus}`,
 request: updatedRequest,
 });
 } catch (error) {
 console.error("Ошибка рассмотрения запроса аккаунта:", error);
 return NextResponse.json(
 { error:"Internal server error" },
 { status: 500 }
 );
 }
}
