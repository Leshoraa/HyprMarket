import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, ShoppingBag, Heart, Settings, ChevronRight, Store, Lightbulb } from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dasbor', active: true },
  { to: '/scanner', icon: ScanLine, label: 'Pemindai AI', active: true },
  { to: null, icon: ShoppingBag, label: 'Riwayat', active: false },
  { to: null, icon: Heart, label: 'Favorit', active: false },
];

export default function Sidebar() {
  return (
    <aside style={{
      width: 'var(--sidebar-width)',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      margin: '24px 0 24px 24px',
      height: 'calc(100vh - 48px)',
      position: 'sticky',
      top: 24,
      background: 'var(--surface)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: '0 12px 40px rgba(44, 40, 37, 0.12)',
      border: '1px solid var(--border)',
      zIndex: 10,
    }}>

      {/* BRAND */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 30, padding: '0 8px' }}>
        <div style={{
          width: 38, height: 38,
          borderRadius: 12,
          background: 'var(--terra)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white',
          flexShrink: 0,
          boxShadow: '0 4px 14px var(--terra-glow)',
        }}>
          <Store size={20} strokeWidth={2.5} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--text-1)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>HyprMarket</div>
          <div style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Finance Tracker</div>
        </div>
      </div>

      {/* SECTION LABEL */}
      <div style={{ fontSize: 9.5, fontWeight: 700, color: 'var(--text-4)', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0 10px', marginBottom: 5 }}>
        Menu
      </div>

      {/* NAV */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          if (!item.active || !item.to) {
            return (
              <div key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', borderRadius: 'var(--radius-md)',
                color: 'var(--text-4)', cursor: 'not-allowed',
                fontSize: 13.5, fontWeight: 500,
              }}>
                <Icon size={15} style={{ flexShrink: 0 }} />
                <span>{item.label}</span>
              </div>
            );
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--terra)' : 'var(--text-2)',
                background: isActive ? 'var(--terra-dim)' : 'transparent',
                fontWeight: isActive ? 700 : 500,
                fontSize: 13.5,
                textDecoration: 'none',
                transition: 'all 0.18s ease',
                position: 'relative',
              })}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div style={{
                      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                      width: 4, height: '60%', borderRadius: 99,
                      background: 'var(--tan)',
                      boxShadow: '0 0 10px var(--tan-dim)',
                    }} />
                  )}
                  <Icon size={15} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {isActive && <ChevronRight size={12} style={{ opacity: 0.4 }} />}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* SETTINGS */}
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '9px 10px', borderRadius: 'var(--radius-md)',
          color: 'var(--text-2)', cursor: 'pointer', fontSize: 13.5, fontWeight: 500,
          transition: 'all 0.18s ease',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-1)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'; }}
        >
          <Settings size={15} />
          <span>Pengaturan</span>
        </div>
      </div>

    </aside>
  );
}
