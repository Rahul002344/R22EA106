import React, { useState } from "react";
import api from "../api";

export default function QuoteForm({ procedures, onCreated }: { procedures: any[], onCreated: () => void }) {
  const [procedureId, setProcedureId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [tenureMonths, setTenure] = useState<number>(12);
  const [interestRate, setRate] = useState<number>(12);
  const [preview, setPreview] = useState<{emi:number,schedule:any[]} | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function calcPreview() {
    const r = (interestRate / 12) / 100;
    if (!amount || !tenureMonths) return;
    const pow = Math.pow(1 + r, tenureMonths);
    const emi = r === 0 ? amount/tenureMonths : amount * r * pow / (pow - 1);
    setPreview({ emi: +emi.toFixed(2), schedule: [] });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      await api.post("/api/quotes", { procedureId, amount, tenureMonths, interestRate });
      setProcedureId(""); setAmount(0); setTenure(12); setRate(12); setPreview(null);
      onCreated();
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Failed to create quote");
    }
  }

  return (
    <form onSubmit={submit}>
      <h3>Create Quote</h3>
      {err && <p style={{ color: "#fca5a5" }}>{err}</p>}
      <label>Procedure</label>
      <select value={procedureId} onChange={e => setProcedureId(e.target.value)} required>
        <option value="">Select</option>
        {procedures.map(p => <option key={p._id} value={p._id}>{p.name} — ₹{p.baseCost}</option>)}
      </select>

      <label>Amount (₹)</label>
      <input type="number" value={amount} onChange={e => setAmount(+e.target.value)} required />

      <div className="row">
        <div>
          <label>Tenure (months)</label>
          <input type="number" value={tenureMonths} onChange={e => setTenure(+e.target.value)} required />
        </div>
        <div>
          <label>Interest (% p.a.)</label>
          <input type="number" value={interestRate} onChange={e => setRate(+e.target.value)} required />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button type="button" onClick={calcPreview}>Preview EMI</button>{" "}
        <button type="submit">Save Quote</button>
      </div>

      {preview && (
        <p style={{ marginTop: 8 }}>EMI ≈ <strong>₹{preview.emi}</strong> / month</p>
      )}
    </form>
  );
}
