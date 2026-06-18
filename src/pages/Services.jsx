import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Monitor, Code, ShoppingCart, Search, Palette, LayoutDashboard, Store, Globe, Settings } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const ICONS = [Monitor, Code, ShoppingCart, Search, Palette, LayoutDashboard, Store, Globe, Settings];
const colors = ["#FFFFFF", "#F9F5E8", "#F5F5F0", "#F8F6F0", "#FAFAF8", "#F9F5E8", "#F5F5F0", "#F8F6F0", "#FAFAF8"];

export default function Services() {
  const { t } = useLang();
  const s = t.services;
  const cardsRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".stack-service-card");
      cards.forEach((card, i) => {
        if (i === 0) return;
        gsap.fromTo(card,
          { yPercent: 100, scale: 0.94, opacity: 0.6 },
          { yPercent: 0, scale: 1, opacity: 1, ease: "power2.inOut",
            scrollTrigger: { trigger: card, start: "top bottom", end: "top center", scrub: 1.2 } }
        );
      });
    }, cardsRef);
    return () => ctx.revert();
  }, [s.items]);

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-6">
          <div className="gold-line" /><span className="section-label">{s.badge}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] text-[#1A1A1A] max-w-3xl mb-6">
          {s.title} <em className="gold-gradient not-italic">{s.titleItalic}</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg font-light max-w-xl leading-relaxed text-[#6B6B6B]">
          {s.subtitle}
        </motion.p>
      </section>

      <section ref={cardsRef} className="px-6 lg:px-10 pb-32">
        <div className="max-w-5xl mx-auto space-y-8">
          {s.items.map((svc, i) => {
            const Icon = ICONS[i] || Monitor;
            return (
              <div key={svc.num} className="stack-service-card lux-card rounded-sm p-10 lg:p-14 group"
                style={{ backgroundColor: colors[i % colors.length] }}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-shrink-0 flex items-center gap-5">
                    <div className="w-14 h-14 rounded-sm bg-[#1A1A1A] group-hover:bg-[#B8972E] transition-colors duration-400 flex items-center justify-center">
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="font-display text-6xl font-bold text-[#1A1A1A]/06 select-none">{svc.num}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-2xl lg:text-3xl text-[#1A1A1A] mb-4 group-hover:text-[#B8972E] transition-colors">{svc.title}</h2>
                    <p className="text-[#6B6B6B] leading-relaxed text-base mb-6">{svc.description}</p>
                    {svc.deliverables?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {svc.deliverables.map((d) => (
                          <span key={d} className="text-[0.68rem] tracking-[0.14em] uppercase font-semibold px-3 py-1.5 bg-[#1A1A1A]/06 text-[#1A1A1A] rounded-sm">{d}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <Link to="/contact" className="w-12 h-12 rounded-full border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] group-hover:border-[#B8972E] group-hover:text-[#B8972E] transition-all">
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] text-white leading-tight mb-6">
            {s.ctaTitle} <em className="text-[#D4AF37] not-italic">{s.ctaItalic}</em>
          </h2>
          <p className="text-white/55 mb-10 text-lg font-light">{s.ctaSubtitle}</p>
          <Link to="/contact" className="btn-gold rounded-sm inline-flex items-center gap-2">
            <span>{s.ctaBtn}</span><ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

  
               
   
