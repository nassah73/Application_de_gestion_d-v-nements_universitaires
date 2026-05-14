import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconBell = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const IconChevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconSettings = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>
);

const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

// ─── Notification Panel ───────────────────────────────────────────────────────

const notifications = [
  { id: 1, text: <>Nouvel événement créé par <strong style={{ color: "#cd7329" }}>Sarah M.</strong></>, time: "il y a 5 min" },
  { id: 2, text: <>12 nouvelles inscriptions <strong style={{ color: "#cd7329" }}>Conf Tech 2026</strong></>, time: "il y a 23 min" },
  { id: 3, text: "Rapport mensuel disponible", time: "il y a 1h" },
];

const NotifPanel = ({ onClear }) => (
  <Box sx={{
    position: "absolute", top: "calc(100% + 8px)", right: 0,
    width: 300, background: "#111c35",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px",
    overflow: "hidden", zIndex: 999,
    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
  }}>
    <Box sx={{ p: "12px 16px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Notifications</Typography>
      <Typography onClick={onClear} sx={{ fontSize: "11px", color: "#cd7329", cursor: "pointer", "&:hover": { opacity: 0.7 } }}>
        Tout marquer lu
      </Typography>
    </Box>
    {notifications.map((n) => (
      <Box key={n.id} sx={{
        p: "10px 16px", display: "flex", gap: "10px", alignItems: "flex-start",
        borderTop: "1px solid rgba(255,255,255,0.04)", cursor: "pointer",
        "&:hover": { background: "rgba(205,115,41,0.06)" },
      }}>
        <Box sx={{ width: 7, height: 7, borderRadius: "50%", background: "#cd7329", mt: "5px", flexShrink: 0 }} />
        <Box>
          <Typography sx={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>{n.text}</Typography>
          <Typography sx={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", mt: "2px" }}>{n.time}</Typography>
        </Box>
      </Box>
    ))}
    <Box sx={{ p: "10px 16px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <Typography sx={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", cursor: "pointer", "&:hover": { color: "#cd7329" } }}>
        Voir toutes les notifications →
      </Typography>
    </Box>
  </Box>
);

// ─── User Menu ────────────────────────────────────────────────────────────────

const UserMenu = () => (

   <div></div>
);

// ─── Topbar ───────────────────────────────────────────────────────────────────

const Topbar = ({ isMobile }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(3);
  const notifRef = useRef(null);
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleNotif = () => { setNotifOpen((v) => !v); setMenuOpen(false); };
  const toggleMenu = () => { setMenuOpen((v) => !v); setNotifOpen(false); };
  const clearNotifs = () => { setNotifCount(0); setNotifOpen(false); };

  return (
    <Box sx={{
      display: "flex", alignItems: "center",
      gap: isMobile ? "10px" : "14px",
      p: isMobile ? "12px 14px" : "14px 24px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      background: "#0d1526",
    }}>
      {/* Logo — mobile only */}
      {isMobile && (
        <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#cd7329", letterSpacing: "1px", flexShrink: 0 }}>
          UIZ
        </Typography>
      )}

      {/* Search */}
      <Box sx={{
        flex: 1, display: "flex", alignItems: "center", gap: "8px",
        background: "#111c35", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px", p: isMobile ? "8px 12px" : "9px 14px",
        transition: "border 0.2s",
        "&:hover": { borderColor: "rgba(205,115,41,0.4)" },
      }}>
        <IconSearch />
        <Typography component="input"
          placeholder={isMobile ? "Rechercher..." : "Rechercher ..."}
          sx={{
            background: "none", border: "none", outline: "none",
            color: "rgba(255,255,255,0.5)", fontSize: "13px",
            width: "100%", fontFamily: "inherit",
          }}
        />
      </Box>

      {/* Right actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>

        {/* Bell */}
        <Box ref={notifRef} sx={{ position: "relative" }}>
          <Box onClick={toggleNotif} sx={{
            width: isMobile ? 34 : 38, height: isMobile ? 34 : 38,
            background: notifOpen ? "rgba(205,115,41,0.1)" : "#111c35",
            border: `1px solid ${notifOpen ? "rgba(205,115,41,0.4)" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(255,255,255,0.6)",
            transition: "all 0.2s",
            "&:hover": { borderColor: "rgba(205,115,41,0.4)", background: "rgba(205,115,41,0.06)" },
          }}>
            <IconBell />
            {notifCount > 0 && (
              <Box sx={{
                position: "absolute", top: -5, right: -5,
                width: 17, height: 17, background: "#cd7329", borderRadius: "50%",
                fontSize: "9px", fontWeight: 700, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid #0d1526",
              }}>
                {notifCount}
              </Box>
            )}
          </Box>
          {notifOpen && <NotifPanel onClear={clearNotifs} />}
        </Box>

        {/* User chip — desktop only */}
        {!isMobile && (
          <Box ref={menuRef} sx={{ position: "relative" }}>
            <Box onClick={toggleMenu} sx={{
              display: "flex", alignItems: "center", gap: "10px",
              background: menuOpen ? "rgba(205,115,41,0.08)" : "#111c35",
              border: `1px solid ${menuOpen ? "rgba(205,115,41,0.4)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "10px", p: "7px 10px 7px 8px", cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": { borderColor: "rgba(205,115,41,0.4)", background: "rgba(205,115,41,0.06)" },
            }}>
              {/* Avatar with online dot */}
              <Box sx={{ position: "relative", flexShrink: 0 }}>
                <Box sx={{
                  width: 28, height: 28, borderRadius: "8px", background: "#cd7329",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: 700, color: "#fff",
                }}>
                  A
                </Box>
                <Box sx={{
                  position: "absolute", bottom: -2, right: -2,
                  width: 9, height: 9, background: "#22c55e",
                  borderRadius: "50%", border: "2px solid #111c35",
                }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
                ADMINISTRATION
                </Typography>
                <Typography sx={{ fontSize: "10px", color: "#22c55e" }}>
                  ● en ligne
                </Typography>
              </Box>
              <Box sx={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", ml: "2px" }}>
                <IconChevron />
              </Box>
            </Box>
            {menuOpen }  {/*&& <UserMenu />*/}
          </Box>
        )}

        {/* Hamburger — mobile only */}
        {isMobile && (
          <Box sx={{
            width: 34, height: 34, background: "#111c35",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            "&:hover": { borderColor: "rgba(205,115,41,0.4)" },
          }}>
            <IconMenu />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;