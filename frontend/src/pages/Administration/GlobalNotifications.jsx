import React, { useState } from 'react';
import { 
  Send, Mail, Bell, Users, Search, Settings, LogOut, 
  LayoutDashboard, CalendarCheck, SendHorizontal 
} from 'lucide-react';

const GlobalNotifications = () => {
  // States لتسيير الاختيارات في الفورم
  const [notifType, setNotifType] = useState('Email');
  const [recipient, setRecipient] = useState('All Students');

  // البيانات الخاصة بالسجل (Recent Notifications) من الصورة التانية
  const recentNotifications = [
    {
      id: 1,
      title: 'Science Fair 2026 Registration Open',
      to: 'All Students',
      sentAt: '2026-04-20 14:30',
      type: 'email'
    },
    {
      id: 2,
      title: 'Basketball Tournament Cancelled',
      to: '87 Event Participants',
      sentAt: '2026-04-19 09:15',
      type: 'app'
    },
    {
      id: 3,
      title: 'New Event Validation Guidelines',
      to: 'Event Organizers',
      sentAt: '2026-04-18 16:00',
      type: 'system'
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* 1. Sidebar (ثابتة على اليسار) */}
      <aside className="w-64 bg-[#1E3A8A] text-white flex flex-col shrink-0">
        <div className="p-6">
          <h1 className="text-xl font-bold uppercase tracking-wider">UIZ University</h1>
          <p className="text-xs text-blue-200">Event Management</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem icon={<CalendarCheck size={20} />} label="Event Validation" />
          <NavItem icon={<Users size={20} />} label="User Management" />
          <NavItem icon={<Bell size={20} />} label="Notifications" active />
        </nav>
        <div className="p-4 border-t border-blue-800 space-y-2">
          <NavItem icon={<Settings size={20} />} label="Settings" />
          <NavItem icon={<LogOut size={20} />} label="Logout" />
        </div>
      </aside>

      {/* 2. Main Content (الجزء الذي يتحرك Scroll) */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header (ثابت في الأعلى) */}
        <header className="bg-white h-16 border-b flex items-center justify-between px-8 shrink-0 z-10">
          <div className="relative w-96">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search size={18} />
            </span>
            <input 
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Search..." 
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="p-2 text-slate-400 relative cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex items-center gap-3 border-l pl-4">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700">Admin User</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Super Administrator</p>
              </div>
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">U</div>
            </div>
          </div>
        </header>

        {/* Scrollable Container (هنا يقع السكرول) */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          
          {/* Section: Send Notification Form */}
          <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-8">Send Notification</h2>
            
            <div className="space-y-8">
              {/* اختيار نوع الإشعار */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Notification Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <SelectCard 
                    icon={<Mail size={24} />} 
                    label="Email" 
                    selected={notifType === 'Email'} 
                    onClick={() => setNotifType('Email')} 
                  />
                  <SelectCard 
                    icon={<Bell size={24} />} 
                    label="In-App" 
                    selected={notifType === 'In-App'} 
                    onClick={() => setNotifType('In-App')} 
                  />
                </div>
              </div>

              {/* اختيار المجموعة المستهدفة */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">Recipient Group</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RecipientOption 
                    label="All Students" 
                    subText="3842 recipients" 
                    selected={recipient === 'All Students'} 
                    onClick={() => setRecipient('All Students')} 
                  />
                  <RecipientOption 
                    label="Event Participants" 
                    subText="1256 recipients" 
                    selected={recipient === 'Event Participants'} 
                    onClick={() => setRecipient('Event Participants')} 
                  />
                </div>
              </div>

              {/* المدخلات (Title & Message) */}
              <div className="space-y-4">
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter notification title..."
                />
                <textarea 
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Compose your message..."
                ></textarea>
              </div>

              {/* أزرار الإرسال */}
              <div className="flex items-center gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-[#1E3A8A] hover:bg-blue-900 text-white py-3 rounded-lg font-bold transition-all">
                  <SendHorizontal size={18} /> Send Notification
                </button>
                <button className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold transition-all">
                  Save as Draft
                </button>
              </div>
            </div>
          </section>

          {/* Section: Recent Notifications List (الجزء السفلي) */}
          <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Notifications</h3>
            <div className="space-y-3">
              {recentNotifications.map((notif) => (
                <div key={notif.id} className="flex items-center justify-between p-4 border border-slate-50 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${notif.type === 'email' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      {notif.type === 'email' ? <Mail size={20} /> : <SendHorizontal size={20} />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-700">{notif.title}</h4>
                      <p className="text-[11px] text-slate-400">To: {notif.to} | Sent: {notif.sentAt}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                    <span className="text-[10px] font-bold uppercase">sent</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

// --- المكونات المساعدة (Internal Components) ---

const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-white text-[#1E3A8A]' : 'hover:bg-blue-800 text-blue-100'}`}>
    {icon} <span className="text-sm font-medium">{label}</span>
  </div>
);

const SelectCard = ({ icon, label, selected, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-6 border-2 rounded-xl flex flex-col items-center gap-3 cursor-pointer transition-all ${
      selected ? 'border-[#1E3A8A] bg-blue-50 text-[#1E3A8A]' : 'border-slate-100 text-slate-400'
    }`}
  >
    {icon} <span className="text-sm font-bold">{label}</span>
  </div>
);

const RecipientOption = ({ label, subText, selected, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
      selected ? 'border-[#1E3A8A] bg-blue-50' : 'border-slate-100'
    }`}
  >
    <p className={`text-sm font-bold ${selected ? 'text-[#1E3A8A]' : 'text-slate-700'}`}>{label}</p>
    <p className="text-[11px] text-slate-400">{subText}</p>
  </div>
);

export default GlobalNotifications;