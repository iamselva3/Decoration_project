import { Palette, Sparkles, ClipboardList, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const HIGHLIGHTS = [
  {
    icon: Palette,
    title: "Custom Designs",
    description: "Every décor is tailored to your event theme and vision.",
  },
  {
    icon: Sparkles,
    title: "Traditional & Modern",
    description: "Blending cultural authenticity with contemporary elegance.",
  },
  {
    icon: ClipboardList,
    title: "Complete Setup",
    description: "From concept to execution — we handle every detail.",
  },
  {
    icon: MapPin,
    title: "Tamil Nadu Wide",
    description: "Serving celebrations across every district.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function TrustStrip() {
  return (
    <section className="bg-maroon-800 text-white py-14 md:py-16" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          className="text-center text-ivory-200 text-sm tracking-[0.15em] uppercase mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Decorating Celebrations Across Tamil Nadu
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
            <motion.div key={title} className="text-center" variants={itemVariants}>
              <motion.div
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4"
                whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className="w-5 h-5 text-gold-400" />
              </motion.div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {title}
              </h3>
              <p className="text-ivory-300 text-sm leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
