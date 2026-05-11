import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

const months = ['Aug','Sep','Oct','Nov','Dec','Jan'].map(m=>({
  month:m,
  revenue: Math.floor(Math.random()*100000+200000),
  costs: Math.floor(Math.random()*80000+150000),
  profit: Math.floor(Math.random()*40000+50000),
}))

const costs = [
  {name:'Ad Spend',value:285400,color:'bg-blue-500'},
  {name:'Product Cost',value:501480,color:'bg-purple-500'},
  {name:'Shipping',value:89600,color:'bg-emerald-500'},
  {name:'Gateway Fees',value:35820,color:'bg-amber-500'},
  {name:'COD Charges',value:24200,color:'bg-orange-500'},
  {name:'Refunds',value:27200,color:'bg-red-500'},
]
const totalCost = costs.reduce((a,c)=>a+c.value,0)

export default function PnL() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Profit & Loss</h1>
        <p className="text-gray-500 text-sm">Financial performance breakdown</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {label:'Gross Revenue',value:'৳14,32,800',change:12.4,up:true},
          {label:'Total Costs',value:'৳9,63,700',change:8.1,up:false},
          {label:'Net Profit',value:'৳3,18,900',change:18.7,up:true},
          {label:'Profit Margin',value:'22.3%',change:4.1,up:true},
          {label:'Refunds',value:'৳27,200',change:12,up:false},
          {label:'Ad ROAS',value:'5.02×',change:7.5,up:true},
        ].map(k=>(
          <div key={k.label} className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">{k.label}</p>
            <p className="text-lg font-semibold text-gray-900">{k.value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs ${
              k.up?'text-emerald-600':'text-red-500'}`}>
              {k.up?<TrendingUp size={11}/>:<TrendingDown size={11}/>}
              {k.change}%
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Monthly P&L</h2>
        <div className="flex gap-4 mb-3">
          {[['#10b981','Revenue'],['#ef4444','Costs'],['#8b5cf6','Profit']].map(([c,l])=>(
            <div key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-2.5 h-2.5 rounded-sm" style={{background:c}}/>
              {l}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={months}>
            <XAxis dataKey="month" tick={{fontSize:10}} />
            <YAxis tick={{fontSize:10}} tickLine={false} axisLine={false}
              tickFormatter={v=>`৳${(v/1000).toFixed(0)}K`} />
            <Tooltip formatter={(v:any)=>`৳${Number(v).toLocaleString()}`} />
            <Bar dataKey="revenue" fill="#10b981" radius={[3,3,0,0]} name="Revenue" />
            <Bar dataKey="costs" fill="#ef4444" radius={[3,3,0,0]} name="Costs" />
            <Bar dataKey="profit" fill="#8b5cf6" radius={[3,3,0,0]} name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Cost Breakdown</h2>
        <div className="space-y-3">
          {costs.map(c=>(
            <div key={c.name} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-28">{c.name}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div className={`${c.color} h-2 rounded-full`}
                  style={{width:`${(c.value/totalCost*100).toFixed(0)}%`}}/>
              </div>
              <span className="text-xs font-medium text-gray-900 w-24 text-right">
                ৳{c.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
