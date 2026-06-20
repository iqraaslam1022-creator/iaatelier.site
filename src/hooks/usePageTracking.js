import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

function getDevice() {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
    if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return 'Mobile';
    return 'Desktop';
}

function getBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('OPR') || ua.includes('Opera')) return 'Opera';
    return 'Unknown';
}

function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac OS')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown';
}

function generateSessionId() {
    const key = 'visitor_session_id';
    let sid = sessionStorage.getItem(key);
    if (!sid) {
        sid = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
        sessionStorage.setItem(key, sid);
    }
    return sid;
}

function getPKTTime() {
    const now = new Date();
    const pkt = new Date(now.getTime() + (5 * 60 * 60 * 1000));
    return pkt.toISOString().replace('Z', '+05:00');
}

async function getGeoInfo() {
    // Try 1: ipwho.is
    try {
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();
        if (data.success) {
            return { country: data.country, city: data.city, ip: data.ip };
        }
    } catch (_) { }

    // Try 2: freeipapi.com
    try {
        const res = await fetch('https://freeipapi.com/api/json');
        const data = await res.json();
        if (data.countryName) {
            return { country: data.countryName, city: data.cityName, ip: data.ipAddress };
        }
    } catch (_) { }

    // Try 3: ipapi.co
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_name) {
            return { country: data.country_name, city: data.city, ip: data.ip };
        }
    } catch (_) { }

    return { country: 'Unknown', city: 'Unknown', ip: null };
}

export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/admin')) return;

        async function trackVisit() {
            try {
                const geo = await getGeoInfo();

                await supabase.from('visitors').insert({
                    page: location.pathname,
                    country: geo.country,
                    city: geo.city,
                    ip_address: geo.ip,
                    device: getDevice(),
                    browser: getBrowser(),
                    os: getOS(),
                    referrer: document.referrer || null,
                    language: navigator.language || null,
                    screen_size: `${screen.width}x${screen.height}`,
                    user_agent: navigator.userAgent,
                    session_id: generateSessionId(),
                    created_at: getPKTTime(),
                });
            } catch (err) {
                console.error('Tracking error:', err);
            }
        }

        trackVisit();
    }, [location.pathname]);
}