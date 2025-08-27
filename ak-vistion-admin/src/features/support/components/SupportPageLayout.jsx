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
import { useSnackbar } from "notistack";
import { mockApi } from "../../../api/mockApi";

// Reusable Modal Style
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
};

// Reusable Form Modal
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
              sx={{ mb: 2, width: "100%" }}
            >
              {field.label}
              <input type="file" hidden multiple={field.multiple} />
            </Button>
          ) : (
            <TextField
              key={field.name}
              name={field.name}
              label={field.label}
              defaultValue={initialData?.[field.name] ?? ""}
              fullWidth
              required
              multiline={field.multiline}
              rows={field.rows}
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

// --- THE MAIN REUSABLE PAGE LAYOUT ---
const SupportPageLayout = ({
  pageTitle,
  itemType,
  dataKey,
  columns,
  formFields,
  filterFn,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchData = () => {
    if (!loading) setLoading(true);
    mockApi.getSupportData().then((res) => {
      let data = res.data[dataKey];
      if (filterFn) {
        data = data.filter(filterFn);
      }
      setItems(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
  }, [dataKey]);

  const handleSave = (itemData) => {
    // Add the 'type' back in for downloads
    if (dataKey === "downloads") {
      itemData.type = itemType;
    }
    mockApi.saveSupportItem(dataKey, itemData).then(() => {
      enqueueSnackbar(
        `${itemType} ${itemData.id ? "updated" : "added"} successfully!`,
        { variant: "success" }
      );
      fetchData();
    });
  };

  const handleDelete = (itemId) => {
    if (window.confirm(`Are you sure you want to delete this ${itemType}?`)) {
      mockApi.deleteSupportItem(dataKey, itemId).then(() => {
        enqueueSnackbar(`${itemType} deleted!`, { variant: "warning" });
        fetchData();
      });
    }
  };

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        <IconButton
          onClick={() => {
            setEditingItem(params.row);
            setModalOpen(true);
          }}
        >
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
          handleClose={() => setModalOpen(false)}
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
          onClick={() => {
            setEditingItem(null);
            setModalOpen(true);
          }}
        >
          Add New {itemType}
        </Button>
      </Box>
      <Box sx={{ height: "70vh", width: "100%" }}>
        <DataGrid
          rows={items}
          columns={[...columns, actionColumn]}
          loading={loading}
        />
      </Box>
    </Paper>
  );
};

export default SupportPageLayout;
