import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import SkillsPreview from '../components/home/SkillsPreview';
import ContactCTA from '../components/home/ContactCTA';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Harish | Software & IoT developer </title>
        <meta 
          name="description" 
          content="Personal portfolio of Your Name, IoT developer and student at PCE, Nagpur. Explore my projects, skills, and experience."
        />
      </Helmet>
      
      <Hero />
      <div id="about">
        <AboutPreview />
      </div>
      <div id="skills">
        <SkillsPreview />
      </div>
      <div id="projects">
        <FeaturedProjects />
      </div>
      <div id="contact">
        <ContactCTA />
      </div>
    </>
  );
};

export default HomePage;