import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  CalendarDays, 
  QrCode, 
  Users, 
  User, 
  LogOut 
} from 'lucide-react';

const NavItem = ({ path, icon, label, active }) => (
  <Link
    to={path}
    className={`flex items-center gap-3.5 px-5 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
      active 
        ? 'bg-orange-500 text-white shadow-[0_10px_20px_rgba(249,115,22,0.2)]' 
        : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
    }`}
  >
    {active && (
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/20 rounded-l-full"></div>
    )}
    <div className={`shrink-0 transition-all duration-300 ${
      active ? 'scale-110' : 'group-hover:scale-110 group-hover:text-orange-400'
    }`}>
      {icon}
    </div>
    <span className={`text-sm tracking-wide font-bold transition-colors ${
      active ? 'text-white' : 'group-hover:text-white'
    }`}>
      {label}
    </span>
  </Link>
);

const OrgSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/organisateur', icon: <LayoutDashboard size={20}/> },
    { name: 'Créer Événement', path: '/organisateur/create-event', icon: <CalendarPlus size={20}/> },
    { name: 'Mes Événements', path: '/organisateur/events', icon: <CalendarDays size={20}/> },
    { name: 'Scanner QR', path: '/organisateur/scanner', icon: <QrCode size={20}/> },
    { name: 'Gestion Équipe', path: '/organisateur/equipe', icon: <Users size={20}/> },
    { name: 'Profil', path: '/organisateur/profile', icon: <User size={20}/> },
  ];

  return (
    <aside className="w-72 flex flex-col shrink-0 bg-[#0f172a] border-r border-white/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-orange-500/10 rounded-full blur-[80px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-orange-600/5 rounded-full blur-[80px]"></div>

      <div className="p-8 border-b border-white/5 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-orange-400 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/20">
            U
          </div>
          <div>
            <h1 className="text-lg font-black uppercase tracking-tighter text-white">UIZ Event</h1>
            <p className="text-[10px] font-bold text-orange-500/80 uppercase tracking-widest">Organisateur</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto relative custom-scrollbar">
        {menuItems.map((item) => (
          <NavItem 
            key={item.name}
            path={item.path}
            icon={item.icon}
            label={item.name}
            active={location.pathname === item.path}
          />
        ))}
      </nav>

      <div className="mt-auto p-6 border-t border-white/5 relative bg-white/[0.01]">
        <Link
          to="/auth/login"
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group font-bold text-sm"
        >
          <div className="shrink-0 group-hover:rotate-12 transition-transform">
            <LogOut size={20}/>
          </div>
          <span>Déconnexion</span>
        </Link>
      </div>
    </aside>
  );
};

export default OrgSidebar;
