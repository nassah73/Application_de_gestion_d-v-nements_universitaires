
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatCard = ({ title, value, change, icon, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        borderRadius: "20px",
        padding: "20px",
        width: "250px",
        margin: "20px",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-10px)",
        },
      }}
    >
      <Box display="flex" justifyContent="flex-end" alignItems="flex-start" sx={{ position: "relative" }}>
        <Box>
          <Typography color={colors.grey[100]} sx={{ mb: 1 }}>
            {title}
          </Typography>
          
          <Typography fontSize="28px" fontWeight="bold" color={colors.grey[100]} sx={{ mb: 1 }}>
            {value}
          </Typography>

          <Typography color={colors.greenAccent[500]} fontSize="14px" >
            {change}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: color,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            "& svg": {
              fontSize: "20px",
            },
          }}
        >
          {icon}
        </Box>
      </Box>
    </Box>
  );
};

export default StatCard;