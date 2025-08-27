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
  Grid,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { Editor } from "@tinymce/tinymce-react";
import { useSnackbar } from "notistack";
import { mockApi } from "../../api/mockApi";

// --- STYLES FOR MODALS ---
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(500px, 80vw, 900px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "90vh",
  overflowY: "auto",
};

// --- MODAL for Blog Post ---
const BlogPostFormModal = ({ open, handleClose, data, onSave }) => {
  const editorRef = React.useRef(null);
  const isEditing = Boolean(data?.id);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const postData = { id: data?.id };
    ["title", "author", "category", "readTime", "excerpt"].forEach(
      (key) => (postData[key] = formData.get(key))
    );
    if (editorRef.current) {
      postData.content = editorRef.current.getContent();
    }
    onSave(postData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {isEditing ? "Edit" : "Add"} Blog Post
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Post Title"
              fullWidth
              defaultValue={data?.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="author"
              label="Author"
              fullWidth
              defaultValue={data?.author}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="category"
              label="Category"
              fullWidth
              defaultValue={data?.category}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="excerpt"
              label="Excerpt / Short Summary"
              fullWidth
              multiline
              rows={3}
              defaultValue={data?.excerpt}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="readTime"
              label="Read Time (e.g., 5 min read)"
              fullWidth
              defaultValue={data?.readTime}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<ImageIcon />}
              fullWidth
              sx={{ height: "100%" }}
            >
              Upload Featured Image
              <input type="file" hidden />
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
          Main Content
        </Typography>
        <Editor
          apiKey="YOUR_TINYMCE_API_KEY"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={data?.content ?? "<p>Write your post here.</p>"}
          init={{
            height: 400,
            menubar: false,
            plugins: "lists link image charmap",
            toolbar:
              "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image",
          }}
        />
        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Post
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// --- MODAL for Learning Resource ---
const ResourceFormModal = ({ open, handleClose, data, onSave }) => {
  // ... This would be a simpler form for resources
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5">Manage Learning Resource</Typography>
        {/* Form fields for resource title, type, thumbnail, etc. would go here */}
      </Box>
    </Modal>
  );
};

// --- MAIN ADMIN PAGE COMPONENT ---
const BlogPageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const fetchData = () => {
    if (!loading) setLoading(true);
    mockApi.getBlogPageData().then((res) => {
      setBlogData(res.data);
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

  const handleCrudSave = (sectionKey, itemData, itemType) => {
    const updatedList = itemData.id
      ? blogData[sectionKey].map((item) =>
          item.id === itemData.id ? { ...item, ...itemData } : item
        )
      : [...blogData[sectionKey], { ...itemData, id: Date.now() }];

    mockApi.saveBlogPageData({ [sectionKey]: updatedList }).then(() => {
      enqueueSnackbar(`${itemType} ${itemData.id ? "updated" : "added"}!`, {
        variant: "success",
      });
      fetchData();
    });
  };

  const handleCrudDelete = (sectionKey, itemId, itemType) => {
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      const updatedList = blogData[sectionKey].filter(
        (item) => item.id !== itemId
      );
      mockApi.saveBlogPageData({ [sectionKey]: updatedList }).then(() => {
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
        Manage Blog & Resources
      </Typography>

      {modalOpen && modalConfig.type === "post" && (
        <BlogPostFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={modalConfig.initialData}
          onSave={(data) => handleCrudSave("posts", data, "Blog Post")}
        />
      )}
      {modalOpen && modalConfig.type === "resource" && (
        <ResourceFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={modalConfig.initialData}
          onSave={(data) => handleCrudSave("resources", data, "Resource")}
        />
      )}

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Blog Posts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {blogData.posts.map((post) => (
              <ListItem
                key={post.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({ type: "post", initialData: post })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete("posts", post.id, "Blog Post")
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Avatar
                  variant="rounded"
                  src={post.imageUrl}
                  sx={{ mr: 2, width: 56, height: 56 }}
                >
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary={post.title}
                  secondary={`By ${post.author} in ${post.category}`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={() => openModal({ type: "post" })}
          >
            Add New Post
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Learning Resources</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {blogData.resources.map((resource) => (
              <ListItem
                key={resource.id}
                secondaryAction={
                  <>
                    <IconButton
                      onClick={() =>
                        openModal({ type: "resource", initialData: resource })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleCrudDelete("resources", resource.id, "Resource")
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <Avatar
                  variant="rounded"
                  src={resource.thumbnailUrl}
                  sx={{ mr: 2, width: 56, height: 56 }}
                >
                  <ImageIcon />
                </Avatar>
                <ListItemText
                  primary={resource.title}
                  secondary={`${resource.type} - ${resource.duration}`}
                />
              </ListItem>
            ))}
          </List>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={() => openModal({ type: "resource" })}
          >
            Add New Resource
          </Button>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default BlogPageAdmin;
