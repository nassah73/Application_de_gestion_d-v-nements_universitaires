import { Box, Typography } from "@mui/material";

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

// ─── Topbar ───────────────────────────────────────────────────────────────────

const Topbar = ({ isMobile }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "10px" : "14px",
      p: isMobile ? "12px 14px" : "14px 24px",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      background: "#0d1526",
    }}
  >
    {/* Logo — mobile only */}
    {isMobile && (
      <Typography sx={{ fontWeight: 800, fontSize: "16px", color: "#cd7329", letterSpacing: "1px", flexShrink: 0 }}>
        UIZ
      </Typography>
    )}

    {/* Search box */}
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "#111c35",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "10px",
        p: isMobile ? "8px 12px" : "9px 14px",
      }}
    >
      <IconSearch />
      <Typography
        component="input"
        placeholder={isMobile ? "Rechercher..." : "Search events, organizers, students..."}
        readOnly
        sx={{
          background: "none",
          border: "none",
          outline: "none",
          color: "rgba(255,255,255,0.5)",
          fontSize: "13px",
          width: "100%",
          fontFamily: "inherit",
          cursor: "default",
        }}
      />
    </Box>

    {/* Right actions */}
    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Notification bell */}
      <Box
        sx={{
          position: "relative",
          width: isMobile ? 34 : 36,
          height: isMobile ? 34 : 36,
          background: "#111c35",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        <IconBell />
        <Box
          sx={{
            position: "absolute",
            top: -4,
            right: -4,
            width: 16,
            height: 16,
            background: "#cd7329",
            borderRadius: "50%",
            fontSize: "9px",
            fontWeight: 700,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          3
        </Box>
      </Box>

      {/* Admin info — desktop only */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#111c35",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            p: "7px 12px 7px 10px",
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "8px",
              background: "#cd7329",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            A
          </Box>
          <Box>
            <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
              Admin User
            </Typography>
            <Typography sx={{ fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>
              SUPER ADMINISTRATEUR
            </Typography>
          </Box>
        </Box>
      )}

      {/* Hamburger — mobile only */}
      {isMobile && (
        <Box
          sx={{
            width: 34,
            height: 34,
            background: "#111c35",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <IconMenu />
        </Box>
      )}
    </Box>
  </Box>
);

export default Topbar;