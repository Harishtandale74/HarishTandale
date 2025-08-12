import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, ExternalLink, CheckCircle, Star } from 'lucide-react';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const CourseworkPage: React.FC = () => {
  const certifications = [
    {
      id: 1,
      title: 'AWS Certified Cloud Practitioner',
      provider: 'Amazon Web Services',
      issueDate: 'October 2023',
      expiryDate: 'October 2026',
      credentialId: 'AWS-CCP-2023-001',
      description: 'Foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support.',
      skills: ['Cloud Computing', 'AWS Services', 'Cloud Security', 'Cloud Architecture'],
      certificate: '/certificates/aws-cloud-practitioner.pdf',
      verifyUrl: 'https://aws.amazon.com/verification',
      logo: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Foundational',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Google Cloud Associate Cloud Engineer',
      provider: 'Google Cloud',
      issueDate: 'September 2023',
      expiryDate: 'September 2026',
      credentialId: 'GCP-ACE-2023-002',
      description: 'Ability to deploy applications, monitor operations, and maintain cloud projects on Google Cloud Platform.',
      skills: ['Google Cloud Platform', 'Cloud Infrastructure', 'Kubernetes', 'Cloud Storage'],
      certificate: '/certificates/gcp-associate-engineer.pdf',
      verifyUrl: 'https://cloud.google.com/certification/verification',
      logo: 'https://images.pexels.com/photos/1181677/pexels-photo-1177677.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Associate',
      status: 'Active'
    },
    {
      id: 3,
      title: 'Microsoft Azure Fundamentals',
      provider: 'Microsoft',
      issueDate: 'August 2023',
      expiryDate: 'Does not expire',
      credentialId: 'MS-AZ900-2023-003',
      description: 'Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.',
      skills: ['Microsoft Azure', 'Cloud Services', 'Azure Security', 'Azure Pricing'],
      certificate: '/certificates/azure-fundamentals.pdf',
      verifyUrl: 'https://docs.microsoft.com/en-us/learn/certifications/verification',
      logo: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Fundamentals',
      status: 'Active'
    },
    {
      id: 4,
      title: 'Complete Web Development Bootcamp',
      provider: 'Udemy',
      issueDate: 'July 2023',
      expiryDate: 'Lifetime Access',
      credentialId: 'UC-WEB-2023-004',
      description: 'Comprehensive web development course covering HTML, CSS, JavaScript, React, Node.js, and databases.',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
      certificate: '/certificates/web-development-bootcamp.pdf',
      verifyUrl: 'https://udemy.com/certificate/verification',
      logo: 'https://images.pexels.com/photos/1181678/pexels-photo-1181678.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Intermediate',
      status: 'Completed'
    },
    {
      id: 5,
      title: 'IoT Fundamentals: Connecting Things',
      provider: 'Cisco Networking Academy',
      issueDate: 'June 2023',
      expiryDate: 'Does not expire',
      credentialId: 'CISCO-IOT-2023-005',
      description: 'Introduction to IoT concepts, technologies, and applications in various industries.',
      skills: ['IoT Concepts', 'Sensor Networks', 'IoT Protocols', 'Data Analytics'],
      certificate: '/certificates/cisco-iot-fundamentals.pdf',
      verifyUrl: 'https://cisco.com/verification',
      logo: 'https://images.pexels.com/photos/1181679/pexels-photo-1181679.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Fundamentals',
      status: 'Completed'
    },
    {
      id: 6,
      title: 'Python for Data Science and Machine Learning',
      provider: 'Coursera',
      issueDate: 'May 2023',
      expiryDate: 'Does not expire',
      credentialId: 'COURSERA-PY-2023-006',
      description: 'Comprehensive course on Python programming for data science, machine learning, and data visualization.',
      skills: ['Python', 'Data Science', 'Machine Learning', 'Pandas', 'NumPy', 'Scikit-learn'],
      certificate: '/certificates/python-data-science.pdf',
      verifyUrl: 'https://coursera.org/verify',
      logo: 'https://images.pexels.com/photos/1181680/pexels-photo-1181680.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      level: 'Intermediate',
      status: 'Completed'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Fundamentals':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Associate':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Professional':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200';
      case 'Completed':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200';
      case 'Expired':
        return 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <>
      <Helmet>
        <title>Coursework Certifications | Harish Tandale</title>
        <meta 
          name="description" 
          content="Professional certifications and coursework completed by Harish Tandale in cloud computing, web development, IoT, and data science."
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
            <GraduationCap className="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Coursework Certifications
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Professional certifications and online courses that enhance my technical expertise
          </p>
        </motion.div>
        
        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl">
            <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
              {certifications.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Certifications</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 rounded-xl">
            <div className="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">
              {certifications.filter(cert => cert.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Certifications</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 rounded-xl">
            <div className="text-3xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
              {new Set(certifications.flatMap(cert => cert.skills)).size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Skills Covered</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 rounded-xl">
            <div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
              {new Set(certifications.map(cert => cert.provider)).size}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Providers</div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={cert.logo} 
                          alt={`${cert.provider} logo`}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {cert.title}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                          {cert.provider}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span>Issued: {cert.issueDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(cert.level)}`}>
                        {cert.level}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      Skills Acquired
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <div>ID: {cert.credentialId}</div>
                      <div>Expires: {cert.expiryDate}</div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        href={cert.certificate}
                        target="_blank"
                        size="sm"
                        variant="outline"
                        icon={<Award className="h-3 w-3" />}
                      >
                        Certificate
                      </Button>
                      <Button
                        href={cert.verifyUrl}
                        target="_blank"
                        size="sm"
                        icon={<ExternalLink className="h-3 w-3" />}
                      >
                        Verify
                      </Button>
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
              Continuous Learning Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              I believe in continuous learning and staying updated with the latest technologies. These certifications represent my commitment to professional growth and excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                to="/projects" 
                icon={<CheckCircle className="h-4 w-4" />}
              >
                View Projects
              </Button>
              <Button 
                to="/contact" 
                variant="outline"
                icon={<ExternalLink className="h-4 w-4" />}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
};

export default CourseworkPage;