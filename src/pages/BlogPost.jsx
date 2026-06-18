import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, Share2, Twitter, Linkedin } from "lucide-react";
import ReactMarkdown from "react-markdown";

// ✅ STATIC POSTS — same data as Blog.jsx
// Agar aap Blog.jsx mein posts update karen to yahan bhi update karen
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
    author_name: "Iqra Aslam",
    content: `## Why Premium Web Design Is Your Best Investment in 2024

In a crowded digital marketplace, your website is often the **first impression** potential clients have of your brand. A premium design doesn't just look beautiful — it communicates trust, professionalism, and attention to detail.

### First Impressions Matter

Research shows that users form an opinion about a website within **50 milliseconds**. That's faster than the blink of an eye. A poorly designed site sends visitors away before they've even read a single word.

### The ROI of Premium Design

Investing in quality web design delivers measurable returns:

- **Higher conversion rates** — well-designed CTAs and user flows convert better
- **Lower bounce rates** — users stay longer on beautiful, intuitive sites
- **Stronger brand trust** — premium aesthetics signal premium quality
- **Better SEO** — fast, accessible, well-structured sites rank higher

### What "Premium" Really Means

Premium design isn't just about aesthetics. It's about:

1. **Performance** — sub-2-second load times, optimised assets
2. **Accessibility** — usable by everyone, on every device
3. **Strategy** — every design decision serves a business goal
4. **Craft** — details that delight, animations that inform

### Conclusion

Your website is your hardest-working salesperson — available 24/7, reaching clients across the globe. Investing in premium design is investing in your brand's future.`,
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
    author_name: "Iqra Aslam",
    content: `## 10 SEO Strategies That Actually Work in 2024

SEO in 2024 is about **user intent, content quality, and technical excellence**. The old tricks no longer work. Here's what does.

### 1. Focus on Search Intent

Google's algorithm is sophisticated enough to understand *why* someone is searching. Match your content to the intent behind the query — informational, navigational, transactional, or commercial.

### 2. Create Comprehensive Content

Long-form, in-depth content that covers a topic thoroughly outperforms thin content. Aim for depth over word count.

### 3. Optimise for Core Web Vitals

Page experience signals matter. Your site must score well on:
- **LCP** (Largest Contentful Paint) — under 2.5s
- **FID** (First Input Delay) — under 100ms
- **CLS** (Cumulative Layout Shift) — under 0.1

### 4. Build Topical Authority

Instead of chasing individual keywords, build clusters of related content that establish you as an authority in your niche.

### 5. Prioritise E-E-A-T

Experience, Expertise, Authoritativeness, and Trustworthiness are Google's quality signals. Demonstrate real expertise in your content.

### 6–10

Technical SEO, internal linking, local SEO optimisation, schema markup, and earning quality backlinks round out a complete strategy.

### Conclusion

SEO is a long game. Consistent, high-quality effort over months and years builds sustainable organic traffic that compounds over time.`,
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
    author_name: "Iqra Aslam",
    content: `## Shopify vs WooCommerce: Which Is Right for Your Business?

Choosing between Shopify and WooCommerce is one of the most important decisions for any ecommerce business. Both are excellent platforms — but for different reasons.

### Shopify: The Hosted Solution

**Best for:** Businesses that want to focus on selling, not managing technology.

**Pros:**
- Fully hosted — no server management required
- Excellent uptime and security out of the box
- Beautiful, conversion-optimised themes
- Shopify Payments simplifies checkout

**Cons:**
- Monthly fees (Basic starts at $29/month)
- Transaction fees if not using Shopify Payments
- Less flexibility for complex customisations

### WooCommerce: The Open Source Option

**Best for:** Businesses that want full control and already use WordPress.

**Pros:**
- Free core plugin (hosting and extensions cost extra)
- Unlimited customisation possibilities
- Massive ecosystem of plugins
- You own your data completely

**Cons:**
- Requires WordPress knowledge
- You manage hosting, security, and updates
- Can get expensive with premium plugins

### Which Should You Choose?

| Factor | Shopify | WooCommerce |
|--------|---------|-------------|
| Technical skill needed | Low | Medium–High |
| Monthly cost | Predictable | Variable |
| Customisation | Moderate | Unlimited |
| Setup time | Hours | Days |

**Choose Shopify** if you're starting out and want to launch quickly with minimal technical overhead.

**Choose WooCommerce** if you have an existing WordPress site, need deep customisation, or want full ownership of your platform.`,
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
    author_name: "Iqra Aslam",
    content: `## 5 UX Design Principles Every Website Must Follow

Good UX design is invisible. When it works, users accomplish their goals effortlessly. When it fails, they leave in frustration. These five principles separate great websites from good ones.

### 1. Clarity Over Cleverness

Users shouldn't have to think. Every element on your page should have an obvious purpose. Clever navigation might win design awards — but clear navigation converts visitors into customers.

### 2. Hierarchy Guides the Eye

Visual hierarchy tells users where to look first, second, and third. Use size, contrast, colour, and spacing deliberately to guide attention toward your most important content and calls to action.

### 3. Consistency Builds Trust

When design patterns are consistent — buttons always look like buttons, links always look like links — users can navigate confidently. Inconsistency creates cognitive friction and erodes trust.

### 4. Feedback Confirms Actions

Every user interaction deserves a response. Button clicks, form submissions, page loads — each should provide immediate, clear feedback that something is happening.

### 5. Accessibility Is Not Optional

Designing for accessibility improves the experience for *everyone*. Sufficient colour contrast, keyboard navigation, and screen reader support aren't extras — they're fundamental to good design.

### Applying These Principles

Start with a UX audit of your current site. For each page, ask: Is it clear? Does it guide the eye? Is it consistent? Does it give feedback? Is it accessible? The answers will reveal your biggest opportunities for improvement.`,
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
    author_name: "Iqra Aslam",
    content: `## React vs WordPress: Choosing the Right Technology Stack

The technology you build on shapes everything: performance, flexibility, maintenance cost, and your team's ability to iterate. Here's a clear-headed comparison.

### WordPress: The Established Giant

WordPress powers **43% of the web** for good reason. It's battle-tested, has a massive ecosystem, and enables non-technical users to manage content independently.

**Ideal for:**
- Content-heavy sites (blogs, news, magazines)
- Businesses needing a CMS their team can manage
- Projects with tight budgets and timelines
- SEO-focused sites that need robust meta management

### React: The Modern Choice

React enables you to build **highly interactive, fast, and scalable** web applications. When combined with frameworks like Next.js, it delivers exceptional performance and developer experience.

**Ideal for:**
- Applications with complex user interactions
- Sites where performance is a competitive advantage
- Products that need to scale significantly
- Teams with JavaScript expertise

### Performance Comparison

React applications, when properly optimised, significantly outperform WordPress on:
- Time to First Byte (TTFB)
- Core Web Vitals scores
- JavaScript bundle size (with code splitting)

### The Hybrid Approach

Many modern projects use **headless WordPress** — WordPress as a CMS with a React frontend. This combines the editorial flexibility of WordPress with the performance and UX advantages of React.

### Our Recommendation

For marketing sites and content platforms: consider headless WordPress or Next.js with a headless CMS. For web applications: React with a modern backend API is the clear choice.`,
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
    author_name: "Iqra Aslam",
    content: `## Building a Winning Digital Strategy for Your Brand

A beautiful website without strategy is a brochure. A strategic digital presence is a growth engine. Here's how to build one.

### Start With Your Goals

Before touching design or technology, define what success looks like. Is it:
- Generating qualified leads?
- Building brand awareness in a new market?
- Converting existing traffic more effectively?
- Establishing thought leadership?

Your goals determine everything else.

### Know Your Audience Deeply

The most effective digital strategies are built on deep audience understanding. Go beyond demographics to psychographics:
- What problems keep them up at night?
- Where do they consume content?
- What triggers their buying decisions?
- Who do they trust for recommendations?

### Map the Customer Journey

Understand every touchpoint from awareness to advocacy. For each stage, ask: What does our audience need? What should they feel? What should they do next?

### Choose Your Channels Strategically

Not every channel is right for every brand. A B2B software company and a luxury fashion brand need completely different channel mixes. Focus on where your audience actually is, not where it's fashionable to be.

### Content as a Cornerstone

Content that genuinely helps your audience is the most sustainable form of digital marketing. It builds trust, drives organic search traffic, and positions you as an authority in your field.

### Measure What Matters

Vanity metrics (follower counts, impressions) feel good but rarely correlate with business outcomes. Focus on metrics that connect to revenue: conversion rates, customer acquisition cost, and lifetime value.

### The 90-Day Plan

Strategy without execution is fiction. Break your strategy into 90-day sprints with specific, measurable objectives. Review and adapt at the end of each sprint.`,
  },
];

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // ✅ FIXED: Static posts se data lo, base44 API se nahi
    const found = STATIC_POSTS.find(
      (p) => p.slug === slug || String(p.id) === String(slug)
    );

    if (found) {
      setPost(found);
      document.title = found.title + " | IA Atelier";
      // Related posts: same category, excluding current
      const rel = STATIC_POSTS.filter(
        (p) => p.id !== found.id && p.category === found.category
      ).slice(0, 3);
      setRelated(rel);
    }

    setLoading(false);
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
        <Link to="/blog" className="btn-gold rounded-sm inline-flex items-center gap-2">
          <span>Back to Blog</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>
      {/* Banner */}
      <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
        <img
          src={post.banner_image || post.featured_image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 lg:px-10 pb-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#D4AF37]">{post.category}</span>
              <span className="text-white/30">·</span>
              <span className="text-[0.68rem] text-white/60 flex items-center gap-1.5">
                <Clock size={11} />{post.read_time}
              </span>
              {post.published_date && (
                <>
                  <span className="text-white/30">·</span>
                  <span className="text-[0.68rem] text-white/60">{post.published_date}</span>
                </>
              )}
            </div>
            <h1 className="font-display text-[clamp(1.8rem,4vw,3.5rem)] text-white leading-tight max-w-3xl">
              {post.title}
            </h1>
            {post.author_name && (
              <div className="mt-4 text-sm text-white/60">
                By <span className="text-white/90 font-medium">{post.author_name}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#B8972E] transition-colors mb-10"
        >
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <article className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-[#1A1A1A]
            prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-[#6B6B6B] prose-p:leading-relaxed
            prose-strong:text-[#1A1A1A] prose-strong:font-semibold
            prose-li:text-[#6B6B6B] prose-li:leading-relaxed
            prose-a:text-[#B8972E] prose-a:no-underline hover:prose-a:underline
            prose-hr:border-[#E8E8E4]
            prose-table:text-sm prose-td:text-[#6B6B6B] prose-th:text-[#1A1A1A]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </motion.div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-10 pt-8 border-t border-[#E8E8E4] flex flex-wrap items-center gap-2">
            <Tag size={14} className="text-[#B8972E]" />
            {post.tags.map((tag) => (
              <span key={tag} className="text-[0.68rem] tracking-[0.14em] uppercase font-semibold px-3 py-1.5 bg-[#F5F5F0] text-[#6B6B6B] rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Share */}
        <div className="mt-8 flex items-center gap-4">
          <span className="text-[0.68rem] tracking-widest uppercase text-[#6B6B6B] font-semibold flex items-center gap-2">
            <Share2 size={13} /> Share
          </span>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
            target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] hover:border-[#B8972E]/40 transition-all"
          >
            <Twitter size={15} />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank" rel="noopener noreferrer"
            className="w-9 h-9 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] hover:border-[#B8972E]/40 transition-all"
          >
            <Linkedin size={15} />
          </a>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-20 px-6 lg:px-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="gold-line" />
            <span className="section-label">Related Articles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link key={p.id} to={`/blog/${p.slug || p.id}`} className="lux-card rounded-sm overflow-hidden group block">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={p.featured_image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 bg-white">
                  <span className="text-[0.62rem] tracking-widest uppercase font-semibold text-[#B8972E] mb-2 block">
                    {p.category}
                  </span>
                  <h3 className="font-display text-base text-[#1A1A1A] leading-snug group-hover:text-[#B8972E] transition-colors">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

