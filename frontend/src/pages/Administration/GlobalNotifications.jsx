import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebare from './components/Sidebare';
import Tobar from './components/Tobar';
import {
  Mail, Bell, Users, Tag,
  LayoutDashboard, CalendarCheck, SendHorizontal,
  CheckCircle2, XCircle, Clock
} from 'lucide-react';

const GLASS = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' };

const GlobalNotifications = () => {
  const navigate = useNavigate();
  const [notifType, setNotifType]   = useState('Email');
  const [recipient, setRecipient]   = useState('All Students');
  const [title, setTitle]           = useState('');
  const [message, setMessage]       = useState('');

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
      <Sidebare />

      <div className="flex-1 flex flex-col min-w-0">
        <Tobar />

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