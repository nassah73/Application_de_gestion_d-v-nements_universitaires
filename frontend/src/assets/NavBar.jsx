import React, { useState } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { Bell, UserCircle } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Profile from './bg.jpg'

import {
  Mail,
  Phone,
  UserSquare,
  GraduationCap,
  PencilLine,
  LogOut
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const profileRef = useRef(null);
  const [profil, setprofil] = useState(false)
  function pr() {
    setprofil(!profil)
    console.log('taled')
  }

  useEffect(() => {
    function handleClickOutside(event) {
      // إيلا كانت الـ div محلولة والضغط جى برا ديالها، كنسدوها
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setprofil(false);
      }
    }

    // كنضيفو المراقب للـ document كامل
    document.addEventListener("mousedown", handleClickOutside);

    // ضروري نحيدو المراقب ملي كيتسد الـ component باش ما يتقالش السايت
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profil]);

  const items = [
    { name: 'Events', path: '/app/Event' },
    { name: 'Calendar', path: '/app/Calendare' },
    { name: 'My Events', path: '/app/My_event' },
    { name: 'Announcements', path: '/app/Annencement' },
    { name: 'Analytics', path: '/app/Analityc' }
  ];


  return (
    <nav className='main bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 text-white h-15 flex justify-between absolute w-full top-0 z-50 capitalize items-center font-[600] '>
      <h1 className='font-[800] uppercase relative left-20 '><span className='text-[#cd7329]'>fpt</span><span>event</span></h1>
      <ul className='flex gap-10 text-slate-400 relative '>
        {items.map((item, index) => {
          return (
            <NavLink to={item.path} key={index} className={({ isActive }) =>
              `px-4 py-2 transition-all duration-300 ${isActive
                ? 'text-[#cd7329] border-b-2 border-[#cd7329] bg-[#cd7329]/10' // الستايل إيلا كان Active
                : 'hover:text-[#cd7329]' // الستايل العادي
              }`
            }>{item.name}</NavLink>
          )
        })}
      </ul>
      <div className=' flex gap-15 relative right-20 items-center'>
        <Bell className='text-slate-400 hover:text-[#cd7329] hover:cursor-pointer transition-colors' size={24} strokeWidth={1.5} />
        <div className=' leading-5'>
          <button className={`hover:cursor-pointer transition-colors ${profil ? 'text-[#cd7329] ' : 'text-slate-400 hover:text-white'}`} onClick={pr} ref={profileRef}><UserCircle size={24} strokeWidth={1.5} /></button>
          {profil && (<div className='absolute z-30 justify-self-center right-40 h-100 w-80 bg-[#1e293b] border border-white/10 shadow-2xl rounded-2xl'>
            <div >
              <nav className='flex justify-center'>
                <img src={Profile} alt="" className='rounded-[50%] h-30 w-30 object-cover object-bottom  mt-2 border-2 border-white/10' />
              </nav>
              <nav className='text-center mt-2 text-white'>
                <h1 className="font-bold">full Name: ahmed karim</h1>
                <p className="text-slate-400 text-sm">CNE: D123456789</p>
              </nav>
            </div>
            <hr className='mt-3 border-white/10' />
            <div className='mt-4 ml-4 text-slate-300 space-y-2 text-sm'>
              <p className='flex gap-3 items-center'><Mail size={18} className="text-[#cd7329]" /> hassanhassan@gmail.com</p>
              <p className='flex gap-3 items-center'><Phone size={18} className="text-[#cd7329]" /> +212 72563158</p>
              <hr className='my-3 border-white/10 w-[90%]' />
              <p className='flex gap-3 items-center'><UserSquare size={18} className="text-[#cd7329]" /> felier: smi</p>
              <p className='flex gap-3 items-center'><GraduationCap size={18} className="text-[#cd7329]" /> Nevaux: 2eme annes</p>
              <p className='flex gap-3 items-center'><Calendar size={18} className="text-[#cd7329]" /> 2023-2024</p>
              <hr className='my-3 border-white/10 w-[90%]' />
              <div className='mt-4 h-10 flex text-sm font-bold'>
                <button className='border-r border-white/10 w-[50%] h-[100%] flex gap-2 items-center justify-center hover:text-[#cd7329] transition-colors'><PencilLine size={18} /> modifier</button>
                <button className='w-[50%] h-[100%] flex gap-2 items-center justify-center hover:text-red-400 transition-colors text-red-500'><LogOut size={18} /> logout</button>
              </div>
            </div>
          </div>)}
        </div>
        {location.pathname !== '/app/Home' && (
          <NavLink to='/app/Home'><button className='bg-gradient-to-r from-[#cd7329] to-[#eb8232] text-white font-bold shadow-lg shadow-[#cd7329]/20 hover:shadow-[#cd7329]/40 hover:-translate-y-0.5 transition-all rounded-xl h-10 relative w-40 capitalize'>return</button></NavLink>
        )}
      </div>
    </nav>
  )
}
