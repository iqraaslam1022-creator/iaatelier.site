import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const { t } = useLang();
  const p = t.portfolio;
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;
      const totalWidth = track.scrollWidth - wrapper.clientWidth;
      gsap.to(track, {
        x: -totalWidth, ease: "none",
        scrollTrigger: { trigger: wrapper, start: "top top", end: () => `+=${totalWidth + 200}`, scrub: 1.2, pin: true, anticipatePin: 1 }
      });
      gsap.fromTo(".grid-proj",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.14, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 75%" } }
      );
    });
    return () => ctx.revert();
  }, [p.projects]);

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-6">
          <div className="gold-line" /><span className="section-label">{p.badge}</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] text-[#1A1A1A] max-w-3xl mb-6">
          {p.title} <em className="gold-gradient not-italic">{p.titleItalic}</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg font-light max-w-lg leading-relaxed text-[#6B6B6B]">
          {p.subtitle}
        </motion.p>
      </section>

      <div ref={wrapperRef} className="h-screen overflow-hidden relative">
        <div ref={trackRef} className="flex items-center h-full will-change-transform" style={{ width: "max-content", paddingLeft: "5vw", paddingRight: "5vw", gap: "2.5rem" }}>
          <div className="flex-shrink-0 w-[30vw] min-w-[280px]">
            <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-tight text-[#1A1A1A] mb-4">
              {p.title} <em className="gold-gradient not-italic">{p.titleItalic}</em>
            </h2>
            <p className="text-[#6B6B6B] text-base leading-relaxed mb-6">{p.scrollText}</p>
            <div className="flex items-center gap-2 text-[0.68rem] tracking-widest uppercase text-[#B8972E] font-semibold">
              <div className="gold-line" /><span>{p.projects.length} Projects</span>
            </div>
          </div>
          {p.projects.map((proj, i) => (
            <div key={proj.id} className="flex-shrink-0 w-[60vw] max-w-[700px] lux-card rounded-sm overflow-hidden group">
              <div className="relative overflow-hidden" style={{ height: "60vh", minHeight: "340px" }}>
                <img src={proj.featured_image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                <span className="absolute top-5 left-5 text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-[#B8972E] bg-white/92 px-3 py-1.5 rounded-sm">{proj.category}</span>
                <span className="absolute top-4 right-4 font-display text-6xl font-bold text-white/[0.06] select-none">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="p-7 bg-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-[#1A1A1A] mb-2 group-hover:text-[#B8972E] transition-colors">{proj.title}</h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{proj.description}</p>
                    {proj.live_url && (
                      <a href={proj.live_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[0.72rem] tracking-widest uppercase font-semibold text-[#1A1A1A] hover:text-[#B8972E] transition-colors border-b border-[#1A1A1A]/20 pb-0.5">
                        <span>{p.visitSite}</span><ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  {proj.completion_date && <div className="text-[0.65rem] tracking-widest uppercase text-[#B8972E] font-semibold flex-shrink-0 pt-1">{proj.completion_date}</div>}
                </div>
              </div>
            </div>
          ))}
          <div className="flex-shrink-0 w-[28vw] min-w-[240px] flex flex-col items-start justify-center">
            <p className="text-[#6B6B6B] text-sm mb-6 leading-relaxed">{p.ctaText}</p>
            <Link to="/contact" className="btn-gold rounded-sm inline-flex items-center gap-2">
              <span>{p.ctaBtn}</span><ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <section ref={gridRef} className="py-28 lg:py-36 px-6 lg:px-10" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-14"><div className="gold-line" /><span className="section-label">{p.allProjects}</span></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {p.projects.map((proj) => (
              <div key={proj.id} className="grid-proj lux-card rounded-sm overflow-hidden group" style={{ opacity: 0 }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={proj.featured_image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" loading="lazy" />
                  <span className="absolute top-4 left-4 text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-[#B8972E] bg-white/90 px-3 py-1.5 rounded-sm">{proj.category}</span>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-2 group-hover:text-[#B8972E] transition-colors">{proj.title}</h3>
                  {proj.live_url && (
                    <a href={proj.live_url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[0.72rem] tracking-widest uppercase font-semibold text-[#1A1A1A] hover:text-[#B8972E] transition-colors">
                      <span>{p.visitSite}</span><ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
 
         

