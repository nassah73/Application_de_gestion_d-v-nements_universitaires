import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/Topbar";
import Sidebar from "./scenes/Sidebar";
import Dashboard from "./scenes/Dashboard";
import User from "./scenes/UserM";
import CategoryManagement from "./scenes/CategoryM";
import Create from "./scenes/CreateAdmin";
import Moderation from "./scenes/Moderation";
import Settings from "./scenes/Settings";
import ActivityLog from "./scenes/ActivityLog";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/Calendar";
import NewsManager from "./scenes/NewsManager";
import "./i18n";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
  
    return (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app" style={{ 
          display: "flex", 
          position: "relative", 
          background: "#0f172a", // slate-900
          height: "100vh",
          overflow: "hidden" 
        }}>
          <Sidebar isSidebar={isSidebar} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <main className="content" style={{ 
            flex: 1, 
            height: "100%", 
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}>
            <Topbar setIsSidebar={setIsSidebar} />
            <Box sx={{ flex: 1, overflow: "auto", position: "relative" }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/UserM" element={<User />} />
                <Route path="/create" element={<Create />} />
                <Route path="/categorie" element={<CategoryManagement />} />
                <Route path="/moderation" element={<Moderation />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/activity" element={<ActivityLog />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/news" element={<NewsManager />} />
              </Routes>
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    );
}
  
export default App;