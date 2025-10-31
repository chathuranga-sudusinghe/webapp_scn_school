
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import Button from '../../components/common/Button';

const AdminTimetable: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Timetable</h1>
                    <p className="text-gray-500 dark:text-gray-400">Create and update class schedules.</p>
                </div>
                <Button>Add New Slot</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Timetable Management</CardTitle>
                    <CardDescription>
                        This feature is under construction. It will allow creating, updating, and cloning weekly schedules.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center py-12 text-gray-500">Coming soon!</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminTimetable;
