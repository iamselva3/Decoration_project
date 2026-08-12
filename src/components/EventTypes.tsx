import { motion } from "framer-motion";
import { IMAGES } from "../images";

const EVENT_TYPES = [
  { name: "Weddings", image: IMAGES.eventTypes.weddings },
  { name: "Receptions", image: IMAGES.eventTypes.receptions },
  { name: "Engagements", image: IMAGES.eventTypes.engagements },
  { name: "Baby Showers", image: IMAGES.eventTypes.babyShowers },
  { name: "Birthdays", image: IMAGES.eventTypes.birthdays },
  { name: "Family Functions", image: IMAGES.eventTypes.familyFunctions },
  { name: "Corporate Events", image: IMAGES.eventTypes.corporate },
  { name: "Cultural Programs", image: IMAGES.eventTypes.cultural },
  { name: "Religious Events", image: IMAGES.eventTypes.religious },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function EventTypes() {
  return (
    <section className="section-padding bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-maroon-600 text-sm tracking-[0.15em] uppercase mb-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Events We Decorate
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Celebrations of Every Kind
          </motion.h2>
        </motion.div>

        {/* Event Types Grid with stagger */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {EVENT_TYPES.map((event) => (
            <EventTypeCard key={event.name} {...event} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function EventTypeCard({ name, image }: { name: string; image: string }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-sm cursor-pointer"
      variants={cardVariants}
      whileHover={{
        y: -6,
        transition: { duration: 0.3 },
      }}
      style={{ perspective: "500px" }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={`${name} decoration`}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Gradient overlay — darkens on hover for text contrast */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          whileHover={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.2), transparent)" }}
          transition={{ duration: 0.3 }}
        />
        {/* Text shifts up slightly on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <motion.h3
            className="font-display text-base md:text-lg font-semibold text-white"
            initial={{ y: 0 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>
          {/* Animated border line on hover */}
          <motion.div
            className="h-0.5 bg-gold-400 mt-2 origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
