import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, Plus, Store, Check, Edit2, Camera, Trash2, ChevronRight, TrendingUp } from 'lucide-react';
import { useMarketStore } from '../store/useStore';

export default function Home() {
  const navigate = useNavigate();
  const { stores, addStore, updateStoreName, removeStore } = useMarketStore();
  
  // States
  const [time, setTime] = useState(new Date());
  const [locationStr, setLocationStr] = useState('Pusat Perbelanjaan, Indonesia');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState('');

  // Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleEditStart = (id: string, currentName: string) => {
    setEditingId(id);
    setEditBuffer(currentName);
  };

  const handleEditSave = (id: string) => {
    if (editBuffer.trim()) updateStoreName(id, editBuffer.trim());
    setEditingId(null);
  };

  const handleAddStore = () => {
    addStore("Nama Toko Baru");
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      
      {/* TOP NAVIGATION / SEARCH BAR (Mimicking reference topbar) */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-2 text-neutral-500 font-medium bg-white px-4 py-2 rounded-xl shadow-sm border border-neutral-100 w-full md:w-auto">
          <MapPin className="w-4 h-4 text-emerald-500" />
          <span>{locationStr}</span>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="bg-white px-5 py-2.5 rounded-full shadow-sm border border-neutral-100 flex items-center gap-3 w-full md:w-96 text-neutral-400">
             <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
             Ketik untuk mencari struk atau toko...
          </div>
          <div className="bg-black text-white px-5 py-2.5 rounded-full shadow-lg font-semibold tracking-wide border border-neutral-900 shrink-0">
             {time.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit' })}
          </div>
        </div>
      </header>

      {/* HERO BANNER - Psychological Drive (Emerald/Orange mix) */}
      <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-600 p-8 md:p-12 mb-10 shadow-[0_20px_40px_rgba(16,185,129,0.2)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-20 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-400/20 rounded-full blur-2xl translate-y-20 -translate-x-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white max-w-lg">
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold tracking-widest backdrop-blur-sm mb-4">
              <TrendingUp className="w-3 h-3" /> ANALISIS FINANSIAL AKTIF
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              Kendalikan Arus<br/>Keuangan Anda.
            </h1>
            <p className="text-emerald-50 text-base md:text-lg mb-8 opacity-90 font-medium">
              Sistem pintar kami membedah setiap struk belanja menggunakan AI untuk melacak pengeluaran harian. Transparan dan cepat.
            </p>
            <button 
              onClick={() => navigate('/scanner')}
              className="bg-black hover:bg-neutral-800 text-white font-bold py-4 px-8 rounded-full transition-all shadow-xl shadow-black/20 flex items-center gap-3"
            >
              <Camera className="w-5 h-5" /> Catat Struk Sekarang
            </button>
          </div>
          
          {/* Abstract Graphic Element mimicking models in the ref image */}
          <div className="hidden md:flex w-64 h-64 bg-white/10 rounded-[3rem] border border-white/20 backdrop-blur-md items-center justify-center rotate-6 shadow-2xl">
            <ReceiptGraphic />
          </div>
        </div>
      </div>

      {/* STORES GRID SECTION */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-neutral-800 flex items-center gap-2">
          Jaringan Pertokoan Terdaftar
        </h2>
        <div className="flex gap-2">
          <span className="bg-neutral-200 text-neutral-600 px-3 py-1 rounded-full text-sm font-bold">Terbaru</span>
          <span className="text-neutral-400 px-3 py-1 text-sm font-bold cursor-pointer">Sering Kunjung</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stores.map((store) => (
          <div key={store.id} className="bg-white rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-neutral-100 group relative transition-transform hover:-translate-y-2 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] flex flex-col h-64">
            
            {/* Minimalist Shop Icon/Graphic */}
            <div className="h-32 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4 border border-neutral-100 mb-4 overflow-hidden relative">
              <div className="absolute top-0 w-full flex opacity-80">
                 {[...Array(5)].map((_, i) => (
                   <div key={i} className={`h-4 flex-1 ${i % 2 === 0 ? 'bg-orange-400' : 'bg-red-400'} rounded-b`}></div>
                 ))}
              </div>
              <Store className="w-12 h-12 text-neutral-300 drop-shadow-sm" strokeWidth={1} />
              
              {/* Quick Action Overlay */}
              <button 
                onClick={() => navigate('/scanner')} 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2"
              >
                 <div className="bg-orange-500 rounded-full p-3 shadow-lg">
                   <Plus className="w-6 h-6" />
                 </div>
                 <span className="font-bold text-sm">Masuk Toko</span>
              </button>
            </div>

            {/* Store Name & Edit */}
            <div className="flex-1 flex flex-col justify-end">
              {editingId === store.id ? (
                <div className="flex flex-col gap-2 relative z-10 w-full mb-1">
                  <input 
                    autoFocus
                    type="text" 
                    value={editBuffer} 
                    onChange={(e) => setEditBuffer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEditSave(store.id)}
                    className="bg-neutral-50 border border-neutral-200 text-neutral-800 text-center rounded-lg px-2 py-1.5 w-full font-bold focus:outline-none focus:border-emerald-500 text-lg"
                  />
                  <button onClick={() => handleEditSave(store.id)} className="bg-emerald-50 text-emerald-600 py-1 text-sm rounded-lg border border-emerald-100 font-semibold hover:bg-emerald-100">
                    Simpan
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-start gap-2">
                  <div className="w-full">
                    <h3 className="font-extrabold text-[1.15rem] leading-tight text-neutral-800 truncate pr-2">{store.name}</h3>
                    <p className="text-xs text-neutral-400 font-medium mt-1">Struk: 0 lembar</p>
                  </div>
                  
                  <div className="flex bg-neutral-50 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity border border-neutral-100 shrink-0">
                    <button onClick={() => handleEditStart(store.id, store.name)} className="p-1.5 hover:bg-white rounded text-neutral-400 hover:text-blue-500 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeStore(store.id)} className="p-1.5 hover:bg-white rounded text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        ))}

        {/* Add Store Button Card */}
        <button 
          onClick={handleAddStore}
          className="bg-white rounded-[2rem] p-5 shadow-sm border-2 border-dashed border-neutral-200 hover:border-orange-400 hover:bg-orange-50/30 flex flex-col items-center justify-center h-64 gap-3 transition-all group"
        >
          <div className="bg-neutral-50 text-neutral-300 group-hover:bg-orange-100 group-hover:text-orange-500 p-4 rounded-full transition-colors">
            <Plus className="w-8 h-8" />
          </div>
          <span className="font-extrabold text-neutral-400 group-hover:text-orange-600 transition-colors">Tambah Toko Baru</span>
        </button>
      </div>

    </div>
  );
}

// Decorative component purely for the banner
function ReceiptGraphic() {
  return (
    <div className="w-32 h-40 bg-white/90 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] p-4 flex flex-col gap-2 translate-y-4">
       <div className="w-full h-2 bg-neutral-200/50 rounded-full mb-2"></div>
       <div className="w-3/4 h-2 bg-neutral-200/50 rounded-full"></div>
       <div className="w-5/6 h-2 bg-emerald-100 rounded-full"></div>
       <div className="mt-auto w-full h-8 bg-orange-100 rounded-lg flex items-center justify-center">
         <span className="text-orange-500 font-mono text-[10px] font-bold">TOTAL: Rp***</span>
       </div>
    </div>
  );
}
