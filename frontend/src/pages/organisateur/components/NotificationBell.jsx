import { useState, useRef, useEffect } from 'react';
import { Bell, Check, X, AlertCircle, RefreshCw, UserPlus } from 'lucide-react';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Mock notifications basées sur le besoin :
  // - Événement refusé
  // - Événement accepté avec modification
  // - Étudiants volontaires (accepte/refuse)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'rejected',
      icon: <AlertCircle size={18} />,
      iconBg: '#FEE2E2',
      iconColor: '#DC2626',
      title: 'Événement refusé',
      desc: '"Science Fair 2026" a été refusé par l\'administration.',
      reason: 'Conflit de calendrier avec un autre événement majeur.',
      date: 'Il y a 2h',
      read: false,
    },
    {
      id: 2,
      type: 'approved-modified',
      icon: <RefreshCw size={18} />,
      iconBg: '#E0E7FF',
      iconColor: '#6366F1',
      title: 'Modification approuvée',
      desc: 'Les modifications pour "Hackathon 2025" ont été acceptées.',
      date: 'Il y a 5h',
      read: false,
    },
    {
      id: 3,
      type: 'volunteer',
      icon: <UserPlus size={18} />,
      iconBg: '#D1FAE5',
      iconColor: '#059669',
      title: 'Nouveau volontaire',
      desc: 'Ahmed Benali veut participer à "Cultural Night 2026".',
      date: 'Il y a 1h',
      read: false,
      volunteer: { name: 'Ahmed Benali', email: 'ahmed.benali@etu.uiz.ac.ma' },
      status: 'pending', // 'pending' | 'accepted' | 'rejected'
    },
    {
      id: 4,
      type: 'volunteer',
      icon: <UserPlus size={18} />,
      iconBg: '#D1FAE5',
      iconColor: '#059669',
      title: 'Nouveau volontaire',
      desc: 'Fatima Zahra El Amrani veut participer à "Science Fair 2026".',
      date: 'Il y a 30min',
      read: false,
      volunteer: { name: 'Fatima Zahra El Amrani', email: 'fatima.amrani@etu.uiz.ac.ma' },
      status: 'pending',
    },
    {
      id: 5,
      type: 'volunteer',
      icon: <UserPlus size={18} />,
      iconBg: '#D1FAE5',
      iconColor: '#059669',
      title: 'Nouveau volontaire',
      desc: 'Youssef El Idrissi veut participer à "Basketball Tournament".',
      date: 'Il y a 10min',
      read: false,
      volunteer: { name: 'Youssef El Idrissi', email: 'youssef.idrissi@etu.uiz.ac.ma' },
      status: 'pending',
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleAcceptVolunteer = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true, status: 'accepted', desc: n.desc.replace('veut participer', 'a été accepté') } : n
    ));
  };

  const handleRejectVolunteer = (id) => {
    setNotifications(prev => prev.map(n =>
      n.id === id ? { ...n, read: true, status: 'rejected', desc: n.desc.replace('veut participer', 'a été refusé') } : n
    ));
  };

  const dismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Fermer le dropdown en cliquant dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2.5 rounded-xl transition-all duration-300 ${
          isOpen 
            ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]' 
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 border-2 border-[#0f172a] shadow-[0_0_10px_rgba(249,115,22,0.5)]"></span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-[420px] bg-[#0f172a] border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-xl">
          {/* Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/5 to-transparent"></div>
            <div className="flex items-center gap-3 relative z-10">
              <span className="font-black text-white text-xl tracking-tight">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-2.5 py-1 bg-orange-500 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-lg shadow-orange-500/20">
                  {unreadCount}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-orange-500 hover:text-orange-400 font-black uppercase tracking-widest transition-colors relative z-10"
              >
                Tout marquer lu
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar relative">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/5">
                  <Bell size={32} className="text-gray-600" />
                </div>
                <p className="text-gray-400 font-bold">Aucune notification pour le moment</p>
                <p className="text-gray-600 text-xs mt-2 font-medium">Nous vous préviendrons dès qu'il y aura du nouveau.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-6 transition-all duration-300 border-b border-white/5 last:border-0 group cursor-default relative ${
                    !notif.read ? 'bg-orange-500/[0.03]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  {!notif.read && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                  )}
                  <div className="flex gap-5">
                    {/* Icon */}
                    <div
                      className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
                      style={{ 
                        backgroundColor: `${notif.iconColor}15`, 
                        color: notif.iconColor,
                        borderColor: `${notif.iconColor}30`,
                        boxShadow: `0 8px 20px ${notif.iconColor}10`
                      }}
                    >
                      {notif.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1.5">
                        <p className={`text-sm tracking-tight ${notif.read ? 'text-gray-300 font-bold' : 'text-white font-black'}`}>
                          {notif.title}
                        </p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{notif.date}</p>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 font-medium">{notif.desc}</p>

                      {/* Si refusé, afficher le motif */}
                      {notif.type === 'rejected' && notif.reason && (
                        <div className="mb-4 p-4 bg-red-500/5 rounded-2xl border border-red-500/10 backdrop-blur-sm">
                          <p className="text-[11px] text-red-400 leading-relaxed">
                            <span className="font-black uppercase tracking-widest mr-2 opacity-70">Motif</span>
                            <span className="font-medium text-red-300/80">{notif.reason}</span>
                          </p>
                        </div>
                      )}

                      {/* Si volontaire, afficher les boutons Accepter/Refuser */}
                      {notif.type === 'volunteer' && notif.status === 'pending' && notif.volunteer && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleAcceptVolunteer(notif.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-500 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                          >
                            <Check size={14} strokeWidth={3} /> Accepter
                          </button>
                          <button
                            onClick={() => handleRejectVolunteer(notif.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 text-gray-300 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-all active:scale-95 border border-white/5"
                          >
                            <X size={14} strokeWidth={3} /> Refuser
                          </button>
                        </div>
                      )}

                      {/* Badge si déjà accepté/refusé */}
                      {notif.type === 'volunteer' && notif.status !== 'pending' && (
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                          notif.status === 'accepted'
                            ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_4px_12px_rgba(34,197,94,0.1)]'
                            : 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_4px_12px_rgba(239,68,68,0.1)]'
                        }`}>
                          {notif.status === 'accepted' ? (
                            <><Check size={12} strokeWidth={3} /> Accepté</>
                          ) : (
                            <><X size={12} strokeWidth={3} /> Refusé</>
                          )}
                        </span>
                      )}
                    </div>

                    {/* Dismiss button */}
                    <button
                      onClick={() => dismiss(notif.id)}
                      className="shrink-0 w-8 h-8 flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/5 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-5 bg-white/[0.02] border-t border-white/5 text-center relative overflow-hidden">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-400 hover:text-orange-400 font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 mx-auto group"
            >
              Voir tout l'historique
              <div className="w-5 h-5 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-all">
                <Check size={12} className="rotate-[-90deg] text-orange-500 group-hover:text-white" strokeWidth={3} />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
