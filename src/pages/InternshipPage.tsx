import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink, Award, CheckCircle } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const InternshipPage: React.FC = () => {
  const internships = [
    {
      id: 1,
      title: 'Software Developer Intern',
      company: 'TechCorp Solutions',
      location: 'Nagpur, India',
      duration: 'June 2023 - August 2023',
      type: 'Full-time',
      description: 'Developed IoT solutions for smart agriculture and industrial automation. Worked with ESP32, LoRaWAN, and cloud platforms to create end-to-end connected systems.',
      achievements: [
        'Designed and implemented sensor networks for environmental monitoring',
        'Developed firmware for low-power microcontrollers',
        'Created web dashboards for data visualization using React',
        'Contributed to optimizing battery life for field-deployed devices',
        'Collaborated with cross-functional teams on IoT product development'
      ],
      technologies: ['ESP32', 'LoRaWAN', 'React', 'Node.js', 'MongoDB', 'MQTT'],
      certificate: '/certificates/techcorp-internship.pdf',
      companyLogo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'IoT Research Intern',
      company: 'Smart City Initiative',
      location: 'Nagpur, India',
      duration: 'January 2023 - May 2023',
      type: 'Part-time',
      description: 'Participated in smart city research project focusing on environmental monitoring and traffic management systems using IoT sensors and data analytics.',
      achievements: [
        'Deployed experimental sensor networks across the city',
        'Analyzed sensor data using Python and statistical methods',
        'Documented research findings and contributed to publications',
        'Maintained and calibrated laboratory equipment',
        'Presented findings at regional IoT conference'
      ],
      technologies: ['Python', 'Raspberry Pi', 'Arduino', 'Data Analytics', 'Machine Learning'],
      certificate: '/certificates/smart-city-internship.pdf',
      companyLogo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Web Development Intern',
      company: 'Digital Solutions Hub',
      location: 'Remote',
      duration: 'September 2022 - December 2022',
      type: 'Remote',
      description: 'Worked on various web development projects for small businesses and startups. Gained experience in modern web technologies and client communication.',
      achievements: [
        'Built responsive websites using React and Tailwind CSS',
        'Implemented RESTful APIs with Node.js and Express',
        'Integrated third-party services and payment gateways',
        'Optimized website performance and SEO',
        'Managed client relationships and project timelines'
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Git'],
      certificate: '/certificates/digital-solutions-internship.pdf',
      companyLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200';
      case 'Ongoing':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>Internship Experience | Harish Tandale</title>
        <meta 
          name="description" 
          content="Professional internship experiences of Harish Tandale in IoT development, web development, and research."
        />
      </Helmet>
      
      <Section className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Briefcase className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Internship Experience
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Professional internship experiences that shaped my career in IoT and software development
          </p>
        </motion.div>
        
        <div className="space-y-8">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                      <div className="flex-shrink-0">
                        <img 
                          src={internship.companyLogo} 
                          alt={`${internship.company} logo`}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {internship.title}
                        </h2>
                        <h3 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-2">
                          {internship.company}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {internship.duration}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {internship.location}
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                            {internship.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(internship.status)}`}>
                        {internship.status}
                      </span>
                      {internship.certificate && (
                        <Button
                          href={internship.certificate}
                          target="_blank"
                          size="sm"
                          variant="outline"
                          icon={<Award className="h-4 w-4" />}
                        >
                          Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {internship.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-success-600 dark:text-success-400 mr-2" />
                      Key Achievements
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {internship.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start text-gray-600 dark:text-gray-400">
                          <span className="inline-block w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.technologies.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 text-sm font-medium rounded-md bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Looking for Internship Opportunities?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              I'm always open to new internship opportunities that allow me to learn, grow, and contribute to innovative projects in IoT and software development.
            </p>
            <Button 
              to="/contact" 
              icon={<ExternalLink className="h-4 w-4" />}
            >
              Get In Touch
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default InternshipPage;