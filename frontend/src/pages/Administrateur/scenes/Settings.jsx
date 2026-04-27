import { 
  Box, 
  Typography, 
  Switch, 
  FormControlLabel, 
  TextField, 
  Button, 
  Paper, 
  Stack, 
  useTheme,
  Alert,
  Snackbar,
  MenuItem
} from "@mui/material";
import { useState } from "react";
import { tokens } from "../theme";
import SaveIcon from "@mui/icons-material/Save";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language";

const Settings = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [settings, setSettings] = useState({
    siteName: "Plateforme Événementielle UIZ",
    siteUrl: "https://events.uiz.ac.ma",
    allowRegistration: true,
    maintenanceMode: false,
    twoFactorAuth: true,
    emailNotifications: true,
    pushNotifications: false,
    defaultLanguage: "fr",
    sessionTimeout: "30",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: "24px", minHeight: "100%", backgroundColor: colors.primary[500], overflow: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: "30px" }}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            color: colors.grey[100],
            mb: "8px",
            letterSpacing: "-1px",
          }}
        >
          PARAMÈTRES SYSTÈME
        </Typography>
        <Typography variant="h5" sx={{ color: colors.grey[400] }}>
          Configuration globale et sécurité de la plateforme
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: "24px",
        }}
      >
        {/* General Settings */}
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: "20px",
              border: `1px solid ${colors.grey[800]}`,
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "25px" }}>
              <SettingsIcon sx={{ color: colors.greenAccent[500] }} />
              <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "700" }}>
                Général
              </Typography>
            </Box>
            
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Nom du Site"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                variant="filled"
                sx={{ 
                  "& .MuiFilledInput-root": { backgroundColor: colors.primary[400] },
                  "& .MuiInputLabel-root": { color: colors.grey[400] },
                  "& .MuiInputBase-input": { color: colors.grey[100] }
                }}
              />
              <TextField
                fullWidth
                label="URL du Site"
                name="siteUrl"
                value={settings.siteUrl}
                onChange={handleChange}
                variant="filled"
                sx={{ 
                  "& .MuiFilledInput-root": { backgroundColor: colors.primary[400] },
                  "& .MuiInputLabel-root": { color: colors.grey[400] },
                  "& .MuiInputBase-input": { color: colors.grey[100] }
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.allowRegistration}
                    onChange={handleChange}
                    name="allowRegistration"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": { color: colors.greenAccent[500] },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: colors.greenAccent[500] },
                    }}
                  />
                }
                label={<Typography color={colors.grey[100]}>Autoriser les nouvelles inscriptions</Typography>}
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
                label={<Typography color={colors.grey[100]}>Mode Maintenance</Typography>}
              />
            </Stack>
          </Paper>
        </Box>

        {/* Security Settings */}
        <Box>
          <Paper
            elevation={0}
            sx={{
              p: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: "20px",
              border: `1px solid ${colors.grey[800]}`,
              height: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "25px" }}>
              <SecurityIcon sx={{ color: colors.blueAccent[500] }} />
              <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "700" }}>
                Sécurité
              </Typography>
            </Box>

            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={handleChange}
                    name="twoFactorAuth"
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": { color: colors.blueAccent[500] },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: colors.blueAccent[500] },
                    }}
                  />
                }
                label={<Typography color={colors.grey[100]}>Authentification 2FA obligatoire</Typography>}
              />
              <TextField
                fullWidth
                label="Délai d'expiration de session (minutes)"
                name="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={handleChange}
                variant="filled"
                sx={{ 
                  "& .MuiFilledInput-root": { backgroundColor: colors.primary[400] },
                  "& .MuiInputLabel-root": { color: colors.grey[400] },
                  "& .MuiInputBase-input": { color: colors.grey[100] }
                }}
              />
            </Stack>
          </Paper>
        </Box>

        {/* Notifications & Language */}
        <Box sx={{ gridColumn: { xs: "span 1", md: "span 2" } }}>
          <Paper
            elevation={0}
            sx={{
              p: "24px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              borderRadius: "20px",
              border: `1px solid ${colors.grey[800]}`,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: "32px",
              }}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "20px" }}>
                  <NotificationsIcon sx={{ color: colors.greenAccent[500] }} />
                  <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "700" }}>
                    Notifications
                  </Typography>
                </Box>
                <Stack spacing={2}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={handleChange}
                        name="emailNotifications"
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: colors.greenAccent[500] },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: colors.greenAccent[500] },
                        }}
                      />
                    }
                    label={<Typography color={colors.grey[100]}>Notifications Email</Typography>}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.pushNotifications}
                        onChange={handleChange}
                        name="pushNotifications"
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": { color: colors.greenAccent[500] },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: colors.greenAccent[500] },
                        }}
                      />
                    }
                    label={<Typography color={colors.grey[100]}>Notifications Push Navigateur</Typography>}
                  />
                </Stack>
              </Box>

              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "20px" }}>
                  <LanguageIcon sx={{ color: colors.blueAccent[500] }} />
                  <Typography variant="h4" sx={{ color: colors.grey[100], fontWeight: "700" }}>
                    Langue & Localisation
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  select
                  label="Langue par défaut"
                  name="defaultLanguage"
                  value={settings.defaultLanguage}
                  onChange={handleChange}
                  variant="filled"
                  sx={{ 
                    "& .MuiFilledInput-root": { backgroundColor: colors.primary[400] },
                    "& .MuiInputLabel-root": { color: colors.grey[400] },
                    "& .MuiInputBase-input": { color: colors.grey[100] }
                  }}
                >
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="ar">العربية</MenuItem>
                </TextField>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Save Button */}
      <Box sx={{ mt: "30px", display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
            fontWeight: "bold",
            px: "35px",
            py: "12px",
            borderRadius: "12px",
            "&:hover": { backgroundColor: colors.greenAccent[700] },
          }}
        >
          Sauvegarder les configurations
        </Button>
      </Box>

      {/* Notification Toast */}
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: "100%", borderRadius: "10px" }}
        >
          Paramètres mis à jour avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;