import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  LayoutDashboard, CalendarCheck, Users, Bell, Settings, LogOut, Search,
  CheckCircle, UserPlus, XCircle, TrendingUp, Tag, CheckCheck, X, AlertCircle
} from 'lucide-react';
import Sidbar from './components/Sidebare';

const lineData = [
  { name: 'Sep', engagement: 45 }, { name: 'Oct', engagement: 52 },
  { name: 'Nov', engagement: 61 }, { name: 'Dec', engagement: 58 },
  { name: 'Jan', engagement: 70 }, { name: 'Feb', engagement: 75 },
  { name: 'Mar', engagement: 82 }, { name: 'Apr', engagement: 90 },
];

const pieData = [
  { name: 'Sociale',    value: 42, color: '#cd7329' },
  { name: 'Académique', value: 52, color: '#6366F1' },
  { name: 'Sports',     value: 28, color: '#10B981' },
  { name: 'Culturel',   value: 35, color: '#F59E0B' },
];

const ORANGE = '#cd7329';

const ADMIN_NOTIFS = [
  { id: 1, icon: <UserPlus size={16} />, iconBg: 'rgba(205,115,41,0.18)', iconColor: '#cd7329', title: 'Nouvelle demande organisateur', desc: 'Le Club Informatique a demandé le statut organisateur.', time: 'Il y a 2 min', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'rgba(99,102,241,0.18)', iconColor: '#6366F1', title: 'Événement en attente', desc: '"Science Fair 2026" attend votre validation.', time: 'Il y a 30 min', read: false },
  { id: 3, icon: <AlertCircle size={16} />, iconBg: 'rgba(245,158,11,0.18)', iconColor: '#F59E0B', title: 'Capacité critique', desc: 'Hackathon 2025 — seulement 2 places restantes.', time: 'Il y a 1h', read: false },
  { id: 4, icon: <CheckCircle size={16} />, iconBg: 'rgba(16,185,129,0.18)', iconColor: '#10B981', title: 'Événement validé', desc: '"Cultural Night 2026" est maintenant en ligne.', time: 'Hier', read: true },
  { id: 5, icon: <XCircle size={16} />, iconBg: 'rgba(239,68,68,0.18)', iconColor: '#ef4444', title: 'Événement annulé', desc: 'Basketball Tournament a été annulé.', time: 'Hier', read: true },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>

      {/* ── Sidebar ── */}
      <Sidbar />

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">

        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10 shrink-0"
          style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/30 border outline-none focus:border-orange-400 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
              placeholder="Search events, organizers, students..."
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
                  <span
                    className="absolute top-1 right-1 min-w-[16px] h-[16px] text-white text-[9px] font-black rounded-full border border-slate-900 flex items-center justify-center px-[2px]"
                    style={{ background: '#cd7329' }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[360px] rounded-2xl shadow-2xl border overflow-hidden z-50"
                  style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div>
                      <h5 className="text-sm font-black text-white">Notifications</h5>
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>{unreadCount} non lues</p>
                    </div>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors hover:opacity-80" style={{ color: '#cd7329' }}>
                        <CheckCheck size={13} /> Tout marquer
                      </button>
                    )}
                  </div>
                  <div className="max-h-[320px] overflow-y-auto divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    {notifications.length === 0 ? (
                      <div className="py-10 text-center">
                        <Bell size={28} className="mx-auto mb-3" style={{ color: 'rgba(255,255,255,0.15)' }} />
                        <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.3)' }}>Aucune notification</p>
                      </div>
                    ) : notifications.map(n => (
                      <div
                        key={n.id}
                        className="flex items-start gap-3 px-4 py-3 transition-colors"
                        style={{ background: n.read ? 'transparent' : 'rgba(205,115,41,0.06)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = n.read ? 'transparent' : 'rgba(205,115,41,0.06)'}
                      >
                        <div className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: n.iconBg, color: n.iconColor }}>
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[13px] font-bold leading-tight" style={{ color: n.read ? 'rgba(255,255,255,0.6)' : '#fff' }}>{n.title}</p>
                            {!n.read && <span className="shrink-0 w-2 h-2 rounded-full" style={{ background: '#cd7329' }} />}
                          </div>
                          <p className="text-[11px] mt-0.5 leading-snug" style={{ color: 'rgba(255,255,255,0.4)' }}>{n.desc}</p>
                          <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>{n.time}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                          className="shrink-0 p-1 rounded-lg transition-all"
                          style={{ color: 'rgba(255,255,255,0.25)' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.25)'; e.currentTarget.style.background = 'transparent'; }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-[10px] text-center font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.25)' }}>Fin des notifications</p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="flex items-center gap-3 border-l pl-4 hover:opacity-80 transition-all cursor-pointer outline-none"
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">Admin User</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Super Administrateur</p>
                </div>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm transition-transform"
                  style={{ background: '#e07a20', transform: profileOpen ? 'scale(1.1)' : 'scale(1)' }}>A</div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-56 rounded-2xl shadow-2xl border overflow-hidden z-50"
                  style={{ background: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}>
                  <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Compte Admin</p>
                    <p className="text-sm font-bold text-white mt-1">Super Administrateur</p>
                  </div>
                  <div className="p-2">
                    <button onClick={() => { setProfileOpen(false); navigate('/responsable/settings'); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 transition-all">
                      <Settings size={16} /> Paramètres
                    </button>
                    <button onClick={() => { setProfileOpen(false); navigate('/auth/login'); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
                      <LogOut size={16} /> Se déconnecter
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard icon={<CalendarCheck size={22} />} label="Total Events"        value="247"   trend="+12%" accent={ORANGE}     />
            <StatCard icon={<Users         size={22} />} label="Active Students"     value="3,842" trend="+8%"  accent="#10B981"    />
            <StatCard icon={<TrendingUp    size={22} />} label="Participation Rate"  value="68%"   trend="+18%" accent="#6366F1"    />
            <StatCard icon={<CalendarCheck size={22} />} label="Pending Validations" value="12"    alert="3 urgent" accent="#F59E0B" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Student Engagement</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)' }} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                    <Line type="monotone" dataKey="engagement" stroke={ORANGE} strokeWidth={3} dot={{ r: 4, fill: ORANGE }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-6 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Events by Category</h3>
              <div className="h-56 flex items-center">
                <ResponsiveContainer width="55%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={50} outerRadius={72} paddingAngle={4} dataKey="value">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3 pl-2">
                  {pieData.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-white/50 truncate">{item.name}: <span className="text-white/80 font-bold">{item.value}</span></span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">Recent Activity</h3>
            </div>
            <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <ActivityItem icon={<CheckCircle />} iconColor="#10B981" title="Event Validated"       desc="Science Fair 2026 approved by Administration"     time="5 min ago" />
              <ActivityItem icon={<UserPlus   />} iconColor={ORANGE}   title="New Organizer Request" desc="Computer Science Club requested organizer status"  time="12 min ago" />
              <ActivityItem icon={<XCircle    />} iconColor="#ef4444"  title="Event Cancelled"       desc="Basketball Tournament postponed"                   time="1 hour ago" />
              <ActivityItem icon={<CalendarCheck/>} iconColor="#6366F1" title="Event Published"      desc="Cultural Night 2026 is now live for registration" time="2 hours ago" />
            </div>
          </div>

        </div>
      </main>
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
      style={active
        ? { background: '#e07a20', color: '#fff', fontWeight: 700 }
        : { color: 'rgba(160,165,185,0.85)' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend, alert, accent }) => (
  <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
    <div className="flex justify-between items-start mb-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${accent}22`, color: accent }}>
        {icon}
      </div>
      {trend && <span className="text-[10px] font-black px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>{trend}</span>}
      {alert && <span className="text-[10px] font-black px-2 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>{alert}</span>}
    </div>
    <p className="text-2xl font-black text-white">{value}</p>
    <p className="text-xs text-white/40 mt-1">{label}</p>
  </div>
);

const ActivityItem = ({ icon, iconColor, title, desc, time }) => (
  <div className="px-6 py-4 flex gap-4 items-start hover:bg-white/5 transition-colors">
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${iconColor}22`, color: iconColor }}>
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-sm font-bold text-white">{title}</h4>
      <p className="text-xs text-white/40 mt-0.5 truncate">{desc}</p>
    </div>
    <span className="text-[10px] text-white/25 whitespace-nowrap mt-0.5">{time}</span>
  </div>
);

export default Dashboard;