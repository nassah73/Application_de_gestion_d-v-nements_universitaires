import { Box, Typography, useTheme, Button, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const Moderation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user", headerName: "Utilisateur", flex: 1 },
    { field: "type", headerName: "Type", flex: 0.7 },
    { field: "content", headerName: "Contenu", flex: 1.5 },
    {
      field: "status",
      headerName: "Statut",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Chip
            icon={
              status === "En attente" ? (
                <ErrorOutlineOutlinedIcon />
              ) : status === "Approuvé" ? (
                <CheckCircleOutlinedIcon />
              ) : (
                <CancelOutlinedIcon />
              )
            }
            label={status}
            color={
              status === "Approuvé"
                ? "success"
                : status === "Rejeté"
                ? "error"
                : "warning"
            }
            variant="outlined"
            size="small"
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: () => (
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            color="success"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Approuver
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Rejeter
          </Button>
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      user: "Club Tech UIZ",
      type: "Organisateur",
      content: "Demande de création de compte",
      status: "En attente",
    },
    {
      id: 2,
      user: "Ahmed Alaoui",
      type: "Événement",
      content: "Conférence sur l'IA",
      status: "Approuvé",
    },
    {
      id: 3,
      user: "BDE Sciences",
      type: "Commentaire",
      content: "Contenu signalé par 5 utilisateurs",
      status: "Rejeté",
    },
  ];

  return (
    <Box sx={{ p: "24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Box mb="20px">
        <Typography variant="h2" color="white" fontWeight="900">
          MODÉRATION
        </Typography>
        <Typography variant="h5" color="rgba(255, 255, 255, 0.45)">
          Système de validation des contenus et des comptes
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
            color: "white",
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

export default Moderation;
