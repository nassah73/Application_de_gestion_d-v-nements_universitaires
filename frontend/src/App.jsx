import { Routes, Route, Navigate } from 'react-router-dom';

// Auth Pages
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import RegisterStudent from './pages/Auth/RegisterStudent';
import RegisterOrganisateur from './pages/Auth/registerOrganisateur';
import AdministrateurApp from './pages/Administrateur/App';
// Student Component (which contains its own routes)
import StudentApp from './pages/student/App';
import Administration from './pages/Administration/index'
// Organizer Component 

// Organizer Routes
import OrganizerDashboard from './pages/organisateur/OrganizerDashboard';
import OrganizerEvents from './pages/organisateur/Events';
import OrganizerCreateEvent from './pages/organisateur/CreateEvent';
import OrganizerProfile from './pages/organisateur/Profile';
import EventDetails from './pages/organisateur/EventDetails';

// Organizer Event Management (from EventManagement folder)
import EditEventRequest from './pages/organisateur/EventManagement/EditEventRequest';

// Organizer Participation
import ParticipantList from './pages/organisateur/Participation/ParticipantList';
import Scanner from './pages/organisateur/Participation/Scanner';

// Organizer Team Management
import StaffManager from './pages/organisateur/TeamManagement/StaffManager';

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
      {/* Redirection par defaut vers Login */}
      <Route path="/" element={<Navigate to="/auth/login" />} />
      <Route path="/administrateur/*" element={<AdministrateurApp />} />
      {/* --- Auth Routes --- */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      <Route path="/Administration" element={<Administration />} />
      <Route path="/register-organisateur" element={<RegisterOrganisateur />} />
     
      {/* --- Student Routes --- */}
      {/* StudentApp gere ses propres routes comme /Home, /Event etc. On utilise * pour lui laisser la main */}
      <Route path="/app/*" element={<StudentApp />} />
      
      {/* Mapping direct des routes etudiantes existantes pour retro-compatibilite */}
      <Route path="/Home" element={<Navigate to="/app/Home" />} />
      <Route path="/Event" element={<Navigate to="/app/Event" />} />

      {/* --- Organizer Routes --- */}
      <Route path="/organisateur" element={<OrganizerDashboard />} />
      <Route path="/organisateur/events" element={<OrganizerEvents />} />
      <Route path="/organisateur/create-event" element={<OrganizerCreateEvent />} />
      <Route path="/organisateur/profile" element={<OrganizerProfile />} />
      <Route path="/organisateur/events/:id" element={<EventDetails />} />

      {/* Organizer Event Management (sous-dossiers) */}
      <Route path="/organisateur/editer-evenement" element={<EditEventRequest />} />
      <Route path="/organisateur/participants/:eventId" element={<ParticipantList />} />
      <Route path="/organisateur/participants/liste" element={<ParticipantList />} />
      <Route path="/organisateur/scanner" element={<Scanner />} />
      <Route path="/student/Scanner/:eventId" element={<Scanner />} />
      <Route path="/organisateur/equipe" element={<StaffManager />} />

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
