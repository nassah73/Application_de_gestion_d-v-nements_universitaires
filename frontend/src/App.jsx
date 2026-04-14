import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import RegisterStudent from './pages/Auth/RegisterStudent';
import RegisterOrganisateur from './pages/Auth/registerOrganisateur'; 
import Admin from './pages/Admin/indix';
import Student from './pages/student/inde';
import Responsable from './pages/responsable/index';
import OrganizerDashboard from './pages/organisateur/OrganizerDashboard';

function App() {
  return (
    <Routes>
      {/* Redirect root to organizer dashboard for now to see the interface */}
      <Route path="/" element={<OrganizerDashboard />} />
      
      {/* Other Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      <Route path="/register-organisateur" element={<RegisterOrganisateur />} />
      
      {/* Dashboard and other routes can be protected later */}
      <Route path="/organisateur" element={<OrganizerDashboard />} />
    </Routes>
  );
}

export default App;