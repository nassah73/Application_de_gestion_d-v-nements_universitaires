import { Box, Typography } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

const IconTrash = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IconUser = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconLogout = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// ─── Notifications ────────────────────────────────────────────────────────────

const initialNotifications = [
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

const NotifPanel = ({ notifications, onClear, onDeleteSingle }) => (
  <Box
    sx={{
      position: "absolute",
      top: "calc(100% + 12px)",
      right: 0,

      width: 340,

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
          color: "#ef4444",
          cursor: "pointer",
          fontWeight: 700,

          "&:hover": {
            opacity: 0.7,
          },
        }}
      >
        Supprimer tout
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

        <Box
          sx={{
            flex: 1,
          }}
        >
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
        
        <Box
          onClick={(e) => {
            e.stopPropagation();
            onDeleteSingle(n.id);
          }}
          sx={{
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#ef4444",
            transition: "all 0.15s ease",
            "&:hover": {
              backgroundColor: "rgba(239,68,68,0.12)",
              transform: "scale(1.05)"
            }
          }}
        >
          <IconTrash />
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

const UserMenu = ({ onLogout, onClose, onProfileClick, userData }) => {
  let prenom = userData?.prenom;
  let nom = userData?.nom;
  
  if (!prenom || prenom.trim() === "") prenom = "Super";
  if (!nom || nom.trim() === "") nom = "Admin";
  
  const initials = (prenom[0] + nom[0]).toUpperCase();
  
  return (
    <Box
      sx={{
        position: "absolute",
        top: "calc(100% + 12px)",
        right: 0,
        width: 260,
        background: "linear-gradient(180deg, rgba(17,28,53,0.98), rgba(10,15,30,0.98))",
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
          p: "16px 18px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "14px",
            background: "linear-gradient(135deg,#cd7329,#ff9c55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 900,
            fontSize: "15px",
            boxShadow: "0 10px 25px rgba(205,115,41,0.35)",
          }}
        >
          {initials}
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            {prenom.toUpperCase()} {nom.toUpperCase()}
          </Typography>
          <Typography
            sx={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              mt: "2px",
            }}
          >
            Administrateur système
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: "8px" }}>
        <Box
          onClick={onProfileClick}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            px: "14px",
            py: "12px",
            borderRadius: "16px",
            cursor: "pointer",
            transition: "0.2s",
            color: "rgba(255,255,255,0.85)",
            "&:hover": {
              background: "rgba(205,115,41,0.08)",
              color: "#cd7329",
            },
          }}
        >
          <IconUser />
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Mon Profil
          </Typography>
        </Box>

        <Box
          onClick={onLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            px: "14px",
            py: "12px",
            borderRadius: "16px",
            cursor: "pointer",
            transition: "0.2s",
            color: "#ef4444",
            mt: "4px",
            "&:hover": {
              background: "rgba(239,68,68,0.08)",
            },
          }}
        >
          <IconLogout />
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            Se déconnecter
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Topbar ───────────────────────────────────────────────────────────────────

const Topbar = ({ isMobile }) => {
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notifCount, setNotifCount] = useState(3);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserData = () => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          setUserData(JSON.parse(userStr));
        } catch (e) {
          console.error("Error parsing user data:", e);
        }
      }
    };

    loadUserData();

    const handleStorageChange = () => {
      loadUserData();
    };

    const handleUserUpdate = () => {
      loadUserData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userDataUpdated', handleUserUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdated', handleUserUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setMenuOpen(false);
    navigate('/auth/login');
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    navigate('/administrateur/settings');
  };

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

  const deleteSingleNotif = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setNotifCount((prev) => Math.max(0, prev - 1));
  };

  const clearNotifs = () => {
    setNotifications([]);
    setNotifCount(0);
    setNotifOpen(false);
  };

  let prenom = userData?.prenom;
  let nom = userData?.nom;
  
  if (!prenom || prenom.trim() === "") prenom = "SUPER";
  if (!nom || nom.trim() === "") nom = "ADMINISTRATEUR";
  
  const avatarInitials = (prenom[0] + nom[0]).toUpperCase();

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

        backdropFilter: "blur(20px)",
        background: "rgba(13,21,38,0.82)",

        borderBottom:
          "1px solid rgba(255,255,255,0.06)",

        boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
      }}
    >
      {/* Mobile Logo */}
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
              opacity: 1,
            },
          }}
        />


      </Box>

      {/* Actions */}
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
                ? "rgba(205,115,41,0.15)"
                : "rgba(255,255,255,0.04)",

              border: `1px solid ${
                notifOpen
                  ? "rgba(205,115,41,0.35)"
                  : "rgba(255,255,255,0.06)"
              }`,

              transition: "0.25s",

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
            <NotifPanel 
              notifications={notifications} 
              onClear={clearNotifs} 
              onDeleteSingle={deleteSingleNotif} 
            />
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

                transition: "0.25s",

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
                  {avatarInitials}
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

              {/* Info */}
              <Box>
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  {prenom.toUpperCase()} {nom.toUpperCase()}
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

            {menuOpen && (
              <UserMenu 
                onLogout={handleLogout} 
                onClose={() => setMenuOpen(false)} 
                onProfileClick={handleProfileClick}
                userData={userData}
              />
            )}
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

              transition: "0.25s",

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
