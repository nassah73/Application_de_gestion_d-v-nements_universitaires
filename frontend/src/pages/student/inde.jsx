import React from 'react';
import BgImag from '../../assets/bg.jpg'
import NavBar from '../../assets/NavBar'
export default function Main(){
  
    return (
        <div>
          <NavBar/>  
          <section className='h-screen w-screen bg-bottom relative '  style={{backgroundImage:`url(${BgImag})`} }>
          <div className="absolute inset-0 bg-black/60"></div>
                <div className='relative z-10 w-1/3 top-1/8 left-20 '>
                      <div>
                        <p className='font-[900] text-7xl uppercase leading-25'><span className='text-[#164167]'>fpt</span> <br/><span >event</span></p>
                      </div>
                      
                      <p className='mt-5 w-[80%] text-white font-[500] '>Say goodbye to paper forms. Join the first centralized digital hub for all  Taroudant academic and cultural activities.</p>
                </div>
          </section>
        </div>
    )
}