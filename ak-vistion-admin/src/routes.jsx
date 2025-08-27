import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts and Pages
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/LoginPage";

// Feature Components
import DashboardPage from "./features/dashboard/DashboardPage";
import ProductsPage from "./features/products/ProductsPage";
import BlogPage from "./features/blog/BlogPage";
import BlogPostForm from "./features/blog/BlogPostForm";
import DownloadsPage from "./features/downloads/DownloadsPage";
import InquiriesPage from "./features/inquiries/InquiriesPage";
import ContentPage from "./features/content/ContentPage";

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
      <Route path="products" element={<ProductsPage />} />

      {/* --- NEW ROUTES --- */}
      <Route path="blog" element={<BlogPage />} />
      <Route path="blog/new" element={<BlogPostForm />} />
      <Route path="blog/edit/:id" element={<BlogPostForm />} />
      <Route path="downloads" element={<DownloadsPage />} />
      <Route path="inquiries" element={<InquiriesPage />} />
      <Route path="content" element={<ContentPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
