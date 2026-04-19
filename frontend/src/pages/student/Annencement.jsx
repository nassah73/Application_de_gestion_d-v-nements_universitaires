import React from 'react';
import Navbar from "../../assets/NavBar";
import { Bell, AlertTriangle, Info, MapPin, Calendar, FileText, Download, ExternalLink } from 'lucide-react';

// 1. المكونات الصغيرة خاصها تكون معرفة برا المكون الكبير Main
const FilterItem = ({ label, count, color }) => (
  <button className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="font-medium text-slate-600 group-hover:text-slate-900">{label}</span>
    </div>
    <span className="text-slate-400 font-bold text-sm bg-slate-100 px-2 py-0.5 rounded-lg">{count}</span>
  </button>
);

const ActionButton = ({ icon, label, variant = "primary" }) => (
  <button className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-sm ${
    variant === "primary" ? "bg-blue-900 text-white hover:bg-blue-800" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
  }`}>
    {icon}
    {label}
  </button>
);

const AnnouncementCard = ({ tag, tagColor, date, title, description, type, primaryAction, secondaryAction }) => (
  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-50 hover:shadow-md transition-shadow relative text-left">
    <div className="absolute right-8 top-8">
      <div className={`p-2 rounded-full ${type === 'warning' ? 'bg-orange-50 text-orange-400' : 'bg-blue-50 text-blue-400'}`}>
        {type === 'warning' ? <Bell className="w-5 h-5" /> : <Info className="w-5 h-5" />}
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className={`text-[10px] font-black px-3 py-1 rounded-full border tracking-wider uppercase ${tagColor}`}>{tag}</span>
        <span className="text-slate-400 text-sm font-medium">{date}</span>
      </div>
      <h3 className="text-2xl font-bold text-slate-800 leading-tight pr-12">{title}</h3>
      <p className="text-slate-500 leading-relaxed text-lg mb-4">{description}</p>
      <div className="flex flex-wrap gap-4 mt-2">
        {primaryAction}
        {secondaryAction}
      </div>
    </div>
  </div>
);

// 2. المكون الأساسي
export default function Main() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f172a] p-4 md:p-8 font-sans">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
            <Bell className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white ">News Hub</h1>
            <p className="text-white ">Stay updated with campus announcements and event news</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-blue-400 rounded-3xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6 px-2 text-left">Filter Announcements</h3>
              <nav className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-900 text-white shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5" />
                    <span className="font-medium">All Alerts</span>
                  </div>
                  <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-bold">10</span>
                </button>
                <FilterItem label="Important" count="3" color="bg-rose-500" />
                <FilterItem label="New" count="3" color="bg-blue-500" />
                <FilterItem label="Reminders" count="1" color="bg-amber-500" />
              </nav>
            </div>

            {/* Campus Map Card */}
            <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl overflow-hidden relative group text-left">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6" />
                  <h3 className="font-bold text-xl">Campus Map</h3>
                </div>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                  Explore campus venues and find your way to events
                </p>
                <button className="w-full bg-white text-blue-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                  <MapPin className="w-4 h-4" />
                  Explore Venues
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9 space-y-6 text-left">
            {/* Urgent Alert */}
            <div className="bg-rose-50 border border-rose-100 rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="bg-rose-500 p-4 rounded-2xl self-start shadow-lg">
                  <AlertTriangle className="text-white w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-rose-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">Urgent Alert</span>
                    <span className="text-slate-400 text-sm font-medium">April 13, 2026 • 08:30 AM</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 mb-4 leading-tight">Emergency Weather Alert: Basketball Championship Postponed</h2>
                  <p className="text-slate-600 leading-relaxed mb-6 max-w-3xl text-lg">
                    Due to severe weather conditions, the Inter-University Basketball Championship scheduled for today has been postponed.
                  </p>
                  <button className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-800 transition-all shadow-lg">
                    <Calendar className="w-5 h-5" />
                    View Event Details
                    <ExternalLink className="w-4 h-4 opacity-70" />
                  </button>
                </div>
              </div>
            </div>

            {/* Normal Announcements */}
            <AnnouncementCard 
              tag="Exam Schedule"
              tagColor="bg-orange-50 text-orange-600 border-orange-100"
              date="April 12, 2026 • 02:15 PM"
              title="Final Exam Schedule Released for Spring Semester 2026"
              description="The final examination schedule for all departments has been published. Students are advised to check their individual timetables."
              type="warning"
              primaryAction={<ActionButton icon={<FileText className="w-4 h-4"/>} label="Read More" />}
              secondaryAction={<ActionButton icon={<Download className="w-4 h-4"/>} label="Download PDF" variant="secondary" />}
            />

            <AnnouncementCard 
              tag="Club Alert"
              tagColor="bg-purple-50 text-purple-600 border-purple-100"
              date="April 12, 2026 • 10:00 AM"
              title="New Workshop: Introduction to AI & Machine Learning"
              description="The Computer Science Club is hosting a hands-on workshop on AI and Machine Learning basics."
              type="info"
              primaryAction={<ActionButton icon={<FileText className="w-4 h-4"/>} label="Read More" />}
              secondaryAction={<ActionButton icon={<Calendar className="w-4 h-4"/>} label="View Event" variant="secondary" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}

// --- Sub-components to keep code clean ---


