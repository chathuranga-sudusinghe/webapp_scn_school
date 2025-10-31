
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';
import { getStudentFees } from '../../services/firebase';
import { Fee, FeeStatus } from '../../types';

const FeeStatusBadge: React.FC<{ status: FeeStatus }> = ({ status }) => {
    const statusClasses = {
        [FeeStatus.PAID]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        [FeeStatus.PENDING]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        [FeeStatus.OVERDUE]: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
            {status}
        </span>
    );
};

const StudentFees: React.FC = () => {
    const { user } = useAuth();
    const [fees, setFees] = useState<Fee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getStudentFees(user.userId).then(data => {
                setFees(data);
                setLoading(false);
            });
        }
    }, [user]);

    if (loading) {
        return <div>Loading fees information...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <h1 className="text-3xl font-bold">Fee History</h1>
                <Card>
                    <CardContent className="p-0">
                        <ul className="divide-y dark:divide-gray-700">
                            {fees.map(fee => (
                                <li key={fee.feeId} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <div>
                                        <p className="font-semibold text-lg">
                                            {new Date(fee.month + '-02').toLocaleString('default', { month: 'long', year: 'numeric' })}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Due: ${fee.amountDue.toFixed(2)} | Paid: ${fee.amountPaid.toFixed(2)}
                                        </p>
                                    </div>
                                    <FeeStatusBadge status={fee.status} />
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
            
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>How to Pay</CardTitle>
                        <CardDescription>Instructions for fee payment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm">Please make payments through the school's administrative office or via bank transfer.</p>
                        <div>
                            <h4 className="font-semibold">Bank Details</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Bank Name: Zenith National Bank</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Account: 123-456-7890</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Reference: Your Admission No.</p>
                        </div>
                        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex justify-center">
                            <p className="text-sm font-medium">QR Code Placeholder</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default StudentFees;
