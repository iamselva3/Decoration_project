import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "../config";
import { IMAGES } from "../images";
import { usePrefersReducedMotion } from "../hooks";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY      = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textY    = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: prefersReduced ? 0 : bgY }}
      >
        <img
          src={IMAGES.hero}
          alt="Wedding stage with grand floral decoration"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        {/* Multi-layer dark gradient — bottom-weighted for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full pt-32 pb-20 md:pb-28 px-6 sm:px-10 lg:px-20"
        style={{
          y:       prefersReduced ? 0 : textY,
          opacity: prefersReduced ? 1 : opacity,
        }}
      >
        {/* Label */}
        <motion.p
          className="text-label text-gold-400 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          Premium Event Decoration &amp; Management — Tamil Nadu
        </motion.p>

        {/* Gold rule */}
        <motion.div
          className="h-px bg-gold-400 mb-8 origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "6rem" }}
        />

        {/* Heading */}
        <div className="overflow-hidden mb-6">
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-8xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Every Celebration Deserves a&nbsp;
            <em className="not-italic text-gold-400">Beautiful Stage.</em>
          </motion.h1>
        </div>

        {/* Sub-copy */}
        <motion.p
          className="text-white/60 text-sm md:text-base max-w-lg leading-relaxed mb-12 font-light"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          From traditional wedding mandaps and grand reception stages to complete
          event setups — handcrafted for families across Tamil Nadu since 2014.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-primary"
          >
            View Our Works
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Get a Free Quote
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue — minimal line */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          className="w-px h-12 bg-white/30 origin-top"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-label text-white/30 rotate-90 origin-center mt-2" style={{ writingMode: "vertical-lr" }}>
          scroll
        </span>
      </motion.div>
    </section>
  );
}
