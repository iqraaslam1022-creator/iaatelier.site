import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/LanguageContext";
import SEO from "@/components/SEO";

gsap.registerPlugin(ScrollTrigger);

const studioImg = "https://media.base44.com/images/public/6a2f5859e9ab50cdcf38783f/be1252f30_generated_2951403d.png";

function BlurReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}>
      {children}
    </motion.div>
  );
}

export default function About() {
  const { t, lang } = useLang();
  const a = t.about;
  const timelineRef = useRef(null);
  const statsRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".hero-line",
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.14, duration: 1, ease: "power3.out", delay: 0.3 }
        );
        gsap.fromTo(".timeline-item",
          { opacity: 0, x: lang === "ar" ? 40 : -40 },
          {
            opacity: 1, x: 0, stagger: 0.18, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 70%", invalidateOnRefresh: true }
          }
        );
        gsap.fromTo(".about-stat",
          { opacity: 0, scale: 0.85, y: 20 },
          {
            opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.6)",
            scrollTrigger: { trigger: statsRef.current, start: "top 75%", invalidateOnRefresh: true }
          }
        );
        ScrollTrigger.refresh();
      });
      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [lang]);

  return (
  <>
    <SEO
      title="About IA Atelier | Creative Web Design & Branding Studio"
      description="Learn about IA Atelier, our mission, creative approach, and how we help businesses grow through premium web design, branding, and digital experiences."
      keywords="About IA Atelier, Web Design, Branding, Digital Studio"
      url="/about"
    />

    <div style={{ backgroundColor: "#FAFAF8" }}>
      <section className="pt-40 pb-24 px-6 lg:px-10 max-w-7xl mx-auto" ref={heroTextRef}>
        <div className="flex items-center gap-3 mb-6"><div className="gold-line" /><span className="section-label">{a.badge}</span></div>
        <div className="overflow-hidden mb-2">
          <h1 className="hero-line font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] text-[#1A1A1A]" style={{ opacity: 0 }}>{a.headline1}</h1>
        </div>
        <div className="overflow-hidden mb-10">
          <h1 className="hero-line font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.94]" style={{ opacity: 0 }}>
            <em className="gold-gradient not-italic">{a.headline2}</em>
          </h1>
        </div>
        <p className="text-lg font-light max-w-2xl leading-relaxed text-[#6B6B6B]">{a.subtitle}</p>
      </section>

      <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <BlurReveal>
            <div>
              <div className="flex items-center gap-3 mb-6"><div className="gold-line" /><span className="section-label">{a.storyBadge}</span></div>
              <p className="text-base leading-relaxed text-[#6B6B6B] mb-5">{a.story1}</p>
              <p className="text-base leading-relaxed text-[#6B6B6B] mb-8">{a.story2}</p>
              <Link to="/contact" className="btn-gold rounded-sm inline-flex items-center gap-2"><span>{a.workBtn}</span></Link>
            </div>
          </BlurReveal>
          <BlurReveal delay={0.15}>
            <div className="relative">
              <div className="lux-card rounded-sm overflow-hidden">
                <img src={studioImg} alt="IA Studio workspace" className="w-full h-80 object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-28 h-28 border border-[#B8972E]/25 rounded-sm" />
            </div>
          </BlurReveal>
        </div>
      </section>

      <section ref={statsRef} className="py-20 px-6 lg:px-10" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {a.stats.map((s) => (
            <div key={`${lang}-${s.label}`} className="about-stat" style={{ opacity: 0 }}>
              <div className="font-display text-5xl text-[#D4AF37] font-bold mb-2">{s.value}</div>
              <div className="text-[0.68rem] tracking-[0.22em] uppercase text-white/40 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section ref={timelineRef} className="py-28 px-6 lg:px-10" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-4xl mx-auto">
          <BlurReveal>
            <div className="flex items-center gap-3 mb-5"><div className="gold-line" /><span className="section-label">{a.journeyBadge}</span></div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-[#1A1A1A] mb-16">
              {a.journeyTitle} <em className="gold-gradient not-italic">{a.journeyTitleItalic}</em>
            </h2>
          </BlurReveal>
          <div className="relative">
            <div className={`absolute ${lang === "ar" ? "right-[3.5rem]" : "left-[3.5rem]"} top-0 bottom-0 w-[1px] bg-[#B8972E]/20`} />
            <div className="space-y-12">
              {a.timeline.map((item) => (
                <div key={`${lang}-${item.year}`} className="timeline-item flex gap-8 items-start" style={{ opacity: 0 }}>
                  <div className={`flex-shrink-0 w-28 ${lang === "ar" ? "text-left" : "text-right"}`}>
                    <span className="font-display text-lg text-[#B8972E] font-bold">{item.year}</span>
                  </div>
                  <div className="relative flex-shrink-0 mt-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#B8972E]" />
                  </div>
                  <div className="flex-1 pb-4">
                    <h3 className="font-display text-xl text-[#1A1A1A] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

     
   
                  
