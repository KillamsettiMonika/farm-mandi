import React, { useState } from 'react';
import { predict } from '../api';
import { useNavigate } from 'react-router-dom';

export default function InputPage(){
  const [form, setForm] = useState({ crop:'Wheat', date:'', location:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try{
      const data = await predict(form);
      // store result temporarily and navigate
      localStorage.setItem('lastPrediction', JSON.stringify({ input: form, result: data }));
      nav('/recommendation');
    }catch(e){
      setErr(e.response?.data?.error || e.message);
    }
  }

  return (
    <div className="form card">
      <h2>Input Produce Details</h2>
      {err && <div className="card">{err}</div>}
      <form onSubmit={submit}>
        <select value={form.crop} onChange={e=>setForm({...form,crop:e.target.value})}>
          <option>Wheat</option>
          <option>Rice</option>
          <option>Maize</option>
          <option>Tomato</option>
        </select>
        <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
        <input placeholder="Your location (e.g., village or coords)" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
        <button type="submit">Predict & Recommend</button>
      </form>
    </div>
  );
}
