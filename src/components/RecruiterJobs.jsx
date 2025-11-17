import React, { useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function RecruiterJobs(){
  const [form, setForm] = useState({
    title:'', description:'', location:'Riyadh', country:'KSA', min_experience:0,
    required_skills:'', required_licenses:'', education_required:''
  })
  const [jobs, setJobs] = useState([])

  const update=(k,v)=> setForm(p=>({...p,[k]:v}))

  const create = async ()=>{
    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      country: form.country,
      min_experience: Number(form.min_experience||0),
      required_skills: form.required_skills.split(',').map(s=>s.trim()).filter(Boolean),
      required_licenses: form.required_licenses.split(',').map(s=>s.trim()).filter(Boolean),
      education_required: form.education_required || null,
      requirements: []
    }
    await fetch(`${BACKEND}/jobs`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    const res = await fetch(`${BACKEND}/jobs`)
    setJobs(await res.json())
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Post a job</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e=>update('title', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Location" value={form.location} onChange={e=>update('location', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Country" value={form.country} onChange={e=>update('country', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Min experience" type="number" value={form.min_experience} onChange={e=>update('min_experience', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Required skills (comma)" value={form.required_skills} onChange={e=>update('required_skills', e.target.value)} />
          <input className="border rounded px-3 py-2" placeholder="Required licenses (comma)" value={form.required_licenses} onChange={e=>update('required_licenses', e.target.value)} />
          <textarea className="border rounded px-3 py-2 md:col-span-2" rows={3} placeholder="Description" value={form.description} onChange={e=>update('description', e.target.value)} />
        </div>
        <div className="mt-3">
          <button onClick={create} className="bg-indigo-600 text-white px-4 py-2 rounded">Post</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map((j)=> (
          <div key={j._id} className="bg-white rounded-xl shadow p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-800">{j.title}</h4>
                <p className="text-xs text-gray-500">{j.location} • {j.country}</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">{j.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
