import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";

const SERVICE_OPTIONS = [
  "Web Design", "Web Development", "Ecommerce Development",
  "SEO Optimization", "UI/UX Design", "Landing Pages",
  "Shopify Development", "WordPress Development", "Website Maintenance",
];

const CONTACT_INFO = [
  { icon: Phone, title: "Phone", lines: ["0316 4079480", "0312 4494148"] },
  { icon: Mail, title: "Email", lines: ["iqraaslamiqraaslam30@gmail.com"] },
  { icon: MapPin, title: "Address", lines: ["112B Jasmine Block, Sector C,", "Bahria Town Lahore"] },
  { icon: Clock, title: "Response Time", lines: ["< 24h", "Average response within one business day"] },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", service: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 lg:py-40 relative overflow-hidden" style={{ backgroundColor: "#FAFAF8" }}>
      {/* Subtle pattern */}
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
            <span className="section-label">Get In Touch</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.96] text-[#1A1A1A] max-w-3xl"
          >
            Start Your <em className="gold-gradient not-italic">Project</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg font-light max-w-lg mt-6 leading-relaxed text-[#6B6B6B]"
          >
            Ready to elevate your digital presence? Let's create something extraordinary together.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            {CONTACT_INFO.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 border border-[#B8972E]/30 bg-[#B8972E]/5">
                  <item.icon size={16} className="text-[#B8972E]" />
                </div>
                <div>
                  <h4 className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-1.5">{item.title}</h4>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-sm text-[#2D2D2D]">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
            >
              <a
                href="https://wa.me/923164079480"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 lux-card rounded-sm px-6 py-4 hover:border-[#25D366]/40 transition-all group"
              >
                <MessageCircle size={18} className="text-[#25D366]" />
                <span className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#25D366] transition-colors">Chat on WhatsApp</span>
              </a>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="lux-card rounded-sm p-8 lg:p-10 space-y-6" style={{ backgroundColor: "#FFFFFF" }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#B0B0A8] focus:border-[#B8972E] focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Your Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#B0B0A8] focus:border-[#B8972E] focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Select Service</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#B8972E] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Project Details</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#B0B0A8] focus:border-[#B8972E] focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="btn-gold rounded-sm w-full flex items-center justify-center gap-2"
                disabled={sending}
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : sent ? (
                  <span>Message Sent ✓</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
