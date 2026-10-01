import { motion } from "framer-motion";
import { IMAGES } from "../images";

const EVENT_TYPES = [
  { name: "Weddings",          image: IMAGES.eventTypes.weddings },
  { name: "Receptions",        image: IMAGES.eventTypes.receptions },
  { name: "Engagements",       image: IMAGES.eventTypes.engagements },
  { name: "Baby Showers",      image: IMAGES.eventTypes.babyShowers },
  { name: "Birthdays",         image: IMAGES.eventTypes.birthdays },
  { name: "Family Functions",  image: IMAGES.eventTypes.familyFunctions },
  { name: "Corporate Events",  image: IMAGES.eventTypes.corporate },
  { name: "Cultural Programs", image: IMAGES.eventTypes.cultural },
  { name: "Religious Events",  image: IMAGES.eventTypes.religious },
];

export default function EventTypes() {
  return (
    <section className="section-padding bg-[#0e0e0e]">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.p
            className="text-label text-gold-400 mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Events We Decorate
          </motion.p>
          <motion.h2
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Celebrations of Every Kind
          </motion.h2>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="md:hidden mb-0">
          <div className="h-scroll-track">
            {EVENT_TYPES.map((event, i) => (
              <div key={event.name} className="h-scroll-item w-48">
                <EventCard event={event} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 3-col editorial grid with varying heights */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-3 gap-0.5">
          {EVENT_TYPES.map((event, index) => {
            // Give every 4th card a taller aspect for visual variety
            const isTall = index === 0 || index === 4 || index === 7;
            return (
              <motion.div
                key={event.name}
                className={`group relative overflow-hidden cursor-pointer ${
                  isTall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
              >
                <img
                  src={event.image}
                  alt={`${event.name} decoration`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                {/* Persistent bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                  <h3 className="font-display text-lg md:text-xl font-semibold text-white leading-snug mb-1.5">
                    {event.name}
                  </h3>
                  {/* Gold reveal bar */}
                  <div className="h-px bg-gold-400 w-0 group-hover:w-8 transition-all duration-500 ease-out origin-left" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, index }: { event: { name: string; image: string }; index: number }) {
  return (
    <motion.div
      className="relative overflow-hidden aspect-[3/4]"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <img
        src={event.image}
        alt={`${event.name} decoration`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-display text-base font-semibold text-white">{event.name}</p>
      </div>
    </motion.div>
  );
}
