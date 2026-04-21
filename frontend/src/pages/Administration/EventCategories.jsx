import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Tag, Search, Bell, Settings, LogOut, 
  LayoutDashboard, CalendarCheck, Users, Save, X 
} from 'lucide-react';

const EventCategories = () => {
  // بيانات الأصناف الموجودة
  const [categories, setCategories] = useState([
    { id: 1, name: 'Science & Technology', count: 42, color: '#1E3A8A' },
    { id: 2, name: 'Academic', count: 52, color: '#6366F1' },
    { id: 3, name: 'Sports', count: 28, color: '#10B981' },
    { id: 4, name: 'Cultural', count: 35, color: '#F59E0B' },
  ]);

  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar - Reusable */}
      <aside className="w-64 bg-[#1E3A8A] text-white flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold uppercase tracking-wider">UIZ University</h1>
          <p className="text-xs text-blue-200">Event Management</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem icon={<CalendarCheck size={20} />} label="Event Validation" />
          <NavItem icon={<Users size={20} />} label="User Management" />
          <NavItem icon={<Bell size={20} />} label="Notifications" />
          {/* هاد الصفحة نقدرو نعتبروها جزء من الإعدادات أو الإدارة */}
          <NavItem icon={<Tag size={20} />} label="Categories" active />
        </nav>
        <div className="p-4 border-t border-blue-800 space-y-2">
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="bg-white h-16 border-b flex items-center justify-between px-8 shrink-0 z-10">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search size={18} />
            </span>
            <input className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search categories..." />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">U</div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Event Categories</h2>
                <p className="text-sm text-slate-500">Manage classification for university events</p>
              </div>
              <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center gap-2 bg-[#1E3A8A] text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-900 transition-all shadow-md"
              >
                <Plus size={20} />
                Add New Category
              </button>
            </div>

            {/* Form لإضافة صنف جديد (كيبان غير فاش كتكليكي على الزر) */}
            {isAdding && (
              <div className="bg-white border-2 border-blue-100 rounded-xl p-6 shadow-lg animate-in fade-in slide-in-from-top-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">Add New Category</h3>
                  <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-red-500"><X size={20} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input className="col-span-1 md:col-span-2 px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Category Name (e.g. Workshop)" />
                  <input type="color" className="w-full h-10 p-1 border border-slate-200 rounded-lg cursor-pointer" defaultValue="#1E3A8A" />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold" onClick={() => setIsAdding(false)}>Cancel</button>
                  <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg text-sm font-bold hover:bg-emerald-600 flex items-center gap-2">
                    <Save size={16} /> Save Category
                  </button>
                </div>
              </div>
            )}

            {/* List of Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: cat.color }}>
                        <Tag size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{cat.name}</h4>
                        <p className="text-xs text-slate-400">{cat.count} Events linked</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable NavItem
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white text-[#1E3A8A]' : 'hover:bg-blue-800 text-blue-100'}`}>
    {icon} <span className="text-sm font-medium">{label}</span>
  </div>
);

export default EventCategories;