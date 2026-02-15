/**
 * Guest user storage utilities
 * Manages guest user IDs using browser localStorage
 */

const GUEST_ID_KEY = 'bfaw_guest_id';
const GUEST_PREFIX = 'guest_';

/**
 * Generate a unique guest ID
 */
function generateGuestId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${GUEST_PREFIX}${timestamp}_${random}`;
}

/**
 * Get or create guest ID from localStorage
 */
export function getGuestId(): string {
    if (typeof window === 'undefined') {
        // Server-side rendering
        return '';
    }

    let guestId = localStorage.getItem(GUEST_ID_KEY);

    if (!guestId) {
        guestId = generateGuestId();
        localStorage.setItem(GUEST_ID_KEY, guestId);
    }

    return guestId;
}

/**
 * Check if a user ID is a guest ID
 */
export function isGuestId(userId: string | undefined | null): boolean {
    if (!userId) return false;
    return userId.startsWith(GUEST_PREFIX);
}

/**
 * Get display name for user
 */
export function getDisplayName(userId: string | undefined | null, userName?: string): string {
    if (!userId) return 'Unknown';

    if (isGuestId(userId)) {
        return 'Guest User';
    }

    return userName || 'User';
}

/**
 * Clear guest ID (for testing or logout)
 */
export function clearGuestId(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(GUEST_ID_KEY);
    }
}
