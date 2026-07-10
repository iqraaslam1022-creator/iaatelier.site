// backfill-geo.js
// One-time script to fix "Unknown" country/city in existing visitors rows.
//
// Setup:
//   npm install @supabase/supabase-js
//
// Run:
//   SUPABASE_URL=https://flkgnuywynftkwztbkwn.supabase.co \
//   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
//   node backfill-geo.js

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars')
    process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// Simple delay helper to avoid hammering the geolocation API
const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

async function lookupIp(ip) {
    try {
        const res = await fetch(`https://ipwho.is/${ip}`)
        const data = await res.json()
        if (data.success === false) return { country: 'Unknown', city: 'Unknown' }
        return {
            country: data.country || 'Unknown',
            city: data.city || 'Unknown',
        }
    } catch (err) {
        return { country: 'Unknown', city: 'Unknown' }
    }
}

async function main() {
    console.log('Fetching rows with Unknown country or city...')

    const { data: rows, error } = await supabase
        .from('visitors')
        .select('id, ip_address, country, city')
        .or('country.eq.Unknown,city.eq.Unknown')

    if (error) {
        console.error('Error fetching rows:', error)
        process.exit(1)
    }

    console.log(`Found ${rows.length} rows to fix.`)

    // Cache lookups per unique IP so we don't call the API repeatedly for the same IP
    const ipCache = new Map()

    let fixedCount = 0
    let skippedCount = 0

    for (const row of rows) {
        if (!row.ip_address || row.ip_address === '0.0.0.0') {
            skippedCount++
            continue
        }

        let geo = ipCache.get(row.ip_address)
        if (!geo) {
            geo = await lookupIp(row.ip_address)
            ipCache.set(row.ip_address, geo)
            await sleep(300) // be polite to the API, avoid rate limiting
        }

        if (geo.country === 'Unknown' && geo.city === 'Unknown') {
            skippedCount++
            continue
        }

        const { error: updateError } = await supabase
            .from('visitors')
            .update({ country: geo.country, city: geo.city })
            .eq('id', row.id)

        if (updateError) {
            console.error(`Failed to update row ${row.id}:`, updateError)
        } else {
            fixedCount++
            console.log(`Row ${row.id} (ip: ${row.ip_address}) -> ${geo.country}, ${geo.city}`)
        }
    }

    console.log(`\nDone. Fixed: ${fixedCount}, Skipped (no usable IP/lookup): ${skippedCount}`)
}

main()
