import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY, getWhatsAppLink } from "../config";
import { useScrollLock } from "../hooks";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Works", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollLock(isOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled && !isOpen
          ? "bg-white/95 backdrop-blur-sm shadow-md"
          : isOpen
          ? "bg-ivory-50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[60]">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="flex items-center gap-2"
          >
            <span
              className={`font-display text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isOpen || scrolled ? "text-maroon-800" : "text-white"
              }`}
            >
              {COMPANY.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-maroon-600 ${
                  scrolled ? "text-charcoal-700" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* WhatsApp Button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              WhatsApp Us
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${
              isOpen || scrolled ? "text-charcoal-800" : "text-white"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-0 left-0 w-screen h-screen min-h-dvh bg-ivory-50 z-[50] flex flex-col justify-between pt-24 pb-12 px-6 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center justify-center gap-6 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-2xl font-display font-semibold text-charcoal-800 hover:text-maroon-700 transition-colors"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 + 0.08, duration: 0.18 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              className="flex flex-col gap-4 items-center pt-6 border-t border-maroon-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold w-full max-w-xs py-3.5 rounded-md transition-colors shadow-md text-base"
              >
                <Phone className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href={`tel:${COMPANY.phone}`}
                className="text-charcoal-700 font-semibold text-sm"
              >
                {COMPANY.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
