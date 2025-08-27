import React from "react";
import InboxLayout from "./components/InboxLayout";
import { Box, Typography, Divider, Grid } from "@mui/material";

// Detail component specific to Sales inquiries
const SalesDetail = ({ data }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
      {data.productInterest
        ? `Inquiry: ${data.productInterest}`
        : "General Sales Inquiry"}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      From: {data.name} &lt;{data.email}&gt;
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Received: {data.date}
    </Typography>
    <Divider sx={{ my: 2 }} />
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <strong>Company:</strong> {data.company || "N/A"}
      </Grid>
      <Grid item xs={12} sm={6}>
        <strong>Phone:</strong> {data.phone || "N/A"}
      </Grid>
    </Grid>
    <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
      Message:
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
      {data.message}
    </Typography>
  </Box>
);

const ContentSalesAdmin = () => {
  return (
    <InboxLayout
      pageTitle="Sales Inquiries"
      dataKey="sales"
      DetailComponent={SalesDetail}
    />
  );
};

export default ContentSalesAdmin;
