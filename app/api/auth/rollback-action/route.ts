import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createClient as createServerClient } from '@supabase/supabase-js';

const canManageUsersRole = (role: string) =>
  ["root", "gs-gibdd", "pgs-gibdd", "gs-guvd", "pgs-guvd"].includes(role);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

    const { logId } = body;
    if (!logId) return NextResponse.json({ error: "Missing logId" }, { status: 400 });

    const token = req.headers.get("cookie")?.match(/auth_token=([^;]+)/)?.[1];
    if (!token) return NextResponse.json({ error: "No token" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role?: string };
    } catch (e) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Используем service role для обхода RLS
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

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

    // Получаем лог для отката
    const { data: logData, error: logError } = await supabase
      .from("user_logs")
      .select("*")
      .eq("id", logId)
      .single();

    if (logError || !logData) {
      return NextResponse.json({ error: "Log not found" }, { status: 404 });
    }

    // Нельзя откатить откат
    if (logData.action === "rollback") {
      return NextResponse.json({ error: "Cannot rollback a rollback" }, { status: 400 });
    }

    // Получаем IP адрес
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : req.headers.get("x-real-ip") || "unknown";

    let rollbackDetails = "";
    let rollbackSuccess = false;

    // Откатываем действие в зависимости от типа
    switch (logData.action) {
      case "add_user": {
        // Откат добавления = деактивация пользователя
        const { error: deactivateError } = await supabase
          .from("users")
          .update({
            status: "deactivated",
            deactivated_by: currentUser.id,
            deactivated_at: new Date().toISOString()
          })
          .eq("id", logData.target_user_id);

        if (!deactivateError) {
          rollbackDetails = `Откат добавления: деактивирован пользователь ${logData.target_user_nickname}`;
          rollbackSuccess = true;
        }
        break;
      }

      case "deactivate": {
        // Откат деактивации = активация
        const { error: activateError } = await supabase
          .from("users")
          .update({
            status: "active",
            deactivated_by: null,
            deactivated_at: null
          })
          .eq("id", logData.target_user_id);

        if (!activateError) {
          rollbackDetails = `Откат деактивации: активирован пользователь ${logData.target_user_nickname}`;
          rollbackSuccess = true;
        }
        break;
      }

      case "activate": {
        // Откат активации = деактивация
        const { error: deactivateError } = await supabase
          .from("users")
          .update({
            status: "deactivated",
            deactivated_by: currentUser.id,
            deactivated_at: new Date().toISOString()
          })
          .eq("id", logData.target_user_id);

        if (!deactivateError) {
          rollbackDetails = `Откат активации: деактивирован пользователь ${logData.target_user_nickname}`;
          rollbackSuccess = true;
        }
        break;
      }

      case "update_user": {
        // Откат изменения = восстановление предыдущих значений
        try {
          const details = JSON.parse(logData.details);
          const updates: any = {};

          if (details.previous) {
            if (details.previous.nickname) updates.nickname = details.previous.nickname;
            if (details.previous.username) updates.username = details.previous.username;
            if (details.previous.role) updates.role = details.previous.role;
          }

          if (Object.keys(updates).length > 0) {
            const { error: updateError } = await supabase
              .from("users")
              .update(updates)
              .eq("id", logData.target_user_id);

            if (!updateError) {
              const changedFields = Object.keys(updates).join(", ");
              rollbackDetails = `Откат изменения: восстановлены поля (${changedFields}) для ${logData.target_user_nickname}`;
              rollbackSuccess = true;
            }
          }
        } catch (e) {
          console.error("[Rollback] Failed to parse update_user details:", e);
        }
        break;
      }

      default:
        return NextResponse.json({ error: "This action cannot be rolled back" }, { status: 400 });
    }

    if (!rollbackSuccess) {
      return NextResponse.json({ error: "Rollback failed" }, { status: 500 });
    }

    // Логируем откат
    await supabase.from("user_logs").insert([
      {
        action: "rollback",
        target_user_id: logData.target_user_id,
        target_user_nickname: logData.target_user_nickname,
        performed_by_id: currentUser.id,
        performed_by_nickname: currentUser.nickname,
        details: JSON.stringify({
          original_log_id: logId,
          original_action: logData.action,
          rollback_description: rollbackDetails
        }),
        ip_address: ip,
      },
    ]);

    return NextResponse.json({ success: true, message: rollbackDetails });
  } catch (err: any) {
    console.error("[Rollback API] Exception:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
