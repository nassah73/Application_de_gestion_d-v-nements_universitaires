import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './pages/Auth/Login';
import RegisterStudent from './pages/Auth/RegisterStudent';
import RegisterOrganisateur from './pages/Auth/registerOrganisateur';
import AdministrateurApp from './pages/Administrateur/App';
// Student Component (which contains its own routes)
import StudentApp from './pages/student/App';

// Organizer Component 
import OrganizerDashboard from './pages/organisateur/OrganizerDashboard';

// Administration Pages
import Dashboard from './pages/Administration/index';
import ValidateEvents from './pages/Administration/ValidateEvents';
import ValidateOrganizers from './pages/Administration/ValidateOrganizers';
import GlobalNotifications from './pages/Administration/GlobalNotifications';
import EventCategories from './pages/Administration/EventCategories';
import AdminSettings from './pages/Administration/Settings';

function App() {
  return (
    <Routes>
      {/* Redirection par défaut vers Login */}
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/administrateur/*" element={<AdministrateurApp />} />
      {/* --- Auth Routes --- */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      <Route path="/register-organisateur" element={<RegisterOrganisateur />} />
     
      {/* --- Student Routes --- */}
      {/* StudentApp gère ses propres routes comme /Home, /Event etc. On utilise * pour lui laisser la main */}
      <Route path="/app/*" element={<StudentApp />} />
      
      {/* Mapping direct des routes étudiantes existantes pour rétro-compatibilité */}
      <Route path="/Home" element={<Navigate to="/app/Home" />} />
      <Route path="/Event" element={<Navigate to="/app/Event" />} />

      {/* --- Organizer Routes --- */}
      <Route path="/organisateur" element={<OrganizerDashboard />} />

      {/* --- Administration Routes --- */}
      <Route path="/responsable" element={<Dashboard />} />
      <Route path="/responsable/events" element={<ValidateEvents />} />
      <Route path="/responsable/users" element={<ValidateOrganizers />} />
      <Route path="/responsable/notifications" element={<GlobalNotifications />} />
      <Route path="/responsable/categories" element={<EventCategories />} />
      <Route path="/responsable/settings" element={<AdminSettings />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}

export default App;