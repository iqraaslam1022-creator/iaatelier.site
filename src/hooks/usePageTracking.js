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

export function usePageTracking() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/admin')) return;

        async function trackVisit() {
            try {
                // ip-api.com — free, HTTPS, Vercel pe kaam karta hai
                const geo = await fetch('https://ip-api.com/json/?fields=status,country,city,query')
                    .then(r => r.json())
                    .catch(() => ({}));

                const country = geo.status === 'success' ? geo.country : 'Unknown';
                const city = geo.status === 'success' ? geo.city : 'Unknown';
                const ip = geo.status === 'success' ? geo.query : null;

                await supabase.from('visitors').insert({
                    page: location.pathname,
                    country: country,
                    city: city,
                    ip_address: ip,
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