import React, { useState } from 'react';
import OrgSidebar from './components/OrgSidebar';
import OrgNavbar from './components/OrgNavbar';
import { User, Mail, Lock, Save } from 'lucide-react';

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
    // Simulation d'API
    setMessage({ type: 'success', text: 'Informations mises à jour avec succès !' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'Les nouveaux mots de passe ne correspondent pas.' });
      return;
    }
    // Simulation d'API
    setMessage({ type: 'success', text: 'Mot de passe modifié avec succès !' });
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <OrgSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <OrgNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Mon Profil</h1>
            
            {message.text && (
              <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations Personnelles */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6 border-b pb-2">
                  <User className="text-blue-500" size={20} />
                  <h2 className="text-xl font-bold text-gray-800">Informations Personnelles</h2>
                </div>
                <form onSubmit={updateInfo} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={userInfo.nom}
                      onChange={handleInfoChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={userInfo.prenom}
                      onChange={handleInfoChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Mail size={14} /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      disabled
                      className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md p-2 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1 italic">L'email ne peut pas être modifié.</p>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    <Save size={18} /> Enregistrer les modifications
                  </button>
                </form>
              </div>

              {/* Sécurité / Mot de passe */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6 border-b pb-2">
                  <Lock className="text-orange-500" size={20} />
                  <h2 className="text-xl font-bold text-gray-800">Sécurité</h2>
                </div>
                <form onSubmit={updatePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwords.newPassword}
                      onChange={handlePasswordChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwords.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-black transition font-medium"
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
