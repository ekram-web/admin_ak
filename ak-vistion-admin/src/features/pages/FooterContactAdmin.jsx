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
import { mockApi } from "../../api/mockApi";

// Reusable Modal Style
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

// Form Modal for Contact Details
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

const FooterContactAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDetail, setEditingDetail] = useState(null);

  const fetchData = () => {
    if (!loading) setLoading(true);
    mockApi.getFooterData().then((res) => {
      // Correct function call
      setDetails(res.data.contactDetails);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = (detailData) => {
    mockApi.saveFooterContactDetail(detailData).then(() => {
      // Correct function call
      enqueueSnackbar(
        `Contact Detail ${detailData.id ? "updated" : "added"} successfully!`,
        { variant: "success" }
      );
      fetchData();
    });
  };

  const handleDelete = (detailId) => {
    if (
      window.confirm("Are you sure you want to delete this contact detail?")
    ) {
      mockApi.deleteFooterContactDetail(detailId).then(() => {
        // Correct function call
        enqueueSnackbar("Contact Detail deleted!", { variant: "warning" });
        fetchData();
      });
    }
  };

  if (loading)
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
          handleClose={() => setModalOpen(false)}
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
          onClick={() => {
            setEditingDetail(null);
            setModalOpen(true);
          }}
        >
          Add New Detail
        </Button>
      </Box>
      <List>
        {details.map((detail) => (
          <ListItem
            key={detail.id}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => {
                    setEditingDetail(detail);
                    setModalOpen(true);
                  }}
                >
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
