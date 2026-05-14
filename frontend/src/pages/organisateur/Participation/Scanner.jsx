import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import ScannerModal from '../components/ScannerModal';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';
import NavBar from '../../../assets/NavBar'; 
import BgImag from '../../../assets/bg.jpg';
import axios from 'axios'; 
import { 
  ScanQrCode, 
  ArrowLeft, 
  ShieldCheck, 
  Zap,
  Camera,
  Image as ImageIcon,
  Upload
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
  const [scanMode, setScanMode] = useState('camera'); // 'camera' or 'image'
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const scannerRef = useRef(null);
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isStudent = user && user.role === 'student';

  // Sync state with URL params
  useEffect(() => {
    if (eventId) {
      setSelectedEventId(eventId);
    }
  }, [eventId]);

  // Déterminer le layout en fonction de l'URL
  const isOrganizerLayout = location.pathname.startsWith('/organisateur');

  useEffect(() => {
    // Récupérer les événements de l'organisateur
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

    fetchEvents();
  }, [isStudent, user]);

  useEffect(() => {
    if (scanMode === 'camera' && !isModalOpen) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [scanMode, isModalOpen, selectedEventId, selectedImage]);

  const startScanner = async () => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("reader");
      }

      if (!isScanning) {
        await scannerRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            handleVerification(decodedText);
          },
          (errorMessage) => {
            // Ignorer les erreurs de scan répétitives
          }
        );
        setIsScanning(true);
      }
    } catch (err) {
      console.error("Failed to start scanner:", err);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Failed to stop scanner:", err);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Revoke previous URL if exists
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }

    // Create a preview URL for the image
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode("reader");
    }

    try {
      // Small delay to allow the user to see the image before the scan modal pops up
      setTimeout(async () => {
        try {
          const decodedText = await scannerRef.current.scanFile(file, true);
          handleVerification(decodedText);
        } catch (err) {
          console.error("Error scanning file:", err);
          setScanResult({
            success: false,
            message: "Impossible de lire le code QR dans cette image.",
            student: "Inconnu"
          });
          setIsModalOpen(true);
        }
      }, 500);
    } catch (err) {
      console.error("File processing error:", err);
    }
  };

  
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

  return (
     <div className="flex h-screen bg-[#0f172a] text-white font-sans overflow-hidden relative">
       {isOrganizerLayout ? <OrgSidebar /> : null}
       
       {/* Background effects */}
       {!isOrganizerLayout && (
         <div className="absolute inset-0 z-0">
           <div 
             className="absolute inset-0 bg-cover bg-bottom opacity-30" 
             style={{ backgroundImage: `url(${BgImag})` }}
           ></div>
           <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90"></div>
         </div>
       )}
       
       {isOrganizerLayout && (
         <>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
         </>
       )}

       <div className="flex-1 flex flex-col overflow-y-auto relative z-10">
         {isOrganizerLayout ? <OrgNavbar /> : <NavBar />}
         
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
              
              {/* Select visible ONLY for non-students (Organizers) */}
              {!isStudent && events.length > 0 && (
                <div className="mt-8 max-w-md mx-auto bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <label className="block text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-3 text-center">Événement à scanner</label>
                  <div className="relative">
                    <select 
                      value={selectedEventId}
                      onChange={(e) => {
                        const newId = e.target.value;
                        setSelectedEventId(newId);
                        if (newId) {
                          navigate(`${isOrganizerLayout ? '/organisateur' : '/student'}/scanner/${newId}`, { replace: true });
                        } else {
                          navigate(`${isOrganizerLayout ? '/organisateur' : '/student'}/scanner`, { replace: true });
                        }
                      }}
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white text-sm outline-none focus:border-orange-500 transition-all appearance-none cursor-pointer pr-10"
                    >
                      <option value="" className="bg-slate-900">Choisir un événement...</option>
                      {events.map(e => (
                        <option key={e._id} value={e._id} className="bg-slate-900">{e.title}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                      <ArrowLeft size={16} className="-rotate-90" />
                    </div>
                  </div>
                </div>
              )}

              <p className="text-orange-500/60 mt-6 uppercase text-[10px] font-bold tracking-[0.3em]">
                {selectedEventId ? "Vérification instantanée des accès" : "Sélectionnez un événement pour commencer"}
              </p>
            </div>

            {/* Mode Selector Buttons */}
            <div className="flex gap-4 mb-6 justify-center">
              <button
                onClick={() => {
                  setScanMode('camera');
                  setSelectedImage(null);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                  scanMode === 'camera' 
                    ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                    : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
                }`}
              >
                <Camera size={16} />
                Caméra
              </button>
              <button
                onClick={() => setScanMode('image')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                  scanMode === 'image' 
                    ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                    : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/10'
                }`}
              >
                <ImageIcon size={16} />
                Image
              </button>
            </div>

            <div className="relative group">
              <div className="absolute -inset-2 border-2 border-orange-500/30 rounded-[2.5rem] pointer-events-none z-30 shadow-[0_0_30px_rgba(249,115,22,0.2)]"></div>
              
              <div className="relative rounded-[2.2rem] overflow-hidden bg-orange-500/5 border border-white/10 min-h-[350px] flex flex-col items-center justify-center backdrop-blur-sm">
                {scanMode === 'camera' ? (
                  <>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-0">
                      <ScanQrCode size={48} className="text-orange-500/20 mb-4 animate-pulse" />
                      <p className="text-orange-500 font-black text-lg uppercase tracking-tight">
                        Accès Caméra Requis
                      </p>
                    </div>
                    <div id="reader" className="w-full h-full z-20 bg-transparent"></div>
                  </>
                ) : (
                  <div className="p-8 text-center flex flex-col items-center w-full h-full">
                    {selectedImage ? (
                      <div className="relative w-full h-full min-h-[300px] flex flex-col items-center justify-center p-4">
                        <img 
                          src={selectedImage} 
                          alt="Selected QR" 
                          className="max-h-[250px] rounded-2xl border-2 border-orange-500/30 shadow-2xl object-contain"
                        />
                        <button 
                          onClick={() => setSelectedImage(null)}
                          className="mt-6 text-white/40 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2"
                        >
                          <Upload size={14} />
                          Changer d'image
                        </button>
                      </div>
                    ) : (
                      <div className="py-12 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-6 border border-orange-500/20">
                          <Upload size={32} className="text-orange-500" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase mb-2">Scanner un fichier</h3>
                        <p className="text-white/40 text-sm mb-8 max-w-xs">Sélectionnez une image contenant un code QR pour le valider instantanément.</p>
                        <label className="cursor-pointer bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-orange-600 transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                          Choisir une image
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                      </div>
                    )}
                  </div>
                )}
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
              setScanResult(null);
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
      </div>
    </div>
  );
};

export default QRScanner;
