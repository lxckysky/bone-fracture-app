import { User, UserRole, AnalysisCase, AnalysisStatus, FractureType } from '@/types';

// Storage keys
const USERS_KEY = 'medical_system_users';
const CASES_KEY = 'medical_system_cases';
const CURRENT_USER_KEY = 'medical_system_current_user';

/**
 * Local storage wrapper for user and case management
 */
export class Storage {
    // ==================== USER MANAGEMENT ====================

    /**
     * Get all users from storage
     */
    static getUsers(): User[] {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(USERS_KEY);
        return data ? JSON.parse(data) : this.getDefaultUsers();
    }

    /**
     * Get default demo users
     */
    private static getDefaultUsers(): User[] {
        const users = [
            {
                id: '1',
                email: 'user@test.com',
                name: 'Test User',
                password: 'demo123',
                role: 'user' as UserRole,
                createdAt: new Date().toISOString(),
            },
            {
                id: '2',
                email: 'doctor@test.com',
                name: 'Dr. Smith',
                password: 'demo123',
                role: 'doctor' as UserRole,
                createdAt: new Date().toISOString(),
            },
            {
                id: '3',
                email: 'admin@test.com',
                name: 'Admin User',
                password: 'demo123',
                role: 'admin' as UserRole,
                createdAt: new Date().toISOString(),
            },
        ];
        this.saveUsers(users);
        return users;
    }

    /**
     * Save users to storage
     */
    static saveUsers(users: User[]): void {
        if (typeof window === 'undefined') return;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    /**
     * Get user by email
     */
    static getUserByEmail(email: string): User | undefined {
        return this.getUsers().find((u) => u.email === email);
    }

    /**
     * Get user by ID
     */
    static getUserById(id: string): User | undefined {
        return this.getUsers().find((u) => u.id === id);
    }

    /**
     * Create new user
     */
    static createUser(email: string, name: string, password: string): User {
        const users = this.getUsers();
        const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            password,
            role: 'user',
            createdAt: new Date().toISOString(),
        };
        users.push(newUser);
        this.saveUsers(users);
        return newUser;
    }

    /**
     * Update user role (admin only)
     */
    static updateUserRole(userId: string, newRole: UserRole): boolean {
        const users = this.getUsers();
        const user = users.find((u) => u.id === userId);
        if (!user) return false;
        user.role = newRole;
        this.saveUsers(users);
        return true;
    }

    /**
     * Delete user
     */
    static deleteUser(userId: string): boolean {
        const users = this.getUsers();
        const filtered = users.filter((u) => u.id !== userId);
        if (filtered.length === users.length) return false;
        this.saveUsers(filtered);
        return true;
    }

    // ==================== AUTHENTICATION ====================

    /**
     * Get current logged-in user
     */
    static getCurrentUser(): User | null {
        if (typeof window === 'undefined') return null;
        const data = localStorage.getItem(CURRENT_USER_KEY);
        return data ? JSON.parse(data) : null;
    }

