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
import { mockApi } from "../../../api/mockApi";

const LegalPageLayout = ({ pageTitle, dataKey }) => {
  const { enqueueSnackbar } = useSnackbar();
  const editorRef = useRef(null);
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    mockApi
      .getLegalData()
      .then((res) => {
        setPageData(res.data[dataKey]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch legal data:", err);
        enqueueSnackbar("Could not load page content.", { variant: "error" });
        setLoading(false);
      });
  }, [dataKey]);

  const handleSave = () => {
    if (editorRef.current) {
      setSaving(true);
      const newContent = editorRef.current.getContent();
      const newPageData = {
        ...pageData,
        content: newContent,
        lastUpdated: new Date().toISOString().split("T")[0],
      };

      mockApi.saveLegalPage(dataKey, newPageData).then(() => {
        enqueueSnackbar(`${pageTitle} saved successfully!`, {
          variant: "success",
        });
        setPageData(newPageData);
        setSaving(false);
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // --- THIS IS THE CRITICAL FIX ---
  // If loading is finished but there's no data, prevent a crash.
  if (!pageData) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" color="error">
          Error: Content could not be loaded.
        </Typography>
        <Typography>Please check the API or mock data source.</Typography>
      </Paper>
    );
  }

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
        Last Updated: {pageData.lastUpdated}
      </Typography>

      <Editor
        apiKey="YOUR_TINYMCE_API_KEY" // IMPORTANT: Get a free key from tiny.cloud
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
