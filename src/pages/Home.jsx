import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Star, ChevronDown, ChevronUp, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { base44 } from "@/api/base44Client";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_HERO = {
  video_url: "https://media.base44.com/videos/public/6a2b674054d9bbcb910aeb3f/c9aaf41db_06131.mp4",
  bg_image_url: "",
  use_video: true,
  heading_line1: "Architecting",
  heading_line2: "Digital Legacies",
  heading_line3: "That Convert",
  subheading: "Premium web experiences crafted with precision, passion and purpose — for brands that demand the extraordinary.",
  cta_primary_text: "View Our Work",
  cta_primary_link: "/portfolio",
  cta_secondary_text: "Start a Project",
  cta_secondary_link: "/contact",
};

const STATS = [
  { value: "50+", label: "Projects" },
  { value: "3+", label: "Years" },
  { value: "98%", label: "Satisfaction" },
  { value: "12+", label: "Industries" },
];

function TestimonialsCarousel({ testimonials }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length]);
  if (!testimonials.length) return null;
  const t = testimonials[idx];
  return (
    <section className="py-28 lg:py-36" style={{ backgroundColor: "#1A1A1A" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="gold-line mx-auto" style={{ background: "linear-gradient(90deg, transparent, #B8972E)" }} />
          <span className="section-label text-[#B8972E]">Client Stories</span>
          <div className="gold-line" style={{ background: "linear-gradient(90deg, #B8972E, transparent)" }} />
        </div>
        <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-center mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className={i < t.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-white/20"} />
            ))}
          </div>
          <p className="font-display text-xl lg:text-2xl text-white leading-relaxed mb-8 italic">
            "{t.review_text}"
          </p>
          <div className="flex items-center justify-center gap-4">
            {t.photo_url && (
              <img src={t.photo_url} alt={t.client_name} className="w-12 h-12 rounded-full object-cover border-2 border-[#B8972E]/40" />
            )}
            <div className="text-left">
              <div className="font-semibold text-white text-sm">{t.client_name}</div>
              {t.company_name && <div className="text-[0.68rem] tracking-widest uppercase text-[#B8972E]">{t.company_name}</div>}
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? "bg-[#D4AF37] w-4" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);
  if (!faqs.length) return null;
  return (
    <section className="py-28 lg:py-36" style={{ backgroundColor: "#FAFAF8" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="gold-line" />
          <span className="section-label">FAQ</span>
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-[#1A1A1A] mb-12">
          Frequently <em className="gold-gradient not-italic">Asked</em>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="lux-card rounded-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-6 text-left" onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-display text-base text-[#1A1A1A] pr-4">{faq.question}</span>
                {open === i ? <ChevronUp size={18} className="text-[#B8972E] flex-shrink-0" /> : <ChevronDown size={18} className="text-[#6B6B6B] flex-shrink-0" />}
              </button>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0 }} transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
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

function PricingSection({ packages }) {
  if (!packages.length) return null;
  return (
    <section className="py-28 lg:py-36" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="gold-line" />
          <span className="section-label">Investment</span>
        </div>
        <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight text-[#1A1A1A] mb-4">
          Transparent <em className="gold-gradient not-italic">Pricing</em>
        </h2>
        <p className="text-[#6B6B6B] font-light mb-16 max-w-lg">Choose the package that matches your ambition. All include our signature quality guarantee.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {packages.map((pkg) => {
            const discount = pkg.discount_price && pkg.original_price
              ? Math.round((1 - pkg.discount_price / pkg.original_price) * 100)
              : 0;
            return (
              <div key={pkg.id}
                className={`lux-card rounded-sm p-8 flex flex-col relative ${pkg.is_featured ? "ring-2 ring-[#B8972E]" : ""}`}
                style={{ backgroundColor: pkg.is_featured ? "#1A1A1A" : "#FFFFFF" }}
              >
                {pkg.is_featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#B8972E] text-white text-[0.6rem] tracking-widest uppercase font-bold px-4 py-1 rounded-full">
                    Most Popular
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
                      <div className={`font-display text-3xl font-bold ${pkg.is_featured ? "text-white" : "text-[#1A1A1A]"}`}>
                        ${pkg.discount_price?.toLocaleString()}
                      </div>
                    </>
                  ) : (
                    <div className={`font-display text-3xl font-bold ${pkg.is_featured ? "text-white" : "text-[#1A1A1A]"}`}>
                      ${pkg.original_price?.toLocaleString()}
                    </div>
                  )}
                </div>
                <div className={`text-xs mb-6 ${pkg.is_featured ? "text-white/40" : "text-[#6B6B6B]"}`}>one-time payment</div>
                <ul className="space-y-3 flex-1 mb-8">
                  {(pkg.features || []).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check size={14} className="text-[#B8972E] mt-0.5 flex-shrink-0" />
                      <span className={pkg.is_featured ? "text-white/80" : "text-[#6B6B6B]"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to={pkg.cta_link || "/contact"}
                  className={`text-center py-3.5 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all ${
                    pkg.is_featured
                      ? "bg-[#B8972E] text-white hover:bg-[#D4AF37]"
                      : "bg-[#1A1A1A] text-white hover:bg-[#B8972E]"
                  }`}
                >
                  {pkg.cta_text || "Get Started"}
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
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [packages, setPackages] = useState([]);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    base44.entities.HeroContent.list().then((d) => { if (d[0]) setHero(d[0]); });
    base44.entities.Service.list("order", 4).then(setServices);
    base44.entities.PortfolioProject.list("order", 3).then(setProjects);
    base44.entities.Testimonial.list("order").then(setTestimonials);
    base44.entities.FAQ.list("order").then(setFaqs);
    base44.entities.PricingPackage.list("order").then(setPackages);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".service-item",
        { opacity: 0, y: 50, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: servicesRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 80%" } }
      );
    });
    return () => ctx.revert();
  }, [services]);

  const LINES = [hero.heading_line1, hero.heading_line2, hero.heading_line3].filter(Boolean);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {hero.use_video && hero.video_url ? (
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src={hero.video_url} type="video/mp4" />
            </video>
          ) : hero.bg_image_url ? (
            <img src={hero.bg_image_url} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-[#0D0D0D]/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "80px 80px"
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-24">
          <div className="mb-8">
            {LINES.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h1
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.35 + i * 0.14, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`block font-display leading-[0.95] tracking-tight text-[clamp(2.8rem,6.5vw,6.5rem)] ${i === 1 ? "italic text-[#D4AF37]" : "text-white"}`}
                  style={{ textShadow: i !== 1 ? "0 2px 40px rgba(0,0,0,0.5)" : "none" }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.95 }}
            className="text-lg font-light leading-relaxed max-w-xl mb-12 text-white/75"
          >
            {hero.subheading}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to={hero.cta_primary_link || "/portfolio"} className="btn-gold rounded-sm inline-flex items-center gap-2">
              <span>{hero.cta_primary_text || "View Our Work"}</span>
            </Link>
            <Link to={hero.cta_secondary_link || "/contact"} className="border border-white/50 text-white hover:bg-white hover:text-[#1A1A1A] transition-all px-8 py-3.5 text-xs tracking-widest uppercase font-semibold rounded-sm">
              {hero.cta_secondary_text || "Start a Project"}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
            className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-xl"
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-[#D4AF37] font-bold">{s.value}</div>
                <div className="text-[0.68rem] tracking-[0.2em] uppercase mt-1 font-medium text-white/45">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[0.62rem] tracking-[0.3em] uppercase font-medium text-white/35">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-3 bg-white/60 scroll-indicator-dot" />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section ref={servicesRef} className="py-28 lg:py-36" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-5"><div className="gold-line" /><span className="section-label">What I Offer</span></div>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.96] text-[#1A1A1A] max-w-xl">
                Bespoke Digital <em className="gold-gradient not-italic">Services</em>
              </h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#B8972E] hover:text-[#1A1A1A] transition-colors tracking-wide border-b border-[#B8972E]/40 pb-0.5">
              View All Services <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((svc) => (
              <div key={svc.id} className="service-item lux-card rounded-sm p-7 group" style={{ opacity: 0 }}>
                <div className="text-[0.65rem] tracking-[0.22em] uppercase text-[#B8972E] font-semibold mb-4">{svc.num}</div>
                <h3 className="font-display text-xl text-[#1A1A1A] mb-3 group-hover:text-[#B8972E] transition-colors">{svc.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="py-28 lg:py-36" style={{ backgroundColor: "#F5F5F0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-5"><div className="gold-line" /><span className="section-label">Selected Work</span></div>
              <h2 className="font-display text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.96] text-[#1A1A1A] max-w-xl">
                The Portfolio <em className="gold-gradient not-italic">Gallery</em>
              </h2>
            </div>
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-semibold text-[#B8972E] hover:text-[#1A1A1A] transition-colors tracking-wide border-b border-[#B8972E]/40 pb-0.5">
              View All Projects <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((proj, i) => {
              const discountedPrice = proj.discount_percentage > 0
                ? Math.round(proj.original_price * (1 - proj.discount_percentage / 100))
                : null;
              return (
                <motion.div key={proj.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.12 }}
                  className="lux-card rounded-sm overflow-hidden group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={proj.featured_image} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" loading="lazy" />
                    <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/20 transition-all duration-500" />
                    <span className="absolute top-4 left-4 text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-[#B8972E] bg-white/90 px-3 py-1.5 rounded-sm">
                      {proj.category}
                    </span>
                    {proj.discount_percentage > 0 && (
                      <span className="absolute top-4 right-4 bg-[#B8972E] text-white text-[0.6rem] tracking-wider uppercase font-bold px-2 py-1 rounded-sm">
                        -{proj.discount_percentage}%
                      </span>
                    )}
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-display text-lg text-[#1A1A1A] mb-2 group-hover:text-[#B8972E] transition-colors">{proj.title}</h3>
                    {proj.original_price > 0 && (
                      <div className="flex items-center gap-3 mb-3">
                        {discountedPrice ? (
                          <>
                            <span className="text-sm line-through text-[#6B6B6B]">${proj.original_price.toLocaleString()}</span>
                            <span className="font-display text-lg text-[#B8972E] font-bold">${discountedPrice.toLocaleString()}</span>
                          </>
                        ) : (
                          <span className="font-display text-lg text-[#1A1A1A] font-bold">${proj.original_price.toLocaleString()}</span>
                        )}
                      </div>
                    )}
                    {proj.live_url && (
                      <a href={proj.live_url} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[0.72rem] tracking-widest uppercase font-semibold text-[#1A1A1A] hover:text-[#B8972E] transition-colors border-b border-[#1A1A1A]/20 hover:border-[#B8972E]/50 pb-0.5"
                      >
                        <span>Visit Site</span><ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="stat-item" style={{ opacity: 0 }}>
                <div className="font-display text-5xl text-[#D4AF37] font-bold mb-2">{s.value}</div>
                <div className="text-[0.68rem] tracking-[0.22em] uppercase text-white/40 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsCarousel testimonials={testimonials} />

      {/* ── PRICING ── */}
      <PricingSection packages={packages} />

      {/* ── FAQ ── */}
      <FAQSection faqs={faqs} />
    </div>
  );
}
