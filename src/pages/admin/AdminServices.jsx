import React, { useState } from "react";
import { Plus, Pencil, Trash2, Save, X, GripVertical, Monitor, Code, ShoppingCart, Search, Palette, LayoutDashboard, Store, Globe, Settings, Zap, Star, Heart } from "lucide-react";

const ICON_OPTIONS = ["Monitor", "Code", "ShoppingCart", "Search", "Palette", "LayoutDashboard", "Store", "Globe", "Settings", "Zap", "Star", "Heart"];
const ICON_MAP = { Monitor, Code, ShoppingCart, Search, Palette, LayoutDashboard, Store, Globe, Settings, Zap, Star, Heart };

const INITIAL_SERVICES = [
  { id: 1, num: "01", title: "Web Design", icon_name: "Monitor", description: "Breathtaking interfaces that captivate and convert visitors into loyal customers.", deliverables: ["UI Design", "Wireframes", "Prototypes", "Style Guide"], order: 1 },
  { id: 2, num: "02", title: "Web Development", icon_name: "Code", description: "High-performance websites built with cutting-edge technology and flawless code.", deliverables: ["React", "Next.js", "Tailwind CSS", "API Integration"], order: 2 },
  { id: 3, num: "03", title: "Ecommerce Development", icon_name: "ShoppingCart", description: "Revenue-driving online stores engineered for maximum conversions and seamless UX.", deliverables: ["Shopify", "WooCommerce", "Payment Gateway", "Inventory"], order: 3 },
  { id: 4, num: "04", title: "SEO Optimization", icon_name: "Search", description: "Dominate search rankings with data-driven strategies that deliver measurable results.", deliverables: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics"], order: 4 },
  { id: 5, num: "05", title: "UI/UX Design", icon_name: "Palette", description: "User-centric designs that create intuitive, delightful digital experiences.", deliverables: ["User Research", "Figma Design", "Usability Testing", "Design System"], order: 5 },
  { id: 6, num: "06", title: "Landing Pages", icon_name: "LayoutDashboard", description: "High-converting landing pages engineered to turn every visitor into a customer.", deliverables: ["A/B Testing", "CRO", "Copywriting", "Analytics"], order: 6 },
  { id: 7, num: "07", title: "Shopify Development", icon_name: "Store", description: "Premium Shopify stores that stand out and drive consistent revenue growth.", deliverables: ["Custom Theme", "App Integration", "Speed Optimization", "SEO"], order: 7 },
  { id: 8, num: "08", title: "WordPress Development", icon_name: "Globe", description: "Custom WordPress solutions combining flexibility with enterprise-grade performance.", deliverables: ["Custom Theme", "Plugin Development", "WooCommerce", "Security"], order: 8 },
  { id: 9, num: "09", title: "Website Maintenance", icon_name: "Settings", description: "Proactive care and optimization to keep your digital presence at peak performance.", deliverables: ["Updates", "Backups", "Security", "Performance Monitoring"], order: 9 },
];

const EMPTY = { num: "", title: "", description: "", icon_name: "Monitor", deliverables: [], order: 0 };

export default function AdminServices() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [delivInput, setDelivInput] = useState("");

  const openEdit = (svc) => { setEditing(svc.id); setForm({ ...svc, deliverables: svc.deliverables || [] }); setDelivInput(""); };
  const openNew = () => { setEditing("new"); setForm({ ...EMPTY, order: services.length + 1 }); setDelivInput(""); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY); };

  const save = () => {
    if (editing === "new") {
      setServices([...services, { ...form, id: Date.now() }]);
    } else {
      setServices(services.map(s => s.id === editing ? { ...form, id: editing } : s));
    }
    closeEdit();
  };

  const del = (id) => {
    if (!confirm("Delete this service?")) return;
    setServices(services.filter(s => s.id !== id));
  };

  const addDeliv = () => {
    if (!delivInput.trim()) return;
    setForm((f) => ({ ...f, deliverables: [...(f.deliverables || []), delivInput.trim()] }));
    setDelivInput("");
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-xl text-[#1A1A1A] mb-1">Services</h2>
          <p className="text-sm text-[#6B6B6B]">{services.length} services</p>
        </div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2">
          <Plus size={14} /> Add Service
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Service" : "Edit Service"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[["Number (e.g. 01)", "num"], ["Title", "title"]].map(([label, name]) => (
              <div key={name}>
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
          <div className="mb-4">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Icon</label>
            <select value={form.icon_name || "Monitor"} onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
              className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none">
              {ICON_OPTIONS.map((ico) => <option key={ico} value={ico}>{ico}</option>)}
            </select>
          </div>
          <div className="mb-5">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Deliverables</label>
            <div className="flex gap-2 mb-2">
              <input value={delivInput} onChange={(e) => setDelivInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addDeliv(); }}}
                placeholder="Add deliverable..." className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
              <button onClick={addDeliv} className="bg-[#1A1A1A] text-white px-4 rounded-sm text-sm hover:bg-[#B8972E] transition-colors">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(form.deliverables || []).map((d, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-[#F5F5F0] text-[#1A1A1A] text-xs px-3 py-1.5 rounded-sm">
                  {d}<button onClick={() => setForm((f) => ({ ...f, deliverables: f.deliverables.filter((_, idx) => idx !== i) }))}><X size={11} className="text-[#6B6B6B]" /></button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold hover:bg-[#9A7A22] transition-all flex items-center gap-2">
              <Save size={13} />Save
            </button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white border border-[#E8E8E4] rounded-sm p-5 flex items-center justify-between group hover:border-[#B8972E]/30 transition-all">
            <div className="flex items-center gap-4">
              <GripVertical size={16} className="text-[#E8E8E4]" />
              <div>
                <div className="flex items-center gap-3 mb-0.5">
                  <span className="text-[0.65rem] tracking-widest uppercase text-[#B8972E] font-semibold">{svc.num}</span>
                  <span className="font-semibold text-sm text-[#1A1A1A]">{svc.title}</span>
                </div>
                <p className="text-xs text-[#6B6B6B] line-clamp-1">{svc.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => openEdit(svc)} className="w-8 h-8 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] transition-all"><Pencil size={13} /></button>
              <button onClick={() => del(svc.id)} className="w-8 h-8 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500 transition-all"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); 
}
