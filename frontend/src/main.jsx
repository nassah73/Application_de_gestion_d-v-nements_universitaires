import {createRoot}from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/student/inde'
import Event from './pages/student/Events'
import Calendare from './pages/student/Calendare'
import Research from './pages/student/Research'
import Venus from './pages/student/Venus'
import Faculty from './pages/student/Faculty'
import Analityc from './pages/student/Analityc'
import './index.css'
import { Calendar } from 'lucide-react';
const root=createRoot(document.getElementById('root'))
root.render(
    <>
   <Router>
    <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/Event'} element={<Event/>}/>
        <Route path={'/Calendare'} element={<Calendare/>}/>
        <Route path={'/Research'} element={<Research/>}/>
        <Route path={'/Venus'} element={<Venus/>}/>
        <Route path={'/Faculty'} element={<Faculty/>}/>
        <Route path={'/Analityc'} element={<Analityc/>}/>
    </Routes>
   </Router>
   
   
   </>
)