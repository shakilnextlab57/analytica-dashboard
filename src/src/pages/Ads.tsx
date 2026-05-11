import { LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

const kpis = [
  {label:'Total Spend',value:'৳2,85,400',change:3.2,up:false},
  {label:'Impressions',value:'4.2M',change:9.1,up:true},
  {label:'Link Clicks',value:'1,28,000',change:6.4,up:true},
  {label:'CTR',value:'3.05%',change:2.1,up:true},
  {label:'CPM',value:'৳68',change:4.1,up:false},
  {label:'CPC',value:'৳2.23',change:1.8,up:false},
  {label:'Purchases',value:'3,218',change:8.1,up:true},
  {label:'ROAS',value:'5.02×',change:7.5,up:true},
]

const campaigns = [
  {name:'Brand Awareness',spend:85000,roas:4.2,ctr:'2.8%'},
  {name:'Retargeting',spend:72000,roas:7.1,ctr:'4.5%'},
  {name:'Lookalike',spend:65000,roas:5.3,ctr:'3.2%'},
  {name:'Top of Funnel',spend:43000,roas:3.8,ctr:'2.1%'},
  {name:'Flash Sale',spend:20400,roas:8.9,ctr:'6.7%'},
]

const trend = Array.from({length:14},(_,i)=>({
  day:`D${i+1}`,
  cpm: Math.floor(Math.random()*20+58),
  ctr: +(Math.random()*2+2).toFixed(2),
}))

export default function Ads() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Ads Analytics</h1>
        <p className="text-gray-500 text-sm">Meta Ads performance overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map(k=>(
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
        <h2 className="text-sm font-semibold text-gray-900 mb-4">CPM & CTR Trend</h2>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={trend}>
            <XAxis dataKey="day" tick={{fontSize:10}} />
            <YAxis tick={{fontSize:10}} tickLine={false} axisLine={false} />
            <Tooltip />
            <Line type="monotone" dataKey="cpm" stroke="#8b5cf6"
              strokeWidth={2} dot={false} name="CPM (৳)" />
            <Line type="monotone" dataKey="ctr" stroke="#10b981"
              strokeWidth={2} dot={false} name="CTR (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Campaign Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['Campaign','Spend','ROAS','CTR','Status'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs 
                    font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c,i)=>(
                <tr key={c.name} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    ৳{c.spend.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {c.roas}×
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{c.ctr}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      i<2?'bg-emerald-100 text-emerald-700':
                      i===2?'bg-amber-100 text-amber-700':
                      'bg-red-100 text-red-700'}`}>
                      {i<2?'Top':i===2?'Average':'Low'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
