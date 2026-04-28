import React from 'react';
import { CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';

const ScannerModal = ({ isOpen, result, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
        {/* Backdrop blur effect */}
        <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-md" onClick={onClose}></div>
        
        <div className="relative bg-slate-900 rounded-3xl p-10 max-w-sm w-full text-center border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Success/Error Gradient Background */}
          <div className={`absolute top-0 left-0 w-full h-1 ${
            result.success ? 'bg-green-500' : 'bg-red-500'
          }`}></div>

          <div className={`w-24 h-24 rounded-2xl mx-auto flex items-center justify-center mb-6 ${
            result.success ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
          }`}>
            {result.success ? (
              <CheckCircle2 size={48} strokeWidth={1.5} />
            ) : (
              <XCircle size={48} strokeWidth={1.5} />
            )}
          </div>
          
          <h2 className={`text-2xl font-black mb-3 uppercase tracking-tight ${
            result.success ? 'text-green-500' : 'text-red-500'
          }`}>
            {result.success ? 'Accès Autorisé' : 'Accès Refusé'}
          </h2>
          
          <div className="mb-8 space-y-2">
            <p className="text-white font-bold text-lg uppercase tracking-wider">{result.student || 'Inconnu'}</p>
            <p className="text-white/40 text-sm font-medium">{result.message}</p>
          </div>
          
          <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all duration-300 ${
              result.success 
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                : 'bg-red-500 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
            }`}
          >
            <RefreshCcw size={18} />
            Suivant
          </button>
        </div>
      </div>
    );
  };
  
  export default ScannerModal;