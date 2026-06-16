import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUp, Send } from "lucide-react";
import { motion, useInView } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const FOOTER_IMG = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=85";

export default function Footer() {
  const ctaRef = useRef(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden">
      {/* ── Blur-to-Focus CTA over full-width image ── */}
      <div ref={ctaRef} className="relative h-[520px] lg:h-[600px] overflow-hidden">
        <img
          src={FOOTER_IMG}
          alt="Premium workspace"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/72" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/50 to-transparent" />

        {/* Animated content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
            animate={ctaInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-2 text-[0.68rem] tracking-[0.22em] uppercase text-white/60 font-medium mb-8">
              Ready to Begin?
            </span>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] text-white mb-6 max-w-3xl">
              Let's Build Something{" "}
              <em className="text-[#D4AF37] not-italic">Extraordinary</em>
            </h2>
            <p className="text-white/55 text-lg font-light max-w-lg mx-auto mb-10">
              Premium web experiences for brands that demand the extraordinary.
            </p>

            {/* Quick email form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
            >
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-sm px-5 py-3 text-sm text-white placeholder-white/35 focus:border-white/50 focus:outline-none backdrop-blur-sm"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] hover:bg-[#B8972E] text-[#1A1A1A] font-semibold text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-all flex items-center gap-2 justify-center"
              >
                <Send size={13} />
                <span>Get Started</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-white text-[#1A1A1A] hover:bg-[#D4AF37] font-semibold text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all"
              >
                Start a Project
              </Link>
              <a
                href="https://wa.me/923164079480"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/40 text-white hover:bg-white hover:text-[#1A1A1A] font-medium text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <div style={{ backgroundColor: "#111111" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <button onClick={scrollToTop} className="font-display text-xl tracking-widest text-white hover:text-[#D4AF37] transition-colors">
              IA <span className="font-bold text-[#D4AF37]">Atelier</span>
            </button>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[0.68rem] tracking-[0.2em] uppercase text-white/35 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
          <div className="mt-8 pt-7 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/25 tracking-wider">© {new Date().getFullYear()} IA Atelier. All rights reserved.</p>
            <p className="text-xs text-white/18 tracking-wider">Crafted with precision &amp; passion</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
