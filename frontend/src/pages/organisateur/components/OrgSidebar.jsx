import { Link, useLocation } from 'react-router-dom';

const OrgSidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/organisateur' },
    { name: 'Créer Événement', path: '/organisateur/create-event' },
    { name: 'Mes Événements', path: '/organisateur/events' },
    { name: 'Scanner QR', path: '/organisateur/scanner' },
    { name: 'Gestion Équipe', path: '/organisateur/equipe' },
    { name: 'Profil', path: '/organisateur/profile' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-2xl font-bold mb-10 text-blue-500">EventUI</h2>
      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`block p-3 mb-2 rounded-lg transition ${
              location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default OrgSidebar;
