
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import { getStudentAttendance } from '../../services/firebase';
import { AttendanceRecord, AttendanceStatus } from '../../types';

const CalendarDay: React.FC<{ date: Date; status?: AttendanceStatus, note?: string }> = ({ date, status, note }) => {
    const statusClasses: Record<AttendanceStatus, string> = {
        [AttendanceStatus.PRESENT]: 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800',
        [AttendanceStatus.ABSENT]: 'bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-800',
        [AttendanceStatus.LATE]: 'bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800',
    };
    const dayClass = status ? statusClasses[status] : 'bg-gray-50 dark:bg-gray-700/50';

    return (
        <div className={`h-24 p-2 border rounded-md relative group ${dayClass}`}>
            <span className="font-semibold">{date.getDate()}</span>
            {note && (
                <div className="absolute bottom-1 left-1 right-1 hidden group-hover:block bg-black/70 text-white text-xs p-1 rounded-md z-10">
                    {note}
                </div>
            )}
        </div>
    );
};

const StudentAttendance: React.FC = () => {
    const { user } = useAuth();
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (user) {
            setLoading(true);
            getStudentAttendance(user.userId).then(data => {
                setRecords(data);
                setLoading(false);
            });
        }
    }, [user]);

    const changeMonth = (offset: number) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1));
    const emptyDays = Array.from({ length: firstDayOfMonth });
    
    const recordsByDate = records.reduce((acc, record) => {
        acc[record.date] = record;
        return acc;
    }, {} as Record<string, AttendanceRecord>);

    const summary = records.reduce((acc, record) => {
        acc[record.status] = (acc[record.status] || 0) + 1;
        return acc;
    }, {} as Record<AttendanceStatus, number>);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">My Attendance</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card><CardContent className="pt-6"><div className="text-lg font-bold">{summary.Present || 0}</div><p className="text-sm text-gray-500">Days Present</p></CardContent></Card>
                <Card><CardContent className="pt-6"><div className="text-lg font-bold">{summary.Absent || 0}</div><p className="text-sm text-gray-500">Days Absent</p></CardContent></Card>
                <Card><CardContent className="pt-6"><div className="text-lg font-bold">{summary.Late || 0}</div><p className="text-sm text-gray-500">Days Late</p></CardContent></Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </CardTitle>
                        <div className="space-x-2">
                            <button onClick={() => changeMonth(-1)}>&larr;</button>
                            <button onClick={() => changeMonth(1)}>&rarr;</button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day} className="text-center font-bold text-sm text-gray-500">{day}</div>)}
                        {emptyDays.map((_, i) => <div key={`empty-${i}`}></div>)}
                        {calendarDays.map(date => {
                             const dateString = date.toISOString().slice(0, 10);
                             const record = recordsByDate[dateString];
                             return <CalendarDay key={dateString} date={date} status={record?.status} note={record?.note} />
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentAttendance;
