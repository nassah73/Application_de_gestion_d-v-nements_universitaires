import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Bell, Users, Search, Settings, LogOut, Tag,
  LayoutDashboard, CalendarCheck, SendHorizontal,
  CheckCircle2, XCircle, Clock, CheckCheck, X, AlertCircle
} from 'lucide-react';

const GLASS = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' };

const ADMIN_NOTIFS = [
  { id: 1, icon: <Users size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande organisateur', desc: 'Le Club Informatique a demandé le statut organisateur.', time: 'Il y a 2 min', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair 2026" attend votre validation.', time: 'Il y a 30 min', read: false },
  { id: 3, icon: <AlertCircle size={16} />, iconBg: 'rgba(245,158,11,0.18)', iconColor: '#F59E0B', title: 'Capacité critique', desc: 'Hackathon 2025 — seulement 2 places restantes.', time: 'Il y a 1h', read: false },
  { id: 4, icon: <CheckCircle2 size={16} />, iconBg: 'rgba(16,185,129,0.18)', iconColor: '#10B981', title: 'Événement validé', desc: '"Cultural Night 2026" est maintenant en ligne.', time: 'Hier', read: true },
];

const GlobalNotifications = () => {
  const navigate = useNavigate();
  const [notifType, setNotifType]   = useState('Email');
  const [recipient, setRecipient]   = useState('All Students');
  const [title, setTitle]           = useState('');
  const [message, setMessage]       = useState('');
  
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

  const handleSend = () => { if(!title.trim() || !message.trim()) { showToast("Veuillez remplir tous les champs.", "error"); return; } showToast("Notification envoyée avec succès !"); setTitle(''); setMessage(''); };
  const handleSaveDraft = () => { showToast("Brouillon enregistré."); };

  const recentNotifications = [
    { id: 1, title: 'Science Fair 2026 Registration Open', to: 'All Students',       sentAt: '2026-04-20 14:30', type: 'email'  },
    { id: 2, title: 'Basketball Tournament Cancelled',     to: '87 Event Participants', sentAt: '2026-04-19 09:15', type: 'app'    },
    { id: 3, title: 'New Event Validation Guidelines',     to: 'Event Organizers',    sentAt: '2026-04-18 16:00', type: 'system' },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      {toast && (<div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold animate-in fade-in" style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff' }}>{toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}{toast.msg}</div>)}
      <aside className="w-64 flex flex-col shrink-0" style={{ background: 'linear-gradient(145deg,rgba(205,115,41,0.95),rgba(168,85,20,0.9))' }}>
        <div className="p-6 border-b border-white/10"><h1 className="text-xl font-black uppercase tracking-wider text-white">UIZ University</h1><p className="text-xs text-white/60 mt-1">Administration</p></div>
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto"><NavItem path="/responsable" icon={<LayoutDashboard size={20}/>} label="Dashboard" /><NavItem path="/responsable/events" icon={<CalendarCheck size={20}/>} label="Event Validation" /><NavItem path="/responsable/users" icon={<Users size={20}/>} label="User Management" /><NavItem path="/responsable/notifications" icon={<Bell size={20}/>} label="Notifications" active /><NavItem path="/responsable/categories" icon={<Tag size={20}/>} label="Categories" /></nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0"><NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" /><NavItem path="/auth/login" icon={<LogOut size={20}/>} label="Logout" /></div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0" style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" /><input className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white border-none outline-none focus:ring-1 focus:ring-orange-500 transition-all font-medium" style={{ background: 'rgba(255,255,255,0.06)' }} placeholder="Search notifications..." /></div>
          <div className="flex items-center gap-4">
            <div className="relative" ref={notifRef}><button onClick={() => setNotifOpen(o => !o)} className="relative p-2 rounded-full transition-all" style={{ background: notifOpen ? 'rgba(205,115,41,0.2)' : 'rgba(255,255,255,0.06)', color: notifOpen ? '#cd7329' : 'rgba(255,255,255,0.5)' }}><Bell size={18} />{unreadCount > 0 && (<span className="absolute top-1 right-1 min-w-[16px] h-[16px] rounded-full text-white text-[9px] flex items-center justify-center font-bold" style={{ background: '#cd7329' }}>{unreadCount}</span>)}</button>{notifOpen && (<div className="absolute right-0 top-[calc(100%+10px)] w-[360px] rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in" style={{ background: '#1e293b' }}><div className="px-5 py-3 border-b border-white/5 font-bold text-white flex justify-between items-center text-sm">Notifications {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] text-orange-400">Tout marquer</button>}</div><div className="max-h-[320px] overflow-y-auto divide-y divide-white/5">{notifications.length === 0 ? <p className="py-10 text-center text-white/20 text-sm font-bold">Aucune notification</p> : notifications.map(n => <div key={n.id} className="p-4 flex gap-3" style={{ background: n.read ? 'transparent' : 'rgba(205,115,41,0.06)' }}><div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-bold" style={{ background: n.iconBg, color: n.iconColor }}>{n.icon}</div><div className="flex-1 min-w-0"><p className="font-bold text-white text-[13px]">{n.title}</p><p className="text-[11px] text-white/40">{n.desc}</p></div></div>)}</div></div>)}</div>
            <div className="relative" ref={profileRef}><button onClick={() => setProfileOpen(o => !o)} className="flex items-center gap-3 border-l pl-4 hover:opacity-80 transition-all outline-none" style={{ borderColor: 'rgba(255,255,255,0.1)' }}><div className="text-right hidden sm:block"><p className="text-sm font-semibold text-white">Admin User</p><p className="text-[10px] text-white/40 uppercase font-black">Super Admin</p></div><div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm shadow-xl" style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)', transform: profileOpen ? 'scale(1.1)' : 'scale(1)' }}>A</div></button>{profileOpen && (<div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in" style={{ background: '#1e293b' }}><div className="px-5 py-4 border-b border-white/5"><p className="text-xs font-bold text-white/40 uppercase">Compte</p><p className="text-sm font-bold text-white mt-1">Super Admin</p></div><div className="p-2"><button onClick={() => { setProfileOpen(false); navigate('/responsable/settings'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:bg-white/5 transition-all"><Settings size={16}/> Paramètres</button><button onClick={() => { setProfileOpen(false); navigate('/auth/login'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"><LogOut size={16}/> Déconnexion</button></div></div>)}</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6" style={{ background: '#0f172a' }}>
          <section className="max-w-4xl mx-auto rounded-3xl border p-8 bg-white/5 border-white/10 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-8">Send Global Notification</h2>
            <div className="space-y-8">
              <div><label className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-4">Type</label><div className="grid grid-cols-2 gap-4"><SelectCard icon={<Mail size={24}/>} label="Email" selected={notifType === 'Email'} onClick={() => setNotifType('Email')} /><SelectCard icon={<Bell size={24}/>} label="App" selected={notifType === 'In-App'} onClick={() => setNotifType('In-App')} /></div></div>
              <div><label className="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-4">Recipients</label><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><RecipientOption label="Tous les étudiants" subText="3 842" selected={recipient === 'All Students'} onClick={() => setRecipient('All Students')} /><RecipientOption label="Participants" subText="1 256" selected={recipient === 'Event Participants'} onClick={() => setRecipient('Event Participants')} /></div></div>
              <div className="space-y-4 shadow-sm"><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 text-white border border-white/10 outline-none focus:border-orange-500 transition-all" placeholder="Sujet..." /><textarea rows="4" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 text-white border border-white/10 outline-none resize-none focus:border-orange-500 transition-all font-medium" placeholder="Message..." /></div>
              <div className="flex gap-4"><button onClick={handleSend} className="flex-1 py-3 rounded-xl font-bold text-white text-sm shadow-lg transform active:scale-95 transition-all" style={{ background: '#cd7329' }}>Envoyer</button><button onClick={handleSaveDraft} className="px-8 py-3 rounded-xl font-bold text-white/40 border border-white/10 hover:bg-white/5 transition-all outline-none">Brouillon</button></div>
            </div>
          </section>
          <section className="max-w-4xl mx-auto rounded-3xl border p-8 bg-white/5 border-white/10"><h3 className="font-bold text-white mb-6">Recent Activities</h3><div className="space-y-3">{recentNotifications.map(n => <div key={n.id} className="p-4 rounded-xl border border-white/5 flex justify-between items-center"><div className="flex items-center gap-4"><div className="p-2 rounded-lg bg-orange-400/10 text-orange-400 font-bold"><Mail size={16}/></div><div><p className="text-sm font-bold text-white">{n.title}</p><p className="text-[11px] text-white/30">Envoyé à : {n.to}</p></div></div><span className="text-[10px] font-black px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500">SENT</span></div>)}</div></section>
        </div>
      </div>
    </div>
  );
};

/* ── Components ── */
const NavItem = ({ icon, label, path, active = false }) => { const navigate = useNavigate(); return ( <div onClick={() => navigate(path)} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/20 text-white font-bold' : 'text-white/70 hover:bg-white/10'}`}>{icon} <span className="text-sm">{label}</span> </div> ); };
const SelectCard = ({ icon, label, selected, onClick }) => ( <div onClick={onClick} className={`p-5 rounded-2xl flex flex-col items-center gap-3 cursor-pointer transition-all border ${selected ? 'border-orange-500 bg-orange-400/10 text-orange-400' : 'border-white/10 bg-white/5 text-white/30'}`}>{icon} <span className="text-xs font-bold uppercase">{label}</span> </div> );
const RecipientOption = ({ label, subText, selected, onClick }) => ( <div onClick={onClick} className={`p-4 rounded-2xl cursor-pointer transition-all border ${selected ? 'border-orange-500 bg-orange-400/10' : 'border-white/10 bg-white/5'}`}><p className={`text-sm font-bold ${selected ? 'text-orange-400' : 'text-white/80'}`}>{label}</p><p className="text-[10px] text-white/30 mt-0.5">{subText} destinataires</p></div> );

export default GlobalNotifications;