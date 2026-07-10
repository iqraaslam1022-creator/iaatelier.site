 import React, { useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

const INITIAL = [{ id: 1, name: "Iqra Aslam", role: "Web Designer & Developer", bio: "Premium web designer specializing in luxury digital experiences.", image_url: "", social_twitter: "", social_linkedin: "", social_instagram: "" }];
const EMPTY = { name: "", role: "", bio: "", image_url: "", social_twitter: "", social_linkedin: "", social_instagram: "" };

export default function AdminAuthors() {
  const [authors, setAuthors] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openEdit = (a) => { setEditing(a.id); setForm({ ...EMPTY, ...a }); };
  const openNew = () => { setEditing("new"); setForm(EMPTY); };
  const closeEdit = () => { setEditing(null); };

  const save = () => {
    if (editing === "new") setAuthors([...authors, { ...form, id: Date.now() }]);
    else setAuthors(authors.map(a => a.id === editing ? { ...form, id: editing } : a));
    closeEdit();
  };

  const del = (id) => { if (!confirm("Delete?")) return; setAuthors(authors.filter(a => a.id !== id)); };

  const Field = ({ label, name }) => (
    <div><label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label><input value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" /></div>
  );

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div><h2 className="font-display text-xl text-[#1A1A1A] mb-1">Authors</h2><p className="text-sm text-[#6B6B6B]">{authors.length} authors</p></div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2"><Plus size={14} /> Add Author</button>
      </div>
      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Author" : "Edit Author"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4"><Field label="Name" name="name" /><Field label="Role" name="role" /></div>
          <div className="mb-4"><label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Bio</label><textarea value={form.bio || ""} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none" /></div>
          <div className="grid grid-cols-3 gap-4 mb-5"><Field label="Twitter" name="social_twitter" /><Field label="LinkedIn" name="social_linkedin" /><Field label="Instagram" name="social_instagram" /></div>
          <div className="flex gap-3">
            <button onClick={save} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2"><Save size={13} />Save</button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {authors.map((a) => (
          <div key={a.id} className="bg-white border border-[#E8E8E4] rounded-sm p-5 flex items-center gap-4 group hover:border-[#B8972E]/30 transition-all">
            <div className="w-14 h-14 rounded-full bg-[#F5F5F0] flex items-center justify-center flex-shrink-0 text-[#1A1A1A] font-bold font-display">{a.name?.charAt(0)}</div>
            <div className="flex-1 min-w-0"><h3 className="font-semibold text-sm text-[#1A1A1A]">{a.name}</h3><p className="text-[0.68rem] tracking-widest uppercase text-[#B8972E]">{a.role}</p></div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(a)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E]"><Pencil size={12} /></button>
              <button onClick={() => del(a.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

