import { Routes, Route, Navigate } from 'react-router-dom';

import Appk from './pages/student/App'

function App() {
  return (
    <Routes>
      {/* Redirect root to organizer dashboard for now to see the interface */}
      
      <Route path='/app/*' element={<Appk/>}/>
      
    </Routes>
  );
}

export default App;
