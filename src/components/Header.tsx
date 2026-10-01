import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { COMPANY, getWhatsAppLink } from "../config";
import { useScrollLock } from "../hooks";

const NAV_LINKS = [
  { label: "Home",      href: "#home" },
  { label: "About",     href: "#about" },
  { label: "Services",  href: "#services" },
  { label: "Our Works", href: "#portfolio" },
  { label: "Contact",   href: "#contact" },
];

export default function Header() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollLock(isOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled && !isOpen
          ? "bg-[#0d0d0d]/95 backdrop-blur-sm"
          : isOpen
          ? "bg-[#0d0d0d]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 relative z-[60]">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Brand mark */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            className="flex items-center gap-3"
          >
            {/* Gold diamond */}
            <div className="w-5 h-5 bg-gold-400 rotate-45 flex-shrink-0" />
            <span className="font-display text-lg md:text-xl font-semibold tracking-wide text-white">
              {COMPANY.name}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="text-xs tracking-widest uppercase text-white/55 hover:text-gold-400 transition-colors duration-200 font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2.5 px-5"
            >
              Book a Consultation
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-[#0d0d0d] z-[50] flex flex-col pt-20 pb-12 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Decorative rule */}
            <div className="rule-gold mb-10" />

            <nav className="flex flex-col gap-7">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="font-display text-4xl font-semibold text-white/80 hover:text-gold-400 transition-colors"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 + 0.1, duration: 0.3 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="mt-auto pt-8 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                Book a Consultation
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
