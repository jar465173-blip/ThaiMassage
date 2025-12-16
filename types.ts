export enum BookingStatus {
  RESERVED = 'RESERVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Staff {
  id: string;
  name: string;
  nickname: string;
  imgUrl: string;
  skills: string[];
  isAvailable: boolean;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  category: 'MASSAGE' | 'SPA' | 'PRODUCT';
  commissionRate: number; // Fixed amount or percentage
}

export interface Customer {
  id: string;
  name: string;
  nickname: string;
  phone: string;
  medicalNotes: string; // Important requirement
  visitCount: number;
  lastVisit: string;
}

export interface Booking {
  id: string;
  customerId: string;
  staffId: string;
  serviceId: string;
  startTime: string; // ISO string or "HH:mm" for today
  endTime: string;
  status: BookingStatus;
  note?: string;
}

export interface DailyCommission {
  staffId: string;
  totalJobs: number;
  totalCommission: number;
  guaranteeAmount: number;
  deductions: number;
  tips: number;
  status: 'PENDING' | 'PAID';
}