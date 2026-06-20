import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

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

export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        // Admin pages track mat karo
        if (location.pathname.startsWith('/admin')) return;

        async function trackVisit() {
            try {
                // IP aur geo info lo (country, city)
                const geo = await fetch('https://ipapi.co/json/')
                    .then(r => r.json())
                    .catch(() => ({}));

                await supabase.from('visitors').insert({
                    page: location.pathname,
                    country: geo.country_name || 'Unknown',
                    city: geo.city || 'Unknown',
                    ip_address: geo.ip || null,
                    device: getDevice(),
                    browser: getBrowser(),
                    os: getOS(),
                    referrer: document.referrer || null,
                    language: navigator.language || null,
                    screen_size: `${screen.width}x${screen.height}`,
                    user_agent: navigator.userAgent,
                    session_id: generateSessionId(),
                    created_at: new Date().toLocaleString('sv-SE', {
                        timeZone: 'Asia/Karachi'
                    }).replace(' ', 'T') + '+05:00',
                });
            } catch (err) {
                // Tracking error site ko affect na kare
                console.error('Tracking error:', err);
            }
        }

        trackVisit();
    }, [location.pathname]);
} 