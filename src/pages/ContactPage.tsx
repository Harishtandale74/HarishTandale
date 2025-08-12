import React from 'react';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/contact/ContactForm';

const ContactPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact Me | Harish </title>
        <meta 
          name="description" 
          content="Get in touch with Your Name. Send me a message or connect on social media."
        />
      </Helmet>
      
      <div id="contact" className="pt-24">
        <ContactForm />
      </div>
    </>
  );
};

export default ContactPage;