export interface SkillType {
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'mobile' | 'iot' | 'other';
  proficiency: number;
  main: boolean;
}

export const skills: SkillType[] = [
  // Frontend
  {
    name: 'HTML/CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    category: 'frontend',
    proficiency: 90,
    main: true
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    category: 'frontend',
    proficiency: 85,
    main: true
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    category: 'frontend',
    proficiency: 80,
    main: true
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    category: 'frontend',
    proficiency: 80,
    main: true
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    category: 'frontend',
    proficiency: 75,
    main: true
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
    category: 'frontend',
    proficiency: 85,
    main: false
  },
  // Backend
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    category: 'backend',
    proficiency: 80,
    main: true
  },
  {
    name: 'Express',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    category: 'backend',
    proficiency: 75,
    main: false
  },
  {
    name: 'MongoDB',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    category: 'backend',
    proficiency: 70,
    main: true
  },
  {
    name: 'SQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    category: 'backend',
    proficiency: 60,
    main: false
  },
  // IoT
  {
    name: 'Arduino',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
    category: 'iot',
    proficiency: 90,
    main: true
  },
  {
    name: 'Raspberry Pi',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg',
    category: 'iot',
    proficiency: 85,
    main: true
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    category: 'iot',
    proficiency: 80,
    main: true
  },
  {
    name: 'C/C++',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
    category: 'iot',
    proficiency: 75,
    main: false
  },
  {
    name: 'MQTT',
    icon: 'https://mqtt.org/assets/downloads/mqtt-logo.png',
    category: 'iot',
    proficiency: 70,
    main: false
  },
  {
    name: 'NodeMCU ESP8266/32',
    icon: 'https://mqtt.org/assets/downloads/mqtt-logo.png',
    category: 'iot',
    proficiency: 60,
    main: false
  },
  // DevOps & Tools
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    category: 'other',
    proficiency: 85,
    main: false
  },
  {
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    category: 'other',
    proficiency: 85,
    main: false
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    category: 'other',
    proficiency: 65,
    main: false
  },
  {
    name: 'AWS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    category: 'other',
    proficiency: 60,
    main: false
  }
];

export const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Technologies and frameworks for building user interfaces and web applications.'
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Server-side programming, APIs, and database management.'
  },
  {
    id: 'iot',
    name: 'IoT & Embedded Systems',
    description: 'Hardware programming, sensor integration, and IoT protocols.'
  },
  {
    id: 'other',
    name: 'DevOps & Tools',
    description: 'Version control, deployment, cloud services, and development tools.'
  }
];
