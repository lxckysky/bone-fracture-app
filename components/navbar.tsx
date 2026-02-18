'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, History, Stethoscope, Shield, LogIn, LogOut, Home, Globe2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { PAGE_TRANSLATIONS, LanguageCode } from '@/lib/i18n';
import { Button } from './ui/button';

export function Navbar() {
    const { user, logout, isAuthenticated, isDoctor, isAdmin } = useAuth();
    const { language, setLanguage } = useLanguage();
    const pathname = usePathname();
    const t = PAGE_TRANSLATIONS[language];

    const isActive = (path: string) => pathname === path;

    const languages: { code: LanguageCode; label: string }[] = [
        { code: 'th', label: '🇹🇭' },
        { code: 'en', label: '🇺🇸' },
        { code: 'zh', label: '🇨🇳' },
        { code: 'ja', label: '🇯🇵' },
    ];

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
                            <h1 className="text-xl font-bold text-white">{t.nav_title}</h1>
                            <p className="text-xs text-slate-400">{t.nav_subtitle}</p>
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
                                <span className="hidden sm:inline">{t.nav_home}</span>
                            </Button>
                        </Link>

                        <Link href="/history">
                            <Button
                                variant={isActive('/history') ? 'primary' : 'ghost'}
                                size="sm"
                                className="flex items-center gap-2"
                            >
                                <History size={18} />
                                <span className="hidden sm:inline">{t.nav_history}</span>
                            </Button>
                        </Link>

                        {isDoctor && (
                            <Link href="/doctor">
                                <Button
                                    variant={isActive('/doctor') ? 'primary' : 'ghost'}
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    <Stethoscope size={18} />
                                    <span className="hidden sm:inline">{t.nav_doctor}</span>
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
                                    <span className="hidden sm:inline">{t.nav_admin}</span>
                                </Button>
                            </Link>
                        )}

                        {/* Language Selector */}
                        <div className="ml-2 flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={`text-sm px-1.5 py-1 rounded transition-all ${language === lang.code
                                        ? 'bg-cyan-500/20 ring-1 ring-cyan-500/50 scale-110'
                                        : 'hover:bg-slate-700/50 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>

                        {/* Auth Buttons */}
                        <div className="ml-2 border-l border-slate-700 pl-4 flex items-center gap-2">
                            {isAuthenticated ? (
                                <>
                                    <div className="hidden md:block text-right mr-2">
                                        <p className="text-sm font-semibold text-white">{user?.name}</p>
                                        <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
                                    </div>
                                    <Button variant="danger" size="sm" onClick={logout} className="flex items-center gap-2">
                                        <LogOut size={18} />
                                        <span className="hidden sm:inline">{t.nav_logout}</span>
                                    </Button>
                                </>
                            ) : (
                                <Link href="/login">
                                    <Button variant="primary" size="sm" className="flex items-center gap-2">
                                        <LogIn size={18} />
                                        <span className="hidden sm:inline">{t.nav_login}</span>
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
