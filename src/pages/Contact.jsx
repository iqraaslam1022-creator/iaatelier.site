import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowRight, Instagram, Linkedin } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from '@emailjs/browser';
import { useLang } from "@/lib/LanguageContext";
import SEO from "@/components/SEO";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_ICONS = [Phone, Mail, MapPin, Clock];

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const infoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    emailjs.init("AspbT2NRr1vswgaTv");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".contact-info-item",
          { opacity: 0, x: lang === "ar" ? 30 : -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.12,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: { trigger: infoRef.current, start: "top 75%", invalidateOnRefresh: true },
          }
        );
        ScrollTrigger.refresh();
      });
      return () => ctx.revert();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [lang]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      await emailjs.send(
        "service_n5slkj3",
        "template_2p7v7ep",
        {
          from_name: form.name,
          from_email: form.email,
          service: form.service || "Not specified",
          message: form.message,
        }
      );
      await emailjs.send(
        "service_n5slkj3",
        "template_t57yods",
        {
          to_name: form.name,
          to_email: form.email,
          from_email: form.email,
          service: form.service || "Not specified",
        }
      );
      setSent(true);
      setForm({ name: "", email: "", service: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error("Email error:", err);
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact IA Atelier | Web Design & Branding Studio"
        description="Get in touch with IA Atelier for premium web design, branding, UI/UX design, and custom digital solutions. Let's discuss your next project."
        keywords="Contact IA Atelier, web design agency, branding studio, UI UX design, website development, digital agency"
        url="/contact"
      />
      <div style={{ backgroundColor: "#FAFAF8" }}>
        <section className="pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="gold-line" />
            <span className="section-label">{c.badge}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] text-[#1A1A1A] max-w-3xl mb-6"
          >
            {c.headline} <em className="gold-gradient not-italic">{c.headlineItalic}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg font-light max-w-lg leading-relaxed text-[#6B6B6B]"
          >
            {c.subtitle}
          </motion.p>
        </section>

        <section className="px-6 lg:px-10 pb-28 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div ref={infoRef} className="lg:col-span-2 space-y-8">
              {c.info.map((item, i) => {
                const Icon = CONTACT_ICONS[i] || Phone;
                return (
                  <div key={`${lang}-${item.title}`} className="contact-info-item flex gap-4" style={{ opacity: 0 }}>
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 border border-[#B8972E]/30 bg-[#B8972E]/5">
                      <Icon size={16} className="text-[#B8972E]" />
                    </div>
                    <div>
                      <h4 className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-1.5">
                        {item.title}
                      </h4>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-sm text-[#2D2D2D]">{line}</p>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* WhatsApp */}
              <div className="contact-info-item" style={{ opacity: 0 }}>
                <a
                  href="https://wa.me/923164079480"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 lux-card rounded-sm px-6 py-4 hover:border-[#25D366]/40 transition-all group"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#25D366] transition-colors">
                    {c.whatsapp}
                  </span>
                </a>
              </div>

              {/* Instagram */}
              <div className="contact-info-item" style={{ opacity: 0 }}>
                <a
                  href="https://www.instagram.com/iqraaslam1865"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 lux-card rounded-sm px-6 py-4 hover:border-[#E1306C]/40 transition-all group"
                >
                  <Instagram size={18} className="text-[#E1306C]" />
                  <span className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#E1306C] transition-colors">
                    @iqraaslam1865
                  </span>
                </a>
              </div>

              {/* LinkedIn */}
              <div className="contact-info-item" style={{ opacity: 0 }}>
                <a
                  href="https://www.linkedin.com/in/iqra-aslam-744b033a2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 lux-card rounded-sm px-6 py-4 hover:border-[#0A66C2]/40 transition-all group"
                >
                  <Linkedin size={18} className="text-[#0A66C2]" />
                  <span className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#0A66C2] transition-colors">
                    Iqra Aslam
                  </span>
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="lg:col-span-3"
            >
              <div className="lux-card rounded-sm p-8 lg:p-10 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">
                        {c.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#B0B0A8] focus:border-[#B8972E] focus:outline-none transition-colors"
                        placeholder={c.namePlaceholder}
                      />
                    </div>
                    <div>
                      <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">
                        {c.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#B0B0A8] focus:border-[#B8972E] focus:outline-none transition-colors"
                        placeholder={c.emailPlaceholder}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">
                      {c.serviceLabel}
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#B8972E] focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">{c.serviceLabel}</option>
                      {c.services.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">
                      {c.messageLabel}
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#B0B0A8] focus:border-[#B8972E] focus:outline-none transition-colors resize-none"
                      placeholder={c.messagePlaceholder}
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm">{c.errorMsg}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-gold rounded-sm w-full flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : sent ? (
                      <span>{c.sentBtn}</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>{c.sendBtn}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-6 lg:px-10 pb-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lux-card rounded-sm overflow-hidden"
          >
            <div className="bg-[#F5F5F0] h-72 lg:h-96 flex items-center justify-center relative">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "linear-gradient(#D0D0C8 1px,transparent 1px),linear-gradient(90deg,#D0D0C8 1px,transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10 text-center">
                <div className="w-14 h-14 bg-[#B8972E] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin size={24} className="text-white" />
                </div>
                <h3 className="font-display text-2xl text-[#1A1A1A] mb-2">
                  {lang === "ar" ? "بحرية تاون لاهور" : "Bahria Town Lahore"}
                </h3>
                <p className="text-[#6B6B6B] text-sm">
                  {lang === "ar" ? "112B جاسمين بلوك، سيكتور سي" : "112B Jasmine Block, Sector C"}
                </p>
                <a
                  href="https://maps.google.com/?q=Bahria+Town+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-[0.72rem] tracking-widest uppercase font-semibold text-[#B8972E] hover:text-[#1A1A1A] transition-colors border-b border-[#B8972E]/40 hover:border-[#1A1A1A]/40 pb-0.5"
                >
                  {c.mapsBtn} <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}




