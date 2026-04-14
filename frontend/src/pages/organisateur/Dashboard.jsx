import React from 'react';
import { Layers, Users, Activity, TrendingUp, Calendar as CalendarIcon, ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';

const Dashboard = ({ setActiveTab }) => {
    const stats = [
        {
            label: "Événements Actifs",
            value: "05",
            icon: <Layers size={22} />,
            color: "blue",
            bg: "bg-blue-500/10",
            text: "text-blue-600",
            trend: "+2 ce mois"
        },
        {
            label: "Inscriptions",
            value: "128",
            icon: <Users size={22} />,
            color: "green",
            bg: "bg-emerald-500/10",
            text: "text-emerald-600",
            trend: "+15.2%"
        },
        {
            label: "Taux de présence",
            value: "82%",
            icon: <Activity size={22} />,
            color: "purple",
            bg: "bg-indigo-500/10",
            text: "text-indigo-600",
            trend: "Stable"
        }
    ];

    return (
        <div className="space-y-10 animate-in">
            {/* Welcome Section */}
            <div className="org-card bg-slate-900 border-none relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 min-h-[200px]">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles size={16} className="text-orange-400" />
                        <span className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">Tableau de Bord</span>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tight">Bienvenue, Club Informatique !</h3>
                    <p className="text-slate-400 mt-2 font-medium max-w-md">Découvrez les dernières performances de vos événements et gérez vos participants en toute simplicité.</p>
                </div>
                <button
                    onClick={() => setActiveTab('Créer Événement')}
                    className="relative z-10 btn-primary flex items-center justify-center gap-3 px-8 group"
                >
                    <CalendarIcon size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="font-bold">Créer un événement</span>
                </button>

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="org-card org-card-hover group border-none bg-white/50 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-8">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.text} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                {stat.icon}
                            </div>
                            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white border border-slate-100 px-3 py-1.5 rounded-full shadow-sm">
                                <TrendingUp size={12} className={stat.color === 'blue' ? 'text-blue-500' : 'text-emerald-500'} />
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-slate-400 font-bold text-[11px] uppercase tracking-widest mb-2">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                                <ArrowUpRight size={20} className="text-emerald-500 mb-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 org-card border-none bg-white shadow-xl shadow-slate-200/50">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2">
                            <Sparkles size={14} className="text-orange-500" />
                            Flux d'Activité
                        </h4>
                        <button className="text-[10px] font-black text-slate-400 hover:text-orange-500 transition-colors uppercase tracking-widest">
                            Voir historique
                        </button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} onClick={() => setActiveTab('Mes Événements')} className="flex items-center gap-5 p-5 hover:bg-slate-50 rounded-[24px] transition-all duration-300 cursor-pointer group border border-transparent hover:border-slate-100">
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-lg group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                                    0{i + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[15px] font-bold text-slate-800 leading-tight">Workshop Intelligence Artificielle</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">Nouvelle inscription • Il y a 2m</p>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:border-orange-200 group-hover:text-orange-500 transition-all">
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-950 p-8 md:p-10 rounded-[40px] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden flex flex-col justify-center min-h-[400px]">
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                            <Layers size={28} className="text-white" />
                        </div>
                        <h4 className="text-2xl font-black mb-4 tracking-tight leading-tight">
                            Agrandissez votre impact académique.
                        </h4>
                        <p className="text-indigo-200/80 text-sm mb-6 leading-relaxed max-w-xs">
                            Découvrez comment des centaines de clubs optimisent leurs événements grâce à nos outils de gestion avancés.
                        </p>
                        
                        <button onClick={() => setActiveTab('Guide')} className="inline-block w-fit bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20 active:scale-95">
                            Guide Organisateur
                        </button>
                    </div>

                    {/* Abstract background art */}
                    <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]"></div>
                    <div className="absolute top-[20%] left-[-20px] w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px]"></div>
                    <Activity size={300} className="absolute top-1/2 right-[-100px] text-white/5 -rotate-12 translate-y-[-50%]" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;