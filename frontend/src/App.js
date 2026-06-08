import React, { useState } from 'react';
import Chat from './components/Chat';
import PropertyGrid from './components/PropertyGrid';

export default function App() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', fontFamily:'sans-serif' }}>
      <div style={{ width:360, background:'#fff', borderRight:'1px solid #eee', display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'20px 24px', background:'#1a1a2e' }}>
          <div style={{ color:'#fff', fontSize:20, fontWeight:700 }}>PropFind</div>
          <div style={{ color:'#8888aa', fontSize:13 }}>AI property search — free</div>
        </div>
        <Chat onResults={(p) => { setProperties(p); setSearched(true); }} onLoading={setLoading} />
      </div>
      <div style={{ flex:1, overflow:'auto', padding:24, background:'#f5f5f0' }}>
        {!searched
          ? <div style={{ height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#999', gap:12 }}>
              <div style={{ fontSize:48 }}>🏠</div>
              <div style={{ fontSize:18, fontWeight:600, color:'#555' }}>Find your perfect property</div>
              <div style={{ fontSize:14 }}>Try: "3-bed house under $300k"</div>
            </div>
          : loading
          ? <div style={{ textAlign:'center', marginTop:80, color:'#999' }}>Searching...</div>
          : <PropertyGrid properties={properties} />
        }
      </div>
    </div>
  );
}