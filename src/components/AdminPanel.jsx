import React, { useEffect, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function AdminPanel(){
  const [metrics, setMetrics] = useState(null)

  useEffect(()=>{
    fetch(`${BACKEND}/admin/metrics`).then(r=>r.json()).then(setMetrics).catch(()=>{})
  },[])

  if(!metrics) return <div className="max-w-4xl mx-auto p-6 text-gray-600">Loading metrics...</div>

  const cards = Object.entries(metrics)

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Admin Overview</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(([k,v])=> (
          <div key={k} className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-2xl font-semibold text-gray-800">{v}</div>
            <div className="text-xs uppercase tracking-wide text-gray-500 mt-1">{k}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
