 import React, { useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Star } from "lucide-react";

const INITIAL = [
  { id: 1, client_name: "Sarah Mitchell", company_name: "CEO, Luxe Brands Co.", photo_url: "", rating: 5, review_text: "Iqra delivered a website that exceeded every expectation. The attention to detail, the animations, the overall experience — it felt like working with a world-class agency.", order: 1 },
  { id: 2, client_name: "Ahmed Al-Rashid", company_name: "Founder, TechVenture Dubai", photo_url: "", rating: 5, review_text: "The portfolio website she built for us generated 3x more client inquiries within the first month. Truly exceptional work.", order: 2 },
  { id: 3, client_name: "Emma Thompson", company_name: "Marketing Director, StyleHouse", photo_url: "", rating: 5, review_text: "Our new Shopify store is absolutely stunning. Sales increased by 45% in the first quarter. Worth every penny.", order: 3 },
  { id: 4, client_name: "Marcus Chen", company_name: "Entrepreneur", photo_url: "", rating: 5, review_text: "Professional, precise, and passionate about her craft. Iqra understood our vision and translated it into a digital masterpiece.", order: 4 },
  { id: 5, client_name: "Fatima Al-Zahra", company_name: "Brand Strategist", photo_url: "", rating: 5, review_text: "The multilingual website she created works flawlessly in Arabic. RTL support was perfect. Highly recommended.", order: 5 },
];

const EMPTY = { client_name: "", company_name: "", photo_url: "", rating: 5, review_text: "", order: 0 };

export default function AdminTestimonials() {
  const [items, setItems] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openEdit = (t) => { setEditing(t.id); setForm({ ...EMPTY, ...t }); };
  const openNew = () => { setEditing("new"); setForm({ ...EMPTY, order: items.length + 1 }); };
  const closeEdit = () => { setEditing(null); };

  const save = () => {
    if (editing === "new") setItems([...items, { ...form, id: Date.now() }]);
    else setItems(items.map(i => i.id === editing ? { ...form, id: editing } : i));
    closeEdit();
  };

  const del = (id) => { if (!confirm("Delete?")) return; setItems(items.filter(i => i.id !== id)); };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div><h2 className="font-display text-xl text-[#1A1A1A] mb-1">Testimonials</h2><p className="text-sm text-[#6B6B6B]">{items.length} reviews</p></div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2"><Plus size={14} /> Add Testimonial</button>
      </div>
      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Testimonial" : "Edit Testimonial"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[["Client Name", "client_name"], ["Company Name", "company_name"]].map(([label, name]) => (
              <div key={name}><label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label><input value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" /></div>
            ))}
          </div>
          <div className="mb-4">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Rating</label>
            <div className="flex gap-2">{[1,2,3,4,5].map(r => (<button key={r} onClick={() => setForm({ ...form, rating: r })}><Star size={22} className={r <= form.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#E8E8E4]"} /></button>))}</div>
          </div>
          <div className="mb-5"><label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Review Text</label><textarea value={form.review_text || ""} onChange={(e) => setForm({ ...form, review_text: e.target.value })} rows={4} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none" /></div>
          <div className="flex gap-3">
            <button onClick={save} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2"><Save size={13} />Save</button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="bg-white border border-[#E8E8E4] rounded-sm p-5 flex items-start justify-between group hover:border-[#B8972E]/30 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5"><span className="font-semibold text-sm text-[#1A1A1A]">{t.client_name}</span>{t.company_name && <span className="text-xs text-[#B8972E]">· {t.company_name}</span>}</div>
              <div className="flex gap-0.5 mb-1">{[...Array(5)].map((_, i) => <Star key={i} size={11} className={i < t.rating ? "text-[#D4AF37] fill-[#D4AF37]" : "text-[#E8E8E4]"} />)}</div>
              <p className="text-xs text-[#6B6B6B] line-clamp-2">{t.review_text}</p>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
              <button onClick={() => openEdit(t)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E]"><Pencil size={12} /></button>
              <button onClick={() => del(t.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

