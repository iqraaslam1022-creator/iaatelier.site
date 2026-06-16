import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
  {
    image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f664fe3a7_rolex-herosection.png",
    tag: "Web Design",
    num: "01",
    title: "Luxury Watch Website Design",
    desc: "A modern luxury watch website concept focused on premium design, responsive layouts, smooth interactions, and high-end user experience.",
    link: "https://accomplished-apex-time-vault.base44.app/",
    accent: "#F4F0E2",
  },
  {
    image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f1eb8f6d7_real-estate.png",
    tag: "UI / UX",
    num: "02",
    title: "Hafiz Builders | Premium Construction",
    desc: "Hafiz Builders delivers high-quality residential, commercial, and architectural construction services with modern design and expert engineering.",
    link: "https://hafiz-build-elite.base44.app/",
    accent: "#EEF2F0",
  },
  {
    image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/d2d3978cb_hafiz-cusine.png",
    tag: "Ecommerce",
    num: "03",
    title: "Hafiz Cuisine – Restaurant Management",
    desc: "A modern restaurant management website featuring online reservations, food ordering, order tracking, inventory management, and a fully responsive experience.",
    link: "https://hafiz-luxury-dine.base44.app/",
    accent: "#F2EEF0",
  },
];

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group lux-card rounded-sm overflow-hidden"
    >
      {/* Image with parallax */}
      <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden" style={{ backgroundColor: project.accent }}>
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: imgY }}
          className="w-full h-[115%] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-[#B8972E] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
            {project.tag}
          </span>
        </div>

        {/* Number */}
        <div className="absolute top-3 right-4 font-display text-5xl font-bold text-[#1A1A1A]/[0.07] select-none">
          {project.num}
        </div>
      </div>

      {/* Content */}
      <div className="p-7 lg:p-8" style={{ backgroundColor: project.accent }}>
        <h3 className="font-display text-xl text-[#1A1A1A] mb-3 group-hover:text-[#B8972E] transition-colors duration-300 leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-[#6B6B6B] leading-relaxed mb-6">{project.desc}</p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.18em] uppercase font-semibold text-[#1A1A1A] hover:text-[#B8972E] transition-colors group/link border-b border-[#1A1A1A]/20 hover:border-[#B8972E]/50 pb-0.5"
          >
            <span>Visit Website</span>
            <ExternalLink size={13} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-28 lg:py-40 relative overflow-hidden" style={{ backgroundColor: "#F5F5F0" }}>
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
            <span className="section-label">Selected Work</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.96] text-[#1A1A1A] max-w-2xl"
          >
            The Portfolio{" "}
            <em className="gold-gradient not-italic">Gallery</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-light max-w-lg mt-6 leading-relaxed text-[#6B6B6B]"
          >
            A curated collection of digital masterpieces built for ambitious brands.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
