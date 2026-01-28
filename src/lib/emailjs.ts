import emailjs from '@emailjs/browser';

// Initialize EmailJS
export const initEmailJS = () => {
  // Replace with your actual EmailJS public key
  emailjs.init(import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY);
};

// Email service configuration
export const EMAIL_SERVICE_ID = 'service_48tajed';
export const EMAIL_TEMPLATE_ID = 'template_musye7j';
export const EMAIL_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY;
