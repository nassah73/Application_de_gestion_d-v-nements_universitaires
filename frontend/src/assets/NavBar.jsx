import React, { useState } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { Bell, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useEffect ,useRef} from 'react';



export default function Navbar(){
  const profileRef = useRef(null);
   const [profil,setprofil]=useState(false)
function pr(){
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
  { name: 'events', path: '/app/Event' }, 
  { name: 'calendar', path: '/app/Calendare' },
  { name: 'My Events', path: '/app/My_event' },
  { name: 'Announcements', path: '/app/Annencement' },
  { name: 'analytics', path: '/app/Analityc' }
];

    return(
<nav className=' main bg-white h-15 flex justify-between relative top-5 capitalize items-center font-[600] '>
                <h1 className='font-[800] uppercase relative left-20 '><span className=' text-[#164167]'>fpt</span><span>event</span></h1>
                <ul className='flex gap-10  text-gray-500 relative '>
                      {items.map((item,index)=>{
                         return(
                            <NavLink  to={item.path}  key={index}   className={({ isActive }) => 
                                                                               `px-4 py-2 transition-all duration-300 ${
                                                                                 isActive 
                                                                                   ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/10' // الستايل إيلا كان Active
                                                                                   : 'text-gray-400 hover:text-blue-400' // الستايل العادي
                                                                               }`
                              }>{item.name}</NavLink>
                         )
                      })}
                </ul>
                <div className=' flex gap-15 relative right-20 items-center'>
                     <Bell  size={24} strokeWidth={1.5}/>
                     <div className=' leading-5'>
                     <button className=' hover:cursor-pointer' onClick={pr} ref={profileRef}><UserCircle size={24} strokeWidth={1.5}/></button>
                       {profil && ( <div  className='absolute z-30 justify-self-center h-100 w-80 bg-amber-500 '></div>     )}
                      </div>
                      <button className='bg-blue-500  rounded-xl h-10 relative   w-40 capitalize'>create event</button>
                    
                </div>
            </nav>
    )
}
