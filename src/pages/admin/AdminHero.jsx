import React, { useState } from "react";
import { Save, Eye, EyeOff } from "lucide-react";

const DEFAULT = {
  video_url: "https://media.base44.com/videos/public/6a2b674054d9bbcb910aeb3f/c9aaf41db_06131.mp4",
  bg_image_url: "", use_video: true,
  heading_line1: "Architecting", heading_line2: "Digital Legacies", heading_line3: "That Convert",
  subheading: "Premium web experiences crafted with precision, passion and purpose — for brands that demand the extraordinary.",
  cta_primary_text: "View Our Work", cta_primary_link: "/portfolio",
  cta_secondary_text: "Start a Project", cta_secondary_link: "/contact",
};

export default function AdminHero() {
  const [hero, setHero] = useState(DEFAULT);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const Field = ({ label, name, multiline = false }) => (
    <div>
      <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label>
      {multiline ? (
        <textarea value={hero[name] || ""} onChange={(e) => setHero({ ...hero, [name]: e.target.value })} rows={3} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm focus:border-[#B8972E] focus:outline-none resize-none bg-white" />
      ) : (
        <input value={hero[name] || ""} onChange={(e) => setHero({ ...hero, [name]: e.target.value })} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm focus:border-[#B8972E] focus:outline-none bg-white" />
      )}
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div><h2 className="font-display text-xl text-[#1A1A1A] mb-1">Hero Section</h2><p className="text-sm text-[#6B6B6B]">Manage homepage hero content.</p></div>
        <button onClick={save} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-6 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2"><Save size={14} />{saved ? "Saved ✓" : "Save Changes"}</button>
      </div>
      <div className="space-y-6">
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-6 space-y-4">
          <h3 className="font-semibold text-sm text-[#1A1A1A]">Text Content</h3>
          <Field label="Heading Line 1" name="heading_line1" />
          <Field label="Heading Line 2 (Gold Italic)" name="heading_line2" />
          <Field label="Heading Line 3" name="heading_line3" />
          <Field label="Subheading" name="subheading" multiline />
        </div>
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-6 space-y-4">
          <h3 className="font-semibold text-sm text-[#1A1A1A]">CTA Buttons</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary Button Text" name="cta_primary_text" />
            <Field label="Primary Button Link" name="cta_primary_link" />
            <Field label="Secondary Button Text" name="cta_secondary_text" />
            <Field label="Secondary Button Link" name="cta_secondary_link" />
          </div>
        </div>
        <div className="bg-[#0D0D0D] rounded-sm p-8 text-white">
          <p className="text-[0.65rem] tracking-widest uppercase text-white/30 mb-4">Preview</p>
          <div className="font-display text-3xl text-white leading-tight">{hero.heading_line1}</div>
          <div className="font-display text-3xl italic text-[#D4AF37] leading-tight">{hero.heading_line2}</div>
          <div className="font-display text-3xl text-white leading-tight mb-4">{hero.heading_line3}</div>
          <p className="text-white/60 text-sm max-w-md mb-5">{hero.subheading}</p>
          <div className="flex gap-3">
            <span className="bg-[#B8972E] text-white text-xs px-5 py-2.5 rounded-sm font-semibold">{hero.cta_primary_text}</span>
            <span className="border border-white/40 text-white text-xs px-5 py-2.5 rounded-sm font-semibold">{hero.cta_secondary_text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
