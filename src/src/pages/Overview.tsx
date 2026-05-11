import { LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

const revenue = Array.from({length:30},(_,i)=>({
  day:`Day ${i+1}`,
  revenue: Math.floor(Math.random()*100000+80000),
  spend: Math.floor(Math.random()*30000+15000),
  profit: Math.floor(Math.random()*40000+20000),
}))

const kpis = [
  { label:'Total Revenue', value:'৳14,32,800', change:12.4, up:true },
  { label:'Total Orders', value:'3,218', change:8.1, up:true },
  { label:'Ad Spend', value:'৳2,85,400', change:3.2, up:false },
  { label:'Net Profit', value:'৳3,18,900', change:18.7, up:true },
  { label:'ROAS', value:'5.02×', change:7.5, up:true },
  { label:'MER', value:'5.02×', change:2.1, up:true },
  { label:'AOV', value:'৳445', change:3.9, up:true },
  { label:'CAC', value:'৳88', change:5.2, up:false },
  { label:'Profit Margin', value:'22.3%', change:4.1, up:true },
  { label:'Returning Cust.', value:'34.2%', change:1.8, up:true },
  { label:'Refund Rate', value:'2.1%', change:0.4, up:false },
]

const pieData = [
  { name:'Completed', value:1820 },
  { name:'Processing', value:680 },
  { name:'Pending', value:420 },
  { name:'Cancelled', value:198 },
]
const COLORS = ['#10b981','#3b82f6','#f59e0b','#ef4444']

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Overview</h1>
        <p className="text-gray-500 text-sm">Your store performance at a glance</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {kpis.map(k => (
          <div key={k.label} className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">{k.label}</p>
            <p className="text-lg font-semibold text-gray-900">{k.value}</p>
            <div className={`flex items-center gap-1 mt-1 text-xs ${
              k.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {k.up ? <TrendingUp size={11}/> : <TrendingDown size={11}/>}
              {k.change}% vs yesterday
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Revenue vs Ad Spend — Last 30 Days
        </h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={revenue}>
            <XAxis dataKey="day" tick={{fontSize:10}} tickLine={false}
              interval={4} />
            <YAxis tick={{fontSize:10}} tickLine={false} axisLine={false}
              tickFormatter={v=>`৳${(v/1000).toFixed(0)}K`} />
            <Tooltip formatter={(v:any)=>`৳${Number(v).toLocaleString()}`} />
            <Line type="monotone" dataKey="revenue" stroke="#10b981"
              strokeWidth={2} dot={false} name="Revenue" />
            <Line type="monotone" dataKey="spend" stroke="#3b82f6"
              strokeWidth={2} dot={false} name="Ad Spend" />
            <Line type="monotone" dataKey="profit" stroke="#8b5cf6"
              strokeWidth={2} dot={false} strokeDasharray="4 3" name="Profit" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2">
          {[['#10b981','Revenue'],['#3b82f6','Ad Spend'],['#8b5cf6','Profit']].map(([c,l])=>(
            <div key={l} className="flex items-center gap-1.5 text-xs text-gray-500">
              <div className="w-2.5 h-2.5 rounded-sm" style={{background:c}}/>
              {l}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">ROAS Trend</h2>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={revenue.map((d,i)=>({
              day:`D${i+1}`, roas:+(d.revenue/d.spend).toFixed(2), target:3
            }))}>
              <XAxis dataKey="day" tick={{fontSize:10}} interval={4} />
              <YAxis tick={{fontSize:10}} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="roas" stroke="#8b5cf6"
                strokeWidth={2} dot={false} name="ROAS" />
              <Line type="monotone" dataKey="target" stroke="#ef4444"
                strokeWidth={1} dot={false} strokeDasharray="4 2" name="Target 3×" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Order Status</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%"
                  innerRadius={45} outerRadius={70} dataKey="value">
                  {pieData.map((_,i)=>(
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {pieData.map((d,i)=>(
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-sm"
                    style={{background:COLORS[i]}}/>
                  <span className="text-gray-500">{d.name}</span>
                  <span className="font-medium text-gray-900">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
