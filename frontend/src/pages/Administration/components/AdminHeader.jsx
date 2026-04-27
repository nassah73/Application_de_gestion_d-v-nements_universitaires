import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, Settings, LogOut, CheckCheck, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader({ notifications, setNotifications }) {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
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

  return (
    <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0"
      style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
      
      <div className="relative w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
        <input className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/30 border outline-none focus:border-orange-400 transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }} placeholder="Search events..." />
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-full text-white/50 bg-white/5 hover:bg-white/10 transition-all">
            <Bell size={18} />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] w-[360px] bg-slate-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/5">
                <h5 className="text-sm font-bold text-white">Notifications</h5>
                <button onClick={markAllRead} className="text-[10px] text-orange-500 font-bold flex items-center gap-1"><CheckCheck size={13} /> Tout marquer</button>
              </div>
              <div className="max-h-[320px] overflow-y-auto divide-y divide-white/5">
                {notifications.map(n => (
                  <div key={n.id} className={`flex items-start gap-3 px-4 py-3 ${!n.read ? 'bg-orange-500/5' : ''}`}>
                    <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: n.iconBg, color: n.iconColor }}>{n.icon}</div>
                    <div className="flex-1"><p className="text-[13px] font-bold text-white leading-tight">{n.title}</p><p className="text-[11px] text-white/40 mt-0.5">{n.desc}</p></div>
                    <button onClick={() => dismiss(n.id)} className="text-white/20 hover:text-white"><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 border-l border-white/10 pl-4 hover:opacity-80 transition-all">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Responsable</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-black">A</div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] w-52 bg-slate-800 rounded-2xl shadow-2xl border border-white/10 p-2 z-50 animate-in fade-in zoom-in duration-200">
              <button onClick={() => navigate('/responsable/settings')} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:bg-white/5"><Settings size={16} /> Paramètres</button>
              <button onClick={() => navigate('/auth/login')} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10"><LogOut size={16} /> Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}