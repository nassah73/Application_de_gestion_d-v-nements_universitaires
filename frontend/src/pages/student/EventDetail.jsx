import Navbar from "../../assets/NavBar"
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { 
    X, 
    MapPin, 
    CalendarCheck, 
    Clock, 
    UserCircle, 
    ArrowLeft, 
    Users, 
    Tag, 
    ExternalLink,
    Ticket
} from 'lucide-react';

export default function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/Event/${id}`);
                setEvent(res.data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const requestEvent = async (isVolunteer = false) => {
        try {
            const userString = localStorage.getItem('user');
            if (!userString) {
                return alert("Vous devez être connecté pour vous inscrire !");
            }

            const user = JSON.parse(userString);

            const registrationData = {
                studentId: user._id,
                eventId: event._id,
                type: isVolunteer ? 'volunteer' : 'participant' 
            };

            const res = await axios.post('http://localhost:5000/Event/My_events', registrationData);
            alert(isVolunteer ? "Votre demande d'organisation a été envoyée !" : "Inscription réussie !");
            console.log(res.data);

        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de l'inscription");
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cd7329]"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white">
                <p className="text-xl mb-4">Événement non trouvé</p>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#cd7329] font-bold">
                    <ArrowLeft size={20} /> Retour
                </button>
            </div>
        );
    }

    const dateObj = new Date(event.date);
    const formattedDate = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    return (
        <>
            <Navbar />
            <section className='min-h-screen w-screen bg-slate-900 relative pt-20 pb-10 overflow-x-hidden'>
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90 -z-10"></div>
                
                <div className="max-w-6xl mx-auto px-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-[#cd7329] font-bold mb-8 hover:translate-x-[-4px] transition-transform"
                    >
                        <ArrowLeft size={20} /> Retour aux événements
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl border border-white/10"
                            >
                                <img 
                                    src={`http://localhost:5000/${event.coverImage}`} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-[#cd7329] text-white px-4 py-1.5 rounded-full font-bold text-sm shadow-lg">
                                    {event.category}
                                </div>
                            </motion.div>

                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 space-y-6">
                                <h1 className="text-4xl font-black text-white uppercase italic tracking-tight">
                                    {event.title}
                                </h1>

                                <div className="flex flex-wrap gap-6 text-slate-300">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#cd7329]/10 rounded-lg text-[#cd7329]">
                                            <CalendarCheck size={20} />
                                        </div>
                                        <span>{formattedDate}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#cd7329]/10 rounded-lg text-[#cd7329]">
                                            <Clock size={20} />
                                        </div>
                                        <span>{formattedTime}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-[#cd7329]/10 rounded-lg text-[#cd7329]">
                                            <MapPin size={20} />
                                        </div>
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <hr className="border-white/5" />

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Tag size={20} className="text-[#cd7329]" />
                                        À propos de l'événement
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed whitespace-pre-line">
                                        {event.description || "Aucune description fournie."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Organizer Card */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-center space-y-4">
                                <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em]">Organisé par</p>
                                <div className="w-20 h-20 bg-[#cd7329]/10 rounded-2xl flex items-center justify-center mx-auto text-[#cd7329]">
                                    <UserCircle size={48} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-white">
                                        {event.organizer?.prenom} {event.organizer?.nom}
                                    </h4>
                                    <p className="text-slate-400 text-sm mt-1">{event.organizer?.email}</p>
                                </div>
                                <button 
                                    onClick={() => navigate(`/app/OrganizerEvents/${event.organizer?._id}`)}
                                    className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm hover:bg-[#cd7329] transition-all"
                                >
                                    Voir tous ses événements
                                </button>
                            </div>

                            {/* Registration Card */}
                            <div className="bg-gradient-to-br from-[#cd7329]/20 to-[#eb8232]/20 backdrop-blur-md rounded-3xl p-6 border border-[#cd7329]/20 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-slate-400 font-bold uppercase">Capacité</p>
                                        <p className="text-2xl font-black text-white">{event.capacity}</p>
                                    </div>
                                    <div className="p-3 bg-[#cd7329] rounded-2xl text-white shadow-lg">
                                        <Users size={24} />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button 
                                        onClick={() => requestEvent(false)}
                                        className="w-full py-4 bg-white text-slate-900 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-[#cd7329] hover:text-white transition-all shadow-xl shadow-black/20"
                                    >
                                        S'inscrire Maintenant
                                    </button>

                                    {event.needsHelp === 'yes' && (
                                        <button 
                                            onClick={() => requestEvent(true)}
                                            className="w-full py-4 bg-[#cd7329]/20 border border-[#cd7329]/30 text-[#cd7329] font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-[#cd7329] hover:text-white transition-all"
                                        >
                                            Devenir Organisateur
                                        </button>
                                    )}

                                    {event.registrationLink && (
                                        <a 
                                            href={event.registrationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-4 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                                        >
                                            Lien externe <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* QR Section */}
                            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 text-center space-y-4">
                                <p className="text-xs text-slate-500 font-black uppercase tracking-[0.2em]">Billet Numérique</p>
                                <div className="bg-white p-4 rounded-2xl w-40 h-40 mx-auto shadow-2xl">
                                    <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event._id}`} 
                                        alt="QR Code" 
                                        className="w-full h-full"
                                    />
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium">Scannez lors de l'événement pour valider votre entrée</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
