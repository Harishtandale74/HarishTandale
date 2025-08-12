import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Download, FileText, Briefcase, GraduationCap, Award } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';

const ResumePage: React.FC = () => {
  const experiences = [
    {
      title: 'Software Developer Intern',
      company: 'Example Tech Solutions',
      period: 'June 2023 - Present',
      description: 'Developing IoT solutions for smart agriculture and industrial automation. Working with ESP32, LoRaWAN, and cloud platforms to create end-to-end connected systems.',
      responsibilities: [
        'Designed and implemented sensor networks for environmental monitoring',
        'Developed firmware for low-power microcontrollers',
        'Created web dashboards for data visualization using React',
        'Contributed to optimizing battery life for field-deployed devices'
      ]
    },
    {
      title: 'Web Development Intern',
      company: 'Tech-Octanet',
      period: 'Aug 2024 - Sep 2024',
      description: 'Providing web development services to small businesses and startups. Specializing in modern, responsive websites and web applications.',
      responsibilities: [
        'Built e-commerce platforms using React and Node.js',
        'Created custom content management systems',
        'Implemented SEO best practices for client websites',
        'Provided maintenance and support for existing web applications'
      ]
    },
    {
      title: 'AWS cloud ',
      company: 'revat Network',
      period: 'Mar 2025 - Apr 2025',
      description: 'Assisted faculty with research projects focused on IoT applications in smart cities. Collected and analyzed data from sensor networks.',
      responsibilities: [
        'Deployed experimental sensor networks across campus',
        'Analyzed sensor data using Python and statistical methods',
        'Documented research findings and contributed to publications',
        'Maintained and calibrated laboratory equipment'
      ]
    }
  ];

  const education = [
    {
      degree: 'B.Tech in Internet of Things',
      institution: 'Priyadarshini College of Engineering, Nagpur',
      period: '2022 - 2026',
      description: 'Specialized in IoT technologies, embedded systems, and web development. Maintained a high GPA and participated in multiple hackathons.',
      achievements: [
        'Department TOP 3 Topper  (2023-2026)',
        'Published paper on Self Driving Car',
        'Lead developer for department\'s smart campus initiative'
      ]
    },
    {
      degree: 'Higher Secondary Education',
      institution: 'M.P Deo Memorial Science College Nagpur ',
      period: '2020 - 2022',
      description: 'Focused on science and mathematics with an emphasis on computer science.',
      achievements: [
        'Graduated with distinction (61%)',
        'State-level science competition finalist',
        'President of the Computer Science Club',
        'Developed school\'s first student information system'
      ]
    }
  ];

  const certifications = [
    {
      name: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: 'October 2023'
    },
    {
      name: 'IBM Certified: Cloud Computing',
      issuer: 'Microsoft',
      date: 'July 2023'
    },
    {
      name: 'Google Data Analytics',
      issuer: 'Google',
      date: 'March 2023'
    },
    {
      name: 'TCS IoN young Proffessional Certificate',
      issuer: 'TCS IoN',
      date: 'January 2022'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Resume | Harish Tandale</title>
        <meta 
          name="description" 
          content="Professional resume of Your Name, including work experience, education, skills, and certifications."
        />
      </Helmet>
      
      <Section className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Resume
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            My professional experience, education, and qualifications
          </p>
          <Button 
            href="/resume.pdf" 
            target="_blank"
            download={true}
            icon={<Download className="h-4 w-4" />}
          >
            Download Resume
          </Button>
        </motion.div>
        
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Work Experience
              </h2>
            </div>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 py-2"
                >
                  <div className="absolute left-[-8px] top-0 bg-white dark:bg-gray-800 p-1 rounded-full border-2 border-primary-600 dark:border-primary-400">
                    <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {exp.period}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {exp.description}
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Education
              </h2>
            </div>
            
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-l-2 border-gray-200 dark:border-gray-700 pl-6 py-2"
                >
                  <div className="absolute left-[-8px] top-0 bg-white dark:bg-gray-800 p-1 rounded-full border-2 border-primary-600 dark:border-primary-400">
                    <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {edu.period}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {edu.description}
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
                    {edu.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Certifications
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <FileText className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {cert.issuer} · {cert.date}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            href="/resume.pdf" 
            target="_blank"
            download={true}
            icon={<Download className="h-4 w-4" />}
          >
            Download Complete Resume
          </Button>
        </div>
      </Section>
    </>
  );
};

export default ResumePage;