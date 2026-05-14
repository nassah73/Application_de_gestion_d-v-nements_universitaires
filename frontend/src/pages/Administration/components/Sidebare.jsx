import { LayoutDashboard, CalendarCheck, Users, Tag, Bell, Settings, LogOut } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebare() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ icon, label, path, active = false }) => {
    return (
      <div
        onClick={() => path && navigate(path)}
        title={collapsed ? label : undefined}
        className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
        style={{
          ...(active
            ? { background: '#e07a20', color: '#fff', fontWeight: 700 }
            : { color: 'rgba(160,165,185,0.85)' }),
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
        onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
        onMouseLeave={e => { if (!active) e.currentTarget.style.background = active ? '#e07a20' : 'transparent'; }}
      >
        {icon}
        {!collapsed && <span className="text-sm whitespace-nowrap">{label}</span>}
      </div>
    );
  };

  return (
    <aside
      className="flex flex-col shrink-0 transition-all duration-300"
      style={{
        background: '#12151c',
        width: collapsed ? '68px' : '256px',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div
        className="p-4 flex justify-between items-start border-b"
        style={{ borderColor: 'rgba(255,255,255,0.07)', minHeight: '72px' }}
      >
        {!collapsed && (
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest text-white leading-tight">
              UIZ<br />UNIVERSITY
            </h1>
            <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Administration</p>
          </div>
        )}

        {/* Hamburger toggle */}
        <div
          className="flex flex-col gap-1 pt-1 cursor-pointer ml-auto"
          onClick={() => setCollapsed(prev => !prev)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block rounded-sm transition-all"
              style={{
                height: '1.5px',
                background: 'rgba(255,255,255,0.4)',
                width: i === 1 && !collapsed ? '12px' : '16px',
              }}
            />
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 mt-3 space-y-1 overflow-y-auto overflow-x-hidden">
        <NavItem path="/responsable"               icon={<LayoutDashboard size={18} />} label="Dashboard"        active={location.pathname === '/responsable'} />
        <NavItem path="/responsable/events"        icon={<CalendarCheck   size={18} />} label="Event Validation" active={location.pathname === '/responsable/events'} />
        <NavItem path="/responsable/users"         icon={<Users           size={18} />} label="User Management"  active={location.pathname === '/responsable/users'} />
        <NavItem path="/responsable/notifications" icon={<Bell            size={18} />} label="Notifications"    active={location.pathname === '/responsable/notifications'} />
        <NavItem path="/responsable/categories"    icon={<Tag             size={18} />} label="Categories"       active={location.pathname === '/responsable/categories'} />
      </nav>

      {/* Bottom */}
      <div
        className="mt-auto px-2 py-3 border-t space-y-1 shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <NavItem path="/responsable/settings" icon={<Settings size={18} />} label="Settings" active={location.pathname === '/responsable/settings'} />
        <div
          onClick={() => navigate('/auth/login')}
          title={collapsed ? 'Logout' : undefined}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
          style={{
            color: 'red',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(224,122,32,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <LogOut size={18} />
          {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Logout</span>}
        </div>
      </div>
    </aside>
  );
}