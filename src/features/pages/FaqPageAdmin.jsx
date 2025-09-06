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
  width: "clamp(400px, 70vw, 800px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// --- FORM MODAL for FAQs ---
const FaqFormModal = ({ open, handleClose, data, onSave }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const faqData = {
      id: data?.id,
      question: formData.get("question"),
      answer: formData.get("answer"),
    };
    onSave(faqData);
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {data?.id ? "Edit" : "Add"} FAQ
        </Typography>
        <TextField
          name="question"
          label="Question"
          defaultValue={data?.question ?? ""}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="answer"
          label="Answer"
          defaultValue={data?.answer ?? ""}
          fullWidth
          required
          multiline
          rows={8}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save FAQ
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// --- MAIN ADMIN PAGE COMPONENT (FINAL INTEGRATED VERSION) ---
const FaqPageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const fetchData = async () => {
    if (!loading) setLoading(true);
    try {
      const response = await apiClient.get("/admin/faqs");
      setFaqs(response.data);
    } catch (error) {
      enqueueSnackbar("Failed to load FAQs.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (faqData) => {
    setLoading(true);
    handleCloseModal();
    try {
      if (faqData.id) {
        // Update
        await apiClient.put(`/admin/faqs/${faqData.id}`, faqData);
        enqueueSnackbar("FAQ updated successfully!", { variant: "success" });
      } else {
        // Create
        await apiClient.post("/admin/faqs", faqData);
        enqueueSnackbar("FAQ added successfully!", { variant: "success" });
      }
      await fetchData();
    } catch (error) {
      console.error(error.response?.data);
      enqueueSnackbar("Failed to save FAQ.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (faqId) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setLoading(true);
      try {
        await apiClient.delete(`/admin/faqs/${faqId}`);
        enqueueSnackbar("FAQ deleted!", { variant: "warning" });
        await fetchData();
      } catch (error) {
        enqueueSnackbar("Failed to delete FAQ.", { variant: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const openModal = (data = null) => {
    setEditingFaq(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingFaq(null);
    setModalOpen(false);
  };

  if (loading && faqs.length === 0)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {modalOpen && (
        <FaqFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={editingFaq}
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
        <Typography variant="h4">Manage FAQ Page</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
        >
          Add New FAQ
        </Button>
      </Box>
      {loading && (
        <CircularProgress sx={{ display: "block", mx: "auto", mb: 2 }} />
      )}
      <List>
        {faqs.map((faq) => (
          <ListItem
            key={faq.id}
            secondaryAction={
              <>
                <IconButton onClick={() => openModal(faq)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(faq.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            sx={{ borderBottom: "1px solid #eee" }}
          >
            <ListItemText
              primary={faq.question}
              secondary={faq.answer}
              secondaryTypographyProps={{
                noWrap: true,
                textOverflow: "ellipsis",
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default FaqPageAdmin;
