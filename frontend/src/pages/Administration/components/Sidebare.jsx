import { LayoutDashboard, CalendarCheck, Users, Tag, Bell, Settings, LogOut, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';

export default function Sidebare() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const NavItem = ({ icon, label, path, active = false }) => {
    return (
      <Box
        onClick={() => path && navigate(path)}
        title={collapsed ? label : undefined}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          px: "14px",
          py: "12px",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          mx: "12px",
          my: "2px",
          backgroundColor: active ? "#f97316" : "transparent",
          color: active ? "#fff" : "#8b93a7",
          "&:hover": {
            backgroundColor: active ? "#f97316" : "#1a1f2e",
            color: active ? "#fff" : "#c8cdd8",
          },
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        {icon}
        {!collapsed && (
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: active ? "600" : "500",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </Typography>
        )}
      </Box>
    );
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.clear();
    navigate("/auth/login", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#0f1117",
        width: collapsed ? "80px" : "260px",
        transition: "width 0.3s ease",
        borderRight: "1px solid #1e2130",
        overflow: "hidden",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          borderBottom: "1px solid #1e2130",
          p: "24px 20px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {!collapsed ? (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
            <Box>
              <Typography
                sx={{
                  color: "#ffffff",
                  fontWeight: 900,
                  fontSize: "18px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                UIZ<br />University
              </Typography>
              <Typography
                sx={{
                  color: "#8b93a7",
                  fontSize: "11px",
                  display: "block",
                  mt: "4px",
                }}
              >
                Administration
              </Typography>
            </Box>
            <IconButton onClick={() => setCollapsed(true)} sx={{ color: "#8b93a7", p: 0 }}>
              <Menu size={20} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <IconButton onClick={() => setCollapsed(false)} sx={{ color: "#8b93a7", p: 0 }}>
              <Menu size={20} />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Navigation Menu */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          mt: "16px",
        }}
      >
        <NavItem
          path="/responsable"
          icon={<LayoutDashboard size={19} />}
          label="Dashboard"
          active={location.pathname === '/responsable'}
        />
        <NavItem
          path="/responsable/events"
          icon={<CalendarCheck size={19} />}
          label="Event Validation"
          active={location.pathname === '/responsable/events'}
        />
        <NavItem
          path="/responsable/users"
          icon={<Users size={19} />}
          label="User Management"
          active={location.pathname === '/responsable/users'}
        />
        {/*<NavItem
          path="/responsable/notifications"
          icon={<Bell size={19} />}
          label="Notifications"
          active={location.pathname === '/responsable/notifications'}
        />*/}
        <NavItem
          path="/responsable/categories"
          icon={<Tag size={17} />}
          label="Categories"
          active={location.pathname === '/responsable/categories'}
        />
        <NavItem
          path="/responsable/news"
          icon={<Bell size={19} />}
          label="Annonces Hub"
          active={location.pathname === '/responsable/news'}
        />
      </Box>

      {/* Bottom Section: Settings & Logout */}
      <Box
        sx={{
          padding: "12px 12px 20px",
          borderTop: "1px solid #1e2130",
          mt: "auto",
        }}
      >
        <NavItem
          path="/responsable/settings"
          icon={<Settings size={17} />}
          label="Paramètres"
          active={location.pathname === '/responsable/settings'}
        />
        <Box
          onClick={handleLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            px: "14px",
            py: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            color: "#ef4444",
            transition: "all 0.15s ease",
            mx: "12px",
            my: "2px",
            "&:hover": {
              backgroundColor: "rgba(239,68,68,0.1)",
            },
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <LogOut size={19} />
          {!collapsed && (
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              Déconnexion
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}