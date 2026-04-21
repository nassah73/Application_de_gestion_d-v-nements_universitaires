import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  LayoutDashboard, CalendarCheck, Users, Bell, Settings, LogOut, Search, 
  CheckCircle, UserPlus, XCircle, Share2, TrendingUp 
} from 'lucide-react';

// بيانات تجريبية للرسوم المبيانية
const lineData = [
  { name: 'Sep', engagement: 45 }, { name: 'Oct', engagement: 52 },
  { name: 'Nov', engagement: 61 }, { name: 'Dec', engagement: 58 },
  { name: 'Jan', engagement: 70 }, { name: 'Feb', engagement: 75 },
  { name: 'Mar', engagement: 82 }, { name: 'Apr', engagement: 90 },
];

const pieData = [
  { name: 'Science & Technology', value: 42, color: '#1E3A8A' },
  { name: 'Academic', value: 52, color: '#6366F1' },
  { name: 'Sports', value: 28, color: '#10B981' },
  { name: 'Cultural', value: 35, color: '#F59E0B' },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1E3A8A] text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold uppercase tracking-wider">UIZ University</h1>
          <p className="text-xs text-blue-200">Event Management</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<CalendarCheck size={20} />} label="Event Validation" />
          <NavItem icon={<Users size={20} />} label="User Management" />
          <NavItem icon={<Bell size={20} />} label="Notifications" />
        </nav>

        <div className="p-4 border-t border-blue-800 space-y-2">
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <header className="bg-white h-16 border-b flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search size={18} />
            </span>
            <input 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Search events, organizers, students..." 
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex items-center gap-3 border-l pl-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700">Admin User</p>
                <p className="text-[10px] text-slate-400">Super Administrator</p>
              </div>
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<CalendarCheck className="text-blue-600" />} label="Total Events" value="247" trend="+12%" color="bg-blue-50" />
            <StatCard icon={<Users className="text-emerald-600" />} label="Active Students" value="3,842" trend="+8%" color="bg-emerald-50" />
            <StatCard icon={<TrendingUp className="text-cyan-600" />} label="Participation Rate" value="68%" trend="+18%" color="bg-cyan-50" />
            <StatCard icon={<CalendarCheck className="text-amber-600" />} label="Pending Validations" value="12" alert="3 urgent" color="bg-amber-50" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-700 mb-6">Student Engagement Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="engagement" stroke="#1E3A8A" strokeWidth={3} dot={{r: 4, fill: '#1E3A8A'}} activeDot={{r: 6}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-700 mb-6">Events by Category</h3>
              <div className="h-64 flex flex-col md:flex-row items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 md:mt-0">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></span>
                      <span className="text-xs text-slate-500 whitespace-nowrap">{item.name}: {item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-700">Recent Activity</h3>
            </div>
            <div className="divide-y divide-slate-100">
              <ActivityItem icon={<CheckCircle className="text-emerald-500" />} color="bg-emerald-50" title="Event Validated" desc="Science Fair 2026 approved by Administration" time="5 minutes ago" />
              <ActivityItem icon={<UserPlus className="text-blue-500" />} color="bg-blue-50" title="New Organizer Request" desc="Computer Science Club requested organizer status" time="12 minutes ago" />
              <ActivityItem icon={<XCircle className="text-red-500" />} color="bg-red-50" title="Event Cancelled" desc="Basketball Tournament postponed" time="1 hour ago" />
              <ActivityItem icon={<CalendarCheck className="text-purple-500" />} color="bg-purple-50" title="Event Published" desc="Cultural Night 2026 is now live for registration" time="2 hours ago" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// مكونات فرعية صغيرة (Sub-components)
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white text-[#1E3A8A]' : 'hover:bg-blue-800 text-blue-100'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

const StatCard = ({ icon, label, value, trend, alert, color }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
      {trend && <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>}
      {alert && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase">{alert}</span>}
    </div>
    <div className="mt-4">
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  </div>
);

const ActivityItem = ({ icon, color, title, desc, time }) => (
  <div className="p-6 flex gap-4 hover:bg-slate-50 transition-colors cursor-default">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <div>
      <h4 className="text-sm font-bold text-slate-700">{title}</h4>
      <p className="text-sm text-slate-500">{desc}</p>
      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
        <span className="w-1 h-1 rounded-full bg-slate-300"></span> {time}
      </p>
    </div>
  </div>
);

export default Dashboard;