import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Landing from './components/Landing'
import CandidateWizard from './components/CandidateWizard'
import SwipeJobs from './components/SwipeJobs'
import RecruiterJobs from './components/RecruiterJobs'
import AdminPanel from './components/AdminPanel'

const BACKEND = import.meta.env.VITE_BACKEND_URL

export default function App(){
  const [language, setLanguage] = useState('en')
  const [role, setRole] = useState('')
  const [profile, setProfile] = useState(null)
  const [stage, setStage] = useState('landing')

  const t = (en, ar)=> language==='en' ? en : ar

  const onLogin = async (email, r)=>{
    if(!email) return alert('Enter email')
    const res = await fetch(`${BACKEND}/auth/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, role: r})})
    const data = await res.json()
    setRole(data.role)
    setProfile(data.profile)
    if(r==='candidate') setStage('candidate_wizard')
    if(r==='recruiter') setStage('recruiter_jobs')
    if(r==='admin') setStage('admin')
  }

  const onCandidateComplete = async (payload)=>{
    // Save or update candidate
    const res = await fetch(`${BACKEND}/candidates`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    const {_id} = await res.json()
    setProfile({...payload, _id})
    setStage('swipe')
  }

  const onLogout = ()=>{
    setRole('')
    setProfile(null)
    setStage('landing')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <Header language={language} setLanguage={setLanguage} role={role} setRole={()=>{}} onLogout={onLogout} />

      {stage==='landing' && (
        <Landing onLogin={onLogin} />
      )}

      {stage==='candidate_wizard' && (
        <CandidateWizard onComplete={onCandidateComplete} />
      )}

      {stage==='swipe' && (
        <SwipeJobs candidate={profile} />
      )}

      {stage==='recruiter_jobs' && (
        <RecruiterJobs />
      )}

      {stage==='admin' && (
        <AdminPanel />
      )}

      <footer className="text-center text-xs text-gray-500 py-6">{t('Made for GCC starting with KSA','مصمم لدول مجلس التعاون بدءًا بالسعودية')}</footer>
    </div>
  )
}
