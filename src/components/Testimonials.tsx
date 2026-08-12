import { motion } from "framer-motion";
import { IMAGES } from "../images";

const TESTIMONIALS = [
  {
    quote:
      "The stage setup was exactly what we discussed. The finishing and flower work looked beautiful in person and in our photos. Our guests kept asking who did the decoration.",
    name: "Priya & Karthik",
    event: "Wedding",
    city: "Madurai",
    avatar: IMAGES.testimonials[0],
  },
  {
    quote:
      "We had a tight timeline and a specific theme in mind. They understood our requirements perfectly and delivered a reception stage that exceeded our expectations.",
    name: "Lakshmi Narayanan",
    event: "Reception",
    city: "Coimbatore",
    avatar: IMAGES.testimonials[1],
  },
  {
    quote:
      "From the pandhal to the mandap, the lighting to the entrance — everything was coordinated beautifully. They made our daughter's wedding day truly memorable.",
    name: "Senthil Kumar",
    event: "Wedding & Function Setup",
    city: "Thanjavur",
    avatar: IMAGES.testimonials[2],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 5 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function Testimonials() {
  return (
    <section className="section-padding bg-maroon-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            className="text-maroon-300 text-sm tracking-[0.15em] uppercase mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Testimonials
          </motion.p>
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            What Our Clients Say
          </motion.h2>
        </motion.div>

        {/* Testimonials Grid — staggered perspective rise */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ perspective: "800px" }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 },
              }}
            >
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 h-full flex flex-col rounded-sm">
                {/* Quote */}
                <blockquote className="text-ivory-200 text-base leading-relaxed mb-6 flex-1">
                  <span className="text-gold-400 text-2xl font-display leading-none">
                    "
                  </span>
                  {testimonial.quote}
                  <span className="text-gold-400 text-2xl font-display leading-none">
                    "
                  </span>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-maroon-300 text-xs">
                      {testimonial.event} · {testimonial.city}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
