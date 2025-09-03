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
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../../api/mockApi";

// Icons for a professional look
import Inventory2Icon from "@mui/icons-material/Inventory2";
import EmailIcon from "@mui/icons-material/Email";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

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
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Redesigned High-Standard Stat Card
const StatCard = ({ title, value, icon, color }) => (
  <Card
    elevation={0}
    sx={{
      border: "1px solid #e0e0e0",
      borderRadius: 2,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 20px -5px rgba(0,0,0,0.1)",
        transform: "translateY(-5px)",
      },
    }}
  >
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          sx={{ bgcolor: color, color: "#fff", width: 48, height: 48, mr: 2 }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {value}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {title}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// --- THE NEW HIGH-STANDARD DASHBOARD PAGE ---
const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // State for the Floating Action Button menu
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
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Inquiries",
        data: [2, 5, 3, 6, 4, 8, 5], // Example static data
        borderColor: "#ae3f3d",
        backgroundColor: "rgba(174, 63, 61, 0.1)",
        fill: true,
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
      {/* --- Header --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Welcome back, Admin!
          </Typography>
          <Typography color="text.secondary">
            Here’s a snapshot of your website's performance.
          </Typography>
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
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Blog Posts"
            value={stats.totalPosts}
            icon={<ArticleIcon />}
            color="#5e35b1"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Subscribers"
            value={stats.totalSubscriptions}
            icon={<PeopleIcon />}
            color="#039be5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Unread Messages"
            value={stats.unreadMessages}
            icon={<EmailIcon />}
            color="#fdd835"
          />
        </Grid>
      </Grid>

      {/* --- Main Content Grid --- */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Left Column: Data Chart */}
        <Grid item xs={12} lg={7}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <TrendingUpIcon sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="h6">Recent Inquiries</Typography>
              </Box>
              <Box sx={{ height: 350 }}>
                <Line options={chartOptions} data={chartData} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column: Recent Activity Feed */}
        <Grid item xs={12} lg={5}>
          <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List sx={{ p: 0 }}>
                {stats.recentSales.map((inquiry, index) => (
                  <ListItem
                    key={`sale-${index}`}
                    button
                    onClick={() => navigate("/content/sales")}
                    disableGutters
                  >
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
                <ListItem
                  button
                  onClick={() => navigate("/products/cameras")}
                  disableGutters
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "primary.main" }}>
                      <Inventory2Icon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="New Product Added"
                    secondary="Analog Bullet Camera"
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => navigate("/content/subscriptions")}
                  disableGutters
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "info.main" }}>
                      <PeopleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="New Subscriber"
                    secondary="charlie@example.com"
                  />
                </ListItem>
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
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <Menu anchorEl={anchorEl} open={fabOpen} onClose={handleFabClose}>
        <MenuItem onClick={() => handleFabAction("/products/cameras")}>
          <ListItemIcon>
            <Inventory2Icon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add New Product</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleFabAction("/pages/blog")}>
          <ListItemIcon>
            <ArticleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Create New Post</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DashboardPage;
