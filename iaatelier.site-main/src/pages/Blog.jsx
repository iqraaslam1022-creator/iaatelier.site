import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabaseClient";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Web Design", "Development", "SEO", "Ecommerce", "Strategy"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_date", { ascending: false })
      .then(({ data, error }) => {
        if (data && !error) setPosts(data);
        setLoading(false);
      });
  }, []);

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  useEffect(() => {
    if (!loading && filtered.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".blog-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "power2.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" }
          }
        );
      });
      return () => ctx.revert();
    }
  }, [loading]);

  useEffect(() => {
    gsap.fromTo(".blog-card",
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.45, ease: "power2.out" }
    );
  }, [activeCategory]);

  const featuredPost = activeCategory === "All" ? filtered[0] : null;
  const gridPosts = featuredPost ? filtered.slice(1) : filtered;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="w-8 h-8 border-2 border-[#B8972E]/20 border-t-[#B8972E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>
      <section className="pt-40 pb-20 px-6 lg:px-10 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex items-center gap-3 mb-6">
          <div className="gold-line" /><span className="section-label">Insights & Ideas</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-[clamp(2.8rem,6vw,6rem)] leading-[0.94] text-[#1A1A1A] max-w-3xl mb-6"
        >
          The IA <em className="gold-gradient not-italic">Journal</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg font-light max-w-lg leading-relaxed text-[#6B6B6B]"
        >
          Insights on digital strategy, design, and development for ambitious brands.
        </motion.p>
      </section>

      {featuredPost && (
        <section className="px-6 lg:px-10 max-w-7xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="lux-card rounded-sm overflow-hidden group"
          >
            <Link to={`/blog/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img src={featuredPost.featured_image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                <span className="absolute top-5 left-5 text-[0.62rem] tracking-[0.22em] uppercase font-semibold text-[#B8972E] bg-white/92 px-3 py-1.5 rounded-sm">Featured</span>
              </div>
              <div className="p-10 lg:p-14 flex flex-col justify-center bg-white">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#B8972E]">{featuredPost.category}</span>
                  <span className="text-[#1A1A1A]/20">·</span>
                  <span className="text-[0.68rem] text-[#6B6B6B] flex items-center gap-1.5"><Clock size={11} />{featuredPost.read_time}</span>
                </div>
                <h2 className="font-display text-2xl lg:text-3xl text-[#1A1A1A] mb-4 leading-snug group-hover:text-[#B8972E] transition-colors">{featuredPost.title}</h2>
                <p className="text-[#6B6B6B] leading-relaxed mb-8">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1A1A1A] hover:text-[#B8972E] transition-colors border-b border-[#1A1A1A]/20 w-fit pb-0.5">
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      <section className="px-6 lg:px-10 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-[0.68rem] tracking-[0.14em] uppercase font-semibold rounded-sm transition-all ${activeCategory === cat ? "bg-[#1A1A1A] text-white" : "bg-white border border-[#1A1A1A]/10 text-[#6B6B6B] hover:border-[#B8972E]/40 hover:text-[#B8972E]"
                }`}
            >{cat}</button>
          ))}
        </div>
      </section>

      <section ref={gridRef} className="px-6 lg:px-10 pb-28 max-w-7xl mx-auto">
        {gridPosts.length === 0 && (
          <p className="text-[#6B6B6B] text-center py-12">No posts in this category yet.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <article className="blog-card lux-card rounded-sm overflow-hidden group cursor-pointer h-full" style={{ opacity: 0 }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.07]" loading="lazy" />
                  <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/15 transition-all duration-400" />
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#B8972E] flex items-center gap-1"><Tag size={9} />{post.category}</span>
                    <span className="text-[#1A1A1A]/15">·</span>
                    <span className="text-[0.68rem] text-[#6B6B6B] flex items-center gap-1"><Clock size={10} />{post.read_time}</span>
                  </div>
                  <h3 className="font-display text-lg text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#B8972E] transition-colors">{post.title}</h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] text-[#6B6B6B]/70">{post.published_date}</span>
                    <span className="text-[0.68rem] tracking-widest uppercase font-semibold text-[#B8972E] flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}










