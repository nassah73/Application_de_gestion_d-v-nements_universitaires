import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios'; // زيد هادي
import ProfileImg from './bg.jpg';
import { 
  Bell, UserCircle, Mail, Phone, UserSquare, 
  GraduationCap, PencilLine, LogOut, Calendar 
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  const [profilOpen, setProfilOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // --- الجديدة: State ديال الإعلانات ---
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // 1. جلب بيانات المستخدم
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData(parsedUser?.user || parsedUser);
      } catch (error) { console.error(error); }
    }

    // 2. جلب الإعلانات من الـ Backend (نفس الـ API اللي ف صفحة Main)
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news/all');
        // كنجيبو غير آخر 4 إعلانات مثلاً باش ما تعمرش النافذة بزاف
        setAnnouncements(response.data.slice(0, 4));
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchAnnouncements();

    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) setProfilOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(event.target)) setNotificationsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    setProfilOpen(false);
    navigate('/', { replace: true });
  };

  return (
    <nav className='main bg-[#0f172a]/95 backdrop-blur-md border-b border-white/10 text-white h-15 flex justify-between absolute w-full top-0 z-50 capitalize items-center font-[600]'>
      <h1 className='font-[800] uppercase relative left-20'>
        <span className='text-[#cd7329]'>fpt</span><span>event</span>
      </h1>
      
      <ul className='flex gap-10 text-slate-400 relative'>
        {[
          { name: 'Événements', path: '/app/Event' },
          { name: 'Calendrier', path: '/app/Calendare' },
          { name: 'Mes Événements', path: '/app/My_event' },
          { name: 'Annonces', path: '/app/Annencement' },
          { name: 'Analyses', path: '/app/Analityc' }
        ].map((item, index) => (
          <NavLink to={item.path} key={index} className={({ isActive }) =>
            `px-4 py-2 transition-all duration-300 ${isActive ? 'text-[#cd7329] border-b-2 border-[#cd7329] bg-[#cd7329]/10' : 'hover:text-[#cd7329]'}`
          }>{item.name}</NavLink>
        ))}
      </ul>

      <div className='flex gap-12 relative right-20 items-center'>
        
        {/* --- Notifications Dropdown (DYNAMIC) --- */}
        <div className='relative' ref={notificationRef}>
          <div className='relative cursor-pointer group' onClick={() => { setNotificationsOpen(!notificationsOpen); setProfilOpen(false); }}>
            <Bell className={`transition-colors ${notificationsOpen ? 'text-[#cd7329]' : 'text-slate-400 group-hover:text-white'}`} size={24} strokeWidth={1.5} />
            
            {/* Badge كيبان غير إيلا كاينين إعلانات */}
            {announcements.length > 0 && (
              <span className='absolute -top-1 -right-1 flex h-3 w-3'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-3 w-3 bg-red-500'></span>
              </span>
            )}
          </div>

          {notificationsOpen && (
            <div className='absolute z-40 right-0 mt-6 w-80 bg-[#1e293b] border border-white/10 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in duration-200'>
              <div className='p-4 border-b border-white/10 flex justify-between items-center bg-[#1e293b]'>
                <h3 className='font-bold text-sm'>Notifications</h3>
                <span className='text-[10px] bg-[#cd7329]/20 text-[#cd7329] px-2 py-0.5 rounded-full'>
                  {announcements.length} Nouvelles
                </span>
              </div>

              <div className='max-h-64 overflow-y-auto'>
                {announcements.length > 0 ? (
                  announcements.map((news) => (
                    <div 
                      key={news._id} 
                      onClick={() => navigate('/app/Annencement')}
                      className='p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors'
                    >
                      <p className={`text-[10px] font-bold mb-1 ${news.category === 'Urgent Alert' ? 'text-red-400' : 'text-[#cd7329]'}`}>
                        {news.category}
                      </p>
                      <p className='text-xs text-white font-medium line-clamp-1'>{news.title}</p>
                      <p className='text-[10px] text-slate-500 mt-1'>
                        {new Date(news.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className='p-8 text-center text-slate-500 text-xs'>Aucune notification</div>
                )}
              </div>

              <NavLink 
                to="/app/Annencement" 
                onClick={() => setNotificationsOpen(false)}
                className='block p-3 text-center text-xs text-[#cd7329] hover:bg-[#cd7329]/10 font-bold transition-colors border-t border-white/10'
              >
                Voir toutes les annonces
              </NavLink>
            </div>
          )}
        </div>

        {/* Profile Dropdown (كما هو) */}
        <div className='relative leading-5' ref={profileRef}>
          <button className={`hover:cursor-pointer transition-colors pt-1 ${profilOpen ? 'text-[#cd7329]' : 'text-slate-400 hover:text-white'}`} onClick={() => { setProfilOpen(!profilOpen); setNotificationsOpen(false); }}>
            {userData?.profileImage ? (
              <img 
                src={`http://localhost:5000/${userData.profileImage.replace(/\\/g, '/')}`} 
                alt="Profile Icon" 
                className='h-7 w-7 rounded-full object-cover border border-white/20' 
              />
            ) : (
              <UserCircle size={26} strokeWidth={1.5} />
            )}
          </button>
          {profilOpen && (
             <div className='absolute z-40 right-0 mt-6 h-auto py-4 w-80 bg-[#1e293b] border border-white/10 shadow-2xl rounded-2xl animate-in fade-in zoom-in duration-200'>
                {/* ... (باقي كود البروفايل) ... */}
                <div className='flex flex-col items-center'>
                  <img 
                    src={userData?.profileImage ? `http://localhost:5000/${userData.profileImage.replace(/\\/g, '/')}` : ProfileImg} 
                    alt="Profile" 
                    className='rounded-full h-24 w-24 object-cover mt-2 border-2 border-[#cd7329]/30' 
                  />
                  <div className='text-center mt-3 text-white px-4'>
                    <h1 className="font-bold truncate w-64">{userData?.fullName || userData?.displayName || 'Utilisateur'}</h1>
                    <p className="text-slate-400 text-sm uppercase tracking-wider">CNE: {userData?.cne || '---'}</p>
                  </div>
                </div>
                <hr className='mt-4 border-white/10' />
                <div className='mt-4 px-6 text-slate-300 space-y-4 text-sm'>
                  <p className='flex gap-3 items-center'><Mail size={17} className="text-[#cd7329]" /> {userData?.email}</p>
                  <p className='flex gap-3 items-center'><Phone size={17} className="text-[#cd7329]" /> {userData?.phone || 'Non spécifié'}</p>
                  <hr className='border-white/10 w-full' />
                  <p className='flex gap-3 items-center'><UserSquare size={17} className="text-[#cd7329]" /> Filière: <span className='uppercase font-medium'>{userData?.filiere}</span></p>
                  <p className='flex gap-3 items-center'><GraduationCap size={17} className="text-[#cd7329]" /> Niveau: {userData?.niveau}</p>
                  <hr className='border-white/10 w-full' />
                  <div className='flex text-sm font-bold pt-2 justify-center'>
                    <button onClick={handleLogout} className='w-full py-2 flex gap-2 items-center justify-center hover:text-red-400 transition-colors text-red-500'>Déconnexion</button>
                  </div>
                </div>
             </div>
          )}
        </div>

        <button 
          onClick={handleLogout}
          className='bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all rounded-xl h-10 w-32 capitalize'
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}