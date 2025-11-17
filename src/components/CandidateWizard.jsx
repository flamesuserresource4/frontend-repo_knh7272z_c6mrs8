import React, { useState } from 'react'

export default function CandidateWizard({ onComplete }){
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    years_experience: 0,
    education: '',
    skills: '',
    licenses: '',
    location: '',
    languages: 'English, Arabic'
  })

  const update = (k,v)=> setForm(prev=>({...prev,[k]:v}))

  const submit = ()=>{
    const payload = {
      full_name: form.full_name,
      email: form.email,
      years_experience: Number(form.years_experience||0),
      education: form.education,
      skills: form.skills.split(',').map(s=>s.trim()).filter(Boolean),
      licenses: form.licenses.split(',').map(s=>s.trim()).filter(Boolean),
      location: form.location,
      languages: form.languages.split(',').map(s=>s.trim()).filter(Boolean),
    }
    onComplete(payload)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Candidate Onboarding</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className="border rounded px-3 py-2" placeholder="Full name" value={form.full_name} onChange={e=>update('full_name', e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e=>update('email', e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Location (City, Country)" value={form.location} onChange={e=>update('location', e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Years of experience" type="number" value={form.years_experience} onChange={e=>update('years_experience', e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Education" value={form.education} onChange={e=>update('education', e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Skills (comma separated)" value={form.skills} onChange={e=>update('skills', e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Licenses (comma separated)" value={form.licenses} onChange={e=>update('licenses', e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Languages (comma separated)" value={form.languages} onChange={e=>update('languages', e.target.value)} />
      </div>
      <div className="mt-4">
        <button onClick={submit} className="bg-indigo-600 text-white px-4 py-2 rounded">Save Profile</button>
      </div>
    </div>
  )
}
