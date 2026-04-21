import Navbar from "../../assets/NavBar";
import { MapPin, GraduationCap, Clock, CalendarCheckIcon } from "lucide-react";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Main() {
    // 1. الـ State باش نعرفو التاريخ اللي عزل المستخدم
    const [value, setvalue] = useState(new Date());

    // 2. الداتا (Fake Data) - هادشي اللي غيجي من بعد من MongoDB
    const events = [
        {
            id: 1,
            date: "2026-04-14",
            title: "Workshop: AI & Machine Learning Basics",
            time: "10:00 - 12:00",
            type: "Academic",
            location: "Salle de conférence"
        },
        {
            id: 2,
            date: "2026-04-15",
            title: "Football Tournament",
            time: "15:00 - 18:00",
            type: "Sports",
            location: "University Stadium"
        },
        {
            id: 3,
            date: "2026-04-14",
            title: "Meeting with Supervisor",
            time: "14:00 - 15:30",
            type: "Academic",
            location: "Department Office"
        }
    ];

    // 3. فانكشن كتحول التاريخ لـ YYYY-MM-DD باش نقارنو بسهولة
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 4. تصفية الأحداث بناءً على التاريخ اللي تبرك عليه في الـ Calendar
    const filteredEvents = events.filter(event => event.date === formatDate(value));

    const handleDateChange = (newDate) => {
        setvalue(newDate);
    };

    return (
        <>
            <Navbar />
            <div className="bg-slate-900 min-h-screen w-screen relative pb-10 pt-[60px]">
               
                <nav className="flex justify-between bg-white/5 backdrop-blur-md border-b border-white/10 h-24 text-white items-center px-10 shadow-xl">
                    <div>
                        <h1 className="text-3xl font-bold italic tracking-tight text-[#cd7329]">Student Schedule</h1>
                        <p className="text-slate-400">Manage your time and track registered events</p>
                    </div>
                    
                    <div className="flex items-center bg-[#cd7329]/10 border border-[#cd7329]/30 px-4 py-2 rounded-lg gap-3">
                        <CalendarCheckIcon className="text-[#cd7329]" />
                        <span className="font-bold text-[#cd7329]">{events.length} Total Events</span>
                    </div>
                </nav>

                <section className="max-w-[1300px] flex justify-between mx-auto mt-10 gap-10 px-5">
                    
                   
                    <div className="w-fit">
                        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-white/20 text-white">
                            <Calendar 
                                className="custom-calendar" 
                                onChange={handleDateChange} 
                                value={value} 
                            />
                        </div>
                        <div className="mt-5 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg text-white">
                             <h1 className="text-slate-300 font-medium">
                                📅 Selected: <span className="text-[#cd7329] font-bold">{value.toDateString()}</span>
                             </h1>
                        </div>
                    </div>

                    
                    <div className="flex-1 bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/20 min-h-[600px] text-white">
                        <div className="border-b border-white/10 pb-5 mb-8">
                            <h1 className="text-3xl font-bold text-white">Daily Agenda</h1>
                            <p className="text-[#cd7329] font-bold mt-1">{value.toDateString()}</p>
                        </div>

                        <div className="flex flex-col gap-6">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <div key={event.id} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border-l-4 border-[#cd7329] hover:bg-white/10 transition-all group shadow-md border-y border-r border-[#cd7329]/10">
                                        <div className="flex justify-between items-start">
                                            <div className="leading-relaxed">
                                                <p className="flex items-center gap-2 text-[#cd7329] font-bold mb-2">
                                                    <Clock size={18} /> {event.time}
                                                </p>
                                                <h2 className="text-2xl font-bold text-white group-hover:text-[#cd7329] transition-colors">
                                                    {event.title}
                                                </h2>
                                                
                                                <div className="flex items-center gap-4 mt-4">
                                                    <div className="flex bg-[#cd7329] text-white px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider items-center gap-1">
                                                        <GraduationCap size={16} /> {event.type}
                                                    </div>
                                                    <p className="flex items-center gap-2 text-slate-300 text-sm">
                                                        <MapPin size={16} className="text-red-400" /> {event.location}
                                                    </p>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center mt-20 opacity-30">
                                    <CalendarCheckIcon size={80} />
                                    <p className="text-xl mt-4 italic">No events scheduled for this day</p>
                                </div>
                            )}
                        </div>
                    </div>

                </section>
            </div>
        </>
    );
}