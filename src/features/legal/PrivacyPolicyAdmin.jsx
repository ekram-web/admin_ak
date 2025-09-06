import React from "react";
import LegalPageLayout from "./components/LegalPageLayout";

const PrivacyPolicyAdmin = () => {
  return (
    <LegalPageLayout
      pageTitle="Privacy Policy"
      dataKey="privacy" // This must match the 'page_key' in the database
    />
  );
};

export default PrivacyPolicyAdmin;
