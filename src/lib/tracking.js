import { supabase } from "./supabase";

// Generate or get session ID
function getSessionId() {
    let sessionId = sessionStorage.getItem("visitor_session_id");
    if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem("visitor_session_id", sessionId);
    }
    return sessionId;
}

// Detect device type
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablet";
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "Mobile";
    return "Desktop";
}

// Detect browser
function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
    if (ua.includes("OPR/") || ua.includes("Opera/")) return "Opera";
    return "Other";
}

// Detect OS
function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes("Win")) return "Windows";
    if (ua.includes("Mac")) return "macOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    return "Other";
}

// Get country & city from IP
async function getLocation() {
    try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return { country: "Unknown", city: "Unknown", ip: null };
        const data = await res.json();
        return {
            country: data.country_name || "Unknown",
            city: data.city || "Unknown",
            ip: data.ip || null,
        };
    } catch (err) {
        console.warn("Location fetch failed:", err);
        return { country: "Unknown", city: "Unknown", ip: null };
    }
}

// Main tracking function - THIS IS THE EXPORT THAT WAS MISSING
export async function trackVisit(pagePath) {
    try {
        const sessionId = getSessionId();
        const lastTracked = sessionStorage.getItem(`tracked_${pagePath}`);
        const now = Date.now();

        // Don't track same page twice in 30 minutes
        if (lastTracked && now - parseInt(lastTracked) < 30 * 60 * 1000) {
            return;
        }
        sessionStorage.setItem(`tracked_${pagePath}`, String(now));

        const location = await getLocation();

        const visitData = {
            page: pagePath,
            country: location.country,
            city: location.city,
            device: getDeviceType(),
            browser: getBrowser(),
            os: getOS(),
            referrer: document.referrer || "Direct",
            language: navigator.language || "Unknown",
            screen_size: `${window.screen.width}x${window.screen.height}`,
            ip_address: location.ip,
            user_agent: navigator.userAgent,
            session_id: sessionId,
        };

        const { error } = await supabase.from("visitors").insert([visitData]);
        if (error) {
            console.error("Tracking error:", error);
        } else {
            console.log("✅ Visit tracked:", pagePath);
        }
    } catch (err) {
        console.error("Tracking failed:", err);
    }
}

