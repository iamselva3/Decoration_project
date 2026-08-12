import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks";

const STEPS = [
  {
    number: "01",
    title: "Tell Us About Your Event",
    description:
      "Share your event type, date, venue, and the vision you have in mind.",
  },
  {
    number: "02",
    title: "Choose Your Style",
    description:
      "Browse our portfolio, discuss themes, and pick the look that matches your celebration.",
  },
  {
    number: "03",
    title: "We Plan & Prepare",
    description:
      "Our team designs the layout, sources materials, and prepares everything in advance.",
  },
  {
    number: "04",
    title: "We Transform Your Venue",
    description:
      "On the day, we arrive early, set up every detail, and make sure everything looks perfect.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.6"],
  });

  // Connector line width grows as user scrolls through section
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-14 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-maroon-600 text-sm tracking-[0.15em] uppercase mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            How It Works
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            From Your Idea to the Final Celebration
          </motion.h2>
        </motion.div>

        {/* Steps with animated connector */}
        <div className="relative">
          {/* Connector line that draws as user scrolls (desktop) */}
          <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-px bg-maroon-100">
            <motion.div
              className="h-full bg-maroon-600 origin-left"
              style={{ width: prefersReduced ? "100%" : lineWidth }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {STEPS.map((step, index) => (
              <StepItem key={step.number} {...step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  number,
  title,
  description,
  index,
}: {
  number: string;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: index * 0.15,
      }}
    >
      <div className="relative">
        {/* Animated number — counts up effect via scale */}
        <motion.span
          className="font-display text-5xl md:text-6xl font-bold text-maroon-100 block"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: index * 0.15 + 0.1,
          }}
        >
          {number}
        </motion.span>

        <motion.h3
          className="font-display text-lg font-semibold text-charcoal-900 mt-3 mb-2"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.25 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-charcoal-500 text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.35 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
