import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ScannerModal from '../components/ScannerModal';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';
import { 
  ScanQrCode, 
  Info, 
  ArrowLeft, 
  ShieldCheck, 
  Zap,
  Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Configuration du scanner
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 10,
      aspectRatio: 1.0
    });

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      handleVerification(decodedText);
      scanner.clear();
    }

    function onScanError(err) {
      // Ignoré pour éviter trop de logs
    }

    return () => {
      try {
        scanner.clear();
      } catch (e) {
        console.error("Scanner clear error:", e);
      }
    };
  }, []);

  const handleVerification = async (ticketId) => {
    console.log("Vérification du ticket:", ticketId);
    
    // Simulation d'une réponse serveur
    const mockResponse = {
      success: true,
      message: "Ticket valide pour : Étudiant. Présence enregistrée.",
      student: "Ahmed Alami"
    };

    setScanResult(mockResponse);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <OrgNavbar />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <button 
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 text-white/40 hover:text-orange-500 transition-colors uppercase text-xs font-black tracking-widest"
            >
              <ArrowLeft size={16} />
              Retour au tableau de bord
            </button>

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4">
                <ScanQrCode size={32} className="text-orange-500" />
              </div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tight">
                Scanner de Présence
              </h1>
              <p className="text-white/40 mt-2 uppercase text-[10px] font-bold tracking-[0.2em]">
                Vérification instantanée des accès étudiants
              </p>
            </div>

            <div className="relative group">
              {/* Corner Accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-orange-500 rounded-tl-xl z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-orange-500 rounded-tr-xl z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-orange-500 rounded-bl-xl z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-orange-500 rounded-br-xl z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <div id="reader" className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl">
                {/* Scanner will render here */}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Info size={20} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Luminosité</h4>
                  <p className="text-xs text-white/30 leading-relaxed">Demandez à l'étudiant d'augmenter la luminosité pour un scan optimal.</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} className="text-orange-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Sécurité</h4>
                  <p className="text-xs text-white/30 leading-relaxed">Chaque QR Code est unique et vérifié en temps réel avec la base de données.</p>
                </div>
              </div>
            </div>

            <ScannerModal 
              isOpen={isModalOpen} 
              result={scanResult || {}} 
              onClose={() => {
                setIsModalOpen(false);
                window.location.reload();
              }} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default QRScanner;
