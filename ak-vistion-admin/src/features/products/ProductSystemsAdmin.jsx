import React from "react";
import ProductManagementPage from "./components/ProductManagementPage";
import ImageIcon from "@mui/icons-material/Image";

const ProductSystemsAdmin = () => {
  // Define the fields for the Add/Edit Product modal, specific to Systems
  const productFields = [
    { name: "name", label: "System/Device Name", required: true },
    { name: "desc", label: "Description", multiline: true, rows: 4 },
    {
      name: "subCategory",
      label: "Sub-Category (e.g., Access Control)",
      required: true,
    },
    { name: "application", label: "Application (e.g., Corporate)" },
    { name: "buyNowUrl", label: "Buy Now URL" },
    {
      name: "image",
      label: "Product Image",
      type: "file",
      icon: <ImageIcon />,
      accept: "image/*",
    },
  ];

  // Define the columns for the Data Grid
  const columns = [
    { field: "name", headerName: "System/Device Name", flex: 1 },
    { field: "subCategory", headerName: "Sub-Category", width: 200 },
    { field: "application", headerName: "Application", width: 150 },
  ];

  return (
    <ProductManagementPage
      key="systems-page" // Unique key to force re-render
      mainCategory="Systems"
      productFields={productFields}
      columns={columns}
    />
  );
};

export default ProductSystemsAdmin;
