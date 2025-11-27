import { useState } from 'react';
import { formatCurrency, formatDate } from '../utils/format.js';

export default function TableRow({ item, onEdit, onDelete }){
  const [edit, setEdit] = useState(false);
  const [row, setRow] = useState({ title:item.title, amount:item.amount, category:item.category, date:item.date?.slice(0,10), notes:item.notes || '' });

  const save = async () => {
    await onEdit(item._id, { ...row, amount: Number(row.amount) });
    setEdit(false);
  };

  return (
    <tr>
      <td>{edit ? <input className="input" value={row.title} onChange={e=>setRow({...row,title:e.target.value})} /> : item.title}</td>
      <td>{edit ? <input className="input" value={row.category} onChange={e=>setRow({...row,category:e.target.value})} /> : <span className="badge">{item.category}</span>}</td>
      <td>{edit ? <input className="input" type="number" value={row.amount} onChange={e=>setRow({...row,amount:e.target.value})} /> : formatCurrency(item.amount)}</td>
      <td>{edit ? <input className="input" type="date" value={row.date} onChange={e=>setRow({...row,date:e.target.value})} /> : formatDate(item.date)}</td>
      <td>{edit ? <input className="input" value={row.notes} onChange={e=>setRow({...row,notes:e.target.value})} /> : (item.notes || '-')}</td>
      <td style={{textAlign:'right'}}>
        {edit ? (
          <div className="row">
            <button className="button" onClick={save}>Save</button>
            <button className="toggle" onClick={()=>setEdit(false)}>Cancel</button>
          </div>
        ) : (
          <div className="row">
            <button className="toggle" onClick={()=>setEdit(true)}>Edit</button>
            <button className="toggle" onClick={onDelete}>Delete</button>
          </div>
        )}
      </td>
    </tr>
  );
}
