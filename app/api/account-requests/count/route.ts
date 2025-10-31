import { createClient } from"@/lib/supabase/server";
import { NextResponse } from"next/server";
import jwt from"jsonwebtoken";
import { cookies } from"next/headers";

export async function GET(request: Request) {
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
 const { data: user } = await supabase
 .from("users")
 .select("id, role, status")
 .eq("id", decoded.id)
 .maybeSingle();

 if (!user || user.status !=="active") {
 return NextResponse.json({ error:"User not found or inactive" }, { status: 403 });
 }

 // Только super-admin, root, ПГС, ГС, лидеры и СС могут просматривать запросы
 const allowedRoles = ["super-admin","root","pgs-gibdd","pgs-guvd","gs-gibdd","gs-guvd","leader-gibdd","leader-guvd","ss-gibdd","ss-guvd"];
 if (!allowedRoles.includes(user.role)) {
 return NextResponse.json(
 { error:"Access denied. Only Leaders, GS, and SS can view requests." },
 { status: 403 }
 );
 }

 // Получаем количество неодобренных запросов (pending)
 const { count, error } = await supabase
 .from("account_requests")
 .select("*", { count:"exact", head: true })
 .eq("status","pending");

 if (error) {
 console.error("Error counting pending requests:", error);
 return NextResponse.json(
 { error:"Failed to count pending requests" },
 { status: 500 }
 );
 }

 return NextResponse.json({
 success: true,
 count: count || 0,
 });
 } catch (error) {
 console.error("Count pending requests error:", error);
 return NextResponse.json(
 { error:"Internal server error" },
 { status: 500 }
 );
 }
}
