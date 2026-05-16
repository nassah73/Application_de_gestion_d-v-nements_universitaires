import React, { useEffect, useState } from 'react';
import BgImag from '../../assets/bg.jpg'
import NavBar from '../../assets/NavBar'
import { motion } from "framer-motion";
import { CalendarCheck, Users, QrCode } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <NavBar />
      <section className='h-screen mt-5 w-screen bg-bottom relative flex ' style={{ backgroundImage: `url(${BgImag})` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, ease: "easeOut" }} className='relative z-10 w-1/3 top-1/8 left-20 '>
          <div>
            <p className='font-[900] text-7xl uppercase leading-25'><span className='text-[#cd7329]'>fpt</span> <br /><span className="text-white">event</span></p>
          </div>

          <p className='mt-5 w-[80%] text-white font-[500] '>Dites adieu aux formulaires papier. Rejoignez le premier centre numérique centralisé pour toutes les activités académiques et culturelles de Taroudant.</p>
        </motion.div>
      </section>
    </div>
  )
}