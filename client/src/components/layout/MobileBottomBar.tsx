import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, ShoppingBag, Heart } from 'lucide-react';

export default function MobileBottomBar() {
  return (
    <div style={{
      display: 'none',
      position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
      width: 'calc(100% - 48px)', maxWidth: 360,
      zIndex: 50,
    }}
      className="mobile-bar"
    >
      <nav style={{
        background: 'rgba(255, 255, 255, 0.88)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)',
        borderRadius: 999,
        padding: '10px 28px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <NavLink to="/" style={({ isActive }) => ({
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          color: isActive ? 'var(--primary)' : 'var(--text-4)',
          textDecoration: 'none', transition: 'all 0.18s ease',
          transform: isActive ? 'scale(1.1)' : 'scale(1)',
        })}>
          <LayoutDashboard size={22} />
        </NavLink>

        <NavLink to="/scanner" style={({ isActive }) => ({
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 48, height: 48, borderRadius: 14,
          background: isActive ? 'var(--terra)' : 'var(--primary)',
          color: 'white',
          boxShadow: isActive ? '0 6px 16px var(--terra-glow)' : '0 6px 16px var(--primary-glow)',
          textDecoration: 'none', transition: 'all 0.18s ease',
          marginTop: -14,
        })}>
          <ScanLine size={22} />
        </NavLink>

        <div style={{ color: 'var(--text-4)' }}><ShoppingBag size={22} /></div>
        <div style={{ color: 'var(--text-4)' }}><Heart size={22} /></div>
      </nav>
    </div>
  );
}
