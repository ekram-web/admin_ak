import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Button,
  Fab,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../../api/mockApi";

// --- THIS IS THE CRITICAL FIX ---
// Import all necessary icons from @mui/icons-material
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EmailIcon from "@mui/icons-material/Email";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArticleIcon from "@mui/icons-material/Article";
import PagesIcon from "@mui/icons-material/Pages";
import MessageIcon from "@mui/icons-material/Message";
// ---------------------------------

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Redesigned High-Standard Stat Card
const StatCard = ({ title, value, icon, color, bgColor }) => (
  <Card
    elevation={0}
    sx={{
      backgroundColor: bgColor,
      borderRadius: 2,
      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 8px 25px -5px ${color}55`, // A softer glow effect
      },
    }}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Avatar
          sx={{ bgcolor: color, color: "#fff", mr: 2, width: 48, height: 48 }}
        >
          {icon}
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {value}
        </Typography>
      </Box>
      <Typography color="text.secondary">{title}</Typography>
    </CardContent>
  </Card>
);

// --- THE NEW HIGH-STANDARD DASHBOARD PAGE ---
const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const fabOpen = Boolean(anchorEl);
  const handleFabClick = (event) => setAnchorEl(event.currentTarget);
  const handleFabClose = () => setAnchorEl(null);
  const handleFabAction = (path) => {
    navigate(path);
    handleFabClose();
  };

  useEffect(() => {
    mockApi.getDashboardStats().then((response) => {
      setStats(response.data);
      setLoading(false);
    });
  }, []);

  // Chart.js configuration
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "rgba(255, 255, 255, 0.1)" } },
      x: { grid: { color: "rgba(255, 255, 255, 0.1)" } },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Inquiries",
        data: [2, 5, 3, 6, 4, 8, 5],
        fill: true,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "rgba(174, 63, 61, 0.5)");
          gradient.addColorStop(1, "rgba(174, 63, 61, 0)");
          return gradient;
        },
        borderColor: "#ae3f3d",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#ae3f3d",
        pointHoverBackgroundColor: "#ae3f3d",
        pointHoverBorderColor: "#fff",
        tension: 0.4,
      },
    ],
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (!stats) return <Typography>Error loading stats.</Typography>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Command Center
          </Typography>
          <Typography color="text.secondary">Welcome back, Admin!</Typography>
        </Box>
      </Box>

      {/* --- Stat Cards Section --- */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Inventory2Icon />}
            color="#ae3f3d"
            bgColor="#fbe9e7"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Blog Posts"
            value={stats.totalPosts}
            icon={<ArticleIcon />}
            color="#5e35b1"
            bgColor="#ede7f6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Unread Messages"
            value={stats.unreadMessages}
            icon={<EmailIcon />}
            color="#039be5"
            bgColor="#e1f5fe"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Subscribers"
            value={stats.totalSubscriptions}
            icon={<PeopleIcon />}
            color="#00897b"
            bgColor="#e0f2f1"
          />
        </Grid>
      </Grid>

      {/* --- Main Content Grid --- */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} lg={7}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              height: "100%",
              border: "1px solid #e0e0e0",
              p: 1,
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUpIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="h6">
                  Inquiry Trends (Last -7- Days)
                </Typography>
              </Box>
              <Box sx={{ height: 350 }}>
                <Line options={chartOptions} data={chartData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: 4,
              height: "100%",
              border: "1px solid #e0e0e0",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List sx={{ p: 0 }}>
                {stats.recentSales.map((inquiry, index) => (
                  <ListItem key={`sale-${index}`} disablePadding>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "secondary.main" }}>
                        <EmailIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="New Sales Inquiry"
                      secondary={`From: ${inquiry.name}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* --- Floating Action Button & Menu --- */}
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        onClick={handleFabClick}
      >
        <AddIcon />
      </Fab>
      <Menu anchorEl={anchorEl} open={fabOpen} onClose={handleFabClose}>
        <MenuItem onClick={() => handleFabAction("/products/cameras")}>
          <ListItemIcon>
            <Inventory2Icon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Product</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleFabAction("/pages/blog")}>
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>New Blog Post</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DashboardPage;
