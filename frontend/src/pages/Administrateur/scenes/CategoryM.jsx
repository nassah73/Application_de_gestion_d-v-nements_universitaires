import { Box, Typography, Button, useTheme, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from "@mui/material";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const categoryColors = [
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#6366f1",
];

const initialCategories = [
  { id: 1, name: "Académique", events: 234, progress: 75, color: "#3b82f6" },
  { id: 2, name: "Sports", events: 156, progress: 45, color: "#22c55e" },
  { id: 3, name: "Culturel", events: 189, progress: 60, color: "#a855f7" },
  { id: 4, name: "Technologie", events: 98, progress: 30, color: "#f97316" },
  { id: 5, name: "Ateliers", events: 145, progress: 50, color: "#ec4899" },
  { id: 6, name: "Social", events: 267, progress: 85, color: "#6366f1" },
];

const CategoryManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const [categories, setCategories] = useState(initialCategories);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", color: "#3b82f6" });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, categoryId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditMode(true);
      setCurrentCategory(category);
      setNewCategory({ name: category.name, color: category.color });
    } else {
      setEditMode(false);
      setCurrentCategory(null);
      setNewCategory({ name: "", color: "#3b82f6" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCategory({ name: "", color: "#3b82f6" });
    setCurrentCategory(null);
    setEditMode(false);
  };

  const handleSave = () => {
    if (!newCategory.name.trim()) {
      setSnackbar({ open: true, message: t("Le nom de la catégorie est requis"), severity: "error" });
      return;
    }

    if (editMode && currentCategory) {
      setCategories(cats =>
        cats.map(cat =>
          cat.id === currentCategory.id
            ? { ...cat, name: newCategory.name, color: newCategory.color }
            : cat
        )
      );
      setSnackbar({ open: true, message: t("Catégorie modifiée avec succès"), severity: "success" });
    } else {
      const newCat = {
        id: Date.now(),
        name: newCategory.name,
        events: 0,
        progress: 0,
        color: newCategory.color,
      };
      setCategories(cats => [...cats, newCat]);
      setSnackbar({ open: true, message: t("Catégorie ajoutée avec succès"), severity: "success" });
    }
    handleCloseDialog();
  };

  const handleDeleteClick = (categoryId) => {
    setDeleteConfirm({ open: true, categoryId });
  };

  const handleConfirmDelete = () => {
    setCategories(cats => cats.filter(cat => cat.id !== deleteConfirm.categoryId));
    setSnackbar({ open: true, message: t("Catégorie supprimée avec succès"), severity: "success" });
    setDeleteConfirm({ open: false, categoryId: null });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        p: "24px",
        backgroundColor: colors.primary[500],
        height: "100%",
        overflow: "auto"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: "30px",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 900,
              color: colors.grey[100],
              mb: "4px"
            }}
          >
            {t("Gestion des Catégories")}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: colors.grey[400] }}>
            {t("Organiser et gérer les catégories d'événements")}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
            borderRadius: "12px",
            padding: "10px 24px",
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(76, 175, 80, 0.3)",
            "&:hover": {
              backgroundColor: colors.greenAccent[700],
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
            },
          }}
        >
          {t("Nouvelle Catégorie")}
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "24px",
          width: "100%",
        }}
      >
        {categories.map((category) => (
          <Paper
            key={category.id}
            elevation={0}
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: colors.primary[300],
                transform: "translateY(-5px)",
                borderColor: colors.greenAccent[500] + "50",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}>
              <Box
                sx={{
                  backgroundColor: category.color + "15",
                  color: category.color,
                  padding: "8px 16px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 700,
                  border: `1px solid ${category.color}30`,
                }}
              >
                {category.name}
              </Box>
              <Box sx={{ display: "flex", gap: "4px" }}>
                <IconButton
                  size="small"
                  onClick={() => handleOpenDialog(category)}
                  sx={{
                    color: colors.blueAccent[500],
                    "&:hover": { backgroundColor: colors.blueAccent[500] + "20" }
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteClick(category.id)}
                  sx={{
                    color: "#ef4444",
                    "&:hover": { backgroundColor: "#ef444420" }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "12px", mb: "8px" }}>
              <CalendarMonthIcon sx={{ color: category.color, fontSize: "28px" }} />
              <Typography sx={{ color: colors.grey[100], fontSize: "24px", fontWeight: 800 }}>
                {category.events}
              </Typography>
            </Box>
            <Typography sx={{ color: colors.grey[400], fontSize: "13px", fontWeight: 500, mb: "16px" }}>
              {t("Événements enregistrés")}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={{ flex: 1, height: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "10px", overflow: "hidden" }}>
                <Box sx={{ width: `${category.progress}%`, height: "100%", backgroundColor: category.color, borderRadius: "10px" }} />
              </Box>
              <Typography sx={{ color: colors.grey[500], fontSize: "11px", fontWeight: 700 }}>
                {category.progress}%
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

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
              minWidth: "400px",
              p: "8px"
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "20px", pb: 1 }}>
          {editMode ? t("Modifier la Catégorie") : t("Nouvelle Catégorie")}
        </DialogTitle>
        <DialogContent sx={{ pt: "16px !important" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField
              autoFocus
              fullWidth
              label={t("Nom de la catégorie")}
              variant="filled"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              sx={{
                "& .MuiFilledInput-root": { backgroundColor: colors.primary[500] },
                "& .MuiInputLabel-root": { color: colors.grey[400] },
                "& .MuiInputBase-input": { color: colors.grey[100] }
              }}
            />
            <FormControl fullWidth variant="filled">
              <InputLabel sx={{ color: colors.grey[400] }}>{t("Couleur")}</InputLabel>
              <Select
                value={newCategory.color}
                label={t("Couleur")}
                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                sx={{
                  backgroundColor: colors.primary[500],
                  color: colors.grey[100],
                  "& .MuiSelect-icon": { color: colors.grey[400] },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: colors.grey[700] }
                }}
              >
                {categoryColors.map((color) => (
                  <MenuItem key={color} value={color}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Box sx={{ width: "20px", height: "20px", borderRadius: "4px", backgroundColor: color }} />
                      <Typography sx={{ color: colors.grey[100] }}>{color}</Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: colors.grey[400],
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { backgroundColor: colors.primary[500] }
            }}
          >
            {t("Annuler")}
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "8px",
              px: 3,
              "&:hover": { backgroundColor: colors.greenAccent[700] }
            }}
          >
            {editMode ? t("Enregistrer") : t("Ajouter")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, categoryId: null })}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.primary[400],
              borderRadius: "16px",
              border: `1px solid ${colors.grey[700]}`,
              color: colors.grey[100],
              minWidth: "350px"
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "18px", display: "flex", alignItems: "center", gap: "10px" }}>
          <DeleteIcon sx={{ color: "#ef4444", fontSize: "24px" }} />
          {t("Confirmer la suppression")}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: colors.grey[300] }}>
            {t("Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.")}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={() => setDeleteConfirm({ open: false, categoryId: null })}
            sx={{
              color: colors.grey[400],
              textTransform: "none",
              fontWeight: 600
            }}
          >
            {t("Annuler")}
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#ef4444",
              color: "white",
              textTransform: "none",
              fontWeight: 700,
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#dc2626" }
            }}
          >
            {t("Supprimer")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CategoryManagement;