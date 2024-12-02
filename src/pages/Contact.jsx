import React, { useState, useRef } from "react";
import PageLayout from "../components/layout/PageLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import emailjs from "@emailjs/browser";
import { toast, Toaster } from "react-hot-toast";
import ContactInfo from "../components/contact/ContactInfo";

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

if (PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID) {
  emailjs.init(PUBLIC_KEY);
} else {
  console.warn("EmailJS environment variables are missing");
}

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const contentRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      toast.error(
        "Email service configuration error. Please contact me directly."
      );
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

      if (result.text === "OK") {
        toast.success(
          "Message sent successfully! I will get back to you soon."
        );
        setFormData({ from_name: "", reply_to: "", message: "" });
      }
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        text: error.text,
        name: error.name,
      });
      toast.error(
        "Failed to send message. Please try again or contact me directly at eyis619@gmail.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Toaster position="top-right" />
      <div className="relative min-h-screen py-20 px-4">
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={contentRef}
            className="grid md:grid-cols-5 gap-12 items-start"
          >
            <ContactInfo />

            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="md:col-span-3 bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-800/50 hover:border-emerald-500/30 dark:hover:border-[#00FF00]/30 transition-all duration-300"
            >
              <div className="space-y-8">
                <div>
                  <label
                    htmlFor="from_name"
                    className="block text-lg font-medium text-emerald-600 dark:text-[#00FF00] mb-3"
                  >
                    Name
                  </label>
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-[#00FF00] group-hover:text-emerald-600 dark:group-hover:text-[#00FF00] transition-colors"
                    />
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      required
                      value={formData.from_name}
                      onChange={handleChange}
                      className="pl-12 w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#00FF00] focus:border-transparent hover:border-emerald-500/50 dark:hover:border-[#00FF00]/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reply_to"
                    className="block text-lg font-medium text-emerald-600 dark:text-[#00FF00] mb-3"
                  >
                    Email
                  </label>
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-[#00FF00] group-hover:text-emerald-600 dark:group-hover:text-[#00FF00] transition-colors"
                    />
                    <input
                      id="reply_to"
                      name="reply_to"
                      type="email"
                      required
                      value={formData.reply_to}
                      onChange={handleChange}
                      className="pl-12 w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#00FF00] focus:border-transparent hover:border-emerald-500/50 dark:hover:border-[#00FF00]/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg font-medium text-emerald-600 dark:text-[#00FF00] mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#00FF00] focus:border-transparent hover:border-emerald-500/50 dark:hover:border-[#00FF00]/50 transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-[#00FF00] dark:to-emerald-400 text-white dark:text-gray-900 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-500 dark:hover:from-[#00FF00] dark:hover:to-[#00FF00] focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#00FF00] focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-[#00FF00]/20"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={`mr-2 ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-1'}`}
                  />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-bl from-emerald-100/20 dark:from-emerald-900/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-emerald-100/20 dark:from-emerald-900/10 to-transparent rounded-full blur-3xl" />
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
