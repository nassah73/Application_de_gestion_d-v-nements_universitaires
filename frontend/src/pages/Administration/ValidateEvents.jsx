import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye, Check, X, Search, Bell, Settings, LogOut,
  LayoutDashboard, CalendarCheck, Users, Tag,
  MapPin, Clock, User, Users2, AlertTriangle, CheckCircle2, CheckCheck
} from 'lucide-react';

const INITIAL_EVENTS = [
  {
    id: 1, title: 'Science Fair 2026', organizer: 'Physics Club',
    category: 'Sociale', date: '2026-04-15', capacity: 200, status: 'Soumis',
    description: 'Une exposition annuelle des projets scientifiques des étudiants couvrant divers domaines.',
    location: 'Salle Polyvalente A', time: '09:00 – 17:00',
    contact: 'physics.club@uiz.ac.ma',
  },
  {
    id: 2, title: 'Cultural Night', organizer: 'International Students Association',
    category: 'Culturel', date: '2026-04-18', capacity: 500, status: 'Validé',
    description: 'Soirée culturelle mettant en valeur les traditions et arts des étudiants internationaux.',
    location: 'Amphithéâtre Central', time: '19:00 – 23:00',
    contact: 'isa@uiz.ac.ma',
  },
  {
    id: 3, title: 'Basketball Tournament', organizer: 'Sports Committee',
    category: 'Sports', date: '2026-04-10', capacity: 150, status: 'Publié',
    description: 'Tournoi inter-clubs de basketball avec 8 équipes participantes.',
    location: 'Complexe Sportif UIZ', time: '08:00 – 18:00',
    contact: 'sports@uiz.ac.ma',
  },
  {
    id: 4, title: 'AI Workshop Series', organizer: 'Computer Science Club',
    category: 'Sociale', date: '2026-04-20', capacity: 80, status: 'Soumis',
    description: 'Série d\'ateliers pratiques sur l\'intelligence artificielle et le machine learning.',
    location: 'Labo Informatique L3', time: '14:00 – 17:00',
    contact: 'csc@uiz.ac.ma',
  },
  {
    id: 5, title: 'Spring Music Festival', organizer: 'Music Society',
    category: 'Culturel', date: '2026-04-25', capacity: 300, status: 'Validé',
    description: 'Festival musical printanier avec performances live de groupes étudiants.',
    location: 'Jardin Central UIZ', time: '16:00 – 21:00',
    contact: 'music@uiz.ac.ma',
  },
  {
    id: 6, title: 'Debate Competition', organizer: 'Debate Club',
    category: 'Académique', date: '2026-04-08', capacity: 100, status: 'Rejeté',
    description: 'Compétition de débat oratoire sur des sujets d\'actualité nationale et internationale.',
    location: 'Salle de Conférence B', time: '10:00 – 16:00',
    contact: 'debate@uiz.ac.ma',
  },
];

const ADMIN_NOTIFS = [
  { id: 1, icon: <Users size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande organisateur', desc: 'Le Club Informatique a demandé le statut organisateur.', time: 'Il y a 2 min', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair 2026" attend votre validation.', time: 'Il y a 30 min', read: false },
  { id: 3, icon: <AlertTriangle size={16} />, iconBg: 'rgba(245,158,11,0.18)', iconColor: '#F59E0B', title: 'Capacité critique', desc: 'Hackathon 2025 — seulement 2 places restantes.', time: 'Il y a 1h', read: false },
  { id: 4, icon: <CheckCircle2 size={16} />, iconBg: 'rgba(16,185,129,0.18)', iconColor: '#10B981', title: 'Événement validé', desc: '"Cultural Night 2026" est maintenant en ligne.', time: 'Hier', read: true },
];

const TABS = ['All Events', 'Brouillon', 'Soumis', 'Validé', 'Publié', 'Rejeté'];

