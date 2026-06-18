 import React, { useState } from "react";
import { Plus, Pencil, Trash2, Save, X, ExternalLink } from "lucide-react";

const INITIAL = [
  { id: 1, title: "Luxury Watch Website Design", description: "A modern luxury watch website concept.", category: "Web Design", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f664fe3a7_rolex-herosection.png", live_url: "https://accomplished-apex-time-vault.base44.app/", original_price: 0, discount_percentage: 0, completion_date: "2024", technologies: ["React", "Tailwind CSS"], order: 1 },
  { id: 2, title: "Hafiz Builders | Premium Construction", description: "High-quality residential and commercial construction services.", category: "UI / UX", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/f1eb8f6d7_real-estate.png", live_url: "https://hafiz-build-elite.base44.app/", original_price: 0, discount_percentage: 0, completion_date: "2024", technologies: ["React", "GSAP"], order: 2 },
  { id: 3, title: "Hafiz Cuisine – Restaurant Management", description: "Modern restaurant management website.", category: "Ecommerce", featured_image: "https://base44.app/api/apps/6a2b674054d9bbcb910aeb3f/files/mp/public/6a2b674054d9bbcb910aeb3f/d2d3978cb_hafiz-cusine.png", live_url: "https://hafiz-luxury-dine.base44.app/", original_price: 0, discount_percentage: 0, completion_date: "2024", technologies: ["React", "Node.js"], order: 3 },
];

const EMPTY = { title: "", description: "", category: "Web Design", featured_image: "", live_url: "", original_price: 0, discount_percentage: 0, completion_date: "", technologies: [], order: 0 };

export default function AdminPortfolio() {
  const [projects, setProjects] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [techInput, setTechInput] = useState("");

  const openEdit = (p) => { setEditing(p.id); setForm({ ...EMPTY, ...p, technologies: p.technologies || [] }); setTechInput(""); };
  const openNew = () => { setEditing("new"); setForm({ ...EMPTY, order: projects.length + 1 }); setTechInput(""); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY); };

  const save = () => {
    if (editing === "new") setProjects([...projects, { ...form, id: Date.now() }]);
    else setProjects(projects.map(p => p.id === editing ? { ...form, id: editing } : p));
    closeEdit();
  };

  const del = (id) => { if (!confirm("Delete?")) return; setProjects(projects.filter(p => p.id !== id)); };
  const addTech = () => { if (!techInput.trim()) return; setForm(f => ({ ...f, technologies: [...(f.technologies || []), techInput.trim()] })); setTechInput(""); };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div><h2 className="font-display text-xl text-[#1A1A1A] mb-1">Portfolio Projects</h2><p className="text-sm text-[#6B6B6B]">{projects.length} projects</p></div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2"><Plus size={14} /> Add Project</button>
      </div>

      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Project" : "Edit Project"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>
          <div className="space-y-4 mb-4">
            {[["Title", "title"], ["Category", "category"], ["Featured Image URL", "featured_image"], ["Live URL", "live_url"], ["Completion Date", "completion_date"]].map(([label, name]) => (
              <div key={name}>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label>
                <input value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
              </div>
            ))}
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Description</label>
              <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none" />
            </div>
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Technologies</label>
              <div className="flex gap-2 mb-2">
                <input value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); }}} placeholder="e.g. React..." className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
                <button onClick={addTech} className="bg-[#1A1A1A] text-white px-4 rounded-sm text-sm hover:bg-[#B8972E]">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(form.technologies || []).map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 bg-[#F5F5F0] text-xs px-3 py-1.5 rounded-sm">{t}<button onClick={() => setForm(f => ({ ...f, technologies: f.technologies.filter((_, idx) => idx !== i) }))}><X size={11} /></button></span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2"><Save size={13} />Save</button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white border border-[#E8E8E4] rounded-sm overflow-hidden group hover:border-[#B8972E]/30 transition-all">
            {proj.featured_image && <img src={proj.featured_image} alt={proj.title} className="w-full h-36 object-cover" />}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-[0.62rem] tracking-widest uppercase text-[#B8972E] font-semibold">{proj.category}</span>
                  <h3 className="font-semibold text-sm text-[#1A1A1A] mt-0.5">{proj.title}</h3>
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(proj)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E]"><Pencil size={12} /></button>
                  <button onClick={() => del(proj.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500"><Trash2 size={12} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


 
        
           
            

      
