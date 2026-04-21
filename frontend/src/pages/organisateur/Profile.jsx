import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Building, ShieldCheck, Camera, Edit3, Save, X } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Club Informatique',
    department: 'Faculté Polydisciplinaire de Taroudant',
    role: 'Organisateur Officiel',
    email: 'contact.clubinfo@uiz.ac.ma',
    phone: '+212 6 00 00 00 00',
    location: 'Bureau 12, Bâtiment B',
    description: "Le Club Informatique de la FP Taroudant a pour objectif de partager la passion des nouvelles technologies, d'organiser des ateliers pratiques (workshops), des hackathons et des rencontres avec des professionnels du secteur IT. Nous visons l'excellence et l'apprentissage par la pratique."
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      
      {/* Cover and Avatar Section */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden relative">
        <div 
          className="h-48 relative bg-cover bg-center transition-all"
          style={{ backgroundImage: coverPreview ? `url(${coverPreview})` : 'linear-gradient(to right, #fb923c, #f59e0b)' }}
        >
          <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setCoverPreview)} />
          <button 
            onClick={() => coverInputRef.current.click()}
            className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Camera size={16} /> Changer la couverture
          </button>
        </div>
        
        <div className="px-10 pb-10 relative">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-end -mt-16 mb-8">
            <div className="relative group">
              <div 
                className="w-32 h-32 rounded-3xl bg-slate-900 border-4 border-white shadow-xl flex items-center justify-center text-white text-5xl font-black bg-cover bg-center"
                style={avatarPreview ? { backgroundImage: `url(${avatarPreview})` } : {}}
              >
                {!avatarPreview && 'C'}
              </div>
              <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, setAvatarPreview)} />
              <button 
                onClick={() => avatarInputRef.current.click()}
                className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2.5 rounded-xl shadow-lg hover:bg-orange-600 transition-colors cursor-pointer"
              >
                <Camera size={18} />
              </button>
            </div>
            
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2 mt-16 md:mt-0">
                  <input type="text" name="name" value={profileData.name} onChange={handleInputChange} className="text-3xl font-black text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 w-full focus:outline-none focus:border-orange-500" />
                  <input type="text" name="department" value={profileData.department} onChange={handleInputChange} className="text-slate-500 font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 w-full focus:outline-none focus:border-orange-500" />
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-black text-slate-900">{profileData.name}</h2>
                  <p className="text-slate-500 font-medium flex items-center gap-2 mt-1">
                    <Building size={16} /> {profileData.department}
                  </p>
                </>
              )}
            </div>
            
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button onClick={() => setIsEditing(false)} className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors cursor-pointer">
                    <X size={18} /> Annuler
                  </button>
                  <button onClick={() => setIsEditing(false)} className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-colors shadow-lg cursor-pointer">
                    <Save size={18} /> Enregistrer
                  </button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg cursor-pointer">
                  <Edit3 size={18} /> Éditer le profil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left column - About */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-orange-500" /> À propos
            </h3>
            
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rôle</p>
                {isEditing ? (
                  <input type="text" name="role" value={profileData.role} onChange={handleInputChange} className="text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:border-orange-500" />
                ) : (
                  <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" /> {profileData.role}
                  </p>
                )}
              </div>
              
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Email de contact</p>
                {isEditing ? (
                  <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:border-orange-500" />
                ) : (
                  <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" /> {profileData.email}
                  </p>
                )}
              </div>
              
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Téléphone</p>
                {isEditing ? (
                  <input type="text" name="phone" value={profileData.phone} onChange={handleInputChange} className="text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:border-orange-500" />
                ) : (
                  <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Phone size={16} className="text-slate-400" /> {profileData.phone}
                  </p>
                )}
              </div>
              
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Localisation</p>
                {isEditing ? (
                  <input type="text" name="location" value={profileData.location} onChange={handleInputChange} className="text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 w-full focus:outline-none focus:border-orange-500" />
                ) : (
                  <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" /> {profileData.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Settings or Bio */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-4">Description du Club</h3>
            {isEditing ? (
              <textarea 
                name="description" 
                value={profileData.description} 
                onChange={handleInputChange} 
                rows="4"
                className="w-full text-slate-500 leading-relaxed text-sm bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-orange-500"
              />
            ) : (
              <p className="text-slate-500 leading-relaxed text-sm mb-6 whitespace-pre-wrap">
                {profileData.description}
              </p>
            )}
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-3xl font-black text-orange-500 mb-1">12</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Événements organisés</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <p className="text-3xl font-black text-orange-500 mb-1">850+</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Participants globaux</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
