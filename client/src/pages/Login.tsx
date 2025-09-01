import React, { useState } from "react";
import api, { setAuthToken } from "../api";

export default function Login({ onSuccess }: { onSuccess: (token: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const token = res.data.token as string;
      setAuthToken(token);
      onSuccess(token);
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Login failed");
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      {err && <p style={{ color: "#fca5a5" }}>{err}</p>}
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} required type="email" />
      <label>Password</label>
      <input value={password} onChange={e => setPassword(e.target.value)} required type="password" />
      <div style={{ marginTop: 12 }}>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
