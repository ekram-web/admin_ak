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
};
