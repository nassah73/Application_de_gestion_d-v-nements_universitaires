import { Box, Typography, Button, useTheme, Paper } from "@mui/material";
import { tokens } from "../theme";
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

  const categories = [
    { name: "Académique", events: 234 },
    { name: "Sports", events: 156 },
    { name: "Culturel", events: 189 },
    { name: "Technologie", events: 98 },
    { name: "Ateliers", events: 145 },
    { name: "Social", events: 267 },
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
            Gestion des Catégories
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.45)" }}>
            Organiser et gérer les catégories d'événements
          </Typography>
        </Box>

        <Button
          type="button"
          variant="contained"
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
          Nouvelle Catégorie
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
              Événements enregistrés
            </Typography>

            <Box sx={{ mt: "24px", pt: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Box sx={{ flex: 1, height: "6px", backgroundColor: "rgba(255, 255, 255, 0.05)", borderRadius: "10px", overflow: "hidden" }}>
                <Box sx={{ width: "65%", height: "100%", backgroundColor: categoryColors[index % categoryColors.length], borderRadius: "10px" }} />
              </Box>
              <Typography sx={{ color: "rgba(255, 255, 255, 0.3)", fontSize: "11px", fontWeight: 700 }}>
                65%
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryManagement;