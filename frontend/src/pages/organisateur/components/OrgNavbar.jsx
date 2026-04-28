import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import NotificationBell from './NotificationBell';

const OrgNavbar = () => {
  return (
    <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0 border-b border-white/5"
      style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(20px)' }}>
      
      <div className="relative w-96 group">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
        <input
          className="w-full pl-12 pr-4 py-3 rounded-2xl text-sm text-white placeholder-gray-500 border border-white/5 outline-none focus:border-orange-500/50 focus:bg-white/[0.05] transition-all duration-300"
          style={{ background: 'rgba(255,255,255,0.03)' }}
          placeholder="Rechercher des événements, participants..."
        />
      </div>

      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <NotificationBell />
        
        {/* Profile */}
        <div className="flex items-center gap-4 pl-6 border-l border-white/10 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-white group-hover:text-orange-400 transition-colors tracking-tight">Organisateur Principal</p>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">En ligne</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-all duration-300 border border-white/20">
              O
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0f172a] rounded-lg flex items-center justify-center border border-white/10">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OrgNavbar;
