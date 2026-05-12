import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, AlertTriangle, FileText, 
  FileUp, Megaphone, Stars, Clock, X, Type 
} from 'lucide-react';
import axios from 'axios';

export default function NewsManager() {
  const fileInputRef = useRef(null);
  const [category, setCategory] = useState(''); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [newsData, setNewsData] = useState({
    title: '',
    description: '',
  });

  const categoryConfigs = {
    'Urgent Alert': { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: <AlertTriangle /> },
    'Exam Schedule': { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: <FileText /> },
    'Club Alert': { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30', icon: <Stars /> },
    'Reminders': { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: <Clock /> },
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !newsData.title) {
      alert("Please select a category and enter a title");
      return;
    }

    const formData = new FormData();
    formData.append('title', newsData.title);
    formData.append('description', newsData.description);
    formData.append('category', category); 
    
    if (selectedFile) {
      formData.append('pdfFile', selectedFile); 
    }

    try {
      const response = await axios.post('http://localhost:5000/api/news/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true 
      });

      if (response.status === 201) {
        alert("✅ Announcement published successfully!");
        // Reset Form
        setNewsData({ title: '', description: '' });
        setSelectedFile(null);
        setCategory('');
      }
    } catch (error) {
      console.error("Error publishing news:", error);
      alert("❌ Error: " + (error.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 pt-10 font-sans text-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- FORM SECTION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 bg-[#1a1f2e] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#f97316]">
            <Megaphone /> Broadcast Hub
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selection de Catégorie */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-400">What are you broadcasting?</label>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(categoryConfigs).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setCategory(cat); setSelectedFile(null); }}
                    className={`p-4 rounded-2xl border text-xs font-black uppercase transition-all flex items-center justify-between ${category === cat ? 'bg-[#f97316] border-[#f97316] text-white shadow-lg shadow-[#f97316]/20' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                  >
                    {cat}
                    {categoryConfigs[cat].icon}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {category && (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6 pt-4 border-t border-white/5 overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400 flex items-center gap-2"><Type size={14}/> Title</label>
                      <input 
                        type="text" 
                        required
                        value={newsData.title}
                        className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#f97316] transition-all"
                        placeholder={`Enter ${category} heading...`}
                        onChange={(e) => setNewsData({...newsData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-slate-400">Detailed Message</label>
                      <textarea 
                        rows="3" 
                        value={newsData.description}
                        className="w-full bg-[#0f1117] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#f97316] transition-all"
                        placeholder="Write your message here..."
                        onChange={(e) => setNewsData({...newsData, description: e.target.value})}
                      ></textarea>
                    </div>
                  </div>

                  {(category === 'Urgent Alert' || category === 'Exam Schedule') && (
                    <div className="space-y-2">
                      <label className={`text-sm font-bold uppercase tracking-widest ${category === 'Urgent Alert' ? 'text-red-400' : 'text-orange-400'}`}>
                        {category === 'Urgent Alert' ? 'Emergency Document (PDF)' : 'Official Timetable (PDF)'}
                      </label>
                      <div 
                        onClick={() => fileInputRef.current.click()}
                        className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedFile ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 hover:border-[#f97316]/40 bg-[#0f1117]'}`}
                      >
                        <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={handleFileChange} />
                        {selectedFile ? (
                          <div className="flex items-center gap-3 text-green-400">
                            <FileText size={24} />
                            <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                            <X size={18} className="text-red-400 ml-2" onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }} />
                          </div>
                        ) : (
                          <div className="text-center text-slate-500">
                            <FileUp className="mx-auto mb-2 opacity-50" />
                            <p className="text-xs uppercase font-bold">Click to attach document</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white font-black py-4 rounded-2xl shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
                  >
                    <Send size={18} /> BROADCAST NOW
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>

        {/* --- PREVIEW SECTION --- */}
        <div className="lg:col-span-5 text-left">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">Live Preview</h2>
          <AnimatePresence mode="wait">
            {category ? (
              <motion.div 
                key={category}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`p-8 rounded-[2.5rem] border shadow-2xl relative ${categoryConfigs[category].bg} ${categoryConfigs[category].border}`}
              >
                <div className={`absolute top-8 right-8 p-3 rounded-2xl ${category === 'Urgent Alert' ? 'bg-red-500' : 'bg-[#f97316]'} text-white`}>
                  {categoryConfigs[category].icon}
                </div>

                <div className="space-y-4">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-full border w-fit uppercase ${categoryConfigs[category].color} border-current/20`}>
                    {category}
                  </span>
                  <h3 className="text-2xl font-bold pr-12 leading-tight">{newsData.title || "Headline Goes Here"}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {newsData.description || "The full message will be displayed here for the students..."}
                  </p>

                  <div className="flex flex-col gap-3">
                    <button type="button" className="w-full py-3 bg-[#f97316] text-white rounded-xl text-xs font-black shadow-lg">VIEW DETAILS</button>
                    {selectedFile && (
                      <button type="button" className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2">
                        <FileText size={14} className="text-red-400"/> DOWNLOAD ATTACHED PDF
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-64 border-2 border-dashed border-white/10 rounded-[2.5rem] flex items-center justify-center text-slate-600 font-bold uppercase text-xs tracking-widest text-center px-6">
                Select a category to see the live preview
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}