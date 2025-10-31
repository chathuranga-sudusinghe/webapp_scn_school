
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import Button from '../../components/common/Button';
import { getAdminStudents } from '../../services/firebase';
import { User } from '../../types';

const AdminStudents: React.FC = () => {
    const [students, setStudents] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAdminStudents().then(data => {
            setStudents(data);
            setLoading(false);
        });
    }, []);

    const filteredStudents = students.filter(student =>
        student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admissionNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading students...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Students</h1>
                    <p className="text-gray-500 dark:text-gray-400">Add, edit, or view student details.</p>
                </div>
                <Button>Add New Student</Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>All Students</CardTitle>
                    <CardDescription>
                        <input
                            type="text"
                            placeholder="Search by name or admission no..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-1/3 mt-2 p-2 border rounded-md bg-transparent dark:border-gray-600"
                        />
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Admission No.</th>
                                    <th scope="col" className="px-6 py-3">Full Name</th>
                                    <th scope="col" className="px-6 py-3">Grade</th>
                                    <th scope="col" className="px-6 py-3">Class</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map(student => (
                                    <tr key={student.userId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-semibold">{student.admissionNo}</td>
                                        <td className="px-6 py-4">{student.fullName}</td>
                                        <td className="px-6 py-4">{student.grade}</td>
                                        <td className="px-6 py-4">{student.class}</td>
                                        <td className="px-6 py-4">{student.email}</td>
                                        <td className="px-6 py-4 space-x-2">
                                            <Button size="sm" variant="outline">Edit</Button>
                                            <Button size="sm" variant="destructive">Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminStudents;
