import React from 'react';
import { motion } from 'framer-motion';
import Section from '../ui/Section';

const Biography: React.FC = () => {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            My Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
          Hi, I’m Harish Tandale — a curious, driven technologist with a knack for bridging the physical and digital worlds. Ever since I can remember, I’ve been fascinated by how things work and how technology can transform everyday challenges into smarter, real-world solutions.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Throughout my academic journey, I've had the opportunity to work on various projects that combine hardware sensors, microcontrollers, and web applications. These experiences have shaped my understanding of how integrated systems can create meaningful solutions.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            When I'm not coding or soldering, you can find me exploring the latest tech trends, contributing to open-source projects, or sharing my knowledge through blog posts and community events.
          </p>
          <p>Outside the code editor, I’m equally passionate about sharing what I know. Through blog posts, coding workshops, community events, and my YouTube channel — LearnCurve — I help new developers build solid foundations and stay inspired. I also love contributing to open-source projects and keeping pace with the latest trends in IoT, cloud, and modern software.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="aspect-square overflow-hidden rounded-xl shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img 
              src="/portfolio.jpg" 
              alt="Harish Tandale - Professional photo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-110 transition-transform duration-300 ease-in-out">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <span className="block text-3xl font-bold text-primary-600 dark:text-primary-400">5+</span>
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

export default Biography;
