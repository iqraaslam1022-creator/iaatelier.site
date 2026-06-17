import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Upload, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";

const EMPTY = { client_name: "", company_name: "", photo_url: "", rating: 5, review_text: "", order: 0 };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = () => base44.entities.Testimonial.list("order").then(setItems);
  useEffect(() => { load(); }, []);

  const openEdit = (t) => { setEditing(t.id); setForm({ ...EMPTY, ...t }); };
  const openNew = () => { setEditing("new"); setForm({ ...EMPTY, order: items.length + 1 }); };
  const closeEdit = () => { setEditing(null); };

  const save = async () => {
    setSaving(true);
    if (editing === "new") await base44.entities.Testimonial.create(form);
    else await base44.entities.Testimonial.update(editing, form);
    await load(); setSaving(false); closeEdit();
  };

  const del = async (id) => {
    if (!confirm("Delete?")) return;
    await base44.entities.Testimonial.delete(id); await load();
  };

  const uploadPhoto = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm((f) => ({ ...f, photo_url: file_url }));
    setUploading(false);
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-xl text-[#1A1A1A] mb-1">Testimonials</h2>
          <p className="text-sm text-[#6B6B6B]">{items.length} reviews · Displayed as carousel on homepage.</p>
        </div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2">
          <Plus size={14} /> Add Testimonial
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Testimonial" : "Edit Testimonial"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>

          {/* Photo */}
          <div className="flex items-center gap-4 mb-5">
            {form.photo_url && <img src={form.photo_url} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-[#B8972E]/30" />}
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Client Photo</label>
              <label className="cursor-pointer flex items-center gap-2 border border-[#E8E8E4] rounded-sm px-4 py-2 text-sm text-[#6B6B6B] hover:border-[#B8972E]/40 transition-all">
                <Upload size={13} className="text-[#B8972E]" />{uploading ? "Uploading..." : "Upload Photo"}
                <input type="file" accept="image/*" className="hidden" onChange={uploadPhoto} />
              </label>
              <input value={form.photo_url || ""} onChange={(e) => setForm({ ...form, photo_url: e.target.value })}
                placeholder="or paste URL..." className="mt-2 w-full border border-[#E8E8E4] rounded-sm px-4 py-2 text-sm focus:border-[#B8972E] focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {[["Client Name", "client_name"], ["Company Name", "company_name"]].map(([label, name]) => (
              <div key={name}>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label>
                <input value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} onClick={() => setForm({ ...form, rating: r })}>
                  <Star size={22} className={r <= form.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#E8E8E4]"} />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Review Text</label>
            <textarea value={form.review_text || ""} onChange={(e) => setForm({ ...form, review_text: e.target.value })} rows={4}
              className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none" />
          </div>

          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2 hover:bg-[#9A7A22] transition-all">
              <Save size={13} />{saving ? "Saving..." : "Save"}
            </button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="bg-white border border-[#E8E8E4] rounded-sm p-5 flex items-start justify-between group hover:border-[#B8972E]/30 transition-all">
            <div className="flex items-start gap-4">
              {t.photo_url && <img src={t.photo_url} alt={t.client_name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />}
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-sm text-[#1A1A1A]">{t.client_name}</span>
                  {t.company_name && <span className="text-xs text-[#B8972E]">· {t.company_name}</span>}
                </div>
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} className={i < t.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#E8E8E4]"} />)}
                </div>
                <p className="text-xs text-[#6B6B6B] line-clamp-2">{t.review_text}</p>
              </div>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
              <button onClick={() => openEdit(t)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] transition-all"><Pencil size={12} /></button>
              <button onClick={() => del(t.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500 transition-all"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
