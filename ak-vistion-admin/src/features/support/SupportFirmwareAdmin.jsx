import React from "react";
import SupportPageLayout from "./components/SupportPageLayout";

const SupportFirmwareAdmin = () => {
  const columns = [
    { field: "name", headerName: "Firmware Name", flex: 1 },
    { field: "product_model", headerName: "Product Model", width: 200 },
    { field: "version", headerName: "Version", width: 150 },
  ];

  const formFields = [
    { name: "name", label: "Firmware Name" },
    { name: "product_model", label: "Product Model" },
    { name: "version", label: "Version" },
    {
      name: "type",
      label: "Type",
      type: "select",
      options: ["Firmware", "SDK", "Software"],
    },
    { name: "file", label: "Upload File", type: "file" },
  ];

  return (
    <SupportPageLayout
      pageTitle="Firmware"
      itemType="Firmware"
      endpoint="/admin/support-files"
      filterFn={(item) => item.type === "Firmware"}
      columns={columns}
      formFields={formFields}
    />
  );
};

export default SupportFirmwareAdmin;
