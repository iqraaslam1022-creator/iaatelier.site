import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Monitor, FolderOpen, Star, HelpCircle, DollarSign, FileText, Users, Settings, ChevronRight, Menu, BarChart3, Eye, Globe, Smartphone, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

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
                className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all ${active ? "bg-[#B8972E] text-white" : "text-white/55 hover:text-white hover:bg-white/05"
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
            Back to Website
          </Link>
        </div>
      </aside>
    </>
  );
}

function StatCard({ icon: Icon, label, value, color = "#B8972E" }) {
  return (
    <div className="bg-white rounded-sm p-5 border border-[#E8E8E4]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ backgroundColor: color + "15" }}>
          <Icon size={16} style={{ color }} />
        </div>
        <span className="text-xs text-[#6B6B6B] uppercase tracking-wider">{label}</span>
      </div>
      <div className="font-display text-3xl text-[#1A1A1A]">{value}</div>
    </div>
  );
}

function Overview() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVisitors();

    // Realtime subscription
    const channel = supabase
      .channel("visitors")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "visitors" }, (payload) => {
        setVisitors((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const fetchVisitors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("visitors")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (!error) setVisitors(data || []);
    setLoading(false);
  };

  const todayVisitors = visitors.filter((v) => {
    const today = new Date().toDateString();
    return new Date(v.created_at).toDateString() === today;
  });

  const uniquePages = [...new Set(visitors.map((v) => v.page))];

  const pageCount = uniquePages.map((page) => ({
    page,
    count: visitors.filter((v) => v.page === page).length,
  })).sort((a, b) => b.count - a.count);

  const deviceCount = {
    Mobile: visitors.filter((v) => v.device === "Mobile").length,
    Desktop: visitors.filter((v) => v.device === "Desktop").length,
    Tablet: visitors.filter((v) => v.device === "Tablet").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-6 h-6 border-2 border-[#B8972E]/20 border-t-[#B8972E] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-[#1A1A1A] mb-2">Welcome back</h1>
      <p className="text-[#6B6B6B] text-sm mb-8">Live visitor tracking & website overview</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Eye} label="Total Visits" value={visitors.length} color="#B8972E" />
        <StatCard icon={Globe} label="Today's Visits" value={todayVisitors.length} color="#3B82F6" />
        <StatCard icon={Smartphone} label="Mobile Users" value={deviceCount.Mobile} color="#10B981" />
        <StatCard icon={BarChart3} label="Pages Tracked" value={uniquePages.length} color="#8B5CF6" />
      </div>

      {/* Recent Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-sm border border-[#E8E8E4] p-5">
          <h2 className="font-display text-base text-[#1A1A1A] mb-4">Recent Visitors</h2>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {visitors.slice(0, 10).map((v) => (
              <div key={v.id} className="flex items-center justify-between text-sm border-b border-[#F0F0EC] pb-2">
                <div>
                  <span className="text-[#B8972E] font-medium">{v.page}</span>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">
                    {v.device} • {v.browser} • {v.language}
                  </div>
                </div>
                <span className="text-xs text-[#9B9B9B]">
                  {new Date(v.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            ))}
            {visitors.length === 0 && (
              <p className="text-sm text-[#6B6B6B]">Abhi koi visitor nahi</p>
            )}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-sm border border-[#E8E8E4] p-5">
          <h2 className="font-display text-base text-[#1A1A1A] mb-4">Top Pages</h2>
          <div className="space-y-3">
            {pageCount.slice(0, 6).map((p) => (
              <div key={p.page} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#1A1A1A]">{p.page}</span>
                    <span className="text-xs text-[#6B6B6B]">{p.count} visits</span>
                  </div>
                  <div className="h-1.5 bg-[#F0F0EC] rounded-full">
                    <div
                      className="h-1.5 bg-[#B8972E] rounded-full"
                      style={{ width: `${(p.count / visitors.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <h2 className="font-display text-base text-[#1A1A1A] mb-4">Manage Content</h2>
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
  );
}

export default function AdminDashboard({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const isOverview = location.pathname === "/admin";

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
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
            View Site
          </Link>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {isOverview ? <Overview /> : children}
        </main>
      </div>
    </div>
  );
}


