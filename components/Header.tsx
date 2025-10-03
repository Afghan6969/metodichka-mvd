import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuth();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!login(username, password)) {
      setError("Неверный логин или пароль");
    } else {
      setShow(false);
      setUsername("");
      setPassword("");
      setError("");
    }
  };

  return (
    <header className="header">
      <span className="logo">МВД РП</span>
      <div style={{ marginLeft: "auto" }}>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>Привет, {user.username}!</span>
            <button onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <button onClick={() => setShow((v) => !v)}>Войти</button>
            {show && (
              <form className="login-form" onSubmit={handleLogin}>
                <input
                  placeholder="Логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  placeholder="Пароль"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
                {error && <div className="error">{error}</div>}
              </form>
            )}
          </>
        )}
      </div>
    </header>
  );
}