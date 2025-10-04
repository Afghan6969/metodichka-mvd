"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

export type UserRole = "root" | "moderator-gibdd" | "moderator-guvd" | "ss-gibdd" | "ss-guvd" | "gibdd" | "guvd" | "none";

export interface User {
  id: string;
  nickname: string;
  username: string;
  role: UserRole;
  created_at: string;
  created_by_user?: {
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
}

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  userLogs: UserLog[] | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addUser: (nickname: string, username: string, password: string, role: UserRole) => Promise<boolean>;
  removeUser: (userId: string) => Promise<boolean>;
  updateUser: (userId: string, username: string, password: string, role: UserRole) => Promise<boolean>;
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

  const normalizeRole = (role?: string | null): UserRole => {
    if (!role) return "none";
    const r = String(role).toLowerCase();
    const allowed: UserRole[] = ["root", "moderator-gibdd", "moderator-guvd", "ss-gibdd", "ss-guvd", "gibdd", "guvd", "none"];
    return allowed.includes(r as UserRole) ? (r as UserRole) : "none";
  };

  const verifyCurrentUserRole = async (): Promise<boolean> => {
    if (!currentUser) return false;

    try {
      const response = await fetch('/api/auth/verify', {
        credentials: 'include',
      });

      if (!response.ok) {
        console.error("[Auth] Token verification failed");
        logout();
        return false;
      }

      const user = await response.json();
      if (normalizeRole(user.role) !== normalizeRole(currentUser.role)) {
        console.warn("[Auth] Role mismatch detected, logging out");
        logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error("[Auth] Exception in verifyRole:", error);
      logout();
      return false;
    }
  };

  const refreshUserLogs = async () => {
    if (!currentUser || normalizeRole(currentUser.role) !== "root") {
      setUserLogs(null);
      return;
    }

    try {
      console.log("[Auth] Refreshing user logs...");
      const response = await fetch('/api/auth/user-logs', { credentials: 'include' });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("[Auth] Error loading user logs:", errorData);
        return;
      }
      const { data } = await response.json();
      console.log("[Auth] Fetched user logs from DB:", data ? data.length : 0, data);
      setUserLogs(data || []);
    } catch (error) {
      console.error("[Auth] Error in refreshUserLogs:", error);
      setUserLogs([]);
    }
  };

  const refreshUsers = async () => {
    try {
      console.log("[Auth] Refreshing users list...");
      const { data, error } = await supabase
        .from("users")
        .select(
          `
          *,
          created_by_user:created_by(
            nickname,
            role
          )
        `
        )
        .order("created_at", { ascending: true });

      if (error) {
        console.error("[Auth] Error loading users:", error);
        return;
      }

      if (data) {
        console.log("[Auth] Fetched users from DB:", data.length);
        const usersWithRoles = data.map((user: any) => ({
          id: user.id,
          nickname: user.nickname,
          username: user.username,
          role: normalizeRole(user.role || "none"),
          created_at: user.created_at,
          created_by_user: user.created_by_user
            ? {
                nickname: user.created_by_user.nickname,
                role: normalizeRole(user.created_by_user.role || "none"),
              }
            : undefined,
        }));
        setUsers(usersWithRoles);
        console.log("[Auth] Users state updated with:", usersWithRoles.length, "users");
      }
    } catch (error) {
      console.error("[Auth] Error in refreshUsers:", error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await refreshUsers();

      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include',
        });
        if (response.ok) {
          const user = await response.json();
          setCurrentUser({
            id: user.id,
            nickname: user.nickname,
            username: user.username,
            role: normalizeRole(user.role),
            created_at: user.created_at,
          });
        }
      } catch (error) {
        console.error("[Auth] Error verifying token:", error);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (currentUser && normalizeRole(currentUser.role) === "root") {
      refreshUserLogs();
    } else {
      setUserLogs(null);
    }
  }, [currentUser]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        console.error("[Auth] Login error:", await response.json());
        return false;
      }

      const { user } = await response.json();
      setCurrentUser({
        id: user.id,
        nickname: user.nickname,
        username: user.username,
        role: normalizeRole(user.role),
        created_at: user.created_at,
      });
      await refreshUsers();
      await refreshUserLogs();
      return true;
    } catch (error) {
      console.error("[Auth] Login exception:", error);
      return false;
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setCurrentUser(null);
    setUserLogs(null);
  };

