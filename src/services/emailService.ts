import React from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
}

class EmailService {
  private static instance: EmailService;
  private web3FormsApiKey = '0add6661-c756-4216-aa64-f0d0990cdb3c';
  
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // Initialize Web3Forms
  public initialize() {
    console.log('✅ Web3Forms Email Service initialized successfully');
  }

  // Send contact form email using Web3Forms
  public async sendContactEmail(formData: ContactFormData): Promise<boolean> {
    try {
      console.log('📧 Sending email via Web3Forms...');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: this.web3FormsApiKey,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          message: `
New contact form submission from your portfolio:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from: Portfolio Website
Time: ${new Date().toLocaleString()}
          `,
          from_name: formData.name,
          replyto: formData.email,
          to_email: 'harishtandale956@gmail.com'
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Email sent successfully via Web3Forms:', result);
        return true;
      } else {
        console.error('❌ Web3Forms error:', result);
        return false;
      }
    } catch (error) {
      console.error('❌ Error sending email via Web3Forms:', error);
      return false;
    }
  }

  // Send contact form emails (Web3Forms doesn't need separate confirmation)
  public async sendContactFormEmails(formData: ContactFormData): Promise<{
    contactSent: boolean;
    confirmationSent: boolean;
    success: boolean;
  }> {
    console.log('📧 Processing contact form submission via Web3Forms...');
    
    const contactSent = await this.sendContactEmail(formData);
    
    const result = {
      contactSent,
      confirmationSent: contactSent, // Web3Forms handles this automatically
      success: contactSent,
    };

    console.log('📧 Web3Forms processing complete:', result);
    return result;
  }

  // Validate email format
  public validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate form data
  public validateContactForm(formData: ContactFormData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push('Name is required');
    } else if (formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }

    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else if (!this.validateEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }

    if (!formData.subject.trim()) {
      errors.push('Subject is required');
    } else if (formData.subject.trim().length < 3) {
      errors.push('Subject must be at least 3 characters long');
    }

    if (!formData.message.trim()) {
      errors.push('Message is required');
    } else if (formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

export default EmailService;
export type { ContactFormData };