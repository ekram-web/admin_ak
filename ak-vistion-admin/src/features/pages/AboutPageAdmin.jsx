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
import VideoFileIcon from "@mui/icons-material/VideoFile";
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

// --- GENERIC FORM MODAL (for Stats, Team, Partners) ---
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
              type={field.type || "text"}
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
const AboutPageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [aboutData, setAboutData] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const fetchData = () => {
    if (!loading) setLoading(true);
    mockApi.getAboutPageData().then((res) => {
      setAboutData(res.data);
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

  // Generic handler for simple form saves (Inspiring Spaces, etc.)
  const handleSectionSave = async (sectionKey, event, sectionName) => {
    event.preventDefault();
    setSaving(true);
    const formData = new FormData(event.currentTarget);
    const newData = {};
    for (let [key, value] of formData.entries()) {
      newData[key] = value;
    }
    await mockApi.saveAboutPageData({ [sectionKey]: newData });
    enqueueSnackbar(`${sectionName} section updated successfully!`, {
      variant: "success",
    });
    fetchData();
    setSaving(false);
  };

  // CRUD handler for lists (Stats, Team, Partners)
  const handleCrudSave = (sectionKey, itemData, itemType) => {
    const updatedList = itemData.id
      ? aboutData[sectionKey].map((item) =>
          item.id === itemData.id ? { ...item, ...itemData } : item
        )
      : [...aboutData[sectionKey], { ...itemData, id: Date.now() }];

    mockApi.saveAboutPageData({ [sectionKey]: updatedList }).then(() => {
      enqueueSnackbar(
        `${itemType} ${itemData.id ? "updated" : "added"} successfully!`,
        { variant: "success" }
      );
      fetchData();
    });
  };

  const handleCrudDelete = (sectionKey, itemId, itemType) => {
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      const updatedList = aboutData[sectionKey].filter(
        (item) => item.id !== itemId
      );
      mockApi.saveAboutPageData({ [sectionKey]: updatedList }).then(() => {
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
        Manage About Us Page Content
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
          <Typography variant="h6">Inspiring Spaces Section</Typography>
        </AccordionSummary>
        <AccordionDetails
          component="form"
          onSubmit={(e) =>
            handleSectionSave("inspiring", e, "Inspiring Spaces")
          }
        >
          <TextField
            name="preTitle"
            label="Pre-title"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={aboutData.inspiring.preTitle}
          />
          <TextField
            name="title"
            label="Main Title"
            fullWidth
            sx={{ mb: 2 }}
            defaultValue={aboutData.inspiring.title}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
            defaultValue={aboutData.inspiring.description}
          />
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? <CircularProgress size={24} /> : "Save Section"}
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Working Process Section</Typography>
        </AccordionSummary>
        <AccordionDetails
          component="form"
          onSubmit={(e) => handleSectionSave("process", e, "Working Process")}
        >
          <TextField
            name="visionTitle"
            label="Vision Title"
            fullWidth
            sx={{ mb: 1 }}
            defaultValue={aboutData.process.visionTitle}
          />
          <TextField
            name="visionDesc"
            label="Vision Description"
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
            defaultValue={aboutData.process.visionDesc}
          />
          <TextField
            name="missionTitle"
            label="Mission Title"
            fullWidth
            sx={{ mb: 1 }}
            defaultValue={aboutData.process.missionTitle}
          />
          <TextField
            name="missionDesc"
            label="Mission Description"
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
            defaultValue={aboutData.process.missionDesc}
          />
          <TextField
            name="goalTitle"
            label="Goal Title"
            fullWidth
            sx={{ mb: 1 }}
            defaultValue={aboutData.process.goalTitle}
          />
          <TextField
            name="goalDesc"
            label="Goal Description"
            fullWidth
            multiline
            rows={2}
            sx={{ mb: 2 }}
            defaultValue={aboutData.process.goalDesc}
          />
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? <CircularProgress size={24} /> : "Save Process"}
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Promo Video</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Current Video: {aboutData.promoVideoUrl}
          </Typography>
          <Button
            component="label"
            variant="outlined"
            startIcon={<VideoFileIcon />}
            sx={{ mr: 2 }}
          >
            Upload Video
            <input type="file" accept="video/*" hidden />
          </Button>
          <Button
            component="label"
            variant="outlined"
            startIcon={<ImageIcon />}
          >
            Upload Poster Image
            <input type="file" accept="image/*" hidden />
          </Button>
          <br />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() =>
              enqueueSnackbar("Video Saved!", { variant: "success" })
            }
          >
            Save Video
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Statistics Counter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {aboutData.stats.map((stat) => (
              <ListItem
                key={stat.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Stat",
                          fields: [
                            { name: "label", label: "Label" },
                            { name: "value", label: "Value", type: "number" },
                          ],
                          initialData: stat,
                          onSave: (data) =>
                            handleCrudSave("stats", data, "Stat"),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleCrudDelete("stats", stat.id, "Stat")}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={stat.label}
                  secondary={`Value: ${stat.value}`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              openModal({
                title: "Add New Stat",
                fields: [
                  { name: "label", label: "Label" },
                  { name: "value", label: "Value", type: "number" },
                ],
                onSave: (data) => handleCrudSave("stats", data, "Stat"),
              })
            }
          >
            Add Stat
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Meet The Team</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {aboutData.team.map((member) => (
              <ListItem
                key={member.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Team Member",
                          fields: [
                            { name: "name", label: "Name" },
                            { name: "title", label: "Title" },
                            {
                              name: "image",
                              label: "Profile Image",
                              type: "file",
                              icon: <ImageIcon />,
                              accept: "image/*",
                            },
                          ],
                          initialData: member,
                          onSave: (data) =>
                            handleCrudSave("team", data, "Team Member"),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete("team", member.id, "Team Member")
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Avatar src={member.imageUrl} sx={{ mr: 2 }} />
                <ListItemText primary={member.name} secondary={member.title} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              openModal({
                title: "Add New Team Member",
                fields: [
                  { name: "name", label: "Name" },
                  { name: "title", label: "Title" },
                  {
                    name: "image",
                    label: "Profile Image",
                    type: "file",
                    icon: <ImageIcon />,
                    accept: "image/*",
                  },
                ],
                onSave: (data) => handleCrudSave("team", data, "Team Member"),
              })
            }
          >
            Add Team Member
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Partners</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {aboutData.partners.map((partner) => (
              <ListItem
                key={partner.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Partner",
                          fields: [
                            { name: "name", label: "Partner Name" },
                            {
                              name: "logo",
                              label: "Partner Logo",
                              type: "file",
                              icon: <ImageIcon />,
                              accept: "image/*",
                            },
                          ],
                          initialData: partner,
                          onSave: (data) =>
                            handleCrudSave("partners", data, "Partner"),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete("partners", partner.id, "Partner")
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Avatar
                  variant="rounded"
                  src={partner.logoUrl}
                  sx={{ mr: 2, bgcolor: "grey.300" }}
                >
                  <ImageIcon />
                </Avatar>
                <ListItemText primary={partner.name} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() =>
              openModal({
                title: "Add New Partner",
                fields: [
                  { name: "name", label: "Partner Name" },
                  {
                    name: "logo",
                    label: "Partner Logo",
                    type: "file",
                    icon: <ImageIcon />,
                    accept: "image/*",
                  },
                ],
                onSave: (data) => handleCrudSave("partners", data, "Partner"),
              })
            }
          >
            Add Partner
          </Button>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default AboutPageAdmin;
