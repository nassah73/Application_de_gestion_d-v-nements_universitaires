import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatCard = ({ title, value, change, icon, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        borderRadius: "16px",
        padding: "20px 24px",
        width: "250px",
        minWidth: "250px",
        flexShrink: 0,
        border: `1px solid ${
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.08)"
        }`,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
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
            color: colors.grey[300],
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            backgroundColor: color,
            borderRadius: "12px",
            width: "44px",
            height: "44px",
            minWidth: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
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
          fontWeight: 700,
          color: colors.grey[100],
          mb: "10px",
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>

      {/* Change */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <Typography sx={{ color: "#22c55e", fontSize: "16px", lineHeight: 1 }}>
          ↗
        </Typography>
        <Typography sx={{ color: "#22c55e", fontSize: "13px", fontWeight: 500 }}>
          {change}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatCard;