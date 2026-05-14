import React from 'react';
import { Bell, User } from 'lucide-react';
import NotificationBell from './NotificationBell';

const OrgNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const displayName = user.displayName || 'Organisateur';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="h-20 flex items-center justify-end px-8 sticky top-0 z-10 shrink-0 border-b border-white/5"
      style={{ background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(20px)' }}>
      
      {/* حيدنا الـ Search div وهاد الـ div اللي لتحت غايكون دابا فـ اليمين بفضل justify-end */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <NotificationBell />
        
        {/* Profile */}
        <div className="flex items-center gap-4 pl-6 border-l border-white/10 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-white group-hover:text-orange-400 transition-colors tracking-tight">
              {displayName}
            </p>
            <div className="flex items-center justify-end gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">En ligne</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-all duration-300 border border-white/20">
              {initial}
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