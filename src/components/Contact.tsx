import { type FormEvent, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, Phone, MapPin, Mail, ChevronDown, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
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

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [eventType, setEventType] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [dateStr, setDateStr] = useState("");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const dateRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  return (
    <section id="contact" className="section-padding bg-[#161616]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Header */}
        <div className="mb-14 md:mb-20">
          <motion.p
            className="text-label text-gold-400 mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Planning a Celebration?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="dark-input"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="dark-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div ref={dropdownRef} className="relative">
                  <label htmlFor="contact-event-type" className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                    Event Type
                  </label>
                  <div 
                    className="dark-input flex items-center justify-between cursor-pointer select-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className={eventType ? "text-[#f0ece4]" : "text-[#555]"}>
                      {eventType || "Select event type"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-[#888] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </div>
                  
                  {/* Hidden input to maintain native required form validation */}
                  <input type="text" id="contact-event-type" required value={eventType} className="absolute opacity-0 w-0 h-0 pointer-events-none bottom-0" onChange={() => {}} tabIndex={-1} />

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 top-full left-0 right-0 mt-1 bg-[#181818] border border-[#2a2a2a] max-h-60 overflow-y-auto"
                      >
                        {EVENT_OPTIONS.map((opt) => (
                          <div
                            key={opt}
                            className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-[#222] hover:text-[#c9a926] transition-colors ${eventType === opt ? "text-[#c9a926] bg-[#222]" : "text-[#f0ece4]"}`}
                            onClick={() => {
                              setEventType(opt);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div ref={dateRef} className="relative">
                  <label htmlFor="contact-date" className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                    Event Date
                  </label>
                  <div 
                    className="dark-input flex items-center justify-between cursor-pointer select-none"
                    onClick={() => setIsDateOpen(!isDateOpen)}
                  >
                    <span className={dateStr ? "text-[#f0ece4]" : "text-[#555]"}>
                      {dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Select date"}
                    </span>
                    <CalendarIcon className="w-4 h-4 text-[#888]" />
                  </div>
                  
                  {/* Hidden input to maintain native required form validation */}
                  <input type="text" id="contact-date" required value={dateStr} className="absolute opacity-0 w-0 h-0 pointer-events-none bottom-0 right-0" onChange={() => {}} tabIndex={-1} />

                  <AnimatePresence>
                    {isDateOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-20 top-full right-0 sm:left-0 mt-1 bg-[#181818] border border-[#2a2a2a] p-4 shadow-xl w-full sm:w-[280px]"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <button type="button" onClick={handlePrevMonth} className="p-1 hover:bg-[#333] rounded transition-colors text-[#f0ece4]">
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-[#f0ece4] font-semibold text-sm">
                            {MONTHS[currentMonth]} {currentYear}
                          </span>
                          <button type="button" onClick={handleNextMonth} className="p-1 hover:bg-[#333] rounded transition-colors text-[#f0ece4]">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
                          {DAYS.map(day => (
                            <div key={day} className="text-[#888] text-[10px] uppercase tracking-wider font-medium w-full h-8 flex items-center justify-center">
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} className="w-full h-8 sm:w-8"></div>
                          ))}
                          {Array.from({ length: daysInMonth }).map((_, i) => {
                            const d = i + 1;
                            const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                            const isSelected = dateStr === formattedDate;
                            return (
                              <div
                                key={d}
                                className={`w-full h-8 sm:w-8 flex items-center justify-center text-xs cursor-pointer rounded-full transition-colors ${isSelected ? "bg-[#c9a926] text-black font-semibold" : "text-[#f0ece4] hover:bg-[#333]"}`}
                                onClick={() => {
                                  setDateStr(formattedDate);
                                  setIsDateOpen(false);
                                }}
                              >
                                {d}
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div>
                <label htmlFor="contact-location" className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                  Event Location
                </label>
                <input
                  id="contact-location"
                  type="text"
                  placeholder="City or venue name"
                  className="dark-input"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell us about your event — theme, budget, or any specific requirements"
                  className="dark-input resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <motion.button
                  type="submit"
                  disabled={submitted}
                  className="btn-primary disabled:opacity-50"
                  whileHover={{ scale: submitted ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitted ? "Enquiry Sent!" : "Send Enquiry"}
                </motion.button>

                <motion.a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </motion.a>
              </div>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            {/* Gold rule */}
            <div className="h-px bg-gold-400 mb-10" style={{ width: "3rem" }} />

            <p className="font-display text-2xl font-semibold text-white mb-8 italic">
              Let's create something beautiful together.
            </p>

            <div className="space-y-7">
              {[
                { icon: Phone, label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
                { icon: MessageCircle, label: "WhatsApp", value: COMPANY.phone, href: getWhatsAppLink(), external: true },
                { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
                { icon: MapPin, label: "Location", value: COMPANY.address, href: undefined },
              ].map(({ icon: Icon, label, value, href, external }, i) => (
                <motion.div
                  key={label}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="w-9 h-9 border border-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-gold-400" />
                  </div>
                  <div>
                    <p className="text-label text-white/30 mb-1">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-white/70 hover:text-gold-400 transition-colors text-sm"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-white/70 text-sm">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/8">
              <p className="text-white/30 text-xs leading-relaxed">
                Serving celebrations across Tamil Nadu — from Chennai to Nagercoil.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