const addUser = async (nickname: string, username: string, password: string, role: UserRole): Promise<boolean> => {
  try {
    if (!currentUser || !canManageUsers()) {
      console.error("[Auth] Unauthorized to add users");
      return false;
    }

    const isValid = await verifyCurrentUserRole();
    if (!isValid) {
      return false;
    }

    console.log("[Auth] Sending request to add user:", { nickname, username, role });

    const response = await fetch('/api/auth/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, username, password, role }),
      credentials: 'include',
    });

    console.log("[Auth] Response status:", response.status, response.statusText);

    // Читаем ответ только один раз
    const contentType = response.headers.get("content-type");
    console.log("[Auth] Response content-type:", contentType);
    
    let responseData;
    
    try {
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
        console.log("[Auth] Parsed JSON response:", responseData);
      } else {
        const text = await response.text();
        console.log("[Auth] Raw text response:", text);
        responseData = { error: text || `HTTP ${response.status}: ${response.statusText}` };
      }
    } catch (parseError) {
      console.error("[Auth] Failed to parse response:", parseError);
      return false;
    }

    if (!response.ok) {
      const errorMessage = responseData?.error || responseData?.message || JSON.stringify(responseData) || "Unknown error";
      console.error("[Auth] Error adding user:", errorMessage);
      console.error("[Auth] Full response data:", responseData);
      return false;
    }

    console.log("[Auth] User added successfully");
    await refreshUsers();
    await refreshUserLogs();
    return true;
  } catch (error) {
    console.error("[Auth] Exception in addUser:", error);
    return false;
  }
};

  const removeUser = async (userId: string): Promise<boolean> => {
    try {
      console.log("[Auth] Attempting to remove user with ID:", userId);
      if (!currentUser || !canManageUsers()) {
        console.error("[Auth] Unauthorized to remove users. Current user:", currentUser);
        return false;
      }

      if (currentUser.id === userId) {
        console.error("[Auth] Cannot delete own account. Current user ID:", currentUser.id);
        return false;
      }

      const isValid = await verifyCurrentUserRole();
      if (!isValid) {
        console.error("[Auth] Role verification failed for user:", currentUser);
        return false;
      }

      const { data: userToDelete, error: fetchError } = await supabase
        .from("users")
        .select("nickname, role")
        .eq("id", userId)
        .single();
      if (fetchError) {
        console.error("[Auth] Error fetching user to delete:", fetchError);
        return false;
      }
      if (!userToDelete) {
        console.error("[Auth] User not found with ID:", userId);
        return false;
      }

      if (normalizeRole(userToDelete.role) === "root") {
        console.error("[Auth] Cannot delete root user. Role:", userToDelete.role);
        return false;
      }

      console.log("[Auth] Inserting log entry before deletion:", {
        action: "remove_user",
        target_user_id: userId,
        target_user_nickname: userToDelete.nickname,
        performed_by_id: currentUser.id,
        performed_by_nickname: currentUser.nickname,
        details: `Удаление пользователя ${userToDelete.nickname} с ролью ${normalizeRole(userToDelete.role)} успешно`,
      });
      const { error: logError } = await supabase.from("user_logs").insert([
        {
          action: "remove_user",
          target_user_id: userId,
          target_user_nickname: userToDelete.nickname,
          performed_by_id: currentUser.id,
          performed_by_nickname: currentUser.nickname,
          details: `Удаление пользователя ${userToDelete.nickname} с ролью ${normalizeRole(userToDelete.role)} успешно`,
        },
      ]);
      if (logError) {
        console.error("[Auth] Error inserting log entry:", logError.message);
        return false;
      }

      console.log("[Auth] Deleting user:", userToDelete);
      const response = await fetch('/api/auth/remove-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("[Auth] Error removing user:", errorData.error);
        return false;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
      await refreshUsers();
      await refreshUserLogs();
      console.log("[Auth] User removed successfully. ID:", userId);
      return true;
    } catch (error) {
      console.error("[Auth] Exception in removeUser:", error);
      return false;
    }
  };

  const updateUser = async (userId: string, username: string, password: string | undefined, role: UserRole): Promise<boolean> => {
    try {
      if (!currentUser || !canManageUsers()) {
        console.error("[Auth] Unauthorized to update users");
        return false;
      }

      const isValid = await verifyCurrentUserRole();
      if (!isValid) {
        return false;
      }

      const response = await fetch('/api/auth/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, username, password, role }),
        credentials: 'include',
      });

      if (!response.ok) {
        console.error("[Auth] Error updating user:", await response.json());
        return false;
      }

      if (currentUser?.id === userId) {
        const updatedUser = { ...currentUser, username, role: normalizeRole(role) };
        setCurrentUser(updatedUser);
      }

      await refreshUsers();
      await refreshUserLogs();
      return true;
    } catch (error) {
      console.error("[Auth] Exception in updateUser:", error);
      return false;
    }
  };

  const hasAccess = (page: string, department?: string, reportType?: string): boolean => {
    const protectedPages = ["generator-page", "gibdd-gov-wave", "guvd-gov-wave"];
    if (!protectedPages.includes(page)) return true;
    if (!currentUser) return false;
    if (normalizeRole(currentUser.role) === "root") return true;
    const role = normalizeRole(currentUser.role);

    switch (page) {
      case "generator-page":
        return ["gibdd", "ss-gibdd", "moderator-gibdd", "guvd", "ss-guvd", "moderator-guvd"].includes(role);
      case "gibdd-gov-wave":
        return ["ss-gibdd", "moderator-gibdd"].includes(role);
      case "guvd-gov-wave":
        return ["ss-guvd", "moderator-guvd"].includes(role);
      default:
        return false;
    }
  };

  const canManageUsers = (): boolean => {
    if (!currentUser) return false;
    const role = normalizeRole(currentUser.role);
    return ["root", "moderator-gibdd", "moderator-guvd"].includes(role);
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}