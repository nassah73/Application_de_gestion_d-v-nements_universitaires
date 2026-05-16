import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import ScannerModal from '../components/ScannerModal';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';
import NavBar from '../../../assets/NavBar'; 
import axios from 'axios'; 
import { 
  ScanQrCode, 
  ArrowLeft, 
  ShieldCheck, 
  Zap,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const QRScanner = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); 
  const [scanResult, setScanResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState('camera'); // 'camera' or 'file'
  
  const scannerRef = useRef(null);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isStudent = user && user.role === 'student';

  useEffect(() => {
    // Cleanup function to stop scanner
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(err => console.error("Error stopping scanner", err));
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("reader");
      }

      const config = {
        fps: 20,
        qrbox: { width: 280, height: 280 },
        aspectRatio: 1.0
      };

      setIsScanning(true);
      setScanType('camera');

      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          handleVerification(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Ignore frequent "not found" messages
        }
      );
    } catch (err) {
      console.error("Camera error:", err);
      setIsScanning(false);
      alert("Impossible d'accéder à la caméra. Veuillez vérifier les permissions.");
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Stop error:", err);
      }
    }
  };

  const handleFileScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");
    }

    try {
      setScanType('file');
      const decodedText = await scannerRef.current.scanFile(file, true);
      handleVerification(decodedText);
    } catch (err) {
      console.error("File scan error:", err);
      setScanResult({
        success: false,
        message: "Impossible de lire le code QR dans cette image. Assurez-vous qu'il est bien visible.",
        student: "Inconnu"
      });
      setIsModalOpen(true);
    }
  };

  
 const handleVerification = async (scannedData) => {
  try {
    // 1. Parse scanned data (expected format: "studentId:eventId")
    const [scannedStudentId, scannedEventId] = scannedData.split(':');

    // 2. Security Check: Is this QR code for the current event?
    if (!eventId || scannedEventId !== eventId) {
      setScanResult({
        success: false,
        message: !eventId 
          ? "Erreur : ID de l'événement manquant dans le scanner." 
          : "Code invalide pour cet événement. Ce ticket appartient à un autre événement.",
        student: "Inconnu"
      });
      setIsModalOpen(true);
      return;
    }

    // 3. Verify registration with backend
    const response = await axios.post(`http://localhost:5000/Event/verify-scan`, {
      studentId: scannedStudentId,
      eventId: scannedEventId
    });
    
    if (response.data.success) {
      setScanResult({
        success: true,
        message: response.data.message || "Ticket valide. Présence enregistrée.",
        student: response.data.student, 
        profileImage: response.data.profileImage 
      });
    }
  } catch (err) {
    console.error("Erreur de scan:", err);
    setScanResult({
      success: false,
      message: err.response?.data?.message || "Accès refusé. Étudiant non inscrit ou code invalide.",
      student: "Inconnu"
    });
  } finally {
    setIsModalOpen(true);
  }
};

  const ScannerContent = () => (
    <main className="flex-1 p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-white/30 hover:text-orange-500 transition-colors uppercase text-[10px] font-black tracking-widest"
        >
          <ArrowLeft size={14} />
          Retour {isStudent ? "à l'accueil" : "au tableau de bord"}
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4">
            <ScanQrCode size={32} className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            Scanner de Présence
          </h1>
          <p className="text-orange-500/60 mt-2 uppercase text-[10px] font-bold tracking-[0.3em]">
            Vérification instantanée des accès
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            onClick={startCamera}
            disabled={isScanning}
            className={`flex items-center justify-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isScanning && scanType === 'camera' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}
          >
            <Camera size={18} />
            Utiliser Caméra
          </button>
          
          <label className={`flex items-center justify-center gap-3 p-4 rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer transition-all ${scanType === 'file' ? 'bg-orange-500 text-white shadow-lg' : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10'}`}>
            <ImageIcon size={18} />
            Scanner Image
            <input type="file" accept="image/*" className="hidden" onChange={handleFileScan} />
          </label>
        </div>

        <div className="relative group">
          <div className="absolute -inset-2 border-2 border-orange-500/30 rounded-[2.5rem] pointer-events-none z-30 shadow-[0_0_30px_rgba(249,115,22,0.2)]"></div>
          
          <div className="relative rounded-[2.2rem] overflow-hidden bg-black/40 border border-white/10 min-h-[400px] flex items-center justify-center backdrop-blur-sm">
            {!isScanning && scanType === 'camera' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
                <ScanQrCode size={48} className="text-orange-500/20 mb-4" />
                <p className="text-white/60 font-black text-sm uppercase tracking-widest">Scanner inactif</p>
                <button onClick={startCamera} className="mt-4 text-orange-500 font-bold text-xs underline">Activer la caméra</button>
              </div>
            )}
            <div id="reader" className="w-full h-full z-20"></div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
            <ShieldCheck size={20} className="text-blue-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase mb-0.5">Sécurisé</h3>
              <p className="text-[10px] text-white/30">Vérification Database unique.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
            <Zap size={20} className="text-orange-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase mb-0.5">Automatique</h3>
              <p className="text-[10px] text-white/30">Validation instantanée.</p>
            </div>
          </div>
        </div>
      </div>

      <ScannerModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setScanType('camera');
        }}
        result={scanResult}
      />

      <style>{`
        #reader { border: none !important; }
        #reader video { border-radius: 20px !important; object-fit: cover !important; }
      `}</style>
    </main>
  );


  if (isStudent) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="relative z-[100]"><NavBar /></div>
        <div className="pt-20 relative z-0"><ScannerContent /></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f1d]">
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <div className="relative z-[100]"><OrgNavbar /></div>
        <main className="flex-1 relative z-0"><ScannerContent /></main>
      </div>
    </div>
  );
};

export default QRScanner;