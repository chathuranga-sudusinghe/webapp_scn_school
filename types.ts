
export enum Role {
  ADMIN = 'admin',
  STUDENT = 'student',
}

export interface User {
  userId: string;
  email: string;
  role: Role;
  fullName: string;
  grade: number;
  class: string;
  admissionNo: string;
  guardianEmail?: string;
  photoURL?: string;
}

export interface Exam {
  examId: string;
  name: string;
  date: string;
  grade: number;
}

export interface Mark {
  markId: string;
  studentId: string;
  examId: string;
  subject: string;
  score: number;
  gradeLetter: string;
  teacherComment?: string;
}

export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LATE = 'Late',
}

export interface AttendanceRecord {
  recordId: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  note?: string;
}

export enum FeeStatus {
    PAID = 'Paid',
    PENDING = 'Pending',
    OVERDUE = 'Overdue',
}

export interface Fee {
  feeId: string;
  studentId: string;
  month: string; // YYYY-MM
  amountDue: number;
  amountPaid: number;
  status: FeeStatus;
  paidAt?: string;
}

export interface TimetableSlot {
  slotId: string;
  grade: number;
  class: string;
  dayOfWeek: number; // 0=Sunday, 1=Monday...
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  subject: string;
  room: string;
  teacher: string;
}

export interface AppSettings {
  whatsappInviteUrl: string;
  schoolName: string;
  logoUrl: string;
  primaryColor: string;
}
