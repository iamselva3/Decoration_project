import { Palette, Sparkles, ClipboardList, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "1,200+", label: "Events Decorated" },
  { value: "28", label: "Districts Served" },
  { value: "100%", label: "On-Site Execution" },
];

const MARQUEE_ITEMS = [
  "Wedding Stages",
  "Reception Setups",
  "Traditional Mandaps",
  "Pandhal Arrangements",
  "Engagement Décor",
  "Corporate Events",
  "Birthday Celebrations",
  "Cultural Programs",
];

export default function TrustStrip() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section id="about" className="bg-[#161616] border-y border-white/5">
      {/* Stats row */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center md:px-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <span className="font-display text-5xl md:text-6xl font-bold text-gold-400 leading-none mb-2">
                {stat.value}
              </span>
              <span className="text-label text-white/40">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gold rule */}
      <div className="rule-gold" />

      {/* Scrolling marquee */}
      <div className="overflow-hidden py-5 bg-[#111]">
        <div className="animate-marquee">
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-5 text-white/30 text-label">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
