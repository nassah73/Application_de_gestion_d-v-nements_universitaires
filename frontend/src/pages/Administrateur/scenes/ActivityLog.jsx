import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

const ActivityLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "timestamp", headerName: "Date & Heure", width: 180 },
    { field: "user", headerName: "Utilisateur", flex: 1 },
    { field: "action", headerName: "Action", flex: 1 },
    { field: "target", headerName: "Cible", flex: 1 },
    { field: "status", headerName: "Statut", width: 120 },
  ];

  const rows = [
    {
      id: 1,
      timestamp: "2024-04-26 14:32:10",
      user: "admin@uiz.ac.ma",
      action: "Connexion",
      target: "Système",
      status: "Succès",
    },
    {
      id: 2,
      timestamp: "2024-04-26 15:10:45",
      user: "admin@uiz.ac.ma",
      action: "Validation",
      target: "Événement #452",
      status: "Succès",
    },
    {
      id: 3,
      timestamp: "2024-04-26 16:05:22",
      user: "h.elamrani@uiz.ac.ma",
      action: "Modification",
      target: "Profil Organisateur",
      status: "Succès",
    },
    {
      id: 4,
      timestamp: "2024-04-26 16:12:00",
      user: "Inconnu",
      action: "Tentative Connexion",
      target: "Espace Admin",
      status: "Échec",
    },
  ];

  return (
    <Box sx={{ p: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Box mb="20px">
        <Typography variant="h2" color="white" fontWeight="900">
          JOURNAL D'ACTIVITÉ
        </Typography>
        <Typography variant="h5" color="rgba(255, 255, 255, 0.45)">
          Historique complet des actions effectuées sur la plateforme
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "16px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            color: "rgba(255, 255, 255, 0.7)",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(205, 115, 41, 0.1) !important",
            borderBottom: "1px solid rgba(205, 115, 41, 0.2)",
            color: "white",
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} pageSize={10} />
      </Box>
    </Box>
  );
};

export default ActivityLog;
