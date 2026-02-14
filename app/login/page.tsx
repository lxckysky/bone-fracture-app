'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/');
        } catch (err: any) {
            console.error("Login failed", err);
            setError(err.message || 'Invalid email or password');
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
                                <LogIn className="text-cyan-400" size={40} />
                            </div>
                            <h1 className="text-3xl font-bold">Welcome Back</h1>
                            <p className="text-slate-400">Sign in to access your medical analysis history</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Demo Credentials Info */}
                            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-sm">
                                <p className="font-semibold text-cyan-400 mb-2">Demo Accounts:</p>
                                <div className="space-y-1 text-slate-300">
                                    <p>• User: user@test.com</p>
                                    <p>• Doctor: doctor@test.com</p>
                                    <p>• Admin: admin@test.com</p>
                                    <p className="text-slate-400 mt-2">Password for all: <strong>demo123</strong></p>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-2 text-red-400">
                                    <AlertCircle size={20} />
                                    <p>{error}</p>
                                </div>
                            )}

                            <div>
                                <label htmlFor="email">Email Address</label>
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
                                <label htmlFor="password">Password</label>
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

                            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </Button>

                            <div className="text-center text-slate-400">
                                Don&apos;t have an account?{' '}
                                <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                                    Sign Up
                                </Link>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
