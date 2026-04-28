import React, { useState } from 'react';
import OrgSidebar from '../components/OrgSidebar';
import OrgNavbar from '../components/OrgNavbar';
import { 
  Edit3, 
  Calendar, 
  MapPin, 
  Users, 
  Type, 
  FileText, 
  Tag, 
  Image as ImageIcon,
  Clock,
  Save,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EditEventRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: 'Conférence sur l\'IA', // Example data
    description: 'Une conférence passionnante sur le futur de l\'intelligence artificielle...',
    categorie: 'Scientifique',
    dateDebut: '2024-06-15T09:00',
    dateFin: '2024-06-15T17:00',
    lieu: 'Amphi Ibn Zohr',
    capaciteMax: '200',
    image: null,
    tags: 'IA, Technologie'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Modification envoyée pour validation:", formData);
    alert("Votre demande de modification a été envoyée avec succès !");
    navigate('/organisateur/events');
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
    color: 'white'
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <OrgNavbar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate(-1)}
              className="mb-6 flex items-center gap-2 text-white/40 hover:text-orange-500 transition-colors uppercase text-xs font-black tracking-widest"
            >
              <ArrowLeft size={16} />
              Retour
            </button>

            <div className="mb-8">
              <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                <Edit3 size={32} className="text-orange-500" />
                Modifier l'Événement
              </h1>
              <p className="text-white/40 mt-1">Modifiez les détails. Toute modification nécessite une nouvelle validation par l'administration.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl border space-y-8" 
              style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Titre */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <Type size={16} className="text-orange-500" />
                    Titre de l'événement *
                  </label>
                  <input 
                    type="text" name="titre" required value={formData.titre}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all"
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <FileText size={16} className="text-orange-500" />
                    Description détaillée *
                  </label>
                  <textarea 
                    name="description" required rows="4" value={formData.description}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all resize-none"
                    style={inputStyle}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Catégorie */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <Tag size={16} className="text-orange-500" />
                    Catégorie *
                  </label>
                  <select name="categorie" required value={formData.categorie}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all appearance-none"
                    style={inputStyle}
                    onChange={handleChange}
                  >
                    <option value="Culturel" className="bg-slate-900 text-white">Culturel</option>
                    <option value="Sportif" className="bg-slate-900 text-white">Sportif</option>
                    <option value="Scientifique" className="bg-slate-900 text-white">Scientifique</option>
                  </select>
                </div>

                {/* Capacité Max */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <Users size={16} className="text-orange-500" />
                    Capacité Max *
                  </label>
                  <input 
                    type="number" name="capaciteMax" required value={formData.capaciteMax}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all"
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Date Début */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <Calendar size={16} className="text-orange-500" />
                    Date et Heure de début *
                  </label>
                  <input 
                    type="datetime-local" name="dateDebut" required value={formData.dateDebut}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all"
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Date Fin */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <Clock size={16} className="text-orange-500" />
                    Date et Heure de fin *
                  </label>
                  <input 
                    type="datetime-local" name="dateFin" required value={formData.dateFin}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all"
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Lieu */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <MapPin size={16} className="text-orange-500" />
                    Lieu (Salle/Amphi) *
                  </label>
                  <input 
                    type="text" name="lieu" required value={formData.lieu}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all"
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Image */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <ImageIcon size={16} className="text-orange-500" />
                    Modifier l'Image / Poster
                  </label>
                  <div className="relative group">
                    <input 
                      type="file" accept="image/png, image/jpeg"
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                    />
                    <label htmlFor="file-upload" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:bg-white/5 border-white/10 hover:border-orange-500/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-3 text-white/20 group-hover:text-orange-500" />
                        <p className="text-sm text-white/40"><span className="font-bold text-orange-500">Cliquez pour changer</span> ou glisser-déposer</p>
                        <p className="text-xs text-white/20 mt-1">PNG, JPG ou JPEG (max. 5MB)</p>
                      </div>
                    </label>
                    {formData.image && (
                      <p className="mt-2 text-sm text-green-400 font-medium">Nouveau fichier: {formData.image.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black py-4 px-6 rounded-2xl hover:shadow-[0_0_20px_rgba(205,115,41,0.4)] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                >
                  <Save size={18} />
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditEventRequest;
