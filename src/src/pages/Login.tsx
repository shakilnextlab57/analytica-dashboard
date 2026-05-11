import { useState } from 'react'
import { supabase } from '../supabase'
import { TrendingUp } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'login'|'signup'>('login')

  const handle = async () => {
    setLoading(true)
    setError('')
    const fn = mode === 'login'
      ? supabase.auth.signInWithPassword
      : supabase.auth.signUp
    const { error } = await fn.call(supabase.auth, { email, password })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900">Analytica</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-1">
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {mode === 'login' ? 'Sign in to your dashboard' : 'Start tracking your store'}
        </p>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 
            text-sm px-3 py-2 rounded-lg mb-4">{error}</div>
        )}
        <div className="space-y-3">
          <input type="email" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 
            text-sm focus:outline-none focus:border-emerald-500" />
          <input type="password" placeholder="Password" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handle()}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 
            text-sm focus:outline-none focus:border-emerald-500" />
          <button onClick={handle} disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white 
            rounded-lg py-2.5 text-sm font-medium transition-colors disabled:opacity-50">
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-emerald-600 font-medium">
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
