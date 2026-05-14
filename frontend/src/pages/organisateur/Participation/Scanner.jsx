import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import ScannerModal from '../components/ScannerModal';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';
import NavBar from '../../../assets/NavBar'; 
import axios from 'axios'; 
import { 
  ScanQrCode, 
  ArrowLeft, 
  ShieldCheck, 
  Zap
} from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const QRScanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams(); 
  const [scanResult, setScanResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(eventId || "");
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isStudent = user && user.role === 'student';

  // Déterminer le layout en fonction de l'URL
  const isOrganizerLayout = location.pathname.startsWith('/organisateur');

  useEffect(() => {
    // Si pas d'eventId, on récupère les événements de l'organisateur
    const fetchEvents = async () => {
      try {
        const organizerId = user?._id || user?.id;
        if (!organizerId) return;

        let url = `http://localhost:5000/Event/organizer/${organizerId}`;
        
        // Si c'est un étudiant staff, on doit trouver l'ID de son organisateur
        if (isStudent) {
          const staffRes = await axios.get(`http://localhost:5000/api/organisateurs/check-staff/${organizerId}`);
          if (staffRes.data.isStaff) {
            url = `http://localhost:5000/Event/organizer/${staffRes.data.organizerId}`;
          }
        }

        const res = await axios.get(url);
        // On ne garde que les événements validés
        setEvents(res.data.filter(e => e.status === 'approved' || e.status === 'approved-modified'));
      } catch (err) {
        console.error("Erreur fetch events:", err);
      }
    };

    if (!eventId) {
      fetchEvents();
    }
  }, [eventId, isStudent, user]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: { width: 250, height: 250 },
      fps: 15,
      aspectRatio: 1.0,
      showTorchButtonIfSupported: true
    });

    scanner.render(onScanSuccess, onScanError);

    function onScanSuccess(decodedText) {
      handleVerification(decodedText);
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    }

    function onScanError(err) {}

    return () => {
      scanner.clear().catch(error => console.error("Cleanup error", error));
    };
  }, [selectedEventId]); // Re-init scanner if event selection changes

  
 const handleVerification = async (scannedId) => {
  try {
    const currentEventId = selectedEventId || eventId;

    // 1. D'abord on vérifie l'existence de l'étudiant
    const userRes = await axios.get(`http://localhost:5000/api/students/user-info/${scannedId}`);
    
    if (userRes.data) {
      // 2. Si on a un eventId, on marque la présence
      if (currentEventId) {
        try {
          await axios.post('http://localhost:5000/Event/mark-attendance', {
            eventId: currentEventId,
            studentId: scannedId
          });
          
          setScanResult({
            success: true,
            message: "Ticket valide. Présence enregistrée avec succès !",
            student: userRes.data.fullName,
            profileImage: userRes.data.profileImage
          });
        } catch (attendanceErr) {
          setScanResult({
            success: false,
            message: attendanceErr.response?.data?.message || "Erreur lors du marquage de la présence.",
            student: userRes.data.fullName,
            profileImage: userRes.data.profileImage
          });
        }
      } else {
        // Mode simple vérification (sans eventId)
        setScanResult({
          success: true,
          message: "Étudiant trouvé. Veuillez sélectionner un événement pour marquer la présence.",
          student: userRes.data.fullName,
          profileImage: userRes.data.profileImage
        });
      }
    }
  } catch (err) {
    console.error("Erreur de scan:", err);
    setScanResult({
      success: false,
      message: "Utilisateur introuvable ou code invalide.",
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
          
          {!eventId && events.length > 0 && (
            <div className="mt-6 max-w-xs mx-auto">
              <label className="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 text-center">Sélectionner l'événement</label>
              <select 
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900">Choisir un événement...</option>
                {events.map(e => (
                  <option key={e._id} value={e._id} className="bg-slate-900">{e.title}</option>
                ))}
              </select>
            </div>
          )}

          <p className="text-orange-500/60 mt-4 uppercase text-[10px] font-bold tracking-[0.3em]">
            {selectedEventId ? "Vérification instantanée des accès" : "Sélectionnez un événement pour commencer"}
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-2 border-2 border-orange-500/30 rounded-[2.5rem] pointer-events-none z-30 shadow-[0_0_30px_rgba(249,115,22,0.2)]"></div>
          
          <div className="relative rounded-[2.2rem] overflow-hidden bg-orange-500/5 border border-white/10 min-h-[350px] flex items-center justify-center backdrop-blur-sm">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-0">
              <ScanQrCode size={48} className="text-orange-500/20 mb-4 animate-pulse" />
              <p className="text-orange-500 font-black text-lg uppercase tracking-tight">
                Request Camera Permissions
              </p>
            </div>
            <div id="reader" className="w-full h-full z-20 bg-transparent"></div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
            <ShieldCheck size={20} className="text-blue-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase mb-0.5">Sécurisé</h3>
              <p className="text-[10px] text-white/30">Vérification via Database.</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
            <Zap size={20} className="text-orange-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase mb-0.5">Dynamique</h3>
              <p className="text-[10px] text-white/30">Données en temps réel.</p>
            </div>
          </div>
        </div>
      </div>

      <ScannerModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
       
      
          window.location.reload(); 
        }}
        result={scanResult}
      />

      <style>{`
        #reader { border: none !important; background: transparent !important; }
        #reader__dashboard { background: transparent !important; }
        #reader video { border-radius: 20px !important; object-fit: cover !important; }
        #reader__status_span { color: #f97316 !important; font-weight: bold !important; font-size: 12px !important; }
        .html5-qrcode-element { 
          background-color: #f97316 !important; 
          color: white !important; 
          border: none !important; 
          padding: 8px 16px !important; 
          border-radius: 10px !important;
          font-weight: bold !important;
          text-transform: uppercase !important;
          font-size: 11px !important;
          cursor: pointer !important;
          margin: 5px !important;
        }
        #reader img { display: none !important; }
      `}</style>
    </main>
  );


  if (isOrganizerLayout) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#0a0f1d]">
        <OrgSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
          <div className="relative z-[100]"><OrgNavbar /></div>
          <main className="flex-1 relative z-0"><ScannerContent /></main>
        </div>
      </div>
    );
  }

  // Fallback for students/volunteers accessing via /student/Scanner
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="relative z-[100]"><NavBar /></div>
      <div className="pt-20 relative z-0"><ScannerContent /></div>
    </div>
  );
};

export default QRScanner;