import React, { useState } from 'react'

export default function Landing({ onLogin }){
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('candidate')

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-3">Hire smarter. Faster.</h1>
        <p className="text-gray-600">An end-to-end recruitment platform that ranks candidates, checks compliance, and automates contracts.</p>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 mb-2">Get started</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <label className="flex items-center gap-2 border rounded p-2 cursor-pointer">
              <input type="radio" name="role" checked={role==='candidate'} onChange={()=>setRole('candidate')} />
              <span>Candidate</span>
            </label>
            <label className="flex items-center gap-2 border rounded p-2 cursor-pointer">
              <input type="radio" name="role" checked={role==='recruiter'} onChange={()=>setRole('recruiter')} />
              <span>Recruiter</span>
            </label>
            <label className="flex items-center gap-2 border rounded p-2 cursor-pointer">
              <input type="radio" name="role" checked={role==='admin'} onChange={()=>setRole('admin')} />
              <span>Admin</span>
            </label>
          </div>
          <div className="flex gap-2">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="flex-1 border rounded px-3 py-2"/>
            <button onClick={()=>onLogin(email, role)} className="bg-indigo-600 text-white px-4 py-2 rounded">Continue</button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Email-only login for demo</p>
        </div>
        <div className="flex-1">
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• AI Fit Score ranks candidates 0–100</li>
            <li>• KSA compliance: visa, residency, licensing</li>
            <li>• Swipe-to-apply for candidates</li>
            <li>• Digital offers, contracts, and payments</li>
            <li>• English + Arabic</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
