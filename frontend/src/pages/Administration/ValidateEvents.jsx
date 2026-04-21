import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Check, X, Search, Bell, Settings, LogOut, LayoutDashboard, CalendarCheck, Users, Tag } from 'lucide-react';

const ValidateEvents = () => {
  const [activeTab, setActiveTab] = useState('All Events');

  // البيانات الظاهرة في الصورة (image_b9df44.png)
  const events = [
    { id: 1, title: 'Science Fair 2026', organizer: 'Physics Club', category: 'Sociale', date: '2026-04-15', capacity: 200, status: 'Soumis' },
    { id: 2, title: 'Cultural Night', organizer: 'International Students Association', category: 'Culturel', date: '2026-04-18', capacity: 500, status: 'Validé' },
    { id: 3, title: 'Basketball Tournament', organizer: 'Sports Committee', category: 'Sports', date: '2026-04-10', capacity: 150, status: 'Publié' },
    { id: 4, title: 'AI Workshop Series', organizer: 'Computer Science Club', category: 'Sociale', date: '2026-04-20', capacity: 80, status: 'Soumis' },
    { id: 5, title: 'Spring Music Festival', organizer: 'Music Society', category: 'Culturel', date: '2026-04-12', capacity: 300, status: 'Validé' },
    { id: 6, title: 'Debate Competition', organizer: 'Debate Club', category: 'Académique', date: '2026-04-08', capacity: 100, status: 'Rejeté' },
  ];

  const tabs = [
    { name: 'All Events', count: 45 },
    { name: 'Brouillon', count: 8 },
    { name: 'Soumis', count: 12 },
    { name: 'Validé', count: 15 },
    { name: 'Publié', count: 7 },
    { name: 'Rejeté', count: 3 },
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
          <NavItem path="/responsable/events"        icon={<CalendarCheck   size={20}/>} label="Event Validation" active />
          <NavItem path="/responsable/users"         icon={<Users           size={20}/>} label="User Management"  />
          <NavItem path="/responsable/notifications" icon={<Bell            size={20}/>} label="Notifications"    />
          <NavItem path="/responsable/categories"    icon={<Tag             size={20}/>} label="Categories"       />
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0">
          <NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" />
          <NavItem path="/auth/login"           icon={<LogOut   size={20}/>} label="Logout"   />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 shrink-0"
          style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/30 border outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' }}
              placeholder="Search events, organizers, students..."
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 rounded-full cursor-pointer text-white/50" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-400 rounded-full" />
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

        {/* Content Area */}
        <div className="p-8 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Event Validation Queue</h2>
              
              {/* Tabs Section */}
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      activeTab === tab.name 
                        ? 'bg-[#1E3A8A] text-white shadow-md' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.name} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Table Section */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      <th className="px-4 py-4">Event Title</th>
                      <th className="px-4 py-4">Organizer</th>
                      <th className="px-4 py-4">Category</th>
                      <th className="px-4 py-4 text-center">Submission Date</th>
                      <th className="px-4 py-4 text-center">Capacity</th>
                      <th className="px-4 py-4 text-center">Status</th>
                      <th className="px-4 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-4 text-sm font-bold text-slate-700">{event.title}</td>
                        <td className="px-4 py-4 text-sm text-slate-500">{event.organizer}</td>
                        <td className="px-4 py-4 text-sm text-slate-500">{event.category}</td>
                        <td className="px-4 py-4 text-sm text-slate-500 text-center">{event.date}</td>
                        <td className="px-4 py-4 text-sm text-slate-500 text-center">{event.capacity}</td>
                        <td className="px-4 py-4 text-center">
                          <StatusBadge status={event.status} />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="View Details">
                              <Eye size={18} />
                            </button>
                            {event.status === 'Soumis' && (
                              <>
                                <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Approve">
                                  <Check size={18} />
                                </button>
                                <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Reject">
                                  <X size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components
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

const StatusBadge = ({ status }) => {
  const styles = {
    'Soumis': 'bg-blue-100 text-blue-700',
    'Validé': 'bg-emerald-100 text-emerald-700',
    'Publié': 'bg-cyan-100 text-cyan-700',
    'Rejeté': 'bg-red-100 text-red-700',
    'Brouillon': 'bg-slate-100 text-slate-700',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${styles[status] || 'bg-slate-100'}`}>
      {status}
    </span>
  );
};

export default ValidateEvents;