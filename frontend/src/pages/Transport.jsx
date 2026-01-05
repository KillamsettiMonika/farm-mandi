import React, { useState } from 'react';
import { transportOptions } from '../api';

export default function Transport(){
  const [form, setForm] = useState({ from:'', to:'', quantity:1000 });
  const [result, setResult] = useState(null);
  const [err, setErr] = useState('');

  async function submit(e){
    e.preventDefault();
    try{
      const res = await transportOptions(form);
      setResult(res);
    }catch(e){
      setErr(e.response?.data?.error || e.message);
    }
  }

  return (
    <div className="form card">
      <h2>Transport Options</h2>
      <form onSubmit={submit}>
        <input placeholder="From" value={form.from} onChange={e=>setForm({...form,from:e.target.value})} />
        <input placeholder="To" value={form.to} onChange={e=>setForm({...form,to:e.target.value})} />
        <input type="number" placeholder="Quantity (kg)" value={form.quantity} onChange={e=>setForm({...form,quantity:+e.target.value})} />
        <button type="submit">Find Trucks</button>
      </form>
      {err && <div className="card">{err}</div>}
      {result && result.trucks && result.trucks.map((t, i)=> (
        <div key={i} className="card">
          <div>{t.provider}</div>
          <div>Capacity: {t.capacity} kg</div>
          <div>Price: ₹{t.price}</div>
          <div>ETA: {t.eta_minutes} minutes</div>
        </div>
      ))}
    </div>
  );
}
