import React, { useEffect, useState } from 'react';
import BgImag from '../../assets/bg.jpg'
import NavBar from '../../assets/NavBar'
import { motion } from "framer-motion";
import { CalendarCheck, Users, QrCode } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate = useNavigate();
  const [isStaff, setIsStaff] = useState(false);
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    const checkStaff = async () => {
      if (user && user._id) {
        try {
          const res = await axios.get(`http://localhost:5000/api/organisateurs/check-staff-status/${user._id}`);
          setIsStaff(res.data.isStaff);
        } catch (error) {
          console.error("Erreur check staff:", error);
        }
      }
    };
    checkStaff();
  }, [user?._id]);

  const Cards = [
    { number: '15', sujet: 'Active Events', icon: CalendarCheck },
    { number: '2.5k', sujet: 'Registrations', icon: Users },
  ];

  // Ajouter la carte Scan seulement si l'étudiant est staff
  if (isStaff) {
    Cards.push({ number: 'Scan', sujet: 'QR Ready', icon: QrCode, isScan: true });
  }

  return (
    <div className='h-screen w-screen overflow-hidden'>
      <NavBar />
      <section className='h-screen mt-5 w-screen bg-bottom relative flex ' style={{ backgroundImage: `url(${BgImag})` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2, ease: "easeOut" }} className='relative z-10 w-1/3 top-1/8 left-20 '>
          <div>
            <p className='font-[900] text-7xl uppercase leading-25'><span className='text-[#cd7329]'>fpt</span> <br /><span className="text-white">event</span></p>
          </div>

          <p className='mt-5 w-[80%] text-white font-[500] '>Say goodbye to paper forms. Join the first centralized digital hub for all  Taroudant academic and cultural activities.</p>
        </motion.div>
        <div className='w-1000px  relative ml-90'>
          <div className='grid grid-cols-3 relative gap-5 top-1/2 right-1  '>

            {Cards.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 1, ease: "easeOut" }}  
                  onClick={() => item.isScan && navigate('/organisateur/scanner')}
                  className={`bg-white/10 backdrop-blur-xl border border-white/20 text-white h-40 w-50 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] hover:bg-white/15 transition-all ${item.isScan ? 'cursor-pointer border-orange-500/50 bg-orange-500/5' : ''}`}
                >
                  <nav className='text-center relative top-1/6 font-[700] '>
                    <p className='text-2xl text-[#cd7329]'>{item.number}</p>
                    <p className='mt-1 text-slate-300'>{item.sujet}</p>
                    <IconComponent size={40} className={`relative left-20 top-2 opacity-80 ${item.isScan ? 'text-orange-500' : ''}`} />
                  </nav>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}