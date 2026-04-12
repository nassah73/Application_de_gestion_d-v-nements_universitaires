import React from 'react';
import BgImag from '../../assets/bg.jpg'
import NavBar from '../../assets/NavBar'
import { CalendarCheck, Users, QrCode, icons } from 'lucide-react';
export default function Main(){
  const Cards=[{number:'15' ,sujet:'Active Events',icon:CalendarCheck},
     {number:'2.5k' ,sujet:'Registrations',icon:Users},
     {number:'Scan' ,sujet:'QR Ready',icon:QrCode},
  ]
    return (
        <div>
          <NavBar/>  
          <section className='h-screen w-screen bg-bottom relative flex '  style={{backgroundImage:`url(${BgImag})`} }>
          <div className="absolute inset-0 bg-black/60"></div>
                <div className='relative z-10 w-1/3 top-1/8 left-20 '>
                      <div>
                        <p className='font-[900] text-7xl uppercase leading-25'><span className='text-[#164167]'>fpt</span> <br/><span >event</span></p>
                      </div>
                      
                      <p className='mt-5 w-[80%] text-white font-[500] '>Say goodbye to paper forms. Join the first centralized digital hub for all  Taroudant academic and cultural activities.</p>
                </div>
                <div className='w-1000px  relative ml-90'>
                    <div className='grid grid-cols-3 relative gap-5 top-1/2 right-1  '>
                       
                         {Cards.map((item,index)=>{
                            const IconComponent = item.icon;
                                return(
                                    <div className='bg-white h-40 w-50 rounded-2xl  '>
                                     <nav key={index} className='text-center relative top-1/6 font-[700] '>
                                        <p>{item.number}</p>
                                        <p>{item.sujet}</p>
                                        <IconComponent size={50} className=' relative left-20 top-2'/>
                                     </nav>
                                     </div>
                                )
                         })}
                         
                         
                         
                       
                        
                    </div>
                </div>
          </section>
        </div>
    )
}