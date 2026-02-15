'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, History, Stethoscope, Shield, LogIn, LogOut, Home } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from './ui/button';

export function Navbar() {
    const { user, logout, isAuthenticated, isDoctor, isAdmin } = useAuth();
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-40 shadow-lg">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                            <Activity className="text-white" size={28} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Bone Fracture Analysis Website</h1>
                            <p className="text-xs text-slate-400">Professional Analysis System</p>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-2">
                        <Link href="/">
                            <Button
                                variant={isActive('/') ? 'primary' : 'ghost'}
                                size="sm"
                                className="flex items-center gap-2"
                            >
                                <Home size={18} />
                                <span className="hidden sm:inline">Home</span>
                            </Button>
                        </Link>

                        {isAuthenticated && (
                            <Link href="/history">
                                <Button
                                    variant={isActive('/history') ? 'primary' : 'ghost'}
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <History size={18} />
                                    <span className="hidden sm:inline">History</span>
                                </Button>
                            </Link>
                        )}

                        {isDoctor && (
                            <Link href="/doctor">
                                <Button
                                    variant={isActive('/doctor') ? 'primary' : 'ghost'}
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <Stethoscope size={18} />
                                    <span className="hidden sm:inline">Doctor</span>
                                </Button>
                            </Link>
                        )}

                        {isAdmin && (
                            <Link href="/admin">
                                <Button
                                    variant={isActive('/admin') ? 'primary' : 'ghost'}
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <Shield size={18} />
                                    <span className="hidden sm:inline">Admin</span>
                                </Button>
                            </Link>
                        )}

                        {/* Auth Buttons */}
                        <div className="ml-4 border-l border-slate-700 pl-4 flex items-center gap-2">
                            {isAuthenticated ? (
                                <>
                                    <div className="hidden md:block text-right mr-2">
                                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                                        <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                                    </div>
                                    <Button variant="danger" size="sm" onClick={logout} className="flex items-center gap-2">
                                        <LogOut size={18} />
                                        <span className="hidden sm:inline">Logout</span>
                                    </Button>
                                </>
                            ) : (
                                <Link href="/login">
                                    <Button variant="primary" size="sm" className="flex items-center gap-2">
                                        <LogIn size={18} />
                                        <span className="hidden sm:inline">Login</span>
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
