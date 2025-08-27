import React, { useRef, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useSnackbar } from "notistack";
import { mockApi } from "../../api/mockApi";

const BlogPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const editorRef = useRef(null);
  const isEditing = Boolean(id);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      mockApi.getBlogPost(id).then((response) => {
        setPost(response.data);
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      console.log({
        // Here you would get all form values
        // title: ...,
        content: content,
      });
      enqueueSnackbar(
        `Post ${isEditing ? "updated" : "created"} successfully!`,
        { variant: "success" }
      );
      navigate("/pages/blog");
    }
  };

  if (isEditing && loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? `Edit Post: ${post?.title}` : "Create New Blog Post"}
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Post Title"
              fullWidth
              defaultValue={post?.title ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Author"
              fullWidth
              defaultValue={post?.author ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Category"
              fullWidth
              defaultValue={post?.category ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Read Time (e.g., 5 min read)"
              fullWidth
              defaultValue={post?.readTime ?? ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              component="label"
              variant="outlined"
              fullWidth
              sx={{ height: "100%" }}
            >
              Upload Featured Image
              <input type="file" accept="image/*" hidden />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Excerpt / Short Summary"
              fullWidth
              multiline
              rows={3}
              defaultValue={post?.excerpt ?? ""}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Main Content
        </Typography>
        <Editor
          apiKey="YOUR_TINYMCE_API_KEY" // IMPORTANT: Get a free key from tiny.cloud
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue={
            post?.content ?? "<p>Write your amazing blog post here.</p>"
          }
          init={{
            height: 500,
            menubar: false,
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
        />

        <Box
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
        >
          <Button variant="outlined" onClick={() => navigate("/pages/blog")}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Post
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BlogPostForm;
