import React from "react";
import ProductManagementPage from "./components/ProductManagementPage";
import ImageIcon from "@mui/icons-material/Image";

const ProductRecordersAdmin = () => {
  // Define the fields for the Add/Edit Product modal, specific to Recorders
  const productFields = [
    { name: "name", label: "Recorder Name", required: true },
    { name: "desc", label: "Description", multiline: true, rows: 4 },
    {
      name: "subCategory",
      label: "Sub-Category (e.g., NVR, DVR)",
      required: true,
    },
    { name: "channels", label: "Channels", type: "number" },
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
    { field: "name", headerName: "Recorder Name", flex: 1 },
    { field: "subCategory", headerName: "Sub-Category", width: 180 },
    { field: "channels", headerName: "Channels", width: 120 },
  ];

  return (
    <ProductManagementPage
      key="recorders-page" // Unique key to force re-render
      mainCategory="Recorders"
      productFields={productFields}
      columns={columns}
    />
  );
};

export default ProductRecordersAdmin;
