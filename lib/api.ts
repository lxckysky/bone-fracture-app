
import { supabase } from './supabase';
import { AnalysisCase, User, UserRole } from '@/types';

// Map database fields to application types
const mapCaseFromDB = (data: any): AnalysisCase => ({
    id: data.id,
    userId: data.user_id,
    imageUrl: data.image_url, // This should be the public URL
    imageData: '', // We don't store base64 in DB/Storage usually, but we keep the field for compatibility if needed.
    // Ideally we drop imageData usage in favor of imageUrl
    fractureType: data.fracture_type || 'normal',
    confidence: data.confidence,
    status: data.status,
    aiDiagnosis: data.ai_diagnosis,
    doctorDiagnosis: data.doctor_diagnosis,
    doctorId: data.doctor_id,
    doctorNotes: data.doctor_notes,
    language: data.language || 'en',
    createdAt: data.created_at,
    reviewedAt: data.reviewed_at,
    metadata: data.metadata
});

export class API {
    // ==================== AUTH ====================

    static async register(email: string, password: string, name: string): Promise<{ user: User | null, error: string | null }> {
        // 1. Sign up (Profile will be created by Database Trigger)
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                }
            }
        });

        if (authError) return { user: null, error: authError.message };
        if (!authData.user) return { user: null, error: "Registration successful but no user returned" };

        const user: User = {
            id: authData.user.id,
            email: email,
            name: name,
            role: 'user',
            password: '', // Don't expose
            createdAt: new Date().toISOString()
        };

        return { user, error: null };
    }

    static async login(email: string, password: string): Promise<{ user: User | null, error: string | null }> {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) return { user: null, error: error.message };
        if (!data.user) return { user: null, error: "No user found" };

        // Fetch profile to get Role and Name
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (profileError || !profile) {
            // Fallback if profile missing (shouldn't happen)
            return {
                user: {
                    id: data.user.id,
                    email: data.user.email || '',
                    name: 'Unknown',
                    role: 'user',
                    createdAt: data.user.created_at
                },
                error: null
            };
        }

        return {
            user: {
                id: data.user.id,
                email: profile.email || data.user.email || '',
                name: profile.full_name || 'User',
                role: (profile.role as UserRole) || 'user',
                createdAt: data.user.created_at
            },
            error: null
        };
    }

    static async logout() {
        await supabase.auth.signOut();
    }

    static async getCurrentUser(): Promise<User | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        return {
            id: user.id,
            email: user.email || '',
            name: profile?.full_name || 'User',
            role: (profile?.role as UserRole) || 'user',
            createdAt: user.created_at
        };
    }

    // ==================== STORAGE (IMAGES) ====================

    static async uploadImage(file: File): Promise<string | null> {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('scans')
                .upload(filePath, file);

            if (uploadError) {
                console.error('Upload Error:', uploadError);
                throw uploadError;
            }

            // Get Public URL
            const { data } = supabase.storage
                .from('scans')
                .getPublicUrl(filePath);

            return data.publicUrl;
        } catch (error) {
            console.error('Failed to upload image:', error);
            return null;
        }
    }

    // ==================== DATABASE (CASES) ====================

    static async createCase(caseData: Partial<AnalysisCase> & { file?: File }): Promise<AnalysisCase | null> {
        try {
            let imageUrl = caseData.imageUrl;

            // Upload image if provided
            if (caseData.file) {
                const url = await this.uploadImage(caseData.file);
                if (url) imageUrl = url;
            }

            // Get user ID (authenticated user or guest)
            const { data: { user } } = await supabase.auth.getUser();
            let userId = user?.id;

            // If not authenticated, use guest ID from localStorage
            if (!userId && typeof window !== 'undefined') {
                const { getGuestId } = await import('./guest-storage');
                userId = getGuestId();
            }

            if (!userId) throw new Error("No user ID available");

            const dbData = {
                user_id: userId,
                image_url: imageUrl,
                image_path: '', // Optional, stored in URL
                fracture_type: caseData.fractureType || 'normal',
                confidence: caseData.confidence,
                status: caseData.status || 'pending_review',
                ai_diagnosis: caseData.aiDiagnosis,
                language: caseData.language,
                metadata: caseData.metadata
            };

            const { data, error } = await supabase
                .from('cases')
                .insert(dbData)
                .select()
                .single();

            if (error) throw error;

            return mapCaseFromDB(data);
        } catch (err) {
            console.error("Create Case Error:", err);
            return null;
        }
    }

    static async getCases(userId?: string): Promise<AnalysisCase[]> {
        let query = supabase
            .from('cases')
            .select('*')
            .order('created_at', { ascending: false });

        if (userId) {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (error) {
            console.error("Fetch cases error:", error);
            return [];
        }

        return data.map(mapCaseFromDB);
    }

    static async getPendingCases(): Promise<AnalysisCase[]> {
        const { data, error } = await supabase
            .from('cases')
            .select('*')
            .eq('status', 'pending_review')
            .order('created_at', { ascending: true });

        if (error) return [];
        return data.map(mapCaseFromDB);
    }

    static async updateCaseReview(caseId: string, doctorId: string, diagnosis: string, notes: string) {
        const { error } = await supabase
            .from('cases')
            .update({
                status: 'doctor_confirmed',
                doctor_id: doctorId,
                doctor_diagnosis: diagnosis,
                doctor_notes: notes,
                reviewed_at: new Date().toISOString()
            })
            .eq('id', caseId);

        return !error;
    }

    // ==================== ADMIN ====================
    static async getUsers(): Promise<User[]> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) return [];

        return data.map((p: any) => ({
            id: p.id,
            email: p.email,
            name: p.full_name,
            role: p.role,
            createdAt: p.created_at
        }));
    }

    static async updateUserRole(userId: string, role: UserRole) {
        const { error } = await supabase
            .from('profiles')
            .update({ role })
            .eq('id', userId);

        return !error;
    }

    // ==================== DELETE ====================

    /**
     * ลบ case พร้อมไฟล์รูปจาก storage
     */
    static async deleteCase(caseId: string): Promise<boolean> {
        try {
            // 1. ดึงข้อมูล case เพื่อเอา image_url/image_path
            const { data: caseData, error: fetchError } = await supabase
                .from('cases')
                .select('image_url, image_path')
                .eq('id', caseId)
                .single();

            if (fetchError) {
                console.error('Error fetching case for deletion:', fetchError);
                // อาจจะไม่มี case แล้ว ก็ถือว่าสำเร็จ
                return true;
            }

            // 2. ลบไฟล์รูปจาก storage (ถ้ามี)
            if (caseData?.image_url || caseData?.image_path) {
                // Extract file path from URL or use image_path directly
                let filePath = caseData.image_path;

                if (!filePath && caseData.image_url) {
                    // Extract path from URL: https://.../storage/v1/object/public/scans/filename.jpg
                    const urlParts = caseData.image_url.split('/scans/');
                    if (urlParts.length > 1) {
                        filePath = urlParts[1];
                    }
                }

                if (filePath) {
                    const { error: storageError } = await supabase.storage
                        .from('scans')
                        .remove([filePath]);

                    if (storageError) {
                        console.warn('Error deleting image from storage:', storageError);
                        // ไม่ต้อง fail ทั้งหมด ถ้าไฟล์ถูกลบไปแล้วหรือไม่เจอ
                    }
                }
            }

            // 3. ลบ record จาก database
            const { error: deleteError } = await supabase
                .from('cases')
                .delete()
                .eq('id', caseId);

            if (deleteError) {
                console.error('Error deleting case from database:', deleteError);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Delete case error:', error);
            return false;
        }
    }

    /**
     * ลบหลาย cases พร้อมกัน
     */
    static async bulkDeleteCases(caseIds: string[]): Promise<{ success: number; failed: number }> {
        let successCount = 0;
        let failedCount = 0;

        // ลบทีละ case เพื่อให้แน่ใจว่าลบทั้ง database และ storage
        for (const caseId of caseIds) {
            const success = await this.deleteCase(caseId);
            if (success) {
                successCount++;
            } else {
                failedCount++;
            }
        }

        return { success: successCount, failed: failedCount };
    }
}
