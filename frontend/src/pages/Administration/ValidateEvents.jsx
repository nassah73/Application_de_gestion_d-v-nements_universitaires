import React, { useState,useEffect } from 'react';
import Sidebar from './components/Sidebare'; 
import AdminHeader from './components/AdminHeader';
import StatusBadge from './components/StatusBadge';
import axios from 'axios';
import { 
  Eye, Check, X, AlertTriangle, CheckCircle2, 
  Users, CalendarCheck, MapPin, Clock, User, Tag 
} from 'lucide-react';

const INITIAL_EVENTS = [
  { id: 1, title: 'Science Fair 2026', organizer: 'Physics Club', category: 'Sociale', date: '2026-04-15', capacity: 200, status: 'Soumis', description: 'Une exposition annuelle des projets scientifiques.', location: 'Salle Polyvalente A' },
  { id: 2, title: 'Cultural Night', organizer: 'Association Int', category: 'Culturel', date: '2026-04-18', capacity: 500, status: 'Validé', description: 'Soirée culturelle.', location: 'Amphithéâtre Central' },
];

const INITIAL_NOTIFS = [
  { id: 1, icon: <Users size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande', desc: 'Club Informatique a demandé le statut.', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair" attend validation.', read: false },
];

const TABS = ['All Events', 'Soumis', 'Validé', 'Publié', 'Rejeté'];

export default function ValidateEvents() {
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
                  <th className="px-4 py-3">Event Title</th>
                  <th className="px-4 py-3">Organizer</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                  
                </tr>
              </thead>
              <tbody>
                {filtered.map(event => (
                  <tr key={event.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 text-sm font-bold">{event.title}</td>
                    <td className="px-4 py-4 text-sm text-slate-500">{event.organizer}</td>
                    <td className="px-4 py-4 text-center"><StatusBadge status={event.status} /></td>
                    {/* ... نفس الـ Imports ... */}

          <td className="px-4 py-4">
            <div className="flex items-center justify-center gap-4">
              
              {/* 1. زر المعاينة (العين) */}
              <button 
                onClick={() => setViewEvent(event)} 
                className="flex items-center gap-1 p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                title="Voir détails"
              >
                <Eye size={18} />
                <span className="text-[10px] font-bold uppercase">Détails</span>
              </button>

              {/* 2. زر القبول (Check) */}
              <button 
                onClick={() => handleApprove(event._id || event.id)} 
                className="flex items-center gap-1 p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors border border-emerald-100"
                title="Valider"
              >
                <Check size={18} />
                <span className="text-[10px] font-bold uppercase">Valider</span>
              </button>

              {/* 3. زر الرفض (X) */}
              <button 
                onClick={() => handleReject(event._id || event.id)} 
                className="flex items-center gap-1 p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors border border-red-100"
                title="Rejeter"
              >
                <X size={18} />
                <span className="text-[10px] font-bold uppercase">Rejeter</span>
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
    </div>
  );
}