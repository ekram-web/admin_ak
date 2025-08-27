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
  Card,
  CardContent,
  ListItemIcon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import { useSnackbar } from "notistack";
import { mockApi } from "../../api/mockApi";

// --- STYLES FOR MODALS ---
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(400px, 70vw, 700px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

// --- MODAL for Hero Section ---
const HeroFormModal = ({ open, handleClose, data, onSave }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={modalStyle}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          title: e.target.title.value,
          subtitle: e.target.subtitle.value,
        });
        handleClose();
      }}
    >
      <Typography variant="h5" gutterBottom>
        Edit Hero Section
      </Typography>
      <TextField
        name="title"
        label="Main Title"
        defaultValue={data?.title}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="subtitle"
        label="Subtitle"
        defaultValue={data?.subtitle}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button
        component="label"
        variant="outlined"
        startIcon={<VideoFileIcon />}
        sx={{ mb: 2 }}
      >
        Upload New Background Video
        <input type="file" accept="video/*" hidden />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

// --- MODAL for Featured Item ---
const FeaturedItemFormModal = ({ open, handleClose, data, onSave }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={modalStyle}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({
          id: data?.id,
          title: e.target.title.value,
          description: e.target.description.value,
        });
        handleClose();
      }}
    >
      <Typography variant="h5" gutterBottom>
        {data?.id ? "Edit" : "Add"} Featured Item
      </Typography>
      <TextField
        name="title"
        label="Title"
        defaultValue={data?.title}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="description"
        label="Description"
        defaultValue={data?.description}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <Button
        component="label"
        variant="outlined"
        startIcon={<ImageIcon />}
        sx={{ mb: 2 }}
      >
        Upload Image
        <input type="file" accept="image/*" hidden />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

// --- MODAL FOR Newsroom Video ---
const NewsroomVideoFormModal = ({ open, handleClose, data, onSave }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={modalStyle}
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ id: data?.id });
        handleClose();
      }}
    >
      <Typography variant="h5" gutterBottom>
        {data?.id ? "Edit" : "Add"} Newsroom Video
      </Typography>
      <Typography paragraph color="text.secondary">
        Current Video: {data?.videoUrl ?? "N/A"}
      </Typography>
      <Button
        component="label"
        variant="outlined"
        startIcon={<VideoFileIcon />}
        sx={{ mb: 2 }}
      >
        Upload New Video
        <input type="file" accept="video/*" hidden />
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </Box>
  </Modal>
);

// --- MODAL FOR A SINGLE TECHNOLOGY ---
const TechnologyFormModal = ({ open, handleClose, tech, onSave }) => {
  const { enqueueSnackbar } = useSnackbar();
  const isEditing = Boolean(tech?.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (
      !formData.get("name") ||
      !formData.get("shortDesc") ||
      !formData.get("longDesc")
    ) {
      enqueueSnackbar("All text fields are required!", { variant: "error" });
      return;
    }

    const data = {
      id: tech?.id,
      name: formData.get("name"),
      shortDesc: formData.get("shortDesc"),
      longDesc: formData.get("longDesc"),
    };
    onSave(data);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {isEditing ? `Edit: ${tech.name}` : "Add New Technology"}
        </Typography>
        <TextField
          name="name"
          label="Technology Name (Title)"
          defaultValue={tech?.name}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="shortDesc"
          label="Short Description"
          defaultValue={tech?.shortDesc}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="longDesc"
          label="Long Description"
          defaultValue={tech?.longDesc}
          fullWidth
          multiline
          rows={4}
          required
          sx={{ mb: 2 }}
        />
        <Button
          component="label"
          variant="outlined"
          startIcon={<ImageIcon />}
          sx={{ mb: 2 }}
        >
          Upload Image
          <input type="file" accept="image/*" hidden />
        </Button>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Technology
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// --- MAIN ADMIN PAGE COMPONENT ---
const HomePageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [homepageData, setHomepageData] = useState(null);
  const [technologies, setTechnologies] = useState([]);

  // State for modals
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const fetchData = () => {
    setLoading(true);
    Promise.all([mockApi.getHomepageData(), mockApi.getTechnologies()]).then(
      ([homepageRes, techRes]) => {
        setHomepageData(homepageRes.data);
        setTechnologies(techRes.data);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (type, data) => {
    setEditingItem(data);
    setModalContent(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = async (section, data) => {
    // This is a generic save handler for demonstration.
    // In a real app, you would have specific API calls.
    enqueueSnackbar(`${section} saved successfully!`, { variant: "success" });
    fetchData(); // Refetch data to show changes
  };

  const handleSaveTechnology = (techData) => {
    if (techData.id) {
      setTechnologies(
        technologies.map((t) =>
          t.id === techData.id ? { ...t, ...techData } : t
        )
      );
      enqueueSnackbar("Technology updated successfully!", {
        variant: "success",
      });
    } else {
      const newTech = { ...techData, id: Date.now() }; // Fake ID for mock API
      setTechnologies([...technologies, newTech]);
      enqueueSnackbar("Technology added successfully!", { variant: "success" });
    }
  };

  const handleDeleteTechnology = (id) => {
    if (window.confirm("Are you sure you want to delete this technology?")) {
      setTechnologies(technologies.filter((t) => t.id !== id));
      enqueueSnackbar("Technology deleted!", { variant: "warning" });
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Homepage Content
      </Typography>

      {/* --- Modals --- */}
      {modalContent === "hero" && (
        <HeroFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={editingItem}
          onSave={(data) => {
            handleSave("Hero", { hero: data });
          }}
        />
      )}
      {modalContent === "feature" && (
        <FeaturedItemFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={editingItem}
          onSave={(data) => handleSave("Featured Item", { feature: data })}
        />
      )}
      {modalContent === "news" && (
        <NewsroomVideoFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={editingItem}
          onSave={(data) => handleSave("Newsroom Video", { news: data })}
        />
      )}
      {modalContent === "tech" && (
        <TechnologyFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          tech={editingItem}
          onSave={handleSaveTechnology}
        />
      )}

      {/* --- Accordion 1: Hero Section --- */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Hero Section</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5">{homepageData.hero.title}</Typography>
              <Typography color="text.secondary">
                {homepageData.hero.subtitle}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Current Video: {homepageData.hero.videoUrl}
              </Typography>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
                onClick={() => openModal("hero", homepageData.hero)}
              >
                Edit Hero
              </Button>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

      {/* --- Accordion 2: Product Showcase --- */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Product Showcase</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {homepageData.featuredItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => openModal("feature", item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        enqueueSnackbar("Item deleted!", { variant: "warning" })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemIcon sx={{ mr: 2 }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    width="80"
                    style={{ borderRadius: "4px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal("feature", null)}
          >
            Add Featured Item
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* --- Accordion 3: Core Technologies --- */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Core Technologies</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {technologies.map((tech) => (
              <ListItem
                key={tech.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => openModal("tech", tech)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTechnology(tech.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={tech.name} secondary={tech.shortDesc} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal("tech", null)}
          >
            Add Technology
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* --- Accordion 4: Newsroom Videos --- */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Newsroom Videos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {homepageData.newsroomVideos.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => openModal("news", item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        enqueueSnackbar("Video deleted!", {
                          variant: "warning",
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemIcon>
                  <VideoFileIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`Video Slot ${item.id}`}
                  secondary={item.videoUrl}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => openModal("news", null)}
          >
            Add Newsroom Video
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default HomePageAdmin;
