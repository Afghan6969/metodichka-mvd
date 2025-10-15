import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    // Проверяем аутентификацию
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const supabase = await createClient();

    // Проверяем роль пользователя
    const { data: user } = await supabase
      .from("users")
      .select("id, role, status")
      .eq("id", decoded.id)
      .maybeSingle();

    if (!user || user.status !== "active") {
      return NextResponse.json({ error: "User not found or inactive" }, { status: 403 });
    }

    // Только super-admin, root, ПГС, ГС, лидеры и СС могут просматривать запросы
    const allowedRoles = ["super-admin", "root", "pgs-gibdd", "pgs-guvd", "gs-gibdd", "gs-guvd", "leader-gibdd", "leader-guvd", "ss-gibdd", "ss-guvd"];
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: "Access denied. Only Leaders, GS, and SS can view requests." },
        { status: 403 }
      );
    }

    // Получаем параметры фильтрации из URL
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // Строим запрос
    let query = supabase
      .from("account_requests")
      .select("*, reviewed_by_user:users!reviewed_by(nickname)", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Применяем фильтр по статусу
    if (status && ["pending", "approved", "rejected"].includes(status)) {
      query = query.eq("status", status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching account requests:", error);
      return NextResponse.json(
        { error: "Failed to fetch requests" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      requests: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error("List account requests error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
