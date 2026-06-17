import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Monitor, Code, ShoppingCart, Search, Palette,
  LayoutDashboard, Store, Globe, Settings,
} from "lucide-react";

const SERVICES = [
  { icon: Monitor, num: "01", title: "Web Design", desc: "Breathtaking interfaces that captivate and convert visitors into loyal customers.", color: "#F9F5E8" },
  { icon: Code, num: "02", title: "Web Development", desc: "High-performance websites built with cutting-edge technology and flawless code.", color: "#F5F5F0" },
  { icon: ShoppingCart, num: "03", title: "Ecommerce Development", desc: "Revenue-driving online stores engineered for maximum conversions and seamless UX.", color: "#F8F6F0" },
  { icon: Search, num: "04", title: "SEO Optimization", desc: "Dominate search rankings with data-driven strategies that deliver measurable results.", color: "#F5F5F0" },
  { icon: Palette, num: "05", title: "UI/UX Design", desc: "User-centric designs that create intuitive, delightful digital experiences.", color: "#F9F5E8" },
  { icon: LayoutDashboard, num: "06", title: "Landing Pages", desc: "High-converting landing pages engineered to turn every visitor into a customer.", color: "#F5F5F0" },
  { icon: Store, num: "07", title: "Shopify Development", desc: "Premium Shopify stores that stand out and drive consistent revenue growth.", color: "#F8F6F0" },
  { icon: Globe, num: "08", title: "WordPress Development", desc: "Custom WordPress solutions combining flexibility with enterprise-grade performance.", color: "#F5F5F0" },
  { icon: Settings, num: "09", title: "Website Maintenance", desc: "Proactive care and optimization to keep your digital presence at peak performance.", color: "#F9F5E8" },
];

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="lux-card rounded-sm p-8 cursor-default group"
      style={{ backgroundColor: service.color }}
    >
      {/* Icon */}
      <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-8 bg-[#1A1A1A] group-hover:bg-[#B8972E] transition-colors duration-400">
        <Icon size={18} className="text-white" />
      </div>

      {/* Number */}
      <div className="text-[0.65rem] tracking-[0.22em] uppercase text-[#B8972E] font-semibold mb-3">
        {service.num}
      </div>

      {/* Title */}
      <h3 className="font-display text-xl text-[#1A1A1A] mb-4 group-hover:text-[#B8972E] transition-colors duration-300 leading-snug">
        {service.title}
      </h3>

      {/* Desc */}
      <p className="text-sm leading-relaxed text-[#6B6B6B]">{service.desc}</p>

      {/* Hover line */}
      <div className="mt-8 h-[1px] bg-gradient-to-r from-[#B8972E]/0 via-[#B8972E]/0 to-[#B8972E]/0 group-hover:via-[#B8972E]/40 transition-all duration-500" />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 lg:py-40 relative overflow-hidden" style={{ backgroundColor: "#FAFAF8" }}>
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #D0D0C8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

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
            <span className="section-label">What I Offer</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.96] text-[#1A1A1A] max-w-2xl">
              Bespoke Digital{" "}
              <em className="gold-gradient not-italic">Services</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-light max-w-lg mt-6 leading-relaxed text-[#6B6B6B]"
          >
            Every pixel is a deliberate choice. Every interaction, a crafted experience.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
