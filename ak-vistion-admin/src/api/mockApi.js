// This file simulates our Laravel API. We will replace this later.
const mockProducts = [
  {
    id: 1,
    name: "Analog Bullet Camera",
    category: "Cameras",
    useCase: "Outdoor",
    stock: 150,
  },
  {
    id: 2,
    name: "IP Dome Camera",
    category: "Cameras",
    useCase: "Indoor",
    stock: 210,
  },
  {
    id: 3,
    name: "8-Channel NVR",
    category: "Recorders",
    useCase: "N/A",
    stock: 85,
  },
  {
    id: 4,
    name: "12TB Surveillance HDD",
    category: "Storage",
    useCase: "N/A",
    stock: 300,
  },
  {
    id: 5,
    name: "Wireless PTZ Camera",
    category: "Cameras",
    useCase: "Outdoor",
    stock: 95,
  },
];

// --- NEW MOCK DATA ---
const mockBlogPosts = [
  {
    id: 1,
    title: "The Future of AI in Video Surveillance",
    category: "Technology",
    author: "John Smith",
    date: "2025-08-26",
  },
  {
    id: 2,
    title: "Top 5 Security Tips for Retail Stores",
    category: "Industry",
    author: "Sarah Johnson",
    date: "2025-08-22",
  },
];

const mockDownloads = [
  {
    id: 1,
    name: "Firmware_V1.3.4 for DS-1005KI",
    type: "Firmware",
    version: "1.3.4",
    size: "12.5 MB",
  },
  {
    id: 2,
    name: "Device Network SDK_Win64",
    type: "SDK",
    version: "6.1.9",
    size: "338.8 MB",
  },
  {
    id: 3,
    name: "AK-Vistion Pro Client Software",
    type: "Software",
    version: "3.5.0",
    size: "150.2 MB",
  },
];

const mockInquiries = [
  {
    id: 1,
    type: "Sales",
    name: "Bob Johnson",
    email: "bob@example.com",
    subject: "Quote for 50 cameras",
    read: false,
    date: "2025-08-27",
  },
  {
    id: 2,
    type: "Technical",
    name: "Alice Williams",
    email: "alice@example.com",
    subject: "NVR Connection Issue",
    read: true,
    date: "2025-08-26",
  },
  {
    id: 3,
    type: "Subscription",
    name: "Charlie Brown",
    email: "charlie@example.com",
    subject: "New Subscriber",
    read: true,
    date: "2025-08-25",
  },
];

export const mockApi = {
  login: async (username, password) => {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            success: true,
            user: { name: "Admin User" },
            token: "fake-jwt-token",
          }),
        500
      )
    );
  },
  getProducts: async () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: mockProducts }), 500)
    );
  },
  getDashboardStats: async () => {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: { totalProducts: 5, newInquiries: 12, sales: "1,250" },
          }),
        500
      )
    );
  },
  // --- NEW MOCK API FUNCTIONS ---
  getBlogPosts: async () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: mockBlogPosts }), 500)
    );
  },
  getDownloads: async () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: mockDownloads }), 500)
    );
  },
  getInquiries: async () => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ data: mockInquiries }), 500)
    );
  },
};
