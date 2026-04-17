import Navbar from "../../assets/NavBar"
import BgImag from '../../assets/bg.jpg'
import {MapPin,CalendarCheck,Clock ,Search } from 'lucide-react';
import Data from './data/objet'
export default function Main(){
    return(
        <>
        <Navbar/>
         <section className=' mt-4 min-h-screen w-screen bg-bottom relative flex  bg-[#0f172a]' > 
            <div className="absolute inset-0 bg-black/60" ></div>
            <nav className=" w-[1300px]  mx-auto text-white relative mt-5">
                <h1 className="font-[600] uppercase text-4xl italic">disopver events</h1>
                <div className="flex justify-around mt-5">
                    <div className="flex mt-5 gap-1 border-2 w-[30%]  py-1.5 rounded-[5px] relative">
                     <Search className="text-gray-300 w-[10%]"/>   
                    <form action="">
                        <input className="w-[190%] focus:outline-none" type="text" placeholder="Search events,by name ,category,location" />
                        
                    </form>
                    </div>
                    <button className="border-2 relative h-10 px-10 bg-blue-600 hover:bg-blue-700 b self-center rounded-[5px] right-1/9 mt-4">Shearch</button>
                    <div className="self-center">
                        <form action="">
                            <select className="h-10 rounded-[5px] bg-blue-600 border-2 px-15 mt-4" defaultValue={'category'}>
                             <option defaultValue={'category'} value="category" disabled>category</option>
                             <option value="">item3</option>
                             <option value="">item1</option>
                             <option value="">item1</option>
                        </select>
                        </form>
                        
                    </div>
                   
                </div>


             <section className=" relative mt-10 shadow-l ">
               <div className="grid grid-cols-3 gap-10">

                {Data.map((item)=>{
                    return(
                        
                      <div className=" h-70 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 rounded-[10px] relative shadow-2xl">
                       <img src={BgImag} alt="" className="w-[100%] h-[100%] rounded-[10px] bg-cover absolute z-0 shadow-2xl" />
                       <div className="absolute z-10 bg-black/60 inset-0 rounded-[10px]"></div>
                       <h1 className="absolute z-20 top-1 right-1 bg-blue-400 px-5 rounded-xl">{item.category}</h1>
                       <div  className="absolute  h-40 z-20 top-1/3 text-white left-2 w-[100%]">
                           <nav className="absolute left-1/15">
                        <h1 className="font-[900] text-2xl capitalize" >{item.title}</h1>
                        <p className="mt-3 flex gap-4 font-[600]"><CalendarCheck size={20}/><span>{item.date}</span></p>
                        <p className="mt-2 flex gap-4 font-[600]"><MapPin size={20}/><span>{item.lieu}</span></p>
                        <p className="mt-2 flex gap-4 font-[600]"><Clock size={20}/>{item.temp}</p>
                         </nav>
                        <button className="bg-blue-400 w-[95%] h-10 absolute top-[85%] rounded-xl hover:bg-blue-500"> Sheck</button>
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