'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { History as HistoryIcon, Calendar, TrendingUp, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { ConfidenceBar } from '@/components/confidence-bar';
import { API } from '@/lib/api';
import { AnalysisCase } from '@/types';
import { getFractureLabel } from '@/lib/fracture-data';
import { Modal } from '@/components/ui/modal';
import { ImageViewer } from '@/components/image-viewer';
import { getGuestId, isGuestId, getDisplayName } from '@/lib/guest-storage';

export default function HistoryPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading, isDoctor, isAdmin } = useAuth();
    const [cases, setCases] = useState<AnalysisCase[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'reviewed'>('all');
    const [selectedCase, setSelectedCase] = useState<AnalysisCase | null>(null);
    const [userProfiles, setUserProfiles] = useState<Record<string, string>>({});

    useEffect(() => {
        if (authLoading) return;

        const fetchCases = async () => {
            setLoading(true);

            // Determine which cases to fetch based on role
            let allCases: AnalysisCase[] = [];

            if (isDoctor || isAdmin) {
                // Doctors and admins see ALL cases
                allCases = await API.getCases();

                // Fetch user profiles for display
                const users = await API.getUsers();
                const profileMap: Record<string, string> = {};
                users.forEach(u => {
                    profileMap[u.id] = u.name || u.email;
                });
                setUserProfiles(profileMap);
            } else {
                // Regular users and guests see only their own cases
                const currentUserId = user?.id || getGuestId();
                if (currentUserId) {
                    allCases = await API.getCases(currentUserId);
                }
            }

            setCases(allCases);
            setLoading(false);
        };

        fetchCases();
    }, [isAuthenticated, user, router, authLoading, isDoctor, isAdmin]);

    const filteredCases = cases.filter((c) => {
        if (filter === 'all') return true;
        // Merge ai_confirmed and pending_review into 'pending'
        if (filter === 'pending') return c.status === 'pending_review' || c.status === 'ai_confirmed';
        if (filter === 'reviewed') return c.status === 'doctor_confirmed';
        return true;
    });

    const getStatusBadge = (status: string) => {
        const badges = {
            ai_confirmed: 'bg-amber-500/20 text-amber-400 border-amber-500/30', // Same as pending
            pending_review: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
            doctor_confirmed: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        };
        const labels = {
            ai_confirmed: 'Pending Review', // Rename AI Confirmed to Pending Review to reduce redundancy
            pending_review: 'Pending Review',
            doctor_confirmed: 'Doctor Verified',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badges[status as keyof typeof badges]}`}>
                {labels[status as keyof typeof labels]}
            </span>
        );
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <HistoryIcon className="text-cyan-400" size={40} />
                        Case History
                    </h1>
                    <p className="text-slate-400 mt-2">
                        {isDoctor || isAdmin ? 'View all analysis cases from all users' : 'View your past analysis results'}
                    </p>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardBody className="text-center">
                        <p className="text-slate-400 text-sm">Total Scans</p>
                        <p className="text-3xl font-bold text-cyan-400">{cases.length}</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <p className="text-slate-400 text-sm">Pending Review</p>
                        <p className="text-3xl font-bold text-amber-400">
                            {cases.filter((c) => c.status === 'pending_review' || c.status === 'ai_confirmed').length}
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <p className="text-slate-400 text-sm">Doctor Verified</p>
                        <p className="text-3xl font-bold text-cyan-400">
                            {cases.filter((c) => c.status === 'doctor_confirmed').length}
                        </p>
                    </CardBody>
                </Card>
            </div>

            {/* Filter */}
            <Card>
                <CardBody className="flex items-center gap-4">
                    <Filter className="text-cyan-400" size={20} />
                    <span className="font-semibold text-slate-300">Filter:</span>
                    <div className="flex gap-2">
                        {['all', 'pending', 'reviewed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${filter === f
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                            >
                                {f === 'reviewed' ? 'Verified' : f}
                            </button>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/* Cases Grid */}
            {filteredCases.length === 0 ? (
                <Card>
                    <CardBody className="text-center py-12">
                        <HistoryIcon className="mx-auto mb-4 text-slate-600" size={64} />
                        <h3 className="text-xl font-semibold text-slate-400">No analysis records found</h3>
                        <p className="text-slate-500 mt-2">Upload an X-ray image to get started</p>
                    </CardBody>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCases.map((case_) => (
                        <Card key={case_.id} hover onClick={() => setSelectedCase(case_)}>
                            <div className="aspect-square bg-black rounded-t-xl overflow-hidden">
                                <img
                                    src={case_.imageData || case_.imageUrl}
                                    alt="X-ray"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <CardBody className="space-y-3">
                                <div>
                                    <h3 className="font-bold text-lg text-cyan-400">
                                        {getFractureLabel(case_.fractureType, case_.language)}
                                    </h3>
                                    {(isDoctor || isAdmin) && (
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                            {getDisplayName(case_.userId, userProfiles[case_.userId])}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                        <Calendar size={16} className="text-slate-400" />
                                        <span className="text-sm text-slate-400">
                                            {new Date(case_.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300 font-semibold">{(case_.confidence * 100).toFixed(1)}%</span>
                                    {getStatusBadge(case_.status)}
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            )}

            {/* Detail Modal */}
            {selectedCase && (
                <Modal
                    isOpen={!!selectedCase}
                    onClose={() => setSelectedCase(null)}
                    title="Analysis Details"
                    size="xl"
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-lg mb-3">X-Ray Image</h4>
                            <ImageViewer imageUrl={selectedCase.imageData || selectedCase.imageUrl} />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-lg mb-3">Diagnosis</h4>
                                <p className="text-2xl font-bold text-cyan-400">
                                    {getFractureLabel(selectedCase.fractureType, selectedCase.language)}
                                </p>
                            </div>

                            <ConfidenceBar confidence={selectedCase.confidence * 100} />

                            <div className="space-y-3">
                                <h4 className="font-semibold text-lg">Details</h4>
                                <div className="bg-slate-900/50 rounded-lg p-4 space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Status:</span>
                                        {getStatusBadge(selectedCase.status)}
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">AI Diagnosis:</span>
                                        <span className="text-white font-semibold">
                                            {getFractureLabel(selectedCase.aiDiagnosis, selectedCase.language)}
                                        </span>
                                    </div>
                                    {selectedCase.doctorDiagnosis && (
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Doctor Diagnosis:</span>
                                            <span className="text-white font-semibold">
                                                {getFractureLabel(selectedCase.doctorDiagnosis, selectedCase.language)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Date:</span>
                                        <span className="text-white">
                                            {new Date(selectedCase.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    {selectedCase.reviewedAt && (
                                        <div className="flex justify-between">
                                            <span className="text-slate-400">Reviewed:</span>
                                            <span className="text-white">
                                                {new Date(selectedCase.reviewedAt).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {selectedCase.doctorNotes && (
                                <div>
                                    <h4 className="font-semibold text-lg mb-2">Doctor&apos;s Notes</h4>
                                    <div className="bg-slate-900/50 rounded-lg p-4">
                                        <p className="text-slate-300">{selectedCase.doctorNotes}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
