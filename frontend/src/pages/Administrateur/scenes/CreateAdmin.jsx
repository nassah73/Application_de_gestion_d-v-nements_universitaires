import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuItem, InputAdornment } from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ComputerIcon from "@mui/icons-material/Computer";
import CodeIcon from "@mui/icons-material/Code";

const roles = [
  { value: "admin", label: "Administration", icon: <AdminPanelSettingsIcon /> },
  { value: "it", label: "IT", icon: <ComputerIcon /> },
  { value: "dev", label: "Developer", icon: <CodeIcon /> },
];

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
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
  address1: yup.string().required("Adresse requise"),
  address2: yup.string(),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
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