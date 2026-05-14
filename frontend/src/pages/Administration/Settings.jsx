import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Settings, User, Lock, Globe, Save,
  CheckCircle2, X
} from 'lucide-react';
import Sidebare from './components/Sidebare';
import Tobar from './components/Tobar';

const GLASS       = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(15,23,42,0.5)',    borderColor: 'rgba(255,255,255,0.12)' };

const AdminSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

  const [toast, setToast] = useState(null);
  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };
  const handleSave = (e) => { if (e) e.preventDefault(); showToast("Paramètres enregistrés."); };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      {toast && (<div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold animate-in fade-in" style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff' }}>{toast.type === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}{toast.msg}</div>)}
      <Sidebare />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Tobar />

        <div className="p-8 overflow-y-auto flex-1" style={{ background: '#0f172a' }}>
          <div className="max-w-4xl mx-auto"><div className="flex flex-col md:flex-row gap-8"><div className="w-full md:w-56 space-y-1 shrink-0">{[{ key: 'profile', icon: <User size={18}/>, label: 'Mon Profil' }, { key: 'security', icon: <Lock size={18}/>, label: 'Sécurité' }, { key: 'system', icon: <Globe size={18}/>, label: 'Préférences' }].map(({ key, icon, label }) => (<button key={key} onClick={() => setActiveSection(key)} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all text-left border ${activeSection === key ? 'bg-orange-500/10 border-orange-500 text-orange-500' : 'bg-white/5 border-white/5 text-white/40'}`}>{icon} {label}</button>))}</div>
            <div className="flex-1 space-y-6">{activeSection === 'profile' && (<div className="rounded-3xl border p-8 bg-white/5 border-white/10 shadow-xl animate-in fade-in"><h3 className="text-xl font-bold text-white mb-8">Informations</h3><form onSubmit={handleSave} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Nom"><input type="text" className="field-input" style={GLASS_INPUT} defaultValue="Admin UIZ" required/></Field><Field label="Email"><input type="email" className="field-input" style={GLASS_INPUT} defaultValue="admin@uiz.ma" required/></Field></div><Field label="Service"><input type="text" className="field-input" style={GLASS_INPUT} defaultValue="Scolarité"/></Field><SaveBtn label="Sauvegarder" /></form></div>)}
              {activeSection === 'security' && (<div className="rounded-3xl border p-8 bg-white/5 border-white/10 animate-in fade-in"><h3 className="text-xl font-bold text-white mb-8">Sécurité</h3><form onSubmit={handleSave} className="space-y-6"><Field label="Mdp actuel"><input type="password" className="field-input" style={GLASS_INPUT} placeholder="••••" required/></Field><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Field label="Nouveau"><input type="password" className="field-input" style={GLASS_INPUT}/></Field><Field label="Confirmation"><input type="password" className="field-input" style={GLASS_INPUT}/></Field></div><button type="submit" className="px-8 py-3 rounded-xl font-bold text-white bg-red-500 shadow-lg active:scale-95 transition-all outline-none">Mettre à jour</button></form></div>)}
              {activeSection === 'system' && (<div className="rounded-3xl border p-8 bg-white/5 border-white/10 animate-in fade-in"><h3 className="text-xl font-bold text-white mb-8">Préférences</h3><div className="space-y-6"><ToggleRow title="Emails" desc="Demandes reçues par email" defaultChecked /><ToggleRow title="Mode Sombre" desc="Interface dark" defaultChecked /><ToggleRow title="Validation auto" desc="Non recommandé" warning /></div></div>)}</div></div></div>
        </div>
      </main>
      <style>{`.field-input { width: 100%; padding: 12px 16px; border-radius: 12px; font-size: 0.9rem; color: #fff; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); outline: none; transition: border-color 0.2s shadow-sm; } .field-input:focus { border-color: #cd7329; }`}</style>
    </div>
  );
};

const Field = ({ label, children }) => (<div><label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2 ml-1">{label}</label>{children}</div>);
const SaveBtn = ({ label }) => (<button type="submit" className="flex items-center gap-2 text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-xl active:scale-95 transition-all outline-none" style={{ background: '#cd7329' }}><Save size={18}/> {label}</button>);
const NavItem = ({ icon, label, path, active }) => { const navigate = useNavigate(); return ( <div onClick={() => navigate(path)} className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-white/20 text-white font-bold' : 'text-white/70 hover:bg-white/10'}`}> {icon} <span className="text-sm">{label}</span> </div> ); };
const ToggleRow = ({ title, desc, defaultChecked, warning }) => ( <div className="flex items-center justify-between gap-4"> <div> <h4 className="font-bold text-sm text-white">{title}</h4> <p className={`text-xs ${warning ? 'text-amber-500 font-bold' : 'text-white/30'}`}>{desc}</p> </div> <input type="checkbox" defaultChecked={defaultChecked} className="w-11 h-6 rounded-full cursor-pointer accent-orange-500"/> </div> );

export default AdminSettings;