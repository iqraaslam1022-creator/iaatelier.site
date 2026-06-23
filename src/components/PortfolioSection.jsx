import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://flkgnuywynftkwztbkwn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsa2dudXl3eW5mdGt3enRia3duIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjcxMDksImV4cCI6MjA5NzQwMzEwOX0.6tVRs39QgLDrlM2xKIGhzYz8X4s1WFQqJ7HpZx5eJy8"
);

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
      <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden" style={{ backgroundColor: project.accent }}>
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: imgY }}
          className="w-full h-[115%] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4">
          <span className="text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-[#B8972E] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
            {project.tag}
          </span>
        </div>
        <div className="absolute top-3 right-4 font-display text-5xl font-bold text-[#1A1A1A]/[0.07] select-none">
          {project.num}
        </div>
      </div>

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: true });

      if (!error) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-28 lg:py-40 relative overflow-hidden" style={{ backgroundColor: "#F5F5F0" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
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

        {loading ? (
          <p className="text-center text-[#6B6B6B]">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-center text-[#6B6B6B]">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
