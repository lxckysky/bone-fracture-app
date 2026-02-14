'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole } from '@/types';
import { API } from '@/lib/api';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, name: string, password: string) => Promise<void>;
    isAuthenticated: boolean;
    isLoading: boolean;
    isPublic: boolean;
    isUser: boolean;
    isDoctor: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const currentUser = await API.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error("Session check failed", error);
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const { user: loggedInUser, error } = await API.login(email, password);
            if (error) throw new Error(error);
            if (loggedInUser) {
                setUser(loggedInUser);
                setIsAuthenticated(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, name: string, password: string) => {
        setIsLoading(true);
        try {
            const { user: registeredUser, error } = await API.register(email, password, name);
            if (error) throw new Error(error);
            if (registeredUser) {
                // Auto login or ask to login? Usually auto-login if supabase returns session.
                // Supabase getUser() relies on the session, so we can just set the user.
                setUser(registeredUser);
                setIsAuthenticated(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        await API.logout();
        setUser(null);
        setIsAuthenticated(false);
        // Clear anything else if needed
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        register, // Changed from signup to register
        isAuthenticated,
        isLoading, // Added isLoading
        isPublic: !isAuthenticated, // Derived from isAuthenticated
        isUser: user?.role === 'user',
        isDoctor: user?.role === 'doctor' || user?.role === 'admin',
        isAdmin: user?.role === 'admin',
    };

    if (isLoading) { // Changed from loading to isLoading
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
