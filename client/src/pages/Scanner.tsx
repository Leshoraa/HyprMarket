import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, Receipt, RefreshCcw, ScanLine, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Scanner() {
  const navigate = useNavigate();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [camError, setCamError] = useState<string | null>(null);
  
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) setImgSrc(imageSrc);
  }, [webcamRef]);

  const reset = () => {
    setImgSrc(null);
    setResult(null);
    setIsCameraOpen(true);
  };

  const processReceipt = async () => {
    if (!imgSrc) return;
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:3000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: imgSrc })
      });
      
      const data = await response.json();
      if (response.ok && data.success) {
        setResult(data.data);
        setIsCameraOpen(false);
      } else {
        alert("Gagal ekstraksi struk: " + (data.error || 'Server menolak data.'));
      }
    } catch (err: any) {
      console.error(err);
      alert("Koneksi gagal: Pastikan Backend di port 3000 aktif.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-neutral-100">
        
        <div className="bg-neutral-50/80 px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="bg-white hover:bg-neutral-100 shadow-sm p-2 rounded-xl text-neutral-600 transition-colors border border-neutral-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-extrabold text-sm text-neutral-800">Pemutus AI</span>
          <div className="w-9" />
        </div>

        <div className="p-6 text-center flex flex-col gap-4">
          <div className="mx-auto bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-0 mt-2">
            <Receipt className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-extrabold text-neutral-800">Pencatat Belanja AI</h1>

          {camError && (
             <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg flex items-start gap-2 text-left">
               <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
               <p>{camError}</p>
             </div>
          )}

          {!isCameraOpen && !imgSrc && !result && (
            <button 
              onClick={() => { setIsCameraOpen(true); setCamError(null); }}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-4 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              <Camera className="w-5 h-5" />
              Buka Kamera
            </button>
          )}

          {isCameraOpen && !imgSrc && (
            <div className="flex flex-col gap-4 items-center">
              <div className="rounded-xl overflow-hidden border-2 border-neutral-600 w-full relative bg-black aspect-[3/4]">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  screenshotQuality={0.9}
                  videoConstraints={{ facingMode: "environment" }}
                  onUserMediaError={(err) => {
                    setCamError("Akses kamera ditolak. Penggunaan di HP mensyaratkan HTTPS atau `localhost`.");
                    setIsCameraOpen(false);
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 w-full">
                <button 
                  onClick={() => setIsCameraOpen(false)}
                  className="bg-neutral-700 hover:bg-neutral-600 px-4 rounded-xl font-medium transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={capture}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <ScanLine className="w-5 h-5" />
                  Jepret Struk
                </button>
              </div>
            </div>
          )}

          {imgSrc && (
            <div className="flex flex-col gap-4 items-center animate-in fade-in zoom-in duration-300">
              <img src={imgSrc} alt="Struk screenshot" className="rounded-xl border-2 border-neutral-600 w-full aspect-[3/4] object-cover" />
              <div className="flex gap-2 w-full">
                 <button 
                  onClick={reset}
                  disabled={loading}
                  className="flex-1 bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-3 px-2 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="w-4 h-4" /> Ulang
                </button>
                <button 
                  onClick={processReceipt}
                  disabled={loading}
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-2 rounded-xl transition-all flex items-center justify-center gap-2 disabled:bg-neutral-600 disabled:text-neutral-400"
                >
                  {loading ? 'AI Menganalisa...' : 'Ekstrak Belanja'}
                </button>
              </div>
            </div>
          )}

          {result && !imgSrc && (
            <div className="bg-neutral-900 border border-blue-500/30 rounded-xl p-4 mt-2 text-left w-full shadow-lg">
              <h2 className="font-semibold text-lg border-b border-neutral-700 pb-2 mb-2 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-400" /> Hasil Ekstraksi
              </h2>
              <ul className="space-y-2 text-sm text-neutral-300 mb-4 max-h-[40vh] overflow-y-auto pr-1">
                {(result.items || []).map((item: any, i: number) => (
                  <li key={i} className="flex justify-between items-center bg-neutral-800 p-2.5 rounded-lg border border-neutral-700/50">
                    <span className="truncate mr-3">{item.name}</span>
                    <span className="font-mono text-green-400 shrink-0">Rp {Number(item.price).toLocaleString('id-ID')}</span>
                  </li>
                ))}
                {(!result.items || result.items.length === 0) && (
                   <li className="text-neutral-500 italic text-center p-4">Tidak ada barang terdeteksi.</li>
                )}
              </ul>
              <div className="mt-4 pt-3 border-t border-blue-500/30 flex justify-between font-bold text-lg items-center">
                <span className="text-neutral-400">TOTAL</span>
                <span className="text-green-400 font-mono">Rp {Number(result.total || 0).toLocaleString('id-ID')}</span>
              </div>
              
              <button 
                onClick={() => { setResult(null); setIsCameraOpen(true); }}
                className="mt-6 w-full bg-neutral-700 hover:bg-neutral-600 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Scan Lagi
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
