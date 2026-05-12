import Navbar from "../../assets/NavBar"
import { X, MapPin, CalendarCheck, Clock, UserCircle, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function OrganizerEvents() {
    const { organizerId } = useParams();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [organizer, setOrganizer] = useState(null);
    const profileRef = useRef(null);
    const [form, setform] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const handelForm = (e, item) => {
        if (e) e.stopPropagation();
        navigate(`/app/Event/${item._id}`);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setform(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [form]);

    const requestEvent = async (item, isVolunteer = false) => {
        try {
            const userString = localStorage.getItem('user');
            if (!userString) {
                return alert("Vous devez être connecté pour vous inscrire !");
            }

            const user = JSON.parse(userString);

            const registrationData = {
                studentId: user._id,
                eventId: item._id,
                type: isVolunteer ? 'volunteer' : 'participant' 
            };

            const res = await axios.post('http://localhost:5000/Event/My_events', registrationData);
            
            setform(false);
            alert(isVolunteer ? "Votre demande d'organisation a été envoyée !" : "Inscription réussie !");
            console.log(res.data);

        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de l'inscription");
        }
    }

    useEffect(() => {
        const fetchOrganizerEvents = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/Event/organizer/${organizerId}`);
                setEvents(res.data);
                
                // If there are events, we can get organizer info from the first one since it's populated in some routes
                // But GetOrganizerEvents in backend doesn't populate. 
                // Let's check if we can get organizer info another way if needed.
                if (res.data.length > 0) {
                    // For now, let's just use the data we have
                    setOrganizer(res.data[0].organizer);
                }
            } catch (error) {
                console.error("Error fetching organizer events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrganizerEvents();
    }, [organizerId]);

    return (
        <>
            <Navbar />
            <section className='min-h-screen w-screen bg-bottom relative flex bg-slate-900'>
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90"></div>
                <nav className="w-[1300px] mx-auto text-white relative mt-5">
                    <div className="flex items-center gap-4 mb-8">
                        <button 
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-[#cd7329]"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="font-[600] uppercase text-4xl italic">Events par Organisateur</h1>
                            <p className="text-slate-400">Découvrez tous les événements organisés par cet organisateur</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#cd7329]"></div>
                        </div>
                    ) : (
                        <section className="relative mt-10">
                            {events.length === 0 ? (
                                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                    <CalendarCheck size={48} className="mx-auto text-slate-500 mb-4" />
                                    <p className="text-xl text-slate-400">Aucun événement trouvé pour cet organisateur.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-3 gap-10">
                                    {events.map((item, index) => {
                                        const dateObj = new Date(item.date);
                                        const formattedDate = dateObj.toLocaleDateString('fr-FR');
                                        const formattedTime = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                                        return (
                                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="h-70 rounded-2xl relative shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 group">
                                                <img src={`http://localhost:5000/${item.coverImage}`} alt="" className="w-[100%] h-[100%] object-cover absolute z-0 transition-transform duration-500 group-hover:scale-110" />
                                                <div className="absolute z-10 bg-gradient-to-t from-slate-900 via-slate-900/80 to-black/40 inset-0"></div>
                                                <h1 className="absolute z-20 top-3 right-3 bg-[#cd7329] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">{item.category}</h1>
                                                <div className="absolute h-50 z-20 top-1/4 text-white left-2 w-[100%]">
                                                    <nav className="absolute left-4 w-[90%]">
                                                        <h1 className="font-[900] text-2xl capitalize text-white" >{item.title}</h1>
                                                        <div className="space-y-1.5 mt-4 text-slate-300 text-sm">
                                                            <p className="flex gap-3"><CalendarCheck size={18} className="text-[#cd7329]"/><span>{formattedDate}</span></p>
                                                            <p className="flex gap-3"><MapPin size={18} className="text-[#cd7329]"/><span>{item.location}</span></p>
                                                            <p className="flex gap-3"><Clock size={18} className="text-[#cd7329]"/>{formattedTime}</p>
                                                        </div>
                                                    </nav>
                                                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-[#cd7329] font-bold w-[90%] mx-[5%] h-10 absolute bottom-0 rounded-xl hover:bg-[#cd7329] hover:text-white transition-all cursor-pointer" onClick={(e) => handelForm(e, item)}>Check Details</button>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            )}
                        </section>
                    )}
                </nav>

                {/* Modal with original design & new logic */}
                {form && selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} ref={profileRef} className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative">
                            <div className="h-60 w-full relative">
                                <img src={`http://localhost:5000/${selectedEvent.coverImage}`} alt="event cover" className="h-full w-full object-cover bg-bottom" />
                                <button onClick={() => setform(false)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-[#cd7329] transition-colors">
                                    <X size={20} className="text-white" />
                                </button>
                            </div>

                            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-4">
                                    <h2 className="text-3xl font-bold text-white uppercase italic">{selectedEvent.title}</h2>
                                    <div className="flex flex-wrap gap-4 text-slate-300 text-sm">
                                        <span className="flex items-center gap-2"><CalendarCheck size={16} className="text-[#cd7329]"/> {new Date(selectedEvent.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span className="flex items-center gap-2"><Clock size={16} className="text-[#cd7329]"/> {new Date(selectedEvent.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span className="flex items-center gap-2"><MapPin size={16} className="text-[#cd7329]"/> {selectedEvent.location}</span>
                                    </div>
                                    <hr className="border-white/5" />
                                    <p className="text-slate-400 text-sm leading-relaxed">{selectedEvent.description || "events "}</p>
                                    
                                    <div className="flex flex-col gap-3 pt-4">
                                        <button onClick={() => requestEvent(selectedEvent, false)} className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                                            S'inscrire Maintenant
                                        </button>

                                        {selectedEvent.needsHelp === 'yes' && (
                                            <button onClick={() => requestEvent(selectedEvent, true)} className="w-full py-3 bg-gradient-to-r from-[#cd7329] to-[#eb8232] text-white font-bold rounded-xl shadow-lg shadow-[#cd7329]/20 hover:scale-[1.02] transition-transform">
                                                Rejoindre comme Organisateur
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center space-y-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <p className="text-xs text-slate-400 font-bold uppercase">Pass Ticket</p>
                                    <div className="bg-white p-2 rounded-lg">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedEvent._id}`} alt="QR Code" className="w-24 h-24" />
                                    </div>
                                    <p className="text-[10px] text-center text-slate-500">Scannez pour valider votre entrée</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </section>
        </>
    )
}
