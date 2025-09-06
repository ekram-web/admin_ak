import React, { useState, useEffect, useRef } from "react";
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
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { Editor } from "@tinymce/tinymce-react";
import { useSnackbar } from "notistack";
import apiClient from "../../api/apiClient";

// --- STYLES FOR MODALS (This is correct) ---
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

// --- FORM MODAL for Blog Posts (FINAL CORRECTED VERSION) ---
const BlogPostFormModal = ({ open, handleClose, data, onSave }) => {
  const editorRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  // --- CRITICAL IMAGE UPLOAD HANDLER ---
  // This function is called by the editor when you choose an image.
  const imageUploadHandler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      // We will need a new, simple controller in Laravel for this.
      // For now, this call will fail, but the structure is correct.
      apiClient
        .post("/admin/editor-image-upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (!response.data || !response.data.location) {
            reject("Invalid JSON response from server");
            return;
          }
          // The backend MUST return a JSON object with a "location" property
          // Example: { location: 'http://127.0.0.1:8000/storage/editor-uploads/xyz.jpg' }
          resolve(response.data.location);
        })
        .catch((err) => {
          reject(`Image upload failed: ${err.message}`);
          enqueueSnackbar("Image upload inside editor failed.", {
            variant: "error",
          });
        });
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (editorRef.current) {
      formData.append("content", editorRef.current.getContent());
    }
    onSave(formData);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {data?.id ? `Edit Post: ${data.title}` : "Create New Blog Post"}
        </Typography>
        <TextField
          name="title"
          label="Post Title"
          fullWidth
          required
          sx={{ mb: 2 }}
          defaultValue={data?.title ?? ""}
        />
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            name="author"
            label="Author"
            fullWidth
            defaultValue={data?.author ?? ""}
          />
          <TextField
            name="category"
            label="Category"
            fullWidth
            defaultValue={data?.category ?? ""}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            name="date"
            label="Date (e.g., March 15, 2024)"
            fullWidth
            defaultValue={data?.date ?? ""}
          />
          <TextField
            name="read_time"
            label="Read Time (e.g., 5 min read)"
            fullWidth
            defaultValue={data?.read_time ?? ""}
          />
        </Box>
        <TextField
          name="excerpt"
          label="Excerpt / Short Summary"
          fullWidth
          multiline
          rows={3}
          required
          sx={{ mb: 2 }}
          defaultValue={data?.excerpt ?? ""}
        />
        <Button
          component="label"
          variant="outlined"
          startIcon={<ImageIcon />}
          fullWidth
          sx={{ mb: 2 }}
        >
          Upload Featured Image
          <input type="file" name="image" accept="image/*" hidden />
        </Button>
        <Typography variant="subtitle1" sx={{ mb: 1, color: "text.secondary" }}>
          Main Content
        </Typography>
        <Editor
          // --- PASTE YOUR REAL API KEY HERE ---
          apiKey="k9afunq1eckzt1z9skcz31ex7rqxcc59zzcthny5hva5b339"
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={
            data?.content ?? "<p>Write your amazing blog post here.</p>"
          }
          init={{
            height: 500,
            menubar: false,
            plugins:
              "anchor autolink charmap codesample image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks | bold italic underline | link image | bullist numlist | removeformat",

            // --- THIS ENABLES THE IMAGE UPLOAD BUTTON ---
            images_upload_handler: imageUploadHandler,
            relative_urls: false,
            remove_script_host: false,
            automatic_uploads: true, // This is a good practice
            file_picker_types: "image", // Only allow image uploads
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

// --- MAIN ADMIN PAGE COMPONENT (FINAL INTEGRATED VERSION) ---
const BlogPageAdmin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const fetchData = async () => {
    if (!loading) setLoading(true);
    try {
      const response = await apiClient.get("/admin/blog-posts");
      setPosts(response.data);
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to load blog posts!", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (data = null) => {
    setEditingPost(data);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setEditingPost(null);
    setModalOpen(false);
  };

  const handleSave = async (formData) => {
    setLoading(true);
    handleCloseModal();
    try {
      const isUpdate = !!editingPost?.id;
      const url = isUpdate
        ? `/admin/blog-posts/${editingPost.id}`
        : "/admin/blog-posts";
      if (isUpdate) {
        formData.append("_method", "POST");
      }

      await apiClient.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar(
        `Blog Post ${isUpdate ? "updated" : "added"} successfully!`,
        { variant: "success" }
      );
      await fetchData();
    } catch (error) {
      console.error(error.response?.data);
      enqueueSnackbar("Failed to save blog post.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setLoading(true);
      try {
        await apiClient.delete(`/admin/blog-posts/${postId}`);
        enqueueSnackbar("Blog post deleted!", { variant: "warning" });
        await fetchData();
      } catch (error) {
        enqueueSnackbar("Failed to delete blog post.", { variant: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading && posts.length === 0)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {modalOpen && (
        <BlogPostFormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          data={editingPost}
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
        <Typography variant="h4">Manage Blog Posts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
        >
          Add New Post
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}

      <List>
        {posts.map((post) => (
          <ListItem
            key={post.id}
            secondaryAction={
              <>
                <IconButton onClick={() => openModal(post)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(post.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            sx={{ borderBottom: "1px solid #eee" }}
          >
            <Avatar
              variant="rounded"
              src={
                post.image_url
                  ? `http://127.0.0.1:8000/storage/${post.image_url}`
                  : ""
              }
              sx={{ mr: 2, width: 80, height: 80, bgcolor: "grey.300" }}
            >
              <ImageIcon />
            </Avatar>
            <ListItemText
              primary={post.title}
              secondary={`By ${post.author || "N/A"} in ${
                post.category || "Uncategorized"
              }`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default BlogPageAdmin;
