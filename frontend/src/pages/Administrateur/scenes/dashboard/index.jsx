import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import StatCard from "../../components/StatCard";
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
  { month: "Jan", attendance: 2450 },
  { month: "Feb", attendance: 3200 },
  { month: "Mar", attendance: 2750 },
  { month: "Apr", attendance: 4100 },
  { month: "May", attendance: 3800 },
  { month: "Jun", attendance: 4500 },
  { month: "Jul", attendance: 5250 },
  { month: "Aug", attendance: 4800 },
  { month: "Sep", attendance: 5900 },
  { month: "Oct", attendance: 6300 },
  { month: "Nov", attendance: 5950 },
  { month: "Dec", attendance: 6550 },
];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[500],
        minHeight: "100vh",
        p: "30px",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: "30px" }}>
        <Box
          component="h1"
          sx={{
            fontSize: "28px",
            fontWeight: 700,
            color: colors.grey[100],
            m: 0,
            mb: "4px",
          }}
        >
          Global Statistics
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: "14px",
            color: colors.grey[400],
            m: 0,
          }}
        >
          Overview of your university events platform
        </Box>
      </Box>

      {/* Stat Cards Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "20px",
          mb: "30px",
          
          
        }}
      >
        <StatCard
          title="Total Users"
          value="12,458"
          change="+12.5% vs last month"
          icon={<PeopleIcon />}
          color="#3b82f6"
        />
        <StatCard
          title="Pending Organizers"
          value="23"
          change="+3 vs last month"
          icon={<PersonAddIcon />}
          color="#f59e0b"
        />
        <StatCard
          title="Live Events"
          value="847"
          change="+127 vs last month"
          icon={<EventIcon />}
          color="#22c55e"
        />
        <StatCard
          title="Monthly Revenue"
          value="$48,329"
          change="+8.2% vs last month"
          icon={<AttachMoneyIcon />}
          color="#a855f7"
        />
      </Box>

      {/* Attendance Chart */}
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          borderRadius: "12px",
          border: `1px solid ${colors.primary[300]}`,
          p: "24px",
        }}
      >
        {/* Chart Header */}
        <Box sx={{ mb: "20px" }}>
          <Box
            component="h2"
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: colors.grey[100],
              m: 0,
              mb: "4px",
            }}
          >
            Event Attendance Trends
          </Box>
          <Box
            component="p"
            sx={{
              fontSize: "13px",
              color: colors.grey[400],
              m: 0,
            }}
          >
            Total event attendance over the past 12 months
          </Box>
        </Box>

        {/* Recharts Line Chart */}
        <Box sx={{ width: "100%", height: 380 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={attendanceData}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                stroke={
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.08)"
                }
                vertical={true}
                horizontal={true}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: colors.grey[400],
                  fontSize: 12,
                }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: colors.grey[400],
                  fontSize: 12,
                }}
                tickFormatter={(v) =>
                  v === 0 ? "0" : `${(v / 1000).toFixed(0)}000`
                }
                domain={[0, 8000]}
                ticks={[0, 2000, 4000, 6000, 8000]}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e2a3a" : "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  color: colors.grey[100],
                  fontSize: "13px",
                }}
                labelStyle={{ fontWeight: 600 }}
                formatter={(value) => [
                  value.toLocaleString(),
                  "Attendees",
                ]}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#1e3a6e"
                strokeWidth={2.5}
                dot={(props) => {
                  const { cx, cy } = props;
                  return (
                    <circle
                      key={`dot-${cx}-${cy}`}
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="#1e3a6e"
                      stroke="#fff"
                      strokeWidth={1.5}
                    />
                  );
                }}
                activeDot={{ r: 6, fill: "#1e3a6e", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;