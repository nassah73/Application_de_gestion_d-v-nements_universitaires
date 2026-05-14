import {
  Box,
  Typography,
  useTheme,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  Alert,
  Tooltip,

  Avatar,
  Fade,
  InputAdornment,
  LinearProgress,
  CircularProgress
} from "@mui/material";
import axios from 'axios';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState, useMemo, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BadgeIcon from "@mui/icons-material/Badge";
import ComputerIcon from "@mui/icons-material/Computer";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// ── Helpers ──────────────────────────────────────────────────────────────
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const maskPassword = (pw) => {
  if (!pw) return "";
  return "•".repeat(8);
};

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "#506573ff" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 20, label: "Très faible", color: "#ef4444" };
  if (score === 2) return { score: 40, label: "Faible", color: "#f97316" };
  if (score === 3) return { score: 60, label: "Moyen", color: "#eab308" };
  if (score === 4) return { score: 80, label: "Fort", color: "#22c55e" };
  return { score: 100, label: "Très fort", color: "#10b981" };
};

const ROLE_OPTIONS = ["Administrateur", "Administration"];

const API_BASE_URL = "http://localhost:5000";

// ── Stat Card ────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, accentColor, bgColor }) => (
  <Box
    sx={{
      flex: 1,
      minWidth: "180px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      p: "18px 22px",
      borderRadius: "14px",
      backgroundColor: bgColor,
      border: `1px solid ${accentColor}22`,
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${accentColor}15` },
    }}
  >
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `${accentColor}20`,
        color: accentColor,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography sx={{ fontSize: "24px", fontWeight: 800, lineHeight: 1.1, color: "#f8fafc" }}>
        {value}
      </Typography>
      <Typography sx={{ fontSize: "13px", color: "#7d685eff", mt: "2px" }}>{label}</Typography>
    </Box>
  </Box>
);

// ── Main Component ───────────────────────────────────────────────────────
const UserManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ prenom: "", nom: "", telephone: "", email: "", role: "Administration", password: "" });
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, user: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [searchText, setSearchText] = useState("");

  // ── Fetch Users ────────────────────────────────────────────────────────
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const [adminsRes, administrationsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/administrateur/administrateurs`),
        axios.get(`${API_BASE_URL}/api/administrateur/administrations`)
      ]);

      const admins = adminsRes.data.map((admin, index) => ({
        id: index + 1,
        _id: admin._id,
        name: "Administrateur",
        email: admin.email,
        role: "Administrateur",
        type: "administrateur"
      }));

      const administrations = administrationsRes.data.map((admin, index) => ({
        id: adminsRes.data.length + index + 1,
        _id: admin._id,
        name: `${admin.prenom} ${admin.nom}`,
        prenom: admin.prenom,
        nom: admin.nom,
        telephone: admin.telephone,
        email: admin.email,
        role: "Administration",
        type: "administration"
      }));

      setUsers([...admins, ...administrations]);
    } catch (error) {
      console.error("Error fetching users:", error);
      setSnackbar({
        open: true,
        message: "Erreur lors du chargement des utilisateurs",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const togglePasswordVisibility = (id) => {
    setRevealedPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ── Stats ────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = users.length;
    const adminCount = users.filter((u) => u.role === "Administrateur").length;
    const adminTeamCount = users.filter((u) => u.role === "Administration").length;
    return { total, adminCount, adminTeamCount };
  }, [users]);

  // ── Dialog handlers ──────────────────────────────────────────────────
  const handleOpenDialog = (user = null) => {
    setFormErrors({});
    if (user) {
      setEditMode(true);
      setCurrentUser(user);
      if (user.type === "administrateur") {
        setFormData({ email: user.email, role: "Administrateur", password: "" });
      } else {
        setFormData({
          prenom: user.prenom,
          nom: user.nom,
          telephone: user.telephone,
          email: user.email,
          role: "Administration",
          password: ""
        });
      }
    } else {
      setEditMode(false);
      setCurrentUser(null);
      setFormData({ prenom: "", nom: "", telephone: "", email: "", role: "Administration", password: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ prenom: "", nom: "", telephone: "", email: "", role: "Administration", password: "" });
    setFormErrors({});
    setCurrentUser(null);
  };

  // ── Save User ────────────────────────────────────────────────────────
  const handleSave = async () => {
    const errors = {};
    if (formData.role === "Administration") {
      if (!formData.prenom.trim()) errors.prenom = "Le prénom est requis";
      if (!formData.nom.trim()) errors.nom = "Le nom est requis";
      if (!formData.telephone.trim()) errors.telephone = "Le téléphone est requis";
    }
    if (!formData.email.trim()) errors.email = "L'email est requis";
    else if (!isValidEmail(formData.email)) errors.email = "Email invalide";
    if (!editMode && !formData.password) errors.password = "Le mot de passe est requis";
    else if (formData.password && formData.password.length < 6) errors.password = "Minimum 6 caractères";

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      if (editMode && currentUser) {
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password;
        
        if (currentUser.type === "administrateur") {
          await axios.put(`${API_BASE_URL}/api/administrateur/administrateur/${currentUser._id}`, updateData);
        } else {
          await axios.put(`${API_BASE_URL}/api/administrateur/administration/${currentUser._id}`, updateData);
        }
        
        setSnackbar({ open: true, message: "Utilisateur mis à jour avec succès", severity: "success" });
      } else {
        if (formData.role === "Administrateur") {
          await axios.post(`${API_BASE_URL}/api/administrateur/create-administrateur`, { email: formData.email, password: formData.password });
        } else {
          await axios.post(`${API_BASE_URL}/api/administrateur/create-administration`, formData);
        }
        
        setSnackbar({ open: true, message: "Utilisateur ajouté avec succès", severity: "success" });
      }
      
      handleCloseDialog();
      fetchUsers();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Erreur lors de l'opération";
      setSnackbar({ open: true, message: errorMsg, severity: "error" });
      console.error("API Error:", error);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────
  const handleDeleteClick = (user) => setDeleteConfirm({ open: true, user });

  const handleConfirmDelete = async () => {
    try {
      if (deleteConfirm.user.type === "administrateur") {
        await axios.delete(`${API_BASE_URL}/api/administrateur/administrateur/${deleteConfirm.user._id}`);
      } else {
        await axios.delete(`${API_BASE_URL}/api/administrateur/administration/${deleteConfirm.user._id}`);
      }
      
      setSnackbar({ open: true, message: "Utilisateur supprimé avec succès", severity: "success" });
      fetchUsers();
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Erreur lors de la suppression";
      setSnackbar({ open: true, message: errorMsg, severity: "error" });
      console.error("API Error:", error);
    } finally {
      setDeleteConfirm({ open: false, user: null });
    }
  };

  // ── Filtering ────────────────────────────────────────────────────────
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.role.toLowerCase().includes(searchText.toLowerCase())
      ),
    [users, searchText]
  );

  // ── Columns ──────────────────────────────────────────────────────────
  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "name",
      headerName: "Utilisateur",
      flex: 1.3,
      minWidth: 200,
      renderCell: ({ row }) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: "12px", py: "6px" }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              fontSize: "14px",
              fontWeight: 700,
              backgroundColor: colors.greenAccent[600] + "30",
              color: colors.greenAccent[300],
              border: `2px solid ${colors.greenAccent[600]}40`,
            }}
          >
            {getInitials(row.name)}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: "14px", color: colors.grey[100], lineHeight: 1.3 }}>
              {row.name}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: colors.grey[400] }}>{row.email}</Typography>
          </Box>
        </Box>
      ),
    },
    { field: "role", headerName: "Rôle", flex: 0.6, minWidth: 120 },
    {
      field: "telephone",
      headerName: "Téléphone",
      flex: 0.7,
      minWidth: 140,
      renderCell: ({ row }) => (
        <Typography sx={{ fontSize: "13px", color: colors.grey[300] }}>
          {row.telephone || "-"}
        </Typography>
      ),
    },
    {
      field: "password",
      headerName: "Mot de passe",
      flex: 0.8,
      minWidth: 160,
      sortable: false,
      renderCell: ({ row }) => {
        const isRevealed = revealedPasswords[row.id];
        
        return (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", width: "100%" }}>
            <LockIcon sx={{ fontSize: 16, color: colors.grey[500] }} />
            <Typography
              sx={{
                fontSize: "13px",
                fontFamily: isRevealed ? "'Source Sans Pro', sans-serif" : "monospace",
                color: isRevealed ? colors.greenAccent[300] : colors.grey[400],
                letterSpacing: isRevealed ? "0" : "2px",
                flex: 1,
                userSelect: isRevealed ? "text" : "none",
              }}
            >
              {isRevealed ? "Mot de passe visible" : maskPassword("password")}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => {
        const isRevealed = revealedPasswords[params.row.id];
        
        return (
          <Box sx={{ display: "flex", gap: "6px" }}>
            <Tooltip title={isRevealed ? "Masquer le mot de passe" : "Afficher le mot de passe"} arrow>
              <IconButton
                size="small"
                onClick={() => togglePasswordVisibility(params.row.id)}
                sx={{
                  color: colors.grey[400],
                  backgroundColor: colors.grey[400] + "12",
                  "&:hover": { backgroundColor: colors.grey[400] + "25" },
                }}
              >
                {isRevealed ? <VisibilityOffIcon sx={{ fontSize: 18 }} /> : <VisibilityIcon sx={{ fontSize: 18 }} />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Modifier" arrow>
              <IconButton
                size="small"
                onClick={() => handleOpenDialog(params.row)}
                sx={{
                  color: colors.blueAccent[400],
                  backgroundColor: colors.blueAccent[400] + "12",
                  "&:hover": { backgroundColor: colors.blueAccent[400] + "25" },
                }}
              >
                <EditIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Supprimer" arrow>
              <IconButton
                size="small"
                onClick={() => handleDeleteClick(params.row)}
                sx={{
                  color: "#ef4444",
                  backgroundColor: "#ef444412",
                  "&:hover": { backgroundColor: "#ef444425" },
                }}
              >
                <DeleteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  // ── Render ─────────────────── ────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ p: "24px", minHeight: "100%", backgroundColor: colors.primary[500], display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: "24px", height: "100%", display: "flex", flexDirection: "column", backgroundColor: colors.primary[500] }}>
      {/* Header */}


      {/* Stat Cards */}
      {/*<Box sx={{ display: "flex", gap: "16px", mb: "24px", flexWrap: "wrap" }}>
        <StatCard icon={<PeopleAltIcon />} label="Total" value={stats.total} accentColor="#cd7329" bgColor={colors.primary[400]} />
        <StatCard icon={<BadgeIcon />} label="Administrateurs" value={stats.adminCount} accentColor="#10b981" bgColor={colors.primary[400]} />
        <StatCard icon={<ComputerIcon />} label="Équipe Admin" value={stats.adminTeamCount} accentColor="#6366f1" bgColor={colors.primary[400]} />
  </Box>*/}

{/* Search bar */}
<Box
  sx={{
    mb: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "15px",
  }}
>
  <TextField
    variant="filled"
    placeholder="Rechercher par nom, email ou rôle..."
    size="small"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon
            sx={{
              color: colors.grey[300],
              transition: "0.3s",
            }}
          />
        </InputAdornment>
      ),
    }}
    sx={{
      width: "400px",

      "& .MuiFilledInput-root": {
        backgroundColor: colors.primary[400],
        borderRadius: "14px",
        paddingLeft: "8px",
        overflow: "hidden",
        transition: "all 0.3s ease",

        "&:hover": {
          backgroundColor: colors.primary[500],
          boxShadow: `0 0 10px ${colors.greenAccent[500]}33`,
        },

        "&.Mui-focused": {
          backgroundColor: colors.primary[500],
          boxShadow: `0 0 0 2px ${colors.greenAccent[500]}`,
        },

        "&:before, &:after": {
          display: "none",
        },
      },

      "& input": {
        padding: "12px 10px",
        fontSize: "14px",
        color: colors.grey[100],
      },

      "& input::placeholder": {
        color: colors.grey[400],
        opacity: 1,
      },
    }}
  />

  {searchText && (
    <Fade in>
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          px: "12px",
          py: "6px",
          borderRadius: "20px",
        }}
      >
        <Typography
          sx={{
            fontSize: "13px",
            color: colors.greenAccent[400],
            fontWeight: "600",
          }}
        >
          {filteredUsers.length} résultat
          {filteredUsers.length !== 1 ? "s" : ""}
        </Typography>
      </Box>
    </Fade>
  )}
</Box>

      {/* DataGrid */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          "& .MuiDataGrid-root": { 
            border: "1px solid rgba(255,255,255,0.08)", 
            backgroundColor: colors.primary[400], 
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${colors.grey[800]}`,
            color: colors.grey[100],
            display: "flex",
            alignItems: "center",
            px: "18px",
          },
          "& .name-column--cell": { color: colors.greenAccent[300] + " !important", fontWeight: "600" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#cd7329",
            borderBottom: `1px solid ${colors.grey[800]}`,
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
          },
          "& .MuiDataGrid-columnHeader": {
            color: "#fff",
            fontWeight: 800,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: `1px solid ${colors.grey[800]}`,
            backgroundColor: "#cd7329",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
          },
          "& .MuiDataGrid-selectedRowCount": {
            color: "#fff",
            fontWeight: 600,
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer": {
            backgroundColor: "rgba(205,115,41,0.15)",
            borderBottom: `1px solid ${colors.grey[800]}`,
            p: "12px 18px",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { 
            color: `${colors.grey[100]} !important`,
            fontWeight: 600,
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: "rgba(205,115,41,0.25)",
            }
          },
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 25]}
          rowHeight={68}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-row": {
              transition: "background-color 0.2s ease, transform 0.15s ease",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: `${colors.primary[300]}70`,
              transform: "translateX(2px)",
            },
          }}
        />
      </Box>

      {/* ── Add / Edit Dialog ─────────────────────────────────────────── */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Fade}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.primary[400],
              borderRadius: "16px",
              border: `1px solid ${colors.grey[700]}`,
              color: colors.grey[100],
              minWidth: "480px",
              p: 1,
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "22px" }}>
          {editMode ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
        </DialogTitle>
        <DialogContent sx={{ pt: "20px !important" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <FormControl fullWidth variant="filled" error={!!formErrors.role}>
              <InputLabel>Rôle</InputLabel>
              <Select
                value={formData.role}
                onChange={(e) => {
                  setFormData({ ...formData, role: e.target.value });
                  if (formErrors.role) setFormErrors({ ...formErrors, role: "" });
                }}
                sx={{ backgroundColor: colors.primary[500], borderRadius: "8px" }}
              >
                {ROLE_OPTIONS.map((r) => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
              {formErrors.role && (
                <Typography sx={{ color: "#ef4444", fontSize: "12px", mt: "4px", ml: "14px" }}>
                  {formErrors.role}
                </Typography>
              )}
            </FormControl>

            {formData.role === "Administration" && (
              <>
                <TextField
                  fullWidth
                  label="Prénom"
                  variant="filled"
                  value={formData.prenom}
                  error={!!formErrors.prenom}
                  helperText={formErrors.prenom}
                  onChange={(e) => {
                    setFormData({ ...formData, prenom: e.target.value });
                    if (formErrors.prenom) setFormErrors({ ...formErrors, prenom: "" });
                  }}
                  sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500], borderRadius: "8px", "&:before, &:after": { display: "none" } } }}
                />
                <TextField
                  fullWidth
                  label="Nom"
                  variant="filled"
                  value={formData.nom}
                  error={!!formErrors.nom}
                  helperText={formErrors.nom}
                  onChange={(e) => {
                    setFormData({ ...formData, nom: e.target.value });
                    if (formErrors.nom) setFormErrors({ ...formErrors, nom: "" });
                  }}
                  sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500], borderRadius: "8px", "&:before, &:after": { display: "none" } } }}
                />
                <TextField
                  fullWidth
                  label="Téléphone"
                  variant="filled"
                  value={formData.telephone}
                  error={!!formErrors.telephone}
                  helperText={formErrors.telephone}
                  onChange={(e) => {
                    setFormData({ ...formData, telephone: e.target.value });
                    if (formErrors.telephone) setFormErrors({ ...formErrors, telephone: "" });
                  }}
                  sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500], borderRadius: "8px", "&:before, &:after": { display: "none" } } }}
                />
              </>
            )}
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="filled"
              value={formData.email}
              error={!!formErrors.email}
              helperText={formErrors.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
              }}
              sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500], borderRadius: "8px", "&:before, &:after": { display: "none" } } }}
            />
            <Box>
              <TextField
                fullWidth
                label={editMode ? "Nouveau mot de passe (optionnel)" : "Mot de passe"}
                type="password"
                variant="filled"
                value={formData.password}
                error={!!formErrors.password}
                helperText={formErrors.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (formErrors.password) setFormErrors({ ...formErrors, password: "" });
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: colors.grey[400], fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500], borderRadius: "8px", "&:before, &:after": { display: "none" } } }}
              />
              {formData.password && (() => {
                const strength = getPasswordStrength(formData.password);
                return (
                  <Box sx={{ mt: "8px" }}>
                    <LinearProgress
                      variant="determinate"
                      value={strength.score}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: colors.grey[700],
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: strength.color,
                          borderRadius: 2,
                          transition: "transform 0.3s ease, background-color 0.3s ease",
                        },
                      }}
                    />
                    <Typography sx={{ fontSize: "11px", color: strength.color, mt: "4px", fontWeight: 600 }}>
                      {strength.label}
                    </Typography>
                  </Box>
                );
              })()}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: "8px" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{ color: colors.grey[400], borderRadius: "10px", px: 3, "&:hover": { backgroundColor: colors.grey[700] + "30" } }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: "#fff",
              px: 4,
              borderRadius: "10px",
              fontWeight: 700,
              boxShadow: `0 4px 12px ${colors.greenAccent[600]}40`,
              "&:hover": { backgroundColor: colors.greenAccent[700] },
            }}
          >
            {editMode ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Delete Confirmation Dialog ────────────────────────────────── */}
      <Dialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, user: null })}
        TransitionComponent={Fade}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              borderRadius: "16px",
              border: `1px solid ${colors.grey[700]}`,
              minWidth: "400px",
            },
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, display: "flex", alignItems: "center", gap: "10px" }}>
          <WarningAmberIcon sx={{ color: "#ef4444" }} />
          Confirmer la suppression
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: colors.grey[300] }}>
            Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: "8px" }}>
          <Button
            onClick={() => setDeleteConfirm({ open: false, user: null })}
            sx={{ color: colors.grey[400], borderRadius: "10px", px: 3, "&:hover": { backgroundColor: colors.grey[700] + "30" } }}
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#ef4444",
              color: "#fff",
              borderRadius: "10px",
              fontWeight: 700,
              boxShadow: "0 4px 12px #ef444440",
              "&:hover": { backgroundColor: "#dc2626" },
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* ── Snackbar ──────────────────────────────────────────────────── */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%", borderRadius: "12px", fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;