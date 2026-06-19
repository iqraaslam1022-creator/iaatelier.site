import React from "react";
import { motion } from "framer-motion";

const studioImg = "https://media.base44.com/images/public/6a2f5859e9ab50cdcf38783f/be1252f30_generated_2951403d.png";
const founderImg1 = "https://media.base44.com/images/public/6a2f5859e9ab50cdcf38783f/9aabe3b4a_generated_1f6f89de.png";
const founderImg2 = "https://media.base44.com/images/public/6a2f5859e9ab50cdcf38783f/b2d5dbe27_generated_0959087e.png";

const STATS_ROW = [
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Projects Delivered" },
  { value: "3+", label: "Years Experience" },
  { value: "12+", label: "Industries Served" },
];

const FOUNDERS = [
  {
    name: "Iqra Aslam",
    role: "Founder & CEO",
    image: founderImg1,
    bio: "Visionary web developer and designer with a passion for creating digital experiences that elevate brands. Combining technical expertise with creative flair to deliver solutions that drive real business growth.",
  },
  {
    name: "Hafiz Umair Aslam",
    role: "Co-Founder & Development Lead",
    image: founderImg2,
    bio: "Full-stack development specialist with deep technical knowledge across modern frameworks and platforms. Focused on building robust, scalable solutions that perform flawlessly under pressure.",
  },
];



return (
  <section id="studio" className="py-28 lg:py-40 relative overflow-hidden" style={{ backgroundColor: "#FAFAF8" }}>
    {/* Dot pattern */}
    <div
      className="absolute inset-0 pointer-events-none opacity-35"
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
          <span className="section-label">The Studio</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.96] text-[#1A1A1A] max-w-2xl"
        >
          Behind the <em className="gold-gradient not-italic">Vision</em>
        </motion.h2>
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-28">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-lg leading-relaxed text-[#6B6B6B] mb-10">
            We are a boutique digital studio, merging artistry with technology
            to craft online experiences that transcend the ordinary and define
            the extraordinary.
          </p>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="lux-card rounded-sm overflow-hidden">
            <img
              src={studioImg}
              alt="IA Studio workspace"
              className="w-full h-80 object-cover"
              loading="lazy"
            />
          </div>
          {/* Gold accent corner */}
          <div className="absolute -bottom-4 -right-4 w-28 h-28 border border-[#B8972E]/25 rounded-sm" />
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="lux-card rounded-sm p-10 lg:p-14 mb-28"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS_ROW.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl lg:text-5xl text-[#B8972E] font-bold mb-2">{stat.value}</div>
              <div className="text-[0.68rem] tracking-[0.2em] uppercase text-[#6B6B6B] font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Founders label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-12"
      >
        <div className="gold-line" />
        <span className="section-label">The Founders</span>
      </motion.div>

      {/* Founders grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {FOUNDERS.map((founder, i) => (
          <motion.div
            key={founder.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.14, duration: 0.65 }}
            whileHover={{ y: -5, transition: { duration: 0.28 } }}
            className="lux-card rounded-sm overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 flex-shrink-0">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-56 sm:h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-7 lg:p-8 flex flex-col justify-center">
                <h3 className="font-display text-xl text-[#1A1A1A] mb-1">{founder.name}</h3>
                <p className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] mb-4 font-semibold">{founder.role}</p>
                <p className="text-sm leading-relaxed text-[#6B6B6B]">{founder.bio}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

