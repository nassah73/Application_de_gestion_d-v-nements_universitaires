import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import StatCard from "../components/StatCard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Dot,
} from "recharts";

const attendanceData = [
  { month: "Jan", attendance: 245 },
  { month: "Fév", attendance: 320 },
  { month: "Mar", attendance: 275 },
  { month: "Avr", attendance: 410 },
  { month: "Mai", attendance: 380 },
  { month: "Juin", attendance: 450 },
  { month: "Juil", attendance: 525 },
  { month: "Août", attendance: 480 },
  { month: "Sep", attendance: 590 },
  { month: "Oct", attendance: 630 },
  { month: "Nov", attendance: 595 },
  { month: "Déc", attendance: 655 },
];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: "#0f172a", // slate-900
        p: "24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}
    >
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
          Statistiques Globales
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.45)",
            m: 0,
            mb: "30px",
          }}
        >
          Aperçu complet de la plateforme événementielle universitaire
        </Box>

      {/* Stat Cards Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "16px",
          mb: "20px",
          flexShrink: 0
        }}
      >
        <StatCard
          title="Total Étudiants"
          value="4,258"
          change="+12% ce mois"
          icon={<PeopleIcon sx={{ fontSize: "24px" }} />}
        />
        <StatCard
          title="Organisateurs en attente"
          value="12"
          change="+3 nouveaux"
          icon={<PersonAddIcon sx={{ fontSize: "24px" }} />}
        />
        <StatCard
          title="Événements Actifs"
          value="45"
          change="+8 cette semaine"
          icon={<EventIcon sx={{ fontSize: "24px" }} />}
        />
        <StatCard
          title="Engagement Moyen"
          value="85%"
          change="+5.4% vs l'an dernier"
          icon={<AttachMoneyIcon sx={{ fontSize: "24px" }} />}
        />
      </Box>

      {/* Attendance Chart */}
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderRadius: "20px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          p: "24px",
          backdropFilter: "blur(10px)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0 // Importante para flex-shrink y overflow en flexbox
        }}
      >
        {/* Chart Header */}
        <Box sx={{ mb: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
          <Box>
            <Box
              component="h2"
              sx={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#fff",
                m: 0,
                mb: "4px",
              }}
            >
              Tendances de Participation
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.45)",
                m: 0,
              }}
            >
              Évolution du nombre de participants sur les 12 derniers mois
            </Box>
          </Box>
          
          <Box sx={{ 
            backgroundColor: "rgba(205, 115, 41, 0.15)", 
            px: "12px", 
            py: "4px", 
            borderRadius: "100px",
            border: "1px solid rgba(205, 115, 41, 0.3)"
          }}>
            <Typography sx={{ color: "#cd7329", fontSize: "11px", fontWeight: 700 }}>
              Mise à jour en temps réel
            </Typography>
          </Box>
        </Box>

        {/* Recharts Line Chart */}
        <Box sx={{ width: "100%", flex: 1, minWidth: 0, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={attendanceData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#cd7329" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#cd7329" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255, 255, 255, 0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255, 255, 255, 0.3)", fontSize: 11 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "rgba(255, 255, 255, 0.3)", fontSize: 11 }}
                tickFormatter={(v) => v}
                domain={[0, 800]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  color: "#fff",
                }}
                itemStyle={{ color: "#cd7329", fontWeight: 700 }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#cd7329"
                strokeWidth={3}
                dot={{ r: 3, fill: "#cd7329", strokeWidth: 2, stroke: "#0f172a" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;