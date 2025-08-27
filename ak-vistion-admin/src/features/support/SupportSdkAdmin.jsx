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
    { name: "size", label: "File Size (e.g., 338.8 MB)" },
    { name: "description", label: "Description", multiline: true, rows: 4 },
    { name: "file", label: "Upload File", type: "file" },
  ];

  return (
    <SupportPageLayout
      pageTitle="SDK"
      itemType="SDK"
      dataKey="downloads"
      filterFn={(item) => item.type === "SDK"}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default SupportSdkAdmin;
