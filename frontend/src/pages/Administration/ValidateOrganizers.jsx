import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FileText, Check, X, Search, Bell, LogOut, Settings, Tag,
  LayoutDashboard, CalendarCheck, Users, ExternalLink,
  AlertTriangle, CheckCircle2, Mail, Clock, Filter, Trash2
} from 'lucide-react';

const ADMIN_NOTIFS = [
  { id: 1, icon: <Users size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande organisateur', desc: 'Un nouveau club a demandé le statut organisateur.', time: 'Il y a 2 min', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair 2026" attend votre validation.', time: 'Il y a 30 min', read: false },
];

const STATUS_FILTERS = ['Tous', 'En attente', 'Validé', 'Rejeté'];

const ValidateOrganizers = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('En attente');
  const [viewDoc, setViewDoc] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(ADMIN_NOTIFS);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  // Fetch all organizers from backend
  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/administration/pending-organizers');
        setRequests(res.data);
      } catch (err) {
        console.error('Erreur chargement organisateurs', err);
        showToast('Erreur de chargement des données', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizers();
  }, []);

  useEffect(() => {
    const h = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Approve via API
  const handleApprove = async (req) => {
    try {
      await axios.put(`http://localhost:5000/api/administration/validate/${req._id}`);
      setRequests(prev => prev.map(r => r._id === req._id ? { ...r, status: 'Validé' } : r));
      showToast(`"${req.nomClub}" approuvé avec succès ✅`);
    } catch (err) {
      showToast('Erreur lors de la validation', 'error');
    }
  };

  const openRejectModal = (req) => { setRejectTarget(req); setRejectReason(''); };

  // Reject via API
  const confirmReject = async () => {
    try {
      await axios.put(`http://localhost:5000/api/administration/reject/${rejectTarget._id}`);
      setRequests(prev => prev.map(r => r._id === rejectTarget._id ? { ...r, status: 'Rejeté' } : r));
      showToast(`Demande rejetée.`, 'error');
      setRejectTarget(null);
    } catch (err) {
      showToast('Erreur lors du rejet', 'error');
    }
  };

  // Delete via API
  const handleDelete = async (req) => {
    try {
      await axios.delete(`http://localhost:5000/api/administration/delete-organizer/${req._id}`);
      setRequests(prev => prev.filter(r => r._id !== req._id));
      showToast(`"${req.nomClub}" supprimé avec succès`);
      setConfirmDelete(null);
    } catch (err) {
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const countFor = (f) => f === 'Tous' ? requests.length : requests.filter(r => r.status === f).length;
  const filtered = activeFilter === 'Tous' ? requests : requests.filter(r => r.status === activeFilter);

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold" style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff' }}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 flex flex-col shrink-0" style={{ background: 'linear-gradient(145deg,rgba(205,115,41,0.95),rgba(168,85,20,0.9))' }}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-black uppercase tracking-wider text-white">UIZ University</h1>
          <p className="text-xs text-white/60 mt-1">Administration</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          <NavItem path="/responsable" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          <NavItem path="/responsable/events" icon={<CalendarCheck size={20}/>} label="Event Validation" />
          <NavItem path="/responsable/users" icon={<Users size={20}/>} label="User Management" active />
          <NavItem path="/responsable/notifications" icon={<Bell size={20}/>} label="Notifications" />
          <NavItem path="/responsable/categories" icon={<Tag size={20}/>} label="Categories" />
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0">
          <NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" />
          <NavItem path="/auth/login" icon={<LogOut size={20}/>} label="Logout" />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0" style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/30 border outline-none focus:border-orange-400 transition-colors" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }} placeholder="Rechercher un club..." />
          </div>
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(o => !o)} className="relative p-2 rounded-full cursor-pointer transition-all" style={{ background: notifOpen ? 'rgba(205,115,41,0.2)' : 'rgba(255,255,255,0.06)', color: notifOpen ? '#cd7329' : 'rgba(255,255,255,0.5)' }}>
                <Bell size={18} />
                {unreadCount > 0 && (<span className="absolute top-1 right-1 min-w-[16px] h-[16px] rounded-full text-white text-[9px] flex items-center justify-center" style={{ background: '#cd7329' }}>{unreadCount}</span>)}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[360px] rounded-2xl shadow-2xl border overflow-hidden z-50" style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/10">
                    <h5 className="text-sm font-bold text-white">Notifications</h5>
                    {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] font-bold text-orange-400">Tout marquer</button>}
                  </div>
                  <div className="max-h-[320px] overflow-y-auto divide-y divide-white/5">
                    {notifications.map(n => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3" style={{ background: n.read ? 'transparent' : 'rgba(205,115,41,0.06)' }}>
                        <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: n.iconBg, color: n.iconColor }}>{n.icon}</div>
                        <div className="flex-1"><p className="text-[13px] font-bold text-white">{n.title}</p><p className="text-[11px] text-white/40">{n.desc}</p></div>
                        <button onClick={(e) => { e.stopPropagation(); dismiss(n.id); }} className="text-white/20"><X size={12} /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen(o => !o)} className="flex items-center gap-3 border-l pl-4 hover:opacity-80 transition-all outline-none" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-[10px] text-white/40 uppercase">Super Admin</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>A</div>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl shadow-2xl border overflow-hidden z-50" style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="px-5 py-4 border-b border-white/5"><p className="text-xs font-bold text-white/40 uppercase">Compte</p><p className="text-sm font-bold text-white mt-1">Super Admin</p></div>
                  <div className="p-2">
                    <button onClick={() => { setProfileOpen(false); navigate('/responsable/settings'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:bg-white/5 transition-all"><Settings size={16}/> Paramètres</button>
                    <button onClick={() => { setProfileOpen(false); navigate('/auth/login'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"><LogOut size={16}/> Déconnexion</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-7">
              <div>
                <h2 className="text-2xl font-bold text-white">Organizer Validation</h2>
                <p className="text-sm text-white/40 mt-1">Demandes des clubs et associations</p>
              </div>
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-orange-100 text-orange-600">{countFor('En attente')} en attente</span>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 mb-7">
              <Filter size={14} className="text-white/30" />
              {STATUS_FILTERS.map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${activeFilter === f ? 'bg-orange-500 text-white' : 'bg-white/5 text-white/50'}`}>
                  {f} ({countFor(f)})
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-4">
              {loading ? (
                <div className="py-16 text-center text-white/30 font-bold">Chargement...</div>
              ) : filtered.length === 0 ? (
                <div className="py-16 text-center text-white/30 font-bold">Aucune demande trouvée.</div>
              ) : filtered.map((req) => (
                <div key={req._id} className="rounded-2xl border p-6 bg-white/5 border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-bold text-white">{req.nomClub}</h3>
                        <StatusBadge status={req.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-1.5 text-xs text-white/30 font-bold">
                        <span className="text-orange-400"><Mail size={12} className="inline mr-1"/>{req.email}</span>
                        <span><Clock size={12} className="inline mr-1"/>{req.prenom} {req.nom}</span>
                        <span>📞 {req.telephone}</span>
                      </div>
                    </div>
                  </div>

                  {req.justificatif && (
                    <div className="mt-5 py-4 border-t border-white/10">
                      <p className="text-[10px] font-bold text-white/30 uppercase mb-3">Justificatif :</p>
                      <div className="flex items-center gap-3 p-3 rounded-xl border border-white/10 bg-white/5">
                        <FileText size={20} className="text-orange-400" />
                        <span className="text-sm font-medium text-white/70 truncate flex-1">{req.justificatif}</span>
                        <button onClick={() => setViewDoc(req)} className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-orange-400 text-white">
                          Voir <ExternalLink size={13}/>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-5 flex gap-3">
                    {req.status === 'En attente' && (
                      <>
                        <button onClick={() => handleApprove(req)} className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 text-white shadow-md hover:bg-emerald-600 transition-colors">
                          ✓ Approuver
                        </button>
                        <button onClick={() => openRejectModal(req)} className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-red-500 text-white shadow-md hover:bg-red-600 transition-colors">
                          ✗ Rejeter
                        </button>
                      </>
                    )}
                    {req.status !== 'En attente' && (
                      <button onClick={() => setConfirmDelete(req)} className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-all">
                        <Trash2 size={16} /> Supprimer
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal - View Doc */}
      {viewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setViewDoc(null)}>
          <div className="bg-slate-800 rounded-3xl p-8 border border-white/10 text-center animate-in zoom-in" onClick={e => e.stopPropagation()}>
            <FileText size={50} className="text-orange-400 mx-auto mb-4"/>
            <p className="text-white font-bold">{viewDoc.nomClub}</p>
            <p className="text-white/40 text-sm mt-1">{viewDoc.justificatif}</p>
            <button onClick={() => setViewDoc(null)} className="mt-4 px-6 py-2 bg-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-colors">Fermer</button>
          </div>
        </div>
      )}

      {/* Modal - Reject */}
      {rejectTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setRejectTarget(null)}>
          <div className="bg-white rounded-3xl p-7 w-full max-w-md animate-in zoom-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">Rejeter la demande ?</h3>
            <p className="text-slate-500 text-sm mb-4">Club : <strong>{rejectTarget.nomClub}</strong></p>
            <textarea className="w-full p-4 border rounded-xl mb-4" rows={3} placeholder="Motif du rejet..." value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
            <div className="flex gap-3">
              <button onClick={() => setRejectTarget(null)} className="flex-1 py-3 font-bold bg-slate-100 rounded-xl">Annuler</button>
              <button onClick={confirmReject} className="flex-1 py-3 font-bold bg-red-500 text-white rounded-xl">Confirmer le rejet</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Confirm Delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setConfirmDelete(null)}>
          <div className="bg-white rounded-3xl p-7 w-full max-w-md animate-in zoom-in" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-2">Supprimer cette demande ?</h3>
            <p className="text-slate-500 text-sm mb-4">Club : <strong>{confirmDelete.nomClub}</strong><br/>Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-3 font-bold bg-slate-100 rounded-xl">Annuler</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-3 font-bold bg-red-500 text-white rounded-xl">Confirmer la suppression</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NavItem = ({ icon, label, path, active = false }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(path)} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/20 text-white font-bold' : 'text-white/70 hover:bg-white/10'}`}>
      {icon}<span className="text-sm">{label}</span>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const s = { 'En attente': 'bg-amber-100 text-amber-600', 'Validé': 'bg-emerald-100 text-emerald-600', 'Rejeté': 'bg-red-100 text-red-600' };
  return <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold ${s[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>;
};

export default ValidateOrganizers;
