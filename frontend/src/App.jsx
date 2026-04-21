import { Routes, Route, Navigate } from 'react-router-dom';

// استيراد الصفحات اللي صاوبنا (تأكد من المسار الصحيح حسب Dossiers ديالك)
import Dashboard from './pages/Administration/index';
import ValidateEvents from './pages/Administration/ValidateEvents';
import ValidateOrganizers from './pages/Administration/ValidateOrganizers';
import GlobalNotifications from './pages/Administration/GlobalNotifications';
import EventCategories from './pages/Administration/EventCategories';

function App() {
  return (
    <Routes>
      {/* توجيه تلقائي لصفحة Dashboard فاش كيدخل المسؤول */}
      <Route path="/responsable" element={<Dashboard />} />
      
      <Route path="/responsable/events" element={<ValidateEvents />} />
      <Route path="/responsable/users" element={<ValidateOrganizers />} />
      <Route path="/responsable/notifications" element={<GlobalNotifications />} />
      <Route path="/responsable/categories" element={<EventCategories />} />

      {/* إلا دخل لشي رابط ما كاينش، يرجعو لـ Dashboard */}
      <Route path="*" element={<Navigate to="/responsable" />} />
    </Routes>
  );
}

export default App;