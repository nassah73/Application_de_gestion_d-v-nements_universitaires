import NotificationBell from './NotificationBell';

const OrgNavbar = () => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">Bienvenue, Organisateur</h1>
      <div className="flex items-center gap-4">
        {/* أيقونة الإشعارات */}
        <NotificationBell />
        
        {/* صورة الحساب */}
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          O
        </div>
      </div>
    </header>
  );
};

export default OrgNavbar;