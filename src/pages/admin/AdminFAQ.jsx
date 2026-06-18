 import React, { useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

const INITIAL = [
  { id: 1, question: "What is your typical project timeline?", answer: "Most projects are completed within 2–4 weeks depending on complexity. Rush delivery is available upon request.", order: 1 },
  { id: 2, question: "Do you offer revisions?", answer: "Yes! All packages include multiple revision rounds to ensure you're completely satisfied with the final result.", order: 2 },
  { id: 3, question: "What technologies do you use?", answer: "I work with React, Next.js, Shopify, WordPress, and modern CSS frameworks to build fast, scalable websites.", order: 3 },
  { id: 4, question: "Do you provide ongoing maintenance?", answer: "Yes, I offer monthly maintenance packages to keep your website updated, secure, and performing at its best.", order: 4 },
  { id: 5, question: "Can you redesign my existing website?", answer: "Absolutely. I specialize in transforming outdated websites into modern, high-converting digital experiences.", order: 5 },
];

const EMPTY = { question: "", answer: "", order: 0 };

export default function AdminFAQ() {
  const [items, setItems] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openEdit = (f) => { setEditing(f.id); setForm({ ...f }); };
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
        <div><h2 className="font-display text-xl text-[#1A1A1A] mb-1">FAQ</h2><p className="text-sm text-[#6B6B6B]">{items.length} questions</p></div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2"><Plus size={14} /> Add FAQ</button>
      </div>
      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New FAQ" : "Edit FAQ"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>
          <div className="space-y-4 mb-5">
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Question</label>
              <input value={form.question || ""} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
            </div>
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Answer</label>
              <textarea value={form.answer || ""} onChange={(e) => setForm({ ...form, answer: e.target.value })} rows={4} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2"><Save size={13} />Save</button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-[#E8E8E4] rounded-sm p-5 group hover:border-[#B8972E]/30 transition-all">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-sm text-[#1A1A1A] mb-1">Q: {item.question}</p>
                <p className="text-xs text-[#6B6B6B] line-clamp-2">A: {item.answer}</p>
              </div>
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(item)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E]"><Pencil size={12} /></button>
                <button onClick={() => del(item.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500"><Trash2 size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

