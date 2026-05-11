import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

const trend = Array.from({length:14},(_,i)=>({
  day:`D${i+1}`,
  new: Math.floor(Math.random()*100+80),
  returning: Math.floor(Math.random()*50+30),
}))

const top = [
  {name:'Anisul Haque',orders:12,ltv:'৳18,400',last:'May 8'},
  {name:'Shamima Akter',orders:9,ltv:'৳14,200',last:'May 10'},
  {name:'Rubel Miah',orders:8,ltv:'৳12,800',last:'May 7'},
  {name:'Taslima Begum',orders:7,ltv:'৳11,100',last:'May 9'},
  {name:'Imran Hossain',orders:6,ltv:'৳9,600',last:'May 6'},
]

export default function Customers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Customers</h1>
        <p className="text-gray-500 text-sm">Customer analytics and lifetime value</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {label:'Total Customers',value:'6,824',change:14.2},
          {label:'New Customers',value:'4,490',change:10.1},
          {label:'Returning',value:'2,334',change:22.4},
          {label:'Repeat Rate',value:'34.2%',change:1.8},
          {label:'Avg LTV',value:'৳4,240',change:8.7},
          {label:'CAC',value:'৳88',change:5.2},
        ].map(k=>(
          <div key={k.label} className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">{k.label}</p>
            <p className="text-lg font-semibold text-gray-900">{k.value}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600">
              <TrendingUp size={11}/> {k.change}%
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          New vs Returning — Last 14 Days
        </h2>
        <div className="flex gap-4 mb-3">
          {[['#10b981','New'],['#8b5cf6','Returning']].map(([c,l])=>(
            <div key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-2.5 h-2.5 rounded-sm" style={{background:c}}/>
              {l}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={trend}>
            <XAxis dataKey="day" tick={{fontSize:10}} />
            <YAxis tick={{fontSize:10}} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="new" stroke="#10b981"
              strokeWidth={2} dot={false} name="New" />
            <Line type="monotone" dataKey="returning" stroke="#8b5cf6"
              strokeWidth={2} dot={false} name="Returning" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Top Customers</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {['Customer','Orders','LTV','Last Order'].map(h=>(
                <th key={h} className="text-left px-4 py-3 text-xs 
                  font-medium text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {top.map(c=>(
              <tr key={c.name} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{c.orders}</td>
                <td className="px-4 py-3 text-sm font-medium text-emerald-600">{c.ltv}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
