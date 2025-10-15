import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/server";

const VALID_ROLES = [
  "super-admin",
  "root",
  "gs-gibdd",
  "pgs-gibdd",
  "leader-gibdd",
  "gs-guvd",
  "pgs-guvd",
  "leader-guvd",
  "ss-gibdd",
  "ss-guvd",
  "gibdd",
  "guvd",
  "none",
];

const normalizeRole = (role: unknown): string => {
  if (!role) return "none";
  const r = String(role).trim().toLowerCase().replace(/_/g, "-");
  return VALID_ROLES.includes(r) ? r : "none";
};

const canManageUsersRole = (role: string) =>
  ["super-admin", "root", "gs-gibdd", "pgs-gibdd", "leader-gibdd", "gs-guvd", "pgs-guvd", "leader-guvd"].includes(role);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const { nickname, username, password, role } = body;
    if (!nickname || !username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // get token from cookie (compatible with your current setup)
    const token = req.headers.get("cookie")?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role?: string };
    } catch (e) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const supabase = await createClient();

    // load current user from DB (server-side check, more reliable than token only)
    const { data: currentUsers, error: userErr } = await supabase
      .from("users")
      .select("id, nickname, role")
      .eq("id", decoded.id);

    if (userErr || !currentUsers || currentUsers.length === 0) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const currentUser = currentUsers[0];
    if (!canManageUsersRole(String(currentUser.role))) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // unique username check
    const { data: existingUsers, error: existingErr } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .limit(1);

    if (existingErr) {
      console.error("[AddUser API] DB check error:", existingErr);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    // Prevent root and super-admin role assignment through the interface (except for super-admin users)
    const normalizedRole = normalizeRole(role);
    if (normalizedRole === "root" || (normalizedRole === "super-admin" && String(currentUser.role) !== "super-admin")) {
      return NextResponse.json({ error: "Cannot assign this role" }, { status: 403 });
    }

    // create user
    const passwordHash = await bcrypt.hash(password, 10);

    const { data: newUsers, error: insertErr } = await supabase
      .from("users")
      .insert([
        {
          nickname,
          username,
          password_hash: passwordHash,
          role: normalizedRole,
          created_by: currentUser.id,
        },
      ])
      .select();
    if (insertErr) {
      console.error("[AddUser API] Insert error:", insertErr);
      return NextResponse.json({ error: insertErr.message || "Insert failed" }, { status: 500 });
    }

    const newUser = newUsers?.[0] ?? null;

    // Получаем IP адрес
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip") || "unknown";

    // structured log (helps UI parsing + rollback)
    await supabase.from("user_logs").insert([
      {
        action: "add_user",
        target_user_id: newUser?.id ?? null,
        target_user_nickname: nickname,
        performed_by_id: currentUser.id,
        performed_by_nickname: currentUser.nickname,
        details: JSON.stringify({ nickname, username, role: normalizedRole }),
        ip_address: ip,
      },
    ]);

    return NextResponse.json({ success: true, user: newUser });
  } catch (err: any) {
    console.error("[AddUser API] Exception:", err);
  }
}