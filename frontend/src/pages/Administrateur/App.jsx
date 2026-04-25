import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/Topbar";
import Sidebar from "./scenes/Sidebar";
import Dashboard from "./scenes/Dashboard";
import UserM from "./scenes/UserM";
import Form from "./scenes/CreateAdmin";
import Pie from "./scenes/CategoryM";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar";   // ?

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/UserM" element={<UserM />} />
                <Route path="/form" element={<Form />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/calendar" element={<Calendar />} />
              </Routes>
                
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
  
export default App;