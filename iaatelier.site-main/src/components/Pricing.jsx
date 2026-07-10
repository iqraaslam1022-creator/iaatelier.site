import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Pricing() {
    const [plans, setPlans] = useState([])

    useEffect(() => {
        fetchPricing()
    }, [])

    async function fetchPricing() {
        const { data, error } = await supabase
            .from('pricing')
            .select('*')
            .order('display_order', { ascending: true })

        if (error) console.error(error)
        else setPlans(data)
    }

    return (
        <div className="pricing-section">
            {plans.map((plan) => (
                <div key={plan.id} className={`pricing-card ${plan.is_popular ? 'popular' : ''}`}>
                    <h3>{plan.plan_name}</h3>
                    <h2>${plan.price}/{plan.billing_cycle}</h2>
                    <ul>
                        {plan.features?.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                </div>
            ))}
        </div>
    )
}