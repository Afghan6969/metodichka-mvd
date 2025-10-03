import { useAuth } from "../contexts/AuthContext";

export default function Sidebar({ onNavigate, currentPage }) {
  const { user } = useAuth();
  const nav = [
    { page: "generator-page", label: "Генератор отчётов" },
    { page: "gibdd-gov-wave-page", label: "ГИБДД-Волна" },
    { page: "guvd-gov-wave-page", label: "ГУВД-Волна" },
  ];
  return (
    <aside className="sidebar">
      {user &&
        nav
          .filter((n) => user.accessPages.includes(n.page as any))
          .map((n) => (
            <button
              key={n.page}
              onClick={() => onNavigate(n.page)}
              className={currentPage === n.page ? "active" : ""}
            >
              {n.label}
            </button>
          ))}
      {user?.role === "moderator" && (
        <button
          onClick={() => onNavigate("moderation")}
          className={currentPage === "moderation" ? "active" : ""}
        >
          Модерация
        </button>
      )}
    </aside>
  );
}