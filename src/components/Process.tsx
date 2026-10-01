import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks";

const STEPS = [
  {
    number: "01",
    title: "Tell Us About Your Event",
    description: "Share your event type, date, venue, and the vision you have in mind. A quick WhatsApp chat is enough to get started.",
  },
  {
    number: "02",
    title: "Choose Your Style",
    description: "Browse our portfolio, discuss themes, and pick the look that matches your celebration and budget.",
  },
  {
    number: "03",
    title: "We Plan & Prepare",
    description: "Our team designs the layout, sources materials, and prepares every element in advance — nothing left to chance.",
  },
  {
    number: "04",
    title: "We Transform Your Venue",
    description: "On the day, we arrive early, set up every detail, and make sure everything looks perfect before the first guest arrives.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.5"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="section-padding bg-[#161616]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.p
            className="text-label text-gold-400 mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.p>
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-xl leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            From Your Idea to the Final Celebration
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Scroll-drawn connector line — desktop */}
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-white/8">
            <motion.div
              className="h-full bg-gold-400 origin-left"
              style={{ width: prefersReduced ? "100%" : lineWidth }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.15 }}
              >
                {/* Step node */}
                <div className="w-14 h-14 border border-white/15 flex items-center justify-center mb-6 relative bg-[#161616]">
                  <span className="font-display text-2xl font-bold text-gold-400">{step.number}</span>
                </div>

                <h3 className="font-display text-xl font-semibold text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
