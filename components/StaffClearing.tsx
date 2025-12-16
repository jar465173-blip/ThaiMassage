import React from 'react';
import { MOCK_STAFF, MOCK_COMMISSIONS } from '../constants';
import { DailyCommission, Staff } from '../types';
import { CheckCircle, AlertCircle, DollarSign } from 'lucide-react';

const StaffClearing: React.FC = () => {
  const getStaffName = (id: string) => MOCK_STAFF.find(s => s.id === id)?.nickname || id;

  const calculateNet = (comm: DailyCommission) => {
    // Logic: If commission < guarantee, add difference. Then add tips, subtract deductions.
    const basePay = Math.max(comm.totalCommission, comm.guaranteeAmount);
    return basePay + comm.tips - comm.deductions;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">จัดการค่ามือ (Clearing)</h2>
          <p className="text-slate-500">สรุปยอดและจ่ายค่ามือหมอประจำวัน</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">วันที่</p>
          <p className="font-semibold text-slate-800">{new Date().toLocaleDateString('th-TH')}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-slate-600 text-sm">พนักงาน</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-center">จำนวนงาน</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-right">ค่ามือ</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-right">ประกันมือ</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-right">ทิป</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-right">หัก</th>
              <th className="p-4 font-semibold text-primary-700 text-sm text-right">รับสุทธิ</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-center">สถานะ</th>
              <th className="p-4 font-semibold text-slate-600 text-sm text-center">ดำเนินการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_COMMISSIONS.map((comm) => {
              const net = calculateNet(comm);
              const isGuaranteeTriggered = comm.totalCommission < comm.guaranteeAmount;

              return (
                <tr key={comm.staffId} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="font-medium text-slate-800">{getStaffName(comm.staffId)}</div>
                    <div className="text-xs text-slate-400">ID: {comm.staffId}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold">
                      {comm.totalJobs}
                    </span>
                  </td>
                  <td className="p-4 text-right text-slate-600">฿{comm.totalCommission}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className={`text-sm ${isGuaranteeTriggered ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                        ฿{comm.guaranteeAmount}
                      </span>
                      {isGuaranteeTriggered && <AlertCircle size={14} className="text-rose-500" />}
                    </div>
                  </td>
                  <td className="p-4 text-right text-emerald-600">+฿{comm.tips}</td>
                  <td className="p-4 text-right text-rose-600">-฿{comm.deductions}</td>
                  <td className="p-4 text-right">
                    <span className="text-lg font-bold text-primary-700">฿{net}</span>
                  </td>
                  <td className="p-4 text-center">
                    {comm.status === 'PAID' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        <CheckCircle size={12} /> จ่ายแล้ว
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                        รอจ่าย
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {comm.status === 'PENDING' ? (
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-colors">
                        เคลียร์ยอด
                      </button>
                    ) : (
                      <button className="text-slate-400 cursor-not-allowed px-3 py-1.5 text-xs font-medium" disabled>
                        ใบเสร็จ
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary-50 p-6 rounded-xl border border-primary-100">
           <h3 className="text-primary-800 font-semibold mb-2">ยอดจ่ายออกวันนี้</h3>
           <p className="text-3xl font-bold text-primary-600">฿1,450</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200">
           <h3 className="text-slate-800 font-semibold mb-2">ยอดรอเคลียร์</h3>
           <p className="text-3xl font-bold text-amber-500">฿750</p>
        </div>
      </div>
    </div>
  );
};

export default StaffClearing;