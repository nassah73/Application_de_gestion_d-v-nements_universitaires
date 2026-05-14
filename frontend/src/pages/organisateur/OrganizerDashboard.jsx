import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  QrCode, 
  TrendingUp, 
  CalendarCheck,
  PlusCircle,
  ScanLine
} from 'lucide-react';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [statsData, setStatsData] = React.useState(null);
  const [recentEvents, setRecentEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const organizerId = user._id || user.id;
        if (!organizerId) return;

        // Fetch Stats
        const statsRes = await fetch(`http://localhost:5000/Event/stats/${organizerId}`);
        const stats = await statsRes.json();
        setStatsData(stats);

        // Fetch Recent Events
        const eventsRes = await fetch(`http://localhost:5000/Event/organizer/${organizerId}`);
        const events = await eventsRes.json();
        setRecentEvents(events.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const stats = [
    { 
      label: 'Événements Totaux', 
      value: statsData?.totalEvents || '0', 
      icon: <Calendar size={20} />, 
      trend: statsData?.approvedEvents ? `${statsData.approvedEvents} Validés` : '0 Validés', 
      color: 'blue',
      gradient: 'from-blue-500/20 to-blue-600/5',
      iconColor: 'text-blue-400'
    },
    { 
      label: 'Total Inscriptions', 
      value: statsData?.totalInscriptions || '0', 
      icon: <Users size={20} />, 
      trend: statsData?.totalVolunteers ? `${statsData.totalVolunteers} Staffs` : '0 Staffs', 
      color: 'green',
      gradient: 'from-green-500/20 to-green-600/5',
      iconColor: 'text-green-400'
    },
    { 
      label: 'Présences', 
      value: statsData?.totalPresent || '0', 
      icon: <QrCode size={20} />, 
      trend: statsData?.attendanceRate ? `${statsData.attendanceRate}% Taux` : '0% Taux', 
      color: 'orange',
      gradient: 'from-orange-500/20 to-orange-600/5',
      iconColor: 'text-orange-400'
    },
    { 
      label: 'En Attente', 
      value: statsData?.pendingEvents || '0', 
      icon: <TrendingUp size={20} />, 
      trend: 'Demandes', 
      color: 'purple',
      gradient: 'from-purple-500/20 to-purple-600/5',
      iconColor: 'text-purple-400'
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
  <OrgSidebar />
  
  <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
    {/* Background glow effects - خليهم هما اللخرين كاع بـ -z-10 */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

    {/* 1. الـ Navbar خاصو يكون هو "الفوقاني" ديما */}
    <div className="relative z-[100]">
      <OrgNavbar />
    </div>
    
    {/* 2. الـ main خليه z-0 باش ما يتناطحش مع الجرس */}
    <main className="flex-1 p-8 relative z-0">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                Dashboard <span className="text-orange-500">.</span>
              </h1>
              <p className="text-gray-500 mt-2 font-medium">Bienvenue sur votre espace de gestion d'événements UIZ.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/organisateur/equipe')}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
              >
                <Users size={18} />
                Gérer l'Équipe
              </button>
            </div>
            
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, index) => (
              <div key={index} 
                className="group p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] transition-all duration-500 hover:bg-white/[0.04] hover:scale-[1.02] relative overflow-hidden">
                {/* Decorative circle */}
                <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} ${stat.iconColor} shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-black text-green-400 bg-green-400/10 px-2.5 py-1 rounded-lg border border-green-400/20">
                    <TrendingUp size={10} />
                    {stat.trend}
                  </div>
                </div>
                <div className="relative z-10">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                  <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                  Événements récents
                </h2>
                <button 
                  onClick={() => navigate('/organisateur/events')}
                  className="px-4 py-2 text-xs font-bold text-orange-500 hover:text-orange-400 bg-orange-500/5 hover:bg-orange-500/10 rounded-xl transition-all border border-orange-500/10"
                >
                  Voir tout
                </button>
              </div>
              
              <div className="space-y-4">
                {recentEvents.map((event) => (
                  <div 
                    key={event._id} 
                    onClick={() => navigate(`/organisateur/events/${event._id}`)}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold border border-orange-500/20 group-hover:scale-110 transition-transform">
                        {event.coverImage ? (
                          <img src={`http://localhost:5000/${event.coverImage}`} alt="" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <Calendar size={20} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-0.5">{event.title}</h3>
                        <p className="text-xs text-gray-500 font-medium">
                          {new Date(event.date).toLocaleDateString('fr-FR')} • {event.location}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                      event.status === 'approved' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : event.status === 'pending'
                        ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {event.status === 'approved' ? 'Validé' : event.status === 'pending' ? 'En cours' : 'Refusé'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col gap-6">
              <div className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-700"></div>
                
                <h2 className="text-xl font-black text-white mb-8">Actions rapides</h2>
                <div className="space-y-4">
                  <button 
                    onClick={() => navigate('/organisateur/create-event')}
                    className="w-full group/btn flex items-center justify-between p-5 rounded-2xl bg-orange-500 text-white font-black transition-all duration-500 hover:bg-orange-600 hover:shadow-[0_15px_30px_rgba(249,115,22,0.3)] hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <PlusCircle size={22} className="group-hover/btn:rotate-90 transition-transform duration-500" />
                      <span className="text-sm">Créer Événement</span>
                    </div>
                    <TrendingUp size={18} className="opacity-40 group-hover/btn:opacity-100 transition-opacity" />
                  </button>

                  <button 
                    onClick={() => navigate('/organisateur/scanner')}
                    className="w-full group/btn flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 text-white font-black transition-all duration-500 hover:bg-white/10 hover:border-white/10 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4 text-orange-400">
                      <ScanLine size={22} />
                      <span className="text-white text-sm">Scanner QR</span>
                    </div>
                    <TrendingUp size={18} className="opacity-0 group-hover/btn:opacity-40 transition-opacity" />
                  </button>
                </div>

                <div className="mt-10 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 relative">
                  <div className="absolute top-4 right-4">
                    <TrendingUp size={24} className="text-blue-500/20" />
                  </div>
                  <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em] mb-2">Conseil du jour</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">N'oubliez pas de valider la liste des participants avant le début de l'événement pour assurer un accès fluide.</p>
                </div>
              </div>

              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
