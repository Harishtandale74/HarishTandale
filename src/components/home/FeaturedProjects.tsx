import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import ProjectCard from '../ui/ProjectCard';
import Button from '../ui/Button';
import { projects } from '../../data/projects';

const FeaturedProjects: React.FC = () => {
  // Get first 3 projects as featured
  const featuredProjects = projects.slice(0, 3);

  return (
    <Section
      title="Featured Projects"
      subtitle="Check out some of my recent work that showcases my skills and interests."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button to="/projects" variant="outline">
          View All Projects
        </Button>
      </div>
    </Section>
  );
};

export default FeaturedProjects;