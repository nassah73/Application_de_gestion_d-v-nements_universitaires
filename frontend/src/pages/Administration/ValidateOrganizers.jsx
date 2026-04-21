import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText, Check, X, Search, Bell, LogOut, Settings, Tag,
  LayoutDashboard, CalendarCheck, Users, ExternalLink
} from 'lucide-react';

const ValidateOrganizers = () => {
  // بيانات النوادي مطابقة للفورم ديال التسجيل (Nom, Email, Justificatif)
  const requests = [
    {
      id: 1,
      clubName: 'Computer Science Club',
      email: 'cs.club@uiz.edu',
      submitted: '2026-04-18',
      justificatif: 'attestation_club_cs.pdf'
    },
    {
      id: 2,
      clubName: 'Environmental Society',
      email: 'env.society@uiz.edu',
      submitted: '2026-04-19',
      justificatif: 'cv_responsable_env.pdf'
    },
    {
      id: 3,
      clubName: 'Photography Club',
      email: 'photo.club@uiz.edu',
      submitted: '2026-04-20',
      justificatif: 'justificatif_photo.jpg'
    }
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
          <NavItem path="/responsable/users"         icon={<Users           size={20}/>} label="User Management"  active />
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
              placeholder="Search club requests..."
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 rounded-full cursor-pointer text-white/50" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-400 rounded-full" />
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>A</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 overflow-y-auto" style={{ background: '#0f172a' }}>
          <div className="max-w-5xl mx-auto">

            {/* Page title */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Organizer Validation</h2>
              <p className="text-sm text-white/40 mt-1">Review and approve new club registration requests</p>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {requests.map((req) => (
                <div key={req.id} className="rounded-2xl border p-6 transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{req.clubName}</h3>
                      <p className="text-sm font-medium mt-1" style={{ color: '#cd7329' }}>{req.email}</p>
                      <p className="text-[11px] text-white/30 mt-2">
                        Submitted: {req.submitted} | <span className="text-amber-400 font-medium italic">Waiting for review (72h)</span>
                      </p>
                    </div>
                  </div>

                  {/* Justificatif */}
                  <div className="mt-4 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-3">Submitted Justificatif:</p>
                    <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                      <div className="p-2 rounded-md" style={{ background: 'rgba(205,115,41,0.15)' }}>
                        <FileText size={20} style={{ color: '#cd7329' }} />
                      </div>
                      <span className="text-sm font-medium text-white/70 truncate">{req.justificatif}</span>
                      <button className="ml-auto flex items-center gap-1.5 text-xs font-bold" style={{ color: '#cd7329' }}>
                        View Document <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm">
                      <Check size={18} />
                      Approve Organizer
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm">
                      <X size={18} />
                      Reject Request
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

export default ValidateOrganizers;