import React from "react";
import SupportPageLayout from "./components/SupportPageLayout";

const SupportFirmwareAdmin = () => {
  const columns = [
    { field: "name", headerName: "Firmware Name", flex: 1 },
    { field: "productModel", headerName: "Product Model", width: 200 },
    { field: "version", headerName: "Version", width: 150 },
    { field: "releaseDate", headerName: "Release Date", width: 150 },
  ];

  const formFields = [
    { name: "name", label: "Firmware Name" },
    { name: "productModel", label: "Product Model" },
    { name: "version", label: "Version" },
    { name: "releaseDate", label: "Release Date", type: "date" },
    { name: "size", label: "File Size (e.g., 15.2 MB)" },
    { name: "file", label: "Upload File", type: "file" },
  ];

  return (
    <SupportPageLayout
      pageTitle="Firmware"
      itemType="Firmware"
      dataKey="downloads"
      filterFn={(item) => item.type === "Firmware"}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default SupportFirmwareAdmin;
