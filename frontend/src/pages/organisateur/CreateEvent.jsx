import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Type, Users, Calendar, MapPin, CheckCircle, 
  Sparkles, X, Upload, Globe, AlignLeft, ChevronDown 
} from 'lucide-react';
import axios from 'axios';

const CreateEvent = ({ setActiveTab }) => {
    const [eventData, setEventData] = useState({
        title: '',
        category: 'Informatique', // Default value
        capacity: '',
        date: '',
        location: '',
        registrationLink: '',
        description: ''
    });

    const [coverImage, setCoverImage] = useState({ url: null, rawFile: null });
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleFile = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setCoverImage({ 
                url: e.target.result,
                rawFile: file 
            });
        };
        reader.readAsDataURL(file);
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // 1. نزيدو البيانات العادية
    Object.keys(eventData).forEach(key => {
        data.append(key, eventData[key]);
    });

    // 2. نزيدو التصويرة إيلا كانت
    if (coverImage.rawFile) {
        data.append('coverImage', coverImage.rawFile);
    }

    // 3. نزيدو الـ Organizer (هنا فين كان الخلل)
    const user = JSON.parse(localStorage.getItem('user'));
    
    // تأكدنا بلي كنجبدو الـ ID الصحيح كيفما كان الشكل ديال الـ User Object
    const organizerId = user?._id || user?.user?._id;

    if (organizerId) {
        data.append('organizer', organizerId);
        console.log("Organizer ID appended:", organizerId);
    } else {
        alert("Session expirée. Veuillez vous reconnecter.");
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/Event/CreateEvent', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response.status === 201 || response.status === 200) {
            alert("Événement créé avec succès!");
            setActiveTab('Tableau de Bord');
        }
    } catch (error) {
        console.error("Erreur Backend:", error.response?.data || error.message);
        alert("Erreur lors de l'envoi.");
    }
};

    return (
        <div className="bg-slate-900 min-h-screen p-6 md:p-12 text-white relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90 z-0"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#cd7329]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto relative z-10">
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#cd7329]/20 rounded-lg text-[#cd7329]"><Sparkles size={20} /></div>
                        <span className="text-[#cd7329] text-xs font-black uppercase tracking-[0.3em]">Portail Organisateur</span>
                    </div>
                    <h1 className="text-4xl font-bold">Créer un événement</h1>
                </div>

                <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-8 md:p-10 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="text-xs font-bold text-[#cd7329] uppercase mb-3 block">Titre de l'événement</label>
                                <div className="relative">
                                    <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input name="title" onChange={handleChange} required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#cd7329] outline-none transition-all font-bold text-lg" placeholder="Nom de l'événement..." />
                                </div>
                            </div>

                            {/* التعديل الجديد: Category Select */}
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Catégorie</label>
                                <div className="relative">
                                    <select 
                                        name="category" 
                                        value={eventData.category}
                                        onChange={handleChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-10 focus:border-[#cd7329] outline-none appearance-none font-bold cursor-pointer transition-all"
                                    >
                                        <option className="bg-slate-900" value="Informatique">Informatique</option>
                                        <option className="bg-slate-900" value="Science">Science</option>
                                        <option className="bg-slate-900" value="Sport">Sport</option>
                                        <option className="bg-slate-900" value="Culturel">Culturel</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Capacité</label>
                                <div className="relative">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input name="capacity" onChange={handleChange} required type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#cd7329] outline-none transition-all font-bold" placeholder="Nombre max" />
                                </div>
                            </div>
                        </div>

                        {/* Date & Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Date & Heure</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input name="date" onChange={handleChange} required type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#cd7329] outline-none font-bold select-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Lieu</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input name="location" onChange={handleChange} required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#cd7329] outline-none font-bold" placeholder="Salle / Faculté" />
                                </div>
                            </div>
                        </div>

                        {/* Image & Link */}
                        <div className="space-y-6 pt-6 border-t border-white/5">
                            <div className="relative">
                                <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Lien d'inscription (Optionnel)</label>
                                <Globe className="absolute left-4 bottom-4 text-slate-500" size={18} />
                                <input name="registrationLink" onChange={handleChange} type="url" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#cd7329] outline-none font-bold" placeholder="https://..." />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Affiche de l'événement</label>
                                {!coverImage.url ? (
                                    <div 
                                        onClick={() => fileInputRef.current.click()}
                                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                        onDragLeave={() => setDragOver(false)}
                                        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                                        className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer ${dragOver ? 'border-[#cd7329] bg-[#cd7329]/5' : 'border-white/10 hover:bg-white/5 hover:border-white/20'}`}
                                    >
                                        <Upload className="text-[#cd7329] mb-3" size={32} />
                                        <p className="font-bold text-slate-400">Cliquez ou glissez l'affiche</p>
                                        <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
                                    </div>
                                ) : (
                                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-lg group">
                                        <img src={coverImage.url} className="w-full h-48 object-cover" alt="Preview" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button type="button" onClick={() => setCoverImage({url: null, rawFile: null})} className="p-3 bg-red-500 rounded-2xl hover:scale-110 transition-transform"><X size={20}/></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="pt-6 border-t border-white/5">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-3 block">Description</label>
                            <textarea name="description" onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[120px] outline-none focus:border-[#cd7329] transition-all font-medium" placeholder="Détails de l'événement..."></textarea>
                        </div>

                        {/* Buttons */}
                        <div className="pt-8 flex flex-col sm:flex-row gap-4">
                            <button type="submit" className="flex-[2] bg-gradient-to-r from-[#cd7329] to-[#eb8232] py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-[#cd7329]/20 hover:scale-[1.02] transition-transform active:scale-95">
                                Publier l'événement <CheckCircle size={20} />
                            </button>
                            <button type="button" onClick={() => setActiveTab('Tableau de Bord')} className="flex-1 bg-white/5 border border-white/10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all">
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateEvent;