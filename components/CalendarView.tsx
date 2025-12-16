import React, { useMemo } from 'react';
import { MOCK_STAFF, MOCK_BOOKINGS, TIME_SLOTS, SHOP_OPEN_TIME } from '../constants';
import { BookingStatus } from '../types';
import { Plus, User, Clock } from 'lucide-react';

const CalendarView: React.FC = () => {
  // Helper to calculate position and width based on time
  const getPositionStyles = (start: string, end: string) => {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);

    const startOffsetMinutes = (startHour - SHOP_OPEN_TIME) * 60 + startMin;
    const durationMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);

    // Assuming each hour is 120px wide
    const pixelsPerMinute = 2; 
    
    return {
      left: `${startOffsetMinutes * pixelsPerMinute}px`,
      width: `${durationMinutes * pixelsPerMinute}px`,
    };
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      // Completed/Paid = Pastel Green
      case BookingStatus.COMPLETED: return 'bg-primary-100 border-primary-200 text-primary-700'; 
      // In Progress = Pastel Blue (Sky)
      case BookingStatus.IN_PROGRESS: return 'bg-sky-100 border-sky-200 text-sky-700'; 
      // Reserved = Light Gray
      case BookingStatus.RESERVED: return 'bg-slate-100 border-slate-200 text-slate-500'; 
      default: return 'bg-gray-50 border-gray-100';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      {/* Header Controls */}
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white/50">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-slate-700">ตารางการจอง</h2>
          <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex items-center gap-3 text-xs mr-4 font-medium text-slate-600">
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-200"></span> จองแล้ว</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-sky-300"></span> กำลังนวด</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary-400"></span> จ่ายแล้ว</div>
           </div>
           <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm shadow-primary-200 transition-all hover:shadow-md">
            <Plus size={18} /> จองคิวใหม่
          </button>
        </div>
      </div>

      {/* Timeline Grid */}
      <div className="flex-1 overflow-auto relative timeline-scroll">
        <div className="min-w-[1500px]"> {/* Force horizontal scroll */}
          
          {/* Header Row (Times) */}
          <div className="sticky top-0 z-20 bg-white/95 border-b border-slate-100 flex h-12 shadow-sm">
            <div className="w-48 flex-shrink-0 sticky left-0 z-30 bg-white border-r border-slate-100 flex items-center justify-center font-bold text-slate-600 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
              หมอ / เวลา
            </div>
            <div className="flex flex-1 relative">
              {TIME_SLOTS.map((time, index) => (
                // Only show hour markers or every slot depending on space
                index % 2 === 0 && (
                  <div key={time} className="absolute text-xs font-medium text-slate-400 border-l border-slate-100 h-full pl-2 pt-3" style={{ left: `${(index * 30 * 2)}px` }}>
                    {time}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Staff Rows */}
          {MOCK_STAFF.map((staff) => (
            <div key={staff.id} className="flex h-24 border-b border-slate-50 relative hover:bg-sky-50/30 transition-colors group">
              {/* Staff Info (Sticky Left) */}
              <div className="w-48 flex-shrink-0 sticky left-0 z-10 bg-white group-hover:bg-slate-50/80 border-r border-slate-100 flex items-center p-3 gap-3 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transition-colors">
                <div className="relative">
                  <img src={staff.imgUrl} alt={staff.nickname} className="w-12 h-12 rounded-full object-cover ring-4 ring-slate-50" />
                  <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${staff.isAvailable ? 'bg-primary-400' : 'bg-rose-400'}`}></span>
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-700">{staff.nickname}</p>
                  <p className="text-xs text-slate-400 truncate w-24">ID: {staff.id}</p>
                </div>
              </div>

              {/* Time Slots Background */}
              <div className="flex-1 relative bg-[linear-gradient(90deg,transparent_59px,#f8fafc_60px)] bg-[length:60px_100%]">
                 {/* This creates the vertical grid lines every 30 mins (60px) */}
                 
                 {/* Bookings for this staff */}
                 {MOCK_BOOKINGS.filter(b => b.staffId === staff.id).map(booking => {
                   const style = getPositionStyles(booking.startTime, booking.endTime);
                   const statusColor = getStatusColor(booking.status);
                   
                   return (
                     <div 
                        key={booking.id}
                        className={`absolute top-3 bottom-3 rounded-lg border text-xs p-2 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden whitespace-nowrap z-0 ${statusColor}`}
                        style={style}
                     >
                       <div className="flex items-center gap-1.5 font-bold">
                         <Clock size={12} className="opacity-70" /> {booking.startTime} - {booking.endTime}
                       </div>
                       <div className="mt-1 flex items-center gap-1.5 truncate font-medium opacity-90">
                          <User size={12} className="opacity-70" /> ลูกค้า: {booking.customerId}
                       </div>
                     </div>
                   );
                 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;