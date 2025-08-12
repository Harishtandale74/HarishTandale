import React from 'react';
import { ArrowRight } from 'lucide-react';
import Section from '../ui/Section';
import Button from '../ui/Button';

const ContactCTA: React.FC = () => {
  return (
    <Section className="bg-primary-600 dark:bg-primary-800 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Interested in working together?
        </h2>
        <p className="text-lg text-primary-100 dark:text-primary-200 mb-8 max-w-2xl mx-auto">
          Whether you have a project in mind or just want to chat about technology, I'm always open to new opportunities and connections.
        </p>
        <Button 
          to="/contact" 
          variant="outline" 
          className="border-white text-white hover:bg-white hover:text-primary-600"
          icon={<ArrowRight className="h-4 w-4" />}
        >
          Get In Touch
        </Button>
      </div>
    </Section>
  );
};

export default ContactCTA;