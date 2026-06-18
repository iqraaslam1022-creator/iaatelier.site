import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useLang } from "@/lib/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const navRef = useRef(null);
  const { lang, toggleLang, t } = useLang();

  const NAV_ITEMS = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.portfolio, path: "/portfolio" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.blog, path: "/blog" },
    { label: t.nav.contact, path: "/contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const isTransparent = isHome && !scrolled;

  const navBg = scrolled
    ? "bg-white/96 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
    : isHome ? "bg-transparent"
    : "bg-white/96 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]";

  const logoColor = isTransparent ? "text-white" : "text-[#1A1A1A]";
  const linkColor = isTransparent ? "text-white/85 hover:text-white" : "text-[#2D2D2D] hover:text-[#B8972E]";
  const activeColor = isTransparent ? "text-white" : "text-[#B8972E]";

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`} style={{ opacity: 0 }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className={`font-display text-xl tracking-widest transition-colors duration-300 ${logoColor}`}>
              IA <span className={`font-bold ${isTransparent ? "text-[#D4AF37]" : ""} ${!isTransparent ? "gold-gradient" : ""}`}>Atelier</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}
                    className={`relative px-4 py-2 text-[0.7rem] tracking-[0.18em] uppercase font-medium transition-colors duration-300 min-h-[44px] flex items-center ${active ? activeColor : linkColor}`}
                  >
                    {item.label}
                    {active && (
                      <motion.div layoutId="navUnderline"
                        className={`absolute bottom-0 left-4 right-4 h-[1.5px] ${isTransparent ? "bg-white" : "bg-[#B8972E]"}`}
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={toggleLang}
                className={`text-[0.7rem] tracking-[0.18em] uppercase font-semibold px-3 py-1.5 rounded-sm border transition-all duration-300 ${
                  isTransparent
                    ? "border-white/30 text-white/70 hover:text-white hover:border-white/60"
                    : "border-[#B8972E]/40 text-[#B8972E] hover:bg-[#B8972E] hover:text-white"
                }`}
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>
              <Link to="/contact"
                className={`px-7 py-3 text-[0.72rem] tracking-[0.14em] uppercase font-semibold rounded-sm transition-all duration-300 ${
                  isTransparent
                    ? "border border-white/50 text-white hover:bg-white hover:text-[#1A1A1A]"
                    : "bg-[#1A1A1A] text-white hover:bg-[#B8972E]"
                }`}
              >
                {t.nav.startProject}
              </Link>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-11 h-11 flex items-center justify-center ${isTransparent ? "text-white" : "text-[#1A1A1A]"}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-[#1A1A1A]">
              <X size={24} />
            </button>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => {
                const active = location.pathname === item.path;
                return (
                  <motion.div key={item.path} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05, duration: 0.32 }}>
                    <Link to={item.path}
                      className={`flex items-center justify-between py-4 border-b border-[#1A1A1A]/08 font-display text-2xl tracking-wide transition-colors ${active ? "text-[#B8972E]" : "text-[#1A1A1A] hover:text-[#B8972E]"}`}
                    >
                      <span>
                        <span className="text-xs text-[#B8972E] mr-3 font-body tracking-widest">0{i + 1}</span>
                        {item.label}
                      </span>
                      <ChevronRight size={16} className="text-[#B8972E]/50" />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }} className="mt-8">
              <button onClick={toggleLang} className="w-full mb-3 py-3 border border-[#B8972E]/40 text-[#B8972E] text-sm tracking-widest uppercase font-semibold rounded-sm">
                {lang === "en" ? "العربية" : "English"}
              </button>
              <Link to="/contact" className="btn-gold rounded-sm w-full block text-center py-4">
                <span>{t.nav.startProject}</span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 
 
         
       
