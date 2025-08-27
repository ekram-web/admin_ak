import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { useSnackbar } from "notistack";
import { mockApi } from "../../api/mockApi";

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

// --- GENERIC FORM MODAL (Reused for Cards & Testimonials) ---
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
    const data = { id: initialData?.id };
    fields.forEach((field) => {
      if (field.type !== "file") {
        data[field.name] = formData.get(field.name);
      }
    });
    onSave(data);
    handleClose();
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
              <input type="file" accept={field.accept} hidden />
            </Button>
          ) : (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              defaultValue={initialData?.[field.name] ?? ""}
              fullWidth
              required
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

// --- MAIN ADMIN PAGE COMPONENT ---
const ServicesPageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [servicesData, setServicesData] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const fetchData = () => {
    if (!loading) setLoading(true);
    mockApi.getServicesPageData().then((res) => {
      setServicesData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (config) => {
    setModalConfig(config);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSectionSave = async (sectionKey, event, sectionName) => {
    event.preventDefault();
    setSaving(true);
    const formData = new FormData(event.currentTarget);
    const newData = Object.fromEntries(formData.entries());
    await mockApi.saveServicesPageData({ [sectionKey]: newData });
    enqueueSnackbar(`${sectionName} section updated!`, { variant: "success" });
    fetchData();
    setSaving(false);
  };

  const handleCrudSave = (sectionKey, itemData, itemType) => {
    const updatedList = itemData.id
      ? servicesData[sectionKey].map((item) =>
          item.id === itemData.id ? { ...item, ...itemData } : item
        )
      : [...servicesData[sectionKey], { ...itemData, id: Date.now() }];

    mockApi.saveServicesPageData({ [sectionKey]: updatedList }).then(() => {
      enqueueSnackbar(`${itemType} ${itemData.id ? "updated" : "added"}!`, {
        variant: "success",
      });
      fetchData();
    });
  };

  const handleCrudDelete = (sectionKey, itemId, itemType) => {
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      const updatedList = servicesData[sectionKey].filter(
        (item) => item.id !== itemId
      );
      mockApi.saveServicesPageData({ [sectionKey]: updatedList }).then(() => {
        enqueueSnackbar(`${itemType} deleted!`, { variant: "warning" });
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

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Header Section</Typography>
        </AccordionSummary>
        <AccordionDetails
          component="form"
          onSubmit={(e) => handleSectionSave("header", e, "Header")}
        >
          <TextField
            name="title"
            label="Main Title"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={servicesData.header.title}
          />
          <TextField
            name="subtitle"
            label="Subtitle"
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
            defaultValue={servicesData.header.subtitle}
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<ImageIcon />}
          >
            Upload Header Image
            <input type="file" accept="image/*" hidden />
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={saving}
            sx={{ display: "block", mt: 2 }}
          >
            {saving ? <CircularProgress size={24} /> : "Save Header"}
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">"Products We Sell" Cards</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {servicesData.productCards.map((card) => (
              <ListItem
                key={card.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Card",
                          fields: [
                            { name: "name", label: "Name" },
                            {
                              name: "image",
                              label: "Image",
                              type: "file",
                              icon: <ImageIcon />,
                              accept: "image/*",
                            },
                          ],
                          initialData: card,
                          onSave: (data) =>
                            handleCrudSave(
                              "productCards",
                              data,
                              "Product Card"
                            ),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete(
                          "productCards",
                          card.id,
                          "Product Card"
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Avatar variant="rounded" src={card.imageUrl} sx={{ mr: 2 }}>
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={card.name} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              openModal({
                title: "Add New Card",
                fields: [
                  { name: "name", label: "Name" },
                  {
                    name: "image",
                    label: "Image",
                    type: "file",
                    icon: <ImageIcon />,
                    accept: "image/*",
                  },
                ],
                onSave: (data) =>
                  handleCrudSave("productCards", data, "Product Card"),
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
            {servicesData.testimonials.map((item) => (
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
                            },
                            { name: "author", label: "Author" },
                            { name: "company", label: "Company" },
                          ],
                          initialData: item,
                          onSave: (data) =>
                            handleCrudSave("testimonials", data, "Testimonial"),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete("testimonials", item.id, "Testimonial")
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
            onClick={() =>
              openModal({
                title: "Add New Testimonial",
                fields: [
                  { name: "quote", label: "Quote", multiline: true, rows: 4 },
                  { name: "author", label: "Author" },
                  { name: "company", label: "Company" },
                ],
                onSave: (data) =>
                  handleCrudSave("testimonials", data, "Testimonial"),
              })
            }
          >
            Add Testimonial
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Installation Section</Typography>
        </AccordionSummary>
        <AccordionDetails
          component="form"
          onSubmit={(e) => handleSectionSave("installation", e, "Installation")}
        >
          <TextField
            name="title"
            label="Section Title"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={servicesData.installation.title}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
            defaultValue={servicesData.installation.description}
          />
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? <CircularProgress size={24} /> : "Save Section"}
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Service Process Section</Typography>
        </AccordionSummary>
        <AccordionDetails
          component="form"
          onSubmit={(e) =>
            handleSectionSave("processSteps", e, "Service Process")
          }
        >
          <TextField
            name="step1"
            label="Step 1 Title"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={servicesData.processSteps.step1}
          />
          <TextField
            name="step2"
            label="Step 2 Title"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={servicesData.processSteps.step2}
          />
          <TextField
            name="step3"
            label="Step 3 Title"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={servicesData.processSteps.step3}
          />
          <TextField
            name="step4"
            label="Step 4 Title"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={servicesData.processSteps.step4}
          />
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? <CircularProgress size={24} /> : "Save Process Steps"}
          </Button>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ServicesPageAdmin;
