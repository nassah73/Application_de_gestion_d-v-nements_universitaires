import { Box, useTheme, Typography, Button, CircularProgress } from "@mui/material";
import { tokens } from "../theme";
import StatCard from "../components/StatCard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const API_BASE_URL = "http://localhost:5000";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/analytics/admin-stats`);
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: "24px", minHeight: "100%", backgroundColor: colors.primary[500], display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const attendanceData = stats?.monthlyActivity?.map(item => ({
    month: item.name,
    attendance: item.engagement
  })) || [];

  const eventDistributionData = stats?.categoryStats || [];

  return (
    <Box sx={{ p: "24px", minHeight: "100%", backgroundColor: colors.primary[500] }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "30px" }}>
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              color: colors.grey[100],
              mb: "8px",
              letterSpacing: "-1px",
            }}
          >
            Tableau de Bord
          </Typography>
          <Typography variant="h5" sx={{ color: colors.grey[400] }}>
            Bienvenue sur votre espace d'administration centralisé
          </Typography>
        </Box>
      </Box>

      {/* Stat Cards Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: "20px",
          mb: "25px",
        }}
      >
        <StatCard title="Total Étudiants" value={stats?.activeStudents || 0} change="" icon={<PeopleIcon sx={{ fontSize: "24px" }} />} color={colors.blueAccent[500]} />
        <StatCard title="Organisateurs" value={stats?.totalOrganizers || 0} change="" icon={<PersonAddIcon sx={{ fontSize: "24px" }} />} color={colors.greenAccent[500]} />
        <StatCard title="Événements" value={stats?.totalEvents || 0} change="" icon={<EventIcon sx={{ fontSize: "24px" }} />} color={colors.redAccent[500]} />
        <StatCard title="Événements en attente" value={stats?.pendingEvents || 0} change="" icon={<AssessmentIcon sx={{ fontSize: "24px" }} />} color={colors.blueAccent[400]} />
      </Box>

      {/* Main Content Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" }, gap: "20px", mb: "25px" }}>
        {/* Attendance Chart */}
        <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "20px", border: `1px solid ${colors.grey[800]}`, p: "24px", backdropFilter: "blur(10px)", minHeight: "400px", display: "flex", flexDirection: "column" }}>
          <Box sx={{ mb: "25px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 800, color: colors.grey[100], mb: "4px" }}>Tendances de Participation</Typography>
              <Typography variant="h6" sx={{ color: colors.grey[400] }}>Évolution mensuelle des inscriptions</Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[800]} vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: colors.grey[400], fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: colors.grey[400], fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: colors.primary[400], border: `1px solid ${colors.grey[700]}`, borderRadius: "12px" }} />
                <Line type="monotone" dataKey="attendance" stroke={colors.greenAccent[500]} strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Event Distribution (Pie Chart) */}
        <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "20px", border: `1px solid ${colors.grey[800]}`, p: "24px", display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: colors.grey[100], mb: "20px" }}>Catégories d'Événements</Typography>
          <Box sx={{ width: "100%", height: "300px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={eventDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {eventDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ mt: "10px" }}>
            {eventDistributionData.map((entry, index) => (
              <Box key={entry.name} sx={{ display: "flex", alignItems: "center", mb: "5px" }}>
                <Box sx={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: entry.color || COLORS[index % COLORS.length], mr: "10px" }} />
                <Typography sx={{ color: colors.grey[100], fontSize: "12px" }}>{entry.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>       
    </Box>
  );
};

export default Dashboard;