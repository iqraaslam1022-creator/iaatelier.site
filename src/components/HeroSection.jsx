import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const STATS = [
  { value: "50+", label: "Projects" },
  { value: "3+", label: "Years" },
  { value: "98%", label: "Satisfaction" },
  { value: "12+", label: "Industries" },
];

const heroVideo = "https://media.base44.com/videos/public/6a2b674054d9bbcb910aeb3f/c9aaf41db_06131.mp4";

const LINES = ["Architecting", "Digital Legacies", "That Convert"];

export default function HeroSection() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full-bleed video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Overlays: strong dark tint for contrast */}
        <div className="absolute inset-0 bg-[#0D0D0D]/72" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#000]/40 via-transparent to-[#0D0D0D]/60" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-2 text-[0.68rem] tracking-[0.22em] uppercase text-white/70 font-medium backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] pulse-gold" />
            Award-Winning Digital Studio
          </span>
        </motion.div>

        {/* Headline */}
        <div className="mb-8">
          {LINES.map((line, i) => (
            <div key={i} className="reveal-clip">
              <motion.h1
                initial={{ y: "108%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.35 + i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`reveal-inner font-display leading-[0.95] tracking-tight ${
                  i === 1
                    ? "italic text-[#D4AF37] block text-[clamp(2.8rem,6.5vw,6.2rem)]"
                    : "text-white block text-[clamp(2.8rem,6.5vw,6.2rem)]"
                }`}
                style={{ textShadow: i !== 1 ? "0 2px 40px rgba(0,0,0,0.5)" : "none" }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="text-[1.05rem] md:text-lg font-light leading-relaxed max-w-xl mb-12 text-white/75"
        >
          Premium web experiences crafted with precision, passion and purpose — for brands that demand the extraordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollToSection("portfolio")}
            className="btn-gold rounded-sm inline-flex items-center gap-2"
          >
            <span>View My Work</span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="btn-outline-gold rounded-sm inline-flex items-center gap-2"
            style={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#1A1A1A"; e.currentTarget.style.borderColor = "white"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
          >
            <span>Start a Project</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.09 }}
            >
              <div className="font-display text-3xl text-[#D4AF37] font-bold">{stat.value}</div>
              <div className="text-[0.68rem] tracking-[0.2em] uppercase mt-1 font-medium text-white/45">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("services")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
        aria-label="Scroll down"
      >
        <span className="text-[0.62rem] tracking-[0.3em] uppercase font-medium text-white/40 group-hover:text-white/70 transition-colors">Discover</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-white/60 scroll-indicator-dot" />
        </div>
      </button>
    </section>
  );
}
