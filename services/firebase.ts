
import {
  User,
  Role,
  Exam,
  Mark,
  AttendanceRecord,
  AttendanceStatus,
  Fee,
  FeeStatus,
  TimetableSlot,
  AppSettings,
} from '../types';

// --- MOCK DATA ---

export const mockUsers: User[] = [
  { userId: 'admin01', email: 'teacher@zenith.edu', role: Role.ADMIN, fullName: 'Dr. Evelyn Reed', grade: 0, class: 'N/A', admissionNo: 'T01', photoURL: `https://picsum.photos/seed/admin/100` },
  { userId: 'student01', email: 'liam.p@zenith.edu', role: Role.STUDENT, fullName: 'Liam Patel', grade: 10, class: 'A', admissionNo: 'S1001', photoURL: `https://picsum.photos/seed/liam/100` },
  { userId: 'student02', email: 'olivia.c@zenith.edu', role: Role.STUDENT, fullName: 'Olivia Chen', grade: 10, class: 'A', admissionNo: 'S1002', photoURL: `https://picsum.photos/seed/olivia/100` },
  { userId: 'student03', email: 'noah.b@zenith.edu', role: Role.STUDENT, fullName: 'Noah Brown', grade: 11, class: 'B', admissionNo: 'S1101', photoURL: `https://picsum.photos/seed/noah/100` },
];

export const mockExams: Exam[] = [
    { examId: 'exam01', name: 'Term 1 Midterm - 2024', date: '2024-03-15', grade: 10 },
    { examId: 'exam02', name: 'Term 1 Finals - 2024', date: '2024-05-20', grade: 10 },
];

export const mockMarks: Mark[] = [
    // Liam Patel's marks for Term 1 Finals
    { markId: 'm01', studentId: 'student01', examId: 'exam02', subject: 'Mathematics', score: 88, gradeLetter: 'A' },
    { markId: 'm02', studentId: 'student01', examId: 'exam02', subject: 'Physics', score: 92, gradeLetter: 'A+' },
    { markId: 'm03', studentId: 'student01', examId: 'exam02', subject: 'Chemistry', score: 85, gradeLetter: 'A' },
    { markId: 'm04', studentId: 'student01', examId: 'exam02', subject: 'English', score: 78, gradeLetter: 'B+' },
    // Olivia Chen's marks for Term 1 Finals
    { markId: 'm05', studentId: 'student02', examId: 'exam02', subject: 'Mathematics', score: 95, gradeLetter: 'A+' },
    { markId: 'm06', studentId: 'student02', examId: 'exam02', subject: 'Physics', score: 89, gradeLetter: 'A' },
];

export const mockAttendance: AttendanceRecord[] = [
    { recordId: 'att01', studentId: 'student01', date: '2024-09-02', status: AttendanceStatus.PRESENT },
    { recordId: 'att02', studentId: 'student01', date: '2024-09-03', status: AttendanceStatus.PRESENT },
    { recordId: 'att03', studentId: 'student01', date: '2024-09-04', status: AttendanceStatus.ABSENT, note: 'Doctor appointment' },
    { recordId: 'att04', studentId: 'student01', date: '2024-09-05', status: AttendanceStatus.LATE },
];

export const mockFees: Fee[] = [
    { feeId: 'f01', studentId: 'student01', month: '2024-08', amountDue: 500, amountPaid: 500, status: FeeStatus.PAID, paidAt: '2024-08-05' },
    { feeId: 'f02', studentId: 'student01', month: '2024-09', amountDue: 500, amountPaid: 0, status: FeeStatus.PENDING },
    { feeId: 'f03', studentId: 'student02', month: '2024-09', amountDue: 500, amountPaid: 500, status: FeeStatus.PAID, paidAt: '2024-09-02' },
];

export const mockTimetable: TimetableSlot[] = [
    // Monday for Grade 10, Class A
    { slotId: 'ts01', grade: 10, class: 'A', dayOfWeek: 1, startTime: '09:00', endTime: '10:00', subject: 'Mathematics', room: '101', teacher: 'Mr. Davis' },
    { slotId: 'ts02', grade: 10, class: 'A', dayOfWeek: 1, startTime: '10:00', endTime: '11:00', subject: 'Physics', room: '203', teacher: 'Dr. Reed' },
    // Tuesday for Grade 10, Class A
    { slotId: 'ts03', grade: 10, class: 'A', dayOfWeek: 2, startTime: '09:00', endTime: '10:00', subject: 'Chemistry', room: '204', teacher: 'Ms. Curie' },
];

