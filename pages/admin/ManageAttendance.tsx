
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import Button from '../../components/common/Button';

const AdminAttendance: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Attendance</h1>
                    <p className="text-gray-500 dark:text-gray-400">Mark daily attendance or upload records.</p>
                </div>
                <Button>Upload CSV</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Attendance Management</CardTitle>
                    <CardDescription>
                        This feature is under construction. It will allow quick marking by class and bulk uploads.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center py-12 text-gray-500">Coming soon!</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminAttendance;
