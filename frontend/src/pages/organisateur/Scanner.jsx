import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';
import { QrCode, Camera, CameraOff, ShieldCheck, Info, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';

const SCAN_LOG_MAX = 8;

const Scanner = () => {
    const videoRef   = useRef(null);
    const canvasRef  = useRef(null);
    const streamRef  = useRef(null);
    const rafRef     = useRef(null);

    const [active,    setActive]    = useState(false);
    const [result,    setResult]    = useState(null);   // { text, status: 'success'|'error' }
    const [scanLog,   setScanLog]   = useState([]);
    const [camError,  setCamError]  = useState(null);
    const [scanning,  setScanning]  = useState(false);  // animation pulse

    /* ── Scan loop ── */
    const tick = useCallback(() => {
        const video  = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
            rafRef.current = requestAnimationFrame(tick);
            return;
        }
        canvas.width  = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code    = jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: 'dontInvert' });

        if (code) {
            const txt = code.data;
            setScanning(true);
            setTimeout(() => setScanning(false), 600);

            const isValid = txt.length > 0; // Place real validation logic here
            const entry = {
                id: Date.now(),
                text: txt,
                status: isValid ? 'success' : 'error',
                time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            };
            setResult(entry);
            setScanLog(prev => [entry, ...prev].slice(0, SCAN_LOG_MAX));
            stopCamera();
            return;
        }
        rafRef.current = requestAnimationFrame(tick);
    }, []);

    /* ── Start camera ── */
    const startCamera = async () => {
        setCamError(null);
        setResult(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            setActive(true);
            rafRef.current = requestAnimationFrame(tick);
        } catch (err) {
            setCamError('Impossible d\'accéder à la caméra. Vérifiez les permissions du navigateur.');
        }
    };

    /* ── Stop camera ── */
    const stopCamera = () => {
        cancelAnimationFrame(rafRef.current);
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
        if (videoRef.current) videoRef.current.srcObject = null;
        setActive(false);
    };

    useEffect(() => () => stopCamera(), []);

    return (
        <div className="max-w-2xl mx-auto animate-in space-y-6">

            {/* Main card */}
            <div className="org-card border-none bg-white shadow-2xl shadow-slate-200/50 flex flex-col items-center p-10 md:p-14 text-center">

                {/* Icon header */}
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-orange-500" />
                    <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.2em]">Scanner QR</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Scanner de Présence</h3>
                <p className="text-slate-400 text-sm mb-8 max-w-xs">
                    Placez le QR Code dans le cadre pour valider automatiquement l'entrée d'un participant.
                </p>

                {/* Camera viewport */}
                <div className="relative w-72 h-72 mb-8">
                    {/* Video */}
                    <video
                        ref={videoRef}
                        className={`w-full h-full object-cover rounded-[32px] ${active ? 'block' : 'hidden'}`}
                        playsInline
                        muted
                    />
                    {/* Canvas (hidden, used for QR decode) */}
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Inactive state */}
                    {!active && (
                        <div className="w-full h-full bg-slate-900 rounded-[32px] flex flex-col items-center justify-center border-4 border-slate-800 shadow-2xl">
                            <Camera size={48} className="text-slate-600 mb-2" />
                            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600">Caméra inactive</span>
                        </div>
                    )}

                    {/* Scanning frame overlay */}
                    {active && (
                        <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
                            {/* Dark vignette corners */}
                            <div className="absolute inset-0 border-[40px] border-slate-900/40 rounded-[32px]" />
                            {/* Target square */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border-2 rounded-2xl transition-colors duration-300 ${scanning ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)]' : 'border-orange-500/70'}`} />
                            {/* Scan line */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-44 h-0.5 bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)] animate-bounce" />
                        </div>
                    )}

                    {/* Success/Error result flash */}
                    {result && !active && (
                        <div className={`absolute inset-0 rounded-[32px] flex flex-col items-center justify-center gap-3 ${result.status === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                            {result.status === 'success'
                                ? <CheckCircle2 size={52} className="text-white" />
                                : <XCircle     size={52} className="text-white" />}
                            <p className="text-white font-black text-sm uppercase tracking-widest">
                                {result.status === 'success' ? 'Accès Validé ✓' : 'QR Invalide ✗'}
                            </p>
                            <p className="text-white/70 text-[10px] font-bold max-w-[200px] truncate">{result.text}</p>
                        </div>
                    )}
                </div>

                {/* Error message */}
                {camError && (
                    <div className="mb-4 flex items-start gap-2 px-5 py-3 bg-red-50 border border-red-100 rounded-2xl text-left w-full max-w-xs">
                        <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-red-600 font-bold leading-snug">{camError}</p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    {!active ? (
                        <button onClick={startCamera} className="btn-primary flex items-center justify-center gap-2 py-4">
                            <Camera size={20} />
                            <span className="font-black uppercase tracking-widest text-sm">
                                {result ? 'Scanner à nouveau' : 'Activer la Caméra'}
                            </span>
                        </button>
                    ) : (
                        <button
                            onClick={stopCamera}
                            className="flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 rounded-2xl font-black uppercase tracking-widest text-sm transition-all"
                        >
                            <CameraOff size={20} />
                            Arrêter la Caméra
                        </button>
                    )}

                    {scanLog.length > 0 && (
                        <button
                            onClick={() => { setScanLog([]); setResult(null); }}
                            className="flex items-center justify-center gap-2 py-3 text-[11px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
                        >
                            <RotateCcw size={14} /> Effacer l'historique
                        </button>
                    )}
                </div>

                <div className="mt-8 flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span>Transmission Sécurisée</span>
                </div>
            </div>

            {/* Info tip */}
            {!active && !result && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                    <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Astuce : Assurez-vous que la luminosité est suffisante et que le QR Code est entièrement visible dans le cadre.
                    </p>
                </div>
            )}

            {/* Scan Log */}
            {scanLog.length > 0 && (
                <div className="org-card border-none bg-white shadow-xl shadow-slate-200/50">
                    <div className="flex items-center justify-between mb-5">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2">
                            <QrCode size={14} className="text-orange-500" />
                            Historique des scans
                        </h4>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{scanLog.length} scan{scanLog.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="space-y-2">
                        {scanLog.map((entry) => (
                            <div key={entry.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${entry.status === 'success' ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                                {entry.status === 'success'
                                    ? <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                    : <XCircle      size={18} className="text-red-400 shrink-0" />}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-[13px] font-bold truncate ${entry.status === 'success' ? 'text-emerald-800' : 'text-red-700'}`}>{entry.text}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{entry.time}</p>
                                </div>
                                <span className={`shrink-0 text-[10px] font-black uppercase px-3 py-1 rounded-full ${entry.status === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                                    {entry.status === 'success' ? 'Validé' : 'Refusé'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Scanner;