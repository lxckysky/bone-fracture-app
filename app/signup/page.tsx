'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardBody, CardHeader } from '@/components/ui/card';

export default function SignupPage() {
    const router = useRouter();
    const { register } = useAuth(); // Changed from signup to register
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => { // Added async
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await register(email, name, password);
            // If successful, register sets the user or throws
            // If API.register works, we usually get logged in or need to verify email
            // But we disabled email verification, so we should be logged in.
            router.push('/');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
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
                            <h1 className="text-3xl font-bold">Create Account</h1>
                            <p className="text-slate-400">Join our medical analysis platform</p>
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
                                <label htmlFor="name">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="pl-10 w-full"
                                        required
                                    />
                                </div>
                            </div>

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

                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
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
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>

                            <div className="text-center text-slate-400">
                                Already have an account?{' '}
                                <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                                    Sign In
                                </Link>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
