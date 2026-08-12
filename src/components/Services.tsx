import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "../images";
import { useIsMobile, usePrefersReducedMotion } from "../hooks";

const SERVICES = [
  {
    title: "Wedding & Reception Décor",
    description:
      "Elegant floral stages, custom backdrops, and complete wedding venue transformations that make your special day unforgettable.",
    image: IMAGES.weddingDecor,
    alt: "Wedding stage with floral decoration",
  },
  {
    title: "Traditional Mandap Setup",
    description:
      "Authentic Tamil wedding mandaps with traditional elements — flowers, fabric draping, banana leaf arrangements, and cultural styling.",
    image: IMAGES.mandap,
    alt: "Traditional South Indian wedding mandap",
  },
  {
    title: "Pandal & Function Setup",
    description:
      "Complete pandhal arrangements for weddings, family functions, and public events with professional structure and elegant finishing.",
    image: IMAGES.pandal,
    alt: "Function pandhal setup",
  },
  {
    title: "Stage & Speaker Setup",
    description:
      "Professional stages for speakers, corporate events, cultural programs, and ceremonies — designed for impact and functionality.",
    image: IMAGES.stage,
    alt: "Corporate event stage setup",
  },
  {
    title: "Entrance & Welcome Décor",
    description:
      "Grand flower arches, welcome gates, and hall entrance styling that create a lasting first impression for your guests.",
    image: IMAGES.entrance,
    alt: "Decorated entrance with flower arch",
  },
  {
    title: "Lighting & Event Production",
    description:
      "Stage lighting, ambient mood lighting, LED installations, and complete event production support for a polished look.",
    image: IMAGES.lighting,
    alt: "Event lighting and stage production",
  },
];

// Heading word-by-word reveal
const headingVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-ivory-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with word-by-word reveal */}
        <motion.div
          className="mb-14 md:mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-maroon-600 text-sm tracking-[0.15em] uppercase mb-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 flex flex-wrap gap-x-3"
            variants={headingVariants}
          >
            {"Our Services".split(" ").map((word, i) => (
              <motion.span key={i} variants={wordVariant}>
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        {/* Editorial Layout — alternating large/small */}
        <div className="space-y-16 md:space-y-24">
          {SERVICES.map((service, index) => (
            <ServiceItem key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({
  title,
  description,
  image,
  alt,
  index,
}: {
  title: string;
  description: string;
  image: string;
  alt: string;
  index: number;
}) {
  const isEven = index % 2 === 0;
  const isMobile = useIsMobile();
  const prefersReduced = usePrefersReducedMotion();

  // 3D tilt state for desktop
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || prefersReduced) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotateX: -y * 5, rotateY: x * 5 });
    },
    [isMobile, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  // Image clip-path reveal animation
  const imageVariants = {
    hidden: {
      clipPath: isEven
        ? "inset(0 100% 0 0)"
        : "inset(0 0 0 100%)",
      opacity: 0,
    },
    visible: {
      clipPath: "inset(0 0% 0 0%)",
      opacity: 1,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.1 },
    },
  };

  // Content slide in from opposite side
  const contentVariants = {
    hidden: { opacity: 0, x: isEven ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.3 },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
      style={{
        perspective: "800px",
        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.3s ease-out",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Image with clip-path reveal */}
      <motion.div
        className={`overflow-hidden ${isEven ? "" : "md:order-2"}`}
        variants={imageVariants}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <motion.img
            src={image}
            alt={alt}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Content — slides in from opposite side, subtly offset in 3D */}
      <motion.div
        className={isEven ? "" : "md:order-1"}
        variants={contentVariants}
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="border-l-2 border-maroon-600 pl-6 md:pl-8">
          <span className="text-maroon-400 text-sm font-medium tracking-wider uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal-900 mt-2 mb-4">
            {title}
          </h3>
          <p className="text-charcoal-600 leading-relaxed text-base md:text-lg">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
