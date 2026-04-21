import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Edit2, Trash2, Tag, Search, Bell, Settings, LogOut,
  LayoutDashboard, CalendarCheck, Users, Save, X
} from 'lucide-react';

const GLASS = { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' };
const GLASS_INPUT = { background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.12)' };

const EventCategories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Sociale',     count: 42, color: '#cd7329' },
    { id: 2, name: 'Académique',  count: 52, color: '#6366F1' },
    { id: 3, name: 'Sports',      count: 28, color: '#10B981' },
    { id: 4, name: 'Culturel',    count: 35, color: '#F59E0B' },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName]   = useState('');
  const [newColor, setNewColor] = useState('#cd7329');

  const handleAdd = () => {
    if (!newName.trim()) return;
    setCategories(prev => [...prev, { id: Date.now(), name: newName.trim(), count: 0, color: newColor }]);
    setNewName(''); setNewColor('#cd7329'); setIsAdding(false);
  };

  const handleDelete = (id) => setCategories(prev => prev.filter(c => c.id !== id));

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
          <NavItem path="/responsable/categories"    icon={<Tag             size={20}/>} label="Categories"       active />
        </nav>
        <div className="mt-auto p-4 border-t border-white/10 space-y-1 shrink-0">
          <NavItem path="/responsable/settings" icon={<Settings size={20}/>} label="Settings" />
          <NavItem path="/auth/login"           icon={<LogOut   size={20}/>} label="Logout"   />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-8 shrink-0 z-10"
          style={{ background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="relative w-80">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"/>
            <input
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm text-white placeholder-white/30 border outline-none"
              style={GLASS_INPUT}
              placeholder="Search categories..."
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 rounded-full text-white/50" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <Bell size={18}/>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-400 rounded-full"/>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
              style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>A</div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8" style={{ background: '#0f172a' }}>
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Page header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Event Categories</h2>
                <p className="text-sm text-white/40 mt-1">Manage classification for university events</p>
              </div>
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}
              >
                <Plus size={18}/> Add Category
              </button>
            </div>

            {/* Add form */}
            {isAdding && (
              <div className="rounded-2xl border p-6" style={GLASS}>
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-white">New Category</h3>
                  <button onClick={() => setIsAdding(false)} className="text-white/40 hover:text-red-400 transition-colors"><X size={20}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    className="col-span-2 px-4 py-2.5 rounded-lg text-sm text-white placeholder-white/30 border outline-none"
                    style={GLASS_INPUT}
                    placeholder="Category Name (e.g. Workshop)"
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                  />
                  <input type="color" className="w-full h-10 p-1 rounded-lg cursor-pointer border" style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)' }}
                    value={newColor} onChange={e => setNewColor(e.target.value)} />
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <button onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-lg text-sm font-bold text-white/50 hover:text-white transition-colors" style={{ background: 'rgba(255,255,255,0.06)' }}>Cancel</button>
                  <button onClick={handleAdd} className="px-6 py-2 rounded-lg text-sm font-bold text-white flex items-center gap-2 hover:opacity-90 transition-all"
                    style={{ background: 'linear-gradient(135deg,#cd7329,#eb8232)' }}>
                    <Save size={15}/> Save
                  </button>
                </div>
              </div>
            )}

            {/* Categories grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map((cat) => (
                <div key={cat.id} className="rounded-2xl border p-6 transition-all group hover:scale-[1.02]" style={GLASS}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: cat.color }}>
                        <Tag size={22}/>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{cat.name}</h4>
                        <p className="text-xs text-white/35 mt-0.5">{cat.count} events linked</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"><Edit2 size={15}/></button>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={15}/></button>
                    </div>
                  </div>
                  {/* Color band */}
                  <div className="mt-5 h-1 rounded-full opacity-40" style={{ backgroundColor: cat.color }}/>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

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

export default EventCategories;