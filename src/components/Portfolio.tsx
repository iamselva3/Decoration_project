import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { IMAGES } from "../images";

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
  const [lightbox, setLightbox] = useState<null | (typeof IMAGES.portfolio)[number]>(null);

  const filtered =
    activeCategory === "All"
      ? IMAGES.portfolio
      : IMAGES.portfolio.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="section-padding bg-[#0e0e0e]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <motion.p
              className="text-label text-gold-400 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Portfolio
            </motion.p>
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Crafted for Memorable<br />Celebrations
            </motion.h2>
          </div>
          <motion.p
            className="text-white/40 text-sm max-w-xs mt-4 md:mt-0 md:text-right leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            A glimpse into the celebrations we've decorated across Tamil Nadu.
          </motion.p>
        </div>

        {/* Category filter — minimal pill style */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase font-medium border transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-gold-400 text-black border-gold-400"
                  : "bg-transparent text-white/40 border-white/15 hover:border-white/40 hover:text-white/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Horizontal scroll gallery on mobile, masonry on desktop */}

        {/* Mobile: horizontal scroll strip */}
        <div className="md:hidden mb-8">
          <div className="h-scroll-track">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={`${item.title}-${item.location}`}
                  className="h-scroll-item w-64 relative overflow-hidden"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setLightbox(item)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.src}
                      alt={`${item.title} — ${item.location}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-gold-400 text-[10px] tracking-widest uppercase mb-1">{item.category}</p>
                      <p className="text-white text-sm font-semibold font-display">{item.title}</p>
                      <p className="text-white/50 text-xs mt-0.5">{item.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop: real masonry grid */}
        <div className="hidden md:block">
          <AnimatePresence mode="sync">
            <div className="masonry-grid">
              {filtered.map((item, index) => (
                <MasonryItem
                  key={`${item.title}-${item.location}`}
                  item={item}
                  index={index}
                  onOpen={() => setLightbox(item)}
                />
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-gold-400 text-label mb-1">{lightbox.category}</p>
                  <p className="text-white font-display text-2xl">{lightbox.title}</p>
                  <p className="text-white/40 text-sm">{lightbox.location}</p>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  className="p-3 border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MasonryItem({
  item,
  index,
  onOpen,
}: {
  item: (typeof IMAGES.portfolio)[number];
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div
      className="masonry-item group relative overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08 }}
      onClick={onOpen}
    >
      <img
        src={item.src}
        alt={`${item.title} — ${item.location}`}
        className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end">
        <div className="p-4 translate-y-3 group-hover:translate-y-0 transition-transform duration-400">
          <p className="text-gold-400 text-[10px] tracking-widest uppercase mb-1">{item.category}</p>
          <p className="text-white font-display text-base font-semibold">{item.title}</p>
          <p className="text-white/50 text-xs mt-0.5">{item.location}</p>
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ZoomIn className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}
