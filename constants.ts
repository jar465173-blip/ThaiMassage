import { Staff, Service, Booking, Customer, BookingStatus, DailyCommission } from './types';

export const SHOP_OPEN_TIME = 10; // 10:00
export const SHOP_CLOSE_TIME = 22; // 22:00
export const TIME_SLOTS = Array.from({ length: (SHOP_CLOSE_TIME - SHOP_OPEN_TIME) * 2 }, (_, i) => {
  const hour = SHOP_OPEN_TIME + Math.floor(i / 2);
  const min = i % 2 === 0 ? '00' : '30';
  return `${hour}:${min}`;
});

export const MOCK_STAFF: Staff[] = [
  { id: 'S1', name: 'Somjai', nickname: 'สมใจ', imgUrl: 'https://picsum.photos/100/100?random=1', skills: ['Thai', 'Oil'], isAvailable: true },
  { id: 'S2', name: 'Kanda', nickname: 'กานดา', imgUrl: 'https://picsum.photos/100/100?random=2', skills: ['Foot', 'Thai'], isAvailable: true },
  { id: 'S3', name: 'Malee', nickname: 'มาลี', imgUrl: 'https://picsum.photos/100/100?random=3', skills: ['Aroma', 'Oil'], isAvailable: false },
  { id: 'S4', name: 'Pranee', nickname: 'ปราณี', imgUrl: 'https://picsum.photos/100/100?random=4', skills: ['Thai'], isAvailable: true },
  { id: 'S5', name: 'Wichai', nickname: 'วิชัย', imgUrl: 'https://picsum.photos/100/100?random=5', skills: ['Sport', 'Deep Tissue'], isAvailable: true },
];

export const MOCK_SERVICES: Service[] = [
  { id: 'SV1', name: 'นวดแผนไทย (1 ชม.)', price: 300, durationMinutes: 60, category: 'MASSAGE', commissionRate: 100 },
  { id: 'SV2', name: 'นวดแผนไทย (2 ชม.)', price: 550, durationMinutes: 120, category: 'MASSAGE', commissionRate: 200 },
  { id: 'SV3', name: 'นวดเท้า (1 ชม.)', price: 300, durationMinutes: 60, category: 'MASSAGE', commissionRate: 100 },
  { id: 'SV4', name: 'นวดน้ำมันอโรมา (1 ชม.)', price: 800, durationMinutes: 60, category: 'SPA', commissionRate: 250 },
  { id: 'SV5', name: 'ลูกประคบสมุนไพร', price: 150, durationMinutes: 30, category: 'PRODUCT', commissionRate: 20 },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'C1', name: 'John Doe', nickname: 'คุณจอห์น', phone: '081-111-1111', medicalNotes: 'เจ็บหลังช่วงล่าง ขอแรงน้อยๆ', visitCount: 5, lastVisit: '2023-10-20' },
  { id: 'C2', name: 'Jane Smith', nickname: 'คุณเจน', phone: '089-999-9999', medicalNotes: 'แพ้ยาหม่องสูตรเย็น', visitCount: 12, lastVisit: '2023-10-25' },
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'B1', customerId: 'C1', staffId: 'S1', serviceId: 'SV1', startTime: '10:00', endTime: '11:00', status: BookingStatus.COMPLETED },
  { id: 'B2', customerId: 'C2', staffId: 'S2', serviceId: 'SV4', startTime: '11:30', endTime: '12:30', status: BookingStatus.IN_PROGRESS },
  { id: 'B3', customerId: 'C1', staffId: 'S1', serviceId: 'SV1', startTime: '13:00', endTime: '14:00', status: BookingStatus.RESERVED },
  { id: 'B4', customerId: 'C2', staffId: 'S5', serviceId: 'SV2', startTime: '14:00', endTime: '16:00', status: BookingStatus.RESERVED },
];

export const MOCK_COMMISSIONS: DailyCommission[] = [
  { staffId: 'S1', totalJobs: 3, totalCommission: 450, guaranteeAmount: 400, deductions: 0, tips: 100, status: 'PENDING' },
  { staffId: 'S2', totalJobs: 2, totalCommission: 300, guaranteeAmount: 400, deductions: 50, tips: 50, status: 'PAID' },
  { staffId: 'S3', totalJobs: 0, totalCommission: 0, guaranteeAmount: 300, deductions: 0, tips: 0, status: 'PENDING' }, // Guarantee triggered case
];