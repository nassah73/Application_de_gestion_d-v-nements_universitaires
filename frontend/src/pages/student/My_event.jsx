import Navbar from "../../assets/NavBar"
import React from 'react';
import { Calendar, Clock, Users, Trash2, Ticket, Eye } from 'lucide-react';
import { motion } from "framer-motion";
const MyEvents = () => {
    
  // داتا تجريبية كتشبه للي عندك ف الصورة
  const stats = [
    { label: 'Total Registered', value: 4, icon: Calendar, color: 'text-[#cd7329]', bg: 'bg-[#cd7329]/20' },
    { label: 'Upcoming Events', value: 4, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/20' },
    { label: 'Completed Events', value: 0, icon: Users, color: 'text-slate-400', bg: 'bg-slate-700/50' },
  ];

  const [eventsList, setEventsList] = React.useState([
    {
      id: 1,
      title: "Inter-University Basketball Championship",
      category: "Sports",
      date: "March 28, 2026",
      time: "2:00 PM",
      location: "Sports Complex Arena",
      attendees: "850 attendees",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc"
    },
    {
      id: 2,
      title: "Science & Innovation Symposium",
      category: "Academic",
      date: "April 10, 2026",
      time: "10:00 AM",
      location: "Main Auditorium",
      attendees: "300 attendees",
      image: "https://www.jonesaroundtheworld.com/wp-content/uploads/2019/08/Hip-Hop-Festivals-in-America-.jpg"
    }
  ]);

  const handleDelete = (id) => {
    setEventsList(eventsList.filter(event => event.id !== id));
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-slate-900 p-8 pt-[100px] font-sans">
      {/* Header Section */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold text-[#cd7329]">My Events</h1>
        <p className="text-slate-400 mt-2">Manage your registered events and track your participation</p>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-lg flex items-center justify-between border border-white/20 hover:bg-white/15 transition-all">
            <div>
              <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
            </div>
            <div className={`${stat.bg} p-3 rounded-xl backdrop-blur-md`}>
              <stat.icon className={stat.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events List */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events ({eventsList.length})</h2>
        <div className="space-y-6">
          {eventsList.map((event) => (
            <div key={event.id} className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row border border-white/10 hover:bg-white/10 transition-all group">
              {/* Image */}
              <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 relative">
                <button onClick={() => handleDelete(event.id)} className="absolute top-6 right-6 text-red-400 hover:text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all cursor-pointer">
                  <Trash2 size={20} />
                </button>

                <div className="flex flex-col h-full">
                  <span className="bg-[#cd7329] text-white text-xs font-bold px-4 py-1.5 rounded-full w-fit mb-4 shadow-md shadow-[#cd7329]/20 tracking-wider uppercase">
                    {event.category}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 pr-12 group-hover:text-[#cd7329] transition-colors">{event.title}</h3>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    <div className="flex items-center text-slate-400 text-sm gap-2">
                      <Calendar size={16} className="text-[#cd7329]" /> <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-sm gap-2">
                      <Clock size={16} className="text-[#cd7329]" /> <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-sm gap-2">
                      <Users size={16} className="text-[#cd7329]" /> <span>{event.attendees}</span>
                    </div>
                    <div className="flex items-center text-slate-400 text-sm gap-2">
                      <Ticket size={16} className="text-[#cd7329]" /> <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <button className="bg-gradient-to-r from-[#cd7329] to-[#eb8232] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg hover:shadow-[#cd7329]/30 transition-all text-sm">
                      <Eye size={18} /> View Details
                    </button>
                    <button className="border border-white/20 text-[#cd7329] px-6 py-2.5 rounded-xl font-bold hover:bg-[#cd7329]/10 transition-all text-sm">
                      Download Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
};

export default MyEvents;