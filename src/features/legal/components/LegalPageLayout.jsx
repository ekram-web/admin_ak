import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import { useSnackbar } from "notistack";
import apiClient from "../../../api/apiClient";

const LegalPageLayout = ({ pageTitle, dataKey }) => {
  const { enqueueSnackbar } = useSnackbar();
  const editorRef = useRef(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/admin/legal-pages/${dataKey}`);
      setPageData(response.data);
    } catch (error) {
      enqueueSnackbar(`Failed to load ${pageTitle}.`, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataKey]); // Re-fetch when the page changes

  const handleSave = async () => {
    if (editorRef.current) {
      setSaving(true);
      const newContent = editorRef.current.getContent();
      try {
        await apiClient.post(`/admin/legal-pages/${dataKey}`, {
          content: newContent,
        });
        enqueueSnackbar(`${pageTitle} saved successfully!`, {
          variant: "success",
        });
        await fetchData(); // Refresh data to get new "last_updated" timestamp
      } catch (error) {
        enqueueSnackbar(`Failed to save ${pageTitle}.`, { variant: "error" });
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (!pageData)
    return <Typography color="error">Could not load page content.</Typography>;

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
        <Typography variant="h4">{pageTitle}</Typography>
        <Button variant="contained" onClick={handleSave} disabled={saving}>
          {saving ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `Save ${pageTitle}`
          )}
        </Button>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Last Updated: {new Date(pageData.last_updated).toLocaleDateString()}
      </Typography>

      <Editor
        apiKey="7p98meadzz3qxzxpp2573xrwwip5m2y5mdz2i4tub0cm9n80" // IMPORTANT: Get a free key from tiny.cloud
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={pageData.content}
        init={{
          height: "65vh",
          menubar: true,
          plugins:
            "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | link image | bullist numlist | removeformat",
        }}
      />
    </Paper>
  );
};

export default LegalPageLayout;
