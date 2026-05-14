import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  LayoutDashboard, CalendarCheck, Users, TrendingUp
} from 'lucide-react';
import Sidbar from './components/Sidebare';
import Tobar from './components/Tobar';

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

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState({
    totalEvents: 0,
    activeStudents: 0,
    totalOrganizers: 0,
    pendingEvents: 0,
    categoryStats: [],
    monthlyActivity: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/analytics/admin-stats');
        setStats(response.data);
      } catch (err) {
        console.error("Erreur stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>

      {/* ── Sidebar ── */}
      <Sidbar />

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">

        {/* Tobar Component */}
        <Tobar />

        {/* Content */}
        <div className="p-8 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard icon={<CalendarCheck size={22} />} label="Total Events"        value={stats.totalEvents}   accent={ORANGE}     />
            <StatCard icon={<Users         size={22} />} label="Active Students"     value={stats.activeStudents} accent="#10B981"    />
            <StatCard icon={<TrendingUp    size={22} />} label="Total Organizers"    value={stats.totalOrganizers} accent="#6366F1"    />
            <StatCard icon={<CalendarCheck size={22} />} label="Pending Validations" value={stats.pendingEvents} alert={stats.pendingEvents > 0 ? `${stats.pendingEvents} en attente` : null} accent="#F59E0B" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Student Engagement</h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.monthlyActivity}>
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
                    <Pie data={stats.categoryStats} innerRadius={50} outerRadius={72} paddingAngle={4} dataKey="value">
                      {stats.categoryStats.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex-1 space-y-3 pl-2">
                  {stats.categoryStats.map(item => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-white/50 truncate">{item.name}: <span className="text-white/80 font-bold">{item.value}</span></span>
                    </div>
                  ))}
                </div>
              </div>
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