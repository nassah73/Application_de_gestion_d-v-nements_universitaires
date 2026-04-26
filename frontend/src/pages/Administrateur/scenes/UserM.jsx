import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataTeam } from "../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ComputerIcon from "@mui/icons-material/Computer";
import CodeIcon from "@mui/icons-material/Code";


const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
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
      field: "accessLevel",
      headerName: "Niveau d'accès",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            sx={{
              width: "60px",
              m: "0 auto",
              mt: "10px",
              ml: "20%",
              p: "5px",
              display: "flex",
              justifyContent: "center",
              backgroundColor:
                access === "admin"
                  ? colors.greenAccent[600]
                  : access === "manager"
                  ? colors.blueAccent[700]
                  : colors.primary[300],
              borderRadius: "4px",
            }}
          >

            {access === "admin" && <AdminPanelSettingsIcon sx={{ fontSize: "18px" }} />}
            {access === "manager" && <ComputerIcon sx={{ fontSize: "18px" }} />}
            {access === "user" && <CodeIcon sx={{ fontSize: "18px" }} />}
            <Typography color={colors.grey[100]} sx={{ ml: "px", fontSize: "13px"}}>
              {access === "admin" ? "" : access === "manager" ? "" : ""}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
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


      <Box
        sx={{
          flex: 1,
          width: "100%",
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "16px",
            overflow: "hidden",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            color: "rgba(255, 255, 255, 0.7)",
          },
          "& .name-column--cell": {
            color: "#cd7329 !important",
            fontWeight: "600",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(205, 115, 41, 0.1) !important",
            borderBottom: "1px solid rgba(205, 115, 41, 0.2)",
            color: "white",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "700 !important",
            textTransform: "uppercase",
            fontSize: "12px",
            letterSpacing: "0.5px",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "transparent",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            color: "white",
          },
          "& .MuiCheckbox-root": {
            color: "#cd7329 !important",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.05) !important",
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;