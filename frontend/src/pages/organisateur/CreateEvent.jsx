import React, { useState, useRef } from 'react';
import axios from 'axios';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { 
  PlusCircle, Calendar, MapPin, Users, Type, 
  FileText, Tag, Image as ImageIcon, Clock, Send 
} from 'lucide-react';

const CreateEvent = ({ setActiveTab }) => { // حيدنا async من هنا
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
    capacity: '',
    registrationLink: ''
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

  const handleSubmit = async (e) => { // الـ async كاينة هنا فـ الـ function ديال event
    e.preventDefault();
    const data = new FormData(); // هادي هي اللي غنعمرو

    // 1. إضافة البيانات النصية
    Object.keys(eventData).forEach(key => {
      data.append(key, eventData[key]);
    });

    // 2. إضافة الصورة
    if (coverImage.rawFile) {
      data.append('coverImage', coverImage.rawFile);
    }

    // 3. إضافة الـ Organizer
    const user = JSON.parse(localStorage.getItem('user'));
    const organizerId = user?._id || user?.user?._id;

    if (organizerId) {
      data.append('organizer', organizerId);
    } else {
      alert("Session expirée. Veuillez vous reconnecter.");
      return;
    }

    // Console log تصححات (كانت formData دابا ولات data)
    console.log("Données envoyées à l'administration:", data);

    try {
      const response = await axios.post('http://localhost:5000/Event/CreateEvent', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.status === 201 || response.status === 200) {
        alert("Événement créé avec succès ! En attente de validation.");
        if(setActiveTab) setActiveTab('Tableau de Bord');
      }
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
      alert("Erreur lors de l'envoi des données.");
    }
  };

  // ... باقي الـ return (الـ JSX ديالك) هو نيتو ما تبدل والو

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a] text-white">
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <OrgNavbar />
        
        <main className="flex-1 p-8 relative z-10">
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
                
                {/* Title */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Type size={14} className="text-orange-500" /> Titre *
                  </label>
                  <input type="text" name="title" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none focus:border-orange-500/50 transition-all" placeholder="Nom de l'événement" onChange={handleChange} />
                </div>

                {/* Category & Capacity */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Tag size={14} className="text-orange-500" /> Catégorie *
                  </label>
                  <select name="category" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none appearance-none cursor-pointer" onChange={handleChange}>
                    <option value="">Choisir...</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Culturel">Culturel</option>
                    <option value="Sportif">Sportif</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Users size={14} className="text-orange-500" /> Capacité *
                  </label>
                  <input type="number" name="capacity" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none" placeholder="Ex: 50" onChange={handleChange} />
                </div>

                {/* Date & Location */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Calendar size={14} className="text-orange-500" /> Date *
                  </label>
                  <input type="datetime-local" name="date" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none [color-scheme:dark]" onChange={handleChange} />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <MapPin size={14} className="text-orange-500" /> Lieu *
                  </label>
                  <input type="text" name="location" required className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none" placeholder="Ex: Salle 5" onChange={handleChange} />
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FileText size={14} className="text-orange-500" /> Description *
                  </label>
                  <textarea name="description" required rows="4" className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] outline-none resize-none" placeholder="Détails..." onChange={handleChange}></textarea>
                </div>

                {/* Image Upload */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2">
                    <ImageIcon size={14} className="text-orange-500" /> Affiche
                  </label>
                  <div 
                    onClick={() => fileInputRef.current.click()}
                    className="border-2 border-dashed border-white/10 rounded-[2rem] p-8 flex flex-col items-center justify-center cursor-pointer hover:border-orange-500/50 transition-all"
                  >
                    {coverImage.url ? (
                      <img src={coverImage.url} alt="Preview" className="h-32 object-cover rounded-xl" />
                    ) : (
                      <>
                        <ImageIcon className="text-white/20 mb-2" size={32} />
                        <p className="text-sm text-white/40">Cliquez pour ajouter une image</p>
                      </>
                    )}
                    <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                  </div>
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
 

}
export default CreateEvent;