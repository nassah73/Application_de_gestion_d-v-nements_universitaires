import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import ProgressCircle from "../../components/ProgressCircle";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import StatCard from "../../components/StatCard";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box sx={{
      backgroundColor: colors.primary[500],
      minHeight: "100vh",
      pl: "30px",
    }}>
      
      <h1>Global Statistics</h1>
      <Box sx={{pl: "20px", pb: "20px"}}><h9>asdfghjkjhgfddfghj</h9></Box>
      
      
      
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

      

    </Box>
  );
};

export default Dashboard;