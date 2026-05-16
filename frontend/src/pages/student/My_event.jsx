import Navbar from "../../assets/NavBar";
import React from 'react';
import axios from 'axios';
import { Calendar, Clock, Trash2, ScanQrCode, QrCode, FileDown } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const MyEvents = () => {
  const [eventsList, setEventsList] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
  const navigate = useNavigate();

  const downloadPDF = async (eventData) => {
    try {
      const doc = new jsPDF();
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${currentUser._id}:${eventData._id}`;
      
      // Fetch image and convert to base64 for jsPDF
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        
        doc.setFontSize(22);
        doc.setTextColor(205, 115, 41); // #cd7329
        doc.text("PASS D'ENTRÉE ÉVÉNEMENT", 105, 30, { align: "center" });
        
        doc.setDrawColor(205, 115, 41);
        doc.setLineWidth(1);
        doc.line(20, 40, 190, 40);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text(`Événement: ${eventData.title}`, 20, 60);
        doc.text(`Date: ${new Date(eventData.date).toLocaleDateString('fr-FR')}`, 20, 75);
        doc.text(`Lieu: ${eventData.location}`, 20, 90);
        doc.text(`Participant: ${currentUser.prenom} ${currentUser.nom}`, 20, 105);
        
        // Add QR Code
        doc.addImage(base64data, 'PNG', 55, 120, 100, 100);
        
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text("Veuillez présenter ce code à l'entrée de l'événement.", 105, 240, { align: "center" });
        doc.text(`ID Inscription: ${eventData._id}`, 105, 250, { align: "center" });
        
        doc.save(`Pass_${eventData.title.replace(/\s+/g, '_')}.pdf`);
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Erreur lors de la génération du PDF.");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) return;
        const user = JSON.parse(userString);
        setCurrentUser(user);
        
        const resEvents = await axios.get(`http://localhost:5000/Event/My_registers/${user._id}`);
        const validEvents = Array.isArray(resEvents.data) 
          ? resEvents.data.filter(reg => reg.event !== null) 
          : [];
        setEventsList(validEvents);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e, registrationId) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Êtes-vous sûr de vouloir vous désinscrire de cet événement ?")) return;
    try {
      await axios.delete(`http://localhost:5000/Event/delete_registration/${registrationId}`);
      setEventsList(eventsList.filter(item => item._id !== registrationId));
      alert("Désinscription réussie");
    } catch (err) {
      console.error("Error deleting registration:", err);
      alert("Erreur lors de la désinscription.");
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-900 p-8 pt-[100px] font-sans overflow-x-hidden text-white">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#cd7329]">Mes événements</h1>
          <p className="text-slate-400 mt-2">Gérez vos inscriptions et accédez à vos laissez-passer</p>
        </header>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-white/90">
            Événements à venir ({eventsList.length})
          </h2>
          
          <div className="space-y-6">
            <AnimatePresence mode='popLayout'>
              {eventsList.length > 0 ? (
                eventsList.map((registration) => {
                  const eventData = registration.event || {};
                  const eventDate = eventData.date ? new Date(eventData.date) : null;
                  const isVolunteer = registration.role === 'volunteer';

                  return (
                    <motion.div 
                      key={registration._id}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.95 }}
                      variants={itemVariants}
                      onClick={() => navigate(`/app/Event/${eventData._id}`)}
                      className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-white/10 hover:bg-white/10 transition-all group cursor-pointer"
                    >
                      {/* Image Section */}
                      <div className="md:w-64 h-48 md:h-auto relative overflow-hidden bg-slate-800">
                        {eventData.coverImage ? (
                          <img 
                            src={`http://localhost:5000/${eventData.coverImage.replace(/\\/g, '/')}`} 
                            alt={eventData.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600 italic">Pas d'image</div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 p-6 relative flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                          <button 
                            onClick={(e) => handleDelete(e, registration._id)} 
                            className="absolute top-6 right-6 text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all z-10"
                          >
                            <Trash2 size={20} />
                          </button>

                          <div className="flex flex-col h-full">
                            <span className="bg-[#cd7329] text-white text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-4 uppercase">
                              {eventData.category || "Général"}
                            </span>
                            
                            <h3 className="text-2xl font-bold mb-2">{eventData.title}</h3>
                            
                            <p className="text-slate-400 text-sm mb-4">
                              Organisé par: <span className="text-[#cd7329] font-semibold">
                                {eventData.organizer?.nom || "Admin"} {eventData.organizer?.prenom || ""}
                              </span>
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-6">
                              <div className="flex items-center text-slate-400 text-sm gap-2">
                                <Calendar size={16} className="text-[#cd7329]" /> 
                                <span>{eventDate ? eventDate.toLocaleDateString('fr-FR') : "N/A"}</span>
                              </div>
                              <div className="flex items-center text-slate-400 text-sm gap-2">
                                <Clock size={16} className="text-[#cd7329]" /> 
                                <span>{eventDate ? eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : "N/A"}</span>
                              </div>
                            </div>

                            {/* الباركود والسكاينر بالحجم الكبير */}
                            <div className="mt-auto pt-4 border-t border-white/10">
                              {isVolunteer ? (
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-500">Mode Bénévole</span>
                                  </div>
                                  <button 
                                    onClick={(e) => { e.stopPropagation(); navigate(`/student/Scanner/${eventData._id}`); }}
                                    className="flex items-center gap-2 bg-[#cd7329] hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-bold text-xs transition-all shadow-lg shadow-orange-500/20"
                                  >
                                    <ScanQrCode size={16} />
                                    Scanner les présences
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-[#cd7329]">
                                      <QrCode size={20} />
                                      <span className="text-sm font-black uppercase tracking-tight">Mon Pass d'entrée</span>
                                    </div>
                                    <p className="text-xs text-slate-500 italic max-w-[200px]">Présentez ce code à l'entrée de l'événement pour valider votre présence.</p>
                                    
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); downloadPDF(eventData); }}
                                      className="mt-2 flex items-center gap-2 bg-white/10 hover:bg-[#cd7329] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10"
                                    >
                                      <FileDown size={14} />
                                      Télécharger PDF
                                    </button>
                                  </div>
                                  
                                  {currentUser && (
                                    <div className="bg-white p-2 rounded-xl shadow-2xl shadow-black/50 hover:scale-105 transition-transform duration-300">
                                      <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currentUser._id}:${eventData._id}`} 
                                        alt="Access QR" 
                                        className="w-24 h-24 md:w-32 md:h-32" // الحجم الكبير الذي طلبته
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-20 text-slate-500 border-2 border-dashed border-white/5 rounded-3xl">
                  Aucun événement trouvé.
                </div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </>
  );
};

export default MyEvents;