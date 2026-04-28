import React from 'react';
import { useNavigate } from 'react-router-dom';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { LayoutDashboard, Calendar, Users, QrCode } from 'lucide-react';

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Événements Actifs', value: '12', icon: <Calendar className="text-blue-500" /> },
    { label: 'Total Participants', value: '450', icon: <Users className="text-green-500" /> },
    { label: 'Scans Aujourd\'hui', value: '28', icon: <QrCode className="text-purple-500" /> },
    { label: 'Taux de présence', value: '85%', icon: <LayoutDashboard className="text-orange-500" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>
            <p className="text-gray-600">Bienvenue sur votre espace de gestion d'événements.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity or Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Événements récents</h2>
              <div className="space-y-4">
                <p className="text-gray-500 italic">Aucune activité récente à afficher.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Actions rapides</h2>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => navigate('/organisateur/create-event')}
                  className="p-4 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition"
                >
                  Créer Événement
                </button>
                <button 
                  onClick={() => navigate('/organisateur/scanner')}
                  className="p-4 bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition"
                >
                  Scanner QR
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
