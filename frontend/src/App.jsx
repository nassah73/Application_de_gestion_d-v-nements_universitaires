import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/student/inde'; // هادا هو الـ Component اللي فيه التصويرة والـ Cards
import Event from './pages/student/Events';
import Calendare from './pages/student/Calendare';
import Research from './pages/student/Research';
import Venus from './pages/student/Venus';
import Faculty from './pages/student/Faculty';
import Analityc from './pages/student/Analityc';
import BgImag from './assets/bg.jpg'
export default function App() {
  return (
   
    <Router>
      <Routes>
      
        <Route path="/" element={<Main />} />
        
       
        <Route path="/Event" element={<Event />} />
        <Route path="/Calendare" element={<Calendare />} />
        <Route path="/Research" element={<Research />} />
        <Route path="/Venus" element={<Venus />} />
        <Route path="/Faculty" element={<Faculty />} />
        <Route path="/Analityc" element={<Analityc />} />
      </Routes>
    </Router>
   
  );
}