let mockSettings: AppSettings = {
    schoolName: 'Zenith Secondary School',
    whatsappInviteUrl: 'https://chat.whatsapp.com/yourSchoolInvite',
    logoUrl: '/logo.svg',
    primaryColor: '#007BFF'
};

// --- MOCK API FUNCTIONS ---

const simulateDelay = <T,>(data: T): Promise<T> => 
  new Promise(resolve => setTimeout(() => resolve(data), 300));

// Student Data
export const getStudentDashboardData = (studentId: string) => {
    const latestExam = mockExams.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    const latestMarks = mockMarks.filter(m => m.studentId === studentId && m.examId === latestExam.examId);
    
    const attendance = mockAttendance.filter(a => a.studentId === studentId);
    const presentCount = attendance.filter(a => a.status === AttendanceStatus.PRESENT).length;
    const totalDays = attendance.length;
    const attendancePercentage = totalDays > 0 ? (presentCount / totalDays) * 100 : 100;

    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    const currentFee = mockFees.find(f => f.studentId === studentId && f.month === currentMonth) || { status: FeeStatus.PENDING };
    
    const today = new Date().getDay();
    const studentInfo = mockUsers.find(u => u.userId === studentId);
    const todaysClasses = mockTimetable.filter(t => t.dayOfWeek === today && t.grade === studentInfo?.grade && t.class === studentInfo.class);
    
    return simulateDelay({ latestMarks, attendancePercentage, currentFee, todaysClasses, latestExamName: latestExam.name });
};

export const getStudentMarks = (studentId: string) => {
    const marksByExam: Record<string, { examName: string; marks: Mark[] }> = {};
    mockMarks.filter(m => m.studentId === studentId).forEach(mark => {
        const exam = mockExams.find(e => e.examId === mark.examId);
        if (exam) {
            if (!marksByExam[exam.examId]) {
                marksByExam[exam.examId] = { examName: exam.name, marks: [] };
            }
            marksByExam[exam.examId].marks.push(mark);
        }
    });
    return simulateDelay(Object.values(marksByExam));
};

export const getStudentAttendance = (studentId: string) => {
    return simulateDelay(mockAttendance.filter(a => a.studentId === studentId));
};

export const getStudentFees = (studentId: string) => {
    return simulateDelay(mockFees.filter(f => f.studentId === studentId).sort((a, b) => b.month.localeCompare(a.month)));
};

export const getStudentTimetable = (studentId: string) => {
    const student = mockUsers.find(u => u.userId === studentId);
    if (!student) return simulateDelay([]);
    return simulateDelay(mockTimetable.filter(t => t.grade === student.grade && t.class === student.class));
};

// Admin Data
export const getAdminDashboardData = () => {
    const studentCount = mockUsers.filter(u => u.role === Role.STUDENT).length;
    const feesPending = mockFees.filter(f => f.status === FeeStatus.PENDING).length;
    const totalAbsentToday = mockAttendance.filter(a => a.date === new Date().toISOString().slice(0,10) && a.status === AttendanceStatus.ABSENT).length;
    return simulateDelay({ studentCount, feesPending, totalAbsentToday });
};
export const getAdminStudents = () => simulateDelay(mockUsers.filter(u => u.role === Role.STUDENT));
export const getAdminExams = () => simulateDelay(mockExams);
export const getAdminMarks = () => simulateDelay(mockMarks);
export const getAdminAttendance = () => simulateDelay(mockAttendance);
export const getAdminFees = () => simulateDelay(mockFees);
export const getAdminTimetable = () => simulateDelay(mockTimetable);

// Settings
export const getAppSettings = () => simulateDelay(mockSettings);
export const updateAppSettings = (newSettings: AppSettings) => {
    mockSettings = newSettings;
    return simulateDelay(mockSettings);
};
