import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function FAQs() {
    const [faqs, setFaqs] = useState([])
    const [openIndex, setOpenIndex] = useState(null)

    useEffect(() => {
        fetchFaqs()
    }, [])

    async function fetchFaqs() {
        const { data, error } = await supabase
            .from('faqs')
            .select('*')
            .order('display_order', { ascending: true })

        if (error) console.error(error)
        else setFaqs(data)
    }

    return (
        <div className="faqs-section">
            {faqs.map((faq, index) => (
                <div key={faq.id} className="faq-item">
                    <h4 onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        {faq.question}
                    </h4>
                    {openIndex === index && <p>{faq.answer}</p>}
                </div>
            ))}
        </div>
    )
}
