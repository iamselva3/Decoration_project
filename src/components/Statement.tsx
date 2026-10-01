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

  const imgScale  = useTransform(scrollYProgress, [0, 0.5], [1.15, 1.0]);
  const imgY      = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: prefersReduced ? 1 : imgScale,
          y:     prefersReduced ? 0 : imgY,
        }}
      >
        <img
          src={IMAGES.statement}
          alt="Beautiful event decoration"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay — heavier than typical so text stays sharp */}
        <div className="absolute inset-0 bg-black/65" />
        {/* Fine grain overlay for depth */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
            backgroundSize: "160px 160px",
          }}
        />
      </motion.div>

      {/* Statement text */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Gold rule left-indent */}
        <motion.div
          className="h-px bg-gold-400 mb-10 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: "5rem" }}
        />

        <motion.p
          className="text-label text-gold-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Our Promise
        </motion.p>

        <div className="overflow-hidden mb-4">
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08]"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            We Don&apos;t Just<br />Decorate a Venue.
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gold-400 leading-[1.08] italic"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
          >
            We Create the Moment<br />Everyone Remembers.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
