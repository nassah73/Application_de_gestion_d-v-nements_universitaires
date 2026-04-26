import { Box, Typography, Switch, FormControlLabel, TextField, Button, Paper, Divider, Stack } from "@mui/material";
import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "Plateforme Événementielle UIZ",
    allowRegistration: true,
    maintenanceMode: false,
    twoFactorAuth: true,
    emailNotifications: true,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Box sx={{ p: "24px", height: "100%", overflow: "auto" }}>
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
          PARAMÈTRES SYSTÈME
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
          Configuration globale de la plateforme
        </Box>

      <Stack spacing={3}>
        {/* General Settings */}
        <Paper
          elevation={0}
          sx={{
            p: "24px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Typography variant="h4" color="white" mb="20px" fontWeight="700">
            Général
          </Typography>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nom du Site"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              variant="filled"
              sx={{ input: { color: "white" }, label: { color: "rgba(255,255,255,0.5)" } }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.allowRegistration}
                  onChange={handleChange}
                  name="allowRegistration"
                  color="warning"
                />
              }
              label={<Typography color="white">Autoriser les nouvelles inscriptions</Typography>}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  name="maintenanceMode"
                  color="error"
                />
              }
              label={<Typography color="white">Mode Maintenance</Typography>}
            />
          </Stack>
        </Paper>

        {/* Security Settings */}
        <Paper
          elevation={0}
          sx={{
            p: "24px",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <Typography variant="h4" color="white" mb="20px" fontWeight="700">
            Sécurité & Notifications
          </Typography>
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.twoFactorAuth}
                  onChange={handleChange}
                  name="twoFactorAuth"
                  color="warning"
                />
              }
              label={<Typography color="white">Authentification à deux facteurs (2FA) obligatoire</Typography>}
            />
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  name="emailNotifications"
                  color="warning"
                />
              }
              label={<Typography color="white">Activer les notifications par email</Typography>}
            />
          </Stack>
        </Paper>

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#cd7329",
              color: "white",
              fontWeight: "700",
              px: "40px",
              py: "12px",
              borderRadius: "12px",
              "&:hover": { backgroundColor: "#b36222" },
            }}
          >
            Sauvegarder les modifications
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Settings;
