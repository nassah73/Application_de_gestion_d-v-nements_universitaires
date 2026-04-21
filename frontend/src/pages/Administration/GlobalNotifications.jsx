import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Bell, Users, Search, Settings, LogOut, Tag,
  LayoutDashboard, CalendarCheck, SendHorizontal
} from 'lucide-react';

const GLASS = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' };

const GlobalNotifications = () => {
  const [notifType, setNotifType]   = useState('Email');
  const [recipient, setRecipient]   = useState('All Students');

  const recentNotifications = [
    { id: 1, title: 'Science Fair 2026 Registration Open', to: 'All Students',       sentAt: '2026-04-20 14:30', type: 'email'  },
    { id: 2, title: 'Basketball Tournament Cancelled',     to: '87 Event Participants', sentAt: '2026-04-19 09:15', type: 'app'    },
    { id: 3, title: 'New Event Validation Guidelines',     to: 'Event Organizers',    sentAt: '2026-04-18 16:00', type: 'system' },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>

      {/* Sidebar */}
      <aside className="w-64 flex flex-col shrink-0" style={{ background: 'linear-gradient(145deg,rgba(205,115,41,0.95),rgba(168,85,20,0.9))' }}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-black uppercase tracking-wider text-white">UIZ University</h1>
          <p className="text-xs text-white/60 mt-1">Administration</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          <NavItem path="/responsable"               icon={<LayoutDashboard size={20}/>} label="Dashboard"        />
          <NavItem path="/responsable/events"        icon={<CalendarCheck   size={20}/>} label="Event Validation" />
          <NavItem path="/responsable/users"         icon={<Users           size={20}/>} label="User Management"  />
          <NavItem path="/responsable/notifications" icon={<Bell            size={20}/>} label="Notifications"    active />
          <NavItem path="/responsable/categories"    icon={<Tag             size={20}/>} label="Categories"       />
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0">
          <NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" />
          <NavItem path="/auth/login"           icon={<LogOut   size={20}/>} label="Logout"   />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 shrink-0 z-10"
          style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/30 border outline-none"
              style={GLASS_INPUT}
              placeholder="Search notifications..."
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 rounded-full text-white/50" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Bell size={18}/>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-400 rounded-full"/>
            </div>
            <div className="flex items-center gap-3 border-l pl-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-[10px] text-white/40 uppercase">Super Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
                style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>A</div>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6" style={{ background: '#0f172a' }}>

          {/* Send Notification */}
          <section className="max-w-4xl mx-auto rounded-2xl border p-8" style={GLASS}>
            <h2 className="text-xl font-bold text-white mb-8">Send Notification</h2>
            <div className="space-y-8">

              {/* Type */}
              <div>
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-4">Notification Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <SelectCard icon={<Mail size={24}/>} label="Email"  selected={notifType === 'Email'}  onClick={() => setNotifType('Email')}  />
                  <SelectCard icon={<Bell size={24}/>} label="In-App" selected={notifType === 'In-App'} onClick={() => setNotifType('In-App')} />
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-4">Recipient Group</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RecipientOption label="All Students"      subText="3 842 recipients" selected={recipient === 'All Students'}      onClick={() => setRecipient('All Students')}      />
                  <RecipientOption label="Event Participants" subText="1 256 recipients" selected={recipient === 'Event Participants'} onClick={() => setRecipient('Event Participants')} />
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/30 border outline-none"
                  style={GLASS_INPUT}
                  placeholder="Enter notification title..."
                />
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-white/30 border outline-none resize-none"
                  style={GLASS_INPUT}
                  placeholder="Compose your message..."
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 text-white py-3 rounded-lg font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>
                  <SendHorizontal size={18}/> Send Notification
                </button>
                <button className="px-8 py-3 rounded-lg font-bold transition-all text-white/60 hover:text-white"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  Save as Draft
                </button>
              </div>
            </div>
          </section>

          {/* Recent Notifications */}
          <section className="max-w-4xl mx-auto rounded-2xl border p-8" style={GLASS}>
            <h3 className="text-lg font-bold text-white mb-6">Recent Notifications</h3>
            <div className="space-y-3">
              {recentNotifications.map((notif) => (
                <div key={notif.id} className="flex items-center justify-between p-4 rounded-xl border transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg" style={notif.type === 'email'
                      ? { background: 'rgba(205,115,41,0.15)', color: '#cd7329' }
                      : { background: 'rgba(99,102,241,0.15)', color: '#6366F1' }}>
                      {notif.type === 'email' ? <Mail size={18}/> : <SendHorizontal size={18}/>}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                      <p className="text-[11px] text-white/35">To: {notif.to} | Sent: {notif.sentAt}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black px-3 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>SENT</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

/* ── Sub-components ── */
const NavItem = ({ icon, label, path, active = false }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => path && navigate(path)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
      style={active ? { background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 } : { color: 'rgba(255,255,255,0.75)' }}
      onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
    >
      {icon} <span className="text-sm">{label}</span>
    </div>
  );
};

const SelectCard = ({ icon, label, selected, onClick }) => (
  <div
    onClick={onClick}
    className="p-5 rounded-xl flex flex-col items-center gap-3 cursor-pointer transition-all border"
    style={selected
      ? { background: 'rgba(205,115,41,0.15)', borderColor: '#cd7329', color: '#cd7329' }
      : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
  >
    {icon} <span className="text-sm font-bold">{label}</span>
  </div>
);

const RecipientOption = ({ label, subText, selected, onClick }) => (
  <div
    onClick={onClick}
    className="p-4 rounded-xl cursor-pointer transition-all border"
    style={selected
      ? { background: 'rgba(205,115,41,0.12)', borderColor: '#cd7329' }
      : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}
  >
    <p className="text-sm font-bold" style={{ color: selected ? '#cd7329' : 'rgba(255,255,255,0.8)' }}>{label}</p>
    <p className="text-[11px] text-white/35 mt-0.5">{subText}</p>
  </div>
);

export default GlobalNotifications;