/* ─────────────────────────────────────────────── */
const ValidateEvents = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]     = useState('All Events');
  const [events, setEvents]           = useState(INITIAL_EVENTS);
  const [viewEvent, setViewEvent]     = useState(null);   // detail modal
  const [rejectTarget, setRejectTarget] = useState(null); // reject confirm modal
  const [rejectReason, setRejectReason] = useState('');
  const [toast, setToast]             = useState(null);   // { msg, type }

  /* Dropdown States */
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(ADMIN_NOTIFS);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* helpers */
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = (id, status) =>
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status } : e));

  const handleApprove = (event) => {
    updateStatus(event.id, 'Validé');
    showToast(`"${event.title}" a été approuvé avec succès.`, 'success');
  };

  const openRejectModal = (event) => {
    setRejectTarget(event);
    setRejectReason('');
  };
  const confirmReject = () => {
    updateStatus(rejectTarget.id, 'Rejeté');
    showToast(`"${rejectTarget.title}" a été rejeté.`, 'error');
    setRejectTarget(null);
  };

  const countFor = (tab) =>
    tab === 'All Events' ? events.length : events.filter(e => e.status === tab).length;

  const filtered = activeTab === 'All Events'
    ? events
    : events.filter(e => e.status === activeTab);

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>

      {/* ── Toast ── */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold transition-all animate-in fade-in slide-in-from-top-4"
          style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff', minWidth: 280 }}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}
          {toast.msg}
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside className="w-64 flex flex-col shrink-0" style={{ background: 'linear-gradient(145deg,rgba(205,115,41,0.95),rgba(168,85,20,0.9))' }}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-black uppercase tracking-wider text-white">UIZ University</h1>
          <p className="text-xs text-white/60 mt-1">Administration</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          <NavItem path="/responsable"               icon={<LayoutDashboard size={20}/>} label="Dashboard"        />
          <NavItem path="/responsable/events"        icon={<CalendarCheck   size={20}/>} label="Event Validation" active />
          <NavItem path="/responsable/users"         icon={<Users           size={20}/>} label="User Management"  />
          <NavItem path="/responsable/notifications" icon={<Bell            size={20}/>} label="Notifications"    />
          <NavItem path="/responsable/categories"    icon={<Tag             size={20}/>} label="Categories"       />
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0">
          <NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" />
          <NavItem path="/auth/login"           icon={<LogOut   size={20}/>} label="Logout"   />
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0"
          style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/30 border outline-none focus:border-orange-400 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
              placeholder="Search events, organizers..."
            />
          </div>
          <div className="flex items-center gap-4">
            
            {/* ── Notification Bell ── */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(o => !o)}
                className="relative p-2 rounded-full cursor-pointer transition-all"
                style={{ background: notifOpen ? 'rgba(205,115,41,0.2)' : 'rgba(255,255,255,0.06)', color: notifOpen ? '#cd7329' : 'rgba(255,255,255,0.5)' }}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-[16px] text-white text-[9px] font-black rounded-full border border-slate-900 flex items-center justify-center px-[2px]" style={{ background: '#cd7329' }}>
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[360px] rounded-2xl shadow-2xl border overflow-hidden z-50 animate-in fade-in zoom-in duration-200" style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div>
                      <h5 className="text-sm font-black text-white">Notifications</h5>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{unreadCount} non lues</p>
                    </div>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-orange-500 hover:opacity-80">
                        <CheckCheck size={13} /> Tout marquer
                      </button>
                    )}
                  </div>
                  <div className="max-h-[320px] overflow-y-auto divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    {notifications.length === 0 ? (
                      <div className="py-10 text-center"><Bell size={28} className="mx-auto mb-3 text-white/10" /><p className="text-sm font-bold text-white/30">Aucune notification</p></div>
                    ) : notifications.map(n => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3 transition-colors" style={{ background: n.read ? 'transparent' : 'rgba(205,115,41,0.06)' }}>
                        <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-bold" style={{ background: n.iconBg, color: n.iconColor }}>{n.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[13px] font-bold text-white leading-tight">{n.title}</p>
                            {!n.read && <span className="shrink-0 w-2 h-2 rounded-full" style={{ background: '#cd7329' }} />}
                          </div>
                          <p className="text-[11px] mt-0.5 text-white/40 leading-snug">{n.desc}</p>
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); dismiss(n.id); }} className="shrink-0 p-1 rounded-lg text-white/20 hover:text-white"><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Profile Dropdown ── */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setProfileOpen(o => !o)}
                className="flex items-center gap-3 border-l pl-4 hover:opacity-80 transition-all outline-none" 
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Responsable Admin</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg transform transition-transform"
                  style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)', transform: profileOpen ? 'scale(1.1)' : 'scale(1)' }}>A</div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl shadow-2xl border overflow-hidden z-50 animate-in fade-in zoom-in duration-200"
                  style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="px-5 py-4 border-b border-white/5">
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Compte Admin</p>
                    <p className="text-sm font-bold text-white mt-1">Super Administrateur</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => { setProfileOpen(false); navigate('/responsable/settings'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 transition-all"><Settings size={16} /> Paramètres</button>
                    <button onClick={() => { setProfileOpen(false); navigate('/auth/login'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"><LogOut size={16} /> Se déconnecter</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Event Validation Queue</h2>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-600">{events.filter(e => e.status === 'Soumis').length} en attente</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab ? 'text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`} style={activeTab === tab ? { background: '#cd7329' } : {}}>{tab} <span className="opacity-70">({countFor(tab)})</span></button>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead><tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider"><th className="px-4 py-3">Event Title</th><th className="px-4 py-3">Organizer</th><th className="px-4 py-3">Category</th><th className="px-4 py-3 text-center">Date</th><th className="px-4 py-3 text-center">Capacity</th><th className="px-4 py-3 text-center">Status</th><th className="px-4 py-3 text-center">Actions</th></tr></thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtered.length === 0 ? (<tr><td colSpan={7} className="py-16 text-center text-slate-400 text-sm font-medium">Aucun événement dans cette catégorie.</td></tr>) : filtered.map(event => (
                      <tr key={event.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-4 py-4 text-sm font-bold text-slate-800">{event.title}</td>
                        <td className="px-4 py-4 text-sm text-slate-500">{event.organizer}</td>
                        <td className="px-4 py-4 text-sm text-slate-500">{event.category}</td>
                        <td className="px-4 py-4 text-sm text-slate-500 text-center">{event.date}</td>
                        <td className="px-4 py-4 text-sm text-slate-500 text-center">{event.capacity}</td>
                        <td className="px-4 py-4 text-center"><StatusBadge status={event.status} /></td>
                        <td className="px-4 py-4"><div className="flex items-center justify-center gap-2"><button onClick={() => setViewEvent(event)} title="Voir les détails" className="p-2 rounded-xl transition-all text-blue-500 hover:bg-blue-50"><Eye size={17} /></button>{event.status === 'Soumis' && (<button onClick={() => handleApprove(event)} title="Approuver" className="p-2 rounded-xl transition-all text-emerald-600 hover:bg-emerald-50"><Check size={17} /></button>)}{(event.status === 'Soumis' || event.status === 'Validé') && (<button onClick={() => openRejectModal(event)} title="Rejeter" className="p-2 rounded-xl transition-all text-red-500 hover:bg-red-50"><X size={17} /></button>)}</div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {viewEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 shadow-2xl" onClick={() => setViewEvent(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b"><div><h3 className="text-lg font-black">{viewEvent.title}</h3><p className="text-xs text-slate-400 font-bold uppercase">Détails</p></div><button onClick={() => setViewEvent(null)} className="p-2 text-slate-400 hover:text-slate-600"><X size={18} /></button></div>
            <div className="px-7 py-5 space-y-4"><p className="text-sm text-slate-600">{viewEvent.description}</p><div className="grid grid-cols-2 gap-4"><InfoRow icon={<User size={15}/>} label="Organisateur" value={viewEvent.organizer}/><InfoRow icon={<Tag size={15}/>} label="Catégorie" value={viewEvent.category}/><InfoRow icon={<Clock size={15}/>} label="Date" value={viewEvent.date}/><InfoRow icon={<MapPin size={15}/>} label="Lieu" value={viewEvent.location}/></div></div>
            {viewEvent.status === 'Soumis' && (<div className="flex gap-3 px-7 pb-6"><button onClick={() => { handleApprove(viewEvent); setViewEvent(null); }} className="flex-1 py-3 rounded-2xl font-bold text-white bg-emerald-500">Approuver</button><button onClick={() => { setViewEvent(null); openRejectModal(viewEvent); }} className="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500">Rejeter</button></div>)}
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 shadow-2xl" onClick={() => setRejectTarget(null)}>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in" onClick={e => e.stopPropagation()}>
            <div className="px-7 pt-7 pb-2 flex items-center gap-4"><div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-red-100 text-red-600"><AlertTriangle size={24}/></div><h3 className="text-base font-black">Rejeter ?</h3></div>
            <div className="px-7 py-5"><textarea rows={3} value={rejectReason} onChange={e => setRejectReason(e.target.value)} className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500" placeholder="Motif..." /></div>
            <div className="flex gap-3 px-7 pb-7"><button onClick={() => setRejectTarget(null)} className="flex-1 py-3 rounded-2xl font-bold bg-slate-100">Annuler</button><button onClick={confirmReject} className="flex-1 py-3 rounded-2xl font-bold text-white bg-red-500">Confirmer</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, path, active = false }) => { const navigate = useNavigate(); return ( <div onClick={() => path && navigate(path)} className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all" style={active ? { background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 } : { color: 'rgba(255,255,255,0.75)' }} onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')} onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}> {icon} <span className="text-sm">{label}</span> </div> ); };
const StatusBadge = ({ status }) => { const styles = { 'Soumis':   { background: 'rgba(59,130,246,0.12)', color: '#2563EB' }, 'Validé': { background: 'rgba(16,185,129,0.12)', color: '#059669' }, 'Publié': { background: 'rgba(6,182,212,0.12)', color: '#0891B2' }, 'Rejeté': { background: 'rgba(239,68,68,0.12)', color: '#DC2626' }, 'Brouillon': { background: 'rgba(100,116,139,0.12)', color: '#475569' } }; return ( <span className="px-3 py-1 rounded-full text-[11px] font-bold" style={styles[status] || {}}>{status}</span> ); };
const InfoRow = ({ icon, label, value }) => ( <div className="flex flex-col gap-1"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">{icon}{label}</p><p className="text-sm font-semibold">{value}</p></div> );

export default ValidateEvents;