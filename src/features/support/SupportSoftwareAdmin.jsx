import React from "react";
import SupportPageLayout from "./components/SupportPageLayout";

const SupportSoftwareAdmin = () => {
  const columns = [
    { field: "name", headerName: "Software Name", flex: 1 },
    { field: "version", headerName: "Version", width: 150 },
    { field: "size", headerName: "Size", width: 150 },
  ];

  const formFields = [
    { name: "name", label: "Software Name" },
    { name: "version", label: "Version" },
    { name: "size", label: "File Size (e.g., 150.2 MB)" },
    { name: "description", label: "Description", multiline: true, rows: 4 },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["Software", "Firmware", "SDK"],
    },
    { name: "file", label: "Upload File", type: "file" },
  ];

  return (
    <SupportPageLayout
      pageTitle="Software"
      itemType="Software"
      endpoint="/admin/support-files"
      filterFn={(item) => item.type === "Software"}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default SupportSoftwareAdmin;
