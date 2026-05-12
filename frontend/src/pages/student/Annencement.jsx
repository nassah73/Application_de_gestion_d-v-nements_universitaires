import React, { useState, useEffect } from 'react';
import Navbar from "../../assets/NavBar";
import { Bell, AlertTriangle, Info, MapPin, Calendar, FileText, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// --- Animations Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

// --- Sub-Components ---
const FilterItem = ({ label, count, color, active, onClick }) => (
  <motion.button 
    variants={itemVariants}
    whileHover={{ x: 5 }}
    onClick={onClick}
    className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all group ${active ? 'bg-[#cd7329] text-white shadow-md' : 'hover:bg-white/10 text-slate-300'}`}>
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-white' : color}`}></div>
      <span className={`font-medium ${active ? 'text-white' : 'group-hover:text-[#cd7329]'}`}>{label}</span>
    </div>
    <span className={`px-2 py-0.5 rounded-lg text-xs font-bold ${active ? 'bg-white/20' : 'bg-white/10'}`}>{count}</span>
  </motion.button>
);

const ActionButton = ({ icon, label, onClick, variant = "primary" }) => (
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm text-sm ${
    variant === "primary" ? "bg-gradient-to-r from-[#cd7329] to-[#eb8232] text-white hover:opacity-90" : "bg-white/5 text-white hover:bg-white/10 border border-white/20"
  }`}>
    {icon}
    {label}
  </motion.button>
);

export default function Main() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // 1. Fetch data from Backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news/all'); 
        setAnnouncements(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // 2. Logic for filtering and counts
  const filteredData = filter === 'All' ? announcements : announcements.filter(a => a.category === filter);
  const getCount = (cat) => cat === 'All' ? announcements.length : announcements.filter(a => a.category === cat).length;

  return (
    <>
      <Navbar />
      <motion.div 
        initial="hidden" animate="visible" variants={containerVariants}
        className="min-h-screen bg-[#0f1117] p-4 md:p-8 pt-[100px] font-sans text-left"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mt-10 flex items-center gap-4 mb-12">
          <div className="bg-white/5 p-4 rounded-3xl border border-white/10 shadow-xl">
            <Bell className="text-[#cd7329] w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">News Hub</h1>
            <p className="text-slate-400 font-medium">Get the latest updates from your campus</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Filters */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div variants={itemVariants} className="bg-[#1a1f2e] border border-white/10 rounded-[2rem] p-6 shadow-2xl">
              <h3 className="font-bold text-white mb-6 px-2">Categories</h3>
              <nav className="space-y-2">
                <FilterItem label="All Alerts" count={getCount('All')} active={filter === 'All'} onClick={() => setFilter('All')} color="bg-blue-500" />
                <FilterItem label="Urgent Alert" count={getCount('Urgent Alert')} active={filter === 'Urgent Alert'} onClick={() => setFilter('Urgent Alert')} color="bg-red-500" />
                <FilterItem label="Exam Schedule" count={getCount('Exam Schedule')} active={filter === 'Exam Schedule'} onClick={() => setFilter('Exam Schedule')} color="bg-orange-500" />
                <FilterItem label="Club Alert" count={getCount('Club Alert')} active={filter === 'Club Alert'} onClick={() => setFilter('Club Alert')} color="bg-blue-400" />
              </nav>
            </motion.div>
          </div>

          {/* Main List */}
          <div className="lg:col-span-9 space-y-6">
            {loading ? (
              <div className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest animate-pulse">Loading updates...</div>
            ) : (
              <AnimatePresence mode='popLayout'>
                {filteredData.map((news) => (
                  <motion.div 
                    layout key={news._id} variants={itemVariants} initial="hidden" animate="visible" exit={{ opacity: 0, scale: 0.9 }}
                    className={`p-8 rounded-[2.5rem] border shadow-2xl relative overflow-hidden transition-all bg-[#1a1f2e] ${news.category === 'Urgent Alert' ? 'border-red-500/30 bg-red-500/5' : 'border-white/10'}`}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Icon Box */}
                      <div className={`p-4 rounded-2xl self-start ${news.category === 'Urgent Alert' ? 'bg-red-500 shadow-lg shadow-red-500/20' : 'bg-[#cd7329] shadow-lg shadow-orange-500/20'}`}>
                        {news.category === 'Urgent Alert' ? <AlertTriangle className="text-white w-6 h-6" /> : <Info className="text-white w-6 h-6" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase tracking-wider ${news.category === 'Urgent Alert' ? 'text-red-400 border-red-500/20' : 'text-orange-400 border-orange-500/20'}`}>
                            {news.category}
                          </span>
                          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                            {new Date(news.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-3 leading-tight">{news.title}</h2>
                        <p className="text-slate-400 leading-relaxed mb-6 text-base">{news.description}</p>

                        <div className="flex flex-wrap gap-3">
                          <ActionButton icon={<FileText size={16}/>} label="View Details" />
                          {news.pdfUrl && (
                            <ActionButton 
                              variant="secondary" 
                              icon={<Download size={16} className="text-red-400"/>} 
                              label="Download PDF" 
                              onClick={() => window.open(`http://localhost:5000${news.pdfUrl}`, '_blank')}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {!loading && filteredData.length === 0 && (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[2.5rem] text-slate-600 font-bold">
                No announcements found in this category.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}