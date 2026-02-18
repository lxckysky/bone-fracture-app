'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useLanguage } from '@/contexts/language-context';
import { PAGE_TRANSLATIONS } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function SignupPage() {
    const router = useRouter();
    const { register } = useAuth();
    const { language } = useLanguage();
    const t = PAGE_TRANSLATIONS[language];
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError(t.signup_password_mismatch);
            return;
        }

        if (password.length < 6) {
            setError(t.signup_password_short);
            return;
        }

        setLoading(true);

        try {
            await register(email, name, password);
            router.push('/');
        } catch (err: any) {
            setError(err.message || t.signup_failed);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md animate-fade-in">
                <Card>
                    <CardHeader>
                        <div className="text-center space-y-2">
                            <div className="inline-flex p-4 bg-cyan-500/10 rounded-full mb-4">
                                <UserPlus className="text-cyan-400" size={40} />
                            </div>
                            <h1 className="text-3xl font-bold">{t.signup_title}</h1>
                            <p className="text-slate-400">{t.signup_subtitle}</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-2 text-red-400">
                                    <AlertCircle size={20} />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div>
                                <label htmlFor="name">{t.signup_name}</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder={t.signup_name_placeholder}
                                        className="pl-10 w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email">{t.signup_email}</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="pl-10 w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password">{t.signup_password}</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword">{t.signup_confirm}</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="pl-10 w-full"
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                                {loading ? t.signup_loading : t.signup_submit}
                            </Button>

                            <div className="text-center text-slate-400">
                                {t.signup_has_account}{' '}
                                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                                    {t.signup_login_link}
                                </Link>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
