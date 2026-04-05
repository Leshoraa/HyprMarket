import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Edit2, Trash2, TrendingUp, Camera, Search, ShoppingBag, Receipt } from 'lucide-react';
import { useMarketStore } from '../store/useStore';

export default function Home() {
  const navigate = useNavigate();
  const { stores, addStore, updateStoreName, removeStore } = useMarketStore();

  const [time, setTime] = useState(new Date());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState('');
  const [activeFilter, setActiveFilter] = useState<'terbaru' | 'sering'>('terbaru');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEditStart = (id: string, name: string) => { setEditingId(id); setEditBuffer(name); };
  const handleEditSave = (id: string) => {
    if (editBuffer.trim()) updateStoreName(id, editBuffer.trim());
    setEditingId(null);
  };

  const timeStr = time.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="home-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: 24, paddingBottom: 80, animation: 'fade-up 0.35s ease-out both' }}>

      {/* ── TOP NAV (Redesigned) ───────────────────────────────── */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 28, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
            Halo, Selamat Datang 👋
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>
            Kelola metrik finansial toko Anda secara presisi.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, justifyContent: 'flex-end' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'var(--bg-soft)', padding: '0 14px', height: 42, borderRadius: 'var(--radius-full)',
            color: 'var(--text-2)', fontSize: 12.5, fontWeight: 600,
          }}>
            <MapPin size={13} style={{ color: 'var(--primary)' }} />
            <span style={{ whiteSpace: 'nowrap' }}>Pusat Perbelanjaan, ID</span>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--surface)', border: '1px solid var(--border)',
            padding: '0 16px', height: 42, borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-sm)', flex: 1, maxWidth: 360,
          }}>
            <Search size={14} style={{ color: 'var(--text-4)' }} />
            <input
              type="text"
              placeholder="Cari rekam struk..."
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: 13, color: 'var(--text-1)', fontWeight: 500 }}
            />
            <div style={{ background: 'var(--bg-soft)', color: 'var(--text-3)', fontSize: 10, fontWeight: 700, padding: '3px 6px', borderRadius: 6 }}>⌘K</div>
          </div>

          <div style={{
            background: 'var(--terra)', color: 'white',
            padding: '0 20px', height: 42, borderRadius: 'var(--radius-full)',
            display: 'flex', alignItems: 'center', fontWeight: 800,
            fontSize: 14.5, letterSpacing: '0.04em',
            boxShadow: '0 4px 16px var(--terra-glow)', flexShrink: 0,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {timeStr}
          </div>
        </div>
      </header>

      {/* ── HERO BANNER (compact) ─────────────────── */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--terra)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
        marginBottom: 28,
        boxShadow: '0 8px 28px rgba(74, 93, 82, 0.25), 0 2px 8px rgba(74, 93, 82, 0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 20,
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -40, right: 120, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, right: 20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        {/* Left content */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)',
            color: 'rgba(255,255,255,0.75)', padding: '4px 12px',
            borderRadius: 'var(--radius-full)', width: 'fit-content',
            fontSize: 9.5, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            <TrendingUp size={9} style={{ color: 'rgba(255,255,255,0.75)' }} /> Analisis Aktif
          </div>

          <h1 style={{ fontSize: 16, fontWeight: 800, color: 'white', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
            Kendalikan Arus Keuangan Anda.
          </h1>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', fontWeight: 400, maxWidth: 320, lineHeight: 1.5 }}>
            Sistem membedah struk via AI untuk lacak transaksi secara transparan.
          </p>

          {/* Mini stats */}
          <div style={{ display: 'flex', gap: 16, marginTop: 2 }}>
            {[
              { label: 'Toko Aktif', value: stores.length },
              { label: 'Struk Direkam', value: 0 },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 17, fontWeight: 900, color: 'white', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.65)', fontWeight: 500, marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/scanner')}
          style={{
            position: 'relative', zIndex: 1, flexShrink: 0,
            background: 'var(--tan)', color: 'white',
            border: 'none', cursor: 'pointer',
            padding: '0 24px', height: 46, borderRadius: 'var(--radius-full)',
            fontWeight: 800, fontSize: 13.5,
            display: 'flex', alignItems: 'center', gap: 7,
            boxShadow: '0 8px 24px var(--tan)',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
        >
          <Camera size={14} />
          Catat Struk
        </button>
      </div>

      {/* ── SECTION HEADER ───────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-1)', letterSpacing: '-0.01em', lineHeight: 1.25 }}>
            Jaringan Pertokoan
          </h2>
          <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, marginTop: 2 }}>
            {stores.length} toko terdaftar
          </p>
        </div>

        <div style={{ display: 'flex', gap: 4, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4 }}>
          {(['terbaru', 'sering'] as const).map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '5px 13px', borderRadius: 'var(--radius-sm)',
              border: 'none', cursor: 'pointer',
              background: activeFilter === f ? 'var(--terra)' : 'transparent',
              color: activeFilter === f ? 'white' : 'var(--text-3)',
              fontSize: 11.5, fontWeight: 700,
              transition: 'all 0.18s ease',
            }}>
              {f === 'terbaru' ? 'Terbaru' : 'Sering Kunjung'}
            </button>
          ))}
        </div>
      </div>

      {/* ── STORE GRID ───────────────────────────── */}
      <div className="store-grid">

        {/* ADD CARD */}
        <AddStoreCard onAdd={() => addStore('Nama Toko Baru')} />

        {/* STORE CARDS */}
        {stores.map((store, idx) => (
          <StoreCard
            key={store.id}
            store={store}
            editingId={editingId}
            editBuffer={editBuffer}
            setEditBuffer={setEditBuffer}
            onEditStart={handleEditStart}
            onEditSave={handleEditSave}
            onDelete={removeStore}
            onNavigate={() => navigate('/scanner')}
            delay={idx * 60}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── ADD CARD ─────────────────────────────────────────── */
function AddStoreCard({ onAdd }: { onAdd: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onAdd}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        border: `1.5px dashed ${hovered ? 'var(--primary)' : 'var(--border)'}`,
        background: hovered ? 'var(--primary-dim)' : 'var(--surface)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-card)',
        transition: 'all 0.22s ease',
        minHeight: 230,
      }}
    >
      {/* Roof placeholder */}
      <div style={{
        height: 52,
        background: hovered ? 'var(--primary-dim)' : 'var(--bg-soft)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        borderBottom: `1px dashed ${hovered ? 'var(--primary)' : 'var(--border)'}`,
        position: 'relative',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 'var(--radius-md)',
          border: `1.5px dashed ${hovered ? 'var(--primary)' : 'var(--text-4)'}`,
          background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: 'translateY(50%)',
        }}>
          <Plus size={16} style={{ color: hovered ? 'var(--primary)' : 'var(--text-4)' }} />
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: '28px 16px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textAlign: 'center' }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: hovered ? 'var(--primary)' : 'var(--text-3)', marginBottom: 4 }}>Tambah Toko</div>
        <div style={{ fontSize: 11.5, color: 'var(--text-4)', fontWeight: 500, lineHeight: 1.4 }}>Mau ke toko mana hari ini?</div>
      </div>
    </button>
  );
}

/* ─── STORE CARD (bentuk fasad toko) ───────────────────── */
const STORE_PALETTES = [
  { roof: '#D72323', wall: '#FCE38A', accent: '#F57E20' }, // Fast Food / Burger
  { roof: '#3E6D5B', wall: '#F4EBD0', accent: '#74B49B' }, // Matcha & Cream
  { roof: '#8D6262', wall: '#F4EBD0', accent: '#DFD8C8' }, // Bakery / Coffee
  { roof: '#E84A5F', wall: '#FECEA8', accent: '#99B898' }, // Watermelon
  { roof: '#F08A5D', wall: '#EEEEEE', accent: '#B83B5E' }, // Salmon Sushi
];

function StoreCard({ store, editingId, editBuffer, setEditBuffer, onEditStart, onEditSave, onDelete, onNavigate, delay }: any) {
  const [hovered, setHovered] = useState(false);
  const palette = STORE_PALETTES[parseInt(store.id?.slice(-4) || '0', 16) % STORE_PALETTES.length];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        background: 'var(--surface)',
        border: '1px solid var(--border-soft)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-card)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.22s ease',
        animation: `fade-up 0.35s ${delay}ms ease-out both`,
        display: 'flex', flexDirection: 'column',
        minHeight: 230, cursor: 'default',
        position: 'relative',
      }}
    >
      {/* ── FASAD TOKO ── */}
      <div style={{ position: 'relative', background: palette.wall }}>

        {/* Atap / Awning (Striped & Scalloped) */}
        <div style={{
          position: 'relative',
          display: 'flex',
          zIndex: 2,
        }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{
              flex: 1,
              background: i % 2 === 0 ? palette.roof : palette.accent,
              height: i % 2 === 0 ? 54 : 50,
              borderRadius: '0 0 10px 10px',
              boxShadow: '0 3px 6px rgba(0,0,0,0.08)'
            }} />
          ))}

          {/* Nama toko sign di atap */}
          <div style={{
            position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
            color: 'white', fontSize: 10, fontWeight: 800,
            letterSpacing: '0.06em', padding: '3px 14px',
            borderRadius: 'var(--radius-full)',
            maxWidth: '85%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            {store.name.toUpperCase()}
          </div>
        </div>

        {/* Badan toko / fasad */}
        <div style={{ height: 100, display: 'flex', position: 'relative', overflow: 'hidden' }}>

          {/* Pintu tengah (Natural Wood & Glass) */}
          <div style={{
            position: 'absolute', bottom: 0,
            left: '50%', transform: 'translateX(-50%)',
            width: 38, height: 60,
            background: '#8D6E63',
            border: `2px solid #5D4037`,
            borderBottom: 'none',
            borderRadius: '4px 4px 0 0',
            display: 'flex', flexDirection: 'column', padding: 3,
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)',
          }}>
            {/* Kaca Pintu */}
            <div style={{ height: 26, background: '#E0F7FA', borderRadius: 2, border: '1px solid rgba(0,0,0,0.1)' }} />
            {/* Gagang Pintu */}
            <div style={{ width: 5, height: 6, borderRadius: '50%', background: '#D7CCC8', marginTop: 'auto', marginBottom: 20, marginLeft: 22, boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }} />
          </div>

          {/* Jendela kiri (Frame Putih & Kaca Cyan) */}
          <div style={{
            position: 'absolute', top: 20, left: '16%',
            width: 32, height: 32,
            background: '#F5F5F5',
            border: `2px solid #9E9E9E`,
            borderRadius: 3,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2, padding: 3,
            boxShadow: '0 2px 4px rgba(0,0,0,0.06), inset 0 2px 4px rgba(0,0,0,0.05)',
          }}>
            {[0, 1, 2, 3].map(i => <div key={i} style={{ background: '#CCECF8', borderRadius: 1 }} />)}
          </div>

          {/* Jendela kanan (Frame Putih & Kaca Cyan) */}
          <div style={{
            position: 'absolute', top: 20, right: '16%',
            width: 32, height: 32,
            background: '#F5F5F5',
            border: `2px solid #9E9E9E`,
            borderRadius: 3,
            display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 2, padding: 3,
            boxShadow: '0 2px 4px rgba(0,0,0,0.06), inset 0 2px 4px rgba(0,0,0,0.05)',
          }}>
            {[0, 1, 2, 3].map(i => <div key={i} style={{ background: '#CCECF8', borderRadius: 1 }} />)}
          </div>

          {/* Action overlay on hover */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(42, 32, 24, 0.55)', backdropFilter: 'blur(3px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: hovered ? 1 : 0, transition: 'opacity 0.22s ease',
          }}>
            <button onClick={onNavigate} style={{
              background: palette.roof, color: 'white',
              border: 'none', cursor: 'pointer',
              padding: '7px 16px', borderRadius: 'var(--radius-full)',
              fontWeight: 700, fontSize: 12,
              display: 'flex', alignItems: 'center', gap: 5,
              boxShadow: `0 4px 14px ${palette.roof}60`,
              transition: 'transform 0.15s',
            }}>
              <ShoppingBag size={12} /> Masuk Toko
            </button>
          </div>
        </div>
      </div>

      {/* ── CARD FOOTER ── */}
      <div style={{ padding: '12px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {editingId === store.id ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <input
              autoFocus type="text" value={editBuffer}
              onChange={e => setEditBuffer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onEditSave(store.id)}
              style={{
                background: 'var(--bg)', border: `1.5px solid ${palette.roof}`,
                borderRadius: 'var(--radius-sm)', padding: '6px 10px',
                fontSize: 12.5, fontWeight: 600, color: 'var(--text-1)',
                outline: 'none', width: '100%',
              }}
            />
            <button onClick={() => onEditSave(store.id)} style={{
              background: palette.roof, color: 'white',
              border: 'none', borderRadius: 'var(--radius-xs)',
              padding: '5px', fontSize: 11.5, fontWeight: 700, cursor: 'pointer',
            }}>Simpan</button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Receipt size={11} style={{ color: 'var(--text-4)' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-4)', fontWeight: 500 }}>0 struk</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <ShoppingBag size={11} style={{ color: 'var(--text-4)' }} />
                  <span style={{ fontSize: 11, color: 'var(--text-4)', fontWeight: 500 }}>0 item</span>
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex', gap: 3,
              opacity: hovered ? 1 : 0, transition: 'opacity 0.18s ease',
            }}>
              <button onClick={() => onEditStart(store.id, store.name)} style={{
                width: 26, height: 26, borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border)', background: 'var(--surface)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-3)', transition: 'all 0.15s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = palette.roof; (e.currentTarget as HTMLElement).style.borderColor = palette.roof; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <Edit2 size={11} />
              </button>
              <button onClick={() => onDelete(store.id)} style={{
                width: 26, height: 26, borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border)', background: 'var(--surface)',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-3)', transition: 'all 0.15s ease',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary-light)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <Trash2 size={11} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
