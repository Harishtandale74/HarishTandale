import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/ui/Section';
import SkillBar from '../components/ui/SkillBar';
import { skills, skillCategories } from '../data/skills';

const SkillsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'frontend':
        return 'bg-primary-600 dark:bg-primary-500';
      case 'backend':
        return 'bg-secondary-600 dark:bg-secondary-500';
      case 'iot':
        return 'bg-accent-600 dark:bg-accent-500';
      case 'mobile':
        return 'bg-success-600 dark:bg-success-500';
      default:
        return 'bg-gray-600 dark:bg-gray-500';
    }
  };

  return (
    <>
      <Helmet>
        <title>Skills & Expertise | Harish </title>
        <meta 
          name="description" 
          content="Explore my technical skills and expertise in IoT, web development, and more."
        />
      </Helmet>
      
      <Section id="skills" className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            A comprehensive overview of my technical skills and proficiency levels across different domains
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeCategory === 'all' 
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}
            `}
          >
            All Skills
          </button>
          
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeCategory === category.id 
                  ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}
              `}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeCategory !== 'all' && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {skillCategories.find(c => c.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {skillCategories.find(c => c.id === activeCategory)?.description}
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SkillBar 
                    name={skill.name} 
                    percentage={skill.proficiency} 
                    color={getCategoryColor(skill.category)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Section>
      
      <Section 
        title="Tools & Technologies"
        subtitle="Some of the tools and technologies I work with regularly"
        className="bg-gray-50 dark:bg-gray-800/50"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skills.filter(skill => skill.main).map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
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
        </div>
      </Section>
    </>
  );
};

export default SkillsPage;