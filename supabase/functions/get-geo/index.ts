import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               req.headers.get('x-real-ip') ||
               '0.0.0.0'

    // ip-api.com — server side pe CORS issue nahi, city bhi deta hai
    const geo = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`)
      .then(r => r.json())
      .catch(() => ({}))

    const country = geo.status === 'success' ? geo.country : 'Unknown'
    const city = geo.status === 'success' ? geo.city : 'Unknown'

    return new Response(
      JSON.stringify({ ip, country, city }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ ip: null, country: 'Unknown', city: 'Unknown' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  }
})
