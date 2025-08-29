import React from "react";
import LegalPageLayout from "./components/LegalPageLayout";
const CookiePolicyAdmin = () => {
  return (
    <LegalPageLayout
      pageTitle="Cookie Policy"
      dataKey="cookies" // This must match the 'page_key' in the database
    />
  );
};

export default CookiePolicyAdmin;