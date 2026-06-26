import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error(error)
    else setTestimonials(data)
    setLoading(false)
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="testimonials-section">
      {testimonials.map((t) => (
        <div key={t.id} className="testimonial-card">
          {t.avatar_url && <img src={t.avatar_url} alt={t.name} width="50" />}
          <p>"{t.message}"</p>
          <h4>{t.name}</h4>
          <span>{t.role}</span>
          <div>{'⭐'.repeat(t.rating)}</div>
        </div>
      ))}
    </div>
  )
}
