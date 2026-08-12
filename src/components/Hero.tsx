import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "../config";
import { IMAGES } from "../images";
import { useMouseParallax, usePrefersReducedMotion } from "../hooks";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseOffset = useMouseParallax(20);
  const prefersReduced = usePrefersReducedMotion();

  // Parallax: background moves slower than foreground on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  // Hero entrance animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const headingVariant = {
    hidden: { opacity: 0, y: 60, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image — parallax on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ y: prefersReduced ? 0 : bgY }}
      >
        <img
          src={IMAGES.hero}
          alt="Premium wedding stage decoration with floral arrangements"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"
          style={{ opacity: prefersReduced ? 1 : overlayOpacity }}
        />
      </motion.div>

      {/* Content — mouse-based 3D depth + scroll parallax */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-20"
        style={{
          y: prefersReduced ? 0 : contentY,
          x: mouseOffset.x * 0.3,
          rotateX: mouseOffset.y * -0.08,
          rotateY: mouseOffset.x * 0.08,
        }}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.p
          className="text-ivory-200 text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-6"
          variants={fadeUp}
        >
          Premium Event Decoration & Management
        </motion.p>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          variants={headingVariant}
        >
          Every Celebration Deserves a Beautiful Stage.
        </motion.h1>

        <motion.p
          className="text-ivory-200 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          variants={fadeUp}
        >
          From traditional wedding mandaps and elegant reception stages to grand
          pandhals and complete event setups — we bring your celebration to
          life.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={fadeUp}
        >
          <motion.a
            href="#portfolio"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#portfolio")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 bg-white text-charcoal-900 font-semibold px-8 py-3.5 rounded-md text-sm md:text-base"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            View Our Works
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-white/80 text-white font-semibold px-8 py-3.5 rounded-md text-sm md:text-base"
            whileHover={{ scale: 1.04, y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <MessageCircle className="w-4 h-4" />
            Get a Free Quote
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center pt-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1.5 h-3 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
