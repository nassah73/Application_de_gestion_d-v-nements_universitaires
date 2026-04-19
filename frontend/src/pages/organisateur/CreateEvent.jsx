import React, { useState, useRef } from 'react';
import { Type, Tag, Users, AlignLeft, Calendar, MapPin, CheckCircle, Sparkles, Image as ImageIcon, X, Upload } from 'lucide-react';

const CreateEvent = ({ setActiveTab }) => {
    const [coverImage, setCoverImage] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) return alert('Veuillez sélectionner une image.');
        if (file.size > 5 * 1024 * 1024) return alert('Taille maximale : 5 MB.');
        const reader = new FileReader();
        reader.onload = (e) => setCoverImage({ url: e.target.result, name: file.name, size: (file.size / 1024).toFixed(0) + ' KB' });
        reader.readAsDataURL(file);
    };

    const onDrop = (e) => {
        e.preventDefault(); setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
    };

    return (
    <div className="max-w-4xl mx-auto animate-in">
        <div className="org-card border-none bg-white shadow-2xl shadow-slate-200/50 p-10 md:p-16 relative overflow-hidden">
            {/* Header section with abstract art */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-indigo-600 to-orange-500"></div>
            
            <div className="mb-14 relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={18} className="text-orange-500" />
                    <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em]">Nouveau Projet</span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight">Donnez vie à votre événement</h3>
                <p className="text-slate-500 mt-3 font-medium text-lg leading-relaxed max-w-2xl">Utilisez notre interface optimisée pour configurer chaque aspect de votre activité universitaire et attirer le meilleur public.</p>
            </div>

            <form className="space-y-12 relative z-10">
                <div className="space-y-10">
                    {/* Primary Info Segment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8 rounded-[32px] bg-slate-50/50 border border-slate-100">
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-4">
                                <Type size={14} className="text-orange-500" />
                                <span>Titre de l'événement</span>
                            </label>
                            <input 
                                type="text" 
                                className="org-input h-14 !text-lg !font-bold" 
                                placeholder="Ex: Grand Forum de l'Entrepreneuriat 2026" 
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-4">
                                <Tag size={14} className="text-orange-500" />
                                <span>Catégorie Digitale</span>
                            </label>
                            <div className="relative group">
                                <select className="org-input h-14 appearance-none cursor-pointer pr-12 font-bold !bg-white">
                                    <option>Atelier Culturel</option>
                                    <option>Tournoi Sportif</option>
                                    <option>Conférence Académique</option>
                                    <option>Action Sociale</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <AlignLeft size={16} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-4">
                                <Users size={14} className="text-orange-500" />
                                <span>Capacité Logistique</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type="number" 
                                    className="org-input h-14 font-bold !bg-white" 
                                    placeholder="0" 
                                />
                                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">Personnes</span>
                            </div>
                        </div>
                    </div>

                    {/* Logistics Segment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="p-8 rounded-[32px] border border-slate-100">
                            <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-4">
                                <Calendar size={14} className="text-orange-500" />
                                <span>Calendrier de l'événement</span>
                            </label>
                            <input 
                                type="datetime-local" 
                                className="org-input h-14 font-bold" 
                            />
                        </div>
                        
                        <div className="p-8 rounded-[32px] border border-slate-100">
                            <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-4">
                                <MapPin size={14} className="text-orange-500" />
                                <span>Localisation / Salle</span>
                            </label>
                            <input 
                                type="text" 
                                className="org-input h-14 font-bold" 
                                placeholder="Amphithéâtre Central UIZ" 
                            />
                        </div>
                    </div>

                    {/* Cover Image Upload */}
                    <div>
                        <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-4">
                            <ImageIcon size={14} className="text-orange-500" />
                            <span>Image de couverture</span>
                            {coverImage && <span className="ml-auto text-[10px] text-emerald-500 font-black normal-case tracking-normal">✓ Image chargée</span>}
                        </label>

                        {!coverImage ? (
                            <div
                                onClick={() => fileInputRef.current.click()}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={onDrop}
                                className={`p-10 border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center cursor-pointer transition-all
                                    ${dragOver
                                        ? 'border-orange-400 bg-orange-50 scale-[1.01]'
                                        : 'border-slate-200 hover:border-orange-200 hover:bg-orange-50/30'}`}
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm transition-all duration-300
                                    ${dragOver ? 'bg-orange-500 rotate-6 scale-110' : 'bg-white group-hover:scale-110'}`}>
                                    <Upload size={28} className={dragOver ? 'text-white' : 'text-slate-300'} />
                                </div>
                                <p className="text-sm font-black text-slate-800 uppercase tracking-widest">
                                    {dragOver ? 'Déposez ici !' : 'Image de couverture'}
                                </p>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Glissez un fichier ou cliquez ici — PNG, JPG, max 5 MB</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files[0])}
                                />
                            </div>
                        ) : (
                            <div className="relative rounded-[32px] overflow-hidden border border-slate-100 shadow-lg group">
                                <img
                                    src={coverImage.url}
                                    alt="Couverture"
                                    className="w-full h-56 object-cover"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current.click()}
                                        className="px-5 py-2.5 bg-white text-slate-900 text-xs font-black rounded-xl uppercase tracking-widest hover:bg-slate-100 transition-all"
                                    >
                                        Changer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCoverImage(null)}
                                        className="px-5 py-2.5 bg-red-500 text-white text-xs font-black rounded-xl uppercase tracking-widest hover:bg-red-600 transition-all"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                                {/* File info badge */}
                                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-xl">
                                    <ImageIcon size={11} />
                                    <span>{coverImage.name}</span>
                                    <span className="text-white/60">— {coverImage.size}</span>
                                </div>
                                {/* Remove X */}
                                <button
                                    type="button"
                                    onClick={() => setCoverImage(null)}
                                    className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm text-white rounded-xl flex items-center justify-center hover:bg-red-500 transition-all"
                                >
                                    <X size={14} />
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleFile(e.target.files[0])}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.15em] text-slate-500 mb-4">
                            <AlignLeft size={14} className="text-orange-500" />
                            <span>Description Narratives</span>
                        </label>
                        <textarea 
                            className="org-input min-h-[160px] !p-6 leading-relaxed font-medium" 
                            placeholder="Décrivez l'impact, le programme et les objectifs de votre événement..."
                        ></textarea>
                    </div>
                </div>

                <div className="pt-12 flex flex-col sm:flex-row items-center gap-6 border-t border-slate-100">
                    <button type="submit" className="w-full sm:flex-1 btn-primary flex items-center justify-center gap-4 py-5 shadow-2xl">
                        <span className="text-sm font-black uppercase tracking-[0.2em] py-1">Publier l'événement</span>
                        <CheckCircle size={24} />
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setActiveTab('Tableau de Bord')}
                        className="w-full sm:w-auto px-12 py-5 bg-slate-50 hover:bg-slate-100 text-slate-500 font-black text-xs uppercase tracking-widest rounded-2xl transition-all border border-slate-100 active:scale-95"
                    >
                        Annuler
                    </button>
                </div>
            </form>
            
            {/* Background elements */}
            <div className="absolute top-1/2 right-[-100px] w-64 h-64 bg-orange-100/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-indigo-100/20 rounded-full blur-[100px]"></div>
        </div>
    </div>
    );
};

export default CreateEvent;