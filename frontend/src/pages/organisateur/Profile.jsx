import React, { useState, useEffect } from 'react';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { User, Mail, Lock, Save, ShieldCheck, Phone, Home } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    nomClub: '',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const organizerId = user._id || user.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!organizerId) return;
        const res = await axios.get(`http://localhost:5000/api/organisateurs/profile/${organizerId}`);
        setUserInfo({
          nom: res.data.nom || '',
          prenom: res.data.prenom || '',
          email: res.data.email || '',
          telephone: res.data.telephone || '',
          nomClub: res.data.nomClub || '',
        });
      } catch (error) {
        console.error("Erreur lors de la récupération du profil:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [organizerId]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const updateInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/organisateurs/profile/${organizerId}`, userInfo);
      
      // Mettre à jour le localStorage si nécessaire (le nom affiché par exemple)
      const updatedUser = { ...user, displayName: `${userInfo.prenom} ${userInfo.nom}` };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setMessage({ type: 'success', text: res.data.message });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Erreur lors de la mise à jour' });
    }
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/organisateurs/profile/${organizerId}`, {
        ...userInfo,
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      setMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Erreur lors du changement de mot de passe' });
    }
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f172a]">
        <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
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
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white uppercase tracking-tight">Mon Profil <span className="text-orange-500">.</span></h1>
              <p className="text-white/40 mt-1">Gérez vos informations personnelles et votre sécurité.</p>
            </div>
            
            {message.text && (
              <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 border animate-in fade-in slide-in-from-top-2 duration-300 ${
                message.type === 'success' 
                  ? 'bg-green-400/10 border-green-400/20 text-green-400' 
                  : 'bg-red-400/10 border-red-400/20 text-red-400'
              }`}>
                {message.type === 'success' ? <ShieldCheck size={20} /> : <Lock size={20} />}
                <span className="font-bold text-sm">{message.text}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Informations Personnelles */}
              <div className="p-8 rounded-[2rem] border"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                    <User size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-tight">Informations</h2>
                </div>
                
                <form onSubmit={updateInfo} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase mb-2 ml-1 tracking-widest">Prénom</label>
                      <input
                        type="text"
                        name="prenom"
                        value={userInfo.prenom}
                        onChange={handleInfoChange}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-orange-500/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase mb-2 ml-1 tracking-widest">Nom</label>
                      <input
                        type="text"
                        name="nom"
                        value={userInfo.nom}
                        onChange={handleInfoChange}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-orange-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase mb-2 ml-1 tracking-widest">Nom du Club / Organisation</label>
                    <div className="relative">
                      <Home size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input
                        type="text"
                        name="nomClub"
                        value={userInfo.nomClub}
                        onChange={handleInfoChange}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 pl-12 text-white outline-none focus:border-orange-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase mb-2 ml-1 tracking-widest">Téléphone</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input
                        type="text"
                        name="telephone"
                        value={userInfo.telephone}
                        onChange={handleInfoChange}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 pl-12 text-white outline-none focus:border-orange-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase mb-2 ml-1 tracking-widest">Email Académique</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input
                        type="email"
                        value={userInfo.email}
                        disabled
                        className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-4 pl-12 text-white/20 cursor-not-allowed italic"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-orange-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                  >
                    <Save size={18} /> Mettre à jour le profil
                  </button>
                </form>
              </div>

              {/* Sécurité */}
              <div className="p-8 rounded-[2rem] border"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                  <div className="p-3 bg-orange-500/10 rounded-xl text-orange-400 border border-orange-500/20">
                    <Lock size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-tight">Sécurité</h2>
                </div>

                <form onSubmit={updatePassword} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase mb-2 ml-1 tracking-widest">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                  <div className="h-px bg-white/5 my-2"></div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase mb-2 ml-1 tracking-widest">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase mb-2 ml-1 tracking-widest">Confirmation</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white outline-none focus:border-orange-500/50 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-white/5 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 border border-white/10 transition-all active:scale-95"
                  >
                    Changer le mot de passe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
