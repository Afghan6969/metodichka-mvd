import { createContext, useContext, useState } from "react";

type Role = "user" | "moderator";
type AccessPage = "generator-page" | "gibdd-gov-wave-page" | "guvd-gov-wave-page";

interface User {
  username: string;
  role: Role;
  accessPages: AccessPage[];
  password: string;
}

const USERS: User[] = [
  {
    username: "moderator",
    password: "mod123",
    role: "moderator",
    accessPages: ["generator-page", "gibdd-gov-wave-page", "guvd-gov-wave-page"],
  },
  {
    username: "user1",
    password: "user123",
    role: "user",
    accessPages: ["generator-page", "gibdd-gov-wave-page"],
  },
];

const AuthContext = createContext<{
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    const found = USERS.find((u) => u.username === username && u.password === password);
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}