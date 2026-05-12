import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Send, 
  AlertTriangle, 
  Info, 
  Type, 
  FileText, 
  Calendar as CalendarIcon,
  PlusCircle,
  Trash2
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.1 }
  }
};

export default function NewsManager() {
  const [newsData, setNewsData] = useState({
    title: '',
    description: '',
    tag: 'Important',
    type: 'info', // info or warning
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Announcement Published:", newsData);
    
    alert("Announcement Published Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 pt-10">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto space-y-8"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#f97316] flex items-center gap-3">
              <Bell className="w-8 h-8" /> News Hub Manager
            </h1>
            <p className="text-slate-400 mt-2">Create and broadcast announcements to the entire campus</p>
          </div>
          <div className="bg-[#f97316]/10 border border-[#f97316]/20 px-4 py-2 rounded-xl text-[#f97316] font-bold">
            Live Feed Status: Active
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-7">
            <motion.div 
              variants={containerVariants}
              className="bg-[#1a1f2e] border border-white/10 rounded-[2rem] p-8 shadow-xl"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-[#f97316]" /> New Announcement
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Type className="w-4 h-4" /> Announcement Title
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g., Spring Semester Exam Schedule"
                    className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#f97316] transition-all"
                    onChange={(e) => setNewsData({...newsData, title: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Tag/Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Tag Name
                    </label>
                    <input 
                      type="text"
                      placeholder="Exam, Club, Event..."
                      className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#f97316]"
                      onChange={(e) => setNewsData({...newsData, tag: e.target.value})}
                    />
                  </div>
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> Broadcast Date
                    </label>
                    <input 
                      type="date"
                      className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#f97316]"
                      value={newsData.date}
                      onChange={(e) => setNewsData({...newsData, date: e.target.value})}
                    />
                  </div>
                </div>

                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Detailed Message</label>
                  <textarea 
                    rows="4"
                    placeholder="Write the details of your announcement here..."
                    className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#f97316]"
                    onChange={(e) => setNewsData({...newsData, description: e.target.value})}
                    required
                  ></textarea>
                </div>

                <div className="flex gap-4 p-4 bg-[#0f1117] rounded-2xl border border-white/5">
                  <button 
                    type="button"
                    onClick={() => setNewsData({...newsData, type: 'info'})}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${newsData.type === 'info' ? 'bg-[#f97316] text-white' : 'bg-white/5 text-slate-400'}`}
                  >
                    <Info className="w-4 h-4" /> Standard News
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewsData({...newsData, type: 'warning'})}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${newsData.type === 'warning' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-white/5 text-slate-400'}`}
                  >
                    <AlertTriangle className="w-4 h-4" /> Urgent Alert
                  </button>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#f97316]/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" /> Broadcast Announcement
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
               Live Preview
            </h2>
            
           
            <motion.div 
              className={`p-6 rounded-[2rem] border transition-all ${newsData.type === 'warning' ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}
            >
              <div className="flex justify-between items-start mb-4">
                 <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full border ${newsData.type === 'warning' ? 'border-red-500/40 text-red-400' : 'border-[#f97316]/40 text-[#f97316]'}`}>
                   {newsData.tag}
                 </span>
                 <div className={`p-2 rounded-full ${newsData.type === 'warning' ? 'bg-red-500 text-white' : 'bg-[#f97316] text-white'}`}>
                   {newsData.type === 'warning' ? <AlertTriangle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{newsData.title || "Your Announcement Title"}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {newsData.description || "The message content will appear here..."}
              </p>
              <span className="text-[11px] text-slate-500">{newsData.date}</span>
            </motion.div>

            <div className="bg-[#1a1f2e] border border-white/10 p-6 rounded-3xl text-sm text-slate-400">
               <h4 className="font-bold text-white mb-3">Admin Tips:</h4>
               <ul className="list-disc list-inside space-y-2">
                 <li>Use <span className="text-red-400">Urgent Alert</span> for immediate emergencies.</li>
                 <li>Keep titles short and clear.</li>
                 <li>Tags help students filter news easily.</li>
               </ul>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}