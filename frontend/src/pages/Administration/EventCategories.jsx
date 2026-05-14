import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Edit2, Trash2, Search,
  CalendarCheck, Users, Save, X,
  CheckCircle2, AlertTriangle, Loader2
} from 'lucide-react';
import Sidebare from './components/Sidebare';
import Tobar from './components/Tobar';
import axios from 'axios';

const PRESET_COLORS = [
  '#cd7329', '#6366F1', '#10B981', '#F59E0B',
  '#EC4899', '#06B6D4', '#8B5CF6', '#ef4444',
];

// ── Category Card ──
const CategoryCard = ({ cat, onEdit, onDelete }) => {
  const total = 1000; 
  const pct = Math.min(100, Math.round(((cat.count || 0) / total) * 100 * 10));

  return (
    <div
      className="rounded-2xl p-7 group transition-all"
      style={{ background: '#1e2535', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex justify-between items-center mb-6">
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{
            background: `${cat.color}22`,
            color: cat.color,
            border: `1px solid ${cat.color}55`,
          }}
        >
          {cat.name}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(cat)} className="text-blue-400 hover:text-blue-300 transition-colors">
            <Edit2 size={15} />
          </button>
          <button onClick={() => onDelete(cat)} className="text-red-400 hover:text-red-300 transition-colors">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-2">
        <CalendarCheck size={22} style={{ color: cat.color }} />
        <span className="text-4xl font-black text-white">{cat.count || 0}</span>
      </div>
      <p className="text-sm mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>Événements enregistrés</p>

      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '4px', height: '4px' }}>
        <div style={{ width: `${pct}%`, background: cat.color, borderRadius: '4px', height: '4px', transition: 'width 0.4s ease' }} />
      </div>
      <p className="text-right mt-1.5" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{pct}%</p>
    </div>
  );
};

const EventCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAdding,     setIsAdding]     = useState(false);
  const [newName,      setNewName]      = useState('');
  const [newColor,     setNewColor]     = useState('#cd7329');
  const [editId,       setEditId]       = useState(null);
  const [editName,     setEditName]     = useState('');
  const [editColor,    setEditColor]    = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast,        setToast]        = useState(null);
  const [searchTerm,   setSearchTerm]   = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      showToast('Erreur lors du chargement des catégories', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = async (e) => {
    if (e) e.preventDefault();
    if (!newName.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/categories', { name: newName.trim(), color: newColor });
      showToast('Catégorie ajoutée.');
      setNewName('');
      setIsAdding(false);
      fetchCategories();
    } catch (err) {
      console.error("Détails de l'erreur:", err);
      const errorMessage = err.response?.data?.message || err.message || 'Erreur lors de l\'ajout';
      showToast(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (cat) => { setEditId(cat._id); setEditName(cat.name); setEditColor(cat.color); };
  const saveEdit  = async () => {
    if (!editName.trim()) return;
    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:5000/api/categories/${editId}`, { name: editName.trim(), color: editColor });
      showToast('Mise à jour réussie.');
      setEditId(null);
      fetchCategories();
    } catch (err) {
      showToast('Erreur lors de la mise à jour', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${deleteTarget._id}`);
      showToast('Supprimée.', 'error');
      setDeleteTarget(null);
      fetchCategories();
    } catch (err) {
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: '#0f172a' }}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold animate-in slide-in-from-right duration-300"
          style={{ background: toast.type === 'success' ? '#10B981' : '#ef4444', color: '#fff' }}>
          {toast.type === 'success' ? <CheckCircle2 size={18}/> : <Trash2 size={16}/>}
          {toast.msg}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl animate-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trash2 size={32} />
            </div>
            <h3 className="text-xl font-black text-center text-slate-800 uppercase tracking-tight mb-2">Supprimer ?</h3>
            <p className="text-center text-slate-500 text-sm mb-8 font-medium">
              Voulez-vous vraiment supprimer la catégorie <span className="font-bold text-slate-800">"{deleteTarget.name}"</span> ?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 font-bold text-slate-500 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Annuler</button>
              <button onClick={confirmDelete} className="flex-1 py-3 font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 shadow-lg shadow-red-200 transition-all">Supprimer</button>
            </div>
          </div>
        </div>
      )}

      <Sidebare />

      <div className="flex-1 flex flex-col min-w-0">
        <Tobar />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Page header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Gestion des Catégories</h2>
                <p className="text-sm mt-1 text-white/40 font-medium">Organiser et gérer les catégories d'événements</p>
              </div>
              <button onClick={() => { setIsAdding(true); setEditId(null); }}
                className="flex items-center gap-2 text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all bg-orange-500 shadow-lg shadow-orange-500/20">
                <Plus size={18}/> Nouvelle Catégorie
              </button>
            </div>

            {/* Add form */}
            {isAdding && (
              <form onSubmit={handleAdd} className="rounded-3xl border p-8 animate-in slide-in-from-top duration-300"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-black text-white uppercase tracking-wider text-sm">Nouvelle Catégorie</h3>
                  <button type="button" onClick={() => setIsAdding(false)} className="text-white/20 hover:text-white transition-colors"><X size={20}/></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Nom de la catégorie</label>
                    <input 
                      autoFocus
                      className="w-full px-5 py-4 rounded-2xl text-sm text-white border border-white/5 bg-white/[0.03] outline-none focus:border-orange-500/50 transition-all"
                      placeholder="Ex: Art & Musique..." 
                      value={newName} 
                      onChange={e => setNewName(e.target.value)} 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Couleur thématique</label>
                    <div className="flex gap-3 flex-wrap items-center pt-2">
                      {PRESET_COLORS.map(c => (
                        <button key={c} type="button" onClick={() => setNewColor(c)}
                          className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110"
                          style={{ background: c, borderColor: newColor === c ? '#fff' : 'transparent', boxShadow: newColor === c ? `0 0 15px ${c}88` : 'none' }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 rounded-xl font-bold text-white/40 hover:bg-white/5 transition-all text-xs uppercase tracking-widest">Annuler</button>
                  <button 
                    type="submit"
                    disabled={!newName.trim() || isSubmitting}
                    className={`px-8 py-3 rounded-xl font-black text-white text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                      !newName.trim() || isSubmitting ? 'bg-white/5 opacity-50 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20'
                    }`}
                  >
                    {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16}/>}
                    Enregistrer
                  </button>
                </div>
              </form>
            )}

            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full py-20 text-center">
                  <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Chargement des catégories...</p>
                </div>
              ) : filteredCategories.length === 0 ? (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-white/[0.01]">
                  <p className="text-white/20 font-bold uppercase tracking-widest text-[10px]">Aucune catégorie trouvée</p>
                </div>
              ) : filteredCategories.map(cat => (
                editId === cat._id ? (
                  <div key={cat._id} className="rounded-[2rem] border p-8 space-y-6 animate-in fade-in duration-300"
                    style={{ background: '#1e2535', borderColor: 'rgba(255,255,255,0.07)' }}>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Modifier le nom</label>
                      <input className="w-full px-4 py-3 rounded-xl text-sm text-white border border-white/5 bg-white/[0.03] outline-none focus:border-orange-500/50 transition-all"
                        value={editName} onChange={e => setEditName(e.target.value)} autoFocus />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Modifier la couleur</label>
                      <div className="flex gap-2 flex-wrap pt-1">
                        {PRESET_COLORS.map(c => (
                          <button key={c} onClick={() => setEditColor(c)}
                            className="w-7 h-7 rounded-full border-2 transition-all hover:scale-110"
                            style={{ background: c, borderColor: editColor === c ? '#fff' : 'transparent' }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={saveEdit} 
                        disabled={!editName.trim() || isSubmitting}
                        className="flex-1 py-3 font-black text-white rounded-xl flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-all text-[10px] uppercase tracking-widest disabled:opacity-50"
                      >
                        {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14}/>}
                        Sauvegarder
                      </button>
                      <button onClick={() => setEditId(null)} className="flex-1 py-3 font-black rounded-xl bg-white/5 text-white/40 hover:bg-white/10 transition-all text-[10px] uppercase tracking-widest">Annuler</button>
                    </div>
                  </div>
                ) : (
                  <CategoryCard key={cat._id} cat={cat} onEdit={startEdit} onDelete={setDeleteTarget} />
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCategories;
