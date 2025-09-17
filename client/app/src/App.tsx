import { useEffect, useState } from "react";
import { api } from "./lib/api";

type Week = { id: number; weekStart: string };

export default function App() {
  const [weeks, setWeeks] = useState<Week[]>([]);

  useEffect(() => {
    api.get("/weeks").then(r => setWeeks(r.data));
  }, []);

  const create = async () => {
    const monday = new Date();
    const day = monday.getDay(); // 0..6
    const diff = (day === 0 ? -6 : 1 - day); // to Monday
    monday.setDate(monday.getDate() + diff);
    const iso = monday.toISOString().slice(0,10);
    await api.post("/weeks", { weekStart: iso });
    const { data } = await api.get("/weeks");
    setWeeks(data);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Weeks</h1>
      <button onClick={create}>Create current week</button>
      <ul>
        {weeks.map(w => <li key={w.id}>{w.weekStart}</li>)}
      </ul>
    </div>
  );
}
