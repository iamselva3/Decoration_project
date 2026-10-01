import { motion } from "framer-motion";

const REASONS = [
  {
    title: "Custom Decoration for Your Event",
    description:
      "We design every setup based on your specific event, theme preferences, and venue — no cookie-cutter templates.",
  },
  {
    title: "Traditional & Modern Concepts",
    description:
      "Whether you want an authentic Tamil mandap or a contemporary reception stage, we blend both styles with care.",
  },
  {
    title: "Complete Setup Coordination",
    description:
      "From stage construction and flower arrangements to lighting and seating — we coordinate everything so you don't have to.",
  },
  {
    title: "Attention to Finishing & Details",
    description:
      "The draping, flower placement, lighting angles, colour consistency — we care about the details that make the difference.",
  },
  {
    title: "Flexible Budget Solutions",
    description:
      "Premium doesn't always mean expensive. We offer solutions across different budgets without compromising on quality.",
  },
  {
    title: "Service Across Tamil Nadu",
    description:
      "From Chennai to Nagercoil, Madurai to Coimbatore — we travel to your venue wherever your celebration happens.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-[#111]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-24">
          <div>
            <motion.p
              className="text-label text-gold-400 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Why Us
            </motion.p>
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Why Families &<br />Businesses Choose Us
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <p className="text-white/40 text-sm md:text-base leading-relaxed">
              We take pride in delivering decoration work that looks as beautiful
              in person as it does in photographs — every time, without exception.
            </p>
          </motion.div>
        </div>

        {/* 6-reason grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          {REASONS.map((reason, index) => (
            <ReasonCard key={reason.title} {...reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      className="group border border-white/8 p-8 md:p-10 hover:bg-white/3 transition-colors duration-300 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      {/* Ghost number */}
      <span className="absolute -top-4 -right-2 font-display text-[6rem] font-bold text-white/4 leading-none select-none pointer-events-none">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Gold accent dot */}
      <div className="w-2 h-2 bg-gold-400 mb-6" />

      <h3 className="font-display text-xl font-semibold text-white mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-white/40 text-sm leading-relaxed">{description}</p>

      {/* Hover bottom line */}
      <div className="absolute bottom-0 left-0 h-px bg-gold-400 w-0 group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  );
}
