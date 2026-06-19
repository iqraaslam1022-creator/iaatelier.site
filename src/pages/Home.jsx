import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Star, ChevronDown, ChevronUp, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const heroVideo = "https://media.base44.com/videos/public/6a2b674054d9bbcb910aeb3f/c9aaf41db_06131.mp4";

const STATIC_PROJECTS = [
  { id: 1, title: "Luxury Watch Website Design", category: "Web Design", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f664fe3a7_rolex-herosection.png", live_url: "https://accomplished-apex-time-vault.base44.app/" },
  { id: 2, title: "Hafiz Builders | Premium Construction", category: "UI / UX", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f1eb8f6d7_real-estate.png", live_url: "https://hafiz-build-elite.base44.app/" },
  { id: 3, title: "Hafiz Cuisine – Restaurant Management", category: "Ecommerce", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/d2d3978cb_hafiz-cusine.png", live_url: "https://hafiz-luxury-dine.base44.app/" },
];

function TestimonialsCarousel({ items, badge }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);
  if (!items.length) return null;
  const item = items[idx];
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#1A1A1A" }}>
      <div className="max-w-4xl mx-auto px-5 lg:px-10 text-center">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="gold-line mx-auto" style={{ background: "linear-gradient(90deg, transparent, #B8972E)" }} />
          <span className="section-label text-[#B8972E]">{badge}</span>
          <div className="gold-line" style={{ background: "linear-gradient(90deg, #B8972E, transparent)" }} />
        </div>
        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-center mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < item.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-white/20"} />
            ))}
          </div>
          <p className="font-display text-lg lg:text-2xl text-white leading-relaxed mb-8 italic px-2">"{item.review_text}"</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-left">
              <div className="font-semibold text-white text-sm">{item.client_name}</div>
              {item.company_name && <div className="text-[0.68rem] tracking-widest uppercase text-[#B8972E]">{item.company_name}</div>}
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-3 rounded-full transition-all min-w-[12px] ${i === idx ? "bg-[#D4AF37] w-6" : "bg-white/20 w-3"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ items, badge, title, titleItalic }) {
  const [open, setOpen] = useState(null);
  if (!items.length) return null;
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="max-w-3xl mx-auto px-5 lg:px-10">
        <div className="flex items-center gap-3 mb-5"><div className="gold-line" /><span className="section-label">{badge}</span></div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-tight text-[#1A1A1A] mb-10">
          {title} <em className="gold-gradient not-italic">{titleItalic}</em>
        </h2>
        <div className="space-y-3">
          {items.map((faq, i) => (
            <div key={i} className="lux-card rounded-sm overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left min-h-[56px]"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-display text-base text-[#1A1A1A] pr-4">{faq.question}</span>
                {open === i
                  ? <ChevronUp size={18} className="text-[#B8972E] flex-shrink-0" />
                  : <ChevronDown size={18} className="text-[#6B6B6B] flex-shrink-0" />}
              </button>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5"
                >
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection({ data }) {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="flex items-center gap-3 mb-5"><div className="gold-line" /><span className="section-label">{data.badge}</span></div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] leading-tight text-[#1A1A1A] mb-4">
          {data.title} <em className="gold-gradient not-italic">{data.titleItalic}</em>
        </h2>
        <p className="text-[#6B6B6B] font-light mb-12 max-w-lg">{data.subtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.packages.map((pkg, i) => {
            const discount = pkg.discount_price && pkg.original_price
              ? Math.round((1 - pkg.discount_price / pkg.original_price) * 100) : 0;
            return (
              <div
                key={i}
                className={`lux-card rounded-sm p-6 lg:p-8 flex flex-col relative ${pkg.is_featured ? "ring-2 ring-[#B8972E]" : ""}`}
                style={{ backgroundColor: pkg.is_featured ? "#1A1A1A" : "#FFFFFF" }}
              >
                {pkg.is_featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B8972E] text-white text-[0.6rem] tracking-widest uppercase font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {data.popular}
                  </div>
                )}
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-[#B8972E] text-white text-[0.6rem] tracking-wider uppercase font-bold px-2.5 py-1 rounded-sm">
                    -{discount}%
                  </div>
                )}
                <div className={`text-[0.68rem] tracking-[0.2em] uppercase font-semibold mb-4 ${pkg.is_featured ? "text-[#D4AF37]" : "text-[#B8972E]"}`}>{pkg.name}</div>
                <div className="mb-1">
                  {pkg.discount_price ? (
                    <>
                      <span className={`text-sm line-through ${pkg.is_featured ? "text-white/30" : "text-[#6B6B6B]"}`}>${pkg.original_price?.toLocaleString()}</span>
                      <div className={`font-display text-3xl font-bold ${pkg.is_featured ? "text-white" : "text-[#1A1A1A]"}`}>${pkg.discount_price?.toLocaleString()}</div>
                    </>
                  ) : (
                    <div className={`font-display text-3xl font-bold ${pkg.is_featured ? "text-white" : "text-[#1A1A1A]"}`}>${pkg.original_price?.toLocaleString()}</div>
                  )}
                </div>
                <div className={`text-xs mb-6 ${pkg.is_featured ? "text-white/40" : "text-[#6B6B6B]"}`}>{data.oneTime}</div>
                <ul className="space-y-3 flex-1 mb-8">
                  {(pkg.features || []).map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-[#B8972E] mt-0.5 flex-shrink-0" />
                      <span className={pkg.is_featured ? "text-white/80" : "text-[#6B6B6B]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={pkg.cta_link || "/contact"}
                  className={`text-center py-3.5 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all min-h-[44px] flex items-center justify-center ${pkg.is_featured ? "bg-[#B8972E] text-white hover:bg-[#D4AF37]" : "bg-[#1A1A1A] text-white hover:bg-[#B8972E]"}`}
                >
                  {pkg.cta_text}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLang();
  const h = t.home;
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-item",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: servicesRef.current, start: "top 75%" }
        }
      );
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Low quality placeholder while video loads */}
          {!videoLoaded && (
            <div className="absolute inset-0 bg-[#0D0D0D]" />
          )}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: videoLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0D0D0D]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full pt-28 pb-20">
          <div className="mb-6">
            {h.hero.lines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.35 + i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`block font-display leading-[0.95] tracking-tight text-[clamp(2.4rem,6.5vw,6.5rem)] ${i === 1 ? "italic text-[#D4AF37]" : "text-white"}`}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95 }}
            className="text-base lg:text-lg font-light leading-relaxed max-w-xl mb-10 text-white/75"
          >
            {h.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Link
              to="/portfolio"
              className="btn-gold rounded-sm inline-flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>{h.hero.ctaPrimary}</span>
            </Link>
            <Link
              to="/contact"
              className="border border-white/50 text-white hover:bg-white hover:text-[#1A1A1A] transition-all px-8 py-3.5 text-xs tracking-widest uppercase font-semibold rounded-sm min-h-[48px] flex items-center justify-center"
            >
              {h.hero.ctaSecondary}
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl"
          >
            {h.hero.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-[#D4AF37] font-bold">{s.value}</div>
                <div className="text-[0.68rem] tracking-[0.2em] uppercase mt-1 font-medium text-white/45">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[0.62rem] tracking-[0.3em] uppercase font-medium text-white/35">{h.hero.scroll}</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-white/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-white/60 scroll-indicator-dot" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servicesRef} className="py-20 lg:py-28" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5"><div className="gold-line" /><span className="section-label">{h.services.badge}</span></div>
              <h2 className="font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-[0.96] text-[#1A1A1A] max-w-xl">
                {h.services.title} <em className="gold-gradient not-italic">{h.services.titleItalic}</em>
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B8972E] hover:text-[#1A1A1A] transition-colors tracking-wide border-b border-[#B8972E]/40 pb-0.5 min-h-[44px]"
            >
              {h.services.viewAll} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {h.services.items.map((svc) => (
              <div key={svc.num} className="service-item lux-card rounded-sm p-6 group" style={{ opacity: 0 }}>
                <div className="text-[0.65rem] tracking-[0.22em] uppercase text-[#B8972E] font-semibold mb-4">{svc.num}</div>
                <h3 className="font-display text-xl text-[#1A1A1A] mb-3 group-hover:text-[#B8972E] transition-colors">{svc.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-5"><div className="gold-line" /><span className="section-label">{h.portfolio.badge}</span></div>
              <h2 className="font-display text-[clamp(1.8rem,4.5vw,4rem)] leading-[0.96] text-[#1A1A1A] max-w-xl">
                {h.portfolio.title} <em className="gold-gradient not-italic">{h.portfolio.titleItalic}</em>
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B8972E] hover:text-[#1A1A1A] transition-colors tracking-wide border-b border-[#B8972E]/40 pb-0.5 min-h-[44px]"
            >
              {h.portfolio.viewAll} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {STATIC_PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="lux-card rounded-sm overflow-hidden group"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={proj.featured_image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="208"
                  />
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/20 transition-all duration-500" />
                  <span className="absolute top-4 left-4 text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-[#B8972E] bg-white/90 px-3 py-1.5 rounded-sm">{proj.category}</span>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-2 group-hover:text-[#B8972E] transition-colors">{proj.title}</h3>
                  {proj.live_url && (
                    <a
                      href={proj.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.72rem] tracking-widest uppercase font-semibold text-[#1A1A1A] hover:text-[#B8972E] transition-colors border-b border-[#1A1A1A]/20 hover:border-[#B8972E]/50 pb-0.5 min-h-[44px]"
                    >
                      <span>{h.portfolio.visitSite}</span><ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-16 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {h.hero.stats.map((s) => (
              <div key={s.label} className="stat-item" style={{ opacity: 0 }}>
                <div className="font-display text-4xl lg:text-5xl text-[#D4AF37] font-bold mb-2">{s.value}</div>
                <div className="text-[0.68rem] tracking-[0.22em] uppercase text-white/40 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsCarousel items={h.testimonials.items} badge={h.testimonials.badge} />

      {/* PRICING */}
      <PricingSection data={h.pricing} />

      {/* FAQ */}
      <FAQSection items={h.faq.items} badge={h.faq.badge} title={h.faq.title} titleItalic={h.faq.titleItalic} />
    </div>
  );
}








