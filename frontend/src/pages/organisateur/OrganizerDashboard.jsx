import React, { useState, useRef, useEffect } from 'react';
import {
  LayoutDashboard,
  Calendar,
  PlusSquare,
  QrCode,
  BarChart3,
  LogOut,
  Bell,
  User,
  ChevronRight,
  BookOpen,
  CheckCheck,
  UserPlus,
  CalendarCheck,
  AlertCircle,
  X
} from 'lucide-react';
import Dashboard from './Dashboard';
import MyEvents from './MyEvents';
import CreateEvent from './CreateEvent';
import Scanner from './Scanner';
import Stats from './Stats';
import Guide from './Guide';
import './style.css';

const NOTIFS = [
  { id: 1, icon: <UserPlus size={16} />, iconBg: 'bg-emerald-100 text-emerald-600', title: 'Nouvelle inscription', desc: 'Karim Benali vient de s\'inscrire à Workshop IA.', time: 'Il y a 2 min', read: false },
  { id: 2, icon: <CalendarCheck size={16} />, iconBg: 'bg-blue-100 text-blue-600', title: 'Événement validé', desc: 'Votre événement "Hackathon 2025" a été approuvé.', time: 'Il y a 1h', read: false },
  { id: 3, icon: <UserPlus size={16} />, iconBg: 'bg-emerald-100 text-emerald-600', title: 'Nouvelle inscription', desc: 'Sara Idrissi s\'est inscrite à la Journée Open Source.', time: 'Il y a 3h', read: false },
  { id: 4, icon: <AlertCircle size={16} />, iconBg: 'bg-orange-100 text-orange-600', title: 'Capacité presque atteinte', desc: 'Workshop IA — il ne reste que 3 places disponibles.', time: 'Hier', read: true },
  { id: 5, icon: <CalendarCheck size={16} />, iconBg: 'bg-blue-100 text-blue-600', title: 'Rappel événement', desc: 'Conférence Cloud Computing commence demain à 10h.', time: 'Hier', read: true },
];

const OrganizerDashboard = () => {
  const [activeTab, setActiveTab] = useState('Tableau de Bord');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFS);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Tableau de Bord': return <Dashboard setActiveTab={setActiveTab} />;
      case 'Mes Événements': return <MyEvents setActiveTab={setActiveTab} />;
      case 'Créer Événement': return <CreateEvent setActiveTab={setActiveTab} />;
      case 'Scanner QR': return <Scanner />;
      case 'Statistiques': return <Stats />;
      case 'Guide': return <Guide setActiveTab={setActiveTab} />;
      default: return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  const menuItems = [
    { name: 'Tableau de Bord', icon: <LayoutDashboard size={20} /> },
    { name: 'Mes Événements', icon: <Calendar size={20} /> },
    { name: 'Créer Événement', icon: <PlusSquare size={20} /> },
    { name: 'Scanner QR', icon: <QrCode size={20} /> },
    { name: 'Statistiques', icon: <BarChart3 size={20} /> },
    { name: 'Guide', icon: <BookOpen size={20} /> }
  ];

  return (
    <div className="flex h-screen organizer-root antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[300px] sidebar text-slate-400 flex flex-col relative z-20 shrink-0">
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center gap-4 px-2 mb-12">
            <div className="w-12 h-12 logo-container rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
              U
            </div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none tracking-tight">UIZ Events</h1>
              <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">Organizer Pro</span>
            </div>
          </div>

          <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-6">Plateforme</p>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`nav-item w-full ${activeTab === item.name ? 'active' : ''}`}
              >
                <span className={`${activeTab === item.name ? 'text-orange-500' : 'text-slate-500'}`}>
                  {item.icon}
                </span>
                <span className="tracking-tight">{item.name}</span>
                {activeTab === item.name && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                )}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-slate-800/50">
            <button className="nav-item w-full hover:text-red-400 hover:bg-red-400/5 group">
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="font-bold">Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        <header className="h-24 dashboard-header flex items-center justify-between px-12 shrink-0 relative z-10">
          <div className="animate-in" key={activeTab}>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{activeTab}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-8 h-0.5 bg-orange-500 rounded-full"></span>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Console Organisateur</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(o => !o)}
                className="p-3 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-2xl transition-all relative group"
              >
                <Bell size={22} className={notifOpen ? 'text-orange-500' : 'group-hover:scale-110 transition-transform'} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center px-[3px]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-[380px] bg-white rounded-[28px] shadow-2xl shadow-slate-200/80 border border-slate-100 z-50 overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
                    <div>
                      <h5 className="text-sm font-black text-slate-900">Notifications</h5>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="flex items-center gap-1.5 text-[10px] font-black text-orange-500 hover:text-orange-600 uppercase tracking-widest transition-colors"
                      >
                        <CheckCheck size={13} /> Tout marquer lu
                      </button>
                    )}
                  </div>

                  {/* List */}
                  <div className="max-h-[340px] overflow-y-auto custom-scrollbar divide-y divide-slate-50">
                    {notifications.length === 0 ? (
                      <div className="py-12 text-center">
                        <Bell size={32} className="mx-auto text-slate-200 mb-3" />
                        <p className="text-sm font-bold text-slate-400">Aucune notification</p>
                      </div>
                    ) : notifications.map(n => (
                      <div
                        key={n.id}
                        className={`flex items-start gap-4 px-5 py-4 transition-colors ${n.read ? 'bg-white' : 'bg-orange-50/40'} hover:bg-slate-50`}
                      >
                        <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${n.iconBg}`}>
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className={`text-[13px] font-bold leading-tight ${n.read ? 'text-slate-600' : 'text-slate-900'}`}>{n.title}</p>
                            {!n.read && <span className="shrink-0 w-2 h-2 rounded-full bg-orange-500"></span>}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{n.desc}</p>
                          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider mt-1">{n.time}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                          className="shrink-0 p-1 text-slate-300 hover:text-slate-500 hover:bg-slate-100 rounded-lg transition-all"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 border-t border-slate-100 bg-slate-50">
                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Fin des notifications</p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-4 pl-8 border-l border-slate-100 group cursor-pointer transition-all ${profileOpen ? 'opacity-80' : ''}`}
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-slate-900 leading-tight">Club Informatique</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Administrateur</p>
                </div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ring-4 transition-all duration-300 ${profileOpen ? 'bg-orange-500 ring-orange-100' : 'bg-slate-900 ring-slate-100 group-hover:ring-orange-100'}`}>
                  <User size={24} />
                </div>
              </div>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+12px)] w-64 bg-white rounded-[28px] shadow-2xl shadow-slate-200/80 border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="p-6 border-b border-slate-50 bg-slate-50/50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Connecté en tant que</p>
                    <p className="text-sm font-black text-slate-900">Club Informatique</p>
                  </div>

                  <div className="p-2">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-all group">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white shadow-sm transition-all text-slate-400 group-hover:text-orange-500">
                        <User size={16} />
                      </div>
                      <span className="text-sm font-bold">Mon Profil</span>
                    </button>

                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-all group">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-white shadow-sm transition-all text-slate-400 group-hover:text-orange-500">
                        <PlusSquare size={16} />
                      </div>
                      <span className="text-sm font-bold">Paramètres</span>
                    </button>
                  </div>

                  <div className="p-2 border-t border-slate-50">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all group">
                      <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-white shadow-sm transition-all text-red-400 group-hover:text-red-500">
                        <LogOut size={16} />
                      </div>
                      <span className="text-sm font-bold">Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizerDashboard;