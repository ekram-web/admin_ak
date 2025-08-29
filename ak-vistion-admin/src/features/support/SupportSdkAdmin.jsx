import React from "react";
import SupportPageLayout from "./components/SupportPageLayout";

const SupportSdkAdmin = () => {
  const columns = [
    { field: "name", headerName: "SDK Name", flex: 1 },
    { field: "version", headerName: "Version", width: 150 },
    { field: "size", headerName: "Size", width: 150 },
  ];

  const formFields = [
    { name: "name", label: "SDK Name" },
    { name: "version", label: "Version" },
    { name: "size", label: "File Size (e.g., 12.5 MB)" },
    { name: "description", label: "Description", multiline: true, rows: 4 },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["SDK", "Firmware", "Software"],
    },
    { name: "file", label: "Upload File", type: "file" },
  ];

  return (
    <SupportPageLayout
      pageTitle="SDK"
      itemType="SDK"
      endpoint="/admin/support-files"
      filterFn={(item) => item.type === "SDK"}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default SupportSdkAdmin;
