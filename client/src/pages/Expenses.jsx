import { useEffect, useMemo, useState } from 'react';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../api/expenses.js';
import { formatDate } from '../utils/format.js';
import FormInput from '../components/FormInput.jsx';
import TableRow from '../components/TableRow.jsx';

const CATEGORIES = ['Food','Transport','Bills','Entertainment','Shopping','Health','Travel','Other'];

export default function Expenses(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title:'', amount:'', category:'', date:'', notes:'' });
  const [filters, setFilters] = useState({ q:'', category:'', sortBy:'date', order:'desc' });

  const load = async () => {
    setLoading(true);
    const data = await getExpenses(filters);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filters.sortBy, filters.order]);

  const submit = async (e) => {
    e.preventDefault();
    if(!form.title || !form.amount || !form.category || !form.date) return;
    const payload = { ...form, amount: Number(form.amount) };
    const created = await createExpense(payload);
    setItems(prev => [created, ...prev]);
    setForm({ title:'', amount:'', category:'', date:'', notes:'' });
  };

  const onEdit = async (id, patch) => {
    const updated = await updateExpense(id, patch);
    setItems(prev => prev.map(i => i._id === id ? updated : i));
  };

  const onDelete = async (id) => {
    await deleteExpense(id);
    setItems(prev => prev.filter(i => i._id !== id));
  };

  const sorted = useMemo(() => items, [items]);

  return (
    <div className="grid">
      <div className="panel">
        <h2 className="h1">Add Expense</h2>
        <form onSubmit={submit} className="grid" style={{gridTemplateColumns:'repeat(5,1fr)', gap:12}}>
          <FormInput label="Title" type="text" value={form.title} onChange={v=>setForm({...form,title:v})} placeholder="e.g., Coffee" />
          <FormInput label="Amount" type="number" value={form.amount} onChange={v=>setForm({...form,amount:v})} min="0" step="0.01" />
          <div>
            <label>Category</label>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              <option value="">Select</option>
              {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <FormInput label="Date" type="date" value={form.date} onChange={v=>setForm({...form,date:v})} />
          <FormInput label="Notes" type="text" value={form.notes} onChange={v=>setForm({...form,notes:v})} placeholder="Optional" />
          <div style={{gridColumn:'1 / -1', display:'flex', justifyContent:'flex-end'}}>
            <button className="button" type="submit">Add</button>
          </div>
        </form>
      </div>

      <div className="panel">
        <h2 className="h1">All Expenses</h2>
        <div className="row" style={{marginBottom:12}}>
          <input className="input" placeholder="Search title" value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})} />
          <select value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filters.sortBy} onChange={e=>setFilters({...filters,sortBy:e.target.value})}>
            <option value="date">Date</option>
            <option value="amount">Amount</option>
            <option value="title">Title</option>
            <option value="category">Category</option>
          </select>
          <select value={filters.order} onChange={e=>setFilters({...filters,order:e.target.value})}>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
          <button className="button" onClick={load}>Apply</button>
        </div>
        {loading ? 'Loading…' : (
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(item => (
                <TableRow key={item._id} item={item} onEdit={onEdit} onDelete={()=>onDelete(item._id)} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
