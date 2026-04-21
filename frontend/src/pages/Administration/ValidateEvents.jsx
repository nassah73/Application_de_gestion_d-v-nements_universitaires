import React, { useState } from 'react';
import { Eye, Check, X, Search, Bell, Settings, LogOut, LayoutDashboard, CalendarCheck, Users } from 'lucide-react';

const ValidateEvents = () => {
  const [activeTab, setActiveTab] = useState('All Events');

  // البيانات الظاهرة في الصورة (image_b9df44.png)
  const events = [
    { id: 1, title: 'Science Fair 2026', organizer: 'Physics Club', category: 'Science & Technology', date: '2026-04-15', capacity: 200, status: 'Soumis' },
    { id: 2, title: 'Cultural Night', organizer: 'International Students Association', category: 'Cultural', date: '2026-04-18', capacity: 500, status: 'Validé' },
    { id: 3, title: 'Basketball Tournament', organizer: 'Sports Committee', category: 'Sports', date: '2026-04-10', capacity: 150, status: 'Publié' },
    { id: 4, title: 'AI Workshop Series', organizer: 'Computer Science Club', category: 'Science & Technology', date: '2026-04-20', capacity: 80, status: 'Soumis' },
    { id: 5, title: 'Spring Music Festival', organizer: 'Music Society', category: 'Cultural', date: '2026-04-12', capacity: 300, status: 'Validé' },
    { id: 6, title: 'Debate Competition', organizer: 'Debate Club', category: 'Academic', date: '2026-04-08', capacity: 100, status: 'Rejeté' },
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
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar - Reusable Sidebar Component */}
      <aside className="w-64 bg-[#1E3A8A] text-white flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold uppercase tracking-wider">UIZ University</h1>
          <p className="text-xs text-blue-200">Event Management</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem icon={<CalendarCheck size={20} />} label="Event Validation" active />
          <NavItem icon={<Users size={20} />} label="User Management" />
          <NavItem icon={<Bell size={20} />} label="Notifications" />
        </nav>
        <div className="p-4 border-t border-blue-800 space-y-2">
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white h-16 border-b flex items-center justify-between px-8 shrink-0">
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
                <p className="text-[10px] text-slate-400 uppercase">Super Administrator</p>
              </div>
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">U</div>
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
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white text-[#1E3A8A]' : 'hover:bg-blue-800 text-blue-100'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

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