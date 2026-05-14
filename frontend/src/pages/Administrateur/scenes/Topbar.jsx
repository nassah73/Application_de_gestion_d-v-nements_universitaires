import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

const IconSearch = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconBell = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconMenu = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.7)"
    strokeWidth="2"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconChevron = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.4)"
    strokeWidth="2"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// ─── Notifications ────────────────────────────────────────────────────────────

const notifications = [
  {
    id: 1,
    text: (
      <>
        Nouvel événement créé par{" "}
        <strong style={{ color: "#cd7329" }}>Sarah M.</strong>
      </>
    ),
    time: "il y a 5 min",
  },
  {
    id: 2,
    text: (
      <>
        12 nouvelles inscriptions{" "}
        <strong style={{ color: "#cd7329" }}>
          Conf Tech 2026
        </strong>
      </>
    ),
    time: "il y a 23 min",
  },
  {
    id: 3,
    text: "Rapport mensuel disponible",
    time: "il y a 1h",
  },
];

// ─── Notification Panel ───────────────────────────────────────────────────────

const NotifPanel = ({ onClear }) => (
  <Box
    sx={{
      position: "absolute",
      top: "calc(100% + 12px)",
      right: 0,

      width: 320,

      background:
        "linear-gradient(180deg, rgba(17,28,53,0.98), rgba(10,15,30,0.98))",

      backdropFilter: "blur(18px)",

      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "24px",

      overflow: "hidden",
      zIndex: 999,

      boxShadow: "0 25px 70px rgba(0,0,0,0.45)",

      animation: "fadeIn .25s ease",
    }}
  >
    <Box
      sx={{
        p: "16px 18px 12px",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: 800,
          color: "#fff",
        }}
      >
        Notifications
      </Typography>

      <Typography
        onClick={onClear}
        sx={{
          fontSize: "11px",
          color: "#cd7329",
          cursor: "pointer",
          fontWeight: 700,

          "&:hover": {
            opacity: 0.7,
          },
        }}
      >
        Tout marquer lu
      </Typography>
    </Box>

    {notifications.map((n) => (
      <Box
        key={n.id}
        sx={{
          p: "14px 18px",

          display: "flex",
          gap: "12px",
          alignItems: "flex-start",

          borderTop: "1px solid rgba(255,255,255,0.04)",

          cursor: "pointer",

          transition: "0.25s",

          "&:hover": {
            background: "rgba(205,115,41,0.08)",
          },
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,

            borderRadius: "50%",

            background: "#cd7329",

            mt: "6px",

            boxShadow: "0 0 10px rgba(205,115,41,0.6)",
          }}
        />

        <Box>
          <Typography
            sx={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.5,
            }}
          >
            {n.text}
          </Typography>

          <Typography
            sx={{
              fontSize: "10px",
              color: "rgba(255,255,255,0.35)",
              mt: "4px",
            }}
          >
            {n.time}
          </Typography>
        </Box>
      </Box>
    ))}

    <Box
      sx={{
        p: "14px 18px",

        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Typography
        sx={{
          fontSize: "11px",
          fontWeight: 700,

          color: "rgba(255,255,255,0.4)",

          cursor: "pointer",

          "&:hover": {
            color: "#cd7329",
          },
        }}
      >
        Voir toutes les notifications →
      </Typography>
    </Box>
  </Box>
);

// ─── User Menu ────────────────────────────────────────────────────────────────

const UserMenu = () => <div />;

// ─── Topbar ───────────────────────────────────────────────────────────────────

const Topbar = ({ isMobile }) => {
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(3);

  const notifRef = useRef(null);
  const menuRef = useRef(null);

  // Close outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target)
      ) {
        setNotifOpen(false);
      }

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  const toggleNotif = () => {
    setNotifOpen((v) => !v);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((v) => !v);
    setNotifOpen(false);
  };

  const clearNotifs = () => {
    setNotifCount(0);
    setNotifOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        gap: isMobile ? "12px" : "18px",

        px: isMobile ? "14px" : "28px",
        py: isMobile ? "14px" : "18px",

        position: "sticky",
        top: 0,
        zIndex: 50,

        background: "rgba(13,21,38,0.82)",
        backdropFilter: "blur(20px)",

        borderBottom:
          "1px solid rgba(255,255,255,0.06)",

        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      {/* Logo */}
      {isMobile && (
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: "18px",

            background:
              "linear-gradient(135deg,#cd7329,#ff9c55)",

            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",

            letterSpacing: "1px",
          }}
        >
          UIZ
        </Typography>
      )}

      {/* Search */}
      <Box
        sx={{
          flex: 1,

          display: "flex",
          alignItems: "center",
          gap: "12px",

          px: isMobile ? "14px" : "18px",
          py: isMobile ? "10px" : "12px",

          borderRadius: "18px",

          background:
            "linear-gradient(135deg, rgba(17,28,53,0.95), rgba(22,35,65,0.92))",

          border: "1px solid rgba(255,255,255,0.07)",

          transition: "all .3s ease",

          "&:hover": {
            borderColor: "rgba(205,115,41,0.35)",
            boxShadow:
              "0 0 0 4px rgba(205,115,41,0.08)",
          },

          "&:focus-within": {
            borderColor: "#cd7329",
            boxShadow:
              "0 0 0 5px rgba(205,115,41,0.12)",
          },
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,

            borderRadius: "12px",

            background: "rgba(255,255,255,0.04)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            color: "#cd7329",

            flexShrink: 0,
          }}
        >
          <IconSearch />
        </Box>

        <Typography
          component="input"
          placeholder={
            isMobile
              ? "Rechercher..."
              : "Rechercher..."
          }
          sx={{
            background: "transparent",
            border: "none",
            outline: "none",

            width: "100%",

            color: "#fff",

            fontSize: "14px",
            fontWeight: 500,

            fontFamily: "inherit",

            "&::placeholder": {
              color: "rgba(255,255,255,0.35)",
            },
          }}
        />


      </Box>

      {/* Right actions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {/* Bell */}
        <Box
          ref={notifRef}
          sx={{ position: "relative" }}
        >
          <Box
            onClick={toggleNotif}
            sx={{
              width: isMobile ? 40 : 44,
              height: isMobile ? 40 : 44,

              borderRadius: "14px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              color: "#fff",

              background: notifOpen
                ? "rgba(205,115,41,0.14)"
                : "rgba(255,255,255,0.04)",

              border: `1px solid ${
                notifOpen
                  ? "rgba(205,115,41,0.35)"
                  : "rgba(255,255,255,0.06)"
              }`,

              transition: "all .25s ease",

              "&:hover": {
                transform: "translateY(-2px)",
                borderColor:
                  "rgba(205,115,41,0.4)",

                background:
                  "rgba(205,115,41,0.08)",
              },
            }}
          >
            <IconBell />

            {notifCount > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: -4,
                  right: -4,

                  minWidth: 18,
                  height: 18,

                  px: "4px",

                  borderRadius: "20px",

                  background:
                    "linear-gradient(135deg,#ef4444,#dc2626)",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: "9px",
                  fontWeight: 800,

                  color: "#fff",

                  border: "2px solid #0f172a",
                }}
              >
                {notifCount}
              </Box>
            )}
          </Box>

          {notifOpen && (
            <NotifPanel onClear={clearNotifs} />
          )}
        </Box>

        {/* User */}
        {!isMobile && (
          <Box
            ref={menuRef}
            sx={{ position: "relative" }}
          >
            <Box
              onClick={toggleMenu}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "12px",

                px: "10px",
                py: "8px",

                borderRadius: "18px",

                cursor: "pointer",

                background: menuOpen
                  ? "rgba(205,115,41,0.12)"
                  : "rgba(255,255,255,0.04)",

                border: `1px solid ${
                  menuOpen
                    ? "rgba(205,115,41,0.35)"
                    : "rgba(255,255,255,0.06)"
                }`,

                transition: "all .25s ease",

                "&:hover": {
                  transform: "translateY(-2px)",

                  borderColor:
                    "rgba(205,115,41,0.35)",

                  background:
                    "rgba(205,115,41,0.08)",
                },
              }}
            >
              {/* Avatar */}
              <Box
                sx={{
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,

                    borderRadius: "14px",

                    background:
                      "linear-gradient(135deg,#cd7329,#ff9c55)",

                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    color: "#fff",

                    fontWeight: 900,
                    fontSize: "14px",

                    boxShadow:
                      "0 10px 25px rgba(205,115,41,0.35)",
                  }}
                >
                  SA
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: -1,
                    right: -1,

                    width: 12,
                    height: 12,

                    borderRadius: "50%",

                    background: "#22c55e",

                    border: "2px solid #0f172a",
                  }}
                />
              </Box>

              {/* User info */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 800,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  SUPER ADMINISTRATEUR
                </Typography>

                <Typography
                  sx={{
                    fontSize: "10px",
                    color: "#22c55e",
                    fontWeight: 600,
                  }}
                >
                  ● en ligne
                </Typography>
              </Box>

              <Box
                sx={{
                  transform: menuOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",

                  transition: "0.25s",
                }}
              >
                <IconChevron />
              </Box>
            </Box>

            {menuOpen && <UserMenu />}
          </Box>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <Box
            sx={{
              width: 40,
              height: 40,

              borderRadius: "14px",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              cursor: "pointer",

              background: "rgba(255,255,255,0.04)",

              border:
                "1px solid rgba(255,255,255,0.06)",

              transition: "all .25s ease",

              "&:hover": {
                borderColor:
                  "rgba(205,115,41,0.35)",

                background:
                  "rgba(205,115,41,0.08)",
              },
            }}
          >
            <IconMenu />
          </Box>
        )}
      </Box>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Topbar;