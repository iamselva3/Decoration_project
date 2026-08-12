import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Phone, MapPin, Mail } from "lucide-react";
import { COMPANY, getWhatsAppLink } from "../config";

const EVENT_OPTIONS = [
  "Wedding",
  "Reception",
  "Engagement",
  "Baby Shower",
  "Birthday",
  "Family Function",
  "Corporate Event",
  "Cultural Program",
  "Religious Event",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, wire this to your backend or email service
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="section-padding bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-maroon-600 text-sm tracking-[0.15em] uppercase mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 mb-4"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Planning a Celebration?
          </motion.h2>
          <motion.p
            className="text-charcoal-500 text-base md:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Tell us about your event and let's create something memorable.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-14">
          {/* Contact Form — slides in from left */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-charcoal-700 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-charcoal-700 mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-event-type"
                    className="block text-sm font-medium text-charcoal-700 mb-1.5"
                  >
                    Event Type
                  </label>
                  <select
                    id="contact-event-type"
                    required
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-sm text-charcoal-900 focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 transition-colors text-sm"
                  >
                    <option value="">Select event type</option>
                    {EVENT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="contact-date"
                    className="block text-sm font-medium text-charcoal-700 mb-1.5"
                  >
                    Event Date
                  </label>
                  <input
                    id="contact-date"
                    type="date"
                    className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-sm text-charcoal-900 focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 transition-colors text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-location"
                  className="block text-sm font-medium text-charcoal-700 mb-1.5"
                >
                  Event Location
                </label>
                <input
                  id="contact-location"
                  type="text"
                  placeholder="City or venue name"
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-charcoal-700 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about your event — theme, budget, or any specific requirements"
                  className="w-full px-4 py-3 bg-white border border-charcoal-200 rounded-sm text-charcoal-900 placeholder:text-charcoal-400 focus:border-maroon-500 focus:ring-1 focus:ring-maroon-500 transition-colors text-sm resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="submit"
                  disabled={submitted}
                  className="inline-flex items-center justify-center gap-2 bg-maroon-800 hover:bg-maroon-900 text-white font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 text-sm disabled:opacity-60"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send className="w-4 h-4" />
                  {submitted ? "Enquiry Sent!" : "Send Enquiry"}
                </motion.button>

                <motion.a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3.5 rounded-sm transition-colors duration-200 text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </form>
          </motion.div>

          {/* Contact Info — slides in from right */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.15 }}
          >
            <div className="bg-maroon-800 text-white p-8 md:p-10 rounded-sm h-full">
              <h3 className="font-display text-xl font-semibold mb-6">
                Contact Details
              </h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Phone className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-maroon-200 mb-1">Phone</p>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="font-medium hover:text-gold-400 transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <MessageCircle className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-maroon-200 mb-1">WhatsApp</p>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:text-gold-400 transition-colors"
                    >
                      {COMPANY.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <Mail className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-maroon-200 mb-1">Email</p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="font-medium hover:text-gold-400 transition-colors"
                    >
                      {COMPANY.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <MapPin className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-maroon-200 mb-1">Location</p>
                    <p className="font-medium">{COMPANY.address}</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-ivory-300 text-sm italic">
                  Serving celebrations across Tamil Nadu — from Chennai to
                  Nagercoil.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
