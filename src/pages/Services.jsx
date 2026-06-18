 import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Monitor, Code, ShoppingCart, Search, Palette, LayoutDashboard, Store, Globe, Settings, Zap, Star, Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Monitor, Code, ShoppingCart, Search, Palette, LayoutDashboard, Store, Globe, Settings, Zap, Star, Heart };

const STATIC_SERVICES = [
  { id: 1, num: "01", title: "Web Design", icon_name: "Monitor", description: "Breathtaking interfaces that captivate and convert visitors into loyal customers.", deliverables: ["UI Design", "Wireframes", "Prototypes", "Style Guide"] },
  { id: 2, num: "02", title: "Web Development", icon_name: "Code", description: "High-performance websites built with cutting-edge technology and flawless code.", deliverables: ["React", "Next.js", "Tailwind CSS", "API Integration"] },
  { id: 3, num: "03", title: "Ecommerce Development", icon_name: "ShoppingCart", description: "Revenue-driving online stores engineered for maximum conversions and seamless UX.", deliverables: ["Shopify", "WooCommerce", "Payment Gateway", "Inventory"] },
  { id: 4, num: "04", title: "SEO Optimization", icon_name: "Search", description: "Dominate search rankings with data-driven strategies that deliver measurable results.", deliverables: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics"] },
  { id: 5, num: "05", title: "UI/UX Design", icon_name: "Palette", description: "User-centric designs that create intuitive, delightful digital experiences.", deliverables: ["User Research", "Figma Design", "Usability Testing", "Design System"] },
  { id: 6, num: "06", title: "Landing Pages", icon_name: "LayoutDashboard", description: "High-converting landing pages engineered to turn every visitor into a customer.", deliverables: ["A/B Testing", "CRO", "Copywriting", "Analytics"] },
  { id: 7, num: "07", title: "Shopify Development", icon_name: "Store", description: "Premium Shopify stores that stand out and drive consistent revenue growth.", deliverables: ["Custom Theme", "App Integration", "Speed Optimization", "SEO"] },
  { id: 8, num: "08", title: "WordPress Development", icon_name: "Globe", description: "Custom WordPress solutions combining flexibility with enterprise-grade performance.", deliverables: ["Custom Theme", "Plugin Development", "WooCommerce", "Security"] },
  { id: 9, num: "09", title: "Website Maintenance", icon_name: "Settings", description: "Proactive care and optimization to keep your digital presence at peak performance.", deliverables: ["Updates", "Backups", "Security", "Performance Monitoring"] },
];

export default function Services() {
  const services = STATIC_SERVICES;
  const cardsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!services.length) return;
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
  }, [services]);

  const colors = ["#FFFFFF", "#F9F5E8", "#F5F5F0", "#F8F6F0", "#FAFAF8", "#F9F5E8", "#F5F5F0", "#F8F6F0", "#FAFAF8"];

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-6">
          <div className="gold-line" /><span className="section-label">What I Offer</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] text-[#1A1A1A] max-w-3xl mb-6"
        >
          Bespoke Digital <em className="gold-gradient not-italic">Services</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg font-light max-w-xl leading-relaxed text-[#6B6B6B]"
        >
          Every pixel is a deliberate choice. Every interaction, a crafted experience built to elevate your brand.
        </motion.p>
      </section>

      <section ref={cardsRef} className="px-6 lg:px-10 pb-32">
        <div className="max-w-5xl mx-auto space-y-8">
          {services.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon_name] || Monitor;
            return (
              <div key={svc.id} className="stack-service-card lux-card rounded-sm p-10 lg:p-14 group"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
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
            Ready to Start Your <em className="text-[#D4AF37] not-italic">Project?</em>
          </h2>
          <p className="text-white/55 mb-10 text-lg font-light">Let's discuss how we can help elevate your digital presence.</p>
          <Link to="/contact" className="btn-gold rounded-sm inline-flex items-center gap-2"><span>Get In Touch</span><ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
