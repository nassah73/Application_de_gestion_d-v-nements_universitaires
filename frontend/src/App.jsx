import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import RegisterStudent from './pages/Auth/RegisterStudent';
import RegisterOrganisateur from './pages/Auth/registerOrganisateur'; 
import Admin from './pages/Admin/indix';
import Student from './pages/student/inde';
import Responsable from './pages/responsable/index';

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" />} />
      
      
      <Route path="/login" element={<Login />} />
      <Route path="/register-student" element={<RegisterStudent />} />
      <Route path="/register-organisateur" element={<RegisterOrganisateur />} />
      
      
      <Route path="/admin" element={<Admin />} />
      <Route path="/student" element={<Student />} />
      <Route path="/responsable" element={<Responsable />} />
    </Routes>
  );
}
export default App;