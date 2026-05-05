import { LayoutDashboard, CalendarCheck, Users, Tag, Bell, Settings, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebare() {

  const navigate = useNavigate();
  const location = useLocation();

  const NavItem = ({ icon, label, path, active = false }) => {
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

  return (
    <aside className="w-64 flex flex-col shrink-0" style={{ background: '#12151c' }}>

      {/* Logo */}
      <div
        className="p-6 flex justify-between items-start border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div>
          <h1 className="text-lg font-black uppercase tracking-widest text-white leading-tight">
            UIZ<br />UNIVERSITY
          </h1>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Administration</p>
        </div>
        {/* Hamburger */}
        <div className="flex flex-col gap-1 pt-1 cursor-pointer">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block w-4 rounded-sm"
              style={{ height: '1.5px', background: 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-3 space-y-1 overflow-y-auto">
        <NavItem path="/responsable"               icon={<LayoutDashboard size={18} />} label="Dashboard"        active={location.pathname === '/responsable'} />
        <NavItem path="/responsable/events"        icon={<CalendarCheck   size={18} />} label="Event Validation" active={location.pathname === '/responsable/events'} />
        <NavItem path="/responsable/users"         icon={<Users           size={18} />} label="User Management"  active={location.pathname === '/responsable/users'} />
        <NavItem path="/responsable/notifications" icon={<Bell            size={18} />} label="Notifications"    active={location.pathname === '/responsable/notifications'} />
        <NavItem path="/responsable/categories"    icon={<Tag             size={18} />} label="Categories"       active={location.pathname === '/responsable/categories'} />
      </nav>

      {/* Bottom */}
      <div
        className="mt-auto p-3 border-t space-y-1 shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <NavItem path="/responsable/settings" icon={<Settings size={18} />} label="Settings" active={location.pathname === '/responsable/settings'} />
        <div
          onClick={() => navigate('/auth/login')}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
          style={{ color: '#e07a20' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(224,122,32,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </div>
      </div>

    </aside>
  );
}