export interface ProjectType {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  image: string;
  tags: string[];
  technologies: string[];
  github?: string;
  liveDemo?: string;
  features?: string[];
  challenges?: string[];
  createdAt: string;
}

export const projects: ProjectType[] = [
 {
  id: "quickstay-accommodation-platform",
  title: "QuickStay Accommodation Platform for Nagpur",
  description: "A full-stack web application for booking quick and affordable stays.",
  fullDescription: "QuickStay is a modern full-stack accommodation booking platform that allows users to quickly find, book, and manage short-term stays. It features an intuitive and responsive user interface for customers to browse listings, view detailed amenities, check availability, and make secure payments. The platform supports property owner dashboards for listing management and booking tracking. Built with the MERN stack, QuickStay ensures fast performance, scalability, and a seamless booking experience.",
  image: "https://yourdomain.com/images/quickstay-preview.jpg",
  tags: ["Full-Stack", "Web Application", "Accommodation"],
  technologies: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
  github: "https://github.com/yourusername/quickstay",
  liveDemo: "https://quickstay.example.com",
  features: [
    "Browse and search accommodations with filters",
    "View detailed property descriptions and images",
    "Real-time booking and availability management",
    "Secure payment gateway integration",
    "Property owner dashboard for listing and booking management",
    "Mobile-responsive and fast-loading interface"
  ],
  challenges: [
    "Implementing real-time booking without double-booking conflicts",
    "Ensuring responsive design for all device sizes",
    "Securing sensitive user and payment data",
    "Optimizing search and filter performance with large datasets"
  ],
  createdAt: "2025-08-06"
},

  {
    id: "health-monitoring-wearable",
    title: "Health Monitoring Wearable",
    description: "A wearable device that monitors vital health parameters and provides real-time analytics.",
    fullDescription: "This health monitoring wearable device continuously tracks vital signs including heart rate, blood oxygen levels, and activity metrics. The data is processed and analyzed to provide users with insights about their health trends and potential concerns. The system includes a wearable device built with Arduino, a mobile application for real-time monitoring, and a cloud backend for data storage and analysis.",
    image: "https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["IoT", "Healthcare", "Wearable"],
    technologies: ["Arduino", "BLE", "React Native", "AWS", "TensorFlow"],
    github: "https://github.com/yourusername/health-monitor",
    features: [
      "Continuous heart rate monitoring",
      "Blood oxygen level measurement",
      "Activity and sleep tracking",
      "Personalized health insights",
      "Emergency alert system"
    ],
    challenges: [
      "Miniaturizing the electronics for comfortable wear",
      "Ensuring accurate readings in various conditions",
      "Balancing power consumption with continuous monitoring",
      "Implementing robust algorithms for health analytics"
    ],
    createdAt: "2023-08-22"
  },
  {
    id: "smart-agriculture-system",
    title: "Smart Agriculture System",
    description: "An IoT solution for precision farming that optimizes water usage and crop health monitoring.",
    fullDescription: "This smart agriculture system uses a network of sensors to monitor soil moisture, temperature, humidity, and light levels across farm fields. The system automatically controls irrigation based on real-time data and weather forecasts, significantly reducing water waste. It also includes computer vision capabilities to detect early signs of crop diseases or pest infestations, allowing farmers to take targeted action before problems spread.",
    image: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["IoT", "Agriculture", "Sustainable Tech"],
    technologies: ["Raspberry Pi", "LoRaWAN", "Python", "TensorFlow", "React"],
    github: "https://github.com/yourusername/smart-agriculture",
    liveDemo: "https://smart-farm-demo.example.com",
    features: [
      "Automated irrigation control",
      "Soil health monitoring",
      "Weather data integration",
      "Pest and disease detection",
      "Harvest time optimization"
    ],
    challenges: [
      "Designing weather-resistant sensor nodes",
      "Implementing efficient power solutions for remote areas",
      "Creating reliable long-range communication networks",
      "Developing accurate prediction models for different crops and regions"
    ],
    createdAt: "2022-11-10"
  },
  {
    id: "inventory-management-app",
    title: "Inventory Management Application",
    description: "A web-based inventory management system for small to medium businesses.",
    fullDescription: "This comprehensive inventory management solution helps businesses track products, manage stock levels, and optimize supply chain operations. It features barcode scanning capabilities, automated reordering, sales analytics, and supplier management. The application is built with a responsive design, making it accessible from both desktop and mobile devices.",
    image: "https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Web App", "Business Tool", "Fullstack"],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
    github: "https://github.com/yourusername/inventory-manager",
    features: [
      "Real-time inventory tracking",
      "Barcode scanning integration",
      "Automated reordering system",
      "Sales and inventory analytics",
      "User role management",
      "Supplier database and ordering"
    ],
    challenges: [
      "Designing an intuitive UI for complex inventory operations",
      "Implementing efficient database queries for large inventories",
      "Creating a flexible system that works for different business types",
      "Ensuring data consistency across multiple users and devices"
    ],
    createdAt: "2023-02-15"
  },
 {
  id: "phishguard-detection-system",
  title: "PhishGuard – Real-Time Phishing Detection System",
  description: "An AI-powered system that detects phishing threats in real-time across web and email platforms.",
  fullDescription: "PhishGuard is a real-time phishing detection system designed to protect users from malicious links, fake login pages, and suspicious emails. It uses machine learning and threat intelligence APIs to classify URLs and scan content for phishing indicators. The system features a browser extension, an interactive dashboard for live monitoring, and a public reporting tool. It’s built to help individuals and organizations proactively defend against phishing attacks through automation and continuous learning.",
  image: "https://images.pexels.com/photos/5380645/pexels-photo-5380645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  tags: ["Cybersecurity", "AI", "Web Security"],
  technologies: ["Python", "Flask", "Scikit-learn", "React", "MongoDB", "Chrome Extension", "VirusTotal API"],
  github: "https://github.com/yourusername/phishguard",
  liveDemo: "https://phishguard.example.com",
  features: [
    "Real-time phishing URL detection",
    "Content and email analysis using NLP",
    "Browser extension for safe browsing",
    "Threat intelligence integration (VirusTotal, Google Safe Browsing)",
    "Interactive dashboard for tracking and analytics",
    "User reporting and feedback system"
  ],
  challenges: [
    "Detecting obfuscated or shortened malicious URLs",
    "Minimizing false positives while ensuring high accuracy",
    "Integrating multiple APIs for real-time detection",
    "Creating an intuitive and lightweight browser extension",
    "Securing the system against evasion techniques"
  ],
  createdAt: "2025-08-06"
},

  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    description: "A responsive portfolio website to showcase projects and skills.",
    fullDescription: "This personal portfolio website serves as a comprehensive showcase of my projects, skills, and professional journey. Built with React and styled with Tailwind CSS, it features a clean, responsive design that works seamlessly across all devices. The site includes interactive elements, dark/light mode toggle, and optimized performance metrics.",
    image: "https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    tags: ["Web Development", "UI/UX", "Frontend"],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    github: "https://github.com/harishtandale74/portfolio",
    liveDemo: "https://yourname.dev",
    features: [
      "Responsive design for all devices",
      "Dark/light mode toggle",
      "Project showcase with detailed case studies",
      "Skills and expertise visualization",
      "Contact form integration",
      "Blog section for sharing insights"
    ],
    challenges: [
      "Creating a distinct visual identity",
      "Implementing smooth animations without affecting performance",
      "Designing an intuitive information architecture",
      "Optimizing for accessibility and SEO"
    ],
    createdAt: "2023-06-30"
  }
];