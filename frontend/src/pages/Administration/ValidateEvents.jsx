import React, { useState,useEffect } from 'react';
import Sidebar from './components/Sidebare'; 
import AdminHeader from './components/AdminHeader';
import StatusBadge from './components/StatusBadge';
import axios from 'axios';
import { 
  Eye, Check, X, AlertTriangle, CheckCircle2, 
  Users, CalendarCheck, MapPin, Clock, User, Tag,
  Search, Filter, Calendar, ChevronRight
} from 'lucide-react';


const INITIAL_NOTIFS = [
  { id: 1, icon: <Users size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande', desc: 'Club Informatique a demandé le statut.', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair" attend validation.', read: false },
];

const TABS = [
  { id: 'All Events', label: 'Tous les événements' },
  { id: 'pending', label: 'En attente' },
  { id: 'approved', label: 'Validés' },
  { id: 'rejected', label: 'Refusés' },
  { id: 'modification_requested', label: 'Modif. demandée' }
];

export default function ValidateEvents() {
   const [showModifModal, setShowModifModal] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState(null);
   const [feedback, setFeedback] = useState("");
   const [searchTerm, setSearchTerm] = useState("");
   
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('All Events');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);
  const [viewEvent, setViewEvent] = useState(null);
const [loading, setLoading] = useState(true);

  const filtered = events.filter(e => {
    const matchesTab = activeTab === 'All Events' || e.status === activeTab;
    const matchesSearch = e.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.organizer?.nom?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleApprove = (id) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'Validé' } : e));
    setViewEvent(null);
  };


const getAllEvents = async () => {
    try {
      
      const res = await axios.get('http://localhost:5000/Event/getEvents'); 
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data from DB:", err);
      setLoading(false);
    }
  };
useEffect(() => {
    getAllEvents();
  }, []);


