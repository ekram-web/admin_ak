import React from "react";
import SupportPageLayout from "./components/SupportPageLayout";

const SupportGuidesAdmin = () => {
  const columns = [
    { field: "title", headerName: "Guide Title", flex: 1 },
    { field: "category", headerName: "Category", width: 180 },
  ];

  const formFields = [
    { name: "title", label: "Guide Title" },
    { name: "category", label: "Category" },
    {
      name: "instructions",
      label: "Instructions (one per line)",
      multiline: true,
      rows: 5,
    },
    { name: "pdfs", label: "Upload PDF Files", type: "file", multiple: true },
  ];

  return (
    <SupportPageLayout
      pageTitle="How-To Guides"
      itemType="Guide"
      dataKey="guides"
      columns={columns}
      formFields={formFields}
    />
  );
};

export default SupportGuidesAdmin;
