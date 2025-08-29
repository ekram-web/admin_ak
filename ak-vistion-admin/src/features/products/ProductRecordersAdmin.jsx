import React from "react";
import ProductManagementPage from "./components/ProductManagementPage";
import ImageIcon from "@mui/icons-material/Image";

const ProductRecordersAdmin = () => {
  const productFields = [
    { name: "name", label: "Recorder Name", required: true },
    { name: "description", label: "Description", multiline: true, rows: 4 },
    {
      name: "sub_category",
      label: "Sub-Category (e.g., NVR, DVR)",
      required: true,
    },
    { name: "channels", label: "Channels", type: "number" },
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
    { field: "name", headerName: "Recorder Name", flex: 1 },
    { field: "sub_category", headerName: "Sub-Category", width: 180 },
    { field: "channels", headerName: "Channels", width: 120 },
  ];

  return (
    <ProductManagementPage
      key="recorders-page"
      mainCategory="Recorders"
      productFields={productFields}
      columns={columns}
    />
  );
};

export default ProductRecordersAdmin;
