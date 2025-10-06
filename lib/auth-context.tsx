"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

// ==== РОЛИ ====
export type UserRole =
  | "root"
  | "gs-gibdd"
  | "pgs-gibdd"
  | "gs-guvd"
  | "pgs-guvd"
  | "ss-gibdd"
  | "ss-guvd"
  | "gibdd"
  | "guvd"
  | "none";

export interface User {
  id: string;
  nickname: string;
  username: string;
  role: UserRole;
  status: "active" | "deactivated";
  created_at: string;
  created_by_user?: {
    nickname: string;
    role: UserRole;
  };
  deactivated_by?: string;
  deactivated_at?: string;
  deactivated_by_user?: {
    nickname: string;
    role: UserRole;
  };
}

export interface UserLog {
  id: number;
  action: string;
  target_user_id: string;
  target_user_nickname: string;
  performed_by_id: string;
  performed_by_nickname: string;
  details: string;
  created_at: string;
  ip_address?: string;
}

// ==== КОНТЕКСТ ====
interface AuthContextType {
  currentUser: User | null;
  users: User[];
  userLogs: UserLog[] | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addUser: (nickname: string, username: string, password: string, role: UserRole) => Promise<boolean>;
  removeUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  restoreUser: (userId: string) => Promise<{ success: boolean; error?: string }>;
  updateUser: (userId: string, nickname: string, username: string, password: string | undefined, role: UserRole) => Promise<boolean>;
  hasAccess: (page: string, department?: string, reportType?: string) => boolean;
  canManageUsers: () => boolean;
  refreshUsers: () => Promise<void>;
  verifyCurrentUserRole: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userLogs, setUserLogs] = useState<UserLog[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  // === НОРМАЛИЗАЦИЯ РОЛИ ===
  const normalizeRole = (role?: string | null): UserRole => {
    if (!role) return "none";
    const formatted = String(role).trim().toLowerCase().replace(/_/g, "-");
    const validRoles: UserRole[] = [
      "root",
      "gs-gibdd",
      "pgs-gibdd",
      "gs-guvd",
      "pgs-guvd",
      "ss-gibdd",
      "ss-guvd",
      "gibdd",
      "guvd",
      "none",
    ];
    return validRoles.includes(formatted as UserRole)
      ? (formatted as UserRole)
      : "none";
  };

  // === ПРОВЕРКА РОЛИ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ ===
  const verifyCurrentUserRole = async (): Promise<boolean> => {
    if (!currentUser) return false;
    try {
      const res = await fetch("/api/auth/verify", { credentials: "include" });
      if (!res.ok) {
        await logout();
        return false;
      }
      const user = await res.json();
      if (normalizeRole(user.role) !== normalizeRole(currentUser.role)) {
        await logout();
        return false;
      }
      return true;
    } catch (err) {
      console.error("[Auth] verifyRole error:", err);
      await logout();
      return false;
    }
  };

  // === ОБНОВЛЕНИЕ СПИСКА ПОЛЬЗОВАТЕЛЕЙ ===
  const refreshUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          *,
          created_by_user:created_by(
            nickname,
            role
          ),
          deactivated_by_user:deactivated_by(
            nickname,
            role
          )
        `
        )
        .order("created_at", { ascending: true });

      if (error) {
        console.error("[Auth] Failed to load users:", error);
        return;
      }

      const usersWithRoles = (data || []).map((u: any) => ({
        id: u.id,
        nickname: u.nickname,
        username: u.username,
        role: normalizeRole(u.role),
        status: u.status || "active",
        created_at: u.created_at,
        created_by_user: u.created_by_user
          ? {
              nickname: u.created_by_user.nickname,
              role: normalizeRole(u.created_by_user.role),
            }
          : undefined,
        deactivated_by: u.deactivated_by,
        deactivated_at: u.deactivated_at,
        deactivated_by_user: u.deactivated_by_user
          ? {
              nickname: u.deactivated_by_user.nickname,
              role: normalizeRole(u.deactivated_by_user.role),
            }
          : undefined,
      }));

      setUsers(usersWithRoles);
    } catch (err) {
      console.error("[Auth] refreshUsers error:", err);
    }
  };

  // === ОБНОВЛЕНИЕ ЛОГОВ ===
  const refreshUserLogs = async () => {
    if (!currentUser || normalizeRole(currentUser.role) !== "root") {
      setUserLogs(null);
      return;
    }
    try {
      const res = await fetch("/api/auth/user-logs", { credentials: "include" });
      if (!res.ok) return;
      const { data } = await res.json();
      setUserLogs(data || []);
    } catch (err) {
      console.error("[Auth] refreshUserLogs error:", err);
      setUserLogs([]);
    }
  };

  // === ИНИЦИАЛИЗАЦИЯ ===
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await refreshUsers();
      try {
        const res = await fetch("/api/auth/verify", { credentials: "include" });
        if (res.ok) {
          const user = await res.json();
          setCurrentUser({
            id: user.id,
            nickname: user.nickname,
            username: user.username,
            role: normalizeRole(user.role),
            status: user.status || "active",
            created_at: user.created_at,
          });
        }
      } catch (err) {
        console.error("[Auth] init error:", err);
      }
      setIsLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (currentUser && normalizeRole(currentUser.role) === "root") refreshUserLogs();
    else setUserLogs(null);
  }, [currentUser]);

  // === ЛОГИН ===
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!res.ok) return false;
      const { user } = await res.json();
      setCurrentUser({
        id: user.id,
        nickname: user.nickname,
        username: user.username,
        role: normalizeRole(user.role),
        status: user.status || "active",
        created_at: user.created_at,
      });
      await refreshUsers();
      await refreshUserLogs();
      return true;
    } catch (err) {
      console.error("[Auth] login error:", err);
      return false;
    }
  };

  // === ВЫХОД ===
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setCurrentUser(null);
    setUserLogs(null);
  };

  // === ДОБАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ===
  const addUser = async (nickname: string, username: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      if (!currentUser || !canManageUsers()) return false;
      const valid = await verifyCurrentUserRole();
      if (!valid) return false;

      const res = await fetch("/api/auth/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, username, password, role }),
        credentials: "include",
      });
      if (!res.ok) {
        console.error("[Auth] addUser failed:", await res.text());
        return false;
      }
      await refreshUsers();
      await refreshUserLogs();
      return true;
    } catch (err) {
      console.error("[Auth] addUser error:", err);
      return false;
    }
  };

  // === ДЕАКТИВАЦИЯ ПОЛЬЗОВАТЕЛЯ ===
  const removeUser = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!currentUser || !canManageUsers()) return { success: false, error: "Нет прав" };
      if (currentUser.id === userId) return { success: false, error: "Нельзя деактивировать самого себя" };

      const res = await fetch("/api/auth/remove-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        credentials: "include",
      });
      if (!res.ok) return { success: false, error: "Ошибка при деактивации" };

      await refreshUsers();
      await refreshUserLogs();
      return { success: true };
    } catch (err) {
      console.error("[Auth] removeUser error:", err);
      return { success: false, error: "Неожиданная ошибка" };
    }
  };

  // === ВОССТАНОВЛЕНИЕ ПОЛЬЗОВАТЕЛЯ ===
  const restoreUser = async (userId: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!currentUser || !canManageUsers()) return { success: false, error: "Нет прав" };

      const res = await fetch("/api/auth/restore-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        credentials: "include",
      });
      if (!res.ok) return { success: false, error: "Ошибка при восстановлении" };

      await refreshUsers();
      await refreshUserLogs();
      return { success: true };
    } catch (err) {
      console.error("[Auth] restoreUser error:", err);
      return { success: false, error: "Неожиданная ошибка" };
    }
  };

  // === ИЗМЕНЕНИЕ ПОЛЬЗОВАТЕЛЯ ===
  const updateUser = async (userId: string, nickname: string, username: string, password: string | undefined, role: UserRole): Promise<boolean> => {
    try {
      if (!currentUser || !canManageUsers()) return false;
      const valid = await verifyCurrentUserRole();
      if (!valid) return false;

      const res = await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, nickname, username, password, role }),
        credentials: "include",
      });
      if (!res.ok) return false;

      if (currentUser.id === userId)
        setCurrentUser({ ...currentUser, nickname, username, role: normalizeRole(role), status: currentUser.status });

      await refreshUsers();
      await refreshUserLogs();
      return true;
    } catch (err) {
      console.error("[Auth] updateUser error:", err);
      return false;
    }
  };

  // === ДОСТУП ===
  const hasAccess = (page: string): boolean => {
    if (!currentUser) return false;
    const role = normalizeRole(currentUser.role);
    if (role === "root") return true;

    switch (page) {
      case "generator-page":
        return ["gibdd", "ss-gibdd", "pgs-gibdd", "gs-gibdd", "guvd", "ss-guvd", "pgs-guvd", "gs-guvd"].includes(role);
      case "gibdd-gov-wave":
        return ["ss-gibdd", "pgs-gibdd", "gs-gibdd"].includes(role);
      case "guvd-gov-wave":
        return ["ss-guvd", "pgs-guvd", "gs-guvd"].includes(role);
      default:
        return true;
    }
  };

  // === ПРАВА НА УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ ===
  const canManageUsers = (): boolean => {
    if (!currentUser) return false;
    const role = normalizeRole(currentUser.role);
    return ["root", "gs-gibdd", "pgs-gibdd", "gs-guvd", "pgs-guvd"].includes(role);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        userLogs,
        login,
        logout,
        addUser,
        removeUser,
        restoreUser,
        updateUser,
        hasAccess,
        canManageUsers,
        refreshUsers,
        verifyCurrentUserRole,
      }}
    >
      {isLoading ? <div className="flex items-center justify-center h-screen">Загрузка...</div> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
