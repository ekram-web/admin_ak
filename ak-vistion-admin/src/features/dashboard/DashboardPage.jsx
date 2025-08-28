import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, Box, CircularProgress, List, ListItem, ListItemText, Divider, Button, Fab, Menu, MenuItem, ListItemIcon, Avatar } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../../api/mockApi';

// Reusable Stat Card Component - Final Professional Design
const StatCard = ({ title, value, icon }) => (
  <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', color: '#fff', width: 48, height: 48 }}>
            {icon}
        </Avatar>
        <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
            <Typography color="text.secondary" variant="body2">{title}</Typography>
        </Box>
    </CardContent>
  </Card>
);

// --- THE FINAL, PROFESSIONAL DASHBOARD PAGE ---
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
    // --- THIS IS THE CORRECTED LINE ---
    mockApi.getDashboardStats().then(response => {
        setStats(response.data);
        setLoading(false);
    });
  }, []);

  if (loading) return <Box sx={{display: 'flex', justifyContent: 'center', mt: 4}}><CircularProgress /></Box>;

  return (
    <Box sx={{ backgroundColor: '#f9fafb', p: 0, m: -3, minHeight: 'calc(100vh - 64px)' }}>
      {/* --- Header --- */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Dashboard</Typography>
        <Typography color="text.secondary">Welcome to the AK-Vistion Admin Panel</Typography>
      </Box>

      {/* --- Stat Cards Section --- */}
      <Grid container spacing={3} sx={{px: 3}}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Products" value={stats.totalProducts} icon={<Inventory2OutlinedIcon />} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Blog Posts" value={stats.totalPosts} icon={<ArticleOutlinedIcon />} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Total Messages" value={stats.totalMessages} icon={<MessageOutlinedIcon />} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Unread Messages" value={stats.unreadMessages} icon={<EmailOutlinedIcon />} /></Grid>
      </Grid>
      
      {/* --- Main Content Grid --- */}
      <Grid container spacing={3} sx={{ p: 3 }}>
        {/* Left Column: Recent Sales Inquiries */}
        <Grid item xs={12} lg={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Recent Sales Inquiries</Typography>
                    <List sx={{ p: 0 }}>
                        {stats.recentSales.length > 0 ? stats.recentSales.map((inquiry, index) => (
                           <React.Fragment key={inquiry.id}>
                               <ListItem disablePadding>
                                   <ListItemText
                                       primaryTypographyProps={{ fontWeight: 'medium', noWrap: true }}
                                       secondaryTypographyProps={{ noWrap: true }}
                                       primary={inquiry.subject}
                                       secondary={`From: ${inquiry.name} - ${inquiry.date}`}
                                   />
                               </ListItem>
                               {index < stats.recentSales.length - 1 && <Divider />}
                           </React.Fragment>
                        )) : (
                            <Typography color="text.secondary" sx={{p: 2, textAlign: 'center'}}>No recent inquiries.</Typography>
                        )}
                    </List>
                     <Button size="small" sx={{mt: 2, fontWeight: 'bold'}} onClick={() => navigate('/content/sales')}>
                         View All Inquiries →
                     </Button>
                </CardContent>
            </Card>
        </Grid>
        
        {/* Right Column: Recent Blog Posts */}
        <Grid item xs={12} lg={6}>
            <Card variant="outlined" sx={{ borderRadius: 2, height: '100%' }}>
                 <CardContent>
                    <Typography variant="h6" gutterBottom>Recent Blog Posts</Typography>
                     <List sx={{ p: 0 }}>
                        {stats.recentBlogPosts.length > 0 ? stats.recentBlogPosts.map((post, index) => (
                            <React.Fragment key={post.id}>
                               <ListItem disablePadding>
                                   <ListItemText
                                       primaryTypographyProps={{ fontWeight: 'medium', noWrap: true }}
                                       secondaryTypographyProps={{ noWrap: true }}
                                       primary={post.title}
                                       secondary={`By: ${post.author} - ${post.date}`}
                                   />
                               </ListItem>
                               {index < stats.recentBlogPosts.length - 1 && <Divider />}
                            </React.Fragment>
                        )) : (
                            <Typography color="text.secondary" sx={{p: 2, textAlign: 'center'}}>No recent posts.</Typography>
                        )}
                    </List>
                     <Button size="small" sx={{mt: 2, fontWeight: 'bold'}} onClick={() => navigate('/pages/blog')}>
                         View All Posts →
                     </Button>
                 </CardContent>
            </Card>
        </Grid>
      </Grid>
      
      {/* --- Floating Action Button & Menu --- */}
      <Fab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32 }} onClick={handleFabClick}>
          <AddIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={fabOpen}
        onClose={handleFabClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        elevation={4}
      >
          <MenuItem onClick={() => handleFabAction('/products/cameras')}>
              <ListItemIcon><Inventory2OutlinedIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Add Product</ListItemText>
          </MenuItem>
           <MenuItem onClick={() => handleFabAction('/pages/blog')}>
              <ListItemIcon><ArticleOutlinedIcon fontSize="small" /></ListItemIcon>
              <ListItemText>Add Blog Post</ListItemText>
          </MenuItem>
      </Menu>
    </Box>
  );
};

export default DashboardPage;