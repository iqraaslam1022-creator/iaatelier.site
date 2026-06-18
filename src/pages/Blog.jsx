  import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["All", "Web Design", "Development", "SEO", "Ecommerce", "Strategy"];

const STATIC_POSTS = [
  {
    id: 1,
    slug: "why-premium-web-design-matters",
    title: "Why Premium Web Design Is Your Best Investment in 2024",
    excerpt: "In a crowded digital marketplace, your website is often the first impression. Here's why investing in premium design pays off exponentially.",
    category: "Web Design",
    featured_image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
    read_time: "5 min read",
    published_date: "2024-03-15",
    published: true,
    author_name: "Iqra Aslam",
  },
  {
    id: 2,
    slug: "seo-strategies-2024",
    title: "10 SEO Strategies That Actually Work in 2024",
    excerpt: "Search engine optimization has evolved dramatically. These proven strategies will help your website climb the rankings and stay there.",
    category: "SEO",
    featured_image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800&q=80",
    read_time: "7 min read",
    published_date: "2024-02-28",
    published: true,
    author_name: "Iqra Aslam",
  },
  {
    id: 3,
    slug: "shopify-vs-woocommerce",
    title: "Shopify vs WooCommerce: Which Is Right for Your Business?",
    excerpt: "Choosing the right ecommerce platform is crucial. We break down the pros and cons of both to help you make the best decision.",
    category: "Ecommerce",
    featured_image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    read_time: "6 min read",
    published_date: "2024-02-10",
    published: true,
    author_name: "Iqra Aslam",
  },
  {
    id: 4,
    slug: "ux-design-principles",
    title: "5 UX Design Principles Every Website Must Follow",
    excerpt: "Great user experience isn't accidental. These five principles are the foundation of websites that delight users and drive conversions.",
    category: "Web Design",
    featured_image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    read_time: "4 min read",
    published_date: "2024-01-25",
    published: true,
    author_name: "Iqra Aslam",
  },
  {
    id: 5,
    slug: "react-vs-wordpress",
    title: "React vs WordPress: Choosing the Right Technology Stack",
    excerpt: "The technology behind your website matters more than you think. Here's how to choose between modern React development and WordPress.",
    category: "Development",
    featured_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    read_time: "8 min read",
    published_date: "2024-01-10",
    published: true,
    author_name: "Iqra Aslam",
  },
  {
    id: 6,
    slug: "digital-strategy-2024",
    title: "Building a Winning Digital Strategy for Your Brand",
    excerpt: "A strong digital presence requires more than just a beautiful website. Learn how to create a comprehensive strategy that drives real results.",
    category: "Strategy",
    featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    read_time: "6 min read",
    published_date: "2023-12-20",
    published: true,
    author_name: "Iqra Aslam",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useRef(null);
  const posts = STATIC_POSTS;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-card",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.65, ease: "power2.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
      );
    });
    return () => ctx.revert();
  }, [posts]);

  useEffect(() => {
    gsap.fromTo(".blog-card",
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.45, ease: "power2.out" }
    );
  }, [activeCategory]);

  const featuredPost = activeCategory === "All" ? filtered[0] : null;
  const gridPosts = featuredPost ? filtered.slice(1) : filtered;

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
            <Link to={`/blog/${featuredPost.slug || featuredPost.id}`} className="grid grid-cols-1 lg:grid-cols-2">
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
              className={`px-5 py-2.5 text-[0.68rem] tracking-[0.14em] uppercase font-semibold rounded-sm transition-all ${
                activeCategory === cat ? "bg-[#1A1A1A] text-white" : "bg-white border border-[#1A1A1A]/10 text-[#6B6B6B] hover:border-[#B8972E]/40 hover:text-[#B8972E]"
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
            <Link key={post.id} to={`/blog/${post.slug || post.id}`}>
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

