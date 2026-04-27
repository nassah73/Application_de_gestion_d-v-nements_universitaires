import { 
  Box, 
  Typography, 
  useTheme, 
  Button, 
  Chip, 
  IconButton, 
  Tooltip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Snackbar, 
  Alert 
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useState } from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

const initialRows = [
  {
    id: 1,
    user: "Club Tech UIZ",
    type: "Organisateur",
    content: "Demande de création de compte",
    date: "2024-04-25 10:30",
    details: "Le Club Tech de l'UIZ souhaite organiser des hackathons et des ateliers de programmation. Ils ont fourni tous les documents nécessaires.",
    status: "En attente",
  },
  {
    id: 2,
    user: "Ahmed Alaoui",
    type: "Événement",
    content: "Conférence sur l'IA",
    date: "2024-04-24 14:15",
    details: "Une conférence prévue pour le 15 mai sur l'impact de l'IA générative dans l'éducation.",
    status: "Approuvé",
  },
  {
    id: 3,
    user: "BDE Sciences",
    type: "Commentaire",
    content: "Contenu signalé par 5 utilisateurs",
    date: "2024-04-23 09:00",
    details: "Le commentaire contenait des propos inappropriés selon les rapports des utilisateurs.",
    status: "Rejeté",
  },
  {
    id: 4,
    user: "Meryem Tazi",
    type: "Organisateur",
    content: "Demande de partenariat",
    date: "2024-04-26 11:20",
    details: "Meryem représente une association locale souhaitant collaborer sur des événements culturels.",
    status: "En attente",
  },
];

