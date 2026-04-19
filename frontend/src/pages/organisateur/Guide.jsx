import React, { useState } from 'react';
import {
    BookOpen, ChevronDown, ChevronUp, Sparkles, Calendar, Users,
    QrCode, BarChart3, PlusSquare, CheckCircle2, Lightbulb, ArrowRight
} from 'lucide-react';

const steps = [
    {
        icon: <PlusSquare size={22} />,
        color: 'text-orange-500',
        bg: 'bg-orange-500/10',
        title: 'Créer un Événement',
        desc: 'Commencez par créer votre événement en renseignant le titre, la date, le lieu et la description. Définissez la capacité maximale et les paramètres d\'inscription.',
        tips: ['Choisissez un titre accrocheur', 'Ajoutez une image de couverture', 'Précisez les prérequis si nécessaire'],
    },
    {
        icon: <Users size={22} />,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        title: 'Gérer les Inscriptions',
        desc: 'Suivez en temps réel les inscriptions dans l\'onglet "Mes Événements". Consultez la liste des participants, validez ou refusez des demandes d\'inscription.',
        tips: ['Activez les notifications d\'inscription', 'Exportez la liste des participants', 'Envoyez des rappels automatiques'],
    },
    {
        icon: <QrCode size={22} />,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        title: 'Scanner les QR Codes',
        desc: 'Le jour J, utilisez le scanner QR intégré pour valider la présence des participants rapidement et sans contact. Chaque ticket génère un QR unique.',
        tips: ['Testez le scanner avant l\'événement', 'Prévoyez un backup papier', 'Assignez des bénévoles au contrôle d\'accès'],
    },
    {
        icon: <BarChart3 size={22} />,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10',
        title: 'Analyser les Statistiques',
        desc: 'Après l\'événement, consultez les statistiques détaillées : taux de présence, profil des participants, heures de pointe et retours de satisfaction.',
        tips: ['Comparez avec les événements précédents', 'Identifiez vos meilleurs créneaux', 'Partagez les résultats avec votre équipe'],
    },
];

const faqs = [
    {
        q: 'Comment modifier un événement après sa publication ?',
        a: 'Rendez-vous dans "Mes Événements", cliquez sur l\'événement puis sur le bouton "Modifier". Toutes les modifications sont notifiées automatiquement aux inscrits.',
    },
    {
        q: 'Puis-je annuler un événement ?',
        a: 'Oui, depuis la page de détail de l\'événement, utilisez l\'option "Annuler l\'événement". Un email est envoyé automatiquement à tous les participants inscrits.',
    },
    {
        q: 'Comment exporter la liste des participants ?',
        a: 'Dans "Mes Événements", sélectionnez un événement et cliquez sur "Exporter" pour télécharger un fichier CSV avec toutes les informations des participants.',
    },
    {
        q: 'Le QR code fonctionne-t-il hors ligne ?',
        a: 'Le scanner nécessite une connexion internet pour valider les tickets en temps réel et éviter les doublons.',
    },
];

const FAQ = ({ q, a }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={`border rounded-[20px] overflow-hidden transition-all duration-300 cursor-pointer ${open ? 'border-orange-200 bg-orange-50/50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
            onClick={() => setOpen(!open)}
        >
            <div className="flex items-center justify-between p-5 gap-4">
                <p className={`text-sm font-bold leading-snug ${open ? 'text-orange-600' : 'text-slate-800'}`}>{q}</p>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${open ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </div>
            {open && (
                <div className="px-5 pb-5">
                    <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
                </div>
            )}
        </div>
    );
};

const Guide = ({ setActiveTab }) => {
    return (
        <div className="space-y-12 animate-in">

            {/* Header */}
            <div className="org-card bg-slate-900 border-none relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 min-h-[180px]">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <BookOpen size={16} className="text-orange-400" />
                        <span className="text-orange-400 text-[10px] font-black uppercase tracking-[0.2em]">Documentation</span>
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tight">Guide de l'Organisateur</h3>
                    <p className="text-slate-400 mt-2 font-medium max-w-md">
                        Tout ce qu'il faut savoir pour créer et gérer vos événements universitaires avec succès.
                    </p>
                </div>
                <button
                    onClick={() => setActiveTab('Créer Événement')}
                    className="relative z-10 btn-primary flex items-center justify-center gap-3 px-8 group"
                >
                    <Calendar size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="font-bold">Créer mon premier événement</span>
                </button>
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Steps */}
            <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2 mb-6">
                    <Sparkles size={14} className="text-orange-500" />
                    Étapes Clés
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {steps.map((step, i) => (
                        <div key={i} className="org-card org-card-hover group border-none bg-white shadow-xl shadow-slate-200/50">
                            <div className="flex items-start gap-4 mb-5">
                                <div className={`p-3 rounded-2xl ${step.bg} ${step.color} group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                                    {step.icon}
                                </div>
                                <div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Étape {i + 1}</span>
                                    <h5 className="text-base font-black text-slate-900 leading-tight">{step.title}</h5>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed mb-5">{step.desc}</p>
                            <ul className="space-y-2">
                                {step.tips.map((tip, j) => (
                                    <li key={j} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                                        <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.15em] flex items-center gap-2 mb-6">
                    <Lightbulb size={14} className="text-orange-500" />
                    Questions Fréquentes
                </h4>
                <div className="space-y-3">
                    {faqs.map((faq, i) => <FAQ key={i} {...faq} />)}
                </div>
            </div>

            {/* CTA bottom */}
            <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-indigo-950 p-10 rounded-[40px] shadow-2xl shadow-indigo-200 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="relative z-10">
                    <h4 className="text-2xl font-black mb-2 tracking-tight">Prêt à lancer votre prochain événement ?</h4>
                    <p className="text-indigo-200/80 text-sm max-w-sm">Utilisez tous les outils à votre disposition pour offrir une expérience mémorable à vos participants.</p>
                </div>
                <button
                    onClick={() => setActiveTab('Créer Événement')}
                    className="relative z-10 flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/20 active:scale-95 shrink-0"
                >
                    <PlusSquare size={16} />
                    Créer un événement
                    <ArrowRight size={16} />
                </button>
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-orange-500/20 rounded-full blur-[80px]"></div>
            </div>
        </div>
    );
};

export default Guide;
