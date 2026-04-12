import Navbar from "../../assets/NavBar"
import BgImag from '../../assets/bg.jpg'
import { Search } from 'lucide-react';
export default function Main(){
    return(
        <>
        <Navbar/>
         <section className='h-screen w-screen bg-bottom relative flex '  style={{backgroundImage:`url(${BgImag})`} }> 
            <div className="absolute inset-0 bg-black/60" ></div>
            <nav className="bg-amber-800 w-[1300px] mx-auto text-white relative mt-5">
                <h1 className="font-[600] uppercase text-4xl italic">disopver events</h1>
                <div className="flex gap-5">
                    <div className="flex mt-5 gap-1 border-2 w-1/3 py-1.5 rounded-[5px]">
                     <Search className="text-gray-300 w-10"/>   
                    <form action="">
                        <input className="w-73" type="text" placeholder="Search events,by name ,category,location" />
                    </form>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </nav>
         </section>
        </>
    )
}