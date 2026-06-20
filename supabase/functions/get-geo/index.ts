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
    // Visitor ki real IP lo
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('x-real-ip') || 
               '0.0.0.0'

    // ipapi.co se geo info lo (server side pe CORS issue nahi)
    const geo = await fetch(`https://ipapi.co/${ip}/json/`)
      .then(r => r.json())
      .catch(() => ({}))

    return new Response(
      JSON.stringify({
        ip,
        country: geo.country_name || 'Unknown',
        city: geo.city || 'Unknown',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ ip: null, country: 'Unknown', city: 'Unknown' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  }
})
