import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import PageLayout from '../components/layout/PageLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'react-hot-toast';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID) {
  emailjs.init(PUBLIC_KEY);
} else {
  console.warn('EmailJS environment variables are missing');
}

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const contentRef = useRef(null);

  const socialLinks = [
    { icon: faGithub, url: 'https://github.com/Ellisvelandia', label: 'GitHub' },
    { icon: faLinkedin, url: 'https://linkedin.com/in/ellisvelandia', label: 'LinkedIn' },
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      toast.error('Email service configuration error. Please contact me directly.');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      if (result.text === 'OK') {
        toast.success('Message sent successfully! I will get back to you soon.');
        setFormData({ from_name: '', reply_to: '', message: '' });
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        text: error.text,
        name: error.name
      });
      toast.error('Failed to send message. Please try again or contact me directly at eyis619@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Toaster position="top-right" />
      <div className="relative min-h-screen py-20 px-4">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-blue-100/20 to-transparent dark:from-blue-900/10 rounded-full" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/20 to-transparent dark:from-blue-900/10 rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto">

          <div 
            ref={contentRef} 
            className="grid md:grid-cols-5 gap-8 items-start"
          >
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-8 md:sticky md:top-20">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Connect With Me
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon 
                      icon={faEnvelope} 
                      className="text-xl text-blue-500"
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      eyis619@gmail.com
                    </span>
                  </div>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-3 bg-gray-100 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:bg-blue-500"
                        aria-label={link.label}
                      >
                        <FontAwesomeIcon 
                          icon={link.icon} 
                          className="text-xl text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form 
              ref={formRef} 
              onSubmit={handleSubmit} 
              className="md:col-span-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="from_name" className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon 
                      icon={faUser} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    />
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      required
                      value={formData.from_name}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reply_to" className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <FontAwesomeIcon 
                      icon={faEnvelope} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    />
                    <input
                      id="reply_to"
                      name="reply_to"
                      type="email"
                      required
                      value={formData.reply_to}
                      onChange={handleChange}
                      className="pl-10 w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-medium hover:from-blue-500 hover:to-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="flex items-center justify-center">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <FontAwesomeIcon 
                      icon={faPaperPlane} 
                      className={`ml-2 transform transition-all duration-300 ${
                        isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'
                      }`}
                    />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
