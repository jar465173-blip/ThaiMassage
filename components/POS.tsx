import React, { useState } from 'react';
import { MOCK_SERVICES, MOCK_STAFF, MOCK_CUSTOMERS } from '../constants';
import { Service, Staff, Customer } from '../types';
import { Search, Plus, Trash2, CreditCard, Banknote, QrCode } from 'lucide-react';

interface CartItem {
  id: string;
  service: Service;
  staffId: string;
  price: number;
}

const POS: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const addToCart = (service: Service) => {
    const newItem: CartItem = {
      id: Math.random().toString(36).substr(2, 9),
      service,
      staffId: '', // Needs to be selected
      price: service.price
    };
    setCart([...cart, newItem]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateStaff = (itemId: string, staffId: string) => {
    setCart(cart.map(item => item.id === itemId ? { ...item, staffId } : item));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
      {/* Left: Services Catalog */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="ค้นหาบริการ..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button className="px-4 py-1.5 rounded-full bg-primary-600 text-white text-sm font-medium whitespace-nowrap">ทั้งหมด</button>
            <button className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-medium whitespace-nowrap">นวดตัว</button>
            <button className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-medium whitespace-nowrap">สปาแพ็คเกจ</button>
            <button className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 text-sm font-medium whitespace-nowrap">สินค้า</button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_SERVICES.map(service => (
            <button 
              key={service.id}
              onClick={() => addToCart(service)}
              className="flex flex-col items-start p-4 rounded-xl border border-slate-200 hover:border-primary-500 hover:shadow-md transition-all bg-slate-50 text-left group"
            >
              <div className="w-full aspect-video bg-white rounded-lg mb-3 flex items-center justify-center text-primary-200">
                 {/* Placeholder for service image */}
                 <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-600 font-bold text-lg">
                    {service.name.charAt(0)}
                 </div>
              </div>
              <h4 className="font-semibold text-slate-800 text-sm line-clamp-2 group-hover:text-primary-600">{service.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{service.durationMinutes} นาที</p>
              <p className="mt-2 font-bold text-primary-700">฿{service.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Cart & Checkout */}
      <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
        {/* Customer Select */}
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-700 mb-2">ลูกค้า</h3>
          <select 
            className="w-full p-2 rounded-lg border border-slate-300 text-sm bg-white"
            onChange={(e) => setSelectedCustomer(MOCK_CUSTOMERS.find(c => c.id === e.target.value) || null)}
          >
            <option value="">ลูกค้าทั่วไป (Walk-in)</option>
            {MOCK_CUSTOMERS.map(c => (
              <option key={c.id} value={c.id}>{c.nickname} ({c.phone})</option>
            ))}
          </select>
          {selectedCustomer && selectedCustomer.medicalNotes && (
             <div className="mt-2 p-2 bg-rose-50 border border-rose-100 rounded text-xs text-rose-700 font-medium">
                ⚠️ หมายเหตุ: {selectedCustomer.medicalNotes}
             </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                 <Plus className="w-8 h-8 text-slate-300" />
               </div>
               <p>ยังไม่มีรายการ</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={item.id} className="relative pl-4 border-l-2 border-primary-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-slate-800 text-sm">{item.service.name}</h5>
                    <p className="text-xs text-slate-500">฿{item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500">
                    <Trash2 size={16} />
                  </button>
                </div>
                
                {/* Assign Staff */}
                <div className="mt-2">
                   <select 
                      value={item.staffId} 
                      onChange={(e) => updateStaff(item.id, e.target.value)}
                      className={`w-full text-xs p-1.5 rounded border ${item.staffId ? 'border-slate-300' : 'border-amber-300 bg-amber-50'}`}
                   >
                     <option value="">เลือกหมอ...</option>
                     {MOCK_STAFF.map(s => (
                       <option key={s.id} value={s.id}>{s.nickname}</option>
                     ))}
                   </select>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals & Payment */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">รวมเงิน</span>
              <span className="font-medium">฿{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">ภาษี (0%)</span>
              <span className="font-medium">฿0</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-slate-800 pt-2 border-t border-slate-200">
              <span>ยอดสุทธิ</span>
              <span className="text-primary-700">฿{subtotal}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors">
              <Banknote size={20} className="mb-1" />
              <span className="text-xs font-medium">เงินสด</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors">
              <QrCode size={20} className="mb-1" />
              <span className="text-xs font-medium">โอนเงิน</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2 bg-white border border-slate-200 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors">
              <CreditCard size={20} className="mb-1" />
              <span className="text-xs font-medium">บัตรเครดิต</span>
            </button>
          </div>
          <button className="w-full mt-4 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all">
            รับเงิน ฿{subtotal}
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;