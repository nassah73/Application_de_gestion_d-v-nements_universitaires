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
  const stats = [
    { 
      label: 'Événements Actifs', 
      value: '12', 
      icon: <Calendar size={20} />, 
      trend: '+20%', 
      color: 'blue',
      gradient: 'from-blue-500/20 to-blue-600/5',
      iconColor: 'text-blue-400'
    },
    { 
      label: 'Total Participants', 
      value: '450', 
      icon: <Users size={20} />, 
      trend: '+12%', 
      color: 'green',
      gradient: 'from-green-500/20 to-green-600/5',
      iconColor: 'text-green-400'
    },
    { 
      label: 'Scans Aujourd\'hui', 
      value: '28', 
      icon: <QrCode size={20} />, 
      trend: '+5%', 
      color: 'orange',
      gradient: 'from-orange-500/20 to-orange-600/5',
      iconColor: 'text-orange-400'
    },
    { 
      label: 'Taux de présence', 
      value: '85%', 
      icon: <TrendingUp size={20} />, 
      trend: '+2%', 
      color: 'purple',
      gradient: 'from-purple-500/20 to-purple-600/5',
      iconColor: 'text-purple-400'
    },
  ];

  const recentEvents = [
    { id: 1, title: 'Science Fair 2026', date: '15 Mai 2026', participants: 120, status: 'Bientôt' },
    { id: 2, title: 'Hackathon UIZ', date: '20 Juin 2026', participants: 85, status: 'En attente' },
    { id: 3, title: 'Cultural Night', date: '10 Juillet 2026', participants: 250, status: 'Validé' },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <OrgNavbar />
        <main className="flex-1 p-8">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                Dashboard <span className="text-orange-500">.</span>
              </h1>
              <p className="text-gray-500 mt-2 font-medium">Bienvenue sur votre espace de gestion d'événements UIZ.</p>
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
                  <div key={event.id} className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold border border-orange-500/20 group-hover:scale-110 transition-transform">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white mb-0.5">{event.title}</h3>
                        <p className="text-xs text-gray-500 font-medium">{event.date} • {event.participants} Participants</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                      event.status === 'Validé' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : event.status === 'Bientôt'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {event.status}
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

              {/* Stats Mini Card */}
              <div className="p-6 rounded-[2rem] border border-white/5 bg-gradient-to-br from-orange-500 to-orange-600 text-white relative overflow-hidden shadow-2xl shadow-orange-500/20">
                <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <h3 className="text-lg font-black mb-1">Passer à Pro</h3>
                <p className="text-xs text-white/70 font-medium mb-4">Gérez plus de 50 événements par mois.</p>
                <button className="w-full py-2.5 bg-white text-orange-500 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-orange-50 transition-colors">Découvrir</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
