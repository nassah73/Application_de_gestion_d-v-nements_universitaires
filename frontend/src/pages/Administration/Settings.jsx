import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings, User, Lock, Bell, Globe, Save,
  LayoutDashboard, CalendarCheck, Users, LogOut, Tag, ShieldCheck
} from 'lucide-react';

const GLASS       = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(15,23,42,0.5)',    borderColor: 'rgba(255,255,255,0.12)' };

const AdminSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>

      {/* Sidebar */}
      <aside className="w-64 flex flex-col shrink-0" style={{ background: 'linear-gradient(145deg,rgba(205,115,41,0.95),rgba(168,85,20,0.9))' }}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-black uppercase tracking-wider text-white">UIZ University</h1>
          <p className="text-xs text-white/60 mt-1">Administration</p>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          <NavItem path="/responsable"               icon={<LayoutDashboard size={20}/>} label="Dashboard"        />
          <NavItem path="/responsable/events"        icon={<CalendarCheck   size={20}/>} label="Event Validation" />
          <NavItem path="/responsable/users"         icon={<Users           size={20}/>} label="User Management"  />
          <NavItem path="/responsable/notifications" icon={<Bell            size={20}/>} label="Notifications"    />
          <NavItem path="/responsable/categories"    icon={<Tag             size={20}/>} label="Categories"       />
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0">
          <NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" active />
          <NavItem path="/auth/login"           icon={<LogOut   size={20}/>} label="Logout"   />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 shrink-0"
          style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <h2 className="font-bold text-white">Paramètres du Système</h2>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">Responsable Admin</p>
              <p className="text-[10px] text-white/40 uppercase">Super Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>A</div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 overflow-y-auto" style={{ background: '#0f172a' }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">

              {/* Left menu */}
              <div className="w-full md:w-56 space-y-1 shrink-0">
                {[
                  { key: 'profile',  icon: <User      size={17}/>, label: 'Mon Profil'   },
                  { key: 'security', icon: <Lock      size={17}/>, label: 'Sécurité'     },
                  { key: 'system',   icon: <Globe     size={17}/>, label: 'Préférences'  },
                ].map(({ key, icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left border"
                    style={activeSection === key
                      ? { background: 'rgba(205,115,41,0.15)', borderColor: '#cd7329', color: '#cd7329' }
                      : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)' }}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>

              {/* Right forms */}
              <div className="flex-1 space-y-6">

                {/* Profile */}
                {activeSection === 'profile' && (
                  <div className="rounded-2xl border p-6" style={GLASS}>
                    <h3 className="text-lg font-bold text-white mb-6">Informations Personnelles</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Nom Complet">
                          <input type="text" className="field-input" style={GLASS_INPUT} defaultValue="Responsable UIZ"/>
                        </Field>
                        <Field label="Adresse Email">
                          <input type="email" className="field-input" style={GLASS_INPUT} defaultValue="admin@uiz.ac.ma"/>
                        </Field>
                      </div>
                      <Field label="Département / Service">
                        <input type="text" className="field-input" style={GLASS_INPUT} defaultValue="Service Scolarité / Activités Estudiantines"/>
                      </Field>
                      <SaveBtn label="Enregistrer les changements"/>
                    </div>
                  </div>
                )}

                {/* Security */}
                {activeSection === 'security' && (
                  <div className="rounded-2xl border p-6" style={GLASS}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(205,115,41,0.15)', color: '#cd7329' }}>
                        <ShieldCheck size={18}/>
                      </div>
                      <h3 className="text-lg font-bold text-white">Sécurité du compte</h3>
                    </div>
                    <div className="space-y-4">
                      <Field label="Mot de passe actuel">
                        <input type="password" className="field-input" style={GLASS_INPUT} placeholder="••••••••"/>
                      </Field>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field label="Nouveau mot de passe">
                          <input type="password" className="field-input" style={GLASS_INPUT} placeholder="••••••••"/>
                        </Field>
                        <Field label="Confirmer le mot de passe">
                          <input type="password" className="field-input" style={GLASS_INPUT} placeholder="••••••••"/>
                        </Field>
                      </div>
                      <button className="mt-4 px-6 py-2.5 rounded-lg font-bold text-sm text-white bg-red-500 hover:bg-red-600 transition-all">
                        Mettre à jour le mot de passe
                      </button>
                    </div>
                  </div>
                )}

                {/* Preferences */}
                {activeSection === 'system' && (
                  <div className="rounded-2xl border p-6" style={GLASS}>
                    <h3 className="text-lg font-bold text-white mb-6">Préférences du Système</h3>
                    <div className="space-y-5">
                      <ToggleRow
                        title="Notifications par Email"
                        desc="Recevoir un email pour chaque nouvelle demande d'organisateur"
                        defaultChecked
                      />
                      <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}/>
                      <ToggleRow
                        title="Validation automatique"
                        desc="Activer l'approbation automatique des événements (Non recommandé)"
                        warning
                      />
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global style for form inputs */}
      <style>{`
        .field-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.875rem;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.12);
          outline: none;
          transition: border-color 0.2s;
        }
        .field-input:focus { border-color: #cd7329; }
        .field-input::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
};

/* ── helpers ── */
const Field = ({ label, children }) => (
  <div>
    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">{label}</label>
    {children}
  </div>
);

const SaveBtn = ({ label }) => (
  <button className="flex items-center gap-2 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-all mt-2"
    style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>
    <Save size={16}/> {label}
  </button>
);

const ToggleRow = ({ title, desc, defaultChecked, warning }) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <h4 className="font-bold text-sm text-white">{title}</h4>
      <p className={`text-xs mt-0.5 ${warning ? 'text-amber-400' : 'text-white/40'}`}>{desc}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer"/>
      <div className="w-11 h-6 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"
        style={{ background: 'rgba(255,255,255,0.15)' }}
      />
    </label>
  </div>
);

const NavItem = ({ icon, label, path, active = false }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => path && navigate(path)}
      className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all"
      style={active ? { background: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700 } : { color: 'rgba(255,255,255,0.75)' }}
      onMouseEnter={e => !active && (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
      onMouseLeave={e => !active && (e.currentTarget.style.background = 'transparent')}
    >
      {icon} <span className="text-sm">{label}</span>
    </div>
  );
};

export default AdminSettings;