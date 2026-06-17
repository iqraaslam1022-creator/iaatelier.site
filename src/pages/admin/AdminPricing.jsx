import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, Star } from "lucide-react";
import { base44 } from "@/api/base44Client";

const EMPTY = { name: "", original_price: 0, discount_price: 0, features: [], cta_text: "Get Started", cta_link: "/contact", is_featured: false, order: 0 };

export default function AdminPricing() {
  const [packages, setPackages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [featInput, setFeatInput] = useState("");

  const load = () => base44.entities.PricingPackage.list("order").then(setPackages);
  useEffect(() => { load(); }, []);

  const openEdit = (p) => { setEditing(p.id); setForm({ ...EMPTY, ...p, features: p.features || [] }); setFeatInput(""); };
  const openNew = () => { setEditing("new"); setForm({ ...EMPTY, order: packages.length + 1 }); setFeatInput(""); };
  const closeEdit = () => { setEditing(null); };

  const save = async () => {
    setSaving(true);
    if (editing === "new") await base44.entities.PricingPackage.create(form);
    else await base44.entities.PricingPackage.update(editing, form);
    await load(); setSaving(false); closeEdit();
  };

  const del = async (id) => {
    if (!confirm("Delete this package?")) return;
    await base44.entities.PricingPackage.delete(id); await load();
  };

  const addFeature = () => {
    if (!featInput.trim()) return;
    setForm((f) => ({ ...f, features: [...(f.features || []), featInput.trim()] }));
    setFeatInput("");
  };

  const discount = form.original_price && form.discount_price
    ? Math.round((1 - form.discount_price / form.original_price) * 100) : 0;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-xl text-[#1A1A1A] mb-1">Pricing Packages</h2>
          <p className="text-sm text-[#6B6B6B]">{packages.length} packages · Displayed on homepage pricing section.</p>
        </div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2">
          <Plus size={14} /> Add Package
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Package" : "Edit Package"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B]" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Package Name</label>
              <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
            </div>
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Order</label>
              <input type="number" value={form.order || 0} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })}
                className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
            </div>
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
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Discounted Price ($)</label>
                <input type="number" value={form.discount_price || 0} onChange={(e) => setForm({ ...form, discount_price: parseFloat(e.target.value) })}
                  className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none bg-white" />
              </div>
              <div>
                <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Discount %</label>
                <div className="border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm bg-[#F5F5F0] text-[#B8972E] font-bold">{discount}%</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">CTA Button Text</label>
              <input value={form.cta_text || ""} onChange={(e) => setForm({ ...form, cta_text: e.target.value })}
                className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
            </div>
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">CTA Link</label>
              <input value={form.cta_link || ""} onChange={(e) => setForm({ ...form, cta_link: e.target.value })}
                className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.is_featured || false} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="w-4 h-4 accent-[#B8972E]" />
              <span className="text-sm font-medium text-[#1A1A1A]">Mark as Featured / Most Popular</span>
            </label>
          </div>

          <div className="mb-5">
            <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Features</label>
            <div className="flex gap-2 mb-2">
              <input value={featInput} onChange={(e) => setFeatInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); }}}
                placeholder="Add feature..." className="flex-1 border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
              <button onClick={addFeature} className="bg-[#1A1A1A] text-white px-4 rounded-sm text-sm hover:bg-[#B8972E] transition-colors">Add</button>
            </div>
            <div className="space-y-1.5">
              {(form.features || []).map((f, i) => (
                <div key={i} className="flex items-center justify-between bg-[#F5F5F0] px-3 py-2 rounded-sm text-sm">
                  <span className="text-[#1A1A1A]">{f}</span>
                  <button onClick={() => setForm((frm) => ({ ...frm, features: frm.features.filter((_, idx) => idx !== i) }))}><X size={13} className="text-[#6B6B6B] hover:text-red-500" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold flex items-center gap-2 hover:bg-[#9A7A22] transition-all">
              <Save size={13} />{saving ? "Saving..." : "Save"}
            </button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {packages.map((pkg) => {
          const d = pkg.discount_price && pkg.original_price ? Math.round((1 - pkg.discount_price / pkg.original_price) * 100) : 0;
          return (
            <div key={pkg.id} className={`bg-white border rounded-sm p-6 group hover:border-[#B8972E]/30 transition-all relative ${pkg.is_featured ? "border-[#B8972E]" : "border-[#E8E8E4]"}`}>
              {pkg.is_featured && <div className="absolute top-3 right-14 text-[0.6rem] tracking-widest uppercase font-bold text-[#B8972E] flex items-center gap-1"><Star size={10} />Featured</div>}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[0.68rem] tracking-widest uppercase text-[#B8972E] font-semibold mb-1">{pkg.name}</div>
                  <div className="flex items-center gap-2">
                    {pkg.discount_price ? (
                      <><span className="text-sm line-through text-[#6B6B6B]">${pkg.original_price?.toLocaleString()}</span><span className="font-display text-xl text-[#1A1A1A] font-bold">${pkg.discount_price?.toLocaleString()}</span>{d > 0 && <span className="text-[0.6rem] bg-[#B8972E] text-white px-2 py-0.5 rounded-sm font-bold">-{d}%</span>}</>
                    ) : <span className="font-display text-xl text-[#1A1A1A] font-bold">${pkg.original_price?.toLocaleString()}</span>}
                  </div>
                </div>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(pkg)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-[#B8972E] transition-all"><Pencil size={12} /></button>
                  <button onClick={() => del(pkg.id)} className="w-7 h-7 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:text-red-500 transition-all"><Trash2 size={12} /></button>
                </div>
              </div>
              <div className="text-xs text-[#6B6B6B]">{(pkg.features || []).length} features · {pkg.cta_text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
