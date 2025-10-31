
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Role } from '../types';
import Button from '../components/common/Button';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-5.62 1.9-4.76 0-8.64-3.88-8.64-8.64s3.88-8.64 8.64-8.64c2.73 0 4.38 1.02 5.36 1.9l2.73-2.73C18.73 1.02 15.98 0 12.48 0 5.88 0 0 5.88 0 12.48s5.88 12.48 12.48 12.48c7.2 0 12.04-4.82 12.04-12.04 0-.8-.08-1.54-.2-2.32H12.48z"/></svg>
);


const LoginPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.user) {
            if (auth.user.role === Role.ADMIN) {
                navigate('/admin/dashboard');
            } else {
                navigate('/student/dashboard');
            }
        }
    }, [auth, navigate]);

    if (!auth) {
        return <div>Loading...</div>;
    }

    const { login, loading } = auth;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg dark:bg-gray-800">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Welcome to Zenith Portal
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Your one-stop place for academic excellence.
                    </p>
                </div>
                
                <div className="space-y-4">
                    <Button 
                        size="lg"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-3"
                        onClick={() => login(Role.STUDENT)}
                        disabled={loading}
                    >
                        <GoogleIcon className="w-5 h-5"/>
                        {loading ? 'Signing In...' : 'Sign in as Student'}
                    </Button>
                    <Button 
                        size="lg"
                        variant="secondary"
                        className="w-full flex items-center justify-center gap-3"
                        onClick={() => login(Role.ADMIN)}
                        disabled={loading}
                    >
                         <GoogleIcon className="w-5 h-5"/>
                        {loading ? 'Signing In...' : 'Admin Login'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
