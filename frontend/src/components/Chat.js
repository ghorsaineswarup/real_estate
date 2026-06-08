import React, { useState, useRef, useEffect } from 'react';

export default function Chat({ onResults, onLoading }) {
  const [messages, setMessages] = useState([{ role:'assistant', content:"Hi! Tell me what property you're looking for — city, budget, bedrooms, type." }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottom = useRef();

  useEffect(() => { bottom.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setInput('');
    const userMsg = { role:'user', content:msg };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);
    onLoading(true);
    try {
       const res = await fetch('https://realestate-production-f273.up.railway.app/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: messages })
      });
      const data = await res.json();
      setMessages([...next, { role:'assistant', content: data.reply || 'Here are the results:', count: data.count }]);
      onResults(data.properties || []);
    } catch {
      setMessages([...next, { role:'assistant', content:'Something went wrong, try again.' }]);
    } finally {
      setLoading(false);
      onLoading(false);
    }
  }

  const suggestions = ['2-bed apartment under $200k', 'Houses in Lalitpur', 'Cheap studio', 'Luxury villa'];

  return (
    <div style={{ display:'flex', flexDirection:'column', flex:1, overflow:'hidden' }}>
      <div style={{ flex:1, overflowY:'auto', padding:16 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom:10, display:'flex', justifyContent: m.role==='user'?'flex-end':'flex-start' }}>
            <div style={{ maxWidth:'85%', padding:'10px 14px', borderRadius:12, background: m.role==='user'?'#1a1a2e':'#f0f0ea', color: m.role==='user'?'#fff':'#111', fontSize:14, lineHeight:1.5 }}>
              {m.content}
              {m.count !== undefined && <div style={{ fontSize:12, opacity:0.6, marginTop:4 }}>{m.count} properties found</div>}
            </div>
          </div>
        ))}
        {loading && <div style={{ color:'#aaa', fontSize:13 }}>Searching...</div>}
        <div ref={bottom} />
      </div>
      {messages.length === 1 && (
        <div style={{ padding:'0 16px 12px', display:'flex', flexWrap:'wrap', gap:6 }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => send(s)} style={{ background:'#f0f0ea', border:'none', borderRadius:20, padding:'5px 12px', fontSize:12, cursor:'pointer' }}>{s}</button>
          ))}
        </div>
      )}
      <div style={{ padding:'12px 16px', borderTop:'1px solid #eee', display:'flex', gap:8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()} placeholder="Describe what you want..." disabled={loading}
          style={{ flex:1, padding:'10px 14px', border:'1px solid #ddd', borderRadius:24, fontSize:14, outline:'none' }} />
        <button onClick={() => send()} disabled={loading || !input.trim()}
          style={{ padding:'10px 18px', background:'#1a1a2e', color:'#fff', border:'none', borderRadius:24, fontSize:14, cursor:'pointer', opacity: loading||!input.trim()?0.5:1 }}>
          Go
        </button>
      </div>
    </div>
  );
}