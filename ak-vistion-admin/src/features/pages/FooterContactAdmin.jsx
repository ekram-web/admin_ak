import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  IconButton,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "notistack";
import apiClient from "../../api/apiClient";

// --- STYLES FOR MODALS ---
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(400px, 60vw, 600px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// --- FORM MODAL for Contact Details ---
const ContactFormModal = ({ open, handleClose, data, onSave }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const detailData = {
      id: data?.id,
      type: formData.get("type"),
      value: formData.get("value"),
    };
    onSave(detailData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {data?.id ? "Edit" : "Add"} Contact Detail
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            name="type"
            defaultValue={data?.type ?? "Phone"}
            label="Type"
          >
            <MenuItem value="Address">Address</MenuItem>
            <MenuItem value="Phone">Phone</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Hours">Hours</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="value"
          label="Content (Value)"
          defaultValue={data?.value ?? ""}
          fullWidth
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Detail
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// --- MAIN ADMIN PAGE COMPONENT (FINAL INTEGRATED VERSION) ---
const FooterContactAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);

  const fetchData = async () => {
    if (!loading) setLoading(true);
    try {
      const response = await apiClient.get("/admin/footer-contact-details");
      setDetails(response.data);
    } catch (error) {
      enqueueSnackbar("Failed to load contact details.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (detailData) => {
    setLoading(true);
    handleCloseModal();
    try {
      if (detailData.id) {
        // This is an update
        await apiClient.put(
          `/admin/footer-contact-details/${detailData.id}`,
          detailData
        );
        enqueueSnackbar("Contact Detail updated successfully!", {
          variant: "success",
        });
      } else {
        // This is a new creation
        await apiClient.post("/admin/footer-contact-details", detailData);
        enqueueSnackbar("Contact Detail added successfully!", {
          variant: "success",
        });
      }
      await fetchData();
    } catch (error) {
      console.error(error.response?.data);
      enqueueSnackbar("Failed to save contact detail.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (detailId) => {
    if (
      window.confirm("Are you sure you want to delete this contact detail?")
    ) {
      setLoading(true);
      try {
        await apiClient.delete(`/admin/footer-contact-details/${detailId}`);
        enqueueSnackbar("Contact Detail deleted!", { variant: "warning" });
        await fetchData();
      } catch (error) {
        enqueueSnackbar("Failed to delete contact detail.", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = (data = null) => {
    setEditingDetail(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingDetail(null);
    setModalOpen(false);
  };

  if (loading && details.length === 0)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {modalOpen && (
        <ContactFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={editingDetail}
          onSave={handleSave}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Manage Footer Contact Details</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
        >
          Add New Detail
        </Button>
      </Box>
      {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
      <List>
        {details.map((detail) => (
          <ListItem
            key={detail.id}
            secondaryAction={
              <>
                <IconButton onClick={() => openModal(detail)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(detail.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            sx={{ borderBottom: "1px solid #eee" }}
          >
            <ListItemText
              primary={detail.type}
              secondary={detail.value}
              secondaryTypographyProps={{ style: { whiteSpace: "pre-line" } }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FooterContactAdmin;
