import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  LayoutDashboard, CalendarCheck, Users, Bell, Settings, LogOut, Search,
  CheckCircle, UserPlus, XCircle, TrendingUp, Tag
} from 'lucide-react';

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
const ORANGE_LIGHT = '#eb8232';

const Dashboard = () => (
  <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>

    {/* ── Sidebar ── */}
    <aside className="w-64 flex flex-col shrink-0" style={{ background: 'linear-gradient(145deg,rgba(205,115,41,0.95),rgba(168,85,20,0.9))' }}>
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-black uppercase tracking-wider text-white">UIZ University</h1>
        <p className="text-xs text-white/60 mt-1">Administration</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        <NavItem path="/responsable"               icon={<LayoutDashboard size={20}/>} label="Dashboard"        active />
        <NavItem path="/responsable/events"        icon={<CalendarCheck   size={20}/>} label="Event Validation" />
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
          <div className="relative p-2 rounded-full cursor-pointer text-white/50 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-400 rounded-full" />
          </div>
          <div className="flex items-center gap-3 border-l pl-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <div className="text-right">
              <p className="text-sm font-semibold text-white">Admin User</p>
              <p className="text-[10px] text-white/40">Super Administrator</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>A</div>
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
            <ActivityItem icon={<CheckCircle />} iconColor="#10B981" title="Event Validated"        desc="Science Fair 2026 approved by Administration"              time="5 min ago" />
            <ActivityItem icon={<UserPlus   />} iconColor={ORANGE}   title="New Organizer Request"  desc="Computer Science Club requested organizer status"           time="12 min ago" />
            <ActivityItem icon={<XCircle    />} iconColor="#ef4444"  title="Event Cancelled"        desc="Basketball Tournament postponed"                            time="1 hour ago" />
            <ActivityItem icon={<CalendarCheck/>} iconColor="#6366F1" title="Event Published"       desc="Cultural Night 2026 is now live for registration"          time="2 hours ago" />
          </div>
        </div>

      </div>
    </main>
  </div>
);

/* ── Sub-components ── */
const NavItem = ({ icon, label, path, active = false }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => path && navigate(path)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
      style={active
        ? { background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 }
        : { color: 'rgba(255,255,255,0.75)' }}
      onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
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
      {trend  && <span className="text-[10px] font-black px-2 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#10B981' }}>{trend}</span>}
      {alert  && <span className="text-[10px] font-black px-2 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}>{alert}</span>}
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