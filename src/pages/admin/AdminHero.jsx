import React, { useEffect, useState } from "react";
import { Save, Upload, Eye, EyeOff } from "lucide-react";
import { base44 } from "@/api/base44Client";

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
  const [heroId, setHeroId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    base44.entities.HeroContent.list().then((d) => {
      if (d[0]) { setHero(d[0]); setHeroId(d[0].id); }
    });
  }, []);

  const save = async () => {
    setSaving(true);
    if (heroId) {
      await base44.entities.HeroContent.update(heroId, hero);
    } else {
      const created = await base44.entities.HeroContent.create(hero);
      setHeroId(created.id);
    }
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const uploadFile = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setHero((h) => ({ ...h, [field]: file_url }));
    setUploading(false);
  };

  const Field = ({ label, name, type = "text", multiline = false }) => (
    <div>
      <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label>
      {multiline ? (
        <textarea value={hero[name] || ""} onChange={(e) => setHero({ ...hero, [name]: e.target.value })} rows={3}
          className="w-full border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#B8972E] focus:outline-none resize-none bg-white" />
      ) : (
        <input type={type} value={hero[name] || ""} onChange={(e) => setHero({ ...hero, [name]: e.target.value })}
          className="w-full border border-[#E8E8E4] rounded-sm px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#B8972E] focus:outline-none bg-white" />
      )}
    </div>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-xl text-[#1A1A1A] mb-1">Hero Section</h2>
          <p className="text-sm text-[#6B6B6B]">Manage the homepage hero content and media.</p>
        </div>
        <button onClick={save} disabled={saving}
          className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-6 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2">
          <Save size={14} />
          {saving ? "Saving..." : saved ? "Saved ✓" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Media Toggle */}
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-6">
          <h3 className="font-semibold text-sm text-[#1A1A1A] mb-4">Media Type</h3>
          <div className="flex gap-4">
            <button onClick={() => setHero({ ...hero, use_video: true })}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase font-semibold border transition-all ${hero.use_video ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#6B6B6B] border-[#E8E8E4]"}`}>
              <Eye size={13} /> Video
            </button>
            <button onClick={() => setHero({ ...hero, use_video: false })}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase font-semibold border transition-all ${!hero.use_video ? "bg-[#1A1A1A] text-white border-[#1A1A1A]" : "bg-white text-[#6B6B6B] border-[#E8E8E4]"}`}>
              <EyeOff size={13} /> Image
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-6 space-y-4">
          <h3 className="font-semibold text-sm text-[#1A1A1A]">Hero Video</h3>
          <Field label="Video URL" name="video_url" />
          <div>
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Upload New Video</label>
            <label className="cursor-pointer inline-flex items-center gap-2 border border-[#E8E8E4] rounded-sm px-5 py-3 text-sm text-[#6B6B6B] hover:border-[#B8972E]/40 transition-all">
              <Upload size={14} className="text-[#B8972E]" />
              {uploading ? "Uploading..." : "Choose Video File"}
              <input type="file" accept="video/*" className="hidden" onChange={(e) => uploadFile(e, "video_url")} />
            </label>
          </div>
          {hero.video_url && (
            <video src={hero.video_url} muted className="w-full h-32 object-cover rounded-sm border border-[#E8E8E4]" />
          )}
        </div>

        {/* Background Image */}
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-6 space-y-4">
          <h3 className="font-semibold text-sm text-[#1A1A1A]">Hero Background Image</h3>
          <Field label="Image URL" name="bg_image_url" />
          <div>
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Upload New Image</label>
            <label className="cursor-pointer inline-flex items-center gap-2 border border-[#E8E8E4] rounded-sm px-5 py-3 text-sm text-[#6B6B6B] hover:border-[#B8972E]/40 transition-all">
              <Upload size={14} className="text-[#B8972E]" />
              {uploading ? "Uploading..." : "Choose Image File"}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadFile(e, "bg_image_url")} />
            </label>
          </div>
          {hero.bg_image_url && <img src={hero.bg_image_url} alt="preview" className="w-full h-32 object-cover rounded-sm border border-[#E8E8E4]" />}
        </div>

        {/* Text Content */}
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-6 space-y-5">
          <h3 className="font-semibold text-sm text-[#1A1A1A]">Text Content</h3>
          <Field label="Heading Line 1" name="heading_line1" />
          <Field label="Heading Line 2 (Gold Italic)" name="heading_line2" />
          <Field label="Heading Line 3" name="heading_line3" />
          <Field label="Subheading" name="subheading" multiline />
        </div>

        {/* CTAs */}
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-6 space-y-5">
          <h3 className="font-semibold text-sm text-[#1A1A1A]">CTA Buttons</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Primary Button Text" name="cta_primary_text" />
            <Field label="Primary Button Link" name="cta_primary_link" />
            <Field label="Secondary Button Text" name="cta_secondary_text" />
            <Field label="Secondary Button Link" name="cta_secondary_link" />
          </div>
        </div>

        {/* Preview */}
        <div className="bg-[#0D0D0D] rounded-sm p-8 text-white">
          <p className="text-[0.65rem] tracking-widest uppercase text-white/30 mb-4">Preview</p>
          <div className="font-display text-3xl text-white leading-tight">{hero.heading_line1}</div>
          <div className="font-display text-3xl italic text-[#D4AF37] leading-tight">{hero.heading_line2}</div>
          <div className="font-display text-3xl text-white leading-tight mb-4">{hero.heading_line3}</div>
          <p className="text-white/60 text-sm max-w-md mb-5">{hero.subheading}</p>
          <div className="flex gap-3 flex-wrap">
            <span className="bg-[#B8972E] text-white text-xs px-5 py-2.5 rounded-sm font-semibold">{hero.cta_primary_text}</span>
            <span className="border border-white/40 text-white text-xs px-5 py-2.5 rounded-sm font-semibold">{hero.cta_secondary_text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
