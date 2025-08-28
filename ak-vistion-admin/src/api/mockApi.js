// This file simulates our Laravel API for the ENTIRE website.

// --- MASTER DATA (Represents your database tables) ---
let allProducts = [
  // Cameras
  {
    id: 1,
    name: "Analog Bullet Camera",
    mainCategory: "Cameras",
    subCategory: "Analog Cameras",
    useCase: "Outdoor",
    desc: "Reliable and cost-effective for traditional CCTV setups.",
    imageUrl: "https://picsum.photos/seed/cam1/500/500",
    buyNowUrl: "#",
  },
  {
    id: 2,
    name: "IP Dome Camera",
    mainCategory: "Cameras",
    subCategory: "IP Cameras",
    useCase: "Indoor",
    desc: "Superior image clarity and remote access capabilities.",
    imageUrl: "https://picsum.photos/seed/cam2/500/500",
    buyNowUrl: "#",
  },
  {
    id: 3,
    name: "Wireless PTZ Camera",
    mainCategory: "Cameras",
    subCategory: "Wireless Cameras",
    useCase: "Outdoor",
    desc: "Flexible installation with pan-tilt-zoom functionality.",
    imageUrl: "https://picsum.photos/seed/cam3/500/500",
    buyNowUrl: "#",
  },

  // Recorders
  {
    id: 10,
    name: "8-Channel NVR",
    mainCategory: "Recorders",
    subCategory: "NVR",
    channels: 8,
    desc: "High-performance recording with 4K output.",
    imageUrl: "https://picsum.photos/seed/nvr1/500/500",
    buyNowUrl: "#",
  },
  {
    id: 11,
    name: "16-Channel Hybrid DVR",
    mainCategory: "Recorders",
    subCategory: "DVR",
    channels: 16,
    desc: "Supports both analog and IP cameras for flexible upgrades.",
    imageUrl: "https://picsum.photos/seed/dvr1/500/500",
    buyNowUrl: "#",
  },

  // Switches
  {
    id: 20,
    name: "8-Port PoE Switch",
    mainCategory: "Switches",
    subCategory: "PoE Switches",
    ports: 8,
    desc: "Power up to 8 devices with this compact and efficient PoE switch.",
    imageUrl: "https://picsum.photos/seed/sw1/500/500",
    buyNowUrl: "#",
  },
  {
    id: 21,
    name: "4G Industrial Router",
    mainCategory: "Switches",
    subCategory: "Routers",
    ports: "N/A",
    desc: "Reliable 4G LTE connectivity for demanding environments.",
    imageUrl: "https://picsum.photos/seed/rt1/500/500",
    buyNowUrl: "#",
  },

  // Systems
  {
    id: 30,
    name: "Biometric Access Control",
    mainCategory: "Systems",
    subCategory: "Access Control",
    application: "Corporate",
    desc: "Secure your premises with advanced fingerprint and facial recognition.",
    imageUrl: "https://picsum.photos/seed/ac1/500/500",
    buyNowUrl: "#",
  },
  {
    id: 31,
    name: "Smart Time Attendance",
    mainCategory: "Systems",
    subCategory: "Time Attendance",
    application: "Workforce",
    desc: "Automate employee check-in and manage records with ease.",
    imageUrl: "https://picsum.photos/seed/ta1/500/500",
    buyNowUrl: "#",
  },
];

let allTechnologies = [
  {
    id: 1,
    name: "AcuSense",
    shortDesc: "Pinpoints human and vehicle targets.",
    longDesc: "Our advanced AI distinguishes...",
    imageUrl: "",
  },
  {
    id: 2,
    name: "ColorVu",
    shortDesc: "Captures vivid, full-color video 24/7.",
    longDesc: "Say goodbye to grainy footage.",
    imageUrl: "",
  },
];

let homepageData = {
  hero: {
    title: "Empowering Vision for a Safer World",
    subtitle: "Innovative IoT solutions...",
    videoUrl: "path/to/current/video.mp4",
  },
  featuredItems: [
    {
      id: 1,
      title: "AI Network Cameras",
      description: "High-performance cameras.",
      imageUrl: "https://picsum.photos/seed/p1/800/1000",
    },
  ],
  newsroomVideos: [{ id: 1, videoUrl: "path/to/news1.mp4" }],
};

let aboutPageData = {
  inspiring: {
    preTitle: "About Company",
    title: "Creating Inspiring Security Solutions",
    description: "AK VISTION is a term...",
  },
  process: {
    visionTitle: "Our Vision",
    visionDesc: "To be the global leader...",
    missionTitle: "Our Mission",
    missionDesc: "To provide state-of-the-art...",
    goalTitle: "Our Goal",
    goalDesc: "To deliver exceptional service...",
  },
  promoVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  stats: [
    { id: 1, label: "Years Of Experience", value: 15 },
    { id: 2, label: "Success Projects", value: 600 },
  ],
  team: [
    {
      id: 1,
      name: "William Lucas",
      title: "Co Founder",
      imageUrl: "https://picsum.photos/seed/ceo/400/500",
    },
  ],
  partners: [{ id: 1, name: "Intaz", logoUrl: "/path/to/intaz.svg" }],
};

