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
    longDesc:
      "Our advanced AI distinguishes between genuine threats and irrelevant movements, providing you with alerts that are both timely and precise.",
    imageUrl: "https://picsum.photos/seed/blueprint1/1200/800",
  },
  {
    id: 2,
    name: "ColorVu",
    shortDesc: "Captures vivid, full-color video 24/7.",
    longDesc:
      "Say goodbye to grainy black-and-white footage. ColorVu technology uses advanced sensors and supplemental lighting to render clear, colorful details around the clock.",
    imageUrl: "https://picsum.photos/seed/blueprint2/1200/800",
  },
];

let homepageData = {
  hero: {
    title: "Empowering Vision for a Safer World",
    subtitle: "Innovative IoT solutions with video as the core competency",
    videoUrl: "path/to/current/video.mp4",
  },
  featuredItems: [
    {
      id: 1,
      title: "AI Network Cameras",
      description: "High-performance cameras with AI analytics.",
      imageUrl: "https://picsum.photos/seed/p1/800/1000",
    },
    {
      id: 2,
      title: "Intelligent NVRs",
      description: "Reliable storage with smart search capabilities.",
      imageUrl: "https://picsum.photos/seed/p2/800/1000",
    },
  ],
  newsroomVideos: [
    { id: 1, videoUrl: "path/to/news1.mp4" },
    { id: 2, videoUrl: "path/to/news2.mp4" },
    { id: 3, videoUrl: "path/to/news3.mp4" },
  ],
};

let aboutPageData = {
  inspiring: {
    preTitle: "About Company",
    title: "Creating Inspiring Security Solutions",
    description:
      "AK VISTION is a term used to refer to an organized collection of technology, systems, and processes engineered to provide unparalleled security and peace of mind.",
  },
  process: {
    visionTitle: "Our Vision",
    visionDesc:
      "To be the global leader in security, creating a safer world through continuous innovation.",
    missionTitle: "Our Mission",
    missionDesc:
      "To provide state-of-the-art, reliable, and user-friendly systems that protect what matters most.",
    goalTitle: "Our Goal",
    goalDesc:
      "To deliver exceptional service and support, ensuring total client satisfaction and peace of mind.",
  },
  promoVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  stats: [
    { id: 1, label: "Years Of Experience", value: 15 },
    { id: 2, label: "Success Projects", value: 600 },
    { id: 3, label: "Team Members", value: 40 },
  ],
  team: [
    {
      id: 1,
      name: "William Lucas",
      title: "Co Founder",
      imageUrl: "https://picsum.photos/seed/ceo/400/500",
    },
    {
      id: 2,
      name: "Daniel Smith",
      title: "Senior Architect",
      imageUrl: "https://picsum.photos/seed/cto/400/500",
    },
  ],
  partners: [
    { id: 1, name: "Intaz", logoUrl: "/path/to/intaz.svg" },
    { id: 2, name: "Qanf", logoUrl: "/path/to/qanf.svg" },
  ],
};

let servicesPageData = {
  header: {
    title: "Our Services",
    subtitle:
      "We provide top-tier electronic equipment and expert installation services to meet your needs.",
    imageUrl: "https://picsum.photos/seed/services/600/400",
  },
  productCards: [
    {
      id: 1,
      name: "Security Cameras",
      imageUrl: "https://picsum.photos/seed/camera/600/400",
    },
    {
      id: 2,
      name: "Network Routers",
      imageUrl: "https://picsum.photos/seed/router/600/400",
    },
  ],
  testimonials: [
    {
      id: 1,
      quote:
        "AKvision's installation team was incredibly professional and efficient.",
      author: "John Doe",
      company: "CEO, Tech Solutions Inc.",
    },
    {
      id: 2,
      quote: "The quality of the security cameras is outstanding.",
      author: "Jane Smith",
      company: "Operations Manager, Retail Group",
    },
  ],
  installation: {
    title: "Professional Installation",
    description:
      "Our certified technicians ensure your systems are installed correctly and efficiently...",
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
      title: "The Future of AI in Video Surveillance",
      category: "Technology",
      author: "John Smith",
      date: "2025-03-15",
      readTime: "5 min read",
      excerpt:
        "Explore how artificial intelligence is revolutionizing the security industry...",
      imageUrl: "https://picsum.photos/seed/1/600/400",
      content: "<p>Full blog content here.</p>",
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
    intro:
      "Experience superior image clarity and reliability with our diverse range of cameras...",
    heroImage: "https://picsum.photos/seed/camera-hero/1920/1080",
  },
  recorders: {
    title: "Recorders & Storage",
    intro:
      "Optimize your recording and storage with our reliable NVRs, DVRs...",
    heroImage: "https://picsum.photos/seed/recorder-hero/1920/1080",
  },
  switches: {
    title: "Switches & Accessories",
    intro:
      "Build a robust foundation for your security network with our high-performance switches...",
    heroImage: "https://picsum.photos/seed/switch-hero/1920/1080",
  },
  systems: {
    title: "Systems & Smart Devices",
    intro:
      "Integrate and automate your security with our advanced systems and smart devices...",
    heroImage: "https://picsum.photos/seed/system-hero/1920/1080",
  },
};

