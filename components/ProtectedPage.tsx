import { useAuth } from "../contexts/AuthContext";

export default function ProtectedPage({ page, children, moderatorOnly = false }) {
  const { user } = useAuth();
  if (!user) return <div className="protected-info">Войдите, чтобы получить доступ</div>;
  if (moderatorOnly && user.role !== "moderator") return <div className="protected-info">Нет доступа</div>;
  if (page && !user.accessPages.includes(page)) return <div className="protected-info">Нет доступа</div>;
  return children;
}