import React from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const ContentPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Page Content
      </Typography>

      <Grid container spacing={3}>
        {/* About Page Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                About Us Page
              </Typography>
              <TextField
                label="Main Title"
                fullWidth
                sx={{ mb: 2 }}
                defaultValue="Creating Inspiring Security Solutions"
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                sx={{ mb: 2 }}
                defaultValue="AK VISTION is a term used to refer to an organized collection of technology..."
              />
              <Button variant="contained">Save About Page</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Service Page Section */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Services Page
              </Typography>
              <TextField
                label="Main Title"
                fullWidth
                sx={{ mb: 2 }}
                defaultValue="Our Services"
              />
              <TextField
                label="Subtitle"
                fullWidth
                sx={{ mb: 2 }}
                defaultValue="We provide top-tier electronic equipment and expert installation..."
              />
              <Button variant="contained">Save Services Page</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContentPage;

