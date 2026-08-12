import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from "../images";
import { useIsMobile, usePrefersReducedMotion } from "../hooks";

const CATEGORIES = [
  "All",
  "Wedding",
  "Reception",
  "Engagement",
  "Traditional Mandap",
  "Pandal",
  "Corporate",
  "Birthday",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? IMAGES.portfolio
      : IMAGES.portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — line-by-line reveal */}
        <motion.div
          className="mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-maroon-600 text-sm tracking-[0.15em] uppercase mb-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Portfolio
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 mb-4"
            initial={{ opacity: 0, y: 30, clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.1 }}
          >
            Crafted for Memorable Celebrations
          </motion.h2>
          <motion.p
            className="text-charcoal-500 text-base md:text-lg max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            A glimpse into the celebrations we've decorated across Tamil Nadu.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-maroon-800 text-white"
                  : "bg-ivory-100 text-charcoal-600 hover:bg-ivory-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid with AnimatePresence for filtering */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <PortfolioItem
                key={`${item.title}-${item.location}`}
                item={item}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function PortfolioItem({
  item,
  index,
}: {
  item: (typeof IMAGES.portfolio)[number];
  index: number;
}) {
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Make certain items span 2 rows for asymmetry
  const isLarge = index === 0 || index === 3;

  // Subtle 3D perspective on hover (desktop only)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || prefersReduced) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotateX: -y * 4, rotateY: x * 4 });
    },
    [isMobile, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  // Staggered parallax — different items have different y offsets
  const yOffset = index % 3 === 0 ? 60 : index % 3 === 1 ? 40 : 80;

  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-sm cursor-pointer ${
        isLarge ? "sm:row-span-2" : ""
      }`}
      layout
      initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: index * 0.08,
      }}
      style={{
        perspective: "600px",
        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.25s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative ${isLarge ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
        <motion.img
          src={item.src}
          alt={`${item.title} — ${item.location}`}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Hover Overlay with smooth slide-up transition */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="p-5 md:p-6"
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <p className="text-gold-400 text-xs tracking-[0.15em] uppercase font-medium mb-1">
              {item.category}
            </p>
            <p className="text-white font-display text-lg font-semibold">
              {item.title}
            </p>
            <p className="text-ivory-300 text-sm mt-1">{item.location}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
