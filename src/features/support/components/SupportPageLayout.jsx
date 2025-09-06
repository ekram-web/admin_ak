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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
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

// --- REUSABLE FORM MODAL ---
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
    onSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {fields.map((field) => {
          if (field.type === "file") {
            return (
              <Button
                key={field.name}
                component="label"
                variant="outlined"
                sx={{ mb: 2, width: "100%" }}
              >
                {field.label}
                <input
                  type="file"
                  name={field.name}
                  hidden
                  multiple={field.multiple}
                />
              </Button>
            );
          }
          if (field.type === "select") {
            return (
              <FormControl key={field.name} fullWidth sx={{ mb: 2 }}>
                <InputLabel>{field.label}</InputLabel>
                <Select
                  name={field.name}
                  label={field.label}
                  defaultValue={initialData?.[field.name] ?? field.options[0]}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
              multiline={field.multiline}
              rows={field.rows}
              type={field.type || "text"}
              sx={{ mb: 2 }}
            />
          );
        })}
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

// --- THE MAIN REUSABLE PAGE LAYOUT (FINAL VERSION) ---
const SupportPageLayout = ({
  pageTitle,
  itemType,
  endpoint,
  columns,
  formFields,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchData = () => {
    if (!loading) setLoading(true);
    // We now send the 'itemType' (e.g., "Firmware") as a query parameter
    // to let the backend do the filtering for the downloads pages.
    const url = endpoint.includes("support-files")
      ? `${endpoint}?type=${itemType}`
      : endpoint;

    apiClient
      .get(url)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar(`Failed to load ${pageTitle}.`, { variant: "error" });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, itemType]); // Re-fetch when itemType changes (e.g., Firmware to SDK)

  const handleSave = async (formData) => {
    setLoading(true);
    handleCloseModal();
    try {
      // For downloads, ensure the 'type' is always included in the form data
      if (endpoint.includes("support-files")) {
        formData.append("type", itemType);
      }

      const isUpdate = !!editingItem?.id;
      const url = isUpdate ? `${endpoint}/${editingItem.id}` : endpoint;

      // For updates with FormData, we must send a POST and spoof the method
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
      enqueueSnackbar(
        `Failed to save ${itemType.toLowerCase()}. Check console for details.`,
        { variant: "error" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (itemId) => {
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      setLoading(true);
      try {
        await apiClient.delete(`${endpoint}/${itemId}`);
        enqueueSnackbar(`${itemType} deleted!`, { variant: "warning" });
        await fetchData();
      } catch (error) {
        enqueueSnackbar(`Failed to delete ${itemType}.`, { variant: "error" });
        setLoading(false);
      }
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingItem(null);
    setModalOpen(false);
  };

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        <IconButton onClick={() => openModal(params.row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      {modalOpen && (
        <FormModal
          open={modalOpen}
          handleClose={handleCloseModal}
          title={`${editingItem ? "Edit" : "Add"} ${itemType}`}
          fields={formFields}
          initialData={editingItem}
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
        <Typography variant="h4">Manage {pageTitle}</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openModal()}
        >
          Add New {itemType}
        </Button>
      </Box>
      <Box sx={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={items}
          columns={[...columns, actionColumn]}
          loading={loading}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
        />
      </Box>
    </Paper>
  );
};

export default SupportPageLayout;
