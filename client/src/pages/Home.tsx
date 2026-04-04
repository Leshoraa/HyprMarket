import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, MapPin, MapPinOff, Plus, Store, Check, Edit2, Camera, Trash2 } from 'lucide-react';
import { useMarketStore } from '../store/useStore';

export default function Home() {
  const navigate = useNavigate();
  const { stores, addStore, updateStoreName, removeStore } = useMarketStore();
  
  // States
  const [time, setTime] = useState(new Date());
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState('');

  // Clock Ticker
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Location logic
  const toggleLocation = () => {
    if (!locationEnabled) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationEnabled(true);
        }, () => {
          alert("Gagal mengakses satelit lokasi. Izin ditolak.");
        });
      }
    } else {
      setLocationEnabled(false);
      setCoords(null);
    }
  };

  const handleEditStart = (id: string, currentName: string) => {
    setEditingId(id);
    setEditBuffer(currentName);
  };

  const handleEditSave = (id: string) => {
    if (editBuffer.trim()) {
      updateStoreName(id, editBuffer.trim());
    }
    setEditingId(null);
  };

  const handleAddStore = () => {
    addStore("Toko Baru " + (stores.length + 1));
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-4 md:p-8 font-sans">
      
      {/* HEADER: Welcome, Clock, Location */}
      <header className="max-w-4xl mx-auto bg-neutral-800/80 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-neutral-700/50 mb-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-1">
            Selamat Datang, Admin
          </h1>
          <p className="text-neutral-400 font-medium">Dashboard Manajemen Struk & Toko</p>
        </div>

        <div className="flex flex-col items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-neutral-900/80 px-4 py-2 rounded-xl border border-neutral-700/50">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span className="font-mono text-lg font-bold tracking-widest">{time.toLocaleTimeString('id-ID')}</span>
          </div>

          <button 
            onClick={toggleLocation}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all w-full md:w-auto justify-center ${locationEnabled ? 'bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500/20' : 'bg-neutral-900/80 border-neutral-700/50 text-neutral-400 hover:bg-neutral-800'}`}
          >
            {locationEnabled ? <MapPin className="w-4 h-4" /> : <MapPinOff className="w-4 h-4" />}
            <span className="text-sm font-semibold text-nowrap">
              {locationEnabled && coords ? `Lat: ${coords.lat.toFixed(2)}, Lng: ${coords.lng.toFixed(2)}` : 'Aktivasi Lokasi'}
            </span>
          </button>
        </div>
      </header>

      {/* CORE CONTENT */}
      <main className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Store className="w-6 h-6 text-blue-400" /> Jaringan Toko
          </h2>
          <button 
            onClick={() => navigate('/scanner')}
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-5 rounded-xl transition-all flex items-center shadow-lg shadow-blue-600/20 gap-2"
          >
            <Camera className="w-4 h-4" /> Pemindai Struk AI
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <div key={store.id} className="bg-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden shadow-xl group hover:border-neutral-500 transition-colors h-48 flex flex-col relative">
              
              {/* Store Awning Design */}
              <div className="h-10 w-full flex">
                {[...Array(6)].map((_, i) => (
                   <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-red-500/80' : 'bg-red-400/80'} rounded-b-md shadow-sm transform -translate-y-1`}></div>
                ))}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-center text-center relative">
                {editingId === store.id ? (
                  <div className="flex flex-col gap-2 relative z-10 w-full">
                    <input 
                      autoFocus
                      type="text" 
                      value={editBuffer} 
                      onChange={(e) => setEditBuffer(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEditSave(store.id)}
                      className="bg-neutral-900 border border-blue-500 text-white text-center rounded-lg px-3 py-2 w-full font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                    <button onClick={() => handleEditSave(store.id)} className="bg-green-600/20 text-green-400 py-1.5 rounded-lg border border-green-500/30 flex items-center justify-center gap-1 hover:bg-green-600/30">
                      <Check className="w-4 h-4" /> Simpan
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-[1.1rem] leading-tight text-white mb-1 px-4">{store.name}</h3>
                    <p className="text-xs text-neutral-500">Terdaftar: {new Date(store.createdAt).toLocaleDateString()}</p>
                    
                    <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditStart(store.id, store.name)} className="bg-neutral-700/50 p-1.5 rounded-md hover:bg-neutral-600 text-neutral-300">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => removeStore(store.id)} className="bg-red-500/20 p-1.5 rounded-md hover:bg-red-500/40 text-red-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Add Store Button */}
          <button 
            onClick={handleAddStore}
            className="bg-neutral-800/50 border-2 border-dashed border-neutral-600 hover:border-blue-500 hover:bg-blue-500/5 rounded-2xl h-48 flex flex-col items-center justify-center gap-3 transition-all text-neutral-500 hover:text-blue-400 group"
          >
            <div className="bg-neutral-700/50 group-hover:bg-blue-500/20 p-4 rounded-full transition-colors">
              <Plus className="w-8 h-8" />
            </div>
            <span className="font-semibold">Tambah Toko</span>
          </button>
        </div>
      </main>
    </div>
  );
}
