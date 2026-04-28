import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import eventService from './services/eventService';
import EventCard from './components/EventCard';
import { Calendar, PlusCircle, Search, Filter } from 'lucide-react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const organizerId = user._id || user.id;
        
        if (!organizerId) {
          setError('Organisateur non identifié');
          setLoading(false);
          return;
        }

        const data = await eventService.getMyEvents(organizerId);
        setEvents(data);
      } catch (err) {
        setError('Erreur lors de la recuperation des evenements');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.titre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.lieu?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
        <OrgSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
          <OrgNavbar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar size={20} className="text-orange-500 animate-pulse" />
                </div>
              </div>
              <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] mt-6">Initialisation</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <OrgNavbar />
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                Mes Événements <span className="text-orange-500">.</span>
              </h1>
              <p className="text-gray-500 mt-2 font-medium">Gérez et suivez l'état de vos demandes d'événements.</p>
            </div>
            <Link 
              to="/organisateur/create-event" 
              className="flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all hover:shadow-[0_15px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1 active:scale-95"
            >
              <PlusCircle size={18} />
              <span>Créer un événement</span>
            </Link>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white/[0.02] border border-white/5 p-4 rounded-3xl backdrop-blur-sm">
            <div className="relative flex-1 group">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
              <input 
                type="text"
                placeholder="Rechercher par titre ou lieu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white outline-none focus:border-orange-500/30 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative group">
                <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-12 pr-10 py-3 bg-white/[0.03] border border-white/5 rounded-2xl text-sm text-white outline-none focus:border-orange-500/30 focus:bg-white/[0.05] appearance-none transition-all cursor-pointer"
                >
                  <option value="all" className="bg-[#1e293b]">Tous les statuts</option>
                  <option value="approved" className="bg-[#1e293b]">Validé</option>
                  <option value="pending" className="bg-[#1e293b]">En cours</option>
                  <option value="rejected" className="bg-[#1e293b]">Refusé</option>
                  <option value="approved-modified" className="bg-[#1e293b]">Modifié</option>
                </select>
              </div>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01] flex flex-col items-center justify-center">
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Calendar size={40} className="text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Aucun événement trouvé</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-8 font-medium">
                {searchTerm || filterStatus !== 'all' 
                  ? "Ajustez vos filtres ou votre recherche pour trouver ce que vous cherchez."
                  : "Commencez par créer votre premier événement pour le voir apparaître ici."}
              </p>
              {!(searchTerm || filterStatus !== 'all') && (
                <Link 
                  to="/organisateur/create-event" 
                  className="px-8 py-3 bg-white text-[#0f172a] font-black uppercase tracking-widest text-xs rounded-xl hover:bg-orange-500 hover:text-white transition-all"
                >
                  Créer maintenant
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Events;