// --- SUPPORT SECTION DATA ---
let supportData = {
  downloads: [
    {
      id: 1,
      type: "Firmware",
      name: "Firmware_V1.3.4",
      productModel: "DS-1005KI",
      version: "1.3.4",
      size: "15.2 MB",
      releaseDate: "2025-07-20",
    },
    {
      id: 2,
      type: "Firmware",
      name: "Firmware_V1.3.1_171012",
      productModel: "DS-1005KI",
      version: "1.3.1",
      size: "14.8 MB",
      releaseDate: "2025-07-10",
    },
    {
      id: 10,
      type: "SDK",
      name: "Device Network SDK_Win64",
      description:
        "Used for secondary development based on device network SDK...",
      version: "6.1.9.48",
      size: "338.8 MB",
      releaseDate: "2025-06-14",
    },
    {
      id: 20,
      type: "Software",
      name: "AK-Vistion Pro Client",
      description: "Centralized management software for all your devices.",
      version: "3.5.0",
      size: "150.2 MB",
      releaseDate: "2025-08-01",
    },
  ],
  guides: [
    {
      id: 1,
      title: "How to install and debug DS-TMG034 radar",
      category: "ITS",
      instructions:
        "1. Install and configure DS-TMG035\n2. Debug the TMG034 Radar",
      pdfs: [
        { name: "debug-guide-android.pdf" },
        { name: "debug-guide-ios.pdf" },
      ],
    },
    {
      id: 2,
      title: "How to Use Attendance Service on HikCentral Connect",
      category: "Software",
      instructions: "Follow these steps...",
      pdfs: [],
    },
  ],
  videos: [
    {
      id: 1,
      title: "How to Configure ITS function — Illegal Parking Detection",
      description:
        "This video shows how to enable the ITS Illegal Parking Detection function...",
      date: "2025-07-29",
      thumbnailUrl: "https://picsum.photos/seed/vid1/400",
    },
    {
      id: 2,
      title: "How to Use Playback on HikCentral Pro",
      description:
        "This video shows how to use HikCentral Pro’s playback tools to search...",
      date: "2025-07-14",
      thumbnailUrl: "https://picsum.photos/seed/vid2/400",
    },
  ],
};

// --- CONTENT & FAQ DATA (WITH MORE DETAIL) ---
let contentData = {
  sales: [
    {
      id: 1,
      name: "Bob Johnson",
      email: "bob@example.com",
      company: "Biz Inc.",
      phone: "555-1234",
      productInterest: "IP Cameras",
      read: false,
      date: "2025-08-27",
      message:
        "Please provide a quote for 50x IP Dome Cameras for our new warehouse facility. We need them installed by next month.",
    },
  ],
  technical: [
    {
      id: 1,
      name: "Alice Williams",
      email: "alice@example.com",
      phone: "555-5678",
      productModel: "AK-NC4256",
      serialNumber: "SN-123XYZ",
      issueType: "Connectivity",
      read: true,
      date: "2025-08-26",
      message:
        "My NVR is offline after the recent firmware update. I have tried rebooting it multiple times to no avail.",
    },
  ],
  subscriptions: [
    {
      id: 1,
      email: "charlie@example.com",
      firstName: "Charlie",
      lastName: "Brown",
      interests: ["product-updates", "events"],
      frequency: "monthly",
      date: "2025-08-25",
    },
  ],
};

let faqPageData = {
  faqs: [
    {
      id: 1,
      question: "How do I reset my camera to factory settings?",
      answer:
        "To reset your AK Vision camera to factory settings, press and hold the reset button (usually located on the back or bottom of the camera) for 10 seconds until the indicator light flashes. Please note that this will erase all custom settings.",
    },
    {
      id: 2,
      question: "What is the default username and password for my NVR?",
      answer:
        'The default username for most AK Vision NVRs is "admin" and the default password is "12345". For security reasons, we strongly recommend changing these credentials immediately after your first login.',
    },
  ],
};

// --- MOCK API FUNCTIONS ---
export const mockApi = {
  // ... (all previous functions like login, getSupportData, etc., remain)
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
              // Data for the new widgets
              recentSales: contentData.sales.slice(0, 3),
              recentBlogPosts: blogPageData.posts.slice(0, 3),
            },
          }),
        500
      )
    ),
  // ... all other getters ...
  getSupportData: async () =>
    new Promise((res) => setTimeout(() => res({ data: supportData }), 500)),

  // Content/Contact Management
  getContentData: async () =>
    new Promise((res) => setTimeout(() => res({ data: contentData }), 500)),

  // FAQ Page Management (WITH FULL CRUD)
  getFaqPageData: async () =>
    new Promise((res) => setTimeout(() => res({ data: faqPageData }), 500)),
  saveFaq: async (faqData) => {
    if (faqData.id) {
      // Update
      faqPageData.faqs = faqPageData.faqs.map((f) =>
        f.id === faqData.id ? { ...f, ...faqData } : f
      );
    } else {
      // Create
      const newId = Math.max(...faqPageData.faqs.map((f) => f.id), 0) + 1;
      faqPageData.faqs.push({ ...faqData, id: newId });
    }
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
  deleteFaq: async (faqId) => {
    faqPageData.faqs = faqPageData.faqs.filter((f) => f.id !== faqId);
    return new Promise((res) => setTimeout(() => res({ success: true }), 500));
  },
};
