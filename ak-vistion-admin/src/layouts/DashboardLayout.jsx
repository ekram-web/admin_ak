import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  AppBar,
  Box,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PagesIcon from "@mui/icons-material/Pages";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import EmailIcon from "@mui/icons-material/Email";
import GavelIcon from "@mui/icons-material/Gavel";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 280;

const DashboardLayout = (props) => {
  const { window } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // State for each dropdown menu
  const [pagesOpen, setPagesOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [howtoOpen, setHowtoOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <div>
      <Toolbar />
      <List component="nav">
        {/* --- Dashboard --- */}
        <ListItemButton
          onClick={() => navigate("/dashboard")}
          selected={location.pathname === "/dashboard"}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* --- Pages Dropdown --- */}
        <ListItemButton onClick={() => setPagesOpen(!pagesOpen)}>
          <ListItemIcon>
            <PagesIcon />
          </ListItemIcon>
          <ListItemText primary="Pages" />
          {pagesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={pagesOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/pages/home")}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/pages/about")}
            >
              <ListItemText primary="About" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/pages/services")}
            >
              <ListItemText primary="Service" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/pages/blog")}
            >
              <ListItemText primary="Blog" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/pages/faq")}
            >
              <ListItemText primary="FAQ Page" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/pages/footer-contact")}
            >
              <ListItemText primary="Footer Contact" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* --- Product Dropdown --- */}
        <ListItemButton onClick={() => setProductOpen(!productOpen)}>
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="Product" />
          {productOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={productOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/products/cameras")}
            >
              <ListItemText primary="Cameras" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/products/recorders")}
            >
              <ListItemText primary="Recorders" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/products/switches")}
            >
              <ListItemText primary="Switches" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/products/systems")}
            >
              <ListItemText primary="Systems" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* --- Support Dropdown (Nested) --- */}
        <ListItemButton onClick={() => setSupportOpen(!supportOpen)}>
          <ListItemIcon>
            <SupportAgentIcon />
          </ListItemIcon>
          <ListItemText primary="Support" />
          {supportOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={supportOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setDownloadOpen(!downloadOpen)}
            >
              <ListItemText primary="Download" />
              {downloadOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={downloadOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 6 }}
                  onClick={() => navigate("/support/downloads/firmware")}
                >
                  <ListItemText primary="Firmware" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 6 }}
                  onClick={() => navigate("/support/downloads/sdk")}
                >
                  <ListItemText primary="SDK" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 6 }}
                  onClick={() => navigate("/support/downloads/software")}
                >
                  <ListItemText primary="Software" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => setHowtoOpen(!howtoOpen)}
            >
              <ListItemText primary="How-To" />
              {howtoOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={howtoOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 6 }}
                  onClick={() => navigate("/support/howto/guides")}
                >
                  <ListItemText primary="Guides" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 6 }}
                  onClick={() => navigate("/support/howto/videos")}
                >
                  <ListItemText primary="Videos" />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Collapse>

        {/* --- Content Dropdown --- */}
        <ListItemButton onClick={() => setContentOpen(!contentOpen)}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Content" />
          {contentOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={contentOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/content/sales")}
            >
              <ListItemText primary="Sales Messages" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/content/technical")}
            >
              <ListItemText primary="Technical Messages" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/content/subscriptions")}
            >
              <ListItemText primary="Subscriptions" />
            </ListItemButton>
          </List>
        </Collapse>

        {/* --- Legal Dropdown --- */}
        <ListItemButton onClick={() => setLegalOpen(!legalOpen)}>
          <ListItemIcon>
            <GavelIcon />
          </ListItemIcon>
          <ListItemText primary="Legal" />
          {legalOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={legalOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/legal/privacy-policy")}
            >
              <ListItemText primary="Privacy Policy" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/legal/terms-of-use")}
            >
              <ListItemText primary="Terms of Use" />
            </ListItemButton>
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => navigate("/legal/cookie-policy")}
            >
              <ListItemText primary="Cookie Policy" />
            </ListItemButton>
          </List>
        </Collapse>

        <Divider sx={{ my: 1 }} />
        {/* --- Logout --- */}
        <ListItemButton
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AK-Vistion Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
