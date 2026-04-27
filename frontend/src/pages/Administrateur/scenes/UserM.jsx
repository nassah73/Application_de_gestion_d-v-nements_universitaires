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
  Tooltip
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
<<<<<<< HEAD
import { useState } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ComputerIcon from "@mui/icons-material/Computer";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
=======
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ComputerIcon from "@mui/icons-material/Computer";
import CodeIcon from "@mui/icons-material/Code";

>>>>>>> f0a424694f8cd146775b89c1aadb9a9e3c0558a6

const UserManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // États
  const [users, setUsers] = useState(mockDataTeam);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", access: "user" });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, userId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [searchText, setSearchText] = useState("");

  // Gestionnaires d'événements
  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditMode(true);
      setCurrentUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, access: user.access });
    } else {
      setEditMode(false);
      setCurrentUser(null);
      setFormData({ name: "", email: "", role: "", access: "user" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", email: "", role: "", access: "user" });
    setCurrentUser(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.role) {
      setSnackbar({ open: true, message: "Veuillez remplir tous les champs obligatoires", severity: "error" });
      return;
    }

    if (editMode && currentUser) {
      setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
      setSnackbar({ open: true, message: "Utilisateur mis à jour avec succès", severity: "success" });
    } else {
      const newUser = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        ...formData
      };
      setUsers(prev => [...prev, newUser]);
      setSnackbar({ open: true, message: "Utilisateur ajouté avec succès", severity: "success" });
    }
    handleCloseDialog();
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ open: true, userId: id });
  };

  const handleConfirmDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== deleteConfirm.userId));
    setSnackbar({ open: true, message: "Utilisateur supprimé avec succès", severity: "success" });
    setDeleteConfirm({ open: false, userId: null });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchText.toLowerCase()) ||
    user.email.toLowerCase().includes(searchText.toLowerCase()) ||
    user.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Nom complet",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Rôle",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Niveau d'accès",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            sx={{
<<<<<<< HEAD
              width: "120px",
=======
              width: "60px",
              m: "0 auto",
              mt: "10px",
              ml: "20%",
>>>>>>> f0a424694f8cd146775b89c1aadb9a9e3c0558a6
              p: "5px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "8px",
              backgroundColor:
                access === "admin"
                  ? colors.greenAccent[600]
                  : access === "manager"
                  ? colors.blueAccent[700]
                  : colors.primary[300],
              borderRadius: "4px",
            }}
          >
<<<<<<< HEAD
            {access === "admin" && <AdminPanelSettingsIcon sx={{ fontSize: "18px" }} />}
            {access === "manager" && <ComputerIcon sx={{ fontSize: "18px" }} />}
            {access === "user" && <CodeIcon sx={{ fontSize: "18px" }} />}
            <Typography color={colors.grey[100]} sx={{ fontSize: "12px", fontWeight: "600", textTransform: "capitalize" }}>
              {access}
=======

            {access === "admin" && <AdminPanelSettingsIcon sx={{ fontSize: "18px" }} />}
            {access === "manager" && <ComputerIcon sx={{ fontSize: "18px" }} />}
            {access === "user" && <CodeIcon sx={{ fontSize: "18px" }} />}
            <Typography color={colors.grey[100]} sx={{ ml: "px", fontSize: "13px"}}>
              {access === "admin" ? "" : access === "manager" ? "" : ""}
>>>>>>> f0a424694f8cd146775b89c1aadb9a9e3c0558a6
            </Typography>
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
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Tooltip title="Modifier">
            <IconButton 
              size="small" 
              onClick={() => handleOpenDialog(params.row)}
              sx={{ color: colors.blueAccent[500], "&:hover": { backgroundColor: colors.blueAccent[500] + "20" } }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton 
              size="small" 
              onClick={() => handleDeleteClick(params.row.id)}
              sx={{ color: "#ef4444", "&:hover": { backgroundColor: "#ef444420" } }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
<<<<<<< HEAD
    <Box sx={{ p: "24px", height: "100%", display: "flex", flexDirection: "column", backgroundColor: colors.primary[500] }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: "30px" }}>
        <Box>
          <Typography variant="h1" sx={{ fontWeight: 900, color: colors.grey[100], mb: "8px", letterSpacing: "-1px" }}>
            UTILISATEURS
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
            color: colors.grey[100],
            borderRadius: "12px",
            padding: "10px 24px",
            fontWeight: 700,
            textTransform: "none",
            "&:hover": { backgroundColor: colors.greenAccent[700] },
          }}
        >
          Ajouter un utilisateur
        </Button>
      </Box>
=======
    <Box sx={{ p: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Box
          component="h1"
          sx={{
            fontSize: "36px",
            fontWeight: 900,
            color: "#fff",
            m: 0,
            mb: "12px",
            letterSpacing: "-1px",
          }}
        >
          UTILISATEURS
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            m: 0,
            mb: "25px",
          }}
        >
          Gestion des membres de l'équipe et des utilisateurs
        </Box>

>>>>>>> f0a424694f8cd146775b89c1aadb9a9e3c0558a6

      {/* Barre de recherche */}
      <Box sx={{ mb: "20px", display: "flex", gap: "10px" }}>
        <TextField
          variant="filled"
          placeholder="Rechercher un utilisateur..."
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: colors.grey[400] }} />,
          }}
          sx={{ 
            width: "350px",
            "& .MuiFilledInput-root": { backgroundColor: colors.primary[400] },
          }}
        />
      </Box>

      {/* DataGrid */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: colors.primary[400],
            borderRadius: "16px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${colors.grey[800]}`,
            color: colors.grey[100],
            display: "flex",
            alignItems: "center",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300] + " !important",
            fontWeight: "600",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid 
          rows={filteredUsers} 
          columns={columns} 
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>

      {/* Dialog Ajout/Modification */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.primary[400],
              borderRadius: "16px",
              border: `1px solid ${colors.grey[700]}`,
              color: colors.grey[100],
              minWidth: "450px",
              p: 1
            }
          }
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
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500] } }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="filled"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500] } }}
            />
            <TextField
              fullWidth
              label="Rôle"
              variant="filled"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500] } }}
              
            />
            <FormControl fullWidth variant="filled">
              <InputLabel>Niveau d'accès</InputLabel>
              <Select
                value={formData.access}
                onChange={(e) => setFormData({ ...formData, access: e.target.value })}
                sx={{ backgroundColor: colors.primary[500] }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} sx={{ color: colors.grey[400] }}>Annuler</Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            sx={{ backgroundColor: colors.greenAccent[600], color: "white", px: 4, borderRadius: "8px" }}
          >
            {editMode ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Confirmation Suppression */}
      <Dialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, userId: null })}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              borderRadius: "16px",
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeleteConfirm({ open: false, userId: null })} sx={{ color: colors.grey[400] }}>Annuler</Button>
          <Button onClick={handleConfirmDelete} variant="contained" sx={{ backgroundColor: "#ef4444", color: "white" }}>Supprimer</Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ width: "100%", borderRadius: "10px" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;