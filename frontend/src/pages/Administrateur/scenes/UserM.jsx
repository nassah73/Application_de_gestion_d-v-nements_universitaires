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
} from "@mui/material";
import axios from 'axios';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { loadUsers, saveUsers } from "../data/userStorage";
import { useState, useMemo, useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BadgeIcon from "@mui/icons-material/Badge";
import ComputerIcon from "@mui/icons-material/Computer";
import CodeIcon from "@mui/icons-material/Code";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

// ── Helpers ──────────────────────────────────────────────────────────────
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "#64748b" };
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

const ROLE_OPTIONS = ["Administration", "IT", "Développeur", "...."];

const maskPassword = (pw) => {
  if (!pw) return "";
  return "•".repeat(pw.length);
};

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
      <Typography sx={{ fontSize: "13px", color: "#94a3b8", mt: "2px" }}>{label}</Typography>
    </Box>
  </Box>
);



// ── Main Component ───────────────────────────────────────────────────────
const UserManagement = () => {

   const handelclick = async () => {
  // 1. Validation بسيطة قبل ما نصيفطو
  if (!formData.name || !formData.email || (!editMode && !formData.password) || !formData.role) {
    setSnackbar({
      open: true,
      message: "Veuillez remplir tous les champs obligatoires",
      severity: "error",
    });
    return;
  }

  try {
    // 2. إعداد البيانات والـ URL
    const url = editMode 
      ? `http://localhost:5000/api/administrateur/updateAdmin/${formData.id}` 
      : "http://localhost:5000/api/administrateur/ajoutAdmin";

    // 3. عيط لـ Axios (POST للزيادة، PUT للتعديل)
    const response = editMode 
      ? await axios.put(url, formData) 
      : await axios.post(url, formData);

    // 4. Axios كيحط النتيجة ديما فـ response.data
    if (response.status === 200 || response.status === 201) {
      setSnackbar({
        open: true,
        message: editMode ? "Modifié avec succès !" : "Ajouté avec succès !",
        severity: "success",
      });

      // هنا خاصك تزيد الـ logic باش تحدد الـ List (مثلا عيط لـ fetchUsers ثانية)
      // fetchUsers(); 

      handleCloseDialog(); // سد الـ Form
    }
  } catch (error) {
    // 5. تدبير الأخطاء (مثلا إلا الـ Server طافي ولا Email ديجا كاين)
    const errorMsg = error.response?.data?.message || "Erreur lors de l'opération";
    
    setSnackbar({
      open: true,
      message: errorMsg,
      severity: "error",
    });
    console.error("API Error:", error);
  }
};



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [users, setUsers] = useState(() => loadUsers());
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", password: "" });
  const [revealedPasswords, setRevealedPasswords] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, userId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [searchText, setSearchText] = useState("");

  // ── Stats ────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = users.length;
    const adminCount = users.filter((u) => u.role === "Administration" || u.role === "Administrateur").length;
    const itCount = users.filter((u) => u.role === "IT").length;
    const devCount = users.filter((u) => u.role === "Developer").length;
    return { total, adminCount, itCount, devCount };
  }, [users]);

  const togglePasswordVisibility = (id) => {
    setRevealedPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ── Dialog handlers ──────────────────────────────────────────────────
  const handleOpenDialog = (user = null) => {
    setFormErrors({});
    if (user) {
      setEditMode(true);
      setCurrentUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, password: "" });
    } else {
      setEditMode(false);
      setCurrentUser(null);
      setFormData({ name: "", email: "", role: "", password: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", email: "", role: "", password: "" });
    setShowPassword(false);
    setFormErrors({});
    setCurrentUser(null);
  };

  // ── Validation & Save ────────────────────────────────────────────────
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Le nom est requis";
    if (!formData.email.trim()) errors.email = "L'email est requis";
    else if (!isValidEmail(formData.email)) errors.email = "Email invalide";
    if (!formData.role) errors.role = "Le rôle est requis";

    // Password: required on create, optional on edit
    if (!editMode && !formData.password) errors.password = "Le mot de passe est requis";
    else if (formData.password && formData.password.length < 6) errors.password = "Minimum 6 caractères";

    // Check for duplicate email (exclude current user in edit mode)
    const duplicate = users.find(
      (u) => u.email.toLowerCase() === formData.email.toLowerCase() && (!editMode || u.id !== currentUser?.id)
    );
    if (duplicate) errors.email = "Cet email est déjà utilisé";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    if (editMode && currentUser) {
      const updateData = { ...formData };
      if (!updateData.password) delete updateData.password; // keep existing password if blank
      setUsers((prev) => {
        const updated = prev.map((u) => (u.id === currentUser.id ? { ...u, ...updateData } : u));
        saveUsers(updated);
        return updated;
      });
      setSnackbar({ open: true, message: "Utilisateur mis à jour avec succès", severity: "success" });
    } else {
      const newUser = { id: Math.max(0, ...users.map((u) => u.id)) + 1, ...formData };
      setUsers((prev) => {
        const updated = [...prev, newUser];
        saveUsers(updated);
        return updated;
      });
      setSnackbar({ open: true, message: "Utilisateur ajouté avec succès", severity: "success" });
    }
    handleCloseDialog();
  };

  // ── Delete ───────────────────────────────────────────────────────────
  const handleDeleteClick = (id) => setDeleteConfirm({ open: true, userId: id });

  const handleConfirmDelete = () => {
    setUsers((prev) => {
      const filtered = prev.filter((u) => u.id !== deleteConfirm.userId);
      // Re-index IDs sequentially: 1, 2, 3, ...
      const updated = filtered.map((u, index) => ({ ...u, id: index + 1 }));
      saveUsers(updated);
      return updated;
    });
    setSnackbar({ open: true, message: "Utilisateur supprimé avec succès", severity: "success" });
    setDeleteConfirm({ open: false, userId: null });
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
    { field: "role", headerName: "Rôle", flex: 0.7, minWidth: 120 },
    {
      field: "password",
      headerName: "Mot de passe",
      flex: 1,
      minWidth: 180,
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
              {isRevealed ? row.password : maskPassword(row.password)}
            </Typography>
            <Tooltip title={isRevealed ? "Masquer" : "Afficher"} arrow>
              <IconButton
                size="small"
                onClick={() => togglePasswordVisibility(row.id)}
                sx={{
                  color: isRevealed ? colors.greenAccent[400] : colors.grey[500],
                  "&:hover": { backgroundColor: colors.grey[700] + "30" },
                }}
              >
                {isRevealed ? <VisibilityOffIcon sx={{ fontSize: 16 }} /> : <VisibilityIcon sx={{ fontSize: 16 }} />}
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "6px" }}>
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
              onClick={() => handleDeleteClick(params.row.id)}
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
      ),
    },
  ];

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <Box sx={{ p: "24px", height: "100%", display: "flex", flexDirection: "column", backgroundColor: colors.primary[500] }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: "24px" }}>
        <Box>
          <Typography variant="h1" sx={{ fontWeight: 900, color: colors.grey[100], mb: "6px", letterSpacing: "-1px" }}>
            ADMINISTRATION
          </Typography>
          <Typography variant="h5" sx={{ color: colors.grey[400] }}>
            Gestion des membres de l'équipe et des accès système
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: "#fff",
            borderRadius: "12px",
            padding: "10px 24px",
            fontWeight: 700,
            textTransform: "none",
            boxShadow: `0 4px 14px ${colors.greenAccent[600]}40`,
            "&:hover": { backgroundColor: colors.greenAccent[700], boxShadow: `0 6px 20px ${colors.greenAccent[600]}50` },
          }}
        >
          Ajouter un Administration
        </Button>
      </Box>

      {/* Stat Cards */}
      <Box sx={{ display: "flex", gap: "16px", mb: "24px", flexWrap: "wrap" }}>
        <StatCard icon={<PeopleAltIcon />} label="Total administrations" value={stats.total} accentColor="#cd7329" bgColor={colors.primary[400]} />
        <StatCard icon={<BadgeIcon />} label="Administration" value={stats.adminCount} accentColor="#10b981" bgColor={colors.primary[400]} />
        <StatCard icon={<ComputerIcon />} label="IT" value={stats.itCount} accentColor="#6366f1" bgColor={colors.primary[400]} />
        <StatCard icon={<CodeIcon />} label="Développeurs" value={stats.devCount} accentColor="#94a3b8" bgColor={colors.primary[400]} />
      </Box>

      {/* Search bar */}
      <Box sx={{ mb: "20px", display: "flex", gap: "10px"}}>
        <TextField
          variant="filled"
          placeholder="Rechercher par nom, email ou rôle…"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: colors.grey[400] }} />
              </InputAdornment>
            ),
          }}
          sx={{
            width: "380px",
            "& .MuiFilledInput-root": {
              backgroundColor: colors.primary[400],
              borderRadius: "12px",
              "&:before, &:after": { display: "none" },
            },
          }}
        />
        {searchText && (
          <Fade in>
            <Typography sx={{ alignSelf: "center", fontSize: "13px", color: colors.grey[400] }}>
              {filteredUsers.length} résultat{filteredUsers.length !== 1 ? "s" : ""}
            </Typography>
          </Fade>
        )}
      </Box>

      {/* DataGrid */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          "& .MuiDataGrid-root": { border: "none", backgroundColor: colors.primary[400], borderRadius: "16px" },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${colors.grey[800]}`,
            color: colors.grey[100],
            display: "flex",
            alignItems: "center",
          },
          "& .name-column--cell": { color: colors.greenAccent[300] + " !important", fontWeight: "600" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          },
          "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: `${colors.grey[100]} !important` },
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[5, 10, 25]}
          rowHeight={60}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: `${colors.primary[300]}50`,
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
            <TextField
              fullWidth
              label="Nom complet"
              variant="filled"
              value={formData.name}
              error={!!formErrors.name}
              helperText={formErrors.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (formErrors.name) setFormErrors({ ...formErrors, name: "" });
              }}
              sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500], borderRadius: "8px", "&:before, &:after": { display: "none" } } }}
            />
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
                type={showPassword ? "text" : "password"}
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
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                        sx={{ color: colors.grey[400] }}
                      >
                        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
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
            onClick={handelclick}
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
        onClose={() => setDeleteConfirm({ open: false, userId: null })}
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
            onClick={() => setDeleteConfirm({ open: false, userId: null })}
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