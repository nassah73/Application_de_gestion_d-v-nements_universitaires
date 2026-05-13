import { Box, useTheme, Typography, Button } from "@mui/material";
import { tokens } from "../theme";
import StatCard from "../components/StatCard";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RuleIcon from "@mui/icons-material/Rule";
import SettingsIcon from "@mui/icons-material/Settings";
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

const recentActivities = [
  { id: 1, user: "Ahmed Alaoui", action: "Nouveau compte étudiant créé", time: "Il y a 2 min" },
  { id: 2, user: "Bureau des Sports", action: "Événement 'Tournoi de Foot' publié", time: "Il y a 15 min" },
  { id: 3, user: "Sanaa Bennani", action: "Paramètres système mis à jour", time: "Il y a 1h" },
  { id: 4, user: "Club Info", action: "Nouvel organisateur en attente de validation", time: "Il y a 3h" },
];

const eventDistributionData = [
  { name: "Sports", value: 400 },
  { name: "Culture", value: 300 },
  { name: "Éducation", value: 300 },
  { name: "Social", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
        {/*<Button
          sx={{
            backgroundColor: colors.greenAccent[500],
            color: "#fff",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: colors.greenAccent[600],
            },
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Télécharger Rapports
        </Button>*/}
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
        <StatCard title="Total Étudiants" value="4,258" change="+12% ce mois" icon={<PeopleIcon sx={{ fontSize: "24px" }} />} color={colors.blueAccent[500]} />
        <StatCard title="Organisateurs" value="12" change="+3 nouveaux" icon={<PersonAddIcon sx={{ fontSize: "24px" }} />} color={colors.greenAccent[500]} />
        <StatCard title="Événements" value="45" change="+8 cette semaine" icon={<EventIcon sx={{ fontSize: "24px" }} />} color={colors.redAccent[500]} />
        <StatCard title="Taux d'engagement" value="85%" change="+5.4% vs 2023" icon={<AssessmentIcon sx={{ fontSize: "24px" }} />} color={colors.blueAccent[400]} />
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ mt: "10px" }}>
            {eventDistributionData.map((entry, index) => (
              <Box key={entry.name} sx={{ display: "flex", alignItems: "center", mb: "5px" }}>
                <Box sx={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: COLORS[index], mr: "10px" }} />
                <Typography sx={{ color: colors.grey[100], fontSize: "12px" }}>{entry.name}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Second Row Grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: "20px" }}>
        {/* Recent Activity List */}
        <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "20px", border: `1px solid ${colors.grey[800]}`, p: "24px", display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: colors.grey[100], mb: "20px" }}>Activités Récentes</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {recentActivities.map((activity) => (
              <Box key={activity.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: "15px", borderBottom: `1px solid ${colors.grey[800]}`, "&:last-child": { borderBottom: "none" } }}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: colors.greenAccent[500] }}>{activity.user}</Typography>
                  <Typography variant="h6" sx={{ color: colors.grey[100] }}>{activity.action}</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: colors.grey[400], fontStyle: "italic" }}>{activity.time}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderRadius: "20px", border: `1px solid ${colors.grey[800]}`, p: "24px", display: "flex", flexDirection: "column" }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: colors.grey[100], mb: "20px" }}>Actions Rapides</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" }}>
            {[
              { label: "Ajouter un Événement", icon: <AddBoxIcon />, color: colors.greenAccent[500] },
              { label: "Valider Organisateurs", icon: <RuleIcon />, color: colors.blueAccent[500] },
              { label: "Paramètres Système", icon: <SettingsIcon />, color: colors.grey[400] },
              { label: "Générer Rapport", icon: <AssessmentIcon />, color: colors.greenAccent[400] },
            ].map((action) => (
              <Button key={action.label} variant="outlined" sx={{ display: "flex", flexDirection: "column", gap: "10px", p: "20px", borderRadius: "15px", borderColor: "rgba(255, 255, 255, 0.1)", color: colors.grey[100], "&:hover": { borderColor: action.color, backgroundColor: "rgba(255, 255, 255, 0.05)" } }}>
                <Box sx={{ color: action.color }}>{action.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>{action.label}</Typography>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;