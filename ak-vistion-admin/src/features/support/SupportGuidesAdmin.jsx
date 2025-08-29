import React from "react";
import SupportPageLayout from "./components/SupportPageLayout";
import DescriptionIcon from "@mui/icons-material/Description"; // PDF Icon

const SupportGuidesAdmin = () => {
  // Defines the columns shown in the main data table
  const columns = [
    { field: "title", headerName: "Guide Title", flex: 1 },
    { field: "category", headerName: "Category", width: 180 },
  ];

  // Defines the form fields that will appear in the "Add New" and "Edit" modal
  const formFields = [
    {
      name: "title",
      label: "Guide Title",
      required: true,
    },
    {
      name: "category",
      label: "Category (e.g., ITS, Software)",
    },
    {
      name: "instructions",
      label: "Instructions (one per line)",
      multiline: true,
      rows: 5,
    },
    {
      name: "pdfs[]", // The '[]' is important for handling multiple file uploads in Laravel
      label: "Upload PDF Files",
      type: "file",
      multiple: true, // Allows selecting more than one file
      icon: <DescriptionIcon />,
      accept: ".pdf",
    },
  ];

  return (
    <SupportPageLayout
      pageTitle="How-To Guides"
      itemType="Guide"
      endpoint="/admin/guides"
      columns={columns}
      formFields={formFields}
    />
  );
};

export default SupportGuidesAdmin;
