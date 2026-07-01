import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Share2, Twitter, Linkedin } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single()
      .then(async ({ data, error }) => {
        if (data && !error) {
          setPost(data);
          document.title = data.title + " | IA Atelier";
          const { data: relatedData } = await supabase
            .from("blog_posts")
            .select("*")
            .eq("published", true)
            .eq("category", data.category)
            .neq("slug", slug)
            .limit(3);
          if (relatedData) setRelated(relatedData);
        }
        setLoading(false);
      });

    return () => { document.title = "IA Atelier"; };
  }, [slug]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FAFAF8" }}>
        <div className="w-8 h-8 border-2 border-[#B8972E]/20 border-t-[#B8972E] rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: "#FAFAF8" }}>
        <h1 className="font-display text-3xl text-[#1A1A1A]">Post Not Found</h1>
        <Link to="/blog" className="btn-gold rounded-sm inline-flex items-center gap-2"><span>Back to Blog</span></Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0D0D0D]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 lg:px-10 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#D4AF37]">{post.category}</span>
              <span className="text-white/30">·</span>
              <span className="text-[0.68rem] text-white/60 flex items-center gap-1.5"><Clock size={11} />{post.read_time}</span>
              {post.published_date && (
                <><span className="text-white/30">·</span><span className="text-[0.68rem] text-white/60">{post.published_date}</span></>
              )}
            </div>
            <h1 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] text-white leading-tight max-w-3xl">{post.title}</h1>
            {post.author_name && (
              <div className="mt-4 text-sm text-white/60">By <span className="text-white/90 font-medium">{post.author_name}</span></div>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#B8972E] transition-colors mb-10">
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <article className="prose prose-lg max-w-none">
            {(post.content || "").replace(/\\n/g, "\n").replace(/^"|"$/g, "").trim().split("\n").map((line, i) => {
              if (line.startsWith("## ")) return <h2 key={i} className="font-display text-2xl text-[#1A1A1A] mt-10 mb-4">{line.replace("## ", "")}</h2>;
              if (line.startsWith("### ")) return <h3 key={i} className="font-display text-xl text-[#1A1A1A] mt-8 mb-3">{line.replace("### ", "")}</h3>;
              if (line.startsWith("- ")) {
                const text = line.replace("- ", "");
                const parts = text.split(/\*\*(.*?)\*\*/g);
                return (
                  <li key={i} className="text-[#6B6B6B] leading-relaxed ml-4 list-disc">
                    {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-[#1A1A1A] font-semibold">{p}</strong> : p)}
                  </li>
                );
              }
              if (line === "") return <br key={i} />;
              const parts = line.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i} className="text-[#6B6B6B] leading-relaxed mb-2">
                  {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-[#1A1A1A] font-semibold">{p}</strong> : p)}
                </p>
              );
            })}
          </article>
        </motion.div>

        <div className="mt-12 pt-8 border-t border-[#E8E8E4] flex items-center gap-4">
          <span className="text-[0.68rem] tracking-widest uppercase text-[#6B6B6B] font-semibold flex items-center gap-2">
            <Share2 size={13} /> Share
          </span>
          <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] hover:border-[#B8972E]/40 transition-all">
            <Twitter size={15} />
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] hover:border-[#B8972E]/40 transition-all">
            <Linkedin size={15} />
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10"><div className="gold-line" /><span className="section-label">Related Articles</span></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="lux-card rounded-sm overflow-hidden group block">
                <div className="relative h-44 overflow-hidden">
                  <img src={p.featured_image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" loading="lazy" />
                </div>
                <div className="p-5 bg-white">
                  <span className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#B8972E] mb-2 block">{p.category}</span>
                  <h3 className="font-display text-base text-[#1A1A1A] leading-snug group-hover:text-[#B8972E] transition-colors">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
