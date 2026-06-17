import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Upload, ExternalLink } from "lucide-react";
import { base44 } from "@/api/base44Client";

const EMPTY = { title: "", description: "", category: "Web Design", featured_image: "", live_url: "", client_name: "", completion_date: "", original_price: 0, discount_percentage: 0, technologies: [], order: 0 };

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [techInput, setTechInput] = useState("");

  const load = () => base44.entities.PortfolioProject.list("order").then(setProjects);
  useEffect(() => { load(); }, []);

  const openEdit = (p) => { setEditing(p.id); setForm({ ...EMPTY, ...p, technologies: p.technologies || [] }); setTechInput(""); };
  const openNew = () => { setEditing("new"); setForm({ ...EMPTY, order: projects.length + 1 }); setTechInput(""); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY); };

  const save = async () => {
    setSaving(true);
    if (editing === "new") await base44.entities.PortfolioProject.create(form);
    else await base44.entities.PortfolioProject.update(editing, form);
    await load(); setSaving(false); closeEdit();
  };

  const del = async (id) => {
    if (!confirm("Delete this project?")) return;
    await base44.entities.PortfolioProject.delete(id); await load();
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm((f) => ({ ...f, featured_image: file_url }));
    setUploading(false);
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    setForm((f) => ({ ...f, technologies: [...(f.technologies || []), techInput.trim()] }));
    setTechInput("");
  };

  const discountedPrice = form.discount_percentage > 0 && form.original_price
    ? Math.round(form.original_price * (1 - form.discount_percentage / 100)) : null;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-xl text-[#1A1A1A] mb-1">Portfolio Projects</h2>
          <p className="text-sm text-[#6B6B6B]">{projects.length} projects · Includes pricing management.</p>
        </div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2">
          <Plus size={14} /> Add Project
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Project" : "Edit Project"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B] hover:text-[#1A1A1A]" /></button>
          </div>

          {/* Image */}
          <div className="mb-5">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Featured Image</label>
            <div className="flex gap-3 items-start">
              <input value={form.featured_image || ""} onChange={(e) => setForm({ ...form, featured_image: e.target.value })} placeholder="https://..."
                className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
              <label className="cursor-pointer flex items-center gap-2 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm text-[#6B6B6B] hover:border-[#B8972E]/40 transition-all whitespace-nowrap">
                <Upload size={13} className="text-[#B8972E]" />
                {uploading ? "Uploading..." : "Upload"}
                <input type="file" accept="image/*" className="hidden" onChange={uploadImage} />
              </label>
            </div>
            {form.featured_image && <img src={form.featured_image} alt="" className="mt-3 h-28 object-cover rounded-sm border border-[#E8E8E4]" />}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {[["Title", "title"], ["Category", "category"], ["Client Name", "client_name"], ["Completion Date", "completion_date"], ["Live URL", "live_url"]].map(([label, name]) => (
              <div key={name} className={name === "live_url" ? "col-span-2" : ""}>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label>
                <input value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Description</label>
            <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none" />
          </div>

          {/* Pricing */}
          <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-sm p-5 mb-4">
            <h4 className="text-xs tracking-widest uppercase font-semibold text-[#1A1A1A] mb-4">Pricing</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Original Price ($)</label>
                <input type="number" value={form.original_price || 0} onChange={(e) => setForm({ ...form, original_price: parseFloat(e.target.value) })}
                  className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none bg-white" />
              </div>
              <div>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Discount (%)</label>
                <input type="number" min="0" max="100" value={form.discount_percentage || 0} onChange={(e) => setForm({ ...form, discount_percentage: parseFloat(e.target.value) })}
                  className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none bg-white" />
              </div>
              <div>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Final Price</label>
                <div className="border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm bg-[#F5F5F0] text-[#B8972E] font-bold font-display">
                  ${discountedPrice ? discountedPrice.toLocaleString() : (form.original_price || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-5">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); }}}
                placeholder="e.g. React, Tailwind CSS..." className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
              <button onClick={addTech} className="bg-[#1A1A1A] text-white px-4 rounded-sm text-sm hover:bg-[#B8972E] transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(form.technologies || []).map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-[#F5F5F0] text-xs px-3 py-1.5 rounded-sm text-[#1A1A1A]">
                  {t}<button onClick={() => setForm((f) => ({ ...f, technologies: f.technologies.filter((_, idx) => idx !== i) }))}><X size={11} className="text-[#6B6B6B]" /></button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={save} disabled={saving}
              className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold hover:bg-[#9A7A22] transition-all flex items-center gap-2">
              <Save size={13} />{saving ? "Saving..." : "Save"}
            </button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold hover:bg-[#E8E8E4] transition-all">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((proj) => {
          const dp = proj.discount_percentage > 0 ? Math.round(proj.original_price * (1 - proj.discount_percentage / 100)) : null;
          return (
            <div key={proj.id} className="bg-white border border-[#E8E8E4] rounded-sm overflow-hidden group hover:border-[#B8972E]/30 transition-all">
              {proj.featured_image && <img src={proj.featured_image} alt={proj.title} className="w-full h-36 object-cover" />}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-[0.62rem] tracking-widest uppercase text-[#B8972E] font-semibold">{proj.category}</span>
                    <h3 className="font-semibold text-sm text-[#1A1A1A] mt-0.5">{proj.title}</h3>
                  </div>
                  <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(proj)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] transition-all"><Pencil size={12} /></button>
                    <button onClick={() => del(proj.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500 transition-all"><Trash2 size={12} /></button>
                  </div>
                </div>
                {proj.original_price > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    {dp ? (
                      <><span className="text-xs line-through text-[#6B6B6B]">${proj.original_price.toLocaleString()}</span><span className="text-sm text-[#B8972E] font-bold font-display">${dp.toLocaleString()}</span><span className="text-[0.6rem] bg-[#B8972E] text-white px-2 py-0.5 rounded-sm font-bold">-{proj.discount_percentage}%</span></>
                    ) : <span className="text-sm text-[#1A1A1A] font-bold font-display">${proj.original_price.toLocaleString()}</span>}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
