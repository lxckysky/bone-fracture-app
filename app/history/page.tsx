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

export default function HistoryPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const [cases, setCases] = useState<AnalysisCase[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'reviewed'>('all');
    const [selectedCase, setSelectedCase] = useState<AnalysisCase | null>(null);

    useEffect(() => {
        if (authLoading) return;

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        const fetchCases = async () => {
            if (user) {
                setLoading(true);
                const userCases = await API.getCases(user.id);
                setCases(userCases);
                setLoading(false);
            }
        };

        fetchCases();
    }, [isAuthenticated, user, router, authLoading]);

    const filteredCases = cases.filter((c) => {
        if (filter === 'all') return true;
        if (filter === 'confirmed') return c.status === 'ai_confirmed';
        if (filter === 'pending') return c.status === 'pending_review';
        if (filter === 'reviewed') return c.status === 'doctor_confirmed';
        return true;
    });

    const getStatusBadge = (status: string) => {
        const badges = {
            ai_confirmed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            pending_review: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
            doctor_confirmed: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        };
        const labels = {
            ai_confirmed: 'AI Confirmed',
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

    if (!isAuthenticated) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold flex items-center gap-3">
                        <HistoryIcon className="text-cyan-400" size={40} />
                        Analysis History
                    </h1>
                    <p className="text-slate-400 mt-2">View and manage your past X-ray analysis results</p>
                </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardBody className="text-center">
                        <p className="text-slate-400 text-sm">Total Scans</p>
                        <p className="text-3xl font-bold text-cyan-400">{cases.length}</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <p className="text-slate-400 text-sm">AI Confirmed</p>
                        <p className="text-3xl font-bold text-emerald-400">
                            {cases.filter((c) => c.status === 'ai_confirmed').length}
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <p className="text-slate-400 text-sm">Pending Review</p>
                        <p className="text-3xl font-bold text-amber-400">
                            {cases.filter((c) => c.status === 'pending_review').length}
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
                        {['all', 'confirmed', 'pending', 'reviewed'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all capitalize ${filter === f
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                    }`}
                            >
                                {f}
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
                                    <div className="flex items-center gap-2 mt-2">
                                        <Calendar size={16} className="text-slate-400" />
                                        <span className="text-sm text-slate-400">
                                            {new Date(case_.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-slate-300 font-semibold">{case_.confidence.toFixed(1)}%</span>
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

                            <ConfidenceBar confidence={selectedCase.confidence} />

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
