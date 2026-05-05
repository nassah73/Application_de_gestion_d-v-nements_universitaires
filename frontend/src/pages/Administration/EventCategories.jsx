import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Plus, Edit2, Trash2, Tag, Search, Bell, Settings, LogOut,
  LayoutDashboard, CalendarCheck, Users, Save, X,
  CheckCircle2, AlertTriangle, CheckCheck
} from 'lucide-react';
import Sidebare from './components/Sidebare';

const GLASS       = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' };

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

const EventCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sociale',    count: 42, color: '#cd7329' },
    { id: 2, name: 'Académique', count: 52, color: '#6366F1' },
    { id: 3, name: 'Sports',     count: 28, color: '#10B981' },
    { id: 4, name: 'Culturel',   count: 35, color: '#F59E0B' },
  ]);

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
    const h = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  /* Category Handlers */
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState('#cd7329');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const handleAdd = () => { if (!newName.trim()) return; setCategories(prev => [...prev, { id: Date.now(), name: newName.trim(), count: 0, color: newColor }]); showToast(`Catégorie ajoutée.`); setNewName(''); setIsAdding(false); };
  const startEdit = (cat) => { setEditId(cat.id); setEditName(cat.name); setEditColor(cat.color); };
  const saveEdit = () => { if (!editName.trim()) return; setCategories(prev => prev.map(c => c.id === editId ? { ...c, name: editName.trim(), color: editColor } : c)); showToast(`Mise à jour.`); setEditId(null); };
  const confirmDelete = () => { setCategories(prev => prev.filter(c => c.id !== deleteTarget.id)); showToast(`Supprimée.`, 'error'); setDeleteTarget(null); };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      {toast && (<div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold animate-in fade-in" style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff' }}>{toast.type === 'success' ? <CheckCircle2 size={18}/>:<Trash2 size={16}/>}{toast.msg}</div>)}
      <Sidebare />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0" style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"/><input className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white border-none outline-none focus:ring-1 focus:ring-orange-500 transition-all" style={{ background: 'rgba(255,255,255,0.06)' }} placeholder="Search categories..." /></div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}><button onClick={() => setNotifOpen(o => !o)} className="relative p-2 rounded-full cursor-pointer transition-all" style={{ background: notifOpen ? 'rgba(205,115,41,0.2)' : 'rgba(255,255,255,0.06)', color: notifOpen ? '#cd7329' : 'rgba(255,255,255,0.5)' }}><Bell size={18} />{unreadCount > 0 && (<span className="absolute top-1 right-1 min-w-[16px] h-[16px] rounded-full text-white text-[9px] flex items-center justify-center font-bold" style={{ background: '#cd7329' }}>{unreadCount}</span>)}</button>{notifOpen && (<div className="absolute right-0 top-[calc(100%+10px)] w-[360px] rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in" style={{ background: '#1e293b' }}><div className="px-5 py-3 border-b border-white/5 font-bold text-white flex justify-between items-center text-sm">Notifications {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] text-orange-400">Tout marquer</button>}</div><div className="max-h-[320px] overflow-y-auto divide-y divide-white/5">{notifications.length === 0 ? <p className="py-10 text-center text-white/20 text-sm">Aucune notification</p> : notifications.map(n => <div key={n.id} className="p-4" style={{ background: n.read ? 'transparent' : 'rgba(205,115,41,0.06)' }}><p className="font-bold text-white text-[13px]">{n.title}</p><p className="text-[11px] text-white/40">{n.desc}</p></div>)}</div></div>)}</div>
            <div className="relative" ref={profileRef}><button onClick={() => setProfileOpen(o => !o)} className="flex items-center gap-3 border-l pl-4 hover:opacity-80 transition-all outline-none" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><div className="text-right hidden sm:block"><p className="text-sm font-semibold text-white">Admin User</p><p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Admin</p></div><div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shadow-xl" style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)', transform: profileOpen ? 'scale(1.1)' : 'scale(1)' }}>A</div></button>{profileOpen && (<div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in" style={{ background: '#1e293b' }}><div className="px-5 py-4 border-b border-white/5"><p className="text-xs font-bold text-white/40 uppercase">Compte</p><p className="text-sm font-bold text-white mt-1">Super Admin</p></div><div className="p-2"><button onClick={() => { setProfileOpen(false); navigate('/responsable/settings'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:bg-white/5 transition-all focus:outline-none"><Settings size={16}/> Paramètres</button><button onClick={() => { setProfileOpen(false); navigate('/auth/login'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all focus:outline-none"><LogOut size={16}/> Déconnexion</button></div></div>)}</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8" style={{ background: '#0f172a' }}>
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center"><div><h2 className="text-2xl font-bold text-white">Event Categories</h2><p className="text-sm text-white/40 mt-1">Classification des événements</p></div><button onClick={() => { setIsAdding(true); setEditId(null); }} className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 shadow-lg" style={{ background: '#cd7329' }}><Plus size={18}/> Add Category</button></div>
            {isAdding && (<div className="rounded-2xl border p-6 bg-white/5 border-white/10 animate-in zoom-in"><div className="flex justify-between items-center mb-5"><h3 className="font-bold text-white">New Category</h3><button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-red-400"><X size={20}/></button></div><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input className="px-4 py-2.5 rounded-lg text-sm bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500" placeholder="Nom..." value={newName} onChange={e => setNewName(e.target.value)} /><div className="flex gap-2 flex-wrap">{PRESET_COLORS.map(c => <button key={c} onClick={() => setNewColor(c)} className={`w-6 h-6 rounded-full border-2 ${newColor === c ? 'border-white' : 'border-transparent'}`} style={{ background: c }} />)}</div></div><div className="mt-4 flex justify-end gap-3"><button onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-lg font-bold text-white/40">Cancel</button><button onClick={handleAdd} className="px-6 py-2 rounded-lg font-bold text-white bg-orange-500">Save</button></div></div>)}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat) => (
                <div key={cat.id} className="rounded-2xl border p-6 bg-white/5 border-white/10 group transition-all">
                  {editId === cat.id ? (<div className="space-y-4"><input className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500" value={editName} onChange={e => setEditName(e.target.value)} autoFocus /><div className="flex gap-2 flex-wrap">{PRESET_COLORS.map(c => <button key={c} onClick={() => setEditColor(c)} className={`w-6 h-6 rounded-full border-2 ${editColor === c ? 'border-white' : 'border-transparent'}`} style={{ background: c }} />)}</div><div className="flex gap-2"><button onClick={saveEdit} className="flex-1 py-2 font-bold bg-emerald-500 text-white rounded-lg">Save</button><button onClick={() => setEditId(null)} className="flex-1 py-2 font-bold bg-white/5 text-white/40 rounded-lg">Cancel</button></div></div>) : (
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xl font-bold" style={{ background: cat.color }}><Tag size={22}/></div><div><h4 className="font-bold text-white">{cat.name}</h4><p className="text-xs text-white/35 mt-0.5">{cat.count} événements</p></div></div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => startEdit(cat)} className="p-2 text-white/40 hover:text-white"><Edit2 size={15}/></button><button onClick={() => setDeleteTarget(cat)} className="p-2 text-white/40 hover:text-red-400"><Trash2 size={15} /></button></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {deleteTarget && (<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 overflow-hidden" onClick={() => setDeleteTarget(null)}><div className="bg-white rounded-3xl p-7 w-full max-w-sm animate-in zoom-in" onClick={e => e.stopPropagation()}><h3 className="text-lg font-bold mb-4 flex items-center gap-2"><AlertTriangle className="text-red-500" size={24}/> Supprimer ?</h3><p className="text-slate-500 text-sm mb-6">Confirmer la suppression de «{deleteTarget.name}» ?</p><div className="flex gap-3"><button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 font-bold bg-slate-100">Annuler</button><button onClick={confirmDelete} className="flex-1 py-3 font-bold bg-red-500 text-white">Supprimer</button></div></div></div>)}
    </div>
  );
};

const NavItem = ({ icon, label, path, active = false }) => { const navigate = useNavigate(); return ( <div onClick={() => navigate(path)} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/20 text-white font-bold' : 'text-white/70 hover:bg-white/10'}`}>{icon} <span className="text-sm">{label}</span> </div> ); };

export default EventCategories;