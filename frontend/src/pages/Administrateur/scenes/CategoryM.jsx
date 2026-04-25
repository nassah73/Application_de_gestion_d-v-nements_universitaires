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
    { name: "Academic", events: 234 },
    { name: "Sports", events: 156 },
    { name: "Cultural", events: 189 },
    { name: "Technology", events: 98 },
    { name: "Workshops", events: 145 },
    { name: "Social", events: 267 },
  ];

  return (
    <Box
      sx={{
        p: "30px",
        backgroundColor: colors.primary[500],
        minHeight: "100vh",
        position: "relative",
        zIndex: 0,
        overflow: "visible",
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
            sx={{ fontSize: "28px", fontWeight: 700, color: colors.grey[100], mb: "4px" }}
          >
            Category Management
          </Typography>
          <Typography sx={{ fontSize: "14px", color: colors.grey[400] }}>
            Organize and manage event categories
          </Typography>
        </Box>

        <Button
          type="button"
          variant="contained"
          startIcon={<span style={{ fontSize: "18px", fontWeight: 300 }}>+</span>}
          sx={{
            backgroundColor: "#1e3a6e",
            color: "#fff",
            borderRadius: "10px",
            padding: "10px 22px",
            fontWeight: 600,
            fontSize: "14px",
            textTransform: "none",
            "&:hover": { backgroundColor: "#1a3260" },
          }}
        >
          New Category
        </Button>
      </Box>

      {/* ✅ Grid responsive — s'adapte à la taille de l'écran */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
          gap: "20px",
          width: "100%",
        }}
      >
        {categories.map((category, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "16px",
              padding: "20px",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.08)"
              }`,
              transition: "transform 0.2s, box-shadow 0.2s",
              // ✅ isole chaque card du form overlay du browser
              position: "relative",
              zIndex: 1,
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
              },
            }}
          >
            {/* Top: color square + name + events */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "14px", mb: "20px" }}>
              <Box
                sx={{
                  width: "52px",
                  height: "52px",
                  minWidth: "52px",
                  borderRadius: "12px",
                  backgroundColor: categoryColors[index],
                }}
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: colors.grey[100],
                    lineHeight: 1.2,
                  }}
                >
                  {category.name}
                </Typography>
                <Typography sx={{ fontSize: "13px", color: colors.grey[400], mt: "2px" }}>
                  {category.events} events
                </Typography>
              </Box>
            </Box>

            {/* Divider */}
            <Box
              sx={{
                height: "1px",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.08)",
                mb: "14px",
              }}
            />

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={<EditIcon sx={{ fontSize: "15px !important" }} />}
                sx={{
                  flex: 1,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "13px",
                  borderRadius: "8px",
                  color: colors.grey[300],
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(0,0,0,0.15)",
                  "&:hover": {
                    borderColor: colors.grey[400],
                    backgroundColor: "transparent",
                  },
                }}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="outlined"
                size="small"
                startIcon={<DeleteIcon sx={{ fontSize: "15px !important", color: "#ef4444" }} />}
                sx={{
                  flex: 1,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "13px",
                  borderRadius: "8px",
                  color: "#ef4444",
                  borderColor: "rgba(239,68,68,0.25)",
                  backgroundColor: "rgba(239,68,68,0.05)",
                  "&:hover": {
                    borderColor: "#ef4444",
                    backgroundColor: "rgba(239,68,68,0.10)",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryManagement;