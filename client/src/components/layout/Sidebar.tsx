import { NavLink } from 'react-router-dom';
import { Home, ScanLine, Heart, Settings, MessageSquare, ShoppingBag } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white m-4 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col p-6 hidden md:flex sticky top-4 h-[calc(100vh-2rem)] border border-neutral-100">
      
      {/* BRANDING */}
      <div className="font-extrabold text-2xl tracking-widest mb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-black rounded-xl text-white flex items-center justify-center text-sm shadow-md">
          HM
        </div> 
        HyprMarket
      </div>
      
      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink 
          to="/" 
          className={({isActive}) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all ${isActive ? 'bg-black text-white shadow-lg shadow-black/20' : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'}`}
        >
          <Home className="w-5 h-5" /> Dasbor
        </NavLink>
        
        <NavLink 
          to="/scanner" 
          className={({isActive}) => `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all ${isActive ? 'bg-black text-white shadow-lg shadow-black/20' : 'text-neutral-500 hover:bg-neutral-50 hover:text-black'}`}
        >
          <ScanLine className="w-5 h-5" /> Pemindai AI
        </NavLink>

        <div className="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all text-neutral-400 cursor-not-allowed">
          <ShoppingBag className="w-5 h-5" /> Riwayat
        </div>
        <div className="flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold transition-all text-neutral-400 cursor-not-allowed">
          <Heart className="w-5 h-5" /> Favorit
        </div>
      </nav>

      {/* BOTTOM ACTION */}
      <div className="mt-auto">
        <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex flex-col items-center text-center gap-2 mb-4">
          <div className="bg-orange-100 text-orange-500 w-10 h-10 rounded-full flex items-center justify-center font-bold mb-1">!</div>
          <p className="text-xs font-semibold text-neutral-700">Tips Finansial</p>
          <p className="text-[10px] text-neutral-500">Pemindaian rutin menjaga stabilitas anggaran bulanan Anda.</p>
        </div>
        
        <div className="flex items-center gap-4 px-4 py-3 rounded-2xl font-semibold transition-all text-neutral-500 hover:bg-neutral-50 cursor-pointer">
          <Settings className="w-5 h-5" /> Pengaturan
        </div>
      </div>

    </aside>
  );
}
