import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  IconButton,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { useSnackbar } from "notistack";
import apiClient from "../../api/apiClient";

// --- STYLES FOR MODALS (This is correct and reusable) ---
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

// --- GENERIC FORM MODAL (This is the final, corrected version) ---
const FormModal = ({
  open,
  handleClose,
  title,
  fields,
  initialData,
  onSave,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSave(formData);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {fields.map((field) =>
          field.type === "file" ? (
            <Button
              key={field.name}
              component="label"
              variant="outlined"
              startIcon={field.icon}
              sx={{ mb: 2, width: "100%" }}
            >
              {field.label}
              <input
                type="file"
                name={field.name}
                accept={field.accept}
                hidden
              />
            </Button>
          ) : (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              defaultValue={initialData?.[field.name] ?? ""}
              fullWidth
              required={field.required}
              multiline={field.multiline}
              rows={field.rows}
              sx={{ mb: 2 }}
            />
          )
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// --- MAIN ADMIN PAGE COMPONENT (FINAL INTEGRATED VERSION) ---
const ServicesPageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const [serviceCards, setServiceCards] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const fetchData = async () => {
    try {
      const [pageRes, cardsRes, testimonialsRes] = await Promise.all([
        apiClient.get("/admin/pages/services"),
        apiClient.get("/admin/service-cards"),
        apiClient.get("/admin/testimonials"),
      ]);
      setPageData(pageRes.data);
      setServiceCards(cardsRes.data);
      setTestimonials(testimonialsRes.data);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to load Services page data!", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (config) => {
    setModalConfig(config);
    setModalOpen(true);
  };
  const handleCloseModal = () => setModalOpen(false);

  const handleContentSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    try {
      await apiClient.post("/admin/pages/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar("Content sections updated successfully!", {
        variant: "success",
      });
      await fetchData();
    } catch (error) {
      console.error(error.response?.data);
      enqueueSnackbar("Failed to save content.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCrudSave = async (endpoint, formData, itemType, itemId) => {
    setLoading(true);
    handleCloseModal();
    try {
      const isUpdate = !!itemId;
      const url = isUpdate ? `${endpoint}/${itemId}` : endpoint;
      if (isUpdate) {
        formData.append("_method", "POST");
      }

      await apiClient.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar(`${itemType} ${isUpdate ? "updated" : "added"}!`, {
        variant: "success",
      });
      await fetchData();
    } catch (error) {
      console.error(error.response?.data);
      enqueueSnackbar(`Failed to save ${itemType.toLowerCase()}.`, {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCrudDelete = async (endpoint, itemId, itemType) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${itemType.toLowerCase()}?`
      )
    ) {
      setLoading(true);
      try {
        await apiClient.delete(`${endpoint}/${itemId}`);
        enqueueSnackbar(`${itemType} deleted!`, { variant: "warning" });
        await fetchData();
      } catch (error) {
        enqueueSnackbar(`Failed to delete ${itemType.toLowerCase()}.`, {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (!pageData)
    return (
      <Typography color="error">Could not load initial page data.</Typography>
    );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Services Page Content
      </Typography>

      {modalOpen && (
        <FormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          {...modalConfig}
        />
      )}

      <Box component="form" onSubmit={handleContentSave}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Page Content</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "medium" }}
            >
              Header Section
            </Typography>
            <TextField
              name="header[title]"
              label="Main Title"
              fullWidth
              sx={{ mb: 2 }}
              defaultValue={pageData.header?.title}
            />
            <TextField
              name="header[subtitle]"
              label="Subtitle"
              fullWidth
              multiline
              rows={2}
              sx={{ mb: 2 }}
              defaultValue={pageData.header?.subtitle}
            />
            <Button
              component="label"
              variant="outlined"
              startIcon={<ImageIcon />}
            >
              Upload Header Image
              <input type="file" name="headerImage" accept="image/*" hidden />
            </Button>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "medium" }}
            >
              Installation Section
            </Typography>
            <TextField
              name="installation[title]"
              label="Installation Section Title"
              fullWidth
              sx={{ mb: 2 }}
              defaultValue={pageData.installation?.title}
            />
            <TextField
              name="installation[description]"
              label="Installation Description"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
              defaultValue={pageData.installation?.description}
            />
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: "medium" }}
            >
              Service Process Section
            </Typography>
            <TextField
              name="process[step1]"
              label="Process Step 1 Title"
              fullWidth
              sx={{ mb: 2 }}
              defaultValue={pageData.process?.step1}
            />
            <TextField
              name="process[step2]"
              label="Process Step 2 Title"
              fullWidth
              sx={{ mb: 2 }}
              defaultValue={pageData.process?.step2}
            />
            <TextField
              name="process[step3]"
              label="Process Step 3 Title"
              fullWidth
              sx={{ mb: 2 }}
              defaultValue={pageData.process?.step3}
            />
            <TextField
              name="process[step4]"
              label="Process Step 4 Title"
              fullWidth
              sx={{ mb: 2 }}
              defaultValue={pageData.process?.step4}
            />
          </AccordionDetails>
        </Accordion>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ mt: 3, mb: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : "Save All Page Content"}
        </Button>
      </Box>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">"Products We Sell" Cards</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {serviceCards.map((card) => (
              <ListItem
                key={card.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Card",
                          fields: [
                            { name: "name", label: "Name", required: true },
                            {
                              name: "image",
                              label: "Image",
                              type: "file",
                              icon: <ImageIcon />,
                              accept: "image/*",
                            },
                          ],
                          initialData: card,
                          onSave: (formData) =>
                            handleCrudSave(
                              "/admin/service-cards",
                              formData,
                              "Service Card",
                              card.id
                            ),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete(
                          "/admin/service-cards",
                          card.id,
                          "Service Card"
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Avatar
                  variant="rounded"
                  src={
                    card.image_url
                      ? `http://127.0.0.1:8000/storage/${card.image_url}`
                      : ""
                  }
                  sx={{ mr: 2, bgcolor: "grey.300", width: 56, height: 56 }}
                >
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={card.name} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={() =>
              openModal({
                title: "Add New Card",
                fields: [
                  { name: "name", label: "Name", required: true },
                  {
                    name: "image",
                    label: "Image",
                    type: "file",
                    icon: <ImageIcon />,
                    accept: "image/*",
                    required: true,
                  },
                ],
                onSave: (formData) =>
                  handleCrudSave(
                    "/admin/service-cards",
                    formData,
                    "Service Card"
                  ),
              })
            }
          >
            Add Card
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Testimonials</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {testimonials.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Testimonial",
                          fields: [
                            {
                              name: "quote",
                              label: "Quote",
                              multiline: true,
                              rows: 4,
                              required: true,
                            },
                            { name: "author", label: "Author", required: true },
                            { name: "company", label: "Company" },
                          ],
                          initialData: item,
                          onSave: (formData) =>
                            handleCrudSave(
                              "/admin/testimonials",
                              formData,
                              "Testimonial",
                              item.id
                            ),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete(
                          "/admin/testimonials",
                          item.id,
                          "Testimonial"
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`"${item.quote}"`}
                  secondary={`${item.author} - ${item.company}`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={() =>
              openModal({
                title: "Add New Testimonial",
                fields: [
                  {
                    name: "quote",
                    label: "Quote",
                    multiline: true,
                    rows: 4,
                    required: true,
                  },
                  { name: "author", label: "Author", required: true },
                  { name: "company", label: "Company" },
                ],
                onSave: (formData) =>
                  handleCrudSave(
                    "/admin/testimonials",
                    formData,
                    "Testimonial"
                  ),
              })
            }
          >
            Add Testimonial
          </Button>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ServicesPageAdmin;
