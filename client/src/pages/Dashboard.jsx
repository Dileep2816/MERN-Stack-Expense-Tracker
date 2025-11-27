import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { getSummary } from '../api/expenses.js';

const COLORS = ['#06b6d4','#60a5fa','#a78bfa','#34d399','#f59e0b','#f43f5e','#22c55e','#eab308'];

export default function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [range, setRange] = useState({ from: '', to: '' });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getSummary(range);
    setSummary(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="grid grid-2">
      <div className="panel">
        <h2 className="h1">Aggregate Spending Summary</h2>
        <div className="row" style={{marginBottom:12}}>
          <input className="input" type="date" value={range.from} onChange={e=>setRange(r=>({...r, from:e.target.value}))} />
          <input className="input" type="date" value={range.to} onChange={e=>setRange(r=>({...r, to:e.target.value}))} />
          <button className="button" onClick={load}>Apply</button>
        </div>
        {loading ? <div>Loading…</div> : (
          summary.length ? (
            <div style={{width:'100%',height:360}}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie dataKey="total" data={summary} cx="50%" cy="50%" outerRadius={120} label={(e)=>e.category}>
                    {summary.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v)=>`$${Number(v).toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : <div>No data yet</div>
        )}
      </div>
      <div className="panel">
        <h2 className="h1">Tips</h2>
        <ul>
          <li>Use the date range to focus on specific periods.</li>
          <li>Head to Expenses to add, edit, and filter transactions.</li>
        </ul>
      </div>
    </div>
  );
}
