
import React, { useContext } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './pages/Login';
import StudentLayout from './components/layout/StudentLayout';
import AdminLayout from './components/layout/AdminLayout';
import StudentDashboard from './pages/student/Dashboard';
import StudentMarks from './pages/student/Marks';
import StudentAttendance from './pages/student/Attendance';
import StudentFees from './pages/student/Fees';
import StudentTimetable from './pages/student/Timetable';
import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/ManageStudents';
import AdminMarks from './pages/admin/ManageMarks';
import AdminAttendance from './pages/admin/ManageAttendance';
import AdminFees from './pages/admin/ManageFees';
import AdminTimetable from './pages/admin/ManageTimetable';
import AdminSettings from './pages/admin/Settings';
import { Role } from './types';

const StudentProtectedRoute: React.FC = () => {
    const auth = useContext(AuthContext);
    if (!auth || auth.loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    return auth.user && auth.user.role === Role.STUDENT ? <StudentLayout><Outlet /></StudentLayout> : <Navigate to="/" />;
};

const AdminProtectedRoute: React.FC = () => {
    const auth = useContext(AuthContext);
    if (!auth || auth.loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    return auth.user && auth.user.role === Role.ADMIN ? <AdminLayout><Outlet /></AdminLayout> : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            
            <Route element={<StudentProtectedRoute />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/marks" element={<StudentMarks />} />
              <Route path="/student/attendance" element={<StudentAttendance />} />
              <Route path="/student/fees" element={<StudentFees />} />
              <Route path="/student/timetable" element={<StudentTimetable />} />
            </Route>

            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/students" element={<AdminStudents />} />
              <Route path="/admin/marks" element={<AdminMarks />} />
              <Route path="/admin/attendance" element={<AdminAttendance />} />
              <Route path="/admin/fees" element={<AdminFees />} />
              <Route path="/admin/timetable" element={<AdminTimetable />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
