import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../images";
import { useIsMobile, usePrefersReducedMotion } from "../hooks";

const SERVICES = [
  {
    num: "01",
    title: "Wedding & Reception Décor",
    description:
      "Elegant floral stages, custom backdrops, and complete wedding venue transformations. Every petal placed with intention.",
    image: IMAGES.weddingDecor,
    alt: "Wedding stage with floral decoration",
  },
  {
    num: "02",
    title: "Traditional Mandap Setup",
    description:
      "Authentic Tamil wedding mandaps with flowers, fabric draping, banana leaf arrangements, and deep cultural styling.",
    image: IMAGES.mandap,
    alt: "Traditional South Indian wedding mandap",
  },
  {
    num: "03",
    title: "Pandal & Function Setup",
    description:
      "Complete pandhal arrangements for weddings, family functions and public events — professional structure, elegant finish.",
    image: IMAGES.pandal,
    alt: "Function pandhal setup",
  },
  {
    num: "04",
    title: "Stage & Speaker Setup",
    description:
      "Professional stages for corporate events, cultural programs, and ceremonies designed for visual impact.",
    image: IMAGES.stage,
    alt: "Corporate event stage setup",
  },
  {
    num: "05",
    title: "Entrance & Welcome Décor",
    description:
      "Grand flower arches, welcome gates, and entrance styling that create a lasting first impression.",
    image: IMAGES.entrance,
    alt: "Decorated entrance with flower arch",
  },
  {
    num: "06",
    title: "Lighting & Event Production",
    description:
      "Stage lighting, ambient mood lighting, LED installations, and complete event production support.",
    image: IMAGES.lighting,
    alt: "Event lighting and stage production",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-[#111]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16 md:mb-24">
          <div>
            <motion.p
              className="text-label text-gold-400 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What We Do
            </motion.p>
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Our Services
            </motion.h2>
          </div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-display text-[10rem] font-bold text-white/4 leading-none select-none">
              06
            </span>
          </motion.div>
        </div>

        {/* Services list — editorial alternating layout */}
        <div className="space-y-0">
          {SERVICES.map((service, index) => (
            <ServiceRow key={service.num} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceRow({
  num,
  title,
  description,
  image,
  alt,
  index,
}: {
  num: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || prefersReduced) return;
      const el = cardRef.current;
      if (!el) return;
      const r  = el.getBoundingClientRect();
      const x  = (e.clientX - r.left) / r.width  - 0.5;
      const y  = (e.clientY - r.top)  / r.height - 0.5;
      setTilt({ rx: -y * 6, ry: x * 6 });
    },
    [isMobile, prefersReduced]
  );

  const onMouseLeave = useCallback(() => setTilt({ rx: 0, ry: 0 }), []);

  return (
    <motion.div
      className="group grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/8 py-12 md:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: 0.05 }}
    >
      {/* Image — 3D tilt card */}
      <div
        className={`card-3d-wrapper mb-8 md:mb-0 ${isEven ? "" : "md:order-2"}`}
      >
        <div
          ref={cardRef}
          className="card-3d relative overflow-hidden aspect-[16/10] md:aspect-[4/3]"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          {/* Service number stamp */}
          <div className="absolute top-4 left-4 font-display text-5xl font-bold text-white/10 leading-none select-none">
            {num}
          </div>
          {/* Bottom strip */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>

      {/* Text */}
      <div className={`flex flex-col justify-center ${isEven ? "md:pl-16 lg:pl-24" : "md:pr-16 lg:pr-24 md:order-1"}`}>
        <motion.span
          className="font-display text-7xl font-bold text-white/5 leading-none mb-4 select-none"
          initial={{ x: isEven ? 40 : -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {num}
        </motion.span>

        <motion.h3
          className="font-display text-3xl md:text-4xl font-semibold text-white mb-4 leading-snug"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {title}
        </motion.h3>

        {/* Gold rule */}
        <motion.div
          className="h-px bg-gold-400 mb-5 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ width: "3.5rem" }}
        />

        <motion.p
          className="text-white/50 leading-relaxed text-sm md:text-base"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}
