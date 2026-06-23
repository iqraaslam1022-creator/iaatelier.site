import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: "Home", services: "Services", portfolio: "Portfolio",
      about: "About", blog: "Blog", contact: "Contact",
      startProject: "Start a Project",
    },
    home: {
      hero: {
        lines: ["Architecting", "Digital Legacies", "That Convert"],
        subtitle: "Premium web experiences crafted with precision, passion and purpose — for brands that demand the extraordinary.",
        ctaPrimary: "View Our Work", ctaSecondary: "Start a Project", scroll: "Scroll",
        stats: [
          { value: "50+", label: "Projects Delivered" },
          { value: "3+", label: "Years Experience" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "12+", label: "Industries Served" },
        ],
      },
      services: {
        badge: "What I Offer", title: "Bespoke Digital", titleItalic: "Services", viewAll: "View All Services",
        items: [
          { num: "01", title: "Web Design", description: "Breathtaking interfaces that captivate and convert visitors into loyal customers." },
          { num: "02", title: "Web Development", description: "High-performance websites built with cutting-edge technology and flawless code." },
          { num: "03", title: "Ecommerce Development", description: "Revenue-driving online stores engineered for maximum conversions and seamless UX." },
          { num: "04", title: "SEO Optimization", description: "Dominate search rankings with data-driven strategies that deliver measurable results." },
        ],
      },
      portfolio: {
        badge: "Selected Work", title: "The Portfolio", titleItalic: "Gallery",
        viewAll: "View All Projects", visitSite: "Visit Site",
      },
      testimonials: {
        badge: "Client Stories",
        items: [
          { review_text: "Iqra delivered a website that exceeded every expectation. The attention to detail, the animations, the overall experience — it felt like working with a world-class agency.", client_name: "Sarah Mitchell", company_name: "CEO, Luxe Brands Co.", rating: 5 },
          { review_text: "The portfolio website she built for us generated 3x more client inquiries within the first month. Truly exceptional work.", client_name: "Ahmed Al-Rashid", company_name: "Founder, TechVenture Dubai", rating: 5 },
          { review_text: "Our new Shopify store is absolutely stunning. Sales increased by 45% in the first quarter. Worth every penny.", client_name: "Emma Thompson", company_name: "Marketing Director, StyleHouse", rating: 5 },
          { review_text: "Professional, precise, and passionate about her craft. Iqra understood our vision and translated it into a digital masterpiece.", client_name: "Marcus Chen", company_name: "Entrepreneur", rating: 5 },
          { review_text: "The multilingual website she created works flawlessly in Arabic. RTL support was perfect. Highly recommended.", client_name: "Fatima Al-Zahra", company_name: "Brand Strategist", rating: 5 },
        ],
      },
      pricing: {
        badge: "Investment", title: "Transparent", titleItalic: "Pricing",
        subtitle: "Choose the package that matches your ambition. All include our signature quality guarantee.",
        popular: "Most Popular", oneTime: "one-time payment",
        packages: [
          { name: "Starter", original_price: 299, discount_price: null, is_featured: false, cta_text: "Get Started", cta_link: "/contact", features: ["3-Page Website", "Mobile Responsive", "Basic SEO Setup", "Contact Form", "1 Revision Round", "5-Day Delivery"] },
          { name: "Professional", original_price: 699, discount_price: 599, is_featured: false, cta_text: "Get Started", cta_link: "/contact", features: ["Up to 8 Pages", "Mobile Responsive", "Advanced SEO", "CMS Integration", "3 Revision Rounds", "10-Day Delivery", "Analytics Setup"] },
          { name: "Premium", original_price: 1299, discount_price: 999, is_featured: true, cta_text: "Get Started", cta_link: "/contact", features: ["Up to 15 Pages", "Custom Animations", "Full SEO Package", "E-commerce Ready", "Unlimited Revisions", "14-Day Delivery", "Priority Support", "Performance Optimization"] },
          { name: "Enterprise", original_price: 2499, discount_price: null, is_featured: false, cta_text: "Contact Us", cta_link: "/contact", features: ["Unlimited Pages", "Full Custom Design", "Advanced Animations", "Multi-language Support", "Dedicated Support", "Custom Integrations", "Monthly Maintenance", "Performance Reports"] },
        ],
      },
      faq: {
        badge: "FAQ", title: "Frequently", titleItalic: "Asked",
        items: [
          { question: "What is your typical project timeline?", answer: "Most projects are completed within 2–4 weeks depending on complexity. Rush delivery is available upon request." },
          { question: "Do you offer revisions?", answer: "Yes! All packages include multiple revision rounds to ensure you're completely satisfied with the final result." },
          { question: "What technologies do you use?", answer: "I work with React, Next.js, Shopify, WordPress, and modern CSS frameworks to build fast, scalable websites." },
          { question: "Do you provide ongoing maintenance?", answer: "Yes, I offer monthly maintenance packages to keep your website updated, secure, and performing at its best." },
          { question: "Can you redesign my existing website?", answer: "Absolutely. I specialize in transforming outdated websites into modern, high-converting digital experiences." },
        ],
      },
    },
    services: {
      badge: "What I Offer", title: "Bespoke Digital", titleItalic: "Services",
      subtitle: "Every pixel is a deliberate choice. Every interaction, a crafted experience built to elevate your brand.",
      ctaTitle: "Ready to Start Your", ctaItalic: "Project?",
      ctaSubtitle: "Let's discuss how we can help elevate your digital presence.",
      ctaBtn: "Get In Touch",
      items: [
        { num: "01", title: "Web Design", description: "Breathtaking interfaces that captivate and convert visitors into loyal customers.", deliverables: ["UI Design", "Wireframes", "Prototypes", "Style Guide"] },
        { num: "02", title: "Web Development", description: "High-performance websites built with cutting-edge technology and flawless code.", deliverables: ["React", "Next.js", "Tailwind CSS", "API Integration"] },
        { num: "03", title: "Ecommerce Development", description: "Revenue-driving online stores engineered for maximum conversions and seamless UX.", deliverables: ["Shopify", "WooCommerce", "Payment Gateway", "Inventory"] },
        { num: "04", title: "SEO Optimization", description: "Dominate search rankings with data-driven strategies that deliver measurable results.", deliverables: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics"] },
        { num: "05", title: "UI/UX Design", description: "User-centric designs that create intuitive, delightful digital experiences.", deliverables: ["User Research", "Figma Design", "Usability Testing", "Design System"] },
        { num: "06", title: "Landing Pages", description: "High-converting landing pages engineered to turn every visitor into a customer.", deliverables: ["A/B Testing", "CRO", "Copywriting", "Analytics"] },
        { num: "07", title: "Shopify Development", description: "Premium Shopify stores that stand out and drive consistent revenue growth.", deliverables: ["Custom Theme", "App Integration", "Speed Optimization", "SEO"] },
        { num: "08", title: "WordPress Development", description: "Custom WordPress solutions combining flexibility with enterprise-grade performance.", deliverables: ["Custom Theme", "Plugin Development", "WooCommerce", "Security"] },
        { num: "09", title: "Website Maintenance", description: "Proactive care and optimization to keep your digital presence at peak performance.", deliverables: ["Updates", "Backups", "Security", "Performance Monitoring"] },
      ],
    },
    portfolio: {
      badge: "Selected Work", title: "The Portfolio", titleItalic: "Gallery",
      subtitle: "A curated collection of digital masterpieces built for ambitious brands.",
      scrollText: "Scroll to explore our work →",
      allProjects: "All Projects", visitSite: "Visit Site",
      ctaText: "Have a project in mind? Let's create something extraordinary together.",
      ctaBtn: "Start a Project",
      projects: [
        { id: 1, title: "Luxury Watch Website Design", description: "A modern luxury watch website concept focused on premium design, responsive layouts, smooth interactions, and high-end user experience.", category: "Web Design", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f664fe3a7_rolex-herosection.png", live_url: "https://accomplished-apex-time-vault.base44.app/", completion_date: "2024" },
        { id: 2, title: "Hafiz Builders | Premium Construction", description: "Hafiz Builders delivers high-quality residential, commercial, and architectural construction services with modern design and expert engineering.", category: "UI / UX", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f1eb8f6d7_real-estate.png", live_url: "https://hafiz-build-elite.base44.app/", completion_date: "2024" },
        { id: 3, title: "Hafiz Cuisine – Restaurant Management", description: "A modern restaurant management website featuring online reservations, food ordering, order tracking, inventory management, and a fully responsive experience.", category: "Ecommerce", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/d2d3978cb_hafiz-cusine.png", live_url: "https://hafiz-luxury-dine.base44.app/", completion_date: "2024" },
      ],
    },
    about: {
      badge: "The Studio", headline1: "Behind the", headline2: "Vision",
      subtitle: "We are a boutique digital studio merging artistry with technology to craft online experiences that transcend the ordinary and define the extraordinary.",
      storyBadge: "Our Story",
      story1: "Founded in 2021, IA Atelier was born from a belief that digital craftsmanship should match the ambition of the brands we serve. Every project begins with deep research and ends with a result that feels inevitable.",
      story2: "We combine editorial aesthetics, technical precision, and strategic thinking to deliver web experiences that don't just look remarkable — they perform remarkably.",
      workBtn: "Work With Us",
      journeyBadge: "Our Journey", journeyTitle: "A Timeline of", journeyTitleItalic: "Growth",
      timeline: [
        { year: "2021", title: "The Beginning", desc: "Founded with a vision to create world-class digital experiences for ambitious brands." },
        { year: "2022", title: "First Milestones", desc: "Delivered 15+ projects, establishing our reputation for precision and premium quality." },
        { year: "2023", title: "Expanding Services", desc: "Launched full-stack development and ecommerce capabilities, growing to 30+ clients." },
        { year: "2024", title: "Award Recognition", desc: "Recognized as a top boutique digital studio, serving 12+ industries worldwide." },
      ],
      stats: [
        { value: "50+", label: "Projects Delivered" },
        { value: "3+", label: "Years Experience" },
        { value: "98%", label: "Client Satisfaction" },
        { value: "12+", label: "Industries Served" },
      ],
    },
    blog: {
      badge: "Insights & Ideas", title: "The IA", titleItalic: "Journal",
      subtitle: "Insights on digital strategy, design, and development for ambitious brands.",
      featured: "Featured", readArticle: "Read Article", read: "Read",
      noPosts: "No posts in this category yet.",
      categories: ["All", "Web Design", "Development", "SEO", "Ecommerce", "Strategy"],
      posts: [
        { id: 1, slug: "why-premium-web-design-matters", title: "Why Premium Web Design Is Your Best Investment in 2024", excerpt: "In a crowded digital marketplace, your website is often the first impression. Here's why investing in premium design pays off exponentially.", category: "Web Design", featured_image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80", read_time: "5 min read", published_date: "2024-03-15" },
        { id: 2, slug: "seo-strategies-2024", title: "10 SEO Strategies That Actually Work in 2024", excerpt: "Search engine optimization has evolved dramatically. These proven strategies will help your website climb the rankings and stay there.", category: "SEO", featured_image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800&q=80", read_time: "7 min read", published_date: "2024-02-28" },
        { id: 3, slug: "shopify-vs-woocommerce", title: "Shopify vs WooCommerce: Which Is Right for Your Business?", excerpt: "Choosing the right ecommerce platform is crucial. We break down the pros and cons of both to help you make the best decision.", category: "Ecommerce", featured_image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80", read_time: "6 min read", published_date: "2024-02-10" },
        { id: 4, slug: "ux-design-principles", title: "5 UX Design Principles Every Website Must Follow", excerpt: "Great user experience isn't accidental. These five principles are the foundation of websites that delight users and drive conversions.", category: "Web Design", featured_image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80", read_time: "4 min read", published_date: "2024-01-25" },
        { id: 5, slug: "react-vs-wordpress", title: "React vs WordPress: Choosing the Right Technology Stack", excerpt: "The technology behind your website matters more than you think. Here's how to choose between modern React development and WordPress.", category: "Development", featured_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80", read_time: "8 min read", published_date: "2024-01-10" },
        { id: 6, slug: "digital-strategy-2024", title: "Building a Winning Digital Strategy for Your Brand", excerpt: "A strong digital presence requires more than just a beautiful website. Learn how to create a comprehensive strategy that drives real results.", category: "Strategy", featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", read_time: "6 min read", published_date: "2023-12-20" },
      ],
    },
    contact: {
      badge: "Get In Touch", headline: "Start Your", headlineItalic: "Project",
      subtitle: "Ready to elevate your digital presence? Let's create something extraordinary together.",
      nameLabel: "Your Name", emailLabel: "Your Email", serviceLabel: "Select Service", messageLabel: "Project Details",
      namePlaceholder: "John Doe", emailPlaceholder: "john@example.com", messagePlaceholder: "Tell me about your project...",
      sendBtn: "Send Message", sentBtn: "Message Sent ✓", errorMsg: "Message send nahi hua, dobara try karo!",
      whatsapp: "Chat on WhatsApp", mapsBtn: "Open in Maps",
      services: ["Web Design", "Web Development", "Ecommerce Development", "SEO Optimization", "UI/UX Design", "Landing Pages", "Shopify Development", "WordPress Development", "Website Maintenance"],
      info: [
        { title: "Phone", lines: ["+92 316 4079480", "+92 312 4494148"] },
        { title: "Email", lines: ["iqraaslamiqraaslam30@gmail.com"] },
        { title: "Address", lines: ["112B Jasmine Block, Sector C,", "Bahria Town Lahore"] },
        { title: "Response Time", lines: ["< 24 hours", "Average response within one business day"] },
      ],
    },
  },
  ar: {
    nav: {
      home: "الرئيسية", services: "الخدمات", portfolio: "الأعمال",
      about: "من نحن", blog: "المدونة", contact: "تواصل معنا",
      startProject: "ابدأ مشروعك",
    },
    home: {
      hero: {
        lines: ["نبني", "إرثاً رقمياً", "يُحقق النتائج"],
        subtitle: "تجارب ويب فاخرة مصنوعة بدقة وشغف وهدف — للعلامات التجارية التي تطمح إلى الاستثنائي.",
        ctaPrimary: "استعرض أعمالنا", ctaSecondary: "ابدأ مشروعك", scroll: "اسحب للأسفل",
        stats: [
          { value: "50+", label: "مشروع منجز" },
          { value: "3+", label: "سنوات خبرة" },
          { value: "98%", label: "رضا العملاء" },
          { value: "12+", label: "قطاع مخدوم" },
        ],
      },
      services: {
        badge: "ما نقدمه", title: "خدمات رقمية", titleItalic: "متميزة", viewAll: "عرض جميع الخدمات",
        items: [
          { num: "01", title: "تصميم المواقع", description: "واجهات مذهلة تجذب الزوار وتحولهم إلى عملاء دائمين." },
          { num: "02", title: "تطوير المواقع", description: "مواقع عالية الأداء مبنية بأحدث التقنيات وأنظف الأكواد." },
          { num: "03", title: "تطوير التجارة الإلكترونية", description: "متاجر إلكترونية مُحسَّنة لأقصى معدلات التحويل وتجربة مستخدم سلسة." },
          { num: "04", title: "تحسين محركات البحث", description: "تصدَّر نتائج البحث باستراتيجيات مبنية على البيانات." },
        ],
      },
      portfolio: {
        badge: "أعمال مختارة", title: "معرض", titleItalic: "الأعمال",
        viewAll: "عرض جميع المشاريع", visitSite: "زيارة الموقع",
      },
      testimonials: {
        badge: "آراء العملاء",
        items: [
          { review_text: "قدمت إقرا موقعاً فاق كل توقعاتنا. الاهتمام بالتفاصيل والحركات والتجربة الكاملة شعرت وكأننا نعمل مع وكالة عالمية.", client_name: "سارة ميتشيل", company_name: "الرئيس التنفيذي، Luxe Brands Co.", rating: 5 },
          { review_text: "الموقع الذي بنته لنا جلب 3 أضعاف استفسارات العملاء في الشهر الأول. عمل استثنائي حقاً.", client_name: "أحمد الراشد", company_name: "المؤسس، TechVenture Dubai", rating: 5 },
          { review_text: "متجرنا الجديد على Shopify رائع تماماً. ارتفعت المبيعات 45% في الربع الأول.", client_name: "إيما طومسون", company_name: "مديرة التسويق، StyleHouse", rating: 5 },
          { review_text: "محترفة ودقيقة وشغوفة بعملها. فهمت إقرا رؤيتنا وترجمتها إلى تحفة رقمية.", client_name: "ماركوس تشن", company_name: "رائد أعمال", rating: 5 },
          { review_text: "الموقع متعدد اللغات يعمل بشكل مثالي باللغة العربية. دعم RTL كان ممتازاً.", client_name: "فاطمة الزهراء", company_name: "استراتيجية العلامات التجارية", rating: 5 },
        ],
      },
      pricing: {
        badge: "الاستثمار", title: "أسعار", titleItalic: "شفافة",
        subtitle: "اختر الباقة التي تناسب طموحك. جميعها تشمل ضمان الجودة المميز.",
        popular: "الأكثر طلباً", oneTime: "دفعة واحدة",
        packages: [
          { name: "المبتدئ", original_price: 299, discount_price: null, is_featured: false, cta_text: "ابدأ الآن", cta_link: "/contact", features: ["3 صفحات", "متوافق مع الجوال", "إعداد SEO أساسي", "نموذج تواصل", "جولة تعديل واحدة", "تسليم في 5 أيام"] },
          { name: "احترافي", original_price: 699, discount_price: 599, is_featured: false, cta_text: "ابدأ الآن", cta_link: "/contact", features: ["حتى 8 صفحات", "متوافق مع الجوال", "SEO متقدم", "تكامل CMS", "3 جولات تعديل", "تسليم في 10 أيام", "إعداد التحليلات"] },
          { name: "مميز", original_price: 1299, discount_price: 999, is_featured: true, cta_text: "ابدأ الآن", cta_link: "/contact", features: ["حتى 15 صفحة", "رسوم متحركة مخصصة", "باقة SEO كاملة", "جاهز للتجارة الإلكترونية", "تعديلات غير محدودة", "تسليم في 14 يوماً", "دعم أولوية", "تحسين الأداء"] },
          { name: "مؤسسي", original_price: 2499, discount_price: null, is_featured: false, cta_text: "تواصل معنا", cta_link: "/contact", features: ["صفحات غير محدودة", "تصميم مخصص كامل", "رسوم متحركة متقدمة", "دعم متعدد اللغات", "دعم مخصص", "تكاملات مخصصة", "صيانة شهرية", "تقارير الأداء"] },
        ],
      },
      faq: {
        badge: "الأسئلة الشائعة", title: "أسئلة", titleItalic: "متكررة",
        items: [
          { question: "ما هو الجدول الزمني المعتاد للمشروع؟", answer: "تكتمل معظم المشاريع خلال 2-4 أسابيع حسب التعقيد. التسليم السريع متاح عند الطلب." },
          { question: "هل تقدمون تعديلات؟", answer: "نعم! تشمل جميع الباقات جولات تعديل متعددة لضمان رضاك الكامل." },
          { question: "ما هي التقنيات التي تستخدمونها؟", answer: "نعمل مع React وNext.js وShopify وWordPress وأطر CSS الحديثة." },
          { question: "هل تقدمون صيانة مستمرة؟", answer: "نعم، نقدم باقات صيانة شهرية للحفاظ على موقعك محدثاً وآمناً." },
          { question: "هل يمكنكم إعادة تصميم موقعي الحالي؟", answer: "بالتأكيد. نتخصص في تحويل المواقع القديمة إلى تجارب رقمية حديثة." },
        ],
      },
    },
    services: {
      badge: "ما نقدمه", title: "خدمات رقمية", titleItalic: "متميزة",
      subtitle: "كل بكسل هو اختيار مدروس. كل تفاعل، تجربة مصممة للارتقاء بعلامتك التجارية.",
      ctaTitle: "هل أنت مستعد لبدء", ctaItalic: "مشروعك؟",
      ctaSubtitle: "لنناقش كيف يمكننا مساعدتك في تعزيز حضورك الرقمي.",
      ctaBtn: "تواصل معنا",
      items: [
        { num: "01", title: "تصميم المواقع", description: "واجهات مذهلة تجذب الزوار وتحولهم إلى عملاء دائمين.", deliverables: ["تصميم UI", "الإطارات السلكية", "النماذج الأولية", "دليل الأسلوب"] },
        { num: "02", title: "تطوير المواقع", description: "مواقع عالية الأداء مبنية بأحدث التقنيات وأنظف الأكواد.", deliverables: ["React", "Next.js", "Tailwind CSS", "تكامل API"] },
        { num: "03", title: "تطوير التجارة الإلكترونية", description: "متاجر إلكترونية مُحسَّنة لأقصى معدلات التحويل وتجربة مستخدم سلسة.", deliverables: ["Shopify", "WooCommerce", "بوابة الدفع", "المخزون"] },
        { num: "04", title: "تحسين محركات البحث", description: "تصدَّر نتائج البحث باستراتيجيات مبنية على البيانات وتحقق نتائج قابلة للقياس.", deliverables: ["بحث الكلمات المفتاحية", "SEO داخلي", "SEO تقني", "التحليلات"] },
        { num: "05", title: "تصميم UI/UX", description: "تصاميم تمحورت حول المستخدم تخلق تجارب رقمية بديهية وممتعة.", deliverables: ["بحث المستخدم", "تصميم Figma", "اختبار قابلية الاستخدام", "نظام التصميم"] },
        { num: "06", title: "صفحات الهبوط", description: "صفحات هبوط عالية التحويل مصممة لتحويل كل زائر إلى عميل.", deliverables: ["اختبار A/B", "تحسين التحويل", "كتابة المحتوى", "التحليلات"] },
        { num: "07", title: "تطوير Shopify", description: "متاجر Shopify متميزة تبرز وتحقق نمواً متسقاً في الإيرادات.", deliverables: ["قالب مخصص", "تكامل التطبيقات", "تحسين السرعة", "SEO"] },
        { num: "08", title: "تطوير WordPress", description: "حلول WordPress مخصصة تجمع بين المرونة والأداء على مستوى المؤسسات.", deliverables: ["قالب مخصص", "تطوير الإضافات", "WooCommerce", "الأمان"] },
        { num: "09", title: "صيانة المواقع", description: "رعاية وتحسين استباقي للحفاظ على حضورك الرقمي في أفضل أداء.", deliverables: ["التحديثات", "النسخ الاحتياطية", "الأمان", "مراقبة الأداء"] },
      ],
    },
    portfolio: {
      badge: "أعمال مختارة", title: "معرض", titleItalic: "الأعمال",
      subtitle: "مجموعة منتقاة من التحف الرقمية المبنية للعلامات الطموحة.",
      scrollText: "اسحب لاستكشاف أعمالنا ←",
      allProjects: "جميع المشاريع", visitSite: "زيارة الموقع",
      ctaText: "هل لديك مشروع في ذهنك؟ لنصنع شيئاً استثنائياً معاً.",
      ctaBtn: "ابدأ مشروعاً",
      projects: [
        { id: 1, title: "تصميم موقع ساعات فاخرة", description: "مفهوم موقع ساعات فاخر حديث يركز على التصميم الراقي والتخطيطات المتجاوبة والتفاعلات السلسة.", category: "تصميم مواقع", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f664fe3a7_rolex-herosection.png", live_url: "https://accomplished-apex-time-vault.base44.app/", completion_date: "2024" },
        { id: 2, title: "حافظ بيلدرز | إنشاءات فاخرة", description: "تقدم حافظ بيلدرز خدمات إنشاء سكنية وتجارية ومعمارية عالية الجودة بتصميم حديث وهندسة متخصصة.", category: "UI / UX", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f1eb8f6d7_real-estate.png", live_url: "https://hafiz-build-elite.base44.app/", completion_date: "2024" },
        { id: 3, title: "حافظ كيوزين – إدارة المطاعم", description: "موقع إدارة مطاعم حديث يتضمن الحجز أونلاين وطلب الطعام وتتبع الطلبات وإدارة المخزون.", category: "تجارة إلكترونية", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/d2d3978cb_hafiz-cusine.png", live_url: "https://hafiz-luxury-dine.base44.app/", completion_date: "2024" },
      ],
    },
    about: {
      badge: "الاستوديو", headline1: "خلف", headline2: "الرؤية",
      subtitle: "نحن استوديو رقمي متخصص يجمع بين الفن والتكنولوجيا لصياغة تجارب رقمية تتجاوز المألوف وتصنع الاستثنائي.",
      storyBadge: "قصتنا",
      story1: "تأسس IA Atelier عام 2021 من إيمان بأن الحرفية الرقمية يجب أن ترقى لمستوى طموح العلامات التي نخدمها. كل مشروع يبدأ بأبحاث معمقة وينتهي بنتيجة تبدو حتمية.",
      story2: "نجمع بين الجماليات التحريرية والدقة التقنية والتفكير الاستراتيجي لتقديم تجارب ويب لا تبدو رائعة فحسب — بل تؤدي بشكل رائع.",
      workBtn: "اعمل معنا",
      journeyBadge: "مسيرتنا", journeyTitle: "جدول زمني من", journeyTitleItalic: "النمو",
      timeline: [
        { year: "2021", title: "البداية", desc: "تأسسنا برؤية لإنشاء تجارب رقمية عالمية المستوى للعلامات الطموحة." },
        { year: "2022", title: "أولى الإنجازات", desc: "أنجزنا 15+ مشروعاً، وأرسينا سمعتنا في الدقة والجودة الفاخرة." },
        { year: "2023", title: "توسيع الخدمات", desc: "أطلقنا قدرات التطوير الكامل والتجارة الإلكترونية، ووصلنا لـ 30+ عميل." },
        { year: "2024", title: "الاعتراف بالجوائز", desc: "حُزنا على لقب أفضل استوديو رقمي متخصص، نخدم 12+ قطاعاً حول العالم." },
      ],
      stats: [
        { value: "50+", label: "مشروع منجز" },
        { value: "3+", label: "سنوات خبرة" },
        { value: "98%", label: "رضا العملاء" },
        { value: "12+", label: "قطاع مخدوم" },
      ],
    },
    blog: {
      badge: "أفكار ورؤى", title: "مجلة", titleItalic: "IA",
      subtitle: "رؤى حول الاستراتيجية الرقمية والتصميم والتطوير للعلامات الطموحة.",
      featured: "مميز", readArticle: "اقرأ المقال", read: "اقرأ",
      noPosts: "لا توجد مقالات في هذه الفئة بعد.",
      categories: ["الكل", "تصميم مواقع", "تطوير", "SEO", "تجارة إلكترونية", "استراتيجية"],
      posts: [
        { id: 1, slug: "why-premium-web-design-matters", title: "لماذا التصميم الاحترافي للمواقع هو أفضل استثماراتك في 2024", excerpt: "في السوق الرقمي المزدحم، موقعك غالباً هو الانطباع الأول. إليك لماذا الاستثمار في التصميم الاحترافي يؤتي ثماراً هائلة.", category: "تصميم مواقع", featured_image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80", read_time: "5 دقائق", published_date: "2024-03-15" },
        { id: 2, slug: "seo-strategies-2024", title: "10 استراتيجيات SEO تعمل فعلاً في 2024", excerpt: "تطور تحسين محركات البحث بشكل كبير. هذه الاستراتيجيات المجربة ستساعد موقعك على تصدر النتائج والبقاء فيها.", category: "SEO", featured_image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800&q=80", read_time: "7 دقائق", published_date: "2024-02-28" },
        { id: 3, slug: "shopify-vs-woocommerce", title: "Shopify مقابل WooCommerce: أيهما يناسب عملك؟", excerpt: "اختيار منصة التجارة الإلكترونية المناسبة أمر بالغ الأهمية. نحلل إيجابيات وسلبيات كل منهما لمساعدتك في اتخاذ أفضل قرار.", category: "تجارة إلكترونية", featured_image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80", read_time: "6 دقائق", published_date: "2024-02-10" },
        { id: 4, slug: "ux-design-principles", title: "5 مبادئ UX يجب أن يتبعها كل موقع", excerpt: "تجربة المستخدم الرائعة ليست مصادفة. هذه المبادئ الخمسة هي أساس المواقع التي تبهج المستخدمين وتحقق التحويلات.", category: "تصميم مواقع", featured_image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80", read_time: "4 دقائق", published_date: "2024-01-25" },
        { id: 5, slug: "react-vs-wordpress", title: "React مقابل WordPress: اختيار التقنية المناسبة", excerpt: "التقنية خلف موقعك تهم أكثر مما تتخيل. إليك كيفية الاختيار بين تطوير React الحديث وWordPress.", category: "تطوير", featured_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80", read_time: "8 دقائق", published_date: "2024-01-10" },
        { id: 6, slug: "digital-strategy-2024", title: "بناء استراتيجية رقمية رابحة لعلامتك التجارية", excerpt: "الحضور الرقمي القوي يتطلب أكثر من موقع جميل. تعلم كيف تبني استراتيجية شاملة تحقق نتائج حقيقية.", category: "استراتيجية", featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", read_time: "6 دقائق", published_date: "2023-12-20" },
      ],
    },
    contact: {
      badge: "تواصل معنا", headline: "ابدأ", headlineItalic: "مشروعك",
      subtitle: "هل أنت مستعد للارتقاء بحضورك الرقمي؟ لنصنع شيئاً استثنائياً معاً.",
      nameLabel: "اسمك", emailLabel: "بريدك الإلكتروني", serviceLabel: "اختر الخدمة", messageLabel: "تفاصيل المشروع",
      namePlaceholder: "محمد أحمد", emailPlaceholder: "example@mail.com", messagePlaceholder: "أخبرني عن مشروعك...",
      sendBtn: "إرسال الرسالة", sentBtn: "تم الإرسال ✓", errorMsg: "لم يتم إرسال الرسالة، حاول مجدداً!",
      whatsapp: "تواصل عبر واتساب", mapsBtn: "افتح في الخرائط",
      services: ["تصميم المواقع", "تطوير المواقع", "تطوير التجارة الإلكترونية", "تحسين محركات البحث", "تصميم UI/UX", "صفحات الهبوط", "تطوير Shopify", "تطوير WordPress", "صيانة المواقع"],
      info: [
        { title: "الهاتف", lines: ["+92 316 4079480", "+92 312 4494148"] },
        { title: "البريد الإلكتروني", lines: ["iqraaslamiqraaslam30@gmail.com"] },
        { title: "العنوان", lines: ["112B Jasmine Block, Sector C,", "Bahria Town Lahore"] },
        { title: "وقت الاستجابة", lines: ["أقل من 24 ساعة", "متوسط الرد خلال يوم عمل واحد"] },
      ],
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const toggleLang = () => setLang((l) => (l === "en" ? "ar" : "en"));
  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      <div dir={lang === "ar" ? "rtl" : "ltr"} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
  
