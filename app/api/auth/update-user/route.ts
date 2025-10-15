import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createClient } from "@/lib/supabase/server";

const VALID_ROLES = [
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
  ["root", "gs-gibdd", "pgs-gibdd", "leader-gibdd", "gs-guvd", "pgs-guvd", "leader-guvd"].includes(role);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const { userId, nickname, username, password, role } = body;
    if (!userId || !username) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const token = req.headers.get("cookie")?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role?: string };
    } catch (e) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const supabase = await createClient();

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

    // check username unique (exclude target user)
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("username", username)
      .neq("id", userId)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }

    // fetch old data
    const { data: oldUserData } = await supabase
      .from("users")
      .select("nickname, username, role")
      .eq("id", userId)
      .single();

    if (!oldUserData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const normalizedRole = normalizeRole(role);
    
    // Prevent root role assignment through the interface
    if (normalizedRole === "root") {
      return NextResponse.json({ error: "Cannot assign root role" }, { status: 403 });
    }

    // Build changes array BEFORE updating
    const changes: string[] = [];
    const newNickname = nickname || oldUserData.nickname;
    
    console.log("[UpdateUser] Comparison:", {
      oldNickname: oldUserData.nickname,
      newNickname,
      nicknameChanged: oldUserData.nickname !== newNickname,
      oldUsername: oldUserData.username,
      newUsername: username,
      usernameChanged: oldUserData.username !== username,
      oldRole: oldUserData.role,
      normalizedRole,
      roleChanged: String(oldUserData.role) !== normalizedRole,
      passwordProvided: !!password
    });
    
    if (oldUserData.nickname !== newNickname) {
      changes.push(`Никнейм: ${oldUserData.nickname} → ${newNickname}`);
    }
    if (oldUserData.username !== username) {
      changes.push(`Логин: ${oldUserData.username} → ${username}`);
    }
    if (String(oldUserData.role) !== normalizedRole) {
      changes.push(`Роль: ${oldUserData.role} → ${normalizedRole}`);
    }
    if (password) {
      changes.push("Пароль: изменён");
    }
    
    console.log("[UpdateUser] Changes array:", changes);

    const updates: any = { username, role: normalizedRole };
    if (nickname) updates.nickname = nickname;
    if (password) updates.password_hash = await bcrypt.hash(password, 10);

    const { error: updateErr } = await supabase.from("users").update(updates).eq("id", userId);
    if (updateErr) {
      console.error("[UpdateUser API] Update error:", updateErr);
      return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }

    // Получаем IP адрес
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip") || "unknown";

    await supabase.from("user_logs").insert([
      {
        action: "update_user",
        target_user_id: userId,
        target_user_nickname: oldUserData.nickname,
        performed_by_id: currentUser.id,
        performed_by_nickname: currentUser.nickname,
        details: JSON.stringify({
          previous: { 
            nickname: oldUserData.nickname,
            username: oldUserData.username, 
            role: oldUserData.role 
          },
          next: { 
            nickname: newNickname,
            username, 
            role: normalizedRole 
          },
          changes,
        }),
        ip_address: ip,
      },
    ]);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[UpdateUser API] Exception:", err);

  }
}