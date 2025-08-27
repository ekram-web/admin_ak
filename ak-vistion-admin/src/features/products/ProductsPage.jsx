import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockApi } from "../../api/mockApi";
import AddIcon from "@mui/icons-material/Add";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getProducts().then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "useCase", headerName: "Use Case", width: 150 },
    { field: "stock", headerName: "Stock", type: "number", width: 110 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <>
          <Button variant="outlined" size="small" sx={{ mr: 1 }}>
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
        <Typography variant="h4">Manage Products</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Product
        </Button>
      </Box>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
          loading={loading}
          sx={{ border: 0 }}
        />
      </Box>
    </Paper>
  );
};

export default ProductsPage;
