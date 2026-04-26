import { Box, Typography, Button, useTheme, Paper, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const categoryColors = [
  "#3b82f6", // Academic - blue
  "#22c55e", // Sports - green
  "#a855f7", // Cultural - purple
  "#f97316", // Technology - orange
  "#ec4899", // Workshops - pink
  "#6366f1", // Social - indigo
];

const CategoryManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewCategory("");
  };

  const categories = [
    { name: t("Académique"), events: 234, progress: 75 },
    { name: t("Sports"), events: 156, progress: 45 },
    { name: t("Culturel"), events: 189, progress: 60 },
    { name: t("Technologie"), events: 98, progress: 30 },
    { name: t("Ateliers"), events: 145, progress: 50 },
    { name: t("Social"), events: 267, progress: 85 },
  ];

  return (
    <Box
      sx={{
        p: "24px",
        backgroundColor: "#0f172a",
        height: "100%",
        overflow: "auto"
      }}
    >
      {/* Header row */}
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
            sx={{ fontSize: "28px", fontWeight: 900, color: "white", mb: "4px" }}
          >
            {t("Gestion des Catégories")}
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.45)" }}>
            {t("Organiser et gérer les catégories d'événements")}
          </Typography>
        </Box>

        <Button
          type="button"
          variant="contained"
          onClick={handleOpen}
          startIcon={<span>+</span>}
          sx={{
            backgroundColor: "#cd7329",
            color: "#fff",
            borderRadius: "12px",
            padding: "10px 24px",
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(205, 115, 41, 0.3)",
            "&:hover": { 
              backgroundColor: "#b36222",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 20px rgba(205, 115, 41, 0.4)",
            },
          }}
        >
          {t("Nouvelle Catégorie")}
        </Button>
      </Box>

      {/* ✅ Grid responsive */}
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
        {categories.map((category, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: "20px",
              padding: "24px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transform: "translateY(-5px)",
                borderColor: "rgba(205, 115, 41, 0.3)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "20px" }}>
              <Box
                sx={{
                  backgroundColor: `${categoryColors[index % categoryColors.length]}15`,
                  color: categoryColors[index % categoryColors.length],
                  padding: "8px 16px",
                  borderRadius: "100px",
                  fontSize: "12px",
                  fontWeight: 700,
                  border: `1px solid ${categoryColors[index % categoryColors.length]}30`,
                }}
              >
                {category.name}
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.3)", "&:hover": { color: "#fff" } }}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.3)", "&:hover": { color: "#ef4444" } }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Typography sx={{ color: "white", fontSize: "24px", fontWeight: 800, mb: "4px" }}>
              {category.events}
            </Typography>
            <Typography sx={{ color: "rgba(255, 255, 255, 0.45)", fontSize: "13px", fontWeight: 500 }}>
              {t("Événements enregistrés")}
            </Typography>

            <Box sx={{ mt: "24px", pt: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={{ flex: 1, height: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "10px", overflow: "hidden" }}>
                <Box sx={{ width: `${category.progress}%`, height: "100%", backgroundColor: categoryColors[index % categoryColors.length], borderRadius: "10px" }} />
              </Box>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "11px", fontWeight: 700 }}>
                {category.progress}%
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* ✅ Add Category Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "#1e293b",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            minWidth: "400px"
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, fontSize: "20px" }}>{t("Nouvelle Catégorie")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={t("Nom de la catégorie")}
            fullWidth
            variant="filled"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            sx={{ 
              mt: 2,
              "& .MuiFilledInput-root": { backgroundColor: "rgba(255, 255, 255, 0.05)", color: "white" },
              "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.5)" }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} sx={{ color: "rgba(255, 255, 255, 0.5)", textTransform: "none", fontWeight: 600 }}>
            {t("Annuler")}
          </Button>
          <Button 
            onClick={handleClose} 
            variant="contained"
            sx={{ 
              backgroundColor: "#cd7329", 
              color: "white", 
              textTransform: "none", 
              fontWeight: 700,
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#b36222" }
            }}
          >
            {t("Ajouter")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryManagement;