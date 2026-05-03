import Navbar from "../../assets/NavBar";
import React from 'react';
import axios from 'axios';
import { Calendar, Clock, Users, Trash2, Ticket, Eye } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

const MyEvents = () => {
  const [eventsList, setEventsList] = React.useState([]);

  // جلب البيانات من السيرفر
  React.useEffect(() => {
    const getMyEvent = async () => {
      try {
        const userString = localStorage.getItem('user');
        if (!userString) return;
        const user = JSON.parse(userString);
        
        // استدعاء السيرفر مع الـ ID ديال الطالب
        const res = await axios.get(`http://localhost:5000/Event/My_registers/${user._id}`);
        setEventsList(res.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    getMyEvent();
  }, []);

  const handleDelete = async (id) => {
    try {
      // هنا خاصك تزيد الـ API Call ديال الـ Delete فالسيرفر
      // await axios.delete(`http://localhost:5000/Event/delete_registration/${id}`);
      
      // من بعد التحديث فالسيرفر، حدث الـ UI:
      setEventsList(eventsList.filter(item => item._id !== id));
    } catch (err) {
      alert("Error deleting event");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <>
      <Navbar />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-slate-900 p-8 pt-[100px] font-sans overflow-x-hidden"
      >
        <motion.header variants={itemVariants} className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-bold text-[#cd7329]">My Events</h1>
          <p className="text-slate-400 mt-2">Manage your registered events</p>
        </motion.header>

        <section>
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-white mb-6">
            Upcoming Events ({eventsList.length})
          </motion.h2>
          
          <div className="space-y-6">
            <AnimatePresence mode='popLayout'>
              {eventsList.map((registration) => (
                <motion.div 
                  key={registration._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: 20 }}
                  variants={itemVariants}
                  className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-white/10 hover:bg-white/10 transition-all group"
                >
                  {/* Image: كنستعملو الرابط ديال السيرفر + اسم الصورة اللي فالداتابيس */}
                  <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                    <img 
                      src={`http://localhost:5000/${registration.event.coverImage}`} 
                      alt={registration.event.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="flex-1 p-6 relative">
                    <button 
                      onClick={() => handleDelete(registration._id)} 
                      className="absolute top-6 right-6 text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all z-10"
                    >
                      <Trash2 size={20} />
                    </button>

                    <div className="flex flex-col h-full">
                      <span className="bg-[#cd7329] text-white text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-4 uppercase">
                        {registration.event.category}
                      </span>
                      
                      <h3 className="text-2xl font-bold text-white mb-4">{registration.event.title}</h3>

                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                        <div className="flex items-center text-slate-400 text-sm gap-2">
                          <Calendar size={16} className="text-[#cd7329]" /> <span>{new Date(registration.event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-slate-400 text-sm gap-2">
                          <Users size={16} className="text-[#cd7329]" /> <span>{registration.event.capacity} Capacity</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default MyEvents;