'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stethoscope, AlertTriangle, CheckCircle, X, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ImageViewer } from '@/components/image-viewer';
import { ConfidenceBar } from '@/components/confidence-bar';
import { API } from '@/lib/api';
import { AnalysisCase, FractureType } from '@/types';
import { getFractureLabel, fractureTypes } from '@/lib/fracture-data';

export default function DoctorPage() {
    const router = useRouter();
    const { user, isDoctor, isLoading: authLoading } = useAuth();
    const [pendingCases, setPendingCases] = useState<AnalysisCase[]>([]);
    const [reviewedCount, setReviewedCount] = useState(0);
    const [selectedCase, setSelectedCase] = useState<AnalysisCase | null>(null);
    const [diagnosisType, setDiagnosisType] = useState<FractureType>('normal');
    const [notes, setNotes] = useState('');
    const [confirmAI, setConfirmAI] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [caseToDelete, setCaseToDelete] = useState<string | null>(null);
    const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (authLoading) return;

        if (!isDoctor) {
            router.push('/');
            return;
        }

        loadData();
    }, [isDoctor, router, authLoading]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsLightboxOpen(false);
        };
        if (isLightboxOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen]);

    const loadData = async () => {
        setLoading(true);
        const cases = await API.getPendingCases();
        setPendingCases(cases);

        // Get reviewed count (stats)
        // For simplicity, we just fetch all cases and filter in frontend for now, 
        // or we could add a specific API for stats.
        // Let's use getCases() which returns all if no user id provided (and RLS allows doctors to see all)
        const allCases = await API.getCases();
        const reviewed = allCases.filter(c => c.status === 'doctor_confirmed').length;
        setReviewedCount(reviewed);

        setLoading(false);
    };

    const handleReviewCase = (case_: AnalysisCase) => {
        setSelectedCase(case_);
        setDiagnosisType(case_.aiDiagnosis); // Default to AI diagnosis
        setConfirmAI(true);
        setNotes('');
    };

    const handleSubmitReview = async () => {
        if (!selectedCase || !user) return;

        setSubmitting(true);

        const finalDiagnosis = confirmAI ? selectedCase.aiDiagnosis : diagnosisType;

        const success = await API.updateCaseReview(
            selectedCase.id,
            user.id,
            finalDiagnosis,
            notes
        );

        if (success) {
            setSelectedCase(null);
            await loadData(); // Reload list
            setSubmitting(false);
        } else {
            alert('Failed to submit review');
            setSubmitting(false);
        }
    };

    const handleDeleteClick = (caseId: string) => {
        setCaseToDelete(caseId);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!caseToDelete) return;

        try {
            const success = await API.deleteCase(caseToDelete);
            if (success) {
                setCaseToDelete(null);
                await loadData();
            } else {
                console.error('Delete failed for caseId:', caseToDelete);
                alert('Failed to delete case. Please check browser console for details.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert(`Error deleting case: ${error}`);
        }
    };

    const handleToggleCase = (caseId: string) => {
        const newSelected = new Set(selectedCases);
        if (newSelected.has(caseId)) {
            newSelected.delete(caseId);
        } else {
            newSelected.add(caseId);
        }
        setSelectedCases(newSelected);
    };

    const handleToggleAll = () => {
        if (selectedCases.size === pendingCases.length) {
            setSelectedCases(new Set());
        } else {
            setSelectedCases(new Set(pendingCases.map(c => c.id)));
        }
    };

    const handleBulkDelete = () => {
        if (selectedCases.size === 0) return;
        setCaseToDelete('BULK'); // Special marker for bulk delete
        setDeleteConfirmOpen(true);
    };

    const handleConfirmBulkDelete = async () => {
        if (selectedCases.size === 0) return;

        try {
            console.log('Starting bulk delete for:', Array.from(selectedCases));
            const result = await API.bulkDeleteCases(Array.from(selectedCases));
            console.log('Bulk delete result:', result);

            setCaseToDelete(null);
            setSelectedCases(new Set());

            if (result.success > 0) {
                await loadData();
                if (result.failed > 0) {
                    alert(`Deleted ${result.success} case(s). Failed to delete ${result.failed} case(s). Check console for details.`);
                }
            } else {
                alert('Failed to delete any cases. Please check browser console for details.');
            }
        } catch (error) {
            console.error('Bulk delete error:', error);
            alert(`Error during bulk delete: ${error}`);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
        );
    }

    if (!isDoctor) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <Stethoscope className="text-cyan-400" size={40} />
                    Doctor Dashboard
                </h1>
                <p className="text-slate-400 mt-2">Review and verify low-confidence AI diagnoses</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardBody className="text-center">
                        <AlertTriangle className="mx-auto mb-2 text-amber-400" size={32} />
                        <p className="text-slate-400 text-sm">Pending Review</p>
                        <p className="text-3xl font-bold text-amber-400">{pendingCases.length}</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <CheckCircle className="mx-auto mb-2 text-emerald-400" size={32} />
                        <p className="text-slate-400 text-sm">Reviewed Today</p>
                        <p className="text-3xl font-bold text-emerald-400">
                            {reviewedCount}
                        </p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <Stethoscope className="mx-auto mb-2 text-cyan-400" size={32} />
                        <p className="text-slate-400 text-sm">Your Role</p>
                        <p className="text-xl font-bold text-cyan-400 capitalize">{user?.role}</p>
                    </CardBody>
                </Card>
            </div>

            {/* Pending Cases Table */}
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Pending Review Cases</h2>
                </CardHeader>
                <CardBody>
                    {pendingCases.length === 0 ? (
                        <div className="text-center py-12">
                            <CheckCircle className="mx-auto mb-4 text-emerald-400" size={64} />
                            <h3 className="text-xl font-semibold text-slate-300">All caught up!</h3>
                            <p className="text-slate-400 mt-2">No cases pending review at this time</p>
                        </div>
                    ) : (
                        <>
                            {selectedCases.size > 0 && (
                                <div className="mb-4 flex items-center justify-between bg-slate-700/30 border border-slate-600 rounded-lg p-3">
                                    <p className="text-slate-300">
                                        <span className="font-semibold text-cyan-400">{selectedCases.size}</span> case(s) selected
                                    </p>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={handleBulkDelete}
                                    >
                                        <Trash2 size={16} className="mr-2" />
                                        Delete Selected
                                    </Button>
                                </div>
                            )}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold w-12">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCases.size === pendingCases.length && pendingCases.length > 0}
                                                    onChange={handleToggleAll}
                                                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-800 cursor-pointer"
                                                />
                                            </th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Image</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">AI Diagnosis</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Confidence</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Date</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendingCases.map((case_) => (
                                            <tr key={case_.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                                                <td className="py-3 px-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCases.has(case_.id)}
                                                        onChange={() => handleToggleCase(case_.id)}
                                                        className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-800 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div
                                                        className="w-16 h-16 bg-black rounded-lg overflow-hidden cursor-zoom-in hover:ring-2 hover:ring-cyan-500 transition-all"
                                                        onClick={() => {
                                                            setLightboxImage(case_.imageData || case_.imageUrl);
                                                            setIsLightboxOpen(true);
                                                        }}
                                                    >
                                                        <img
                                                            src={case_.imageData || case_.imageUrl}
                                                            alt="X-ray"
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <p className="font-semibold text-white">
                                                        {getFractureLabel(case_.aiDiagnosis, case_.language)}
                                                    </p>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-amber-400 font-bold">{case_.confidence.toFixed(1)}%</span>
                                                </td>
                                                <td className="py-3 px-4 text-slate-300">
                                                    {new Date(case_.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="primary"
                                                            size="sm"
                                                            onClick={() => handleReviewCase(case_)}
                                                        >
                                                            Review
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(case_.id)}
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </CardBody>
            </Card>

            {/* Review Modal */}
            {
                selectedCase && (
                    <Modal
                        isOpen={!!selectedCase}
                        onClose={() => setSelectedCase(null)}
                        title="Case Review"
                        size="xl"
                    >
                        <div className="space-y-6">
                            {/* Doctor Review Layout */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Left Column: Clinical Data */}
                                <div className="space-y-6">
                                    {/* Image Viewer */}
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                                            <Stethoscope size={20} className="text-cyan-400" />
                                            X-Ray Scan
                                        </h3>
                                        <div
                                            className="aspect-square bg-black rounded-xl overflow-hidden border border-slate-700 cursor-zoom-in hover:border-cyan-500 transition-colors"
                                            onClick={() => {
                                                setLightboxImage(selectedCase.imageData || selectedCase.imageUrl);
                                                setIsLightboxOpen(true);
                                            }}
                                        >
                                            <ImageViewer imageUrl={selectedCase.imageData || selectedCase.imageUrl} />
                                        </div>
                                    </div>

                                    {/* Patient Context */}
                                    {selectedCase.metadata?.patientInfo && (
                                        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                            <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                                Patient Context
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-slate-400 block text-xs uppercase">Age / Gender</span>
                                                    <span className="text-white font-medium">
                                                        {selectedCase.metadata.patientInfo.age || 'N/A'} yrs / {' '}
                                                        <span className="capitalize">{selectedCase.metadata.patientInfo.gender}</span>
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-400 block text-xs uppercase">Pain Level</span>
                                                    <span className="text-amber-400 font-bold">
                                                        {selectedCase.metadata.patientInfo.painLevel}/10
                                                    </span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-slate-400 block text-xs uppercase">Mechanism of Injury</span>
                                                    <span className="text-slate-200">
                                                        {selectedCase.metadata.patientInfo.mechanismOfInjury || 'N/A'}
                                                    </span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-slate-400 block text-xs uppercase">History</span>
                                                    <span className="text-slate-200">
                                                        {selectedCase.metadata.patientInfo.medicalHistory || 'None'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Column: AI & Review */}
                                <div className="space-y-6">
                                    {/* AI Analysis Summary */}
                                    <div className="bg-slate-900/80 p-5 rounded-xl border border-cyan-500/30">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Vision AI Diagnosis</span>
                                                <h2 className="text-2xl font-bold text-white capitalize">
                                                    {getFractureLabel(selectedCase.aiDiagnosis, selectedCase.language)}
                                                </h2>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-cyan-400">{(selectedCase.confidence * 100).toFixed(1)}%</span>
                                                <span className="block text-xs text-slate-400">Confidence</span>
                                            </div>
                                        </div>

                                        {/* LLM Insights (Compact View) */}
                                        {selectedCase.metadata?.llmInsights && (
                                            <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-3">
                                                <div>
                                                    <span className="text-xs text-purple-400 font-bold uppercase mb-1 block">Contextual Summary</span>
                                                    <p className="text-sm text-slate-300 italic">
                                                        "{selectedCase.metadata.llmInsights.contextualSummary}"
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs">
                                                    <div className="bg-blue-900/20 p-2 rounded border border-blue-500/20">
                                                        <strong className="text-blue-300 block mb-1">Rec. Steps</strong>
                                                        <ul className="list-disc pl-3 text-blue-100/70 space-y-0.5">
                                                            {selectedCase.metadata.llmInsights.recommendedNextSteps?.slice(0, 2).map((s: string, i: number) =>
                                                                <li key={i}>{s}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-red-900/20 p-2 rounded border border-red-500/20">
                                                        <strong className="text-red-300 block mb-1">Risks</strong>
                                                        <ul className="list-disc pl-3 text-red-100/70 space-y-0.5">
                                                            {selectedCase.metadata.llmInsights.clinicalRisks?.slice(0, 2).map((s: string, i: number) =>
                                                                <li key={i}>{s}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Doctor Decision Form */}
                                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                                        <h3 className="font-semibold text-lg flex items-center gap-2">
                                            <CheckCircle className="text-emerald-400" size={20} />
                                            Final Verification
                                        </h3>

                                        {/* Action Toggle */}
                                        <div className="flex bg-slate-900 p-1 rounded-lg">
                                            <button
                                                onClick={() => setConfirmAI(true)}
                                                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${confirmAI
                                                    ? 'bg-emerald-500 text-white shadow-lg'
                                                    : 'text-slate-400 hover:text-white'
                                                    }`}
                                            >
                                                Confirm AI
                                            </button>
                                            <button
                                                onClick={() => setConfirmAI(false)}
                                                className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${!confirmAI
                                                    ? 'bg-amber-500 text-white shadow-lg'
                                                    : 'text-slate-400 hover:text-white'
                                                    }`}
                                            >
                                                Override
                                            </button>
                                        </div>

                                        {/* Override Dropdown */}
                                        {!confirmAI && (
                                            <div className="animate-fade-in">
                                                <label className="text-xs text-slate-400 mb-1 block">Select Correct Diagnosis</label>
                                                <select
                                                    value={diagnosisType}
                                                    onChange={(e) => setDiagnosisType(e.target.value as FractureType)}
                                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                                                >
                                                    {fractureTypes.map((type) => (
                                                        <option key={type} value={type}>
                                                            {getFractureLabel(type, selectedCase.language)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {/* Notes */}
                                        <div>
                                            <label className="text-xs text-slate-400 mb-1 block">Clinical Notes (Optional)</label>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Enter your clinical observations..."
                                                rows={3}
                                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-sm focus:border-cyan-500 outline-none resize-none"
                                            />
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            variant={confirmAI ? 'success' : 'danger'}
                                            size="lg"
                                            onClick={handleSubmitReview}
                                            disabled={submitting}
                                            className="w-full"
                                        >
                                            {submitting ? 'Processing...' : (confirmAI ? 'Approve & Close Case' : 'Update & Close Case')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )
            }

            {/* Lightbox Modal */}
            {
                isLightboxOpen && lightboxImage && (
                    <div
                        className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 animate-fade-in"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full z-[210]"
                            onClick={(e) => { e.stopPropagation(); setIsLightboxOpen(false); }}
                        >
                            <X size={32} />
                        </button>
                        <img
                            src={lightboxImage}
                            alt="Enlarged"
                            className="max-w-full max-h-full object-contain shadow-2xl animate-scale-up"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded-full text-white/70 text-sm backdrop-blur-md">
                            {selectedCase ? `Reviewing Case: ${getFractureLabel(selectedCase.aiDiagnosis, selectedCase.language)}` : 'X-Ray Detailed View'}
                        </div>
                    </div>
                )
            }

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={caseToDelete === 'BULK' ? handleConfirmBulkDelete : handleConfirmDelete}
                title={caseToDelete === 'BULK' ? 'Delete Selected Cases' : 'Delete Case'}
                message={
                    caseToDelete === 'BULK'
                        ? `Are you sure you want to delete ${selectedCases.size} case(s)? This will permanently remove all selected case data and associated images from the system.`
                        : 'Are you sure you want to delete this case? This will permanently remove the case data and associated image from the system.'
                }
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div >
    );
}
