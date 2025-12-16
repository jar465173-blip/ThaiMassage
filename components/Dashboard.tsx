import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';

const data = [
  { name: '10:00', sales: 400 },
  { name: '12:00', sales: 1200 },
  { name: '14:00', sales: 2400 },
  { name: '16:00', sales: 1800 },
  { name: '18:00', sales: 3200 },
  { name: '20:00', sales: 2100 },
];

const StatCard = ({ title, value, icon: Icon, colorClass, iconColorClass }: { title: string, value: string, icon: any, colorClass: string, iconColorClass: string }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
    <div className={`p-3 rounded-2xl ${colorClass}`}>
      <Icon className={`w-6 h-6 ${iconColorClass}`} />
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Cards with Pastel Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Sales - Green Pastel */}
        <StatCard 
          title="ยอดขายรวม" 
          value="฿12,450" 
          icon={DollarSign} 
          colorClass="bg-primary-100" 
          iconColorClass="text-primary-600" 
        />
        {/* Bookings - Sky Blue Pastel */}
        <StatCard 
          title="จำนวนการจอง" 
          value="24" 
          icon={Calendar} 
          colorClass="bg-sky-100" 
          iconColorClass="text-sky-500" 
        />
        {/* Staff - Violet/Purple Pastel (Soft contrast) */}
        <StatCard 
          title="หมอที่เข้างาน" 
          value="8/12" 
          icon={Users} 
          colorClass="bg-violet-100" 
          iconColorClass="text-violet-500" 
        />
        {/* Growth - Rose/Pink Pastel */}
        <StatCard 
          title="การเติบโต" 
          value="+12.5%" 
          icon={TrendingUp} 
          colorClass="bg-rose-100" 
          iconColorClass="text-rose-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-700 mb-4">แนวโน้มยอดขายรายวัน</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: '#f0fdfa'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                {/* Bar Color: Pastel Teal/Blue Gradient feel using simple fill */}
                <Bar dataKey="sales" fill="#2dd4bf" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-700 mb-4">หมอยอดนิยม</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/40/40?random=${i + 10}`} alt="staff" className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                  <div>
                    <p className="font-medium text-slate-700">พนักงาน {i}</p>
                    <p className="text-xs text-slate-400">{15 - i} งานวันนี้</p>
                  </div>
                </div>
                <span className="font-semibold text-primary-500">฿{(15 - i) * 300}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;