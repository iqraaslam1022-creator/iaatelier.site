import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/LanguageContext";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const { t, lang } = useLang();
  const p = t.portfolio;
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const gridRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      const { data, error } = await supabase
        .from("portfolio")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Projects fetch error:", error.message);
      } else {
        setProjects(data || []);
      }
      setLoadingProjects(false);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (loadingProjects || projects.length === 0) return;
    if (lang === "ar") return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const track = trackRef.current;
        const wrapper = wrapperRef.current;
        if (!track || !wrapper) return;

        const totalWidth = track.scrollWidth - wrapper.clientWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${totalWidth + 200}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        gsap.fromTo(".grid-proj",
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.14, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 75%" }
          }
        );

        ScrollTrigger.refresh();
      });

      return () => ctx.revert();
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [lang, loadingProjects, projects]);

  useEffect(() => {
    if (lang === "ar") {
      const cards = document.querySelectorAll(".grid-proj");
      cards.forEach((card) => { card.style.opacity = "1"; });
    }
  }, [lang, projects]);

  if (loadingProjects) {
    return (
      <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#B8972E", fontSize: "1rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600 }}>Loading...</p>
      </div>
    );
  }

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

      {/* Horizontal scroll — only English/LTR */}
      {lang === "en" && projects.length > 0 && (
        <div ref={wrapperRef} className="h-screen overflow-hidden relative">
          <div ref={trackRef} className="flex items-center h-full will-change-transform" style={{ width: "max-content", paddingLeft: "5vw", paddingRight: "5vw", gap: "2.5rem" }}>
            <div className="flex-shrink-0 w-[30vw] min-w-[280px]">
              <h2 className="font-display text-[clamp(2rem,3.5vw,3.2rem)] leading-tight text-[#1A1A1A] mb-4">
                {p.title} <em className="gold-gradient not-italic">{p.titleItalic}</em>
              </h2>
              <p className="text-[#6B6B6B] text-base leading-relaxed mb-6">{p.scrollText}</p>
              <div className="flex items-center gap-2 text-[0.68rem] tracking-widest uppercase text-[#B8972E] font-semibold">
                <div className="gold-line" /><span>{projects.length} Projects</span>
              </div>
            </div>
            {projects.map((proj, i) => (
              <div key={proj.id} className="flex-shrink-0 w-[60vw] max-w-[700px] lux-card rounded-sm overflow-hidden group">
                <div className="relative overflow-hidden" style={{ height: "60vh", minHeight: "340px" }}>
                  <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  <span className="absolute top-4 right-4 font-display text-6xl font-bold text-white/[0.06] select-none">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-7 bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-display text-xl text-[#1A1A1A] mb-2 group-hover:text-[#B8972E] transition-colors">{proj.title}</h3>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{proj.description}</p>
                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {proj.technologies.map((tech, idx) => (
                            <span key={idx} className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#B8972E] bg-[#F5F5F0] px-2 py-1 rounded-sm">{tech}</span>
                          ))}
                        </div>
                      )}
                      {proj.live_url && (
                        <a href={proj.live_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[0.72rem] tracking-widest uppercase font-semibold text-[#1A1A1A] hover:text-[#B8972E] transition-colors border-b border-[#1A1A1A]/20 pb-0.5">
                          <span>{p.visitSite}</span><ExternalLink size={12} />
                        </a>
                      )}
                    </div>
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
      )}

      {/* Arabic CTA */}
      {lang === "ar" && (
        <section className="py-20 px-6 lg:px-10 max-w-5xl mx-auto text-center">
          <p className="text-[#6B6B6B] text-lg mb-8 leading-relaxed">{p.ctaText}</p>
          <Link to="/contact" className="btn-gold rounded-sm inline-flex items-center gap-2">
            <span>{p.ctaBtn}</span><ArrowRight size={15} />
          </Link>
        </section>
      )}

      {/* Grid section */}
      <section ref={gridRef} className="py-28 lg:py-36 px-6 lg:px-10" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-14">
            <div className="gold-line" /><span className="section-label">{p.allProjects}</span>
          </div>

          {projects.length === 0 ? (
            <p className="text-[#6B6B6B] text-center py-20">Koi project nahi mila. Admin se add karo.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div key={`${lang}-${proj.id}`} className="grid-proj lux-card rounded-sm overflow-hidden group" style={{ opacity: lang === "ar" ? 1 : 0 }}>
                  <div className="relative h-52 overflow-hidden">
                    <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" loading="lazy" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-display text-lg text-[#1A1A1A] mb-2 group-hover:text-[#B8972E] transition-colors">{proj.title}</h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed mb-3">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {proj.technologies.map((tech, idx) => (
                          <span key={idx} className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#B8972E] bg-[#F5F5F0] px-2 py-1 rounded-sm">{tech}</span>
                        ))}
                      </div>
                    )}
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
          )}
        </div>
      </section>
    </div>
  );
}

