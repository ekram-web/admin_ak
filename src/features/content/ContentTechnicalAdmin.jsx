import React from "react";
import InboxLayout from "./components/InboxLayout";
import { Box, Typography, Divider, Grid } from "@mui/material";

// Detail component for Technical inquiries
const TechnicalDetail = ({ data, createdAt }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Technical Support Ticket
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      From: {data.name} &lt;{data.email}&gt;
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Received: {new Date(createdAt).toLocaleString()}
    </Typography>
    <Divider sx={{ my: 2 }} />
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <strong>Phone:</strong> {data.phone || "N/A"}
      </Grid>
      <Grid item xs={12} sm={6}>
        <strong>Issue Type:</strong> {data.issueType}
      </Grid>
      <Grid item xs={12} sm={6}>
        <strong>Product Model:</strong> {data.productModel}
      </Grid>
      <Grid item xs={12} sm={6}>
        <strong>Serial Number:</strong> {data.serialNumber || "N/A"}
      </Grid>
    </Grid>
    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
      Issue Description:
    </Typography>
    <Typography
      paragraph
      sx={{
        whiteSpace: "pre-wrap",
        bgcolor: "grey.100",
        p: 2,
        borderRadius: 1,
      }}
    >
      {data.description}
    </Typography>
  </Box>
);

const ContentTechnicalAdmin = () => {
  return (
    <InboxLayout
      pageTitle="Technical Inquiries"
      itemType="Technical Ticket"
      dataKey="Technical" // MUST match the 'type' string
      DetailComponent={TechnicalDetail}
    />
  );
};

export default ContentTechnicalAdmin;
