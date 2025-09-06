import React from "react";
import ProductManagementPage from "./components/ProductManagementPage";
import ImageIcon from "@mui/icons-material/Image";

const ProductSwitchesAdmin = () => {
  const productFields = [
    { name: "name", label: "Switch/Accessory Name", required: true },
    { name: "description", label: "Description", multiline: true, rows: 4 },
    {
      name: "sub_category",
      label: "Sub-Category (e.g., PoE Switches)",
      required: true,
    },
    { name: "ports", label: "Ports", type: "number" },
    { name: "buy_now_url", label: "Buy Now URL" },
    {
      name: "image",
      label: "Product Image",
      type: "file",
      icon: <ImageIcon />,
      accept: "image/*",
    },
  ];

  const columns = [
    { field: "name", headerName: "Switch/Accessory Name", flex: 1 },
    { field: "sub_category", headerName: "Sub-Category", width: 200 },
    { field: "ports", headerName: "Ports", width: 120 },
  ];

  return (
    <ProductManagementPage
      key="switches-page"
      mainCategory="Switches"
      productFields={productFields}
      columns={columns}
    />
  );
};

export default ProductSwitchesAdmin;
