import {  Routes, Route, Navigate } from 'react-router-dom';
import Main from './inde'; // هادا هو الـ Component اللي فيه التصويرة والـ Cards
import Event from './Events';
import Calendare from './Calendare';
import My_event from './My_event'
import Annencement from './Annencement';
import OrganizerEvents from './OrganizerEvents';
import EventDetail from './EventDetail';

import Analityc from './Analityc';
import BgImag from '../../assets/bg.jpg'
export default function App() {
  return (
   
      <Routes>
        <Route path="Home" element={<Main />} />
        <Route path="Event" element={<Event />} />
        <Route path="Event/:id" element={<EventDetail />} />
        <Route path="OrganizerEvents/:organizerId" element={<OrganizerEvents />} />
        <Route path="Calendare" element={<Calendare />} />
        <Route path="My_event" element={<My_event />} />
        <Route path="Annencement" element={<Annencement />} />
        <Route path="Analityc" element={<Analityc />} />
        <Route path="/" element={<Navigate to="Home" />} />
        
        
      </Routes>
   
 
  );
}