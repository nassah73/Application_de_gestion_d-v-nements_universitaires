import {  Routes, Route } from 'react-router-dom';
import Main from './inde'; // هادا هو الـ Component اللي فيه التصويرة والـ Cards
import Event from './Events';
import Calendare from './Calendare';
import Research from './Research';
import Venus from './Venus';
import Faculty from './Faculty';
import Analityc from './Analityc';
import BgImag from '../../assets/bg.jpg'
export default function App() {
  return (
   
    
      <Routes>
      
        <Route path="/" element={<Main />} />
        
       
        <Route path="/Event" element={<Event />} />
        <Route path="/Calendare" element={<Calendare />} />
        <Route path="/Research" element={<Research />} />
        <Route path="/Venus" element={<Venus />} />
        <Route path="/Faculty" element={<Faculty />} />
        <Route path="/Analityc" element={<Analityc />} />
      </Routes>
   
   
  );
}