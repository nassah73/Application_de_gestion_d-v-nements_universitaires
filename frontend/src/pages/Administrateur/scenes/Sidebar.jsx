import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { FaLayerGroup } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdCalendarMonth } from "react-icons/md";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const isActive = selected === title;
  return (
    <MenuItem
      
      active={isActive}
      style={{ color: "white" }}
      onClick={() => setSelected(title)}
      icon={icon}
      
    >
      
      <Typography fontSize="15px" fontWeight={isActive ? "600" : "400"}>
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar, isCollapsed, setIsCollapsed }) => {
  const theme = useTheme();
  const [selected, setSelected] = useState("Statistiques Globales");

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
          width: isCollapsed ? "80px !important" : "240px !important",
          minWidth: isCollapsed ? "80px !important" : "240px !important",
        },
        "& .pro-sidebar-inner": {
          background: "linear-gradient(145deg, rgba(205,115,41,0.95), rgba(168,85,20,0.9)) !important",
        },
        "& .pro-sidebar-layout": {
          display: "flex !important",
          flexDirection: "column !important",
          height: "100% !important",
          overflowY: "auto !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          color: "rgba(255,255,255,0.85) !important",
        },
        "& .pro-inner-item": {
          padding: "10px 16px 10px 16px !important",
          borderRadius: "10px !important",
          margin: "2px 10px !important",
          color: "rgba(255,255,255,0.85) !important",
          transition: "all 0.2s ease !important",
        },
        "& .pro-inner-item:hover": {
          backgroundColor: "rgba(255,255,255,0.1) !important",
          color: "white !important",
        },
        // ✅ Active: fond blanc transparent, texte blanc
        "& .pro-menu-item.active .pro-inner-item": {
          backgroundColor: "rgba(255,255,255,0.2) !important",
          borderRadius: "10px !important",
        },
        "& .pro-menu-item.active .pro-inner-item *": {
          color: "white !important",
          fontWeight: "700 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">

          {/* ✅ HEADER */}
          <Box
            px="20px"
            py="20px"
            sx={{ borderBottom: "1px solid rgba(255,255,255,0.12)", p: "20px" }}
          >
            {!isCollapsed ? (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" color="white" fontWeight="900" sx={{ letterSpacing: "1px", textTransform: "uppercase" }}>
                    UIZ University
                  </Typography>
                  <Typography variant="caption" color="rgba(255,255,255,0.6)" sx={{ display: "block", mt: "-2px" }}>
                    Administration
                  </Typography>
                </Box>
                <IconButton onClick={() => setIsCollapsed(true)} sx={{ color: "white" }}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            ) : (
              <Box display="flex" justifyContent="center">
                <IconButton onClick={() => setIsCollapsed(false)} sx={{ color: "white" }}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* ✅ MENU ITEMS */}
          <Box mt="10px">
            <Box sx={{pt: "20px"}}>
              <Item title="Statistiques Globales" to="/administrateur" icon={<FaChartBar size={20} />} selected={selected} setSelected={setSelected} />
            </Box>
            <Item title="Gestion Utilisateurs" to="/administrateur/UserM" icon={<FaUsers size={22} />} selected={selected} setSelected={setSelected} />
            <Item title="Ajouter Admin" to="/administrateur/form" icon={<FaUserPlus size={21} />} selected={selected} setSelected={setSelected} />
            <Item title="Gestion Catégories" to="/administrateur/pie" icon={<FaLayerGroup size={18}/>} selected={selected} setSelected={setSelected} />
            <Item title="Calendrier" to="/administrateur/calendar" icon={<MdCalendarMonth size={26} />} selected={selected} setSelected={setSelected} />
          </Box>
        </Menu>

        {/* ✅ USER PROFILE - horizontal f bas bhal screenshot */}
        <Box
          display="flex"
          alignItems="center"
          gap="12px"
          px="16px"
          py="16px"
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            mt: "auto",
          }}
        >
          

          
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;