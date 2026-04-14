import {  Routes, Route } from 'react-router-dom';
import Main from './inde'; // هادا هو الـ Component اللي فيه التصويرة والـ Cards
import Event from './Events';
import Calendare from './Calendare';
import My_event from './My_event'
import Venus from './Annencement';

import Analityc from './Analityc';
import BgImag from '../../assets/bg.jpg'
export default function App() {
  return (
   
    
      <Routes>
      
        <Route path="/" element={<Main />} />
        
       
        <Route path="/Event" element={<Event />} />
        <Route path="/Calendare" element={<Calendare />} />
        <Route path="/My_event" element={<My_event />} />
        <Route path="/Annencement" element={<Annencement />} />
        <Route path="/Analityc" element={<Analityc />} />
      </Routes>
   
   
  );
}