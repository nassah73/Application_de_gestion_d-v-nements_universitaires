import Navbar from "../../assets/NavBar"
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
export default function Main(){
    const [value, setvalue] = useState(new Date());
    const handleDateChange = (newDate) => {
        setvalue(newDate);
        
    };
    return(
        <>
        <Navbar/>
        <div className="bg-[#28374e] w-screen relative ">
            <nav className="flex justify-between bg-[#0f172a] h-20 text-white  leading-8 font-[700]">
                <div>
               <h1 className="mt-2 ml-10 text-3xl">Student Schedule</h1>
               <p className="ml-10 text-2xl">Manage your time and track registered events</p>
               </div>
               <div className=" bg-blue-300 h-1/2 w-40 mr-20 mt-5 rounded-[5px]">
                   <div></div>
               </div>
            </nav>
              <div>
                <nav className="w-1/3 h-screen ">
                 <Calendar className="custom-calendar" onChange={handleDateChange} value={value} />
                </nav>
                 <h1 style={{ marginTop: '20px', color: 'black' }}>
                    Selected Date: {value.toDateString()}
                </h1>
              </div>
        </div>
        </>
    )
}