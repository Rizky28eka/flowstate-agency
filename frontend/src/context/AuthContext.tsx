import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'superadmin' | 'admin' | 'member' | 'client';
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('agencyflow_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);

    // Verify token on mount
    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('agencyflow_token');
            if (token && !user) {
                try {
                    const response = await authAPI.getCurrentUser();
                    setUser(response.data.user);
                    localStorage.setItem('agencyflow_user', JSON.stringify(response.data.user));
                } catch (error) {
                    // Token invalid, clear storage
                    localStorage.removeItem('agencyflow_token');
                    localStorage.removeItem('agencyflow_user');
                }
            }
        };
        verifyToken();
    }, [user]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await authAPI.login({ email, password });
            const { token, user: userData } = response.data;

            localStorage.setItem('agencyflow_token', token);
            localStorage.setItem('agencyflow_user', JSON.stringify(userData));
            setUser(userData);
            navigate('/dashboard');
        } catch (error: any) {
            const message = error.response?.data?.error || 'Login failed';
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, name: string) => {
        setIsLoading(true);
        try {
            const response = await authAPI.register({ email, password, name });
            const { token, user: userData } = response.data;

            localStorage.setItem('agencyflow_token', token);
            localStorage.setItem('agencyflow_user', JSON.stringify(userData));
            setUser(userData);
            navigate('/dashboard');
        } catch (error: any) {
            const message = error.response?.data?.error || 'Registration failed';
            throw new Error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('agencyflow_token');
        localStorage.removeItem('agencyflow_user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
