import React, { useState } from 'react';
import {
    Edit2, Trash2, ExternalLink, Search, Filter,
    Calendar as CalendarIcon, Users, Sparkles, ChevronRight,
    X, Save, AlertTriangle, MapPin, CheckCircle2, SlidersHorizontal
} from 'lucide-react';

const INITIAL_EVENTS = [
    {
        id: 1,
        title: "Conférence IA & Futur académique",
        date: "15 Mai 2026",
        status: "Publié",
        participants: "45/100",
        venue: "Amphi A",
        description: "Une conférence dédiée aux enjeux de l'intelligence artificielle dans le monde académique. Intervenants de renom, ateliers pratiques et networking.",
        color: "emerald",
        badgeClass: "badge-published"
    },
    {
        id: 2,
        title: "Workshop React & Vite Modern Stack",
        date: "22 Mai 2026",
        status: "En attente",
        participants: "12/50",
        venue: "Salle 204",
        description: "Atelier pratique pour maîtriser React 18 et Vite. Développement d'une application complète en équipe avec les dernières bonnes pratiques.",
        color: "amber",
        badgeClass: "badge-pending"
    },
    {
        id: 3,
        title: "Hackathon inter-clubs 2026",
        date: "10 Juin 2026",
        status: "Brouillon",
        participants: "0/200",
        venue: "Espace Coworking",
        description: "Compétition de 48h entre les clubs universitaires. Projets innovants, jury expert, prix attractifs. Ouverte à tous les étudiants de l'UIZ.",
        color: "slate",
        badgeClass: "badge-draft"
    },
];

/* ───────── Modal Wrapper ───────── */
const Modal = ({ onClose, children }) => (
    <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
        onClick={onClose}
    >
        <div
            className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden animate-in"
            onClick={e => e.stopPropagation()}
        >
            {children}
        </div>
    </div>
);

/* ───────── View Details Modal ───────── */
const ViewModal = ({ event, onClose }) => {
    const filled = parseInt(event.participants.split('/')[0]);
    const total = parseInt(event.participants.split('/')[1]);
    const pct = Math.round((filled / total) * 100);

    const colorMap = {
        emerald: { bar: 'bg-emerald-500', icon: 'text-emerald-600', bg: 'bg-emerald-50', badge: 'text-emerald-700' },
        amber:   { bar: 'bg-orange-500',  icon: 'text-orange-600',  bg: 'bg-orange-50',  badge: 'text-orange-700' },
        slate:   { bar: 'bg-slate-400',   icon: 'text-slate-600',   bg: 'bg-slate-50',   badge: 'text-slate-700' },
    };
    const c = colorMap[event.color] || colorMap.slate;

    return (
        <Modal onClose={onClose}>
            {/* Header */}
            <div className={`${c.bg} px-8 pt-8 pb-6 relative`}>
                <button onClick={onClose} className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-xl bg-white/70 hover:bg-white text-slate-400 hover:text-slate-700 transition-all">
                    <X size={16} />
                </button>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${c.badge}`}>Détails de l'événement</span>
                <h3 className="text-xl font-black text-slate-900 mt-1 leading-tight">{event.title}</h3>
            </div>

            {/* Body */}
            <div className="px-8 py-6 space-y-5">
                <p className="text-sm text-slate-500 leading-relaxed">{event.description}</p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                        <CalendarIcon size={18} className="text-slate-400" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                            <p className="text-sm font-bold text-slate-800">{event.date}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                        <MapPin size={18} className="text-slate-400" />
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lieu</p>
                            <p className="text-sm font-bold text-slate-800">{event.venue}</p>
                        </div>
                    </div>
                </div>

                {/* Progress */}
                <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Users size={12} /> Inscriptions
                        </span>
                        <span className="text-sm font-black text-slate-800">{event.participants} — {pct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${c.bar} transition-all duration-700`} style={{ width: `${pct}%` }}></div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className={c.icon} />
                    <span className={`text-sm font-bold ${c.badge}`}>Statut : {event.status}</span>
                </div>
            </div>

            <div className="px-8 pb-8">
                <button onClick={onClose} className="w-full btn-primary py-3 text-sm">Fermer</button>
            </div>
        </Modal>
    );
};

/* ───────── Edit Modal ───────── */
const EditModal = ({ event, onClose, onSave }) => {
    const [form, setForm] = useState({ ...event });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <Modal onClose={onClose}>
            <div className="px-8 pt-8 pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Modifier</span>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">Éditer l'événement</h3>
                </div>
                <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 transition-all">
                    <X size={16} />
                </button>
            </div>

            <div className="px-8 py-6 space-y-4">
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Titre</label>
                    <input className="org-input w-full" value={form.title} onChange={e => set('title', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Date</label>
                        <input className="org-input w-full" value={form.date} onChange={e => set('date', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Lieu</label>
                        <input className="org-input w-full" value={form.venue} onChange={e => set('venue', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Statut</label>
                    <select className="org-input w-full" value={form.status} onChange={e => set('status', e.target.value)}>
                        <option>Publié</option>
                        <option>En attente</option>
                        <option>Brouillon</option>
                    </select>
                </div>
                <div>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Description</label>
                    <textarea
                        className="org-input w-full resize-none"
                        rows={3}
                        value={form.description}
                        onChange={e => set('description', e.target.value)}
                    />
                </div>
            </div>

            <div className="px-8 pb-8 flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-500 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
                    Annuler
                </button>
                <button
                    onClick={() => { onSave(form); onClose(); }}
                    className="flex-1 btn-primary py-3 text-sm flex items-center justify-center gap-2"
                >
                    <Save size={15} /> Enregistrer
                </button>
            </div>
        </Modal>
    );
};

/* ───────── Delete Confirm Modal ───────── */
const DeleteModal = ({ event, onClose, onConfirm }) => (
    <Modal onClose={onClose}>
        <div className="px-8 pt-8 pb-6 text-center space-y-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
                <AlertTriangle size={28} className="text-red-500" />
            </div>
            <div>
                <h3 className="text-lg font-black text-slate-900">Supprimer l'événement ?</h3>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed max-w-sm mx-auto">
                    Cette action est irréversible. L'événement <span className="font-bold text-slate-700">"{event.title}"</span> et toutes ses inscriptions seront définitivement supprimés.
                </p>
            </div>
        </div>
        <div className="px-8 pb-8 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-500 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
                Annuler
            </button>
            <button
                onClick={() => { onConfirm(event.id); onClose(); }}
                className="flex-1 py-3 text-sm font-black text-white bg-red-500 hover:bg-red-600 rounded-2xl transition-all shadow-lg shadow-red-200 active:scale-95"
            >
                Oui, supprimer
            </button>
        </div>
    </Modal>
);

/* ───────── Date Filter Modal ───────── */
const MONTH_NAMES = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

const DateFilterModal = ({ onClose, onApply, current }) => {
    const [from, setFrom] = useState(current.from);
    const [to, setTo]     = useState(current.to);

    const preset = (monthOffset) => {
        const now = new Date();
        const d = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1);
        const start = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-01`;
        const last  = new Date(d.getFullYear(), d.getMonth()+1, 0);
        const end   = `${last.getFullYear()}-${String(last.getMonth()+1).padStart(2,'0')}-${String(last.getDate()).padStart(2,'0')}`;
        setFrom(start); setTo(end);
    };

    return (
        <Modal onClose={onClose}>
            <div className="px-8 pt-8 pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">Filtrage</span>
                    <h3 className="text-lg font-black text-slate-900 leading-tight">Filtrer par date</h3>
                </div>
                <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-400 transition-all">
                    <X size={16} />
                </button>
            </div>

            <div className="px-8 py-6 space-y-5">
                {/* Quick presets */}
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Périodes rapides</p>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Ce mois', offset: 0 },
                            { label: 'Mois prochain', offset: 1 },
                            { label: 'Dans 2 mois', offset: 2 },
                        ].map(({ label, offset }) => (
                            <button
                                key={label}
                                onClick={() => preset(offset)}
                                className="px-4 py-2 text-[11px] font-black rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 uppercase tracking-wider transition-all"
                            >
                                {label}
                            </button>
                        ))}
                        <button
                            onClick={() => { setFrom(''); setTo(''); }}
                            className="px-4 py-2 text-[11px] font-black rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 uppercase tracking-wider transition-all"
                        >
                            Tout afficher
                        </button>
                    </div>
                </div>

                {/* Custom range */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Du</label>
                        <input type="date" className="org-input w-full" value={from} onChange={e => setFrom(e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Au</label>
                        <input type="date" className="org-input w-full" value={to} onChange={e => setTo(e.target.value)} />
                    </div>
                </div>

                {(from || to) && (
                    <div className="flex items-center gap-2 px-4 py-3 bg-indigo-50 rounded-2xl">
                        <CalendarIcon size={14} className="text-indigo-500" />
                        <p className="text-[11px] font-bold text-indigo-600">
                            {from ? `Du ${from}` : 'Début non défini'} — {to ? `au ${to}` : 'Fin non définie'}
                        </p>
                    </div>
                )}
            </div>

            <div className="px-8 pb-8 flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-500 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all">
                    Annuler
                </button>
                <button
                    onClick={() => { onApply({ from, to }); onClose(); }}
                    className="flex-1 btn-primary py-3 text-sm flex items-center justify-center gap-2"
                >
                    <SlidersHorizontal size={15} /> Appliquer
                </button>
            </div>
        </Modal>
    );
};

/* ───────── Main Component ───────── */
const STATUS_OPTIONS = ['Publié', 'En attente', 'Brouillon'];

/* Parse "DD Mois YYYY" → Date */
const parseEventDate = (str) => {
    const parts = str.split(' ');
    const day   = parseInt(parts[0]);
    const month = MONTH_NAMES.findIndex(m => m.toLowerCase().startsWith(parts[1].toLowerCase().slice(0,3)));
    const year  = parseInt(parts[2]);
    return new Date(year, month, day);
};

const MyEvents = ({ setActiveTab }) => {
    const [events, setEvents] = useState(INITIAL_EVENTS);
    const [search, setSearch] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState([]);
    const [dateFilterOpen, setDateFilterOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [sortOrder, setSortOrder] = useState('none');
    const [viewEvent, setViewEvent] = useState(null);
    const [editEvent, setEditEvent] = useState(null);
    const [deleteEvent, setDeleteEvent] = useState(null);

    const toggleStatus = (s) =>
        setFilterStatus(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

    const resetFilters = () => { setFilterStatus([]); setSortOrder('none'); };
    const hasActiveFilters = filterStatus.length > 0 || sortOrder !== 'none';
    const hasDateFilter = dateRange.from || dateRange.to;

    const filtered = events
        .filter(e =>
            (e.title.toLowerCase().includes(search.toLowerCase()) ||
             e.venue.toLowerCase().includes(search.toLowerCase())) &&
            (filterStatus.length === 0 || filterStatus.includes(e.status)) &&
            (!hasDateFilter || (() => {
                const d = parseEventDate(e.date);
                const from = dateRange.from ? new Date(dateRange.from) : null;
                const to   = dateRange.to   ? new Date(dateRange.to)   : null;
                if (from && d < from) return false;
                if (to   && d > to)   return false;
                return true;
            })())
        )
        .sort((a, b) => {
            if (sortOrder === 'asc')  return a.title.localeCompare(b.title);
            if (sortOrder === 'desc') return b.title.localeCompare(a.title);
            return 0;
        });

    const handleSave = (updated) => {
        setEvents(prev => prev.map(e => e.id === updated.id ? {
            ...updated,
            badgeClass: updated.status === 'Publié' ? 'badge-published' : updated.status === 'En attente' ? 'badge-pending' : 'badge-draft',
            color: updated.status === 'Publié' ? 'emerald' : updated.status === 'En attente' ? 'amber' : 'slate',
        } : e));
    };

    const handleDelete = (id) => setEvents(prev => prev.filter(e => e.id !== id));

    return (
        <div className="space-y-8 animate-in">

            {/* Modals */}
            {viewEvent   && <ViewModal   event={viewEvent}   onClose={() => setViewEvent(null)} />}
            {editEvent   && <EditModal   event={editEvent}   onClose={() => setEditEvent(null)}   onSave={handleSave} />}
            {deleteEvent && <DeleteModal event={deleteEvent} onClose={() => setDeleteEvent(null)} onConfirm={handleDelete} />}

            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Vivre vos Événements</h3>
                    <div className="flex items-center gap-2 mt-2">
                        <Sparkles size={14} className="text-orange-500" />
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Gestion centralisée des activités du club</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-64">
                        <input
                            type="text"
                            className="org-input h-12 pl-12 bg-white shadow-sm border-slate-100"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setFilterOpen(o => !o)}
                            className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-all shadow-sm relative
                                ${filterOpen || hasActiveFilters
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-white border border-slate-100 text-slate-500 hover:text-orange-500 hover:border-orange-200'}`}
                        >
                            <Filter size={20} />
                            {hasActiveFilters && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                                    {filterStatus.length + (sortOrder !== 'none' ? 1 : 0)}
                                </span>
                            )}
                        </button>

                        {/* Filter Panel */}
                        {filterOpen && (
                            <div className="absolute right-0 top-[calc(100%+10px)] w-72 bg-white border border-slate-100 rounded-[24px] shadow-2xl shadow-slate-200/80 z-30 overflow-hidden">
                                <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
                                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Filtres</span>
                                    <div className="flex items-center gap-2">
                                        {hasActiveFilters && (
                                            <button onClick={resetFilters} className="text-[10px] font-black text-orange-500 hover:text-orange-600 uppercase tracking-wider transition-colors">
                                                Réinitialiser
                                            </button>
                                        )}
                                        <button onClick={() => setFilterOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-400 transition-all">
                                            <X size={13} />
                                        </button>
                                    </div>
                                </div>

                                {/* Status filter */}
                                <div className="px-5 py-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Statut</p>
                                    <div className="space-y-2">
                                        {STATUS_OPTIONS.map(s => (
                                            <label key={s} className="flex items-center gap-3 cursor-pointer group">
                                                <div
                                                    onClick={() => toggleStatus(s)}
                                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                                                        ${filterStatus.includes(s)
                                                            ? 'bg-orange-500 border-orange-500'
                                                            : 'border-slate-200 hover:border-orange-300'}`}
                                                >
                                                    {filterStatus.includes(s) && <CheckCircle2 size={11} className="text-white" />}
                                                </div>
                                                <span className={`text-sm font-bold transition-colors ${filterStatus.includes(s) ? 'text-orange-600' : 'text-slate-600 group-hover:text-slate-900'}`}>{s}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Sort */}
                                <div className="px-5 pb-5 border-t border-slate-50 pt-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Trier par titre</p>
                                    <div className="flex gap-2">
                                        {[{ val: 'asc', label: 'A → Z' }, { val: 'desc', label: 'Z → A' }, { val: 'none', label: 'Défaut' }].map(opt => (
                                            <button
                                                key={opt.val}
                                                onClick={() => setSortOrder(opt.val)}
                                                className={`flex-1 py-2 text-[10px] font-black rounded-xl uppercase tracking-wider transition-all
                                                    ${sortOrder === opt.val
                                                        ? 'bg-slate-900 text-white'
                                                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <button onClick={() => setActiveTab('Créer Événement')} className="btn-primary flex items-center gap-2 h-12 text-xs px-6">
                        <span className="font-black uppercase tracking-widest">Nouveau</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="org-card border-none bg-white/70 backdrop-blur-md shadow-2xl shadow-slate-200/50 p-2 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="org-table">
                        <thead>
                            <tr className="bg-slate-50/50 rounded-2xl overflow-hidden">
                                <th className="rounded-tl-2xl">Identité de l'événement</th>
                                <th>Planification</th>
                                <th>État actuel</th>
                                <th>Inscriptions</th>
                                <th className="text-right rounded-tr-2xl">Gestion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/50">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-16 text-center text-slate-400 font-bold text-sm">
                                        Aucun événement trouvé.
                                    </td>
                                </tr>
                            ) : filtered.map((event) => {
                                const filled = parseInt(event.participants.split('/')[0]);
                                const total  = parseInt(event.participants.split('/')[1]);
                                const pct    = Math.round((filled / total) * 100) || 0;
                                return (
                                    <tr key={event.id} className="group transition-all duration-300">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center group-hover:scale-105 transition-transform duration-500
                                                    ${event.color === 'emerald' ? 'bg-emerald-500/10' : event.color === 'amber' ? 'bg-orange-500/10' : 'bg-slate-100'}`}>
                                                    <CalendarIcon size={20} className={event.color === 'emerald' ? 'text-emerald-600' : event.color === 'amber' ? 'text-orange-600' : 'text-slate-600'} />
                                                </div>
                                                <div>
                                                    <span className="font-black text-slate-800 group-hover:text-orange-600 transition-colors uppercase text-sm tracking-tight block mb-1">{event.title}</span>
                                                    <div className="flex items-center gap-2">
                                                        <Users size={12} className="text-slate-300" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{event.venue}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-700">{event.date}</span>
                                                <span className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Semestre 2</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`badge ${event.badgeClass}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 ${event.color === 'emerald' ? 'bg-emerald-500' : event.color === 'amber' ? 'bg-orange-500' : 'bg-slate-500'}`}></span>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-2 w-44">
                                                <div className="flex justify-between items-baseline">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.participants}</span>
                                                    <span className="text-[11px] font-black text-slate-800">{pct}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-50">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 shadow-sm ${event.color === 'emerald' ? 'bg-emerald-500' : event.color === 'amber' ? 'bg-orange-500' : 'bg-slate-400'}`}
                                                        style={{ width: `${pct}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-1 px-2">
                                                <button
                                                    title="Modifier"
                                                    onClick={() => setEditEvent(event)}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-lg rounded-xl text-slate-400 hover:text-orange-500 transition-all border border-transparent hover:border-slate-100"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    title="Voir plus"
                                                    onClick={() => setViewEvent(event)}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-white hover:shadow-lg rounded-xl text-slate-400 hover:text-blue-500 transition-all border border-transparent hover:border-slate-100"
                                                >
                                                    <ExternalLink size={16} />
                                                </button>
                                                <button
                                                    title="Supprimer"
                                                    onClick={() => setDeleteEvent(event)}
                                                    className="w-10 h-10 flex items-center justify-center hover:bg-red-50 hover:shadow-lg rounded-xl text-slate-300 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50/30 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        Affichage de {filtered.length} sur {events.length} événement{events.length > 1 ? 's' : ''}
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-slate-200 rounded-xl hover:bg-white transition-all">Précédent</button>
                        <button className="px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-slate-900 rounded-xl shadow-lg active:scale-95 transition-all">Suivant</button>
                    </div>
                </div>
            </div>

            {/* Date Filter Modal */}
            {dateFilterOpen && (
                <DateFilterModal
                    current={dateRange}
                    onClose={() => setDateFilterOpen(false)}
                    onApply={(range) => setDateRange(range)}
                />
            )}

            {/* Bottom cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                    onClick={() => setDateFilterOpen(true)}
                    className={`org-card border-none flex items-center gap-4 group cursor-pointer transition-colors py-6 relative overflow-hidden
                        ${hasDateFilter ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-50 hover:bg-indigo-100'}`}
                >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110
                        ${hasDateFilter ? 'bg-white/20 text-white' : 'bg-white text-indigo-600'}`}>
                        <CalendarIcon size={20} />
                    </div>
                    <div className="flex-1">
                        <h5 className={`text-sm font-black uppercase tracking-tight ${hasDateFilter ? 'text-white' : 'text-slate-900'}`}>Filtrer par date</h5>
                        <p className={`text-[10px] font-bold uppercase mt-0.5 ${hasDateFilter ? 'text-indigo-200' : 'text-indigo-400'}`}>
                            {hasDateFilter
                                ? `${dateRange.from || '…'} → ${dateRange.to || '…'}`
                                : 'Optimisez vos vues'}
                        </p>
                    </div>
                    {hasDateFilter && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setDateRange({ from: '', to: '' }); }}
                            className="shrink-0 w-7 h-7 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all"
                        >
                            <X size={13} />
                        </button>
                    )}
                </div>
                <div className="md:col-span-2 org-card border-none bg-orange-50 flex items-center justify-between group cursor-pointer hover:bg-orange-100 transition-colors py-6"
                    onClick={() => setActiveTab('Statistiques')}>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-orange-600 shadow-sm transition-transform group-hover:scale-110">
                            <Sparkles size={20} />
                        </div>
                        <div>
                            <h5 className="text-sm font-black text-slate-900 uppercase tracking-tight">Analyse de succès automatique</h5>
                            <p className="text-[10px] text-orange-400 font-bold uppercase mt-0.5">Notre IA analyse vos performances d'inscriptions</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-orange-200 group-hover:text-orange-500 transition-all mr-2" />
                </div>
            </div>
        </div>
    );
};

export default MyEvents;