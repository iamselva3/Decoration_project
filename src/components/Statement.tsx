import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { IMAGES } from "../images";
import { usePrefersReducedMotion } from "../hooks";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Image: starts zoomed, settles to normal scale as user scrolls through
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1.0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Text: fades in and moves up as section enters viewport
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.45], [50, 0]);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Background Image — cinematic scale/parallax on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: prefersReduced ? 1 : imgScale,
          y: prefersReduced ? 0 : imgY,
        }}
      >
        <img
          src={IMAGES.statement}
          alt="Beautiful event decoration"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      {/* Statement Text — gradual reveal on scroll */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        style={{
          opacity: prefersReduced ? 1 : textOpacity,
          y: prefersReduced ? 0 : textY,
        }}
      >
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            We Don't Just Decorate a Venue.
          </motion.span>
          <motion.span
            className="block text-gold-400 mt-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.25 }}
          >
            We Create the Moment Everyone Remembers.
          </motion.span>
        </motion.h2>
      </motion.div>
    </section>
  );
}
