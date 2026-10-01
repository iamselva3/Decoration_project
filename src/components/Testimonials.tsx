import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "The stage setup was exactly what we discussed. The finishing and flower work looked beautiful in person and in our photos. Our guests kept asking who did the decoration.",
    name: "Priya & Karthik",
    event: "Wedding",
    city: "Madurai",
    year: "2024",
  },
  {
    quote:
      "We had a tight timeline and a specific theme in mind. They understood our requirements perfectly and delivered a reception stage that exceeded every expectation.",
    name: "Lakshmi Narayanan",
    event: "Reception",
    city: "Coimbatore",
    year: "2024",
  },
  {
    quote:
      "From the pandhal to the mandap, the lighting to the entrance — everything was coordinated beautifully. They made our daughter's wedding day truly memorable.",
    name: "Senthil Kumar",
    event: "Wedding & Function Setup",
    city: "Thanjavur",
    year: "2023",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-[#111]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 md:mb-20">
          <div>
            <motion.p
              className="text-label text-gold-400 mb-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Client Stories
            </motion.p>
            <motion.h2
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              What Our Clients Say
            </motion.h2>
          </div>
        </div>

        {/* Testimonials — editorial horizontal cards */}
        <div className="space-y-0 divide-y divide-white/8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.name}
              className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 py-10 md:py-12 hover:bg-white/[0.015] transition-colors duration-300 px-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
            >
              {/* Quote text */}
              <div className="flex gap-6 items-start">
                <span className="font-display text-5xl text-gold-400/40 leading-none mt-1 select-none flex-shrink-0">
                  "
                </span>
                <blockquote className="font-display text-xl md:text-2xl text-white/80 italic leading-relaxed">
                  {t.quote}
                </blockquote>
              </div>

              {/* Attribution — right aligned on desktop */}
              <div className="md:text-right pl-14 md:pl-0 flex flex-col justify-center min-w-[160px]">
                <p className="text-white font-semibold text-sm mb-0.5">{t.name}</p>
                <p className="text-white/40 text-xs">{t.event}</p>
                <p className="text-gold-400/70 text-xs mt-1">{t.city} · {t.year}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom gold rule */}
        <div className="rule-gold mt-12" />
      </div>
    </section>
  );
}
