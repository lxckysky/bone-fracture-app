'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Users, TrendingUp, UserCog, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardBody, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { API } from '@/lib/api';
import { getFractureLabel } from '@/lib/fracture-data';
import { User, UserRole, AnalysisCase } from '@/types';

export default function AdminPage() {
    const router = useRouter();
    const { user: currentUser, isAdmin, isLoading: authLoading } = useAuth();
    const [users, setUsers] = useState<User[]>([]);
    const [cases, setCases] = useState<AnalysisCase[]>([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalDoctors: 0,
        totalCases: 0,
        pendingCases: 0,
        confirmedCases: 0,
        doctorReviewedCases: 0,
    });
    const [loading, setLoading] = useState(true);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [caseToDelete, setCaseToDelete] = useState<string | null>(null);
    const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (authLoading) return;

        if (!isAdmin) {
            router.push('/');
            return;
        }

        loadData();
    }, [isAdmin, router, authLoading]);

    const loadData = async () => {
        setLoading(true);
        // Fetch users
        const allUsers = await API.getUsers();
        setUsers(allUsers);

        // Fetch stats (manually calculate for now as we don't have a stats API endpoint)
        const allCases = await API.getCases();
        setCases(allCases);

        setStats({
            totalUsers: allUsers.length,
            totalDoctors: allUsers.filter(u => u.role === 'doctor').length,
            totalCases: allCases.length,
            pendingCases: allCases.filter(c => c.status === 'pending_review').length,
            confirmedCases: allCases.filter(c => c.status === 'ai_confirmed').length,
            doctorReviewedCases: allCases.filter(c => c.status === 'doctor_confirmed').length,
        });

        setLoading(false);
    };

    const handleRoleChange = async (userId: string, newRole: UserRole) => {
        if (userId === currentUser?.id) {
            alert("You cannot change your own role");
            return;
        }

        const success = await API.updateUserRole(userId, newRole);
        if (success) {
            loadData();
        }
    };

    const handleDeleteUser = (userId: string) => {
        if (userId === currentUser?.id) {
            alert("You cannot delete your own account");
            return;
        }
        // Not implemented in Supabase client side for safety
        alert("Deleting users requires super admin access in Supabase Dashboard");
    };

    const handleDeleteCaseClick = (caseId: string) => {
        setCaseToDelete(caseId);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDeleteCase = async () => {
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
        if (selectedCases.size === cases.length) {
            setSelectedCases(new Set());
        } else {
            setSelectedCases(new Set(cases.map(c => c.id)));
        }
    };

    const handleBulkDelete = () => {
        if (selectedCases.size === 0) return;
        setCaseToDelete('BULK');
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

    if (!isAdmin) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold flex items-center gap-3">
                    <Shield className="text-cyan-400" size={40} />
                    Admin Panel
                </h1>
                <p className="text-slate-400 mt-2">Manage users and system roles</p>
            </div>

            {/* Statistics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardBody className="text-center">
                        <Users className="mx-auto mb-2 text-cyan-400" size={32} />
                        <p className="text-slate-400 text-sm">Total Users</p>
                        <p className="text-3xl font-bold text-cyan-400">{stats.totalUsers}</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <UserCog className="mx-auto mb-2 text-emerald-400" size={32} />
                        <p className="text-slate-400 text-sm">Doctors</p>
                        <p className="text-3xl font-bold text-emerald-400">{stats.totalDoctors}</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <TrendingUp className="mx-auto mb-2 text-blue-400" size={32} />
                        <p className="text-slate-400 text-sm">Total Cases</p>
                        <p className="text-3xl font-bold text-blue-400">{stats.totalCases}</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody className="text-center">
                        <Shield className="mx-auto mb-2 text-amber-400" size={32} />
                        <p className="text-slate-400 text-sm">Pending Cases</p>
                        <p className="text-3xl font-bold text-amber-400">{stats.pendingCases}</p>
                    </CardBody>
                </Card>
            </div>

            {/* User Management Table */}
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">User Management</h2>
                </CardHeader>
                <CardBody>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700">
                                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Name</th>
                                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Email</th>
                                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Current Role</th>
                                    <th className="text-left py-3 px-4 text-slate-400 font-semibold">Change Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                                        <td className="py-3 px-4">
                                            <p className="font-semibold text-white">{user.name}</p>
                                            {user.id === currentUser?.id && (
                                                <span className="text-xs text-cyan-400">(You)</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-slate-300">{user.email}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${user.role === 'admin'
                                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                                    : user.role === 'doctor'
                                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                        : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                                                disabled={user.id === currentUser?.id}
                                                className="bg-slate-700 border border-slate-600 rounded px-3 py-1.5 text-sm"
                                            >
                                                <option value="user">User</option>
                                                <option value="doctor">Doctor</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {/* Case Management */}
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Case Management</h2>
                    <p className="text-slate-400 text-sm mt-1">View and manage all analysis cases</p>
                </CardHeader>
                <CardBody>
                    {cases.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-400">No cases found</p>
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
                                                    checked={selectedCases.size === cases.length && cases.length > 0}
                                                    onChange={handleToggleAll}
                                                    className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-800 cursor-pointer"
                                                />
                                            </th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">ID</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">User</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Diagnosis</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Confidence</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Status</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Date</th>
                                            <th className="text-left py-3 px-4 text-slate-400 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cases.map((case_) => (
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
                                                    <p className="text-xs text-slate-400 font-mono">
                                                        {case_.id.substring(0, 8)}...
                                                    </p>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <p className="text-xs text-slate-400 font-mono">
                                                        {case_.userId.substring(0, 8)}...
                                                    </p>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <p className="font-semibold text-white capitalize">
                                                        {getFractureLabel(case_.aiDiagnosis || case_.fractureType, 'en')}
                                                    </p>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-cyan-400 font-bold">
                                                        {(case_.confidence * 100).toFixed(1)}%
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${case_.status === 'pending_review'
                                                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                            : case_.status === 'doctor_confirmed'
                                                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                            }`}
                                                    >
                                                        {case_.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-slate-300 text-sm">
                                                    {new Date(case_.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => handleDeleteCaseClick(case_.id)}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Button>
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

            {/* System Information */}
            <Card>
                <CardHeader>
                    <h2 className="text-2xl font-bold">System Information</h2>
                </CardHeader>
                <CardBody>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-slate-400 text-sm mb-1">AI Model</p>
                            <p className="text-white font-semibold">YOLO11x-cls (Simulated)</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-slate-400 text-sm mb-1">Supported Languages</p>
                            <p className="text-white font-semibold">4 (EN, TH, ZH, JA)</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-slate-400 text-sm mb-1">Fracture Types</p>
                            <p className="text-white font-semibold">12 Classifications</p>
                        </div>
                        <div className="bg-slate-900/50 rounded-lg p-4">
                            <p className="text-slate-400 text-sm mb-1">Confidence Threshold</p>
                            <p className="text-white font-semibold">70% (Auto-confirm)</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={caseToDelete === 'BULK' ? handleConfirmBulkDelete : handleConfirmDeleteCase}
                title={caseToDelete === 'BULK' ? 'Delete Selected Cases' : 'Delete Case'}
                message={
                    caseToDelete === 'BULK'
                        ? `Are you sure you want to delete ${selectedCases.size} case(s)? This will permanently remove all selected case data and associated images from the system.`
                        : 'Are you sure you want to delete this case? This will permanently remove the case data and associated image from the system.'
                }
                confirmText="Delete"
                cancelText="Cancel"
            />
        </div>
    );
}
