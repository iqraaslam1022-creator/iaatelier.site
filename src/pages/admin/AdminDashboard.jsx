import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Monitor, FolderOpen, Star, HelpCircle, DollarSign, FileText, Users, Settings, ChevronRight, X, Menu, BarChart3 } from "lucide-react";
import { base44 } from "@/api/base44Client";

const NAV = [
  { label: "Overview", path: "/admin", icon: BarChart3 },
  { label: "Hero", path: "/admin/hero", icon: Monitor },
  { label: "Services", path: "/admin/services", icon: Settings },
  { label: "Portfolio", path: "/admin/portfolio", icon: FolderOpen },
  { label: "Pricing", path: "/admin/pricing", icon: DollarSign },
  { label: "Testimonials", path: "/admin/testimonials", icon: Star },
  { label: "FAQ", path: "/admin/faq", icon: HelpCircle },
  { label: "Blog", path: "/admin/blog", icon: FileText },
  { label: "Authors", path: "/admin/authors", icon: Users },
];

function Sidebar({ open, onClose }) {
  const location = useLocation();
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}
      <aside className={`fixed left-0 top-0 bottom-0 w-64 bg-[#111] z-40 flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/08">
          <Link to="/" className="font-display text-lg tracking-widest text-white">
            IA <span className="text-[#D4AF37] font-bold">Admin</span>
          </Link>
          <p className="text-[0.65rem] tracking-widest uppercase text-white/30 mt-1">Content Management</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all ${
                  active ? "bg-[#B8972E] text-white" : "text-white/55 hover:text-white hover:bg-white/05"
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/08">
          <Link to="/" className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>
    </>
  );
}

export default function AdminDashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ services: 0, portfolio: 0, blogs: 0, testimonials: 0, faqs: 0 });
  const location = useLocation();
  const isOverview = location.pathname === "/admin";

  useEffect(() => {
    if (isOverview) {
      Promise.all([
        base44.entities.Service.list(),
        base44.entities.PortfolioProject.list(),
        base44.entities.BlogPost.list(),
        base44.entities.Testimonial.list(),
        base44.entities.FAQ.list(),
      ]).then(([s, p, b, t, f]) => {
        setStats({ services: s.length, portfolio: p.length, blogs: b.length, testimonials: t.length, faqs: f.length });
      });
    }
  }, [isOverview]);

  const STAT_CARDS = [
    { label: "Services", value: stats.services, icon: Settings, color: "bg-blue-50 text-blue-600", link: "/admin/services" },
    { label: "Portfolio Projects", value: stats.portfolio, icon: FolderOpen, color: "bg-amber-50 text-amber-600", link: "/admin/portfolio" },
    { label: "Blog Posts", value: stats.blogs, icon: FileText, color: "bg-green-50 text-green-600", link: "/admin/blog" },
    { label: "Testimonials", value: stats.testimonials, icon: Star, color: "bg-purple-50 text-purple-600", link: "/admin/testimonials" },
    { label: "FAQ Items", value: stats.faqs, icon: HelpCircle, color: "bg-rose-50 text-rose-600", link: "/admin/faq" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white border-b border-[#E8E8E4] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-8 h-8 flex items-center justify-center text-[#1A1A1A]">
              <Menu size={20} />
            </button>
            <span className="font-display text-lg text-[#1A1A1A]">
              {NAV.find((n) => n.path === location.pathname)?.label || "Dashboard"}
            </span>
          </div>
          <Link to="/" className="text-xs text-[#6B6B6B] hover:text-[#B8972E] transition-colors tracking-wider uppercase">
            View Site →
          </Link>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {isOverview ? (
            <div>
              <h1 className="font-display text-2xl text-[#1A1A1A] mb-2">Welcome back</h1>
              <p className="text-[#6B6B6B] text-sm mb-10">Here's an overview of your content.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
                {STAT_CARDS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link key={s.label} to={s.link} className="bg-white rounded-sm p-6 border border-[#E8E8E4] hover:border-[#B8972E]/40 hover:shadow-md transition-all group">
                      <div className={`w-10 h-10 rounded-sm flex items-center justify-center mb-4 ${s.color}`}>
                        <Icon size={18} />
                      </div>
                      <div className="font-display text-3xl text-[#1A1A1A] font-bold mb-1">{s.value}</div>
                      <div className="text-[0.68rem] tracking-widest uppercase text-[#6B6B6B] font-medium">{s.label}</div>
                    </Link>
                  );
                })}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {NAV.slice(1).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link key={item.path} to={item.path}
                      className="bg-white rounded-sm p-5 border border-[#E8E8E4] hover:border-[#B8972E]/40 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#1A1A1A] group-hover:bg-[#B8972E] rounded-sm flex items-center justify-center transition-colors">
                          <Icon size={16} className="text-white" />
                        </div>
                        <span className="font-medium text-sm text-[#1A1A1A]">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-[#B8972E]" />
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : children}
        </main>
      </div>
    </div>
  );
}
