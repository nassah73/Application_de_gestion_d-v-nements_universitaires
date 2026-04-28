import { Box, Button, TextField, IconButton, Typography, LinearProgress, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, InputAdornment } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ComputerIcon from "@mui/icons-material/Computer";
import CodeIcon from "@mui/icons-material/Code";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { addUser } from "../data/userStorage";

const roles = [
  { value: "Administration", label: "Administration", icon: <AdminPanelSettingsIcon /> },
  { value: "IT", label: "IT", icon: <ComputerIcon /> },
  { value: "Developer", label: "Developer", icon: <CodeIcon /> },
];

const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "#64748b" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 20, label: "Très faible", color: "#ef4444" };
  if (score === 2) return { score: 40, label: "Faible", color: "#f97316" };
  if (score === 3) return { score: 60, label: "Moyen", color: "#eab308" };
  if (score === 4) return { score: 80, label: "Fort", color: "#22c55e" };
  return { score: 100, label: "Très fort", color: "#10b981" };
};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleFormSubmit = (values, { resetForm }) => {
    // Build user object matching UserM format
    const newUserData = {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      role: values.role,
      password: values.password,
    };

    addUser(newUserData);

    setSnackbar({
      open: true,
      message: `${newUserData.name} a été ajouté avec succès !`,
      severity: "success",
    });

    resetForm();

    // Navigate to UserM after a short delay so the user sees the success message
    setTimeout(() => {
      navigate("/administrateur/UserM");
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: "40px 24px",
      }}
    >
      <Box
        sx={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: isNonMobile ? "48px" : "28px 24px",
          width: "100%",
          maxWidth: "680px",
          boxShadow: "0 32px 64px rgba(0,0,0,0.3)",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(205, 115, 41, 0.12)",
            border: "1px solid rgba(205, 115, 41, 0.2)",
            borderRadius: "100px",
            padding: "6px 16px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#cd7329",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: "24px",
          }}
        >
          <Box
            component="span"
            sx={{
              width: "6px",
              height: "6px",
              background: "#cd7329",
              borderRadius: "50%",
            }}
          />
          Nouvel utilisateur
        </Box>

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
          Créer un profil
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            m: 0,
            mb: "40px",
          }}
        >
          Remplissez les détails ci-dessous pour ajouter un nouvel utilisateur au système.
        </Box>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  gap: "24px",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Prénom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2", ...inputStyles, pb: "10px" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Nom"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2", ...inputStyles ,pb: "10px"}}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Adresse Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4", ...inputStyles ,pb: "10px"}}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Numéro de contact"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 4", ...inputStyles ,pb: "10px"}}
                />
                <Box sx={{ gridColumn: "span 4" }}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    label="Mot de passe"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "rgba(255,255,255,0.4)", fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                            sx={{ color: "rgba(255,255,255,0.4)" }}
                          >
                            {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ ...inputStyles, pb: "10px" }}
                  />
                  {values.password && (() => {
                    const strength = getPasswordStrength(values.password);
                    return (
                      <Box sx={{ mt: "4px", px: "4px" }}>
                        <LinearProgress
                          variant="determinate"
                          value={strength.score}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            backgroundColor: "rgba(255,255,255,0.08)",
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: strength.color,
                              borderRadius: 2,
                              transition: "transform 0.3s ease, background-color 0.3s ease",
                            },
                          }}
                        />
                        <Typography sx={{ fontSize: "11px", color: strength.color, mt: "4px", fontWeight: 600 }}>
                          {strength.label}
                        </Typography>
                      </Box>
                    );
                  })()}
                </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  select
                  label="Role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                  error={!!touched.role && !!errors.role}
                  helperText={touched.role && errors.role}
                  sx={{ gridColumn: "span 4", ...inputStyles, pb: "10px" }}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {role.icon}
                        {role.label}
                      </span>
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "end", mt: "40px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: "10px", ml: "30%",
                    backgroundColor: "#cd7329",
                    color: "white",
                    fontWeight: 700,
                    fontSize: "15px",
                    textTransform: "none",
                    padding: "12px 40px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 20px rgba(205, 115, 41, 0.2)",
                    "&:hover": {
                      backgroundColor: "#b36222",
                      transform: "translateY(-1px)",
                      boxShadow: "0 12px 24px rgba(205, 115, 41, 0.3)",
                    },
                  }}
                >
                  Créer le profil
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          icon={<CheckCircleOutlineIcon />}
          sx={{ width: "100%", borderRadius: "12px", fontWeight: 600 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("Prénom requis"),
  lastName: yup.string().required("Nom requis"),
  email: yup.string().email("Email invalide").required("Email requis"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Numéro de téléphone non valide")
    .required("Contact requis"),
  password: yup
    .string()
    .min(6, "Minimum 6 caractères")
    .required("Mot de passe requis"),
  role: yup.string().required("Rôle requis"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  password: "",
  role: "",
};

const inputStyles = {
  "& .MuiFilledInput-root": {
    background: "rgba(255,255,255,0.04)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
    "&::before, &::after": { display: "none" },
    "&:hover": { background: "rgba(255,255,255,0.06)" },
    "&.Mui-focused": {
      background: "rgba(255,255,255,0.06)",
      borderColor: "#818cf8",
      boxShadow: "0 0 0 4px rgba(129,140,248,0.15)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.45)",
    "&.Mui-focused": { color: "#818cf8" },
  },
  "& .MuiFilledInput-input": {
    color: "#fff",
    padding: "24px 16px 10px",
  },
  "& .MuiFormHelperText-root": {
    marginLeft: "4px",
    marginTop: "4px",
  },
};

export default Form;