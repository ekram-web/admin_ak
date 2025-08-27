import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../../api/mockApi";
import AddIcon from "@mui/icons-material/Add";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockApi.getBlogPosts().then((response) => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
            onClick={() => navigate(`/blog/edit/${params.row.id}`)}
          >
            Edit
          </Button>
          <Button variant="outlined" size="small" color="error">
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
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
          onClick={() => navigate("/blog/new")}
        >
          Add Post
        </Button>
      </Box>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={posts}
          columns={columns}
          loading={loading}
          sx={{ border: 0 }}
        />
      </Box>
    </Paper>
  );
};

export default BlogPage;
