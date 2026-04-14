import Navbar from "../../assets/NavBar"
import React from 'react';
import { Calendar, Clock, Users, Trash2, Ticket, Eye } from 'lucide-react';

const MyEvents = () => {
    
  // داتا تجريبية كتشبه للي عندك ف الصورة
  const stats = [
    { label: 'Total Registered', value: 4, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Upcoming Events', value: 4, icon: Clock, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Completed Events', value: 0, icon: Users, color: 'text-gray-600', bg: 'bg-gray-100' },
  ];

  const events = [
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
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-[#28374e] p-8 font-sans">
      {/* Header Section */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">My Events</h1>
        <p className="text-gray-500 mt-1">Manage your registered events and track your participation</p>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#0f172a]  p-6 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100 hover:shadow-md transition">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
              <h3 className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</h3>
            </div>
            <div className={`${stat.bg} p-3 rounded-xl`}>
              <stat.icon className={stat.color} size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Events List */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Events ({events.length})</h2>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="bg-[#0f172a]  rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row border border-gray-100 hover:border-blue-200 transition group">
              {/* Image */}
              <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 relative">
                <button className="absolute top-6 right-6 text-red-400 hover:text-red-600 transition">
                  <Trash2 size={20} />
                </button>

                <div className="flex flex-col h-full">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                    {event.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4 pr-8">{event.title}</h3>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                    <div className="flex items-center text-gray-500 text-sm gap-2">
                      <Calendar size={16} /> <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm gap-2">
                      <Clock size={16} /> <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm gap-2">
                      <Users size={16} /> <span>{event.attendees}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm gap-2">
                      <Ticket size={16} /> <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <button className="bg-[#164167] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#0d2a45] transition text-sm">
                      <Eye size={18} /> View Details
                    </button>
                    <button className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-50 transition text-sm">
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