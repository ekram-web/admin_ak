import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, CircularProgress, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Button, Fab, Menu, MenuItem, ListItemIcon } from '@mui/material';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import MessageIcon from '@mui/icons-material/Message';
import AddIcon from '@mui/icons-material/Add';
import PagesIcon from '@mui/icons-material/Pages';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../../api/mockApi';

// Reusable Stat Card Component - New Minimalist Design
const StatCard = ({ title, value, icon }) => (
  <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}>{icon}</Avatar>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{value}</Typography>
        <Typography color="text.secondary">{title}</Typography>
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

  const handleFabClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleFabClose = () => { setAnchorEl(null); };
  
  const handleFabAction = (path) => {
      navigate(path);
      handleFabClose();
  }

  useEffect(() => {
    mockApi.getDashboardStats().then(response => {
        setStats(response.data);
        setLoading(false);
    });
  }, []);

  if (loading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;

  return (
    <Box>
      {/* --- Header --- */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Dashboard</Typography>
        <Typography color="text.secondary">Welcome to the AK-Vistion Admin Panel</Typography>
      </Box>

      {/* --- Stat Cards Section --- */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Products" value={stats.totalProducts} icon={<Inventory2Icon />} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Blog Posts" value={stats.totalPosts} icon={<ArticleIcon />} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Messages" value={stats.totalMessages} icon={<MessageIcon />} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Unread Messages" value={stats.unreadMessages} icon={<EmailIcon />} /></Grid>
      </Grid>
      
      {/* --- Main Content Grid --- */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Left Column: Recent Sales Inquiries */}
        <Grid item xs={12} lg={6}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Recent Sales Inquiries</Typography>
                    <List sx={{ p: 0 }}>
                        {stats.recentSales.map((inquiry) => (
                           <ListItem key={inquiry.id} disablePadding>
                               <ListItemText
                                   primary={inquiry.subject}
                                   secondary={`From: ${inquiry.name} - ${inquiry.date}`}
                                   primaryTypographyProps={{ fontWeight: inquiry.read ? 'normal' : 'bold' }}
                               />
                           </ListItem>
                        ))}
                    </List>
                     <Button size="small" sx={{mt: 2}} onClick={() => navigate('/content/sales')}>View all inquiries →</Button>
                </CardContent>
            </Card>
        </Grid>
        
        {/* Right Column: Recent Blog Posts */}
        <Grid item xs={12} lg={6}>
            <Card variant="outlined" sx={{ borderRadius: 2 }}>
                 <CardContent>
                    <Typography variant="h6" gutterBottom>Recent Blog Posts</Typography>
                     <List sx={{ p: 0 }}>
                        {stats.recentBlogPosts.map((post) => (
                           <ListItem key={post.id} disablePadding>
                               <ListItemText
                                   primary={post.title}
                                   secondary={`By: ${post.author} - ${post.date}`}
                               />
                           </ListItem>
                        ))}
                    </List>
                     <Button size="small" sx={{mt: 2}} onClick={() => navigate('/pages/blog')}>View all posts →</Button>
                 </CardContent>
            </Card>
        </Grid>
      </Grid>
      
      {/* --- Floating Action Button & Menu --- */}
      <Fab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32 }} onClick={handleFabClick}>
          <AddIcon />
      </Fab>
      <Menu anchorEl={anchorEl} open={fabOpen} onClose={handleFabClose}>
          <MenuItem onClick={() => handleFabAction('/products/cameras')}>
              <ListItemIcon><Inventory2Icon fontSize="small" /></ListItemIcon>
              <ListItemText>Add Product</ListItemText>
          </MenuItem>
           <MenuItem onClick={() => handleFabAction('/pages/blog')}>
              <ListItemIcon><ArticleIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Add Blog Post</ListItemText>
          </MenuItem>
           <MenuItem onClick={() => handleFabAction('/pages/home')}>
              <ListItemIcon><PagesIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Edit Homepage</ListItemText>
          </MenuItem>
      </Menu>

    </Box>
  );
};

export default DashboardPage;