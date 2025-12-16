import React from 'react';
import { MOCK_CUSTOMERS } from '../constants';
import { Search, User, Phone, History, AlertTriangle } from 'lucide-react';

const CustomerList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-slate-800">ทะเบียนลูกค้า (CRM)</h2>
         <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="ค้นหาชื่อ หรือ เบอร์โทร..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CUSTOMERS.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-xl">
                  {customer.nickname.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{customer.nickname}</h3>
                  <p className="text-sm text-slate-500">{customer.name}</p>
                </div>
              </div>
              <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-medium">
                {customer.visitCount} ครั้ง
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Phone size={16} className="text-slate-400" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <History size={16} className="text-slate-400" />
                ล่าสุดเมื่อ: {new Date(customer.lastVisit).toLocaleDateString('th-TH')}
              </div>
              
              {/* Important Medical Notes */}
              <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg">
                <div className="flex items-center gap-2 mb-1 text-rose-700 font-bold text-xs uppercase tracking-wide">
                  <AlertTriangle size={14} />
                  ข้อมูลสุขภาพ / ข้อควรระวัง
                </div>
                <p className="text-sm text-rose-900 leading-snug">
                  {customer.medicalNotes}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
              <button className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                ประวัติ
              </button>
              <button className="flex-1 py-2 rounded-lg bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
                จองคิว
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;