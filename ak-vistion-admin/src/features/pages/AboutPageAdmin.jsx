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
import VideoFileIcon from "@mui/icons-material/VideoFile";
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

// --- GENERIC FORM MODAL (This is correct and reusable) ---
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
    onSave(new FormData(event.currentTarget));
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
const AboutPageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);
  const [team, setTeam] = useState([]);
  const [stats, setStats] = useState([]);
  const [partners, setPartners] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const fetchData = async () => {
    try {
      const [pageRes, teamRes, statsRes, partnersRes] = await Promise.all([
        apiClient.get("/admin/pages/about"),
        apiClient.get("/admin/team-members"),
        apiClient.get("/admin/statistics"),
        apiClient.get("/admin/partners"),
      ]);
      setPageData(pageRes.data);
      setTeam(teamRes.data);
      setStats(statsRes.data);
      setPartners(partnersRes.data);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to load About page data!", { variant: "error" });
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
      await apiClient.post("/admin/pages/about", formData, {
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
        Manage About Us Page Content
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
            <Typography variant="h6">Inspiring Spaces & Promo Video</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="inspiring[preTitle]"
              label="Inspiring Pre-title"
              fullWidth
              sx={{ mb: 2 }}
              defaultValue={pageData.inspiring?.preTitle}
            />
            <TextField
              name="inspiring[title]"
              label="Inspiring Main Title"
              fullWidth
              sx={{ mb: 2 }}
              defaultValue={pageData.inspiring?.title}
            />
            <TextField
              name="inspiring[description]"
              label="Inspiring Description"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
              defaultValue={pageData.inspiring?.description}
            />
            <Button component="label" variant="outlined" sx={{ mr: 2 }}>
              Upload Inspiring Image
              <input name="image1" type="file" hidden />
            </Button>
            <Divider sx={{ my: 2 }} />
            <Button
              component="label"
              variant="outlined"
              startIcon={<VideoFileIcon />}
              sx={{ mr: 2 }}
            >
              Upload Promo Video
              <input name="promo_video" type="file" accept="video/*" hidden />
            </Button>
            <Button
              component="label"
              variant="outlined"
              startIcon={<ImageIcon />}
            >
              Upload Poster Image
              <input name="poster_image" type="file" accept="image/*" hidden />
            </Button>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Working Process Section</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              name="process[visionTitle]"
              label="Vision Title"
              fullWidth
              sx={{ mb: 1 }}
              defaultValue={pageData.process?.visionTitle}
            />
            <TextField
              name="process[visionDesc]"
              label="Vision Description"
              fullWidth
              multiline
              rows={2}
              sx={{ mb: 2 }}
              defaultValue={pageData.process?.visionDesc}
            />
            <TextField
              name="process[missionTitle]"
              label="Mission Title"
              fullWidth
              sx={{ mb: 1 }}
              defaultValue={pageData.process?.missionTitle}
            />
            <TextField
              name="process[missionDesc]"
              label="Mission Description"
              fullWidth
              multiline
              rows={2}
              sx={{ mb: 2 }}
              defaultValue={pageData.process?.missionDesc}
            />
            <TextField
              name="process[goalTitle]"
              label="Goal Title"
              fullWidth
              sx={{ mb: 1 }}
              defaultValue={pageData.process?.goalTitle}
            />
            <TextField
              name="process[goalDesc]"
              label="Goal Description"
              fullWidth
              multiline
              rows={2}
              sx={{ mb: 2 }}
              defaultValue={pageData.process?.goalDesc}
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
          <Typography variant="h6">Statistics Counter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {stats.map((stat) => (
              <ListItem
                key={stat.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Stat",
                          fields: [
                            { name: "label", label: "Label", required: true },
                            { name: "value", label: "Value", required: true },
                          ],
                          initialData: stat,
                          onSave: (formData) =>
                            handleCrudSave(
                              "/admin/statistics",
                              formData,
                              "Stat",
                              stat.id
                            ),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete("/admin/statistics", stat.id, "Stat")
                      }
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
            sx={{ mt: 2 }}
            onClick={() =>
              openModal({
                title: "Add New Stat",
                fields: [
                  { name: "label", label: "Label", required: true },
                  { name: "value", label: "Value", required: true },
                ],
                onSave: (formData) =>
                  handleCrudSave("/admin/statistics", formData, "Stat"),
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
            {team.map((member) => (
              <ListItem
                key={member.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Team Member",
                          fields: [
                            { name: "name", label: "Name", required: true },
                            { name: "title", label: "Title", required: true },
                            {
                              name: "image",
                              label: "Profile Image",
                              type: "file",
                              icon: <ImageIcon />,
                              accept: "image/*",
                            },
                          ],
                          initialData: member,
                          onSave: (formData) =>
                            handleCrudSave(
                              "/admin/team-members",
                              formData,
                              "Team Member",
                              member.id
                            ),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete(
                          "/admin/team-members",
                          member.id,
                          "Team Member"
                        )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Avatar
                  src={
                    member.image_url
                      ? `http://127.0.0.1:8000/storage/${member.image_url}`
                      : ""
                  }
                  sx={{ mr: 2 }}
                />
                <ListItemText primary={member.name} secondary={member.title} />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={() =>
              openModal({
                title: "Add New Team Member",
                fields: [
                  { name: "name", label: "Name", required: true },
                  { name: "title", label: "Title", required: true },
                  {
                    name: "image",
                    label: "Profile Image",
                    type: "file",
                    icon: <ImageIcon />,
                    accept: "image/*",
                  },
                ],
                onSave: (formData) =>
                  handleCrudSave(
                    "/admin/team-members",
                    formData,
                    "Team Member"
                  ),
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
            {partners.map((partner) => (
              <ListItem
                key={partner.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({
                          title: "Edit Partner",
                          fields: [
                            {
                              name: "name",
                              label: "Partner Name",
                              required: true,
                            },
                            {
                              name: "logo",
                              label: "Partner Logo",
                              type: "file",
                              icon: <ImageIcon />,
                              accept: "image/*",
                            },
                          ],
                          initialData: partner,
                          onSave: (formData) =>
                            handleCrudSave(
                              "/admin/partners",
                              formData,
                              "Partner",
                              partner.id
                            ),
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete(
                          "/admin/partners",
                          partner.id,
                          "Partner"
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
                    partner.logo_url
                      ? `http://127.0.0.1:8000/storage/${partner.logo_url}`
                      : ""
                  }
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
            sx={{ mt: 2 }}
            onClick={() =>
              openModal({
                title: "Add New Partner",
                fields: [
                  { name: "name", label: "Partner Name", required: true },
                  {
                    name: "logo",
                    label: "Partner Logo",
                    type: "file",
                    icon: <ImageIcon />,
                    accept: "image/*",
                  },
                ],
                onSave: (formData) =>
                  handleCrudSave("/admin/partners", formData, "Partner"),
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
