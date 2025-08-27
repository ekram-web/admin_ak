import React from "react";
import ProductManagementPage from "./components/ProductManagementPage";
import ImageIcon from "@mui/icons-material/Image";

const ProductCamerasAdmin = () => {
  // Define the fields for the Add/Edit Product modal, specific to Cameras
  const productFields = [
    { name: "name", label: "Camera Name", required: true },
    { name: "desc", label: "Description", multiline: true, rows: 4 },
    {
      name: "subCategory",
      label: "Sub-Category (e.g., IP Cameras)",
      required: true,
    },
    { name: "useCase", label: "Use Case (e.g., Indoor)", required: true },
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
    { field: "name", headerName: "Camera Name", flex: 1 },
    { field: "subCategory", headerName: "Sub-Category", width: 180 },
    { field: "useCase", headerName: "Use Case", width: 150 },
  ];

  return (
    <ProductManagementPage
      key="cameras-page" // Unique key to force re-render
      mainCategory="Cameras"
      productFields={productFields}
      columns={columns}
    />
  );
};

export default ProductCamerasAdmin;
