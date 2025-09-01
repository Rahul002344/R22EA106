import React from "react";

export default function QuoteList({ quotes }: { quotes: any[] }) {
  return (
    <div>
      <h3>My Quotes</h3>
      <div className="list">
        {quotes.map(q => (
          <div className="item" key={q._id}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{q.procedureId?.name || "Procedure"}</strong>
              <span>₹{q.amount} • {q.tenureMonths} mo • {q.interestRate}% p.a.</span>
            </div>
            <div>EMI: <strong>₹{q.emi}</strong></div>
            <small>{new Date(q.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
