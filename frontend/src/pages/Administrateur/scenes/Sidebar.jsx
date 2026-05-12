import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useTranslation } from "react-i18next";
import { FaLayerGroup, FaUserPlus, FaChartBar, FaUsers, FaCogs , FaNewspaper } from "react-icons/fa";
import { MdCalendarMonth, MdLogout } from "react-icons/md";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const isActive = selected === title;
  return (
    <MenuItem
      active={isActive}
      style={{ color: isActive ? "#ffffff" : "#8b93a7" }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography sx={{ fontSize: "14px", fontWeight: isActive ? "600" : "500" }}>
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar, isCollapsed, setIsCollapsed }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Statistiques Globales");
  

  // ✅ logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); 
     localStorage.clear();// ولا token حسب المشروع ديالك
    navigate("/auth/login", { replace: true });
  };

 

  return (
    <Box
      sx={{
        display: isSidebar ? "block" : "none",
        position: "sticky",
        top: 0,
        height: "100vh",
        zIndex: 10,

        "& .pro-sidebar": {
          height: "100vh",
          width: isCollapsed ? "80px !important" : "260px !important",
          minWidth: isCollapsed ? "80px !important" : "260px !important",
        },
        "& .pro-sidebar-inner": {
          background: "#0f1117 !important",
          borderRight: "1px solid #1e2130 !important",
        },
        "& .pro-sidebar-layout": {
          display: "flex !important",
          flexDirection: "column !important",
          height: "100% !important",
          overflowY: "auto !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          color: "#8b93a7 !important",
        },
        "& .pro-inner-item": {
          padding: "12px 14px !important",
          borderRadius: "10px !important",
          margin: "2px 12px !important",
          color: "#8b93a7 !important",
          transition: "all 0.15s ease !important",
        },
        "& .pro-inner-item:hover": {
          backgroundColor: "#1a1f2e !important",
          color: "#c8cdd8 !important",
        },
        "& .pro-menu-item.active .pro-inner-item": {
          backgroundColor: "#f97316 !important",
          borderRadius: "10px !important",
        },
        "& .pro-menu-item.active .pro-inner-item *": {
          color: "white !important",
          fontWeight: "600 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">

          {/* HEADER */}
          <Box sx={{ borderBottom: "1px solid #1e2130", p: "24px 20px 20px" }}>
            {!isCollapsed ? (
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
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
                <IconButton onClick={() => setIsCollapsed(true)} sx={{ color: "#8b93a7" }}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton onClick={() => setIsCollapsed(false)} sx={{ color: "#8b93a7" }}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* MENU ITEMS */}
          <Box sx={{ mt: "16px" }}>
            <Item title={t("Statistiques Globales")} to="/administrateur" icon={<FaChartBar size={19} />} selected={selected} setSelected={setSelected} />
            <Item title={t("Gestion Utilisateurs")} to="/administrateur/UserM" icon={<FaUsers size={19} />} selected={selected} setSelected={setSelected} />
            <Item title={t("Ajouter Admin")} to="/administrateur/create" icon={<FaUserPlus size={19} />} selected={selected} setSelected={setSelected} />
            <Item title={t("Gestion Catégories")} to="/administrateur/categorie" icon={<FaLayerGroup size={17} />} selected={selected} setSelected={setSelected} />
            <Item title={t("Paramètres")} to="/administrateur/settings" icon={<FaCogs size={17} />} selected={selected} setSelected={setSelected} />
            <Item title={t("Calendrier")} to="/administrateur/calendar" icon={<MdCalendarMonth size={19} />} selected={selected} setSelected={setSelected} />
            <Item title={t("News Hub")} to="/administrateur/news" icon={<FaNewspaper size={19} />} selected={selected} setSelected={setSelected} />
          </Box>
        </Menu>

        {/* DÉCONNEXION */}
        <Box
          sx={{
            padding: "12px 12px 20px",
            borderTop: "1px solid #1e2130",
            mt: "auto",
          }}
        >
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
              "&:hover": {
                backgroundColor: "rgba(239,68,68,0.1)",
              },
            }}
          >
            <MdLogout size={19} />
            {!isCollapsed && (
              <Typography sx={{ fontSize: "14px", color: "inherit", fontWeight: 500 }}>
                {t("Déconnexion")}
              </Typography>
            )}
          </Box>
        </Box>

      </ProSidebar>
    </Box>
  );
};

export default Sidebar;