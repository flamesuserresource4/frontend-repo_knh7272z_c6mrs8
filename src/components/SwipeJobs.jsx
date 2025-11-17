import React, { useEffect, useMemo, useState } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function SwipeJobs({ candidate }){
  const [jobs, setJobs] = useState([])
  const [index, setIndex] = useState(0)
  const job = jobs[index]

  useEffect(()=>{
    fetch(`${BACKEND}/jobs`).then(r=>r.json()).then(setJobs).catch(()=>setJobs([]))
  },[])

  const like = async ()=>{
    if(!job) return
    await fetch(`${BACKEND}/swipe`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({candidate_id: candidate?._id||'demo', job_id: job._id||'demo', direction:'like'})})
    setIndex(i=>i+1)
  }
  const pass = ()=> setIndex(i=>i+1)

  const score = async ()=>{
    if(!job) return
    const res = await fetch(`${BACKEND}/ai/fit-score`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({candidate, job})})
    const data = await res.json()
    alert(`Fit Score: ${data.fit_score}\nSkills: ${data.matched_skills.join(', ')}`)
  }

  const compliance = async ()=>{
    if(!job) return
    const res = await fetch(`${BACKEND}/ai/compliance`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({candidate, job})})
    const data = await res.json()
    alert(`Compliance flags: ${data.flags.join(', ')||'None'}`)
  }

  if(!job){
    return <div className="max-w-xl mx-auto text-center p-8 text-gray-600">No more jobs. Recruiters can add positions to see more here.</div>
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.location} • {job.country}</p>
          </div>
          <span className="text-xs text-gray-500">Swipe {index+1}/{jobs.length}</span>
        </div>
        <p className="text-gray-700 mt-3 text-sm leading-relaxed line-clamp-4">{job.description}</p>
        <div className="mt-3 text-xs text-gray-600">
          <div>Required skills: {job.required_skills?.join(', ')||'-'}</div>
          <div>Licenses: {job.required_licenses?.join(', ')||'-'}</div>
          <div>Min exp: {job.min_experience} yrs</div>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={pass} className="px-4 py-2 border rounded">Pass</button>
          <button onClick={like} className="px-4 py-2 bg-emerald-600 text-white rounded">Like</button>
          <button onClick={score} className="ml-auto px-3 py-2 text-indigo-600 border rounded">Fit Score</button>
          <button onClick={compliance} className="px-3 py-2 text-amber-600 border rounded">Compliance</button>
        </div>
      </div>
    </div>
  )
}
