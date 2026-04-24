import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: "40px 24px",
        pb: "10044px",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-120px",
          left: "-120px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-100px",
          right: "-80px",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
        },
        
      }}
    >
      <Box
        sx={{
          
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: isNonMobile ? "40px 48px" : "28px 24px",
          width: "100%",
          maxWidth: "620px",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Badge */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(99,102,241,0.2)",
            border: "1px solid rgba(99,102,241,0.4)",
            borderRadius: "100px",
            padding: "4px 14px",
            fontSize: "11px",
            fontWeight: 500,
            color: "#a5b4fc",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            mb: "20px",
          }}
        >
          <Box
            component="span"
            sx={{
              width: "6px",
              height: "6px",
              background: "#818cf8",
              borderRadius: "50%",
              "@keyframes pulse": {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.4 },
              },
              animation: "pulse 2s infinite",
            }}
          />
          New user
        </Box>

        {/* Title */}
        <Box
          component="h1"
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "32px",
            fontWeight: 800,
            color: "#fff",
            m: 0,
            mb: "13px",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            "& span": {
              background: "linear-gradient(90deg, #818cf8, #34d399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
          }}
        >
          Create <span>profile</span>
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.45)",
            m: 0,
            mb: "30px",
            ml: "20px",
            fontWeight: 300,
          }}
        >
          Fill in the details below to add a new user to the system.
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
                display="grid"
                gap="16px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4", pb: "15px",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  placeholder="Mohamed"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2", ...inputStyles }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  placeholder="Nait Bihi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2", ...inputStyles }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email Address"
                  placeholder="mohamed@example.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4", ...inputStyles }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  placeholder="+212 6xx xxx xxx"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 4", ...inputStyles }}
                />
              </Box>

              {/* Address divider */}
              
              <Box
                display="grid"
                gap="16px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
              
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address Line 2"
                  placeholder="Taroudant...."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address2}
                  name="address2"
                  error={!!touched.address2 && !!errors.address2}
                  helperText={touched.address2 && errors.address2}
                  sx={{ gridColumn: "span 4", ...inputStyles }}
                />
              </Box>

              <Box display="flex" justifyContent="center" mt="28px"  sx={{ pt: "30px", pl: "30%"}}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    pl: "20px",
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                    color: "#fff",
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "14px 32px",
                    borderRadius: "14px",
                    textTransform: "none",
                    boxShadow: "0 8px 24px rgba(99,102,241,0.35)",
                    transition: "transform 0.15s, box-shadow 0.2s",
                    "&:hover": {
                      background: "linear-gradient(135deg, #818cf8, #6366f1)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 32px rgba(99,102,241,0.5)",
                    },
                    "&:active": {
                      transform: "scale(0.98)",
                    },
                  }}
                >
                  Create new user →
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const inputStyles = {
  "& .MuiFilledInput-root": {
    background: "rgba(255,255,255,0.06)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.12)",
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    "&:hover": {
      background: "rgba(255,255,255,0.09)",
    },
    "&.Mui-focused": {
      background: "rgba(99,102,241,0.08)",
      borderColor: "rgba(99,102,241,0.7)",
      boxShadow: "0 0 0 3px rgba(99,102,241,0.15)",
    },
    "&::before, &::after": { display: "none" },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.4)",
    fontSize: "13px",
    "&.Mui-focused": { color: "#a5b4fc" },
  },
  "& .MuiFilledInput-input": {
    color: "#fff",
    fontSize: "14px",
    padding: "20px 16px 8px",
  },
  "& .MuiFormHelperText-root": {
    color: "#f87171",
    fontSize: "11px",
    marginLeft: "4px",
  },
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;