import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor, Code, ShoppingCart, Search, Palette,
  LayoutDashboard, Store, Globe, Settings,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

// Icon map — database mein icon_name string store hoti hai
const ICON_MAP = {
  Monitor, Code, ShoppingCart, Search, Palette,
  LayoutDashboard, Store, Globe, Settings,
};

// Fallback agar database empty ho
const DEFAULT_SERVICES = [
  { id: 1, num: "01", title: "Web Design", description: "Breathtaking interfaces that captivate and convert visitors into loyal customers.", icon_name: "Monitor", color: "#F9F5E8" },
  { id: 2, num: "02", title: "Web Development", description: "High-performance websites built with cutting-edge technology and flawless code.", icon_name: "Code", color: "#F5F5F0" },
  { id: 3, num: "03", title: "Ecommerce Development", description: "Revenue-driving online stores engineered for maximum conversions and seamless UX.", icon_name: "ShoppingCart", color: "#F8F6F0" },
  { id: 4, num: "04", title: "SEO Optimization", description: "Dominate search rankings with data-driven strategies that deliver measurable results.", icon_name: "Search", color: "#F5F5F0" },
  { id: 5, num: "05", title: "UI/UX Design", description: "User-centric designs that create intuitive, delightful digital experiences.", icon_name: "Palette", color: "#F9F5E8" },
  { id: 6, num: "06", title: "Landing Pages", description: "High-converting landing pages engineered to turn every visitor into a customer.", icon_name: "LayoutDashboard", color: "#F5F5F0" },
  { id: 7, num: "07", title: "Shopify Development", description: "Premium Shopify stores that stand out and drive consistent revenue growth.", icon_name: "Store", color: "#F8F6F0" },
  { id: 8, num: "08", title: "WordPress Development", description: "Custom WordPress solutions combining flexibility with enterprise-grade performance.", icon_name: "Globe", color: "#F5F5F0" },
  { id: 9, num: "09", title: "Website Maintenance", description: "Proactive care and optimization to keep your digital presence at peak performance.", icon_name: "Settings", color: "#F9F5E8" },
];

function ServiceCard({ service, index }) {
  const Icon = ICON_MAP[service.icon_name] || Monitor;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="lux-card rounded-sm p-8 cursor-default group"
      style={{ backgroundColor: service.color || "#F5F5F0" }}
    >
      <div className="w-11 h-11 rounded-sm flex items-center justify-center mb-8 bg-[#1A1A1A] group-hover:bg-[#B8972E] transition-colors duration-400">
        <Icon size={18} className="text-white" />
      </div>
      <div className="text-[0.65rem] tracking-[0.22em] uppercase text-[#B8972E] font-semibold mb-3">
        {service.num}
      </div>
      <h3 className="font-display text-xl text-[#1A1A1A] mb-4 group-hover:text-[#B8972E] transition-colors duration-300 leading-snug">
        {service.title}
      </h3>
      <p className="text-sm leading-relaxed text-[#6B6B6B]">{service.description}</p>
      <div className="mt-8 h-[1px] bg-gradient-to-r from-[#B8972E]/0 via-[#B8972E]/0 to-[#B8972E]/0 group-hover:via-[#B8972E]/40 transition-all duration-500" />
    </motion.div>
  );
}

export default function ServicesSection() {
  const [services, setServices] = useState(DEFAULT_SERVICES);

  useEffect(() => {
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (data && !error && data.length > 0) setServices(data);
      });
  }, []);

  return (
    <section id="services" className="py-28 lg:py-40 relative overflow-hidden" style={{ backgroundColor: "#FAFAF8" }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, #D0D0C8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id || service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}