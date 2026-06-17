import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "Iqra delivered a website that exceeded every expectation. The attention to detail, the animations, the overall experience — it felt like working with a world-class agency.",
    name: "Sarah Mitchell",
    role: "CEO, Luxe Brands Co.",
  },
  {
    quote: "The portfolio website she built for us generated 3x more client inquiries within the first month. Truly exceptional work.",
    name: "Ahmed Al-Rashid",
    role: "Founder, TechVenture Dubai",
  },
  {
    quote: "Our new Shopify store is absolutely stunning. Sales increased by 45% in the first quarter. Worth every penny.",
    name: "Emma Thompson",
    role: "Marketing Director, StyleHouse",
  },
  {
    quote: "Professional, precise, and passionate about her craft. Iqra understood our vision and translated it into a digital masterpiece.",
    name: "Marcus Chen",
    role: "Entrepreneur",
  },
  {
    quote: "The multilingual website she created works flawlessly in Arabic. RTL support was perfect. Highly recommended.",
    name: "Fatima Al-Zahra",
    role: "Brand Strategist",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = () => { setDirection(1); setCurrent((p) => (p + 1) % TESTIMONIALS.length); };
  const prev = () => { setDirection(-1); setCurrent((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIALS[current];
  const initials = t.name.split(" ").map((w) => w[0]).join("");

  return (
    <section id="testimonials" className="py-28 lg:py-40 relative overflow-hidden" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="gold-line" />
            <span className="section-label">Client Voices</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.96] text-[#1A1A1A] max-w-2xl"
          >
            What Clients <em className="gold-gradient not-italic">Say</em>
          </motion.h2>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="lux-card rounded-sm p-10 lg:p-16 relative min-h-[300px] flex flex-col justify-center" style={{ backgroundColor: "#FFFFFF" }}>
            <Quote size={44} className="text-[#B8972E]/12 absolute top-8 left-8" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                initial={{ opacity: 0, x: direction * 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 50 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center"
              >
                <p className="text-xl lg:text-2xl font-display leading-relaxed text-[#1A1A1A] italic mb-10">
                  "{t.quote}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-bold text-sm font-display">
                    {initials}
                  </div>
                  <div className="text-left">
                    <div className="font-display text-[#1A1A1A] font-semibold">{t.name}</div>
                    <div className="text-[0.68rem] tracking-[0.18em] uppercase text-[#B8972E] font-medium mt-0.5">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] hover:border-[#B8972E] hover:text-[#B8972E] transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === current ? "bg-[#B8972E] w-6 h-2" : "bg-[#1A1A1A]/15 w-2 h-2 hover:bg-[#1A1A1A]/35"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] hover:border-[#B8972E] hover:text-[#B8972E] transition-all"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
