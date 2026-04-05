import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Camera, Receipt, RefreshCcw, ScanLine, AlertCircle, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

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
  }, []);

  const reset = () => { setImgSrc(null); setResult(null); setIsCameraOpen(true); };

  const processReceipt = async () => {
    if (!imgSrc) return;
    setLoading(true); setResult(null);
    try {
      const response = await fetch('http://localhost:3000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: imgSrc }),
      });
      const data = await response.json();
      if (response.ok && data.success) { setResult(data.data); setIsCameraOpen(false); }
      else alert('Gagal ekstraksi struk: ' + (data.error || 'Server menolak data.'));
    } catch {
      alert('Koneksi gagal: Pastikan Backend di port 3000 aktif.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '95vh', paddingTop: 24, paddingBottom: 80,
      animation: 'fade-up 0.35s ease-out both',
    }}>
      <div style={{
        width: '100%', maxWidth: result ? 860 : 448,
        background: 'var(--surface)',
        borderRadius: 'var(--radius-2xl)',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        transition: 'max-width 0.3s ease',
      }}>

        {/* Header */}
        <div style={{
          padding: '12px 18px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'var(--bg-soft)',
        }}>
          <button onClick={() => navigate('/')} style={{
            width: 34, height: 34, borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)', background: 'var(--surface)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-2)', transition: 'all 0.15s ease',
          }}>
            <ArrowLeft size={15} />
          </button>
          <span style={{ fontWeight: 800, fontSize: 13.5, color: 'var(--text-1)' }}>Pemindai AI</span>
          <div style={{ width: 34 }} />
        </div>

        {/* Content */}
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>

          {!isCameraOpen && !imgSrc && !result && (
            <>
              <div style={{
                width: 68, height: 68, borderRadius: 'var(--radius-xl)',
                background: 'var(--primary-dim)', border: '1px solid var(--primary-glow)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'float 3s ease-in-out infinite',
              }}>
                <Receipt size={30} style={{ color: 'var(--primary)' }} strokeWidth={1.5} />
              </div>

              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: 20, fontWeight: 900, color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: 5 }}>
                  Pencatat Belanja AI
                </h1>
                <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.55, maxWidth: 280, margin: '0 auto' }}>
                  Foto struk belanja kamu dan AI akan mengekstrak semua item secara otomatis.
                </p>
              </div>

              {/* Steps */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { step: '01', label: 'Buka kamera & foto struk' },
                  { step: '02', label: 'AI mengekstrak item otomatis' },
                  { step: '03', label: 'Review & simpan ke toko' },
                ].map(s => (
                  <div key={s.step} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'var(--bg-soft)', borderRadius: 'var(--radius-md)',
                    padding: '9px 13px', border: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.06em', opacity: 0.7 }}>{s.step}</span>
                    <span style={{ fontSize: 12.5, color: 'var(--text-2)', fontWeight: 500 }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {camError && (
            <div style={{
              background: 'rgba(196, 98, 74, 0.07)', border: '1px solid rgba(196, 98, 74, 0.25)',
              borderRadius: 'var(--radius-md)', padding: '11px 13px',
              display: 'flex', gap: 9, alignItems: 'flex-start', width: '100%',
            }}>
              <AlertCircle size={14} style={{ color: 'var(--terra)', marginTop: 1, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--terra)', lineHeight: 1.5 }}>{camError}</span>
            </div>
          )}

          {!isCameraOpen && !imgSrc && !result && (
            <button
              onClick={() => { setIsCameraOpen(true); setCamError(null); }}
              style={{
                width: '100%', background: 'var(--primary)', color: 'white',
                border: 'none', cursor: 'pointer',
                height: 50, borderRadius: 'var(--radius-full)',
                fontWeight: 800, fontSize: 13.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 6px 18px var(--primary-glow)',
                transition: 'all 0.18s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <Camera size={17} />
              Buka Kamera
            </button>
          )}

          {isCameraOpen && !imgSrc && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 11 }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1.5px solid var(--border)', aspectRatio: '3/4', background: '#111', position: 'relative' }}>
                <Webcam
                  audio={false} ref={webcamRef}
                  screenshotFormat="image/jpeg" screenshotQuality={0.9}
                  videoConstraints={{ facingMode: 'environment' }}
                  onUserMediaError={() => { setCamError('Akses kamera ditolak. Gunakan HTTPS atau localhost.'); setIsCameraOpen(false); }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <div style={{ width: '68%', aspectRatio: '3/4', border: '2px solid rgba(90,122,82,0.85)', borderRadius: 'var(--radius-lg)', boxShadow: '0 0 0 1000px rgba(0,0,0,0.38)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 9 }}>
                <button onClick={() => setIsCameraOpen(false)} style={{ flex: 1, height: 44, borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Batal</button>
                <button onClick={capture} style={{ flex: 2, height: 44, borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 4px 12px var(--primary-glow)' }}>
                  <ScanLine size={15} /> Jepret Struk
                </button>
              </div>
            </div>
          )}

          {imgSrc && !result && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 11 }}>
              <img src={imgSrc} alt="Struk" style={{ borderRadius: 'var(--radius-lg)', width: '100%', aspectRatio: '3/4', objectFit: 'cover', border: '1px solid var(--border)' }} />
              <div style={{ display: 'flex', gap: 9 }}>
                <button onClick={reset} disabled={loading} style={{ flex: 1, height: 44, borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <RefreshCcw size={13} /> Ulang
                </button>
                <button onClick={processReceipt} disabled={loading} style={{ flex: 2, height: 44, borderRadius: 'var(--radius-full)', border: 'none', background: loading ? 'var(--primary-dim)' : 'var(--primary)', color: loading ? 'var(--primary)' : 'white', fontWeight: 700, fontSize: 13, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: loading ? 'none' : '0 4px 12px var(--primary-glow)', transition: 'all 0.18s ease' }}>
                  {loading ? <><Sparkles size={13} style={{ animation: 'float 1s ease-in-out infinite' }} /> AI Menganalisa...</> : <><Receipt size={13} /> Ekstrak Belanja</>}
                </button>
              </div>
            </div>
          )}

          {result && (
            <div style={{ width: '100%', display: 'flex', gap: 24, flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
              {/* Gambar Struk di Kiri */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 11 }}>
                <img src={imgSrc || ''} alt="Struk" style={{ borderRadius: 'var(--radius-lg)', width: '100%', maxHeight: '65vh', objectFit: 'contain', border: '1px solid var(--border)', background: '#111' }} />
              </div>

              {/* Hasil Ekstraksi Item di Kanan */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: 800, fontSize: 14.5, color: 'var(--text-1)' }}>Hasil Ekstraksi</span>
                </div>
                <div style={{ background: 'var(--bg-soft)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 16 }}>
                  <ul style={{ listStyle: 'none', maxHeight: '45vh', overflowY: 'auto', padding: 8 }}>
                    {(result.items || []).map((item: any, i: number) => (
                      <li key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: i % 2 === 0 ? 'var(--surface)' : 'transparent', marginBottom: 2 }}>
                        <span style={{ fontSize: 12.5, color: 'var(--text-2)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: 10 }}>{item.name}</span>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--primary)', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>Rp {Number(item.price).toLocaleString('id-ID')}</span>
                      </li>
                    ))}
                    {(!result.items || result.items.length === 0) && (
                      <li style={{ textAlign: 'center', padding: 22, color: 'var(--text-4)', fontSize: 12.5 }}>Tidak ada barang terdeteksi.</li>
                    )}
                  </ul>
                  <div style={{ borderTop: '1px solid var(--border)', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-3)', fontSize: 11.5, letterSpacing: '0.07em', textTransform: 'uppercase' }}>Total</span>
                    <span style={{ fontWeight: 900, fontSize: 16, color: 'var(--text-1)', fontVariantNumeric: 'tabular-nums' }}>Rp {Number(result.total || 0).toLocaleString('id-ID')}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
                  <button onClick={() => { setResult(null); setIsCameraOpen(true); }} style={{ flex: 1, height: 46, borderRadius: 'var(--radius-full)', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-2)', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.15s ease' }} onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-soft)')} onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface)')}>
                    <ScanLine size={14} /> Scan Lagi
                  </button>
                  <button onClick={() => { navigate('/'); }} style={{ flex: 1, height: 46, borderRadius: 'var(--radius-full)', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: 800, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, boxShadow: '0 4px 14px var(--primary-glow)', transition: 'all 0.15s ease' }} onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')} onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                    <CheckCircle2 size={14} /> Simpan
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
