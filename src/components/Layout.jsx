import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { trackVisit } from "@/lib/tracking";

export default function Layout() {
  const location = useLocation();

  // Track every page visit automatically
  useEffect(() => {
    // Don't track admin pages (kyunki ye aap khud hain)
    if (location.pathname.startsWith("/admin")) return;

    trackVisit(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

