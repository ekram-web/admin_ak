import React, { useState, useEffect } from "react";
import { Typography, Grid, Card, CardContent, Box } from "@mui/material"; // <-- THE FIX IS HERE
import { mockApi } from "../../api/mockApi";

const StatCard = ({ title, value, icon }) => (
  <Card elevation={3}>
    <CardContent>
      <Typography color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    mockApi.getDashboardStats().then((response) => setStats(response.data));
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Products"
            value={stats?.totalProducts ?? "..."}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="New Inquiries"
            value={stats?.newInquiries ?? "..."}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard title="Monthly Sales" value={`$${stats?.sales ?? "..."}`} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
