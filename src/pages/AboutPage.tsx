import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Section from '../components/ui/Section';
import Biography from '../components/about/Biography';
import Education from '../components/about/Education';

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Me | Harish </title>
        <meta 
          name="description" 
          content="Learn more about Your Name, my background, education, and journey in IoT and software development."
        />
      </Helmet>
      
      <Section className="pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            A passionate Software & IoT developer and student with a focus on creating innovative solutions
          </p>
        </motion.div>
      </Section>
      
      <Biography />
      <Education />
      
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Approach
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              I believe in creating technology that solves real problems and improves people's lives. My approach combines technical expertise with a human-centered design philosophy.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              For every project, I focus on understanding the core needs first, then build solutions that are efficient, scalable, and user-friendly. I'm passionate about clean code, performance optimization, and creating systems that are maintainable in the long run.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Interests
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Beyond coding and building IoT systems, I'm interested in sustainable technology, renewable energy, and how technology can address environmental challenges.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              In my free time, I enjoy hiking, reading science fiction, and participating in hackathons and tech meetups. I'm also an avid learner who's constantly exploring new technologies and approaches to problem-solving.
            </p>
          </motion.div>
        </div>
      </Section>
    </>
  );
};

export default AboutPage;