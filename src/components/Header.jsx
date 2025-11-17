import React from 'react'

export default function Header({ language, setLanguage, role, setRole, onLogout }) {
  return (
    <header className="w-full bg-white/80 backdrop-blur sticky top-0 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-br from-indigo-500 to-purple-500" />
          <span className="font-semibold text-gray-800">TalenQ</span>
          {role && <span className="ml-2 text-sm text-gray-500">({role})</span>}
        </div>
        <div className="flex items-center gap-3">
          <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="text-sm border rounded px-2 py-1">
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
          {role && (
            <button onClick={onLogout} className="text-sm text-gray-500 hover:text-gray-800">Logout</button>
          )}
        </div>
      </div>
    </header>
  )
}
