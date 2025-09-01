import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

type View = "login" | "register" | "dashboard";

export default function App() {
  const [view, setView] = useState<View>("login");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) { setToken(saved); setView("dashboard"); }
  }, []);

  function onLogin(t: string) {
    setToken(t);
    localStorage.setItem("token", t);
    setView("dashboard");
  }

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    setView("login");
  }

  return (
    <div className="container">
      <h1>CarePay</h1>
      <p>Estimate <em>medical procedure</em> EMIs and save quotes.</p>
      <div style={{ margin: "12px 0" }}>
        {token ? <button onClick={logout}>Logout</button> : (
          <>
            <button onClick={() => setView("login")}>Login</button>{" "}
            <button onClick={() => setView("register")}>Register</button>
          </>
        )}
      </div>
      <div className="card">
        {view === "login" && <Login onSuccess={onLogin} />}
        {view === "register" && <Register onDone={() => setView("login")} />}
        {view === "dashboard" && token && <Dashboard token={token} />}
      </div>
    </div>
  );
}
