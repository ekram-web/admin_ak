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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSnackbar } from "notistack";
import apiClient from "../../../api/apiClient";

const InboxLayout = ({ pageTitle, itemType, dataKey, DetailComponent }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Make the real API call to fetch submissions filtered by type
      const response = await apiClient.get(
        `/admin/submissions?type=${dataKey}`
      );
      setItems(response.data);
      // If the list is not empty, automatically select the first item
      if (response.data.length > 0) {
        handleSelectItem(response.data[0]);
      } else {
        setSelectedItem(null); // Clear selection if list is empty
      }
    } catch (error) {
      enqueueSnackbar(`Failed to load ${itemType} list.`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataKey]); // Re-fetch when the dataKey (page) changes

  const handleSelectItem = async (item) => {
    setDetailLoading(true);
    try {
      // Fetch the full details of the selected item to mark it as read on the backend
      const response = await apiClient.get(`/admin/submissions/${item.id}`);
      setSelectedItem(response.data);
      // Optimistically update the list item in the UI to remove the "bold" font
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? { ...i, is_read: true } : i))
      );
    } catch (error) {
      enqueueSnackbar(`Failed to load ${itemType} details.`, {
        variant: "error",
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${itemType.toLowerCase()}?`
      )
    ) {
      try {
        await apiClient.delete(`/admin/submissions/${itemId}`);
        enqueueSnackbar(`${itemType} deleted successfully!`, {
          variant: "warning",
        });
        // If the deleted item was the selected one, clear the detail view
        if (selectedItem?.id === itemId) {
          setSelectedItem(null);
        }
        fetchData(); // Refresh the list from the server
      } catch (error) {
        enqueueSnackbar(`Failed to delete ${itemType.toLowerCase()}.`, {
          variant: "error",
        });
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        height: "calc(100vh - 112px)",
        overflow: "hidden",
      }}
    >
      {/* Left Panel: List of Items */}
      <Box
        sx={{
          width: { xs: "100%", sm: "320px" },
          borderRight: { sm: 1 },
          borderColor: "divider",
          display: { xs: selectedItem ? "none" : "flex", sm: "flex" },
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{pageTitle}</Typography>
          {loading && <CircularProgress size={24} />}
        </Box>
        <Divider />
        <List component="nav" sx={{ overflowY: "auto" }}>
          {items.map((item) => (
            <ListItemButton
              key={item.id}
              selected={selectedItem?.id === item.id}
              onClick={() => handleSelectItem(item)}
            >
              <ListItemText
                primary={item.data.name || item.data.email}
                secondary={
                  item.data.productInterest ||
                  item.data.issueType ||
                  "New Subscriber"
                }
                primaryTypographyProps={{
                  fontWeight: item.is_read ? "normal" : "bold",
                  noWrap: true,
                }}
                secondaryTypographyProps={{ noWrap: true }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Right Panel: Item Details */}
      <Box sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        {detailLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : selectedItem ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
              <IconButton
                onClick={() => handleDeleteItem(selectedItem.id)}
                aria-label="delete"
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <DetailComponent
              data={selectedItem.data}
              createdAt={selectedItem.created_at}
            />
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              color: "text.secondary",
            }}
          >
            <Typography>Select an item to view its details.</Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default InboxLayout;
