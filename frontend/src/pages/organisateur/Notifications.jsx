import React, { useState, useEffect } from 'react';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Bell, 
  Trash2, 
  CheckCircle, 
  Clock, 
  UserPlus, 
  RefreshCw, 
  AlertCircle,
  MoreVertical,
  Check
} from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const organizerId = user._id || user.id;

  const fetchNotifications = async () => {
    try {
      if (!organizerId) return;
      const res = await axios.get(`http://localhost:5000/api/notifications/${organizerId}`);
      setNotifications(res.data);
    } catch (error) {
      console.error("Erreur notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [organizerId]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/read/${id}`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error(error);
    }
  };

  const markAllRead = async () => {
    try {
      await axios.put(`http://localhost:5000/api/notifications/read-all/${organizerId}`);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotif = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'registration': return { icon: <UserPlus size={24} />, bg: 'bg-green-500/10', color: 'text-green-500' };
      case 'event_status': return { icon: <RefreshCw size={24} />, bg: 'bg-blue-500/10', color: 'text-blue-500' };
      case 'system': return { icon: <CheckCircle size={24} />, bg: 'bg-yellow-500/10', color: 'text-yellow-500' };
      default: return { icon: <AlertCircle size={24} />, bg: 'bg-orange-500/10', color: 'text-orange-500' };
    }
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "À l'instant";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10"></div>
        <OrgNavbar />
        
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                  Notifications <span className="text-orange-500">.</span>
                </h1>
                <p className="text-gray-500 mt-2 font-medium">Restez informé de l'activité sur vos événements.</p>
              </div>
              
              {notifications.some(n => !n.isRead) && (
                <button 
                  onClick={markAllRead}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  <Check size={16} />
                  Tout marquer comme lu
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bell size={40} className="text-gray-700" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Aucune notification</h3>
                <p className="text-gray-500">Vous n'avez pas encore reçu de notifications.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notif) => {
                  const iconData = getIcon(notif.type);
                  return (
                    <div 
                      key={notif._id}
                      className={`group p-6 rounded-3xl border transition-all duration-300 flex gap-6 items-start ${
                        !notif.isRead 
                          ? 'bg-orange-500/[0.03] border-orange-500/20 shadow-[0_10px_30px_rgba(249,115,22,0.05)]' 
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className={`p-4 rounded-2xl ${iconData.bg} ${iconData.color} shrink-0`}>
                        {iconData.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className={`text-lg tracking-tight ${!notif.isRead ? 'text-white font-black' : 'text-gray-300 font-bold'}`}>
                            {notif.title}
                          </h4>
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">
                            {timeAgo(notif.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {notif.message}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          {notif.relatedEvent && (
                            <Link 
                              to={`/organisateur/events/${notif.relatedEvent}`}
                              className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:underline"
                            >
                              Voir l'événement
                            </Link>
                          )}
                          {!notif.isRead && (
                            <button 
                              onClick={() => markAsRead(notif._id)}
                              className="text-[10px] font-black text-orange-500 uppercase tracking-widest hover:underline"
                            >
                              Marquer comme lu
                            </button>
                          )}
                          <button 
                            onClick={() => deleteNotif(notif._id)}
                            className="text-[10px] font-black text-red-500/50 uppercase tracking-widest hover:text-red-500 transition-colors"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>

                      {!notif.isRead && (
                        <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
