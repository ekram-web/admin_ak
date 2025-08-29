import React from "react";
import LegalPageLayout from "./components/LegalPageLayout";

const TermsOfUseAdmin = () => {
  return (
    <LegalPageLayout
      pageTitle="Terms of Use"
      dataKey="terms" // This must match the 'page_key' in the database
    />
  );
};

export default TermsOfUseAdmin;
