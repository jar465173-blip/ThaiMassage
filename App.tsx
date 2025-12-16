import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Calculator, Users, UserCircle, Menu, Bell } from 'lucide-react';
import Dashboard from './components/Dashboard';
import CalendarView from './components/CalendarView';
import POS from './components/POS';
import StaffClearing from './components/StaffClearing';
import CustomerList from './components/CustomerList';

// Navigation Items
const NAV_ITEMS = [
  { id: 'dashboard', label: 'ภาพรวม (Dashboard)', icon: LayoutDashboard },
  { id: 'calendar', label: 'ตารางจอง (Calendar)', icon: Calendar },
  { id: 'pos', label: 'ชำระเงิน (POS)', icon: Calculator },
  { id: 'staff', label: 'ค่ามือหมอ (Staff)', icon: Users },
  { id: 'customers', label: 'ข้อมูลลูกค้า (CRM)', icon: UserCircle },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'calendar': return <CalendarView />;
      case 'pos': return <POS />;
      case 'staff': return <StaffClearing />;
      case 'customers': return <CustomerList />;
      default: return <Dashboard />;
    }
  };

  return (
    // Updated background to a soft Green-Blue Gradient
    <div className="flex h-screen bg-gradient-to-br from-green-50 via-white to-sky-100 overflow-hidden font-sans">
      {/* Sidebar with Glassmorphism effect */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white/90 backdrop-blur-sm border-r border-slate-200/60 shadow-lg shadow-slate-200/50 transition-all duration-300 flex flex-col z-20`}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-100 px-4">
           {isSidebarOpen ? (
             <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-sky-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary-200">ช</div>
               <h1 className="font-bold text-slate-700 text-lg truncate tracking-tight">ช่อฟ้านวดไทย</h1>
             </div>
           ) : (
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-sky-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary-200">ช</div>
           )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-primary-50 to-sky-50 text-primary-700 shadow-sm font-semibold border border-primary-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-primary-500' : ''}`} />
              {isSidebarOpen && <span className="text-sm whitespace-nowrap">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
           <button 
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 text-slate-500"
           >
             <Menu size={20} />
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 shadow-sm sticky top-0 z-10">
           <h2 className="text-xl font-bold text-slate-700 capitalize tracking-tight">
             {NAV_ITEMS.find(i => i.id === activeTab)?.label}
           </h2>
           
           <div className="flex items-center gap-4">
             <button className="relative p-2 rounded-full hover:bg-white text-slate-500 transition-colors">
               <Bell size={20} />
               <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-400 rounded-full border-2 border-white"></span>
             </button>
             <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
               <div className="text-right hidden md:block">
                 <p className="text-sm font-bold text-slate-700">ผู้ดูแลระบบ</p>
                 <p className="text-xs text-slate-500">พนักงานต้อนรับ</p>
               </div>
               <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-primary-400 to-sky-300">
                 <img src="https://picsum.photos/100/100?random=user" alt="User" className="w-full h-full rounded-full border-2 border-white object-cover"/>
               </div>
             </div>
           </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto p-6">
           <div className="max-w-7xl mx-auto h-full">
             {renderContent()}
           </div>
        </div>
      </main>
    </div>
  );
};

export default App;