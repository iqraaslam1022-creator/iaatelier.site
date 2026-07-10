import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError("Email ya password galat hai.");
            setLoading(false);
        } else {
            navigate("/admin");
        }
    };

    return (
        <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: "420px", padding: "0 1.5rem" }}>

                {/* Logo / Title */}
                <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                    <h1 style={{ fontFamily: "serif", fontSize: "2rem", color: "#1A1A1A", marginBottom: "0.5rem" }}>
                        IA <em style={{ color: "#B8972E", fontStyle: "italic" }}>Atelier</em>
                    </h1>
                    <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#6B6B6B", fontWeight: 600 }}>Admin Panel</p>
                </div>

                {/* Card */}
                <div style={{ background: "#fff", border: "1px solid #E8E8E4", borderRadius: "2px", padding: "2.5rem" }}>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "#1A1A1A", marginBottom: "1.75rem" }}>Sign In</h2>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: "1.25rem" }}>
                            <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8972E", fontWeight: 600, marginBottom: "0.5rem" }}>
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@example.com"
                                style={{ width: "100%", border: "1px solid #E8E8E4", borderRadius: "2px", padding: "0.65rem 1rem", fontSize: "0.875rem", outline: "none", boxSizing: "border-box", color: "#1A1A1A", backgroundColor: "#FAFAF8" }}
                                onFocus={(e) => e.target.style.borderColor = "#B8972E"}
                                onBlur={(e) => e.target.style.borderColor = "#E8E8E4"}
                            />
                        </div>

                        <div style={{ marginBottom: "1.75rem" }}>
                            <label style={{ display: "block", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8972E", fontWeight: 600, marginBottom: "0.5rem" }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                style={{ width: "100%", border: "1px solid #E8E8E4", borderRadius: "2px", padding: "0.65rem 1rem", fontSize: "0.875rem", outline: "none", boxSizing: "border-box", color: "#1A1A1A", backgroundColor: "#FAFAF8" }}
                                onFocus={(e) => e.target.style.borderColor = "#B8972E"}
                                onBlur={(e) => e.target.style.borderColor = "#E8E8E4"}
                            />
                        </div>

                        {error && (
                            <p style={{ fontSize: "0.8rem", color: "#dc2626", marginBottom: "1rem", textAlign: "center" }}>{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{ width: "100%", backgroundColor: loading ? "#6B6B6B" : "#1A1A1A", color: "#fff", border: "none", borderRadius: "2px", padding: "0.85rem", fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", transition: "background-color 0.2s" }}
                            onMouseEnter={(e) => { if (!loading) e.target.style.backgroundColor = "#B8972E"; }}
                            onMouseLeave={(e) => { if (!loading) e.target.style.backgroundColor = "#1A1A1A"; }}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}