
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import { getStudentDashboardData, getAppSettings } from '../../services/firebase';
import { Fee, FeeStatus, Mark, TimetableSlot } from '../../types';
import Button from '../../components/common/Button';

interface DashboardData {
  latestMarks: Mark[];
  attendancePercentage: number;
  currentFee: Partial<Fee>;
  todaysClasses: TimetableSlot[];
  latestExamName: string;
}

const StatCard: React.FC<{ title: string, value: string, description: string, icon: React.ReactNode }> = ({ title, value, description, icon }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </CardContent>
    </Card>
);

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [whatsAppUrl, setWhatsAppUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                try {
                    setLoading(true);
                    const dashboardData = await getStudentDashboardData(user.userId);
                    const settings = await getAppSettings();
                    setData(dashboardData);
                    setWhatsAppUrl(settings.whatsappInviteUrl);
                } catch (error) {
                    console.error("Failed to fetch dashboard data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user]);

    if (loading || !user) {
        return <div>Loading dashboard...</div>;
    }
    
    const averageScore = data?.latestMarks && data.latestMarks.length > 0
        ? (data.latestMarks.reduce((acc, mark) => acc + mark.score, 0) / data.latestMarks.length).toFixed(1)
        : 'N/A';

    const feeStatusColors = {
        [FeeStatus.PAID]: 'text-green-500',
        [FeeStatus.PENDING]: 'text-yellow-500',
        [FeeStatus.OVERDUE]: 'text-red-500',
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Welcome, {user.fullName.split(' ')[0]}!</h1>
                    <p className="text-gray-500 dark:text-gray-400">Here's your academic snapshot for today.</p>
                </div>
                <Button onClick={() => window.open(whatsAppUrl, '_blank')}>Join WhatsApp Group</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatCard 
                    title="Latest Exam Results" 
                    value={`${averageScore}%`}
                    description={`Average in ${data?.latestExamName || 'latest exam'}`}
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/><path d="m10 13-2 2 2 2"/><path d="m14 13 2 2-2 2"/></svg>}
                />
                <StatCard 
                    title="Attendance" 
                    value={`${data?.attendancePercentage.toFixed(0)}%`}
                    description="This month's attendance"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>}
                />
                 <StatCard 
                    title="Fees Status" 
                    value={data?.currentFee?.status || 'Pending'}
                    description="For the current month"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-500"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
                />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Today's Classes</CardTitle>
                    <CardDescription>Your schedule for today. Don't be late!</CardDescription>
                </CardHeader>
                <CardContent>
                    {data?.todaysClasses && data.todaysClasses.length > 0 ? (
                        <ul className="space-y-4">
                            {data.todaysClasses.sort((a,b) => a.startTime.localeCompare(b.startTime)).map(slot => (
                                <li key={slot.slotId} className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{slot.subject}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {slot.startTime} - {slot.endTime} &bull; Room {slot.room}
                                        </p>
                                    </div>
                                    <span className="text-sm font-medium">{slot.teacher}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-gray-500 py-4">No classes scheduled for today. Enjoy your day off!</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentDashboard;
