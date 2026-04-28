import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import ParticipantsTable from './components/ParticipantsTable';
import eventService from './services/eventService';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  ExternalLink, 
  AlertCircle, 
  Clock, 
  FileDown,
  ChevronRight,
  Info,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Layout
} from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const data = await eventService.getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Erreur lors de la récupération des détails de l\'événement');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'approved':          return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'approved-modified': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'pending':           return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'rejected':          return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:                  return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':          return 'Validé';
      case 'approved-modified': return 'Validé avec modification';
      case 'pending':           return 'En cours';
      case 'rejected':          return 'Refusé';
      default:                  return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':          return <CheckCircle2 size={14} />;
      case 'approved-modified': return <RotateCcw size={14} />;
      case 'pending':           return <Clock size={14} />;
      case 'rejected':          return <XCircle size={14} />;
      default:                  return <Info size={14} />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
        <OrgSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <OrgNavbar />
          <main className="flex-1 p-8 flex items-center justify-center relative z-10">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-6 shadow-[0_0_20px_rgba(249,115,22,0.2)]"></div>
              <p className="text-white/40 font-black uppercase tracking-widest text-xs">Chargement des détails...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
        <OrgSidebar />
        <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none"></div>
          <OrgNavbar />
          <main className="flex-1 p-8 relative z-10">
            <div className="max-w-2xl mx-auto p-12 rounded-[2rem] border border-red-500/20 bg-red-500/5 backdrop-blur-xl text-center shadow-2xl">
              <div className="w-20 h-20 bg-red-500/10 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <AlertCircle size={40} className="text-red-500" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Erreur de chargement</h2>
              <p className="text-white/60 mb-8 font-medium">{error || 'Événement non trouvé'}</p>
              <Link 
                to="/organisateur/events" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-900 font-black uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-black/20"
              >
                <ArrowLeft size={18} />
                Retour aux événements
              </Link>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const isPublished = event.status === 'approved' || event.status === 'approved-modified';
  const isRejected = event.status === 'rejected';
  const isPending = event.status === 'pending';

  const inscriptionCount = event.participants?.length || 0;
  const fillRate = event.capacity > 0 ? (inscriptionCount / event.capacity) * 100 : 0;

  const displayTitle = event.modifiedTitle || event.title;
  const displayDescription = event.modifiedDescription || event.description;
  const displayDate = event.modifiedDate || event.date;
  const displayLocation = event.modifiedLocation || event.location;
  const displayCategory = event.modifiedCategory || event.category;
  const displayRegistrationLink = event.modifiedRegistrationLink || event.registrationLink;

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <OrgNavbar />
        
        <main className="flex-1 p-8 relative z-10">
          {/* Breadcrumbs / Back button */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <Link 
              to="/organisateur/events" 
              className="group flex items-center gap-3 text-white/40 hover:text-white transition-all"
            >
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all">
                <ArrowLeft size={20} strokeWidth={3} />
              </div>
              <div>
                <span className="font-black uppercase tracking-[0.2em] text-[10px] block opacity-50">Retour</span>
                <span className="font-black uppercase tracking-widest text-xs">Mes Événements</span>
              </div>
            </Link>

            <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] backdrop-blur-md">
              <Layout size={14} className="opacity-50" />
              <span>Espace Organisateur</span>
              <ChevronRight size={14} className="opacity-30" />
              <span>Événements</span>
              <ChevronRight size={14} className="opacity-30" />
              <span className="text-orange-500">Détails de l'événement</span>
            </div>
          </div>

          <div className="space-y-8 max-w-[1400px] mx-auto">
            {/* Status Alerts */}
            {isRejected && (
              <div className="p-8 rounded-[2rem] border border-red-500/20 bg-red-500/5 backdrop-blur-xl animate-in fade-in slide-in-from-top-6 duration-700 shadow-2xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-[1.5rem] bg-red-500/10 text-red-500 border border-red-500/20 shadow-lg shadow-red-500/10">
                    <XCircle size={32} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Événement refusé</h3>
                    <div className="mt-4 p-5 rounded-2xl bg-[#0f172a]/40 border border-white/5 backdrop-blur-sm">
                      <p className="text-sm text-white/70 leading-relaxed">
                        <span className="text-red-400 font-black uppercase text-[10px] block mb-2 tracking-[0.2em] opacity-70">Motif du refus</span>
                        {event.rejectionReason || 'Aucun motif spécifique fourni par l\'administration.'}
                      </p>
                    </div>
                    <p className="text-xs text-white/30 mt-4 font-bold uppercase tracking-widest flex items-center gap-2">
                      <Info size={14} />
                      Veuillez créer un nouvel événement en tenant compte des motifs ci-dessus.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {event.status === 'approved-modified' && (
              <div className="p-8 rounded-[2rem] border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl animate-in fade-in slide-in-from-top-6 duration-700 shadow-2xl">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-[1.5rem] bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                    <RotateCcw size={32} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Événement mis à jour</h3>
                    <p className="text-sm text-white/60 mt-2 font-medium">
                      Les informations ci-dessous reflètent les modifications approuvées par l'administration pour garantir le succès de votre événement.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent opacity-50"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                    <div className="flex-1">
                      <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-lg ${getStatusStyle(event.status)}`}>
                        {getStatusIcon(event.status)}
                        {getStatusLabel(event.status)}
                      </div>
                      <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-orange-400 transition-colors duration-500">{displayTitle}</h2>
                    </div>
                  </div>
                  
                  {event.coverImage && (
                    <div className="aspect-[21/9] w-full mb-10 overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl relative group/img">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60 z-10"></div>
                      <img 
                        src={`http://localhost:5000/${event.coverImage}`} 
                        alt={displayTitle}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                      />
                    </div>
                  )}
                  
                  <div className="prose prose-invert max-w-none">
                    <div className="flex items-center gap-3 mb-6 text-orange-500/50">
                      <div className="h-[2px] w-8 bg-orange-500/50"></div>
                      <span className="font-black uppercase tracking-[0.3em] text-[10px]">Description de l'événement</span>
                    </div>
                    <p className="text-xl text-white/70 leading-relaxed mb-10 font-medium">{displayDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-5 group/card hover:bg-white/[0.05] transition-all">
                      <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 group-hover/card:scale-110 transition-transform shadow-lg shadow-orange-500/5">
                        <MapPin size={22} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1.5">Localisation</p>
                        <p className="text-white font-black text-lg tracking-tight">{displayLocation}</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-5 group/card hover:bg-white/[0.05] transition-all">
                      <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 group-hover/card:scale-110 transition-transform shadow-lg shadow-orange-500/5">
                        <Calendar size={22} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1.5">Date & Heure</p>
                        <p className="text-white font-black text-lg tracking-tight">{formatDate(displayDate)}</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-5 group/card hover:bg-white/[0.05] transition-all">
                      <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 group-hover/card:scale-110 transition-transform shadow-lg shadow-orange-500/5">
                        <Tag size={22} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1.5">Catégorie</p>
                        <p className="text-white font-black text-lg tracking-tight">{displayCategory}</p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-5 group/card hover:bg-white/[0.05] transition-all">
                      <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500 group-hover/card:scale-110 transition-transform shadow-lg shadow-orange-500/5">
                        <ExternalLink size={22} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1.5">Inscription</p>
                        {displayRegistrationLink ? (
                          <a href={displayRegistrationLink} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-black hover:text-orange-400 flex items-center gap-2 transition-colors">
                            Ouvrir le portail <ExternalLink size={14} strokeWidth={3} />
                          </a>
                        ) : (
                          <p className="text-white/30 font-black italic">Non spécifié</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {event.status === 'approved-modified' && (
                    <div className="mt-10 pt-8 border-t border-white/5 flex items-center gap-4 text-xs text-blue-400 font-black uppercase tracking-widest opacity-60">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <Info size={16} strokeWidth={3} />
                      </div>
                      <span>Les informations affichées incluent les modifications approuvées par l'administration.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8 lg:sticky lg:top-28">
                <div className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                    État & Statistiques
                  </h3>

                  {isRejected ? (
                    <div className="text-center py-10">
                      <div className="w-20 h-20 rounded-[1.5rem] bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6 border border-red-500/20 shadow-xl shadow-red-500/5">
                        <XCircle size={40} strokeWidth={2.5} />
                      </div>
                      <p className="text-2xl font-black text-white uppercase tracking-tighter">Refusé</p>
                      <p className="text-sm text-white/40 mt-3 font-medium">Cet événement ne peut plus être géré par l'organisateur.</p>
                    </div>
                  ) : isPending ? (
                    <div className="text-center py-10">
                      <div className="w-20 h-20 rounded-[1.5rem] bg-yellow-500/10 text-yellow-500 flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-xl shadow-yellow-500/5">
                        <Clock size={40} className="animate-pulse" strokeWidth={2.5} />
                      </div>
                      <p className="text-2xl font-black text-white uppercase tracking-tighter">En cours</p>
                      <p className="text-sm text-white/40 mt-3 font-medium">En attente de validation administrative avant publication.</p>
                    </div>
                  ) : (
                    <div className="space-y-10">
                      <div className="relative">
                        <div className="flex justify-between items-end mb-4">
                          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Remplissage</p>
                          <p className="text-3xl font-black text-white tracking-tighter">{Math.round(fillRate)}<span className="text-orange-500 text-lg ml-0.5">%</span></p>
                        </div>
                        <div className="h-4 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/5 p-1">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(249,115,22,0.3)] ${
                              fillRate >= 90 ? 'bg-gradient-to-r from-red-600 to-red-500' : 
                              fillRate >= 70 ? 'bg-gradient-to-r from-orange-600 to-orange-500' : 
                              'bg-gradient-to-r from-green-600 to-green-500'
                            }`}
                            style={{ width: `${Math.min(fillRate, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-5">
                        <div className="p-6 rounded-2xl bg-[#0f172a]/40 border border-white/5 group hover:border-orange-500/30 transition-all">
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-2 group-hover:text-orange-500/50 transition-colors">Inscrits</p>
                          <p className="text-3xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform origin-left">{inscriptionCount}</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#0f172a]/40 border border-white/5 group hover:border-orange-500/30 transition-all">
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-2 group-hover:text-orange-500/50 transition-colors">Capacité</p>
                          <p className="text-3xl font-black text-white tracking-tighter group-hover:scale-110 transition-transform origin-left">{event.capacity}</p>
                        </div>
                      </div>

                      {fillRate >= 90 && (
                        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-red-500/5">
                          <div className="p-2 bg-red-500/20 rounded-lg">
                            <AlertCircle size={16} strokeWidth={3} />
                          </div>
                          Presque complet
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Participants Section */}
            <div className="rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-1 h-full bg-orange-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/[0.01]">
                <div className="flex items-center gap-5">
                  <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-500 shadow-lg shadow-orange-500/5">
                    <Users size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">Liste des Participants</h3>
                    {isPublished && inscriptionCount > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <p className="text-xs text-white/40 font-black uppercase tracking-widest">{inscriptionCount} étudiants enregistrés</p>
                      </div>
                    )}
                  </div>
                </div>

                {isPublished && inscriptionCount > 0 && (
                  <button className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-[0_10px_20px_rgba(0,0,0,0.2)] active:scale-95 group/btn">
                    <FileDown size={18} strokeWidth={2.5} className="group-hover/btn:translate-y-0.5 transition-transform" />
                    Exporter PDF
                  </button>
                )}
              </div>
              
              <div className="p-8">
                {isPublished ? (
                  inscriptionCount > 0 ? (
                    <ParticipantsTable 
                      eventId={id} 
                      participants={event.participants} 
                    />
                  ) : (
                    <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.01] group/empty">
                      <div className="w-24 h-24 rounded-3xl bg-white/[0.03] flex items-center justify-center mx-auto mb-6 text-white/10 group-hover/empty:scale-110 transition-all duration-500 group-hover/empty:text-orange-500 group-hover/empty:bg-orange-500/10">
                        <Users size={48} strokeWidth={1.5} />
                      </div>
                      <p className="text-white/40 font-black uppercase tracking-[0.3em] text-sm">Aucun participant pour le moment</p>
                      <p className="text-white/10 text-[10px] mt-4 font-bold uppercase tracking-widest">Les inscriptions apparaîtront ici dès qu'elles seront effectuées.</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[2rem] bg-white/[0.01] text-white/30 font-black uppercase tracking-[0.2em] text-xs">
                    {isRejected
                      ? "Les participants ne sont plus disponibles pour cet événement refusé."
                      : "La liste des participants sera disponible une fois l'événement validé par l'administration."
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventDetails;