let servicesPageData = {
  header: {
    title: "Our Services",
    subtitle: "We provide top-tier equipment...",
    imageUrl: "https://picsum.photos/seed/services/600/400",
  },
  productCards: [
    {
      id: 1,
      name: "Security Cameras",
      imageUrl: "https://picsum.photos/seed/camera/600/400",
    },
  ],
  testimonials: [
    {
      id: 1,
      quote: "AKvision's installation team was professional.",
      author: "John Doe",
      company: "CEO, Tech Solutions Inc.",
    },
  ],
  installation: {
    title: "Professional Installation",
    description: "Our certified technicians ensure...",
  },
  processSteps: {
    step1: "Consultation",
    step2: "Site Assessment",
    step3: "Installation",
    step4: "Follow-up",
  },
};

let blogPageData = {
  posts: [
    {
      id: 1,
      title: "The Future of AI",
      category: "Technology",
      author: "John Smith",
      date: "2025-03-15",
      readTime: "5 min read",
      excerpt: "Explore how AI is revolutionizing...",
      imageUrl: "https://picsum.photos/seed/1/600/400",
      content: "<p>Full content.</p>",
    },
  ],
  resources: [
    {
      id: 1,
      title: "Camera Installation Guide",
      type: "Video Tutorial",
      duration: "15 minutes",
      thumbnailUrl: "https://picsum.photos/seed/6/400/300",
      resourceUrl: "#",
    },
  ],
};

let productPagesData = {
  cameras: {
    title: "Cameras",
    intro: "Experience superior image clarity...",
    heroImage: "",
  },
  recorders: {
    title: "Recorders & Storage",
    intro: "Optimize your recording...",
    heroImage: "",
  },
  switches: {
    title: "Switches & Accessories",
    intro: "Build a robust foundation...",
    heroImage: "",
  },
  systems: {
    title: "Systems & Smart Devices",
    intro: "Integrate and automate...",
    heroImage: "",
  },
};

let supportData = {
  downloads: [
    {
      id: 1,
      type: "Firmware",
      name: "Firmware_V1.3.4",
      productModel: "DS-1005KI",
      version: "1.3.4",
    },
    {
      id: 10,
      type: "SDK",
      name: "Device Network SDK_Win64",
      version: "6.1.9.48",
    },
    {
      id: 20,
      type: "Software",
      name: "AK-Vistion Pro Client",
      version: "3.5.0",
    },
  ],
  guides: [{ id: 1, title: "How to install DS-TMG034 radar", category: "ITS" }],
  videos: [
    { id: 1, title: "How to Configure ITS function", date: "2025-07-29" },
  ],
};

let contentData = {
  sales: [
    {
      id: 1,
      name: "Bob Johnson",
      subject: "Quote for cameras",
      read: false,
      date: "2025-08-27",
    },
  ],
  technical: [
    {
      id: 1,
      name: "Alice Williams",
      subject: "NVR Issue",
      read: true,
      date: "2025-08-26",
    },
  ],
  subscriptions: [{ id: 1, email: "charlie@example.com", date: "2025-08-25" }],
};

let faqPageData = {
  faqs: [
    { id: 1, question: "How do I reset my camera?", answer: "To reset..." },
  ],
};

let legalPageData = {
  privacy: { lastUpdated: "2025-08-20", content: "<h1>Privacy Policy</h1>" },
  terms: { lastUpdated: "2025-08-20", content: "<h1>Terms of Use</h1>" },
  cookies: { lastUpdated: "2025-08-20", content: "<h1>Cookie Policy</h1>" },
};

