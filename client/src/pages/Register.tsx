import React, { useState } from "react";
import api from "../api";

export default function Register({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await api.post("/api/auth/register", { name, email, password });
      setOk(true);
      setTimeout(onDone, 800);
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Registration failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      {ok ? <p>Registered! You can now login.</p> : (
        <>
          {err && <p style={{ color: "#fca5a5" }}>{err}</p>}
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} required type="email" />
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} required type="password" />
          <div style={{ marginTop: 12 }}>
            <button type="submit">Create account</button>
          </div>
        </>
      )}
    </form>
  );
}
