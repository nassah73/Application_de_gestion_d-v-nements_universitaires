import React, { useState } from 'react';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { 
  PlusCircle, 
  Calendar, 
  MapPin, 
  Users, 
  Type, 
  FileText, 
  Tag, 
  Image as ImageIcon,
  Clock,
  Send
} from 'lucide-react';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    categorie: '',
    dateDebut: '',
    dateFin: '',
    lieu: '',
    capaciteMax: '',
    image: null,
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Données envoyées à l'administration:", formData);
    alert("Demande envoyée avec succès ! En attente de validation.");
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
    color: 'white'
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a]">
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <OrgNavbar />
        
        <main className="flex-1 p-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 shadow-lg shadow-orange-500/10">
                  <PlusCircle size={32} className="text-orange-500" />
                </div>
                Créer un Événement <span className="text-orange-500">.</span>
              </h1>
              <p className="text-white/40 mt-4 font-medium max-w-xl">Remplissez les détails pour soumettre votre événement à l'approbation de l'administration.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl shadow-2xl relative overflow-hidden group space-y-10">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-transparent opacity-50"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Titre */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 flex items-center gap-2 uppercase tracking-[0.2em] ml-1">
                    <Type size={14} className="text-orange-500" />
                    Titre de l'événement *
                  </label>
                  <input 
                    type="text" name="titre" required minLength="5" maxLength="100"
                    className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10 font-medium"
                    placeholder="Ex: Conférence sur l'IA et le Futur"
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 flex items-center gap-2 uppercase tracking-[0.2em] ml-1">
                    <FileText size={14} className="text-orange-500" />
                    Description détaillée *
                  </label>
                  <textarea 
                    name="description" required minLength="50" rows="5"
                    className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10 resize-none font-medium"
                    placeholder="Décrivez votre événement en détail (objectifs, public cible, programme...)"
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Catégorie */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 flex items-center gap-2 uppercase tracking-[0.2em] ml-1">
                    <Tag size={14} className="text-orange-500" />
                    Catégorie *
                  </label>
                  <div className="relative group">
                    <select name="categorie" required 
                      className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all appearance-none cursor-pointer font-medium"
                      onChange={handleChange}
                    >
                      <option value="" className="bg-slate-900 text-white/40">Choisir une catégorie...</option>
                      <option value="Culturel" className="bg-slate-900 text-white">Culturel</option>
                      <option value="Sportif" className="bg-slate-900 text-white">Sportif</option>
                      <option value="Scientifique" className="bg-slate-900 text-white">Scientifique</option>
                      <option value="Artistique" className="bg-slate-900 text-white">Artistique</option>
                      <option value="Technologique" className="bg-slate-900 text-white">Technologique</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-orange-500 transition-colors">
                      <PlusCircle size={16} className="rotate-45" />
                    </div>
                  </div>
                </div>

                {/* Capacité Max */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 flex items-center gap-2 uppercase tracking-[0.2em] ml-1">
                    <Users size={14} className="text-orange-500" />
                    Capacité Max *
                  </label>
                  <input 
                    type="number" name="capaciteMax" required min="1" max="5000"
                    className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10 font-medium"
                    placeholder="1-5000"
                    onChange={handleChange}
                  />
                </div>

                {/* Date Début */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 flex items-center gap-2 uppercase tracking-[0.2em] ml-1">
                    <Calendar size={14} className="text-orange-500" />
                    Début *
                  </label>
                  <input 
                    type="datetime-local" name="dateDebut" required
                    className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all font-medium [color-scheme:dark]"
                    onChange={handleChange}
                  />
                </div>

                {/* Date Fin */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-white/40 flex items-center gap-2 uppercase tracking-[0.2em] ml-1">
                    <Clock size={14} className="text-orange-500" />
                    Fin *
                  </label>
                  <input 
                    type="datetime-local" name="dateFin" required
                    className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all font-medium [color-scheme:dark]"
                    onChange={handleChange}
                  />
                </div>

                {/* Lieu */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 flex items-center gap-2 uppercase tracking-[0.2em] ml-1">
                    <MapPin size={14} className="text-orange-500" />
                    Lieu (Salle/Amphi) *
                  </label>
                  <input 
                    type="text" name="lieu" required
                    className="w-full px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.03] text-white outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10 font-medium"
                    placeholder="Ex: Amphi Ibn Zohr, Faculté des Sciences"
                    onChange={handleChange}
                  />
                </div>

                {/* Image */}
                <div className="md:col-span-2 space-y-3">
                  <label className="text-xs font-black text-white/40 flex items-center gap-2 uppercase tracking-[0.2em] ml-1">
                    <ImageIcon size={14} className="text-orange-500" />
                    Image / Poster (Max 5MB)
                  </label>
                  <div className="relative group/upload">
                    <input 
                      type="file" accept="image/png, image/jpeg"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    />
                    <label htmlFor="file-upload" 
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all bg-white/[0.01] border-white/5 hover:border-orange-500/50 hover:bg-orange-500/[0.02] group/label">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover/label:scale-110 group-hover/label:bg-orange-500/10 transition-all duration-500">
                          <ImageIcon className="w-8 h-8 text-white/20 group-hover/label:text-orange-500 transition-colors" />
                        </div>
                        <p className="text-sm text-white/40 font-medium"><span className="font-black text-orange-500 uppercase tracking-wider">Cliquez pour télécharger</span></p>
                        <p className="text-[10px] text-white/20 mt-2 font-black uppercase tracking-widest">PNG, JPG ou JPEG (max. 5MB)</p>
                      </div>
                    </label>
                    {formData.image && (
                      <div className="mt-4 p-4 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                        <p className="text-xs text-green-400 font-bold uppercase tracking-widest">Fichier prêt : {formData.image.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full group/btn relative overflow-hidden bg-orange-500 text-white font-black py-5 px-8 rounded-2xl transition-all duration-500 hover:shadow-[0_20px_40px_rgba(249,115,22,0.3)] hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-xs"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer"></div>
                  <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  Soumettre pour validation
                </button>
                <p className="text-center text-[10px] text-white/20 mt-6 font-black uppercase tracking-[0.3em]">
                  En soumettant, vous acceptez les conditions de l'établissement
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
 
};

export default CreateEvent;