// --- FOOTER DATA ---
let footerData = {
  contactDetails: [
    {
      id: 1,
      type: "Address",
      value: "123 Security Avenue, Tech Park\nNew York, NY 10001",
      icon: "MapPinIcon",
    },
    { id: 2, type: "Phone", value: "+1 (555) 123-4567", icon: "PhoneIcon" },
    { id: 3, type: "Email", value: "info@akvision.com", icon: "EnvelopeIcon" },
    {
      id: 4,
      type: "Hours",
      value: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 2:00 PM",
      icon: "ClockIcon",
    },
  ],
};
// --- MOCK API FUNCTIONS (DEFINITIVE LIST) ---
export const mockApi = {
  // Auth & Dashboard
  login: async () =>
    new Promise((res) =>
      setTimeout(
        () => res({ success: true, user: { name: "Admin User" } }),
        500
      )
    ),
  getDashboardStats: async () =>
    new Promise((res) =>
      setTimeout(
        () =>
          res({
            data: {
              totalProducts: allProducts.length,
              totalPosts: blogPageData.posts.length,
              totalMessages:
                contentData.sales.length + contentData.technical.length,
              unreadMessages:
                contentData.sales.filter((i) => !i.read).length +
                contentData.technical.filter((i) => !i.read).length,
              recentSales: contentData.sales.slice(0, 3),
              recentBlogPosts: blogPageData.posts.slice(0, 3),
            },
          }),
        500
      )
    ),

  // Page Getters
  getHomepageData: async () =>
    new Promise((res) => setTimeout(() => res({ data: homepageData }), 500)),
  getAboutPageData: async () =>
    new Promise((res) => setTimeout(() => res({ data: aboutPageData }), 500)),
  getServicesPageData: async () =>
    new Promise((res) =>
      setTimeout(() => res({ data: servicesPageData }), 500)
    ),
  getBlogPageData: async () =>
    new Promise((res) => setTimeout(() => res({ data: blogPageData }), 500)),
  getFaqPageData: async () =>
    new Promise((res) => setTimeout(() => res({ data: faqPageData }), 500)),
  getLegalData: async () =>
    new Promise((res) => setTimeout(() => res({ data: legalPageData }), 500)),
  getProductPageData: async (category) =>
    new Promise((res) =>
      setTimeout(
        () => res({ data: productPagesData[category.toLowerCase()] }),
        500
      )
    ),
  getSupportData: async () =>
    new Promise((res) => setTimeout(() => res({ data: supportData }), 500)),
  getContentData: async () =>
    new Promise((res) => setTimeout(() => res({ data: contentData }), 500)),

  // CRUD & Save Handlers
  saveHomepageData: async (data) => {
    homepageData = { ...homepageData, ...data };
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  saveAboutPageData: async (data) => {
    aboutPageData = { ...aboutPageData, ...data };
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  saveServicesPageData: async (data) => {
    servicesPageData = { ...servicesPageData, ...data };
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  saveBlogPageData: async (data) => {
    blogPageData = { ...blogPageData, ...data };
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  saveFaq: async (faqData) => {
    if (faqData.id) {
      faqPageData.faqs = faqPageData.faqs.map((f) =>
        f.id === faqData.id ? faqData : f
      );
    } else {
      faqPageData.faqs.push({ ...faqData, id: Date.now() });
    }
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  deleteFaq: async (faqId) => {
    faqPageData.faqs = faqPageData.faqs.filter((f) => f.id !== faqId);
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  saveLegalPage: async (key, data) => {
    legalPageData[key] = data;
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  saveProductPageData: async (cat, data) => {
    productPagesData[cat.toLowerCase()] = data;
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  saveSupportItem: async (key, item) => {
    if (item.id) {
      supportData[key] = supportData[key].map((i) =>
        i.id === item.id ? item : i
      );
    } else {
      supportData[key].push({ ...item, id: Date.now() });
    }
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  deleteSupportItem: async (key, id) => {
    supportData[key] = supportData[key].filter((i) => i.id !== id);
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },

  // Resource Getters
  getTechnologies: async () =>
    new Promise((res) => setTimeout(() => res({ data: allTechnologies }), 500)),
  getBlogPost: async (id) =>
    new Promise((res) =>
      setTimeout(
        () =>
          res({ data: blogPageData.posts.find((p) => p.id === parseInt(id)) }),
        500
      )
    ),
  getProductsByCategory: async (category) =>
    new Promise((res) =>
      setTimeout(
        () =>
          res({
            data: allProducts.filter(
              (p) => p.mainCategory.toLowerCase() === category.toLowerCase()
            ),
          }),
        500
      )
    ),

  // Resource Savers
  saveProduct: async (productData) => {
    if (productData.id) {
      allProducts = allProducts.map((p) =>
        p.id === productData.id ? productData : p
      );
    } else {
      allProducts.push({ ...productData, id: Date.now() });
    }
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  deleteProduct: async (productId) => {
    allProducts = allProducts.filter((p) => p.id !== productId);
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },

  getFooterData: async () =>
    new Promise((res) => setTimeout(() => res({ data: footerData }), 500)),

  saveFooterContactDetail: async (detailData) => {
    if (detailData.id) {
      // Update
      footerData.contactDetails = footerData.contactDetails.map((d) =>
        d.id === detailData.id ? { ...d, ...detailData } : d
      );
    } else {
      // Create
      const newId =
        Math.max(...footerData.contactDetails.map((d) => d.id), 0) + 1;
      footerData.contactDetails.push({ ...detailData, id: newId });
    }
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },

  deleteFooterContactDetail: async (detailId) => {
    footerData.contactDetails = footerData.contactDetails.filter(
      (d) => d.id !== detailId
    );
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
};
