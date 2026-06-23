import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

const EMPTY = { title: "", description: "", image_url: "", live_url: "", technologies: [] };

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [techInput, setTechInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) console.error(error.message);
    else setProjects(data || []);
  };

  const openEdit = (p) => { setEditing(p.id); setForm({ ...EMPTY, ...p, technologies: p.technologies || [] }); setTechInput(""); };
  const openNew = () => { setEditing("new"); setForm(EMPTY); setTechInput(""); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY); };

  const save = async () => {
    setLoading(true);
    const payload = {
      title: form.title,
      description: form.description,
      image_url: form.image_url,
      live_url: form.live_url,
      technologies: form.technologies,
    };

    if (editing === "new") {
      const { error } = await supabase.from("portfolio").insert([payload]);
      if (error) { alert("Error: " + error.message); setLoading(false); return; }
    } else {
      const { error } = await supabase.from("portfolio").update(payload).eq("id", editing);
      if (error) { alert("Error: " + error.message); setLoading(false); return; }
    }

    await fetchProjects();
    closeEdit();
    setLoading(false);
  };

  const del = async (id) => {
    if (!confirm("Is project ko delete karna chahte ho?")) return;
    const { error } = await supabase.from("portfolio").delete().eq("id", id);
    if (error) alert("Error: " + error.message);
    else setProjects(projects.filter(p => p.id !== id));
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    setForm(f => ({ ...f, technologies: [...(f.technologies || []), techInput.trim()] }));
    setTechInput("");
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-xl text-[#1A1A1A] mb-1">Portfolio Projects</h2>
          <p className="text-sm text-[#6B6B6B]">{projects.length} projects</p>
        </div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2">
          <Plus size={14} /> Add Project
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Project" : "Edit Project"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>
          <div className="space-y-4 mb-4">
            {[["Title", "title"], ["Image URL", "image_url"], ["Live URL", "live_url"]].map(([label, name]) => (
              <div key={name}>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label>
                <input
                  value={form[name] || ""}
                  onChange={(e) => setForm({ ...form, [name]: e.target.value })}
                  className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none"
                />
              </div>
            ))}
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Description</label>
              <textarea
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Technologies</label>
              <div className="flex gap-2 mb-2">
                <input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } }}
                  placeholder="e.g. React..."
                  className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none"
                />
                <button onClick={addTech} className="bg-[#1A1A1A] text-white px-4 rounded-sm text-sm hover:bg-[#B8972E] transition-colors">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(form.technologies || []).map((tech, i) => (
                  <span key={i} className="flex items-center gap-1.5 bg-[#F5F5F0] text-xs px-3 py-1.5 rounded-sm">
                    {tech}
                    <button onClick={() => setForm(f => ({ ...f, technologies: f.technologies.filter((_, idx) => idx !== i) }))}><X size={11} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Image preview */}
            {form.image_url && (
              <div>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Preview</label>
                <img src={form.image_url} alt="preview" className="w-full h-40 object-cover rounded-sm border border-[#E8E8E4]" />
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={loading}
              className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2 disabled:opacity-60"
            >
              <Save size={13} />{loading ? "Saving..." : "Save"}
            </button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}

      {projects.length === 0 ? (
        <p className="text-[#6B6B6B] text-center py-16 text-sm">Koi project nahi hai. "Add Project" se shuru karo.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white border border-[#E8E8E4] rounded-sm overflow-hidden group hover:border-[#B8972E]/30 transition-all">
              {proj.image_url && <img src={proj.image_url} alt={proj.title} className="w-full h-36 object-cover" />}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-[#1A1A1A] mb-1">{proj.title}</h3>
                    <p className="text-xs text-[#6B6B6B] line-clamp-2">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="text-[0.58rem] tracking-widest uppercase text-[#B8972E] bg-[#F5F5F0] px-2 py-0.5 rounded-sm">{tech}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1.5 ml-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button onClick={() => openEdit(proj)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E]"><Pencil size={12} /></button>
                    <button onClick={() => del(proj.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500"><Trash2 size={12} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}