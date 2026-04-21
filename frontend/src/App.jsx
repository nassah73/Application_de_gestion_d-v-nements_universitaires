// App.js
import { Routes, Route } from 'react-router-dom';
import Appk from './pages/student/App'
import Login from './pages/Auth/Login'
import RegisterOrganisateur from './pages/Auth/registerOrganisateur';
import RegisterStudent from './pages/Auth/RegisterStudent'
export default function App() {
  return (

    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app/*" element={<Appk />} />
        <Route path="/register-student" element={<RegisterStudent />} />
       <Route path="/register-organisateur" element={<RegisterOrganisateur />} />
      </Routes>
   
  );
} 
