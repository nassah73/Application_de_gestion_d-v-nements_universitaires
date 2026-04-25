import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatCard = ({ title, value, change, icon, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        borderRadius: "16px",
        padding: "16px 20px",
        flex: "1 1 200px",
        minWidth: "200px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          backgroundColor: "rgba(255, 255, 255, 0.07)",
          borderColor: "rgba(205, 115, 41, 0.3)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* title (yassar) + icon (limin) — nfs s-saff */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "14px",
        }}
      >
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "13px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            backgroundColor: "rgba(205, 115, 41, 0.18)",
            borderRadius: "12px",
            width: "44px",
            height: "44px",
            minWidth: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#cd7329",
            border: "1px solid rgba(205, 115, 41, 0.2)",
            "& svg": { fontSize: "22px" },
          }}
        >
          {icon}
        </Box>
      </Box>

      {/* Value */}
      <Typography
        sx={{
          fontSize: "30px",
          fontWeight: 800,
          color: "#fff",
          mb: "10px",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>

      {/* Change */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center", 
          backgroundColor: "rgba(34, 197, 94, 0.12)", 
          px: "6px", 
          py: "2px", 
          borderRadius: "6px" 
        }}>
          <Typography sx={{ color: "#22c55e", fontSize: "12px", fontWeight: 700 }}>
            {change}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StatCard;