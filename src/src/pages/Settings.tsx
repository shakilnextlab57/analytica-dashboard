import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

export default function Settings() {
  const [form, setForm] = useState({
    woo_url:'', woo_key:'', woo_secret:'',
    meta_token:'', meta_account_id:'',
    product_cost_pct:35, shipping_cost:80,
    gateway_fee_pct:2.5, cod_charge:30,
  })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('settings').select('*')
        .eq('user_id', user.id).single()
      if (data) setForm(data)
    }
    load()
  },[])

  const save = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('settings').upsert({
      ...form, user_id: user.id
    }, { onConflict: 'user_id' })
    setSaved(true)
    setTimeout(()=>setSaved(false), 3000)
    setLoading(false)
  }

  const field = (label: string, key: string, type='text', placeholder='') => (
    <div key={key}>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} placeholder={placeholder}
        value={(form as any)[key]}
        onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm 
        focus:outline-none focus:border-emerald-500" />
    </div>
  )

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm">Configure your API connections</p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 
          text-sm px-4 py-3 rounded-xl">
          ✓ Settings saved successfully
        </div>
      )}

      <div className="bg-white rounded-xl p-5 border border-gray-100 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">
          🛒 WooCommerce API
        </h2>
        {field('Store URL','woo_url','text','https://yourstore.com')}
        {field('Consumer Key','woo_key','text','ck_...')}
        {field('Consumer Secret','woo_secret','password','cs_...')}
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">
          📱 Meta Ads API
        </h2>
        {field('Access Token','meta_token','password','EAAGm...')}
        {field('Ad Account ID','meta_account_id','text','act_123456789')}
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          💰 Cost Settings
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {field('Product Cost %','product_cost_pct','number')}
          {field('Avg Shipping Cost (৳)','shipping_cost','number')}
          {field('Gateway Fee %','gateway_fee_pct','number')}
          {field('COD Charge (৳)','cod_charge','number')}
        </div>
      </div>

      <button onClick={save} disabled={loading}
        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 
        rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
        {loading ? 'Saving...' : 'Save Settings'}
      </button>
    </div>
  )
}
