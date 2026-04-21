import React, { useState } from 'react';
import { 
  FileText, Check, X, Search, Bell, Settings, LogOut, 
  LayoutDashboard, CalendarCheck, Users, ExternalLink 
} from 'lucide-react';

const ValidateOrganizers = () => {
  const [activeTab, setActiveTab] = useState('Pending Organizer Requests');

  // بيانات النوادي من الصورة (image_b9e66b.png)
  const requests = [
    {
      id: 1,
      name: 'Computer Science Club',
      representative: 'Sarah Johnson (cs.club@uiz.edu)',
      submitted: '2026-04-18',
      members: 45,
      documents: ['Club Charter', 'Member List', 'Faculty Advisor Letter']
    },
    {
      id: 2,
      name: 'Environmental Society',
      representative: 'Michael Chen (env.society@uiz.edu)',
      submitted: '2026-04-19',
      members: 32,
      documents: ['Club Charter', 'Activity Plan', 'Budget Proposal']
    },
    {
      id: 3,
      name: 'Photography Club',
      representative: 'Emma Davis (photo.club@uiz.edu)',
      submitted: '2026-04-20',
      members: 28,
      documents: ['Club Charter', 'Member List']
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar - Reusable */}
      <aside className="w-64 bg-[#1E3A8A] text-white flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold uppercase tracking-wider">UIZ University</h1>
          <p className="text-xs text-blue-200">Event Management</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem icon={<CalendarCheck size={20} />} label="Event Validation" />
          <NavItem icon={<Users size={20} />} label="User Management" active />
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
                <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Super Administrator</p>
              </div>
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">U</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Page Tabs */}
            <div className="flex gap-4 border-b border-slate-200 mb-2">
              <button 
                onClick={() => setActiveTab('Pending Organizer Requests')}
                className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'Pending Organizer Requests' ? 'text-[#1E3A8A]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Pending Organizer Requests (3)
                {activeTab === 'Pending Organizer Requests' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1E3A8A] rounded-t-full"></div>}
              </button>
              <button 
                onClick={() => setActiveTab('Role Management')}
                className={`pb-4 px-2 text-sm font-bold transition-all relative ${activeTab === 'Role Management' ? 'text-[#1E3A8A]' : 'text-slate-400 hover:text-slate-600'}`}
              >
                Role Management
                {activeTab === 'Role Management' && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#1E3A8A] rounded-t-full"></div>}
              </button>
            </div>

            {/* Requests List */}
            <div className="space-y-4 mt-6">
              {requests.map((req) => (
                <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{req.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">Representative: <span className="text-slate-700 font-medium">{req.representative}</span></p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Submitted: {req.submitted} | Members: {req.members}</p>
                    </div>
                  </div>

                  {/* Documents Section */}
                  <div className="mt-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Submitted Documents:</p>
                    <div className="flex flex-wrap gap-2">
                      {req.documents.map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 text-xs font-medium cursor-pointer hover:bg-blue-100 transition-colors">
                          <FileText size={14} />
                          {doc}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-sm shadow-emerald-200">
                      <Check size={18} />
                      Approve Organizer Status
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-sm shadow-red-200">
                      <X size={18} />
                      Reject Request
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-2 rounded-lg font-bold text-sm transition-all">
                      Review Documents
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-component
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white text-[#1E3A8A]' : 'hover:bg-blue-800 text-blue-100'}`}>
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default ValidateOrganizers;