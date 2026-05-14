import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import eventService from '../services/eventService';

import axios from 'axios';

const EditEventRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
    capacity: '',
    registrationLink: '',
    coverImage: null,
    needsHelp: 'no',
    rejectionReason: ''
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch event data and categories in parallel
        const [eventRes, categoriesRes] = await Promise.all([
          eventService.getEventById(id),
          axios.get('http://localhost:5000/api/categories')
        ]);

        const data = eventRes;
        setCategories(categoriesRes.data);
        
        setFormData({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          date: data.date ? new Date(data.date).toISOString().slice(0, 16) : '',
          location: data.location || '',
          capacity: data.capacity || '',
          registrationLink: data.registrationLink || '',
          needsHelp: data.needsHelp || 'no',
          rejectionReason: data.rejectionReason || '',
          coverImage: null
        });
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('category', formData.category);
      data.append('date', formData.date);
      data.append('location', formData.location);
      data.append('capacity', formData.capacity);
      data.append('registrationLink', formData.registrationLink);
      data.append('needsHelp', formData.needsHelp);
      if (formData.coverImage) {
        data.append('coverImage', formData.coverImage);
      }

      await eventService.updateEvent(id, data);
      alert("Votre événement a été mis à jour et est en attente de validation !");
      navigate('/organisateur/events');
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la modification.");
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.1)',
    color: 'white'
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a] items-center justify-center">
        <div className="text-orange-500 animate-spin"><Clock size={48} /></div>
      </div>
    );
  }

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
              <p className="text-white/40 mt-1">Modifiez les détails de votre événement pour validation.</p>
            </div>

            {formData.rejectionReason && (
              <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="text-orange-500 shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-orange-500 font-bold uppercase text-xs tracking-widest mb-1">Message de l'administration</h4>
                  <p className="text-white/80 text-sm">{formData.rejectionReason}</p>
                </div>
              </div>
            )}
            
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
                    type="text" name="title" required value={formData.title}
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
                  <select name="category" required value={formData.category}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all appearance-none"
                    style={inputStyle}
                    onChange={handleChange}
                  >
                    <option value="" disabled className="bg-slate-900">Choisir une catégorie</option>
                    {categories.map((cat) => (
                      <option key={cat._id || cat} value={cat.name || cat} className="bg-slate-900 text-white">
                        {cat.name || cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Capacité */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <Users size={16} className="text-orange-500" />
                    Capacité Max *
                  </label>
                  <input 
                    type="number" name="capacity" required value={formData.capacity}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all"
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <Calendar size={16} className="text-orange-500" />
                    Date et Heure *
                  </label>
                  <input 
                    type="datetime-local" name="date" required value={formData.date}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all"
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Lieu */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <MapPin size={16} className="text-orange-500" />
                    Lieu (Salle/Amphi) *
                  </label>
                  <input 
                    type="text" name="location" required value={formData.location}
                    className="w-full px-4 py-3 rounded-xl border outline-none focus:border-orange-500 transition-all"
                    style={inputStyle}
                    onChange={handleChange}
                  />
                </div>

                {/* Registration Link */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-white/60 flex items-center gap-2 uppercase tracking-wider">
                    <Type size={16} className="text-orange-500" />
                    Lien d'inscription (Optionnel)
                  </label>
                  <input 
                    type="url" name="registrationLink" value={formData.registrationLink}
                    placeholder="https://example.com"
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
                      type="file" accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                      id="file-upload"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload" 
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-all hover:bg-white/5 border-white/10 hover:border-orange-500/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-8 h-8 mb-3 text-white/20 group-hover:text-orange-500" />
                        <p className="text-sm text-white/40"><span className="font-bold text-orange-500">Cliquez pour changer</span> ou glisser-déposer</p>
                        <p className="text-xs text-white/20 mt-1">PNG, JPG ou WEBP (max. 5MB)</p>
                      </div>
                    </label>
                    {formData.coverImage && (
                      <p className="mt-2 text-sm text-green-400 font-medium">Nouveau fichier: {formData.coverImage.name}</p>
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
