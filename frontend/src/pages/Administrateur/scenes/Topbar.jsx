import { Box, IconButton, useTheme, InputBase, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import { useTranslation } from "react-i18next";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLangClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLangClose = (lang) => {
    if (lang) i18n.changeLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "space-between", 
      p: 2,
      height: "64px",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 10,
      backgroundColor: "rgba(15, 23, 42, 0.85)", // slate-900 with alpha
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    }}>
      {/* SEARCH BAR */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          backgroundColor: "rgba(255, 255, 255, 0.06)",
          borderRadius: "10px",
          alignItems: "center",
          px: 2,
          border: "1px solid rgba(255, 255, 255, 0.12)",
          width: "320px",
          transition: "all 0.2s",
          "&:focus-within": {
            borderColor: "#cd7329",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          }
        }}
      >
        <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "20px" }} />
        <InputBase sx={{ ml: 1, flex: 1, color: "white", fontSize: "14px" }} placeholder={t("Rechercher...")} />
      </Box>

      {/* ICONS */}
      <Box display="flex" gap="10px">
        <IconButton onClick={handleLangClick} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <LanguageOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleLangClose()}
        >
          <MenuItem onClick={() => handleLangClose("fr")}>Français</MenuItem>
          <MenuItem onClick={() => handleLangClose("en")}>English</MenuItem>
        </Menu>
        
        <IconButton onClick={colorMode.toggleColorMode} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;