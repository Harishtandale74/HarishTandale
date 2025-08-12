import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import { projects, ProjectType } from '../data/projects';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id);
    if (foundProject) {
      setProject(foundProject);
    } else {
      navigate('/projects', { replace: true });
    }
  }, [id, navigate]);

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | My Projects | Harish </title>
        <meta 
          name="description" 
          content={project.description}
        />
      </Helmet>
      
      <Section className="pt-32">
        <div className="mb-8">
          <Link 
            to="/projects" 
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all projects
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Created: {project.createdAt}</span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none mb-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {project.fullDescription || project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {project.github && (
                <Button 
                  href={project.github} 
                  target="_blank" 
                  icon={<Github className="w-4 h-4" />}
                >
                  View Source
                </Button>
              )}
              
              {project.liveDemo && (
                <Button 
                  href={project.liveDemo} 
                  target="_blank"
                  variant="secondary" 
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Live Demo
                </Button>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto" 
              />
            </div>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {project.features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features
              </h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li 
                    key={index}
                    className="flex items-start"
                  >
                    <span className="inline-block w-4 h-4 mr-2 mt-1 bg-primary-600 dark:bg-primary-500 rounded-full"></span>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-1 text-sm font-medium rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {project.challenges && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Challenges Overcome
                </h2>
                <ul className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li 
                      key={index}
                      className="flex items-start"
                    >
                      <span className="inline-block w-4 h-4 mr-2 mt-1 bg-accent-600 dark:bg-accent-500 rounded-full"></span>
                      <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button to="/contact" variant="outline">
            Interested in a similar project? Contact Me
          </Button>
        </motion.div>
      </Section>
    </>
  );
};

export default ProjectDetailPage;