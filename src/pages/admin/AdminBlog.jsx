import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Upload, Eye, EyeOff } from "lucide-react";
import { base44 } from "@/api/base44Client";

const CATEGORIES = ["Web Design", "Development", "SEO", "Ecommerce", "Strategy"];
const EMPTY = {
  title: "", slug: "", excerpt: "", content: "", featured_image: "", banner_image: "",
  category: "Web Design", tags: [], author_name: "", read_time: "5 min read",
  seo_title: "", seo_description: "", keywords: "", published: true, published_date: new Date().toISOString().split("T")[0]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function AdminBlog() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tab, setTab] = useState("content");

  const load = () => base44.entities.BlogPost.list("-published_date").then(setPosts);
  useEffect(() => { load(); }, []);

  const openEdit = (p) => { setEditing(p.id); setForm({ ...EMPTY, ...p, tags: p.tags || [] }); setTagInput(""); setTab("content"); };
  const openNew = () => { setEditing("new"); setForm(EMPTY); setTagInput(""); setTab("content"); };
  const closeEdit = () => { setEditing(null); };

  const save = async () => {
    setSaving(true);
    const data = { ...form, slug: form.slug || slugify(form.title) };
    if (editing === "new") await base44.entities.BlogPost.create(data);
    else await base44.entities.BlogPost.update(editing, data);
    await load(); setSaving(false); closeEdit();
  };

  const del = async (id) => {
    if (!confirm("Delete this post?")) return;
    await base44.entities.BlogPost.delete(id); await load();
  };

  const uploadFile = async (e, field) => {
    const file = e.target.files[0]; if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm((f) => ({ ...f, [field]: file_url }));
    setUploading(false);
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setForm((f) => ({ ...f, tags: [...(f.tags || []), tagInput.trim()] }));
    setTagInput("");
  };

  const Field = ({ label, name, type = "text", multiline = false, rows = 3 }) => (
    <div>
      <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label>
      {multiline ? (
        <textarea value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} rows={rows}
          className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none font-mono" />
      ) : (
        <input type={type} value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
      )}
    </div>
  );

  const UploadField = ({ label, name }) => (
    <div>
      <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label>
      <div className="flex gap-2">
        <input value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder="https://..."
          className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
        <label className="cursor-pointer flex items-center gap-2 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm text-[#6B6B6B] hover:border-[#B8972E]/40 transition-all whitespace-nowrap">
          <Upload size={13} className="text-[#B8972E]" />{uploading ? "..." : "Upload"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadFile(e, name)} />
        </label>
      </div>
      {form[name] && <img src={form[name]} alt="" className="mt-2 h-20 object-cover rounded-sm border border-[#E8E8E4]" />}
    </div>
  );

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-xl text-[#1A1A1A] mb-1">Blog Posts</h2>
          <p className="text-sm text-[#6B6B6B]">{posts.length} posts · Each post has its own page with SEO.</p>
        </div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2">
          <Plus size={14} /> New Post
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#E8E8E4]">
            <div className="flex gap-1">
              {["content", "images", "seo"].map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold rounded-sm transition-all ${tab === t ? "bg-[#1A1A1A] text-white" : "text-[#6B6B6B] hover:text-[#1A1A1A]"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#B8972E]" />
                <span className="text-[#6B6B6B]">Published</span>
              </label>
              <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
            </div>
          </div>

          <div className="p-7 space-y-5">
            {tab === "content" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Title" name="title" />
                  <div>
                    <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Slug (URL)</label>
                    <div className="flex gap-2">
                      <input value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                        className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
                      <button onClick={() => setForm({ ...form, slug: slugify(form.title) })}
                        className="border border-[#E8E8E4] px-3 rounded-sm text-xs text-[#6B6B6B] hover:border-[#B8972E]/40 hover:text-[#B8972E] transition-all whitespace-nowrap">
                        Auto
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none">
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <Field label="Author Name" name="author_name" />
                  <Field label="Read Time" name="read_time" />
                </div>
                <Field label="Excerpt" name="excerpt" multiline rows={2} />
                <Field label="Content (Markdown)" name="content" multiline rows={14} />
                <div>
                  <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); }}}
                      placeholder="Add tag..." className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
                    <button onClick={addTag} className="bg-[#1A1A1A] text-white px-4 rounded-sm text-sm hover:bg-[#B8972E] transition-colors">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(form.tags || []).map((t, i) => (
                      <span key={i} className="flex items-center gap-1.5 bg-[#F5F5F0] text-xs px-3 py-1.5 rounded-sm">
                        {t}<button onClick={() => setForm((f) => ({ ...f, tags: f.tags.filter((_, idx) => idx !== i) }))}><X size={11} /></button>
                      </span>
                    ))}
                  </div>
                </div>
                <Field label="Published Date" name="published_date" type="date" />
              </>
            )}

            {tab === "images" && (
              <>
                <UploadField label="Featured Image (used in blog listing)" name="featured_image" />
                <UploadField label="Banner Image (used at top of blog post page)" name="banner_image" />
              </>
            )}

            {tab === "seo" && (
              <>
                <Field label="SEO Title" name="seo_title" />
                <Field label="SEO Description" name="seo_description" multiline rows={2} />
                <Field label="Keywords (comma separated)" name="keywords" />
              </>
            )}
          </div>

          <div className="flex gap-3 p-5 border-t border-[#E8E8E4]">
            <button onClick={save} disabled={saving} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2 hover:bg-[#9A7A22] transition-all">
              <Save size={13} />{saving ? "Saving..." : "Save Post"}
            </button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-[#E8E8E4] rounded-sm p-5 flex items-center gap-4 group hover:border-[#B8972E]/30 transition-all">
            {post.featured_image && <img src={post.featured_image} alt={post.title} className="w-16 h-12 object-cover rounded-sm flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-0.5">
                <span className="text-[0.62rem] tracking-widest uppercase text-[#B8972E] font-semibold">{post.category}</span>
                <span className={`text-[0.6rem] px-2 py-0.5 rounded-full font-semibold ${post.published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-[#1A1A1A] truncate">{post.title}</h3>
              <p className="text-xs text-[#6B6B6B]">{post.author_name} · {post.published_date}</p>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(post)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] transition-all"><Pencil size={12} /></button>
              <button onClick={() => del(post.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500 transition-all"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
