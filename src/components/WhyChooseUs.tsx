import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Custom Decoration for Your Event",
    description:
      "We design every setup based on your specific event, theme preferences, and venue requirements — no cookie-cutter templates.",
  },
  {
    title: "Traditional & Modern Concepts",
    description:
      "Whether you want an authentic Tamil wedding mandap or a contemporary reception stage, we blend both styles seamlessly.",
  },
  {
    title: "Complete Setup Coordination",
    description:
      "From stage construction and flower arrangements to lighting and seating — we coordinate everything so you don't have to.",
  },
  {
    title: "Attention to Finishing & Details",
    description:
      "The draping, flower placement, lighting angles, and colour consistency — we care about the details that make the difference.",
  },
  {
    title: "Flexible Budget Solutions",
    description:
      "Premium doesn't always mean expensive. We offer solutions across different budgets without compromising on quality.",
  },
  {
    title: "Service Across Tamil Nadu",
    description:
      "From Chennai to Nagercoil, Madurai to Coimbatore — we travel to your venue and set up wherever your celebration happens.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-12 md:mb-16 max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-maroon-600 text-sm tracking-[0.15em] uppercase mb-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Us
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Why Families & Businesses Choose Us
          </motion.h2>
          <motion.p
            className="text-charcoal-500 text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We take pride in delivering decoration work that looks as beautiful
            in person as it does in photographs.
          </motion.p>
        </motion.div>

        {/* Reasons Grid — alternating left/right slide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {REASONS.map((reason, index) => (
            <ReasonItem key={reason.title} {...reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonItem({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  // Left column slides from left, right column from right
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className="flex gap-4"
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: index * 0.08,
      }}
    >
      <motion.div
        className="flex-shrink-0 mt-1"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
          delay: index * 0.08 + 0.2,
        }}
      >
        <CheckCircle2 className="w-5 h-5 text-maroon-600" />
      </motion.div>
      <div>
        <h3 className="font-display text-lg font-semibold text-charcoal-900 mb-2">
          {title}
        </h3>
        <p className="text-charcoal-500 leading-relaxed text-sm md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
