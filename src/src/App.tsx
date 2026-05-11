import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import Layout from './components/Layout'
import Login from './pages/Login'
import Overview from './pages/Overview'
import Orders from './pages/Orders'
import Ads from './pages/Ads'
import Products from './pages/Products'
import PnL from './pages/PnL'
import Customers from './pages/Customers'
import Settings from './pages/Settings'

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    supabase.auth.onAuthStateChange((_e, session) => setSession(session))
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-gray-500 text-lg">Loading...</div>
    </div>
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          session ? <Navigate to="/overview" /> : <Login />
        } />
        <Route path="/" element={
          session ? <Layout session={session} /> : <Navigate to="/login" />
        }>
          <Route index element={<Navigate to="/overview" />} />
          <Route path="overview" element={<Overview />} />
          <Route path="orders" element={<Orders />} />
          <Route path="ads" element={<Ads />} />
          <Route path="products" element={<Products />} />
          <Route path="pnl" element={<PnL />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
