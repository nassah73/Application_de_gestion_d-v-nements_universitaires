import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { Bell, UserCircle } from 'lucide-react';
import { NavLink } from 'react-router-dom';
export default function Navbar(){
      const items=[{name:'events',path:'/Event'},{name:'calendar',path:'/Calendare'},{name:'My Events',path:'/My_event'},{name:'Announcements',path:'/Annencement'},{name:'analytics',path:'/Analityc'}]
    return(
<nav className=' main bg-white h-15 flex justify-between relative top-5 capitalize font-[600] '>
                <h1 className='font-[800] uppercase relative left-20 '><span className=' text-[#164167]'>fpt</span><span>event</span></h1>
                <ul className='flex gap-10  text-gray-500 relative bottom-1.5'>
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
                <div className=' flex gap-15 relative right-20'>
                     <Bell  size={24} strokeWidth={1.5}/>
                      <UserCircle size={24} strokeWidth={1.5}/>
                      <button className='bg-blue-500 rounded-xl h-10 relative bottom-2  w-40 capitalize'>create event</button>
                </div>
            </nav>
    )
}