import React from "react";
import ProductManagementPage from "./components/ProductManagementPage";
import ImageIcon from "@mui/icons-material/Image";

const ProductSystemsAdmin = () => {
  const productFields = [
    { name: "name", label: "System/Device Name", required: true },
    { name: "description", label: "Description", multiline: true, rows: 4 },
    {
      name: "sub_category",
      label: "Sub-Category (e.g., Access Control)",
      required: true,
    },
    { name: "application", label: "Application (e.g., Corporate)" },
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
    { field: "name", headerName: "System/Device Name", flex: 1 },
    { field: "sub_category", headerName: "Sub-Category", width: 200 },
    { field: "application", headerName: "Application", width: 150 },
  ];

  return (
    <ProductManagementPage
      key="systems-page"
      mainCategory="Systems"
      productFields={productFields}
      columns={columns}
    />
  );
};

export default ProductSystemsAdmin;
