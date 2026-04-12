import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import { Bell, UserCircle } from 'lucide-react';
export default function Navbar(){
      const items=[{name:'events'},{name:'calendar'},{name:'research'},{name:'venues'},{name:'faculty'},{name:'analytics'}]
    return(
<nav className='bg-white h-20 flex justify-between relative top-5 capitalize font-[600] '>
                <h1 className='font-[800] uppercase relative left-20 text-[#01223e]'>ibn zohr university</h1>
                <ul className='flex gap-10  text-gray-500'>
                      {items.map((item,index)=>{
                         return(
                            <li  key={index}>{item.name}</li>
                         )
                      })}
                </ul>
                <div className=' flex gap-15 relative right-20'>
                     <Bell  size={24} strokeWidth={1.5}/>
                      <UserCircle size={24} strokeWidth={1.5}/>
                      <button className='bg-blue-500 rounded-xl h-10 relative bottom-2  w-40'>create event</button>
                </div>
            </nav>
    )
}