import React, { useState } from 'react';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { User, Mail, Lock, Save, ShieldCheck } from 'lucide-react';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@uiz.ac.ma',
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const updateInfo = (e) => {
    e.preventDefault();
    setMessage({ type: 'success', text: 'Informations mises à jour avec succès !' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }
    setMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      <OrgSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <OrgNavbar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white uppercase tracking-tight">Mon Profil</h1>
              <p className="text-white/40 mt-1">Gérez vos informations personnelles et votre sécurité.</p>
            </div>
            
            {message.text && (
              <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 border ${
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
              <div className="p-6 rounded-2xl border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <User size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Informations</h2>
                </div>
                
                <form onSubmit={updateInfo} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase mb-2 ml-1">Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={userInfo.nom}
                      onChange={handleInfoChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase mb-2 ml-1">Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={userInfo.prenom}
                      onChange={handleInfoChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase mb-2 ml-1">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                      <input
                        type="email"
                        value={userInfo.email}
                        disabled
                        className="w-full bg-white/5 border border-white/5 rounded-xl p-3 pl-11 text-white/30 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-all hover:shadow-[0_0_20px_rgba(205,115,41,0.3)]"
                  >
                    <Save size={18} /> Mettre à jour
                  </button>
                </form>
              </div>

              {/* Sécurité */}
              <div className="p-6 rounded-2xl border"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
                  <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                    <Lock size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Sécurité</h2>
                </div>

                <form onSubmit={updatePassword} className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase mb-2 ml-1">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div className="h-px bg-white/5 my-2"></div>
                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase mb-2 ml-1">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-white/40 uppercase mb-2 ml-1">Confirmation</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
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
