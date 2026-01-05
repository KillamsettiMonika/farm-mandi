import React, { useState } from 'react';
import axios from 'axios';

export default function Forgot(){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  async function submit(e){
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/api/auth/forgot', { email });
      setMsg(res.data.message || 'Check your email (stub)');
    }catch(e){
      setMsg(e.response?.data?.error || e.message);
    }
  }
  return (
    <div className="form card">
      <h2>Forgot Password</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {msg && <div className="card">{msg}</div>}
    </div>
  );
}
