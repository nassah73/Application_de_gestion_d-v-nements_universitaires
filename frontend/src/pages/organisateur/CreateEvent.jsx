import React, { useState, useRef } from 'react';
import axios from 'axios';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { 
  PlusCircle, Calendar, MapPin, Users, Type, 
  FileText, Tag, Image as ImageIcon, Clock, Send 
} from 'lucide-react';

const CreateEvent = ({ setActiveTab }) => {
 const [eventData, setEventData] = useState({
  title: '',
  description: '',
  category: '',
  date: '', 
  time: '', 
  location: '',
  capacity: '',
  registrationLink: '',
  needsHelp: 'no', 
});

  const [coverImage, setCoverImage] = useState({ url: null, rawFile: null });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage({
        url: URL.createObjectURL(file),
        rawFile: file
      });
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // تأكد بلي الـ Organizer موجود قبل ما تبدا
    const user = JSON.parse(localStorage.getItem('user'));
    const organizerId = user?._id || user?.user?._id;

    if (!organizerId) {
        alert("Session expirée. Veuillez vous reconnecter.");
        return;
    }

    const data = new FormData();

    // 1. إضافة الحقول النصية الأساسية يدوياً لضمان الدقة
    data.append('title', eventData.title);
    data.append('description', eventData.description);
    data.append('category', eventData.category);
    data.append('location', eventData.location);
    data.append('capacity', eventData.capacity);
    data.append('registrationLink', eventData.registrationLink || '');
    
    // هادي هي المهمة: كنصيفطو القيمة ديال needsHelp (yes/no)
    data.append('needsHelp', eventData.needsHelp);

    // 2. معالجة التاريخ والوقت
    if (eventData.date && eventData.time) {
        const fullDateTime = `${eventData.date}T${eventData.time}:00`;
        data.append('date', fullDateTime);
    }

    // 3. إضافة الصورة إذا وجدت
    if (coverImage.rawFile) {
        data.append('coverImage', coverImage.rawFile);
    }

    // 4. إضافة الـ Organizer ID
    data.append('organizer', organizerId);

    try {
        // Log للتأكد فـ الكونسول قبل الإرسال
        console.log("Envoi de needsHelp:", eventData.needsHelp);

        const response = await axios.post('http://localhost:5000/Event/CreateEvent', data, {
            headers: { 
                'Content-Type': 'multipart/form-data' 
            }
        });
        
        if (response.status === 201 || response.status === 200) {
            alert("Événement créé avec succès !");
            if(setActiveTab) setActiveTab('Tableau de Bord');
        }
    } catch (error) {
        console.error("Erreur Backend:", error.response?.data || error.message);
        alert("Erreur lors de la création de l'événement.");
    }
};

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a] text-white">
    <OrgSidebar />
    
    <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
      {/* 1. نأكدوا أن الـ Navbar عندو z-index طالع بزاف باش يبقى ديما فوق الـ main */}
      <div className="sticky top-0 z-[100]"> 
        <OrgNavbar />
      </div>
      
      {/* 2. نحيدو z-10 من الـ main باش ما يغطيش على الـ Dropdowns ديال الـ Navbar */}
      <main className="flex-1 p-8 relative z-0"> 
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 shadow-lg shadow-orange-500/10">
                <PlusCircle size={32} className="text-orange-500" />
              </div>
              Créer un Événement <span className="text-orange-500">.</span>
            </h1>
          </div>
            
            <form onSubmit={handleSubmit} className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Type size={14} className="text-orange-500" /> Titre *
                  </label>
                  <input type="text" name="title" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none" onChange={handleChange} />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Tag size={14} className="text-orange-500" /> Catégorie *
                  </label>
                  <select name="category" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-gray-700 outline-none appearance-none cursor-pointer" onChange={handleChange}>
                    <option value="">Choisir une catégorie...</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Académique">Académique</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Culturel">Culturel</option>
                    <option value="Sportif">Sportif</option>
                    <option value="Économique">Économique</option>
                    <option value="الشريعة">الشريعة</option>
                    <option value="Environnement">Environnement</option>
                    <option value="Développement personnel">Développement personnel</option>
                    <option value="Social">Social</option>
                </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Users size={14} className="text-orange-500" /> Capacité *
                  </label>
                  <input type="number" name="capacity" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none" onChange={handleChange} />
                </div>

                {/* التاريخ والوقت منفصلين */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Calendar size={14} className="text-orange-500" /> Date *
                  </label>
                  <input type="date" name="date" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none [color-scheme:dark]" onChange={handleChange} />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Clock size={14} className="text-orange-500" /> Heure *
                  </label>
                  <input type="time" name="time" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none [color-scheme:dark]" onChange={handleChange} />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin size={14} className="text-orange-500" /> Lieu *
                  </label>
                  <input type="text" name="location" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none" onChange={handleChange} />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FileText size={14} className="text-orange-500" /> Description *
                  </label>
                  <textarea name="description" required rows="4" className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none" onChange={handleChange}></textarea>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <ImageIcon size={14} className="text-orange-500" /> Affiche
                  </label>
                  <div onClick={() => fileInputRef.current.click()} className="border-2 border-dashed border-white/10 rounded-[2rem] p-8 flex flex-col items-center justify-center cursor-pointer">
                    {coverImage.url ? <img src={coverImage.url} className="h-32 object-cover rounded-xl" /> : <p className="text-white/40">Cliquez pour ajouter une image</p>}
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                  </div>
                </div>
              </div>



              {/* Needs Help Section */}
              <div className="md:col-span-2 space-y-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Users size={14} className="text-orange-500" /> Besoin d'aide pour l'organisation ?
                </label>
                
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="needsHelp" 
                      value="yes" 
                      checked={eventData.needsHelp === 'yes'}
                      onChange={handleChange}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <span className="text-sm font-bold group-hover:text-orange-500 transition-colors">Oui</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="needsHelp" 
                      value="no" 
                      checked={eventData.needsHelp === 'no'}
                      onChange={handleChange}
                      className="w-5 h-5 accent-orange-500"
                    />
                    <span className="text-sm font-bold group-hover:text-orange-500 transition-colors">Non</span>
                  </label>
                </div>

               
              </div>


              <button type="submit" className="w-full bg-orange-500 text-white font-black py-5 rounded-2xl hover:bg-orange-600 transition-all flex items-center justify-center gap-4 uppercase text-xs tracking-widest">
                <Send size={18} /> Soumettre pour validation
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateEvent;