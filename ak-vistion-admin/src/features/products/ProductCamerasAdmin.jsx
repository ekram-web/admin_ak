import React from "react";
import ProductManagementPage from "./components/ProductManagementPage";
import ImageIcon from "@mui/icons-material/Image";

const ProductCamerasAdmin = () => {
  const productFields = [
    { name: "name", label: "Camera Name", required: true },
    { name: "description", label: "Description", multiline: true, rows: 4 },
    {
      name: "sub_category",
      label: "Sub-Category (e.g., IP Cameras)",
      required: true,
    },
    { name: "use_case", label: "Use Case (e.g., Indoor)", required: true },
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
    { field: "name", headerName: "Camera Name", flex: 1 },
    { field: "sub_category", headerName: "Sub-Category", width: 180 },
    { field: "use_case", headerName: "Use Case", width: 150 },
  ];

  return (
    <ProductManagementPage
      key="cameras-page"
      mainCategory="Cameras"
      productFields={productFields}
      columns={columns}
    />
  );
};

export default ProductCamerasAdmin;
