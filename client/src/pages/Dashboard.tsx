import React, { useEffect, useState } from "react";
import api, { setAuthToken } from "../api";
import QuoteForm from "../components/QuoteForm";
import QuoteList from "../components/QuoteList";

export default function Dashboard({ token }: { token: string }) {
  const [procedures, setProcedures] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    setAuthToken(token);
    (async () => {
      try {
        const { data } = await api.get("/api/procedures");
        if (data.length === 0) {
          await api.get("/api/procedures/seed");
          const res = await api.get("/api/procedures");
          setProcedures(res.data);
        } else setProcedures(data);
      } catch (e) {
        console.error(e);
      }
      await refreshQuotes();
    })();
  }, [token]);

  async function refreshQuotes() {
    try {
      const res = await api.get("/api/quotes");
      setQuotes(res.data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="row">
        <div className="card">
          <QuoteForm procedures={procedures} onCreated={refreshQuotes} />
        </div>
        <div className="card">
          <QuoteList quotes={quotes} />
        </div>
      </div>
    </div>
  );
}
