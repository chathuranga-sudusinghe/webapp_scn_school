
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import Button from '../../components/common/Button';

const AdminFees: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Fees</h1>
                    <p className="text-gray-500 dark:text-gray-400">Set fee amounts and track payments.</p>
                </div>
                <Button>Import Payments</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Fee Management</CardTitle>
                    <CardDescription>
                        This feature is under construction. It will allow setting monthly amounts and marking payments.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center py-12 text-gray-500">Coming soon!</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminFees;
