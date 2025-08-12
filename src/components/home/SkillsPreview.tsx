import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { skills } from '../../data/skills';

const SkillsPreview: React.FC = () => {
  const mainSkills = skills.filter(skill => skill.main);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Section 
      title="Skills & Technologies" 
      subtitle="I work with a variety of technologies across frontend, backend, IoT, and more."
      className="bg-gray-50 dark:bg-gray-800/50"
    >
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {mainSkills.map((skill) => (
          <motion.div 
            key={skill.name}
            variants={item}
            className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="w-16 h-16 flex items-center justify-center mb-3">
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className="max-w-full max-h-full" 
              />
            </div>
            <h3 className="text-center text-sm font-medium text-gray-900 dark:text-white">
              {skill.name}
            </h3>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-12 text-center">
        <Button to="/skills" variant="outline">
          View All Skills
        </Button>
      </div>
    </Section>
  );
};

export default SkillsPreview;