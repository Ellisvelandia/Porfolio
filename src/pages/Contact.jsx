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
      <div className="relative min-h-screen py-6 sm:py-20 px-3 sm:px-4">
        <div className="relative max-w-6xl mx-auto">
          <div
            ref={contentRef}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 sm:gap-8 md:gap-12 items-start"
          >
            <ContactInfo />

            {/* Contact Form */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="md:col-span-3 bg-white/90 dark:bg-gray-900/95 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-xl border border-gray-200/50 dark:border-gray-800/50"
            >
              <div className="mb-4 sm:mb-8">
                <h1 className="text-2xl sm:text-4xl font-bold text-emerald-600 dark:text-[#00FF00]">
                  Get in Touch
                </h1>
                <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  I'd love to hear from you!
                </p>
              </div>

              <div className="space-y-4 sm:space-y-8">
                <div>
                  <label
                    htmlFor="from_name"
                    className="block text-sm sm:text-lg font-medium text-emerald-600 dark:text-[#00FF00] mb-1 sm:mb-3"
                  >
                    Name
                  </label>
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-[#00FF00] text-sm sm:text-base"
                    />
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      required
                      value={formData.from_name}
                      onChange={handleChange}
                      className="pl-8 sm:pl-12 w-full px-2 sm:px-4 py-2 sm:py-4 bg-gray-50/80 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-sm sm:text-base"
                      placeholder="Your name"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="reply_to"
                    className="block text-sm sm:text-lg font-medium text-emerald-600 dark:text-[#00FF00] mb-1 sm:mb-3"
                  >
                    Email
                  </label>
                  <div className="relative group">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500 dark:text-[#00FF00] text-sm sm:text-base"
                    />
                    <input
                      id="reply_to"
                      name="reply_to"
                      type="email"
                      required
                      value={formData.reply_to}
                      onChange={handleChange}
                      className="pl-8 sm:pl-12 w-full px-2 sm:px-4 py-2 sm:py-4 bg-gray-50/80 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-sm sm:text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm sm:text-lg font-medium text-emerald-600 dark:text-[#00FF00] mb-1 sm:mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-2 sm:px-4 py-2 sm:py-4 bg-gray-50/80 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl text-sm sm:text-base"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-emerald-500 to-emerald-400 dark:from-[#00FF00] dark:to-emerald-400 text-white dark:text-gray-900 rounded-lg sm:rounded-xl font-medium sm:font-semibold text-sm sm:text-base shadow-lg"
                >
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className={`mr-2 ${isSubmitting ? "animate-pulse" : ""}`}
                  />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Background decorations - adjusted for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-2/3 sm:w-1/2 h-1/2 bg-gradient-to-bl from-emerald-100/20 dark:from-emerald-900/10 to-transparent rounded-full blur-3xl opacity-75 sm:opacity-100" />
          <div className="absolute -bottom-1/4 -left-1/4 w-2/3 sm:w-1/2 h-1/2 bg-gradient-to-tr from-emerald-100/20 dark:from-emerald-900/10 to-transparent rounded-full blur-3xl opacity-75 sm:opacity-100" />
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
