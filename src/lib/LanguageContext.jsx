import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      home: "Home", services: "Services", portfolio: "Portfolio",
      about: "About", blog: "Blog", contact: "Contact",
      startProject: "Start a Project",
    },
    hero: {
      badge: "Award-Winning Digital Studio",
      lines: ["Architecting", "Digital Legacies", "That Convert"],
      subtitle: "Premium web experiences crafted with precision, passion and purpose — for brands that demand the extraordinary.",
      viewWork: "View My Work",
      stats: [
        { value: "50+", label: "Projects" },
        { value: "3+", label: "Years" },
        { value: "98%", label: "Satisfaction" },
        { value: "12+", label: "Industries" },
      ],
    },
    about: {
      badge: "The Studio", headline1: "Behind the", headline2: "Vision",
      subtitle: "We are a boutique digital studio merging artistry with technology to craft online experiences that transcend the ordinary and define the extraordinary.",
      storyBadge: "Our Story",
      story1: "Founded in 2021, IA Atelier was born from a belief that digital craftsmanship should match the ambition of the brands we serve. Every project begins with deep research and ends with a result that feels inevitable.",
      story2: "We combine editorial aesthetics, technical precision, and strategic thinking to deliver web experiences that don't just look remarkable — they perform remarkably.",
      workBtn: "Work With Us",
      journeyBadge: "Our Journey",
      journeyTitle: "A Timeline of",
      journeyTitleItalic: "Growth",
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
    contact: {
      badge: "Get In Touch",
      headline: "Start Your",
      headlineItalic: "Project",
      subtitle: "Ready to elevate your digital presence? Let's create something extraordinary together.",
      namePlaceholder: "John Doe", emailPlaceholder: "john@example.com",
      nameLabel: "Your Name", emailLabel: "Your Email",
      serviceLabel: "Select Service", messageLabel: "Project Details",
      messagePlaceholder: "Tell me about your project...",
      sendBtn: "Send Message", sentBtn: "Message Sent ✓",
      errorMsg: "Message send nahi hua, dobara try karo!",
      whatsapp: "Chat on WhatsApp", mapsBtn: "Open in Maps",
      services: ["Web Design", "Web Development", "Ecommerce Development",
        "SEO Optimization", "UI/UX Design", "Landing Pages",
        "Shopify Development", "WordPress Development", "Website Maintenance"],
      info: [
        { title: "Phone", lines: ["0316 4079480", "0312 4494148"] },
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
    hero: {
      badge: "استوديو رقمي حائز على جوائز",
      lines: ["نبني", "إرثاً رقمياً", "يُحقق النتائج"],
      subtitle: "تجارب ويب فاخرة مصنوعة بدقة وشغف وهدف — للعلامات التجارية التي تطمح إلى الاستثنائي.",
      viewWork: "استعرض أعمالنا",
      stats: [
        { value: "50+", label: "مشروع" },
        { value: "3+", label: "سنوات" },
        { value: "98%", label: "رضا العملاء" },
        { value: "12+", label: "قطاع" },
      ],
    },
    about: {
      badge: "الاستوديو", headline1: "خلف", headline2: "الرؤية",
      subtitle: "نحن استوديو رقمي متخصص يجمع بين الفن والتكنولوجيا لصياغة تجارب رقمية تتجاوز المألوف وتصنع الاستثنائي.",
      storyBadge: "قصتنا",
      story1: "تأسس IA Atelier عام 2021 من إيمان بأن الحرفية الرقمية يجب أن ترقى لمستوى طموح العلامات التي نخدمها.",
      story2: "نجمع بين الجماليات والدقة التقنية والتفكير الاستراتيجي لتقديم تجارب ويب لا تبدو رائعة فحسب — بل تؤدي بشكل رائع.",
      workBtn: "اعمل معنا",
      journeyBadge: "مسيرتنا",
      journeyTitle: "جدول زمني من",
      journeyTitleItalic: "النمو",
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
    contact: {
      badge: "تواصل معنا",
      headline: "ابدأ",
      headlineItalic: "مشروعك",
      subtitle: "هل أنت مستعد للارتقاء بحضورك الرقمي؟ لنصنع شيئاً استثنائياً معاً.",
      namePlaceholder: "محمد أحمد", emailPlaceholder: "example@mail.com",
      nameLabel: "اسمك", emailLabel: "بريدك الإلكتروني",
      serviceLabel: "اختر الخدمة", messageLabel: "تفاصيل المشروع",
      messagePlaceholder: "أخبرني عن مشروعك...",
      sendBtn: "إرسال الرسالة", sentBtn: "تم الإرسال ✓",
      errorMsg: "لم يتم إرسال الرسالة، حاول مجدداً!",
      whatsapp: "تواصل عبر واتساب", mapsBtn: "افتح في الخرائط",
      services: ["تصميم المواقع", "تطوير المواقع", "تطوير التجارة الإلكترونية",
        "تحسين محركات البحث", "تصميم UI/UX", "صفحات الهبوط",
        "تطوير Shopify", "تطوير WordPress", "صيانة المواقع"],
      info: [
        { title: "الهاتف", lines: ["0316 4079480", "0312 4494148"] },
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
