import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import Section from '../ui/Section';

const Education: React.FC = () => {
  const educationItems = [
    {
      degree: 'B.Tech in Internet of Things',
      institution: 'PCE, Nagpur',
      year: '2022 - 2026',
      description: 'Specialized in IoT technologies, embedded systems, and web development. Maintained a high GPA and participated in multiple hackathons and technical competitions.'
    },
    {
      degree: 'Higher Secondary Education',
      institution: 'M . P Deo Memorial Science College Nagpur',
      year: '2020 - 2022',
      description: 'Focused on science and mathematics with an emphasis on computer science. Participated in state-level science competitions and coding challenges.'
    }
  ];

  return (
    <Section 
      title="Education" 
      subtitle="My academic background and qualifications"
      className="bg-gray-50 dark:bg-gray-800/50"
    >
      <div className="max-w-3xl mx-auto">
        {educationItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`
              relative pl-10 pb-10
              ${index !== educationItems.length - 1 ? 'border-l-2 border-gray-200 dark:border-gray-700' : ''}
            `}
          >
            <div className="absolute left-[-8px] top-0 bg-white dark:bg-gray-800 p-1 rounded-full border-2 border-primary-600 dark:border-primary-400">
              <GraduationCap className="h-4 w-4 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{item.year}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {item.degree}
              </h3>
              <h4 className="text-md font-medium text-primary-600 dark:text-primary-400 mb-3">
                {item.institution}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Education;