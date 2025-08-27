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
import { mockApi } from "../../api/mockApi";

// Reusable Modal Style
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

// Reusable Form Modal for FAQs
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
          rows={6}
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

const FaqPageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  const fetchData = () => {
    if (!loading) setLoading(true);
    mockApi.getFaqPageData().then((res) => {
      setFaqs(res.data.faqs);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = (faqData) => {
    mockApi.saveFaq(faqData).then(() => {
      enqueueSnackbar(`FAQ ${faqData.id ? "updated" : "added"} successfully!`, {
        variant: "success",
      });
      fetchData();
    });
  };

  const handleDelete = (faqId) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      mockApi.deleteFaq(faqId).then(() => {
        enqueueSnackbar("FAQ deleted!", { variant: "warning" });
        fetchData();
      });
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {modalOpen && (
        <FaqFormModal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
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
          onClick={() => {
            setEditingFaq(null);
            setModalOpen(true);
          }}
        >
          Add New FAQ
        </Button>
      </Box>
      <List>
        {faqs.map((faq) => (
          <ListItem
            key={faq.id}
            secondaryAction={
              <>
                <IconButton
                  onClick={() => {
                    setEditingFaq(faq);
                    setModalOpen(true);
                  }}
                >
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
