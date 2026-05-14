import { useState, useRef, useEffect } from 'react';
import { Bell, Check, X, AlertCircle, RefreshCw, UserPlus, Trash2, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const organizerId = user._id || user.id;

  const fetchNotifications = async () => {
    try {
      if (!organizerId) return;
      const res = await axios.get(`http://localhost:5000/api/notifications/${organizerId}`);
      setNotifications(res.data);
    } catch (error) {
      console.error("Erreur notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [organizerId]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllRead = async () => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/read-all/${organizerId}`);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/read/${id}`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotif = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'registration': return { icon: <UserPlus size={18} />, bg: '#D1FAE5', color: '#059669' };
      case 'event_status': return { icon: <RefreshCw size={18} />, bg: '#E0E7FF', color: '#6366F1' };
      case 'system': return { icon: <Check size={18} />, bg: '#FEF3C7', color: '#D97706' };
      default: return { icon: <AlertCircle size={18} />, bg: '#FEE2E2', color: '#DC2626' };
    }
  };

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
              notifications.map((notif) => {
                const iconData = getIcon(notif.type);
                const timeAgo = (date) => {
                  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
                  if (seconds < 60) return "À l'instant";
                  const minutes = Math.floor(seconds / 60);
                  if (minutes < 60) return `Il y a ${minutes}m`;
                  const hours = Math.floor(minutes / 60);
                  if (hours < 24) return `Il y a ${hours}h`;
                  return new Date(date).toLocaleDateString();
                };

                return (
                  <div
                    key={notif._id}
                    onClick={() => !notif.isRead && markAsRead(notif._id)}
                    className={`p-6 transition-all duration-300 border-b border-white/5 last:border-0 group cursor-pointer relative ${
                      !notif.isRead ? 'bg-orange-500/[0.03]' : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    {!notif.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                    )}
                    <div className="flex gap-5">
                      {/* Icon */}
                      <div
                        className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}
                        style={{ 
                          backgroundColor: `${iconData.bg}`, 
                          color: iconData.color,
                          borderColor: `${iconData.color}30`,
                        }}
                      >
                        {iconData.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1.5">
                          <p className={`text-sm tracking-tight ${notif.isRead ? 'text-gray-300 font-bold' : 'text-white font-black'}`}>
                            {notif.title}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{timeAgo(notif.createdAt)}</p>
                            <button 
                              onClick={(e) => deleteNotif(e, notif._id)}
                              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed font-medium">{notif.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-5 bg-white/[0.02] border-t border-white/5 text-center relative overflow-hidden">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/organisateur/notifications');
              }}
              className="text-xs text-gray-400 hover:text-orange-400 font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 mx-auto group"
            >
              Voir toutes les notifications
              <div className="w-5 h-5 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500 transition-all">
                <ExternalLink size={12} className="text-orange-500 group-hover:text-white" strokeWidth={3} />
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
