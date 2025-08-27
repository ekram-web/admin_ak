import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Chip,
} from "@mui/material";
import { mockApi } from "../../api/mockApi";

const InquiriesPage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  useEffect(() => {
    mockApi.getInquiries().then((response) => {
      setInquiries(response.data);
      if (response.data.length > 0) {
        setSelectedInquiry(response.data[0]);
      }
    });
  }, []);

  const handleSelectInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    // In a real app, you'd also mark it as 'read'
  };

  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", height: "calc(100vh - 112px)" }}
    >
      {/* Inquiry List */}
      <Box sx={{ width: "320px", borderRight: 1, borderColor: "divider" }}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Inquiries Inbox</Typography>
        </Box>
        <Divider />
        <List component="nav">
          {inquiries.map((inquiry) => (
            <ListItemButton
              key={inquiry.id}
              selected={selectedInquiry?.id === inquiry.id}
              onClick={() => handleSelectInquiry(inquiry)}
            >
              <ListItemText
                primary={inquiry.name}
                secondary={inquiry.subject}
                primaryTypographyProps={{
                  fontWeight: inquiry.read ? "normal" : "bold",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Inquiry Details */}
      <Box sx={{ flexGrow: 1, p: 3 }}>
        {selectedInquiry ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5">{selectedInquiry.subject}</Typography>
              <Chip
                label={selectedInquiry.type}
                color="primary"
                variant="outlined"
              />
            </Box>
            <Typography variant="subtitle1" color="text.secondary">
              From: {selectedInquiry.name} ({selectedInquiry.email})
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Received: {selectedInquiry.date}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography paragraph>
              This is where the full message content from the form submission
              would appear. For now, this is just a placeholder.
            </Typography>
          </>
        ) : (
          <Typography>Select an inquiry to read.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default InquiriesPage;
