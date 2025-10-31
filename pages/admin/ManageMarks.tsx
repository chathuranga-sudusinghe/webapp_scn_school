
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import Button from '../../components/common/Button';

const AdminMarks: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Marks</h1>
                    <p className="text-gray-500 dark:text-gray-400">Upload or edit student marks by exam.</p>
                </div>
                <Button>Upload CSV</Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Marks Management</CardTitle>
                    <CardDescription>
                       This feature is under construction. It will allow bulk uploading of marks via CSV and inline editing.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center py-12 text-gray-500">Coming soon!</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminMarks;
