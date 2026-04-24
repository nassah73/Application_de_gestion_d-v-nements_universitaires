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

const Sidebar = () => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Global Statistics");

  return (
    <Box
      sx={{
        
        position: "sticky",
        top: 0,
        height: "100vh",

        "& .pro-sidebar": {
          height: "100vh",
          width: isCollapsed ? "80px !important" : "240px !important",
          minWidth: isCollapsed ? "80px !important" : "240px !important",
        },
        "& .pro-sidebar-inner": {
          background: "#1e2a4a !important",
        },
        "& .pro-sidebar-layout": {
          display: "flex !important",
          flexDirection: "column !important",
          height: "100% !important",
          overflowY: "auto !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
          color: "rgba(255,255,255,0.75) !important",
        },
        "& .pro-inner-item": {
          padding: "10px 16px 10px 16px !important",
          borderRadius: "10px !important",
          margin: "2px 10px !important",
          color: "rgba(255,255,255,0.75) !important",
          transition: "all 0.2s ease !important",
        },
        "& .pro-inner-item:hover": {
          backgroundColor: "rgba(0,0,255,0.1) !important",
          color: "white !important",
        },
        // ✅ Active: fond blanc, texte + icon bleu
        "& .pro-menu-item.active .pro-inner-item": {
          backgroundColor: "white !important",
          borderRadius: "10px !important",
        },
        "& .pro-menu-item.active .pro-inner-item *": {
          color: "#1e2a4a !important",
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
                
                <IconButton onClick={() => setIsCollapsed(true)} sx={{ color: "white" ,ml: "36%"}}>
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
              <Item title="Global Statistics" to="/" icon={<FaChartBar size={20} />} selected={selected} setSelected={setSelected} />
            </Box>
            <Item title="User Management" to="/team" icon={<FaUsers size={22} />} selected={selected} setSelected={setSelected} />
            <Item title="Profile Form" to="/form" icon={<FaUserPlus size={21} />} selected={selected} setSelected={setSelected} />
            <Item title="Category Management" to="/pie" icon={<FaLayerGroup size={18}/>} selected={selected} setSelected={setSelected} />
            <Item title="Calendar" to="/calendar" icon={<MdCalendarMonth size={26} />} selected={selected} setSelected={setSelected} />
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