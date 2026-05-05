import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Edit2, Trash2, Search, Bell, Settings, LogOut,
  CalendarCheck, Users, Save, X,
  CheckCircle2, AlertTriangle
} from 'lucide-react';
import Sidebare from './components/Sidebare';

const PRESET_COLORS = [
  '#cd7329', '#6366F1', '#10B981', '#F59E0B',
  '#EC4899', '#06B6D4', '#8B5CF6', '#ef4444',
];

const ADMIN_NOTIFS = [
  { id: 1, icon: <Users size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande organisateur', desc: 'Le Club Informatique a demandé le statut organisateur.', time: 'Il y a 2 min', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair 2026" attend votre validation.', time: 'Il y a 30 min', read: false },
  { id: 3, icon: <AlertTriangle size={16} />, iconBg: 'rgba(245,158,11,0.18)', iconColor: '#F59E0B', title: 'Capacité critique', desc: 'Hackathon 2025 — seulement 2 places restantes.', time: 'Il y a 1h', read: false },
  { id: 4, icon: <CheckCircle2 size={16} />, iconBg: 'rgba(16,185,129,0.18)', iconColor: '#10B981', title: 'Événement validé', desc: '"Cultural Night 2026" est maintenant en ligne.', time: 'Hier', read: true },
];

// ── Category Card ──
const CategoryCard = ({ cat, onEdit, onDelete }) => {
  const total = 300;
  const pct = Math.round((cat.count / total) * 100);

  return (
    <div
      className="rounded-2xl p-7 group transition-all"
      style={{ background: '#1e2535', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Top row: badge + actions */}
      <div className="flex justify-between items-center mb-6">
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            background: `${cat.color}22`,
            color: cat.color,
            border: `1px solid ${cat.color}55`,
          }}
        >
          {cat.name}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(cat)} style={{ color: '#6366F1' }} className="hover:opacity-70 transition-opacity">
            <Edit2 size={15} />
          </button>
          <button onClick={() => onDelete(cat)} style={{ color: '#ef4444' }} className="hover:opacity-70 transition-opacity">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Count */}
      <div className="flex items-center gap-3 mb-2">
        <CalendarCheck size={22} style={{ color: cat.color }} />
        <span className="text-4xl font-black text-white">{cat.count}</span>
      </div>
      <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>Événements enregistrés</p>

      {/* Progress bar */}
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '4px' }}>
        <div style={{ width: `${pct}%`, background: cat.color, borderRadius: '4px', height: '4px', transition: 'width 0.4s ease' }} />
      </div>
      <p className="text-right mt-1.5" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{pct}%</p>
    </div>
  );
};

const EventCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { id: 1, name: 'Académique',  count: 234, color: '#6366F1' },
    { id: 2, name: 'Sports',      count: 156, color: '#10B981' },
    { id: 3, name: 'Culturel',    count: 189, color: '#8B5CF6' },
    { id: 4, name: 'Technologie', count: 98,  color: '#cd7329' },
    { id: 5, name: 'Ateliers',    count: 145, color: '#EC4899' },
    { id: 6, name: 'Social',      count: 267, color: '#6366F1' },
  ]);

  const [notifOpen,    setNotifOpen]    = useState(false);
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [notifications, setNotifications] = useState(ADMIN_NOTIFS);
  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  useEffect(() => {
    const h = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const [isAdding,     setIsAdding]     = useState(false);
  const [newName,      setNewName]      = useState('');
  const [newColor,     setNewColor]     = useState('#cd7329');
  const [editId,       setEditId]       = useState(null);
  const [editName,     setEditName]     = useState('');
  const [editColor,    setEditColor]    = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast,        setToast]        = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = () => {
    if (!newName.trim()) return;
    setCategories(prev => [...prev, { id: Date.now(), name: newName.trim(), count: 0, color: newColor }]);
    showToast('Catégorie ajoutée.');
    setNewName('');
    setIsAdding(false);
  };

  const startEdit = (cat) => { setEditId(cat.id); setEditName(cat.name); setEditColor(cat.color); };
  const saveEdit  = () => {
    if (!editName.trim()) return;
    setCategories(prev => prev.map(c => c.id === editId ? { ...c, name: editName.trim(), color: editColor } : c));
    showToast('Mise à jour.');
    setEditId(null);
  };
  const confirmDelete = () => {
    setCategories(prev => prev.filter(c => c.id !== deleteTarget.id));
    showToast('Supprimée.', 'error');
    setDeleteTarget(null);
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold"
          style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff' }}>
          {toast.type === 'success' ? <CheckCircle2 size={18}/> : <Trash2 size={16}/>}
          {toast.msg}
        </div>
      )}

      <Sidebare />

      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0"
          style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"/>
            <input className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.06)' }} placeholder="Search categories..." />
          </div>
          <div className="flex items-center gap-4">

            {/* Bell */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(o => !o)} className="relative p-2 rounded-full cursor-pointer transition-all"
                style={{ background: notifOpen ? 'rgba(205,115,41,0.2)' : 'rgba(255,255,255,0.06)', color: notifOpen ? '#cd7329' : 'rgba(255,255,255,0.5)' }}>
                <Bell size={18}/>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-[16px] rounded-full text-white text-[9px] flex items-center justify-center font-bold"
                    style={{ background: '#cd7329' }}>{unreadCount}</span>
                )}
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[360px] rounded-2xl shadow-2xl border overflow-hidden z-50"
                  style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <h5 className="text-sm font-black text-white">Notifications</h5>
                    {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] font-bold" style={{ color: '#cd7329' }}>Tout marquer</button>}
                  </div>
                  <div className="max-h-[320px] overflow-y-auto divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    {notifications.map(n => (
                      <div key={n.id} className="flex items-start gap-3 px-4 py-3"
                        style={{ background: n.read ? 'transparent' : 'rgba(205,115,41,0.06)' }}>
                        <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{ background: n.iconBg, color: n.iconColor }}>{n.icon}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-white">{n.title}</p>
                          <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{n.desc}</p>
                          <p className="text-[10px] mt-1 font-bold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.25)' }}>{n.time}</p>
                        </div>
                        <button onClick={() => dismiss(n.id)} style={{ color: 'rgba(255,255,255,0.25)' }}><X size={12}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen(o => !o)}
                className="flex items-center gap-3 border-l pl-4 hover:opacity-80 transition-all outline-none"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Responsable</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
                  style={{ background: '#e07a20', transform: profileOpen ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.2s' }}>A</div>
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl shadow-2xl border overflow-hidden z-50"
                  style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <p className="text-xs font-bold text-white/40 uppercase">Compte Admin</p>
                    <p className="text-sm font-bold text-white mt-1">Super Administrateur</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => { setProfileOpen(false); navigate('/responsable/settings'); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:bg-white/5 transition-all">
                      <Settings size={16}/> Paramètres
                    </button>
                    <button onClick={() => { setProfileOpen(false); navigate('/auth/login'); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all">
                      <LogOut size={16}/> Déconnexion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10" style={{ background: '#0f172a' }}>
          <div className="max-w-6xl mx-auto space-y-8">

            {/* Page header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white">Gestion des Catégories</h2>
                <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Organiser et gérer les catégories d'événements</p>
              </div>
              <button onClick={() => { setIsAdding(true); setEditId(null); }}
                className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                style={{ background: '#cd7329' }}>
                <Plus size={18}/> Nouvelle Catégorie
              </button>
            </div>

            {/* Add form */}
            {isAdding && (
              <div className="rounded-2xl border p-6"
                style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-white">Nouvelle Catégorie</h3>
                  <button onClick={() => setIsAdding(false)} style={{ color: 'rgba(255,255,255,0.4)' }}><X size={20}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="px-4 py-2.5 rounded-lg text-sm text-white border outline-none focus:border-orange-500"
                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                    placeholder="Nom de la catégorie..." value={newName} onChange={e => setNewName(e.target.value)} />
                  <div className="flex gap-2 flex-wrap items-center">
                    {PRESET_COLORS.map(c => (
                      <button key={c} onClick={() => setNewColor(c)}
                        className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                        style={{ background: c, borderColor: newColor === c ? '#fff' : 'transparent' }} />
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <button onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-lg font-bold"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>Annuler</button>
                  <button onClick={handleAdd} className="px-6 py-2 rounded-lg font-bold text-white"
                    style={{ background: '#cd7329' }}>Enregistrer</button>
                </div>
              </div>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(cat => (
                editId === cat.id ? (
                  <div key={cat.id} className="rounded-2xl border p-7 space-y-4"
                    style={{ background: '#1e2535', borderColor: 'rgba(255,255,255,0.07)' }}>
                    <input className="w-full px-3 py-2 rounded-lg text-sm text-white border outline-none focus:border-orange-500"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                      value={editName} onChange={e => setEditName(e.target.value)} autoFocus />
                    <div className="flex gap-2 flex-wrap">
                      {PRESET_COLORS.map(c => (
                        <button key={c} onClick={() => setEditColor(c)}
                          className="w-6 h-6 rounded-full border-2"
                          style={{ background: c, borderColor: editColor === c ? '#fff' : 'transparent' }} />
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="flex-1 py-2 font-bold text-white rounded-lg flex items-center justify-center gap-1"
                        style={{ background: '#10B981' }}>
                        <Save size={14}/> Sauvegarder
                      </button>
                      <button onClick={() => setEditId(null)} className="flex-1 py-2 font-bold rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>Annuler</button>
                    </div>
                  </div>
                ) : (
                  <CategoryCard key={cat.id} cat={cat} onEdit={startEdit} onDelete={setDeleteTarget} />
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setDeleteTarget(null)}>
          <div className="bg-white rounded-3xl p-7 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
              <AlertTriangle className="text-red-500" size={24}/> Supprimer ?
            </h3>
            <p className="text-slate-500 text-sm mb-6">Confirmer la suppression de «{deleteTarget.name}» ?</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 font-bold rounded-xl bg-slate-100 text-slate-600">Annuler</button>
              <button onClick={confirmDelete}
                className="flex-1 py-3 font-bold rounded-xl bg-red-500 text-white">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCategories;