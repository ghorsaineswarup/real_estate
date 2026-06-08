import React from 'react';

function fmt(p) {
  if (p >= 1000000) return `$${(p/1000000).toFixed(1)}M`;
  if (p >= 1000) return `$${(p/1000).toFixed(0)}k`;
  return `$${p}`;
}

function Card({ p }) {
  return (
    <div style={{ background:'#fff', borderRadius:12, overflow:'hidden', border:'1px solid #e5e5e0' }}>
      <img src={p.image_url} alt={p.title} style={{ width:'100%', height:180, objectFit:'cover' }} onError={e => e.target.src='https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'} />
      <div style={{ padding:'14px 16px' }}>
        <div style={{ fontSize:22, fontWeight:700, color:'#1a1a2e' }}>{fmt(p.price)}</div>
        <div style={{ fontSize:15, fontWeight:600, margin:'4px 0 8px' }}>{p.title}</div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:8 }}>
          {[`${p.bedrooms} bed`, p.type, p.city].map(t => (
            <span key={t} style={{ background:'#f0f0ea', padding:'3px 10px', borderRadius:20, fontSize:12 }}>{t}</span>
          ))}
        </div>
        <div style={{ fontSize:13, color:'#666' }}>{p.description}</div>
      </div>
    </div>
  );
}

export default function PropertyGrid({ properties }) {
  if (!properties?.length) return (
    <div style={{ textAlign:'center', padding:60, color:'#999' }}>
      <div style={{ fontSize:36 }}>🔍</div>
      <div style={{ marginTop:8 }}>No properties found — try different filters</div>
    </div>
  );
  return (
    <div>
      <div style={{ marginBottom:16, fontSize:14, color:'#666' }}>{properties.length} properties found</div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:20 }}>
        {properties.map((p, i) => <Card key={p.id || i} p={p} />)}
      </div>
    </div>
  );
}