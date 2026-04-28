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
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
      >
        <Bell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-[380px] bg-white border border-gray-200 rounded-xl shadow-2xl z-50 animate-in fade-in">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div>
              <span className="font-bold text-gray-800 text-base">Notifications</span>
              {unreadCount > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                  {unreadCount} nouveau{unreadCount > 1 ? 'x' : ''}
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Tout marquer lu
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-50">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-gray-400 text-sm">Aucune notification</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 transition ${notif.read ? 'opacity-70' : 'bg-blue-50/30'}`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: notif.iconBg, color: notif.iconColor }}
                    >
                      {notif.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${notif.read ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                        {notif.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{notif.desc}</p>

                      {/* Si refusé, afficher le motif */}
                      {notif.type === 'rejected' && notif.reason && (
                        <div className="mt-1.5 p-2 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-[11px] text-red-700">
                            <span className="font-semibold">Motif :</span> {notif.reason}
                          </p>
                        </div>
                      )}

                      {/* Si volontaire, afficher les boutons Accepter/Refuser */}
                      {notif.type === 'volunteer' && notif.status === 'pending' && notif.volunteer && (
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => handleAcceptVolunteer(notif.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition"
                          >
                            <Check size={12} /> Accepter
                          </button>
                          <button
                            onClick={() => handleRejectVolunteer(notif.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition"
                          >
                            <X size={12} /> Refuser
                          </button>
                        </div>
                      )}

                      {/* Badge si déjà accepté/refusé */}
                      {notif.type === 'volunteer' && notif.status !== 'pending' && (
                        <span className={`mt-1.5 inline-block px-2 py-0.5 text-[10px] font-medium rounded-full ${
                          notif.status === 'accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {notif.status === 'accepted' ? 'Accepté ✓' : 'Refusé ✗'}
                        </span>
                      )}

                      <p className="text-[10px] text-gray-400 mt-1.5">{notif.date}</p>
                    </div>

                    {/* Dismiss button */}
                    <button
                      onClick={() => dismiss(notif.id)}
                      className="shrink-0 w-5 h-5 text-gray-300 hover:text-gray-500 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 text-center border-t border-gray-100">
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium"
            >
              Voir tout l'historique →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
