import Navbar from "../../assets/NavBar"
import BgImag from '../../assets/bg.jpg'
import {MapPin,CalendarCheck,Clock ,Search, UserCircle } from 'lucide-react';
import Data from './data/objet'
import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect, useRef } from 'react';


export default function Main(){
    const profileRef = useRef(null);
    const [form ,setform]=useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
   const [category,setcategory]=useState('all')
const handleCategoryChange = (e) => {
    setcategory(e.target.value);
  };
const filterObjet= category==='all'?Data: Data.filter((items)=>items.category===category)

 const handelForm=(item)=>{
    setSelectedEvent(item)
    setform(!form) 
 }

   useEffect(() => {
    
      function handleClickOutside(event) {
  
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setform(false);
        }
      }
  
      
      document.addEventListener("mousedown", handleClickOutside);
  
      
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [form]);

    return(
        <>
        <Navbar/>
         <section className=' min-h-screen w-screen bg-bottom relative flex bg-slate-900' > 
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90" ></div>
            <nav className=" w-[1300px]  mx-auto text-white relative mt-5">
                <h1 className="font-[600] uppercase text-4xl italic">Discover Events</h1>
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}  transition={{ duration: 1, ease: "easeOut" }} className="flex justify-around mt-5 gap-4">
                    <div className="flex mt-5 gap-2 bg-white/5 backdrop-blur-md border border-white/10 w-[40%] py-2 px-4 rounded-xl relative shadow-lg">
                     <Search className="text-[#cd7329] self-center"/>   
                    <form action="" className="w-full flex">
                        <input className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none" type="text" placeholder="Search events by name, category, location" />
                    </form>
                    </div>
                    <button className="border border-white/10 relative h-[44px] px-10 bg-gradient-to-r from-[#cd7329] to-[#eb8232] hover:opacity-90 shadow-lg shadow-[#cd7329]/20 font-bold self-center rounded-xl mt-5 transition-all">Search</button>
                    <div className="self-center mt-5">
                        <form action=''>
                            <select onChange={handleCategoryChange} className="h-[44px] rounded-xl bg-[#1e293b] border border-white/10 px-8 text-white focus:outline-none focus:border-[#cd7329] hover:cursor-pointer shadow-lg" defaultValue={'category'} name="category">
                             <option value="category" disabled>Category</option>
                             <option value="all">All</option>
                             <option value="sport">Sport</option>
                             <option value="culturelle">Culturelle</option>
                             <option value="scences & Etude">Sciences & Etude</option>
                        </select>
                        </form>
                        
                    </div>
                   
                </motion.div>


             <section className=" relative mt-10 shadow-l ">
               <div className="grid grid-cols-3 gap-10">

                {filterObjet.map((item, index)=>{
                    return(
                        
                      <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}  transition={{ duration: 1, ease: "easeOut" }}  className=" h-70 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-2xl relative shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10">
                       <img src={BgImag} alt="" className="w-[100%] h-[100%] bg-cover absolute z-0" />
                       <div className="absolute z-10 bg-gradient-to-t from-slate-900 via-slate-900/80 to-black/40 inset-0"></div>
                       <h1 className="absolute z-20 top-3 right-3 bg-[#cd7329] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">{item.category}</h1>
                       <div  className="absolute h-50 z-20 top-1/4 text-white left-2 w-[100%]">
                           <nav className="absolute left-4 w-[90%]">
                        <h1 className="font-[900] text-2xl capitalize text-white" >{item.title}</h1>
                        <div className="space-y-1.5 mt-4 text-slate-300 text-sm">
                            <p className="flex gap-3"><CalendarCheck size={18} className="text-[#cd7329]"/><span>{item.date}</span></p>
                            <p className="flex gap-3"><MapPin size={18} className="text-[#cd7329]"/><span>{item.lieu}</span></p>
                            <p className="flex gap-3"><Clock size={18} className="text-[#cd7329]"/>{item.temp}</p>
                            <p className="flex gap-3"><UserCircle size={18} className="text-[#cd7329]"/>{item.Organisateur}</p>
                        </div>
                         </nav>
                        <button  className="bg-white/10 backdrop-blur-md border border-white/20 text-[#cd7329] font-bold w-[90%] mx-[5%] h-10 absolute bottom-0 rounded-xl hover:bg-[#cd7329] hover:text-white transition-all cursor-pointer" onClick={() => handelForm(item)}  ref={profileRef}>Check Details</button>
                       
                       </div>
                       </motion.div>
                    )
                    
                })}
                 {form && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[500px] h-auto p-8 bg-[#1e293b] border border-white/20 rounded-3xl shadow-2xl text-white">
                    <h2 className="text-3xl font-bold text-[#cd7329] mb-4">{selectedEvent.title}</h2>
                 <div className="space-y-4">
                    <p className="flex gap-3"><CalendarCheck className="text-[#cd7329]"/> {selectedEvent.date}</p>
                    <p className="flex gap-3"><MapPin className="text-[#cd7329]"/> {selectedEvent.lieu}</p>
                    <p className="text-slate-300">هنا تقدر تزيد الوصف (Description) أو أي معلومة أخرى كاين في الـ Object ديالك.</p>
                 </div>
               <button 
               onClick={() => setform(false)} 
               className="mt-8 w-full py-2 bg-[#cd7329] rounded-xl font-bold"
                >
                 Close
               </button>
                  </div>
                           
                   }
                 
                       
                 
                 
                
                


               </div>
            </section>
            </nav>
           
         </section>
        </>
    )
}