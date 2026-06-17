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
