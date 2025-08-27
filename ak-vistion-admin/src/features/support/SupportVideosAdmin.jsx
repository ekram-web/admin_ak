import React from "react";
import SupportPageLayout from "./components/SupportPageLayout";

const SupportVideosAdmin = () => {
  const columns = [
    { field: "title", headerName: "Video Title", flex: 1 },
    { field: "date", headerName: "Date", width: 150 },
  ];

  const formFields = [
    { name: "title", label: "Video Title" },
    { name: "description", label: "Description", multiline: true, rows: 4 },
    { name: "date", label: "Date", type: "date" },
    { name: "thumbnail", label: "Upload Thumbnail", type: "file" },
  ];

  return (
    <SupportPageLayout
      pageTitle="How-To Videos"
      itemType="Video"
      dataKey="videos"
      columns={columns}
      formFields={formFields}
    />
  );
};

export default SupportVideosAdmin;
