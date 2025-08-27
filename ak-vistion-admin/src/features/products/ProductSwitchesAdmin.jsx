import React from "react";
import ProductManagementPage from "./components/ProductManagementPage";
import ImageIcon from "@mui/icons-material/Image";

const ProductSwitchesAdmin = () => {
  // Define the fields for the Add/Edit Product modal, specific to Switches
  const productFields = [
    { name: "name", label: "Switch/Accessory Name", required: true },
    { name: "desc", label: "Description", multiline: true, rows: 4 },
    {
      name: "subCategory",
      label: "Sub-Category (e.g., PoE Switches)",
      required: true,
    },
    { name: "ports", label: "Ports", type: "number" },
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
    { field: "name", headerName: "Switch/Accessory Name", flex: 1 },
    { field: "subCategory", headerName: "Sub-Category", width: 200 },
    { field: "ports", headerName: "Ports", width: 120 },
  ];

  return (
    <ProductManagementPage
      key="switches-page" // Unique key to force re-render
      mainCategory="Switches"
      productFields={productFields}
      columns={columns}
    />
  );
};

export default ProductSwitchesAdmin;
