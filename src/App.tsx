import { motion, useScroll, useSpring } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Statement from "./components/Statement";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import EventTypes from "./components/EventTypes";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Scroll progress — gold line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Portfolio />
        <Statement />
        <WhyChooseUs />
        <Process />
        <EventTypes />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
