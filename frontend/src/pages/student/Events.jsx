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
                <div className="flex justify-around">
                    <div className="flex mt-5 gap-1 border-2 w-1/3 py-1.5 rounded-[5px] relative">
                     <Search className="text-gray-300 w-10"/>   
                    <form action="">
                        <input className="w-73" type="text" placeholder="Search events,by name ,category,location" />
                        
                    </form>
                    </div>
                    <button className="border-2 relative h-10 px-10 b self-center rounded-[5px] right-1/9 mt-4">Shearch</button>
                    <div className="self-center">
                        <form action="">
                            <select className="h-10 rounded-[5px] text-amber-300 border-2 px-15 mt-4" defaultValue={'category'}>
                             <option defaultValue={'category'} value="category" disabled>category</option>
                             <option value="">item3</option>
                             <option value="">item1</option>
                             <option value="">item1</option>
                        </select>
                        </form>
                        
                    </div>
                   
                </div>
            </nav>
         </section>
        </>
    )
}