if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f172a] text-white">
        <p className="text-xl font-bold animate-pulse">Chargement des événements...</p>
      </div>
    );
  }


  const handelAccept=async(Event_id)=>{
    try {
      const res= await axios.put(`http://localhost:5000/api/valide/${Event_id}`)
      setEvents(prevEvents => prevEvents.filter(ev => ev._id !== Event_id));
      setEvents(prev => prev.map(e => 
      e._id === Event_id ? { ...e, status: 'approved' } : e
    ));
      alert(res.data.message)
    } catch (error) {
      console.log('erreu '+error)
    }
  }

  const handleReject = async (Event_id) => {
    const reason = prompt("Veuillez saisir le motif du refus :");
    if (reason === null) return; // Annulé

    try {
      const res = await axios.put(`http://localhost:5000/api/valide/reject/${Event_id}`, { reason });
      setEvents(prev => prev.map(e => 
        e._id === Event_id ? { ...e, status: 'rejected' } : e
      ));
      alert(res.data.message);
    } catch (error) {
      console.error("Error rejecting event:", error);
      alert("Erreur lors du refus de l'événement");
    }
  };
  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <AdminHeader notifications={notifications} setNotifications={setNotifications} />

        <div className="p-8 overflow-y-auto flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
              <div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                  Validation des Événements <span className="text-orange-500">.</span>
                </h1>
                <p className="text-white/40 mt-2 font-medium">Gérez et validez les demandes d'événements universitaires.</p>
              </div>
            </div>

            {/* Filters and Tabs */}
            <div className="mb-8 space-y-6">
              <div className="flex flex-col md:flex-row gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-3xl backdrop-blur-sm">
                <div className="relative flex-1 group">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-500 transition-colors" />
                  <input 
                    type="text"
                    placeholder="Rechercher par titre ou organisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white outline-none focus:border-orange-500/30 focus:bg-white/[0.05] transition-all"
                  />
                </div>
                <div className="flex overflow-x-auto gap-2 no-scrollbar">
                  {TABS.map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeTab === tab.id 
                          ? 'bg-orange-500 text-white shadow-[0_10px_20px_rgba(249,115,22,0.2)]' 
                          : 'bg-white/[0.03] text-white/40 border border-white/5 hover:bg-white/[0.06]'
                      }`}
                    >
                      {tab.label}
                      <span className={`ml-3 px-2 py-0.5 rounded-lg text-[10px] ${
                        activeTab === tab.id ? 'bg-white/20' : 'bg-white/5'
                      }`}>
                        {tab.id === 'All Events' ? events.length : events.filter(e => e.status === tab.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.01]">
                      <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Événement</th>
                      <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Organisateur</th>
                      <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Date & Lieu</th>
                      <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-center">Statut</th>
                      <th className="px-6 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.03]">
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center justify-center opacity-20">
                            <Calendar size={48} className="mb-4" />
                            <p className="font-black uppercase tracking-widest text-xs text-white">Aucun événement trouvé</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map(event => (
                        <tr key={event._id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/5 border border-white/5 flex items-center justify-center overflow-hidden shrink-0">
                                {event.coverImage ? (
                                  <img src={`http://localhost:5000/${event.coverImage}`} alt="" className="w-full h-full object-cover" />
                                ) : (
                                  <Calendar size={20} className="text-orange-500/50" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-black text-white uppercase tracking-tight truncate group-hover:text-orange-500 transition-colors">{event.title}</p>
                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1 truncate">{event.category}</p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-6">
                            <div className="flex flex-col">
                              <p className="text-xs font-black text-white/70 uppercase tracking-widest">
                                {event.organizer ? `${event.organizer.prenom} ${event.organizer.nom}` : "---"}
                              </p>
                              <p className="text-[10px] text-white/20 font-medium mt-1">
                                {event.organizer?.email || "---"}
                              </p>
                            </div>
                          </td>

                          <td className="px-6 py-6">
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2 text-[10px] font-black text-white/50 uppercase tracking-widest">
                                <Calendar size={12} className="text-orange-500" />
                                {new Date(event.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-black text-white/50 uppercase tracking-widest">
                                <MapPin size={12} className="text-orange-500" />
                                <span className="truncate max-w-[120px]">{event.location}</span>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-6 text-center">
                            <StatusBadge status={event.status} />
                          </td>

                          <td className="px-6 py-6">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => setViewEvent(event)} 
                                className="p-3 bg-white/[0.03] border border-white/5 text-white/40 hover:text-white hover:bg-orange-500 hover:border-orange-500 rounded-xl transition-all group/btn shadow-lg"
                                title="Détails"
                              >
                                <Eye size={16} className="group-hover/btn:scale-110 transition-transform" />
                              </button>
                              
                              {(event.status === 'pending' || event.status === 'modification_requested') && (
                                <>
                                  <button 
                                    onClick={() => handelAccept(event._id)} 
                                    className="p-3 bg-white/[0.03] border border-white/5 text-emerald-500/50 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 rounded-xl transition-all group/btn shadow-lg"
                                    title="Accepter"
                                  >
                                    <Check size={16} className="group-hover/btn:scale-110 transition-transform" />
                                  </button>

                                  <button 
                                    onClick={() => {
                                      setSelectedEvent(event);
                                      setShowModifModal(true);
                                    }}
                                    className="p-3 bg-white/[0.03] border border-white/5 text-purple-500/50 hover:text-white hover:bg-purple-500 hover:border-purple-500 rounded-xl transition-all group/btn shadow-lg"
                                    title="Demander modif"
                                  >
                                    <AlertTriangle size={16} className="group-hover/btn:scale-110 transition-transform" />
                                  </button>

                                  <button 
                                    onClick={() => handleReject(event._id)} 
                                    className="p-3 bg-white/[0.03] border border-white/5 text-red-500/50 hover:text-white hover:bg-red-500 hover:border-red-500 rounded-xl transition-all group/btn shadow-lg"
                                    title="Refuser"
                                  >
                                    <X size={16} className="group-hover/btn:scale-110 transition-transform" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Detail (Enhanced) */}
      {viewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl animate-in zoom-in duration-300 my-8 overflow-hidden">
            {/* Header with Cover Image */}
            <div className="relative h-48 bg-slate-100">
              {viewEvent.coverImage ? (
                <img 
                  src={`http://localhost:5000/${viewEvent.coverImage}`} 
                  alt={viewEvent.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                  <CalendarCheck size={48} className="text-slate-300" />
                </div>
              )}
              <button 
                onClick={() => setViewEvent(null)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-6">
                <StatusBadge status={viewEvent.status} />
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight mb-2">{viewEvent.title}</h3>
                  <div className="flex items-center gap-2 text-orange-500 font-bold text-sm uppercase tracking-wider">
                    <Tag size={16} />
                    {viewEvent.category}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <CalendarCheck size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date et Heure</p>
                      <p className="font-semibold text-sm">{new Date(viewEvent.date).toLocaleString('fr-FR')}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lieu</p>
                      <p className="font-semibold text-sm">{viewEvent.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <Users size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capacité</p>
                      <p className="font-semibold text-sm">{viewEvent.capacity} places</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Organisateur</p>
                      <p className="font-semibold text-sm">
                        {viewEvent.organizer ? `${viewEvent.organizer.prenom} ${viewEvent.organizer.nom}` : "Inconnu"}
                      </p>
                    </div>
                  </div>

                  {viewEvent.registrationLink && (
                    <div className="flex items-center gap-3 text-slate-600">
                      <div className="p-2 bg-slate-50 rounded-lg text-slate-400">
                        <ExternalLink size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lien Inscription</p>
                        <a href={viewEvent.registrationLink} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-semibold text-sm hover:underline">
                          Voir le lien
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Description</h4>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {viewEvent.description}
                  </p>
                </div>
              </div>

              {(viewEvent.status === 'pending' || viewEvent.status === 'modification_requested') && (
                 <div className="flex gap-4">
                   <button 
                     onClick={() => { handelAccept(viewEvent._id); setViewEvent(null); }}
                     className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-emerald-200"
                   >
                     Approuver l'événement
                   </button>
                   <button 
                     onClick={() => { handleReject(viewEvent._id); setViewEvent(null); }}
                     className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-lg shadow-red-200"
                   >
                     Rejeter
                   </button>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}




    {/* Modal Modifier */}
{showModifModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4 text-purple-600">
          <AlertTriangle size={24} />
          <h3 className="text-lg font-bold text-slate-800">Demander une Modification</h3>
        </div>
        
        <p className="text-sm text-slate-500 mb-4">
          Événement: <span className="font-semibold text-slate-700">{selectedEvent?.title}</span>
        </p>

        <textarea
          className="w-full h-32 p-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all resize-none"
          placeholder="Ex: Veuillez changer la salle 4 par la salle 10 car elle est déjà occupée..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <div className="flex gap-3 mt-6">
          <button 
            onClick={() => { setShowModifModal(false); setFeedback(""); }}
            className="flex-1 py-2.5 text-sm font-semibold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
          >
            Annuler
          </button>
          <button 
            onClick={async () => {
              try {
                const res = await axios.post(`http://localhost:5000/api/valide/request-modification/${selectedEvent._id}`, { message: feedback });
                alert(res.data.message);
                setShowModifModal(false);
                setFeedback("");
              } catch (error) {
                console.error(error);
                alert("Erreur lors de l'envoi");
              }
            }}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
)}


    </div>
  );
}