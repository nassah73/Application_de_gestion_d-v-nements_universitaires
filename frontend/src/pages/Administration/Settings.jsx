import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings, User, Lock, Bell, Globe, Save,
  LayoutDashboard, CalendarCheck, Users, LogOut, Tag, ShieldCheck,
  CheckCircle2, X, AlertTriangle, CheckCheck
} from 'lucide-react';

const GLASS       = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(15,23,42,0.5)',    borderColor: 'rgba(255,255,255,0.12)' };

const ADMIN_NOTIFS = [
  { id: 1, icon: <Users size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande organisateur', desc: 'Le Club Informatique a demandé le statut organisateur.', time: 'Il y a 2 min', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair 2026" attend votre validation.', time: 'Il y a 30 min', read: false },
  { id: 3, icon: <AlertTriangle size={16} />, iconBg: 'rgba(245,158,11,0.18)', iconColor: '#F59E0B', title: 'Capacité critique', desc: 'Hackathon 2025 — seulement 2 places restantes.', time: 'Il y a 1h', read: false },
  { id: 4, icon: <CheckCircle2 size={16} />, iconBg: 'rgba(16,185,129,0.18)', iconColor: '#10B981', title: 'Événement validé', desc: '"Cultural Night 2026" est maintenant en ligne.', time: 'Hier', read: true },
];

const AdminSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

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

  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
  const handleSave = (e) => { if (e) e.preventDefault(); showToast("Paramètres enregistrés."); };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      {toast && (<div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold animate-in fade-in" style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff' }}>{toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}{toast.msg}</div>)}
      <aside className="w-64 flex flex-col shrink-0" style={{ background: 'linear-gradient(145deg,rgba(205,115,41,0.95),rgba(168,85,20,0.9))' }}>
        <div className="p-6 border-b border-white/10"><h1 className="text-xl font-black uppercase tracking-wider text-white">UIZ University</h1><p className="text-xs text-white/60 mt-1">Administration</p></div>
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto"><NavItem path="/responsable" icon={<LayoutDashboard size={20}/>} label="Dashboard" /><NavItem path="/responsable/events" icon={<CalendarCheck size={20}/>} label="Event Validation" /><NavItem path="/responsable/users" icon={<Users size={20}/>} label="User Management" /><NavItem path="/responsable/notifications" icon={<Bell size={20}/>} label="Notifications" /><NavItem path="/responsable/categories" icon={<Tag size={20}/>} label="Categories" /></nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0"><NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" active /><NavItem path="/auth/login" icon={<LogOut size={20}/>} label="Logout" /></div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0" style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <h2 className="font-bold text-white flex items-center gap-2"><Settings size={18} className="text-orange-400"/> Paramètres</h2>
          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}><button onClick={() => setNotifOpen(o => !o)} className="relative p-2 rounded-full transition-all" style={{ background: notifOpen ? 'rgba(205,115,41,0.2)' : 'rgba(255,255,255,0.06)', color: notifOpen ? '#cd7329' : 'rgba(255,255,255,0.5)' }}><Bell size={18} />{unreadCount > 0 && (<span className="absolute top-1 right-1 min-w-[16px] h-[16px] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-md" style={{ background: '#cd7329' }}>{unreadCount}</span>)}</button>{notifOpen && (<div className="absolute right-0 top-[calc(100%+10px)] w-[360px] rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in" style={{ background: '#1e293b' }}><div className="px-5 py-3 border-b border-white/5 font-bold text-white flex justify-between items-center text-sm">Notifications {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] text-orange-400">Tout marquer</button>}</div><div className="max-h-[320px] overflow-y-auto">{notifications.length === 0 ? <p className="py-10 text-center text-white/20">Rien à signaler.</p> : notifications.map(n => <div key={n.id} className="p-4" style={{ background: n.read ? 'transparent' : 'rgba(205,115,41,0.06)' }}><p className="font-bold text-white text-[13px]">{n.title}</p><p className="text-[11px] text-white/40">{n.desc}</p></div>)}</div></div>)}</div>
            <div className="relative" ref={profileRef}><button onClick={() => setProfileOpen(o => !o)} className="flex items-center gap-3 border-l pl-4 outline-none transition-all hover:opacity-80" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><div className="text-right hidden sm:block"><p className="text-sm font-semibold text-white uppercase tracking-widest font-bold">Admin</p><p className="text-[10px] text-white/40 uppercase">Super Admin</p></div><div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm" style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)', transform: profileOpen ? 'scale(1.1)' : 'scale(1)' }}>A</div></button>{profileOpen && (<div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in" style={{ background: '#1e293b' }}><div className="px-5 py-4 border-b border-white/5 font-bold tracking-widest text-[10px] text-white/40 uppercase">Compte UIZ</div><div className="p-2"><button onClick={() => setProfileOpen(false)} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:bg-white/5 transition-all"><User size={16}/> Mon profil</button><button onClick={() => { setProfileOpen(false); navigate('/auth/login'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all font-bold"><LogOut size={16}/> Déconnexion</button></div></div>)}</div>
          </div>
        </header>

        <div className="p-8 overflow-y-auto flex-1" style={{ background: '#0f172a' }}>
          <div className="max-w-4xl mx-auto"><div className="flex flex-col md:flex-row gap-8"><div className="w-full md:w-56 space-y-1 shrink-0">{[{ key: 'profile', icon: <User size={18}/>, label: 'Mon Profil' }, { key: 'security', icon: <Lock size={18}/>, label: 'Sécurité' }, { key: 'system', icon: <Globe size={18}/>, label: 'Préférences' }].map(({ key, icon, label }) => (<button key={key} onClick={() => setActiveSection(key)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left border ${activeSection === key ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-white/5 border-white/5 text-white/40'}`}>{icon} {label}</button>))}</div>
            <div className="flex-1 space-y-6">{activeSection === 'profile' && (<div className="rounded-3xl border p-8 bg-white/5 border-white/10 shadow-xl animate-in fade-in"><h3 className="text-xl font-bold text-white mb-8">Informations</h3><form onSubmit={handleSave} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Nom"><input type="text" className="field-input" style={GLASS_INPUT} defaultValue="Admin UIZ" required/></Field><Field label="Email"><input type="email" className="field-input" style={GLASS_INPUT} defaultValue="admin@uiz.ma" required/></Field></div><Field label="Service"><input type="text" className="field-input" style={GLASS_INPUT} defaultValue="Scolarité"/></Field><SaveBtn label="Sauvegarder" /></form></div>)}
              {activeSection === 'security' && (<div className="rounded-3xl border p-8 bg-white/5 border-white/10 animate-in fade-in"><h3 className="text-xl font-bold text-white mb-8">Sécurité</h3><form onSubmit={handleSave} className="space-y-6"><Field label="Mdp actuel"><input type="password" className="field-input" style={GLASS_INPUT} placeholder="••••" required/></Field><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Nouveau"><input type="password" className="field-input" style={GLASS_INPUT}/></Field><Field label="Confirmation"><input type="password" className="field-input" style={GLASS_INPUT}/></Field></div><button type="submit" className="px-8 py-3 rounded-xl font-bold text-white bg-red-500 shadow-lg active:scale-95 transition-all outline-none">Mettre à jour</button></form></div>)}
              {activeSection === 'system' && (<div className="rounded-3xl border p-8 bg-white/5 border-white/10 animate-in fade-in"><h3 className="text-xl font-bold text-white mb-8">Préférences</h3><div className="space-y-6"><ToggleRow title="Emails" desc="Demandes reçues par email" defaultChecked /><ToggleRow title="Mode Sombre" desc="Interface dark" defaultChecked /><ToggleRow title="Validation auto" desc="Non recommandé" warning /></div></div>)}</div></div></div>
        </div>
      </main>
      <style>{`.field-input { width: 100%; padding: 12px 16px; border-radius: 12px; font-size: 0.9rem; color: #fff; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); outline: none; transition: border-color 0.2s shadow-sm; } .field-input:focus { border-color: #cd7329; }`}</style>
    </div>
  );
};

const Field = ({ label, children }) => (<div><label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 ml-1">{label}</label>{children}</div>);
const SaveBtn = ({ label }) => (<button type="submit" className="flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-xl active:scale-95 transition-all outline-none" style={{ background: '#cd7329' }}><Save size={18}/> {label}</button>);
const NavItem = ({ icon, label, path, active }) => { const navigate = useNavigate(); return ( <div onClick={() => navigate(path)} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/20 text-white font-bold' : 'text-white/70 hover:bg-white/10'}`}> {icon} <span className="text-sm">{label}</span> </div> ); };
const ToggleRow = ({ title, desc, defaultChecked, warning }) => ( <div className="flex items-center justify-between gap-4"> <div> <h4 className="font-bold text-sm text-white">{title}</h4> <p className={`text-xs ${warning ? 'text-amber-500 font-bold' : 'text-white/30'}`}>{desc}</p> </div> <input type="checkbox" defaultChecked={defaultChecked} className="w-11 h-6 rounded-full cursor-pointer accent-orange-500"/> </div> );

export default AdminSettings;