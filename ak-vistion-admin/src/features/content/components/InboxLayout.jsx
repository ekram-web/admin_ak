import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  CircularProgress,
  Chip,
} from "@mui/material";

const InboxLayout = ({ pageTitle, itemType, dataKey, DetailComponent }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch the specific data
    // For now, we just log the dataKey to show it's working
    console.log(`Fetching data for: ${dataKey}`);
    // Mock data for display
    const mockData = {
      sales: [
        {
          id: 1,
          name: "Bob Johnson",
          subject: "Quote for cameras",
          read: false,
        },
      ],
      technical: [
        { id: 1, name: "Alice Williams", subject: "NVR Issue", read: true },
      ],
      subscriptions: [
        { id: 1, name: "Charlie Brown", subject: "New Subscriber" },
      ],
    };
    setItems(mockData[dataKey] || []);
    setSelectedItem(mockData[dataKey]?.[0] || null);
    setLoading(false);
  }, [dataKey]);

  if (loading) return <CircularProgress />;

  return (
    <Paper
      elevation={3}
      sx={{ display: "flex", height: "calc(100vh - 112px)" }}
    >
      <Box
        sx={{
          width: "320px",
          borderRight: 1,
          borderColor: "divider",
          overflowY: "auto",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">{pageTitle}</Typography>
        </Box>
        <Divider />
        <List component="nav">
          {items.map((item) => (
            <ListItemButton
              key={item.id}
              selected={selectedItem?.id === item.id}
              onClick={() => setSelectedItem(item)}
            >
              <ListItemText
                primary={item.name}
                secondary={item.subject}
                primaryTypographyProps={{
                  fontWeight: item.read ? "normal" : "bold",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        {selectedItem ? (
          <DetailComponent data={selectedItem} />
        ) : (
          <Typography>Select an item to view details.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default InboxLayout;
