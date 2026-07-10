import React, { useState } from "react";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

const CATEGORIES = ["Web Design", "Development", "SEO", "Ecommerce", "Strategy"];
const EMPTY = { title: "", slug: "", excerpt: "", content: "", featured_image: "", category: "Web Design", author_name: "Iqra Aslam", read_time: "5 min read", published: true, published_date: new Date().toISOString().split("T")[0], tags: [] };

const INITIAL = [
  { id: 1, title: "Why Premium Web Design Is Your Best Investment in 2024", slug: "why-premium-web-design-matters", excerpt: "In a crowded digital marketplace, your website is often the first impression.", category: "Web Design", featured_image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80", read_time: "5 min read", published: true, published_date: "2024-03-15", author_name: "Iqra Aslam", tags: [] },
  { id: 2, title: "10 SEO Strategies That Actually Work in 2024", slug: "seo-strategies-2024", excerpt: "Search engine optimization has evolved dramatically.", category: "SEO", featured_image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=800&q=80", read_time: "7 min read", published: true, published_date: "2024-02-28", author_name: "Iqra Aslam", tags: [] },
];

function slugify(text) { return text.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").trim(); }

export default function AdminBlog() {
  const [posts, setPosts] = useState(INITIAL);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const openEdit = (p) => { setEditing(p.id); setForm({ ...EMPTY, ...p }); };
  const openNew = () => { setEditing("new"); setForm(EMPTY); };
  const closeEdit = () => { setEditing(null); };

  const save = () => {
    const data = { ...form, slug: form.slug || slugify(form.title) };
    if (editing === "new") setPosts([...posts, { ...data, id: Date.now() }]);
    else setPosts(posts.map(p => p.id === editing ? { ...data, id: editing } : p));
    closeEdit();
  };

  const del = (id) => { if (!confirm("Delete?")) return; setPosts(posts.filter(p => p.id !== id)); };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div><h2 className="font-display text-xl text-[#1A1A1A] mb-1">Blog Posts</h2><p className="text-sm text-[#6B6B6B]">{posts.length} posts</p></div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2"><Plus size={14} /> New Post</button>
      </div>
      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Post" : "Edit Post"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>
          <div className="space-y-4">
            {[["Title", "title"], ["Featured Image URL", "featured_image"], ["Author Name", "author_name"], ["Read Time", "read_time"], ["Published Date", "published_date"]].map(([label, name]) => (
              <div key={name}><label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">{label}</label><input value={form[name] || ""} onChange={(e) => setForm({ ...form, [name]: e.target.value })} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" /></div>
            ))}
            <div><label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none">{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Excerpt</label><textarea value={form.excerpt || ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none" /></div>
            <div><label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Content</label><textarea value={form.content || ""} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none resize-none font-mono" /></div>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="accent-[#B8972E]" /><span className="text-sm text-[#6B6B6B]">Published</span></label>
          </div>
          <div className="flex gap-3 mt-5">
            <button onClick={save} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2"><Save size={13} />Save</button>
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
                <span className={`text-[0.6rem] px-2 py-0.5 rounded-full font-semibold ${post.published ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{post.published ? "Published" : "Draft"}</span>
              </div>
              <h3 className="font-semibold text-sm text-[#1A1A1A] truncate">{post.title}</h3>
              <p className="text-xs text-[#6B6B6B]">{post.author_name} · {post.published_date}</p>
            </div>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(post)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E]"><Pencil size={12} /></button>
              <button onClick={() => del(post.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

