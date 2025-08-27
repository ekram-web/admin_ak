import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

const BlogPostForm = () => {
  const { id } = useParams(); // Check if we are editing an existing post
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const isEditing = Boolean(id);

  const handleSave = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent()); // Here's your rich text content
      // Add logic to save the post...
      navigate("/blog"); // Go back to the list after saving
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
      </Typography>
      <Box component="form" noValidate autoComplete="off">
        <TextField label="Post Title" fullWidth sx={{ mb: 3 }} />
        <TextField label="Author" sx={{ mb: 3, mr: 2 }} />
        <TextField label="Category" sx={{ mb: 3 }} />

        {/* --- RICH TEXT EDITOR --- */}
        <Editor
          apiKey="YOUR_TINYMCE_API_KEY" // Get a free key from tiny.cloud
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>Write your amazing blog post here.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
        />

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => navigate("/blog")}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ ml: 2 }}>
            Save Post
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default BlogPostForm;