    /**
     * Set current user
     */
    static setCurrentUser(user: User | null): void {
        if (typeof window === 'undefined') return;
        if (user) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(CURRENT_USER_KEY);
        }
    }

    /**
     * Login user
     */
    static login(email: string, password: string): User | null {
        const user = this.getUserByEmail(email);
        if (user && user.password === password) {
            this.setCurrentUser(user);
            return user;
        }
        return null;
    }

    /**
     * Logout current user
     */
    static logout(): void {
        this.setCurrentUser(null);
    }

    // ==================== CASE MANAGEMENT ====================

    /**
     * Get all analysis cases
     */
    static getCases(): AnalysisCase[] {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(CASES_KEY);
        return data ? JSON.parse(data) : this.getDefaultCases();
    }

    /**
     * Get default demo cases
     */
    private static getDefaultCases(): AnalysisCase[] {
        const cases: AnalysisCase[] = [
            {
                id: '1',
                userId: '1',
                imageUrl: '/sample-xray-1.jpg',
                imageData: '',
                fractureType: 'radius_ulna',
                confidence: 85.5,
                status: 'ai_confirmed',
                aiDiagnosis: 'radius_ulna',
                language: 'en',
                createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            },
            {
                id: '2',
                userId: '1',
                imageUrl: '/sample-xray-2.jpg',
                imageData: '',
                fractureType: 'femur',
                confidence: 62.3,
                status: 'pending_review',
                aiDiagnosis: 'femur',
                language: 'en',
                createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
            },
            {
                id: '3',
                userId: '2',
                imageUrl: '/sample-xray-3.jpg',
                imageData: '',
                fractureType: 'normal',
                confidence: 91.7,
                status: 'ai_confirmed',
                aiDiagnosis: 'normal',
                language: 'en',
                createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            },
        ];
        this.saveCases(cases);
        return cases;
    }

    /**
     * Save cases to storage with Quota Handling
     */
    static saveCases(cases: AnalysisCase[]): void {
        if (typeof window === 'undefined') return;

        try {
            localStorage.setItem(CASES_KEY, JSON.stringify(cases));
        } catch (e: any) {
            // Check for QuotaExceededError
            if (e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
                e.code === 22 ||
                e.code === 1014) {

                console.warn("Storage quota exceeded! Attempting to free space...");

                // Strategy: Remove oldest cases (at the end of the array) until it fits
                // We clone the cases array to avoid mutating the original reference if possible
                const casesToSave = [...cases];

                // Keep trying to remove items until it succeeds or we run out of items to remove
                // (Keep at least the newest one if possible, but if that's too big, we might lose it too)
                let saved = false;
                while (casesToSave.length > 1 && !saved) {
                    // Remove the oldest case (last element)
                    casesToSave.pop();

                    try {
                        localStorage.setItem(CASES_KEY, JSON.stringify(casesToSave));
                        saved = true;
                        console.log(`Successfully saved after removing old cases. New count: ${casesToSave.length}`);
                        // Notify user? Maybe via console or a toast if we had one.
                    } catch (retryError) {
                        // Still too big, continue loop
                    }
                }

                if (!saved) {
                    console.error("Failed to save even after clearing old history. The file might be too large for LocalStorage.");
                    alert("Storage is full and could not be cleared automatically. Please clear your browser data or try a smaller image.");
                }

            } else {
                console.error("Storage error:", e);
            }
        }
    }

    /**
     * Clear all data (Emergency fix)
     */
    static clearAllData(): void {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(CASES_KEY);
        localStorage.removeItem(USERS_KEY);
        localStorage.removeItem(CURRENT_USER_KEY);
        window.location.reload();
    }

    /**
     * Create new analysis case
     */
    static createCase(caseData: Omit<AnalysisCase, 'id' | 'createdAt'>): AnalysisCase {
        const cases = this.getCases();
        const newCase: AnalysisCase = {
            ...caseData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
        };
        cases.unshift(newCase); // Add to beginning
        this.saveCases(cases); // This now handles quota errors
        return newCase;
    }

    /**
     * Get cases by user ID
     */
    static getCasesByUser(userId: string): AnalysisCase[] {
        return this.getCases().filter((c) => c.userId === userId);
    }

    /**
     * Get pending review cases (confidence < 70%)
     */
    static getPendingCases(): AnalysisCase[] {
        return this.getCases().filter((c) => c.status === 'pending_review');
    }

    /**
     * Update case with doctor review
     */
    static updateCaseWithReview(
        caseId: string,
        doctorId: string,
        doctorDiagnosis: FractureType,
        doctorNotes: string
    ): boolean {
        const cases = this.getCases();
        const caseIndex = cases.findIndex((c) => c.id === caseId);
        if (caseIndex === -1) return false;

        cases[caseIndex] = {
            ...cases[caseIndex],
            status: 'doctor_confirmed',
            doctorId,
            doctorDiagnosis,
            doctorNotes,
            fractureType: doctorDiagnosis, // Update final diagnosis
            reviewedAt: new Date().toISOString(),
        };

        this.saveCases(cases);
        return true;
    }

    /**
     * Get case by ID
     */
    static getCaseById(id: string): AnalysisCase | undefined {
        return this.getCases().find((c) => c.id === id);
    }

    /**
     * Delete case
     */
    static deleteCase(caseId: string): boolean {
        const cases = this.getCases();
        const filtered = cases.filter((c) => c.id !== caseId);
        if (filtered.length === cases.length) return false;
        this.saveCases(filtered);
        return true;
    }

    // ==================== STATISTICS ====================

    /**
     * Get system statistics
     */
    static getStatistics() {
        const users = this.getUsers();
        const cases = this.getCases();

        return {
            totalUsers: users.length,
            totalDoctors: users.filter((u) => u.role === 'doctor').length,
            totalCases: cases.length,
            pendingCases: cases.filter((c) => c.status === 'pending_review').length,
            confirmedCases: cases.filter((c) => c.status === 'ai_confirmed').length,
            doctorReviewedCases: cases.filter((c) => c.status === 'doctor_confirmed').length,
        };
    }
}
