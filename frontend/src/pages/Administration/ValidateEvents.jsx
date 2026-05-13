import React, { useState,useEffect } from 'react';
import Sidebar from './components/Sidebare'; 
import AdminHeader from './components/AdminHeader';
import StatusBadge from './components/StatusBadge';
import axios from 'axios';
import { 
  Eye, Check, X, AlertTriangle, CheckCircle2, 
  Users, CalendarCheck, MapPin, Clock, User, Tag 
} from 'lucide-react';


const INITIAL_NOTIFS = [
  { id: 1, icon: <Users size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande', desc: 'Club Informatique a demandé le statut.', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair" attend validation.', read: false },
];

const TABS = ['All Events', 'Soumis', 'approved', 'Publié', 'Rejeté'];

export default function ValidateEvents() {
   const [showModifModal, setShowModifModal] = useState(false);
   const [selectedEvent, setSelectedEvent] = useState(null);
   const [feedback, setFeedback] = useState("");
   
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('All Events');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);
  const [viewEvent, setViewEvent] = useState(null);
const [loading, setLoading] = useState(true);
  const filtered = activeTab === 'All Events' ? events : events.filter(e => e.status === activeTab);

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
      
      <main className="flex-1 flex flex-col overflow-hidden text-slate-800">
        <AdminHeader notifications={notifications} setNotifications={setNotifications} />

        <div className="p-8 overflow-y-auto flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Event Validation Queue</h2>
              <div className="flex gap-2">
                {TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? 'bg-orange-500 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}>
                    {tab} ({tab === 'All Events' ? events.length : events.filter(e => e.status === tab).length})
                  </button>
                ))}
              </div>
            </div>

            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-3 py-3">Titre Event</th>
                      <th className="px-3 py-3">Description</th>
                      <th className="px-3 py-3">Organisateur</th>
                      <th className="px-3 py-3">Email</th>
                      <th className="px-3 py-3 text-center">Date & Heure</th>
                      <th className="px-3 py-3">Lieu</th>
                      <th className="px-3 py-3 text-center">Status</th>
                      <th className="px-3 py-3 text-center">Actions</th>
                    </tr>
              </thead>
              <tbody>
                  {filtered.map(event => (
                    <tr key={event._id || event.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      
                      {/* 1. Titre (Bohdo) */}
                      <td className="px-3 py-4 text-sm font-bold text-slate-700">
                        <div className="max-w-[120px] truncate" title={event.title}>
                          {event.title}
                        </div>
                      </td>

                      {/* 2. Description (Bohdha) */}
                      <td className="px-3 py-4 text-[11px] text-slate-500 italic">
                        <div className="max-w-[150px] line-clamp-2" title={event.description}>
                          {event.description}
                        </div>
                      </td>

                      {/* 3. Organisateur */}
                      <td className="px-3 py-4 text-sm text-slate-600 font-medium">
                        {event.organizer ? `${event.organizer.prenom} ${event.organizer.nom}` : "---"}
                      </td>

                      {/* 4. Email */}
                      <td className="px-3 py-4 text-[11px] text-blue-500 underline decoration-blue-200">
                        {event.organizer?.email || "---"}
                      </td>

                      {/* 5. Date & Heure */}
                      <td className="px-3 py-4 text-center">
                        <div className="flex flex-col text-[12px] text-slate-500">
                          <span className="font-bold">{new Date(event.date).toLocaleDateString()}</span>
                          <span className="text-[10px] opacity-60">
                            {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      </td>

                      {/* 6. Lieu */}
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-1 text-[12px] text-slate-500">
                          <MapPin size={12} className="text-red-400 shrink-0" />
                          <span className="truncate max-w-[80px]">{event.location}</span>
                        </div>
                      </td>

                      {/* 7. Status */}
                      <td className="px-3 py-4 text-center">
                        <StatusBadge status={event.status} />
                      </td>

                      {/* 8. Actions (Zdna "Modif" button) */}
                      <td className="px-3 py-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button onClick={() => setViewEvent(event)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Détails">
                            <Eye size={16} />
                          </button>
                          
                          {event.status === 'pending' && (
      
                            <button onClick={() => handelAccept(event._id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md border border-emerald-50" title="Accepter">
                              <Check size={16} />
                            </button>)}

                          {/* Button: Valider & Modif */}
                          <button 
                              onClick={() => {
                                setSelectedEvent(event);
                                setShowModifModal(true);
                              }}
                              className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-md border border-purple-50 flex flex-col items-center"
                            >
                              <AlertTriangle size={15} />
                              <span className="text-[7px] font-black uppercase">Modif</span>
                            </button>

                          <button onClick={() => handleReject(event._id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-md" title="Refuser">
                            <X size={16} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Detail (Simplified) */}
      {viewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl animate-in zoom-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{viewEvent.title}</h3>
              <button onClick={() => setViewEvent(null)}><X /></button>
            </div>
            <p className="text-slate-600 mb-6">{viewEvent.description}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div><p className="text-[10px] font-bold text-slate-400 uppercase">Lieu</p><p className="font-semibold">{viewEvent.location}</p></div>
              <div><p className="text-[10px] font-bold text-slate-400 uppercase">Date</p><p className="font-semibold">{viewEvent.date}</p></div>
            </div>
            {viewEvent.status === 'Soumis' && (
              <div className="flex gap-3">
                <button onClick={() => handleApprove(viewEvent.id)} className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl">Approuver</button>
                <button onClick={() => setViewEvent(null)} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl">Rejeter</button>
              </div>
            )}
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