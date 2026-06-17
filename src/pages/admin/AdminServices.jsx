import React, { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, X, GripVertical } from "lucide-react";
import { base44 } from "@/api/base44Client";

const ICON_OPTIONS = ["Monitor", "Code", "ShoppingCart", "Search", "Palette", "LayoutDashboard", "Store", "Globe", "Settings", "Zap", "Star", "Heart"];

const EMPTY = { num: "", title: "", description: "", icon_name: "Monitor", deliverables: [], order: 0 };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [delivInput, setDelivInput] = useState("");

  const load = () => base44.entities.Service.list("order").then(setServices);
  useEffect(() => { load(); }, []);

  const openEdit = (svc) => { setEditing(svc.id); setForm({ ...svc, deliverables: svc.deliverables || [] }); setDelivInput(""); };
  const openNew = () => { setEditing("new"); setForm({ ...EMPTY, order: services.length + 1 }); setDelivInput(""); };
  const closeEdit = () => { setEditing(null); setForm(EMPTY); };

  const save = async () => {
    setSaving(true);
    if (editing === "new") {
      await base44.entities.Service.create(form);
    } else {
      await base44.entities.Service.update(editing, form);
    }
    await load();
    setSaving(false);
    closeEdit();
  };

  const del = async (id) => {
    if (!confirm("Delete this service?")) return;
    await base44.entities.Service.delete(id);
    await load();
  };

  const addDeliv = () => {
    if (!delivInput.trim()) return;
    setForm((f) => ({ ...f, deliverables: [...(f.deliverables || []), delivInput.trim()] }));
    setDelivInput("");
  };
  const removeDeliv = (i) => setForm((f) => ({ ...f, deliverables: f.deliverables.filter((_, idx) => idx !== i) }));

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-xl text-[#1A1A1A] mb-1">Services</h2>
          <p className="text-sm text-[#6B6B6B]">{services.length} services · changes reflect instantly on frontend.</p>
        </div>
        <button onClick={openNew} className="bg-[#1A1A1A] hover:bg-[#B8972E] text-white px-5 py-3 rounded-sm text-xs tracking-widest uppercase font-semibold transition-all flex items-center gap-2">
          <Plus size={14} /> Add Service
        </button>
      </div>

      {editing && (
        <div className="bg-white border border-[#E8E8E4] rounded-sm p-7 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-[#1A1A1A]">{editing === "new" ? "New Service" : "Edit Service"}</h3>
            <button onClick={closeEdit}><X size={18} className="text-[#6B6B6B] hover:text-[#1A1A1A]" /></button>
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
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Icon</label>
              <select value={form.icon_name || "Monitor"} onChange={(e) => setForm({ ...form, icon_name: e.target.value })}
                className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none">
                {ICON_OPTIONS.map((ico) => <option key={ico} value={ico}>{ico}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[0.68rem] tracking-[0.2em] uppercase text-[#B8972E] font-semibold mb-2 block">Order</label>
              <input type="number" value={form.order || 0} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })}
                className="w-full border border-[#E8E8E4] rounded-sm px-4 py-2.5 text-sm focus:border-[#B8972E] focus:outline-none" />
            </div>
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
                  {d}
                  <button onClick={() => removeDeliv(i)}><X size={11} className="text-[#6B6B6B] hover:text-red-500" /></button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving}
              className="bg-[#B8972E] text-white px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold hover:bg-[#9A7A22] transition-all flex items-center gap-2">
              <Save size={13} />{saving ? "Saving..." : "Save"}
            </button>
            <button onClick={closeEdit} className="bg-[#F5F5F0] text-[#6B6B6B] px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase font-semibold hover:bg-[#E8E8E4] transition-all">
              Cancel
            </button>
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
              <button onClick={() => openEdit(svc)} className="w-8 h-8 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:border-[#B8972E]/40 hover:text-[#B8972E] transition-all">
                <Pencil size={13} />
              </button>
              <button onClick={() => del(svc.id)} className="w-8 h-8 rounded-sm border border-[#E8E8E4] flex items-center justify-center text-[#6B6B6B] hover:border-red-200 hover:text-red-500 transition-all">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
