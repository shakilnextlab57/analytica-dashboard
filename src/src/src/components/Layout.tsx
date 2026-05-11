import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import {
  LayoutDashboard, ShoppingBag, Megaphone,
  Package, Receipt, Users, Settings, LogOut, TrendingUp
} from 'lucide-react'

const nav = [
  { to: '/overview', icon: LayoutDashboard, label: 'Overview' },
  { to: '/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/ads', icon: Megaphone, label: 'Ads' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/pnl', icon: Receipt, label: 'P&L' },
  { to: '/customers', icon: Users, label: 'Customers' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Layout({ session }: { session: any }) {
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div className="w-52 bg-gray-900 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-700 flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-500 rounded-lg flex items-center justify-center">
            <TrendingUp size={14} className="text-white" />
          </div>
          <span className="text-white font-semibold text-sm">Analytica</span>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-emerald-600 text-white font-medium'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }>
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-700">
          <div className="text-xs text-gray-500 px-3 mb-2 truncate">
            {session?.user?.email}
          </div>
          <button onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-gray-400 
            hover:text-white hover:bg-gray-800 rounded-lg w-full text-sm">
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-3 
          flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-600 font-medium">Live</span>
          </div>
          <div className="flex gap-2">
            {['Today','7 Days','30 Days','This Month'].map(d => (
              <button key={d}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg 
                text-gray-600 hover:border-emerald-500 hover:text-emerald-600 
                transition-colors">
                {d}
              </button>
            ))}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
