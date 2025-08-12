import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';
import Button from '../ui/Button';

const AboutPreview: React.FC = () => {
  return (
    <Section id="about-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            I'm a passionate IoT developer and student at PCE, Nagpur, with a focus on creating innovative solutions that bridge the physical and digital worlds.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            With a background in electronics and programming, I enjoy working on projects that involve sensors, microcontrollers, and web applications. My goal is to develop smart systems that make people's lives easier and more efficient.
          </p>
          <div className="pt-2">
            <Button to="/about">
              Learn More About Me
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="aspect-square overflow-hidden rounded-xl shadow-xl">
            <img 
              src="/portfolio.jpg" 
              alt="Professional portrait" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary-600 dark:text-primary-400">3+</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Projects</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary-600 dark:text-primary-400">1+</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">Years Exp.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};

export default AboutPreview;