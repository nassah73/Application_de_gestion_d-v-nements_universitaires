import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  User, Lock, Save,
  CheckCircle2, X
} from 'lucide-react';
import Sidebare from './components/Sidebare';
import Tobar from './components/Tobar';

const GLASS       = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(15,23,42,0.5)',    borderColor: 'rgba(255,255,255,0.12)' };

const AdminSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileForm, setProfileForm] = useState({ prenom: '', nom: '', telephone: '', email: '' });
  const [securityForm, setSecurityForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
          navigate('/login');
          return;
        }
        const user = JSON.parse(userStr);
        const response = await fetch(`http://localhost:5000/api/administrateur/administration/${user._id}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setProfileForm({
            prenom: data.prenom || '',
            nom: data.nom || '',
            telephone: data.telephone || '',
            email: data.email || ''
          });
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const response = await fetch(`http://localhost:5000/api/administrateur/administration/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });

      if (response.ok) {
        showToast("Paramètres enregistrés avec succès !");
        const updatedUser = { ...JSON.parse(userStr), ...profileForm, displayName: `${profileForm.prenom} ${profileForm.nom}` };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        showToast("Erreur lors de la sauvegarde", "error");
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      showToast("Erreur lors de la sauvegarde", "error");
    }
  };

  const handleSecuritySave = async (e) => {
    e.preventDefault();
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      showToast("Les mots de passe ne correspondent pas", "error");
      return;
    }
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return;
      const user = JSON.parse(userStr);
      const response = await fetch(`http://localhost:5000/api/administrateur/administration/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: securityForm.newPassword })
      });

      if (response.ok) {
        showToast("Mot de passe mis à jour avec succès !");
        setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        showToast("Erreur lors de la mise à jour", "error");
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      showToast("Erreur lors de la mise à jour", "error");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen" style={{ background: '#0f172a' }}><div className="text-white">Chargement...</div></div>;
  }

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      {toast && (<div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold animate-in fade-in" style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff' }}>{toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}{toast.msg}</div>)}
      <Sidebare />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Tobar />

        <div className="p-8 overflow-y-auto flex-1" style={{ background: '#0f172a' }}>
          <div className="max-w-4xl mx-auto"><div className="flex flex-col md:flex-row gap-8"><div className="w-full md:w-56 space-y-1 shrink-0">{[{ key: 'profile', icon: <User size={18}/>, label: 'Mon Profil' }, { key: 'security', icon: <Lock size={18}/>, label: 'Sécurité' }].map(({ key, icon, label }) => (<button key={key} onClick={() => setActiveSection(key)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left border ${activeSection === key ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-white/5 border-white/5 text-white/40'}`}>{icon} {label}</button>))}</div>
            <div className="flex-1 space-y-6">{activeSection === 'profile' && (<div className="rounded-3xl border p-8 bg-white/5 border-white/10 shadow-xl animate-in fade-in"><h3 className="text-xl font-bold text-white mb-8">Informations</h3><form onSubmit={handleProfileSave} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Prénom"><input type="text" className="field-input" style={GLASS_INPUT} value={profileForm.prenom} onChange={(e) => setProfileForm({ ...profileForm, prenom: e.target.value })} required/></Field><Field label="Nom"><input type="text" className="field-input" style={GLASS_INPUT} value={profileForm.nom} onChange={(e) => setProfileForm({ ...profileForm, nom: e.target.value })} required/></Field></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Téléphone"><input type="text" className="field-input" style={GLASS_INPUT} value={profileForm.telephone} onChange={(e) => setProfileForm({ ...profileForm, telephone: e.target.value })} required/></Field><Field label="Email"><input type="email" className="field-input" style={GLASS_INPUT} value={profileForm.email} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} required/></Field></div><SaveBtn label="Sauvegarder" /></form></div>)}
              {activeSection === 'security' && (<div className="rounded-3xl border p-8 bg-white/5 border-white/10 animate-in fade-in"><h3 className="text-xl font-bold text-white mb-8">Sécurité</h3><form onSubmit={handleSecuritySave} className="space-y-6"><Field label="Mdp actuel"><input type="password" className="field-input" style={GLASS_INPUT} placeholder="••••" value={securityForm.currentPassword} onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })} required/></Field><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Nouveau"><input type="password" className="field-input" style={GLASS_INPUT} value={securityForm.newPassword} onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })} required/></Field><Field label="Confirmation"><input type="password" className="field-input" style={GLASS_INPUT} value={securityForm.confirmPassword} onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })} required/></Field></div><button type="submit" className="px-8 py-3 rounded-xl font-bold text-white bg-red-500 shadow-lg active:scale-95 transition-all outline-none">Mettre à jour</button></form></div>)}</div></div></div>
        </div>
      </main>
      <style>{`.field-input { width: 100%; padding: 12px 16px; border-radius: 12px; font-size: 0.9rem; color: #fff; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); outline: none; transition: border-color 0.2s shadow-sm; } .field-input:focus { border-color: #cd7329; }`}</style>
    </div>
  );
};

const Field = ({ label, children }) => (<div><label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 ml-1">{label}</label>{children}</div>);
const SaveBtn = ({ label }) => (<button type="submit" className="flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-xl active:scale-95 transition-all outline-none" style={{ background: '#cd7329' }}><Save size={18}/> {label}</button>);
const NavItem = ({ icon, label, path, active }) => { const navigate = useNavigate(); return ( <div onClick={() => navigate(path)} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/20 text-white font-bold' : 'text-white/70 hover:bg-white/10'}`}> {icon} <span className="text-sm">{label}</span> </div> ); };

export default AdminSettings;