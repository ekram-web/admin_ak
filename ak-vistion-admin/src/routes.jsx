import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts and Core Pages
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./features/dashboard/DashboardPage";

// Page Management Components
import HomePageAdmin from "./features/pages/HomePageAdmin";
import AboutPageAdmin from "./features/pages/AboutPageAdmin";
import ServicesPageAdmin from "./features/pages/ServicesPageAdmin";
import BlogPageAdmin from "./features/pages/BlogPageAdmin";
import FaqPageAdmin from "./features/pages/FaqPageAdmin";

// Product Management Components
import ProductCamerasAdmin from "./features/products/ProductCamerasAdmin";
import ProductRecordersAdmin from "./features/products/ProductRecordersAdmin";
import ProductSwitchesAdmin from "./features/products/ProductSwitchesAdmin";
import ProductSystemsAdmin from "./features/products/ProductSystemsAdmin";

// Support Management Components
import SupportFirmwareAdmin from "./features/support/SupportFirmwareAdmin";
import SupportSdkAdmin from "./features/support/SupportSdkAdmin";
import SupportSoftwareAdmin from "./features/support/SupportSoftwareAdmin";
import SupportGuidesAdmin from "./features/support/SupportGuidesAdmin";
import SupportVideosAdmin from "./features/support/SupportVideosAdmin";

// Content (Inbox) Management Components
import ContentSalesAdmin from "./features/content/ContentSalesAdmin";
import ContentTechnicalAdmin from "./features/content/ContentTechnicalAdmin";
import ContentSubscriptionsAdmin from "./features/content/ContentSubscriptionsAdmin";

// Legal Page Management Components
import PrivacyPolicyAdmin from "./features/legal/PrivacyPolicyAdmin";
import TermsOfUseAdmin from "./features/legal/TermsOfUseAdmin";
import CookiePolicyAdmin from "./features/legal/CookiePolicyAdmin";

import FooterContactAdmin from "./features/pages/FooterContactAdmin"; 

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/*"
      element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<DashboardPage />} />

      {/* Pages Routes */}
      <Route path="pages/home" element={<HomePageAdmin />} />
      <Route path="pages/about" element={<AboutPageAdmin />} />
      <Route path="pages/services" element={<ServicesPageAdmin />} />
      <Route path="pages/blog" element={<BlogPageAdmin />} />
      <Route path="pages/faq" element={<FaqPageAdmin />} />
      <Route path="pages/footer-contact" element={<FooterContactAdmin />} />

      {/* Product Routes */}
      <Route path="products/cameras" element={<ProductCamerasAdmin />} />
      <Route path="products/recorders" element={<ProductRecordersAdmin />} />
      <Route path="products/switches" element={<ProductSwitchesAdmin />} />
      <Route path="products/systems" element={<ProductSystemsAdmin />} />

      {/* Support Routes */}
      <Route
        path="support/downloads/firmware"
        element={<SupportFirmwareAdmin />}
      />
      <Route path="support/downloads/sdk" element={<SupportSdkAdmin />} />
      <Route
        path="support/downloads/software"
        element={<SupportSoftwareAdmin />}
      />
      <Route path="support/howto/guides" element={<SupportGuidesAdmin />} />
      <Route path="support/howto/videos" element={<SupportVideosAdmin />} />

      {/* Content (Inbox) Routes */}
      <Route path="content/sales" element={<ContentSalesAdmin />} />
      <Route path="content/technical" element={<ContentTechnicalAdmin />} />
      <Route
        path="content/subscriptions"
        element={<ContentSubscriptionsAdmin />}
      />

      {/* Legal Routes */}
      <Route path="legal/privacy-policy" element={<PrivacyPolicyAdmin />} />
      <Route path="legal/terms-of-use" element={<TermsOfUseAdmin />} />
      <Route path="legal/cookie-policy" element={<CookiePolicyAdmin />} />
    </Route>
  </Routes>
);

export default AppRoutes;
