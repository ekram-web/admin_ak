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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import { useSnackbar } from "notistack";
import apiClient from "../../../api/apiClient";

// --- STYLES FOR MODALS ---
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(400px, 70vw, 800px)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "90vh",
  overflowY: "auto",
};

// --- REUSABLE PRODUCT FORM MODAL ---
const ProductFormModal = ({
  open,
  handleClose,
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
          {initialData?.id ? "Edit" : "Add"} Product
        </Typography>
        {fields.map((field) => {
          if (field.type === "file") {
            return (
              <Button
                key={field.name}
                component="label"
                variant="outlined"
                startIcon={<ImageIcon />}
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
            );
          }
          return (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              defaultValue={initialData?.[field.name] ?? ""}
              fullWidth
              required={field.required}
              type={field.type || "text"}
              multiline={field.multiline}
              rows={field.rows}
              sx={{ mb: 2 }}
            />
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Product
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// --- REUSABLE PAGE CONTENT MODAL ---
const PageContentModal = ({ open, handleClose, data, onSave }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(new FormData(event.currentTarget));
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Edit Page Content
        </Typography>
        <TextField
          name="title"
          label="Page Title"
          defaultValue={data?.title}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          name="intro_text"
          label="Introductory Text"
          defaultValue={data?.intro_text}
          fullWidth
          required
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <Button
          component="label"
          variant="outlined"
          startIcon={<ImageIcon />}
          sx={{ mb: 2, width: "100%" }}
        >
          Upload Hero Image
          <input type="file" name="hero_image" accept="image/*" hidden />
        </Button>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save Content
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// --- THE MAIN REUSABLE COMPONENT (FINAL VERSION) ---
const ProductManagementPage = ({ mainCategory, productFields, columns }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [pageContent, setPageContent] = useState({});
  const [products, setProducts] = useState([]);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchData = async () => {
    if (!loading) setLoading(true);
    try {
      const [contentRes, productsRes] = await Promise.all([
        apiClient.get(`/admin/product-pages/${mainCategory.toLowerCase()}`),
        apiClient.get(`/admin/products?category=${mainCategory}`),
      ]);
      setPageContent(contentRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error("Failed to load product data:", error);
      enqueueSnackbar("Failed to load data. Please try again.", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [mainCategory]);

  const handleSaveProduct = async (formData) => {
    setLoading(true);
    handleCloseModal();
    try {
      formData.append("main_category", mainCategory);
      const isUpdate = !!editingProduct?.id;
      const url = isUpdate
        ? `/admin/products/${editingProduct.id}`
        : "/admin/products";

      // For updates with FormData, we must send a POST and spoof the method
      // if (isUpdate) {
      //   formData.append("_method", "PUT");
      // }

      await apiClient.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      enqueueSnackbar(
        `Product ${isUpdate ? "updated" : "added"} successfully!`,
        { variant: "success" }
      );
      await fetchData();
    } catch (error) {
      console.error(error.response?.data);
      enqueueSnackbar("Failed to save product.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        await apiClient.delete(`/admin/products/${productId}`);
        enqueueSnackbar("Product deleted!", { variant: "warning" });
        await fetchData();
      } catch (error) {
        enqueueSnackbar("Failed to delete product.", { variant: "error" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSavePageContent = async (formData) => {
    setLoading(true);
    handleCloseModal();
    try {
      // Laravel needs POST for multipart/form-data, even for updates.
      // We are using a dedicated POST route for this update.
      await apiClient.post(
        `/admin/product-pages/${mainCategory.toLowerCase()}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      enqueueSnackbar("Page content updated successfully!", {
        variant: "success",
      });
      await fetchData();
    } catch (error) {
      enqueueSnackbar("Failed to update page content.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setProductModalOpen(false);
    setContentModalOpen(false);
    setEditingProduct(null);
  };

  const finalColumns = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <Box>
          <IconButton
            onClick={() => {
              setEditingProduct(params.row);
              setProductModalOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteProduct(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (loading && !products.length)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <ProductFormModal
        open={productModalOpen}
        handleClose={handleCloseModal}
        fields={productFields}
        initialData={editingProduct}
        onSave={handleSaveProduct}
      />
      <PageContentModal
        open={contentModalOpen}
        handleClose={handleCloseModal}
        data={pageContent}
        onSave={handleSavePageContent}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">
          Manage {pageContent.title || mainCategory}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => setContentModalOpen(true)}
          >
            Edit Page Content
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingProduct(null);
              setProductModalOpen(true);
            }}
          >
            Add Product
          </Button>
        </Box>
      </Box>
      <Typography paragraph color="text.secondary">
        {pageContent.intro_text}
      </Typography>
      <Box sx={{ height: "65vh", width: "100%" }}>
        <DataGrid
          rows={products}
          columns={finalColumns}
          loading={loading}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
        />
      </Box>
    </Paper>
  );
};

export default ProductManagementPage;
