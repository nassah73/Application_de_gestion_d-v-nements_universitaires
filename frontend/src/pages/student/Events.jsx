import Navbar from "../../assets/NavBar"
import BgImag from '../../assets/bg.jpg'
import {MapPin,CalendarCheck,Clock ,Search, UserCircle } from 'lucide-react';
import Data from './data/objet'
import { useState } from "react";
export default function Main(){
 const [category,setcategory]=useState('all')
const handleCategoryChange = (e) => {
    setcategory(e.target.value);
  };
const filterObjet= category==='all'?Data: Data.filter((items)=>items.category===category)

    return(
        <>
        <Navbar/>
         <section className=' min-h-screen w-screen bg-bottom relative flex bg-slate-900' > 
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90" ></div>
            <nav className=" w-[1300px]  mx-auto text-white relative mt-5">
                <h1 className="font-[600] uppercase text-4xl italic">Discover Events</h1>
                <div className="flex justify-around mt-5 gap-4">
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
                   
                </div>


             <section className=" relative mt-10 shadow-l ">
               <div className="grid grid-cols-3 gap-10">

                {filterObjet.map((item, index)=>{
                    return(
                        
                      <div key={index} className=" h-70 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-2xl relative shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10">
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
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 text-[#cd7329] font-bold w-[90%] mx-[5%] h-10 absolute bottom-0 rounded-xl hover:bg-[#cd7329] hover:text-white transition-all cursor-pointer">Check Details</button>
                       </div>
                       </div>
                    )
                    
                })}
                 
                       
                 
                 
                
                


               </div>
            </section>
            </nav>
           
         </section>
        </>
    )
}