const Moderation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // États
  const [data, setData] = useState(initialRows);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [actionType, setActionType] = useState(""); // "Approuver" ou "Rejeter"
  const [actionReason, setActionReason] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Gestionnaires
  const handleOpenDetails = (row) => {
    setSelectedRow(row);
    setOpenDetails(true);
  };

  const handleActionClick = (row, type) => {
    setSelectedRow(row);
    setActionType(type);
    setOpenActionDialog(true);
  };

  const handleConfirmAction = () => {
    const newStatus = actionType === "Approuver" ? "Approuvé" : "Rejeté";
    setData(prev => prev.map(row => 
      row.id === selectedRow.id ? { ...row, status: newStatus } : row
    ));
    
    setSnackbar({
      open: true,
      message: `L'élément a été ${newStatus.toLowerCase()} avec succès.`,
      severity: actionType === "Approuver" ? "success" : "info"
    });
    
    setOpenActionDialog(false);
    setActionReason("");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "user", headerName: "Utilisateur", flex: 1 },
    { 
      field: "type", 
      headerName: "Type", 
      width: 130,
      renderCell: ({ row: { type } }) => (
        <Chip 
          label={type} 
          size="small" 
          sx={{ 
            backgroundColor: "rgba(255, 255, 255, 0.05)", 
            color: colors.grey[100],
            border: `1px solid ${colors.grey[700]}`
          }} 
        />
      )
    },
    { field: "content", headerName: "Sujet", flex: 1.5 },
    {
      field: "status",
      headerName: "Statut",
      width: 130,
      renderCell: ({ row: { status } }) => (
        <Chip
          icon={
            status === "En attente" ? (
              <ErrorOutlineOutlinedIcon style={{ fontSize: "16px" }} />
            ) : status === "Approuvé" ? (
              <CheckCircleOutlinedIcon style={{ fontSize: "16px" }} />
            ) : (
              <CancelOutlinedIcon style={{ fontSize: "16px" }} />
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
          variant="filled"
          size="small"
          sx={{ fontWeight: "700" }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "8px", height: "100%", alignItems: "center" }}>
          <Tooltip title="Voir détails">
            <IconButton onClick={() => handleOpenDetails(params.row)} size="small" sx={{ color: colors.blueAccent[400] }}>
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
          
          {params.row.status === "En attente" && (
            <>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleActionClick(params.row, "Approuver")}
                sx={{ textTransform: "none", fontSize: "12px", borderRadius: "8px" }}
              >
                Approuver
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={() => handleActionClick(params.row, "Rejeté")}
                sx={{ textTransform: "none", fontSize: "12px", borderRadius: "8px" }}
              >
                Rejeter
              </Button>
            </>
          )}
          
          {params.row.status !== "En attente" && (
            <Tooltip title="Remettre en attente">
              <IconButton 
                size="small" 
                onClick={() => {
                  setData(prev => prev.map(row => row.id === params.row.id ? { ...row, status: "En attente" } : row));
                  setSnackbar({ open: true, message: "Élément remis en attente.", severity: "warning" });
                }}
                sx={{ color: colors.grey[400] }}
              >
                <HistoryOutlinedIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: "24px", height: "100%", display: "flex", flexDirection: "column", backgroundColor: colors.primary[500] }}>
      {/* Header */}
      <Box sx={{ mb: "30px" }}>
        <Typography variant="h1" sx={{ color: colors.grey[100], fontWeight: "900", mb: "8px", letterSpacing: "-1px" }}>
          MODÉRATION
        </Typography>
        <Typography variant="h5" color={colors.grey[400]}>
          Système de validation des contenus et des comptes utilisateurs
        </Typography>
      </Box>

      {/* Stats Cards (Optional but adds value) */}
      <Box sx={{ display: "flex", gap: "20px", mb: "30px" }}>
        {[
          { label: "Total à traiter", value: data.filter(r => r.status === "En attente").length, color: colors.greenAccent[500] },
          { label: "Approuvés", value: data.filter(r => r.status === "Approuvé").length, color: colors.blueAccent[500] },
          { label: "Rejetés", value: data.filter(r => r.status === "Rejeté").length, color: "#ef4444" },
        ].map((stat, idx) => (
          <Box 
            key={idx} 
            sx={{ 
              backgroundColor: colors.primary[400], 
              p: "15px 25px", 
              borderRadius: "16px", 
              border: `1px solid ${colors.grey[800]}`,
              flex: 1
            }}
          >
            <Typography variant="h6" sx={{ color: colors.grey[400], mb: "5px" }}>{stat.label}</Typography>
            <Typography variant="h3" sx={{ color: stat.color, fontWeight: "800" }}>{stat.value}</Typography>
          </Box>
        ))}
      </Box>

      {/* DataGrid */}
      <Box
        sx={{
          flex: 1,
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: colors.primary[400],
            borderRadius: "16px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `1px solid ${colors.grey[800]}`,
            color: colors.grey[100],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            color: colors.grey[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid 
          rows={data} 
          columns={columns} 
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
        />
      </Box>

      {/* Dialog Détails */}
      <Dialog 
        open={openDetails} 
        onClose={() => setOpenDetails(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.primary[400],
              borderRadius: "16px",
              border: `1px solid ${colors.grey[700]}`,
              color: colors.grey[100],
              minWidth: "500px"
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: "800", fontSize: "20px" }}>Détails de la demande</DialogTitle>
        <DialogContent dividers sx={{ borderColor: colors.grey[800] }}>
          {selectedRow && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px", pt: 1 }}>
              <Box>
                <Typography variant="caption" sx={{ color: colors.grey[500], textTransform: "uppercase", fontWeight: "700" }}>Utilisateur</Typography>
                <Typography variant="h5">{selectedRow.user}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: colors.grey[500], textTransform: "uppercase", fontWeight: "700" }}>Type</Typography>
                <Typography variant="h5">{selectedRow.type}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: colors.grey[500], textTransform: "uppercase", fontWeight: "700" }}>Sujet</Typography>
                <Typography variant="h5">{selectedRow.content}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: colors.grey[500], textTransform: "uppercase", fontWeight: "700" }}>Description complète</Typography>
                <Typography variant="body1" sx={{ backgroundColor: colors.primary[500], p: 2, borderRadius: "8px", mt: 1 }}>
                  {selectedRow.details}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDetails(false)} variant="outlined" sx={{ color: colors.grey[100], borderColor: colors.grey[700] }}>
            Fermer
          </Button>
          {selectedRow?.status === "En attente" && (
            <>
              <Button onClick={() => { setOpenDetails(false); handleActionClick(selectedRow, "Rejeté"); }} color="error">Rejeter</Button>
              <Button onClick={() => { setOpenDetails(false); handleActionClick(selectedRow, "Approuver"); }} color="success" variant="contained">Approuver</Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Dialog Action (Approuver/Rejeter) */}
      <Dialog 
        open={openActionDialog} 
        onClose={() => setOpenActionDialog(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: colors.primary[400],
              borderRadius: "16px",
              border: `1px solid ${colors.grey[700]}`,
              color: colors.grey[100],
              minWidth: "400px"
            }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: "800" }}>
          {actionType === "Approuver" ? "Confirmer l'approbation" : "Motif du rejet"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2, color: colors.grey[300] }}>
            {actionType === "Approuver" 
              ? `Voulez-vous vraiment approuver cet élément pour "${selectedRow?.user}" ?`
              : "Veuillez indiquer la raison du rejet (optionnel) :"
            }
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="filled"
            placeholder="Commentaire interne..."
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
            sx={{ "& .MuiFilledInput-root": { backgroundColor: colors.primary[500] } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenActionDialog(false)} sx={{ color: colors.grey[400] }}>Annuler</Button>
          <Button 
            onClick={handleConfirmAction} 
            variant="contained" 
            color={actionType === "Approuver" ? "success" : "error"}
            sx={{ borderRadius: "8px", px: 3 }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Feedback */}
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

export default Moderation;