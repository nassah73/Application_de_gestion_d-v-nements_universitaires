// CategoryManagement.jsx
import { Box, Typography, Button, useTheme, Paper } from "@mui/material";
import { tokens } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";

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
    <Box sx={{p: "20px"}}>
      <Header title="Category Management" subtitle="Organize and manage event categories" />
      <h1>Category Management</h1>
      <Box sx={{pl: "20px", pb: "20px"}}><h9>Organize and manage event categories</h9></Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="20px"
        mt="30px"
      >
        {categories.map((category, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              backgroundColor: colors.primary[400],
              borderRadius: "12px",
              padding: "20px",
              p: "15px",
              pl: "30%",
              m: "20px",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
              },
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color={colors.grey[100]}
                  sx={{ mb: 1 }}
                >
                  <h1>{category.name}</h1>
                </Typography>
                <Typography  color={colors.greenAccent[400]}>
                  <h2>{category.events} events</h2>
                </Typography>
              </Box>

              <Box display="flex" gap="10px">
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{
                    p: "10px",m: "10px",pl: "30px",pr: "30px",
                    backgroundColor: colors.blueAccent[500],
                    "&:hover": { backgroundColor: colors.blueAccent[600] },
                    borderRadius: "8px",
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DeleteIcon />}
                  sx={{
                    p: "10px",m: "10px",pl: "30px",pr: "30px",
                    backgroundColor: colors.redAccent[500],
                    "&:hover": { backgroundColor: colors.redAccent[600] },
                    borderRadius: "8px",
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* زر إضافة تصنيف جديد */}
      <Box display="flex" justifyContent="center" mt="30px">
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: colors.greenAccent[500],
            "&:hover": { backgroundColor: colors.greenAccent[600] },
            borderRadius: "10px",
            padding: "10px 30px",
            fontWeight: "bold",
          }}
        >
          + Add New Category
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryManagement;