import Navbar from "../../assets/NavBar"
import { X, MapPin, CalendarCheck, Clock, Search, UserCircle } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';

export default function Main() {
    const [searchTerm, setSearchTerm] = useState("");
    const [Events, setEvents] = useState([])
    const profileRef = useRef(null);
    const [form, setform] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [category, setcategory] = useState('all')
    const navigate = useNavigate();

    const handleCategoryChange = (e) => {
        setcategory(e.target.value);
    };

   const filterObjet = Array.isArray(Events) 
    ? Events.filter((item) => {
        const matchesCategory = category === 'all' || item.category === category;
        const matchesSearch = (item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false) || 
                              (item.location?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
        
        return matchesCategory && matchesSearch;
      })
    : [];

    const handelForm = (e, item) => {
        if (e) e.stopPropagation();
        navigate(`/app/Event/${item._id}`);
    }

  useEffect(() => {
    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/Event/StuendtEvents');
            
            // يلا كانت res.data عبارة عن مصفوفة حطها، يلا كان Object وسطو events حطها
            if (Array.isArray(res.data)) {
                setEvents(res.data);
            } else if (res.data && Array.isArray(res.data.events)) {
                setEvents(res.data.events);
            } else {
                setEvents([]); // حماية باش يبقى ديما Array
            }
        } catch (error) {
            console.error("Error fetching events:", error);
            setEvents([]); // حماية ف حالة الخطأ
        }
    };
    fetchEvents();
}, []);

    // Logic ديال التسجيل: زدنا بارامتر isVolunteer باش نفرقو النوع ديال الطلب
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
                // هاد الحقل هو اللي كيفرق لينا فـ الباكيند واش مشارك عادي ولا منظم
                type: isVolunteer ? 'volunteer' : 'participant' 
            };

            const res = await axios.post('http://localhost:5000/Event/My_events', registrationData);
            
            setform(false);
            if (isVolunteer) {
                alert("Votre demande a été envoyée ! Veuillez patienter jusqu'à ce que l'organisateur valide votre demande pour rejoindre l'équipe.");
            } else {
                alert("Inscription réussie ! Retrouvez votre pass dans 'Mes événements'.");
            }
            console.log(res.data);

        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de l'inscription");
        }
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get('http://localhost:5000/Event/StuendtEvents');
                setEvents(res.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <>
            <Navbar />
            <section className='min-h-screen w-screen bg-bottom relative flex bg-slate-900'>
                <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-slate-900/90"></div>
                <nav className="w-[1300px] mx-auto text-white relative mt-5">
                    <h1 className="font-[600] uppercase text-4xl italic">Découvrir les événements</h1>
                    
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="flex justify-around mt-5 gap-4">
                        <div className="flex mt-5 gap-2 bg-white/5 backdrop-blur-md border border-white/10 w-[40%] py-2 px-4 rounded-xl relative shadow-lg">
                            <Search className="text-[#cd7329] self-center" />
                           
                                <input onChange={(e) => setSearchTerm(e.target.value)}  className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none" type="text" placeholder="Rechercher des événements par nom, catégorie, lieu" />
                            
                        </div>
                        <button className="border border-white/10 relative h-[44px] px-10 bg-gradient-to-r from-[#cd7329] to-[#eb8232] hover:opacity-90 shadow-lg shadow-[#cd7329]/20 font-bold self-center rounded-xl mt-5 transition-all">Rechercher</button>
                        <div className="self-center mt-5">
                            <select onChange={handleCategoryChange} className="h-[44px] rounded-xl bg-[#1e293b] border border-white/10 px-8 text-white focus:outline-none focus:border-[#cd7329] hover:cursor-pointer shadow-lg" defaultValue={'all'}>
                                <option value="all">Tous</option>
                                <option value="Informatique">Informatique</option>
                                <option value="Académique">Académique</option>
                                <option value="Sciences">Sciences</option>
                                <option value="Culturel">Culturel</option>
                                <option value="Sportif">Sportif</option>
                                <option value="Économique">Économique</option>
                                <option value="الشريعة">الشريعة</option>
                                <option value="Environnement">Environnement</option>
                                <option value="Développement personnel">Développement personnel</option>
                                <option value="Social">Social</option>
                            </select>
                        </div>
                    </motion.div>

                    <section className="relative mt-10">
                        <div className="grid grid-cols-3 gap-10">
                            {filterObjet.map((item, index) => {
                                const dateObj = new Date(item.date);
                                const formattedDate = dateObj.toLocaleDateString('fr-FR');
                                const formattedTime = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                                
                                // Handle backslashes in Windows paths
                                const imageUrl = item.coverImage ? `http://localhost:5000/${item.coverImage.replace(/\\/g, '/')}` : '';

                                return (
                                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="h-70 rounded-2xl relative shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10">
                                        <img src={imageUrl} alt="" className="w-[100%] h-[100%] bg-cover absolute z-0" />
                                        <div className="absolute z-10 bg-gradient-to-t from-slate-900 via-slate-900/80 to-black/40 inset-0"></div>
                                        <h1 className="absolute z-20 top-3 right-3 bg-[#cd7329] text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">{item.category}</h1>
                                        <div className="absolute h-50 z-20 top-1/4 text-white left-2 w-[100%]">
                                            <nav className="absolute left-4 w-[90%]">
                                                <h1 className="font-[900] text-2xl capitalize text-white" >{item.title}</h1>
                                                <div className="space-y-1.5 mt-4 text-slate-300 text-sm">
                                                    <p className="flex gap-3"><CalendarCheck size={18} className="text-[#cd7329]"/><span>{formattedDate}</span></p>
                                                    <p className="flex gap-3"><MapPin size={18} className="text-[#cd7329]"/><span>{item.location}</span></p>
                                                    <p className="flex gap-3"><Clock size={18} className="text-[#cd7329]"/>{formattedTime}</p>
                                                    <Link 
                                                        to={`/app/OrganizerEvents/${item.organizer?._id}`}
                                                        className="flex gap-3 hover:text-[#cd7329] transition-colors"
                                                    >
                                                        <UserCircle size={18} className="text-[#cd7329]"/>
                                                        {item.organizer?.prenom + ' ' + item.organizer?.nom || "Chargement..."}
                                                    </Link>
                                                </div>
                                            </nav>
                                            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-[#cd7329] font-bold w-[90%] mx-[5%] h-10 absolute bottom-0 rounded-xl hover:bg-[#cd7329] hover:text-white transition-all cursor-pointer" onClick={(e) => handelForm(e, item)}>Voir les détails</button>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </section>
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
                                    <p className="text-slate-400 text-sm leading-relaxed">{selectedEvent.description || "événements"}</p>
                                    
                                    <div className="flex flex-col gap-3 pt-4">
                                        {/* Button التسجيل العادي */}
                                        <button onClick={() => requestEvent(selectedEvent, false)} className="w-full py-3 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                                            S'inscrire Maintenant
                                        </button>

                                        {/* Logic: Button التسجيل كمنظم - كيبان غير يلا كان محتاج مساعدة */}
                                        {selectedEvent.needsHelp === 'yes' && (
                                            <button onClick={() => requestEvent(selectedEvent, true)} className="w-full py-3 bg-gradient-to-r from-[#cd7329] to-[#eb8232] text-white font-bold rounded-xl shadow-lg shadow-[#cd7329]/20 hover:scale-[1.02] transition-transform">
                                                Rejoindre comme Organisateur
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </section>
        </>
    )
}