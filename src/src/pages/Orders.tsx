import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const orders = Array.from({length:15},(_,i)=>({
  id: 10400+i,
  customer: ['Rahim Ahmed','Karim Hossain','Nadia Islam','Sumon Roy',
    'Fatema Begum','Jahir Uddin','Mitu Akter','Rajan Das',
    'Hena Khatun','Bishwajit Sen','Anisul Haque','Shamima Akter',
    'Rubel Miah','Taslima Begum','Imran Hossain'][i],
  amount: Math.floor(Math.random()*2000+400),
  status: ['completed','processing','pending','cancelled'][Math.floor(Math.random()*4)],
  type: Math.random()>0.4?'Prepaid':'COD',
  date: new Date(Date.now()-i*86400000).toLocaleDateString('en',{month:'short',day:'numeric'}),
}))

const statusStyle: any = {
  completed:'bg-emerald-100 text-emerald-700',
  processing:'bg-blue-100 text-blue-700',
  pending:'bg-amber-100 text-amber-700',
  cancelled:'bg-red-100 text-red-700',
}

const barData = Array.from({length:14},(_,i)=>({
  day:`D${i+1}`,
  prepaid:Math.floor(Math.random()*60+20),
  cod:Math.floor(Math.random()*30+10),
}))

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm">Order management and tracking</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {label:'Total Orders',value:'3,218',color:'text-gray-900'},
          {label:'Completed',value:'1,820',color:'text-emerald-600'},
          {label:'Processing',value:'680',color:'text-blue-600'},
          {label:'Cancelled',value:'198',color:'text-red-500'},
        ].map(s=>(
          <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
            <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl p-5 border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          COD vs Prepaid — Last 14 Days
        </h2>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData}>
            <XAxis dataKey="day" tick={{fontSize:10}} />
            <YAxis tick={{fontSize:10}} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="prepaid" fill="#10b981" radius={[3,3,0,0]} name="Prepaid" />
            <Bar dataKey="cod" fill="#3b82f6" radius={[3,3,0,0]} name="COD" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                {['#Order','Customer','Amount','Status','Type','Date'].map(h=>(
                  <th key={h} className="text-left px-4 py-3 text-xs 
                    font-medium text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    #{o.id}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{o.customer}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    ৳{o.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium 
                      ${statusStyle[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{o.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
