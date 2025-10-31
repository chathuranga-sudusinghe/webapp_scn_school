
import React, { createContext, useState, ReactNode } from 'react';
import { User, Role } from '../types';
import { mockUsers } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (role: Role) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = (role: Role) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (role === Role.ADMIN) {
        const adminUser = mockUsers.find(u => u.role === Role.ADMIN);
        setUser(adminUser || null);
        navigate('/admin/dashboard');
      } else {
        const studentUser = mockUsers.find(u => u.role === Role.STUDENT);
        setUser(studentUser || null);
        navigate('/student/dashboard');
      }
      setLoading(false);
    }, 500);
  };

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
