import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Paper, Tabs, Tab } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockApi } from "../../api/mockApi";
import AddIcon from "@mui/icons-material/Add";

const DownloadsPage = () => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("All");

  useEffect(() => {
    mockApi.getDownloads().then((response) => {
      setDownloads(response.data);
      setLoading(false);
    });
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const filteredDownloads = downloads.filter(
    (d) => tab === "All" || d.type === tab
  );

  const columns = [
    { field: "name", headerName: "File Name", flex: 1 },
    { field: "type", headerName: "Type", width: 120 },
    { field: "version", headerName: "Version", width: 100 },
    { field: "size", headerName: "File Size", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 180,
      renderCell: () => (
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
        <Typography variant="h4">Manage Downloads</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Upload File
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="All" value="All" />
          <Tab label="Firmware" value="Firmware" />
          <Tab label="SDK" value="SDK" />
          <Tab label="Software" value="Software" />
        </Tabs>
      </Box>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredDownloads}
          columns={columns}
          loading={loading}
          sx={{ border: 0 }}
        />
      </Box>
    </Paper>
  );
};

export default DownloadsPage;
