// User roles
export type UserRole = 'public' | 'user' | 'doctor' | 'admin';

// Language support
export type Language = 'en' | 'th' | 'zh' | 'ja';

// Patient demographic information for contextualized analysis
export interface PatientInfo {
    age?: number;
    gender?: 'male' | 'female' | 'other';
    height?: number; // cm
    weight?: number; // kg
    medicalHistory?: string;
    mechanismOfInjury?: string; // e.g., "Fall from height", "Car accident"
    painLevel?: number; // 1-10
}

// LLM-generated clinical insights based on vision AI + patient context
export interface LLMInsights {
    contextualSummary: string; // Summary considering patient profile
    differentialDiagnosis: string[]; // Alternative diagnoses to consider
    recommendedNextSteps: string[]; // Suggested imaging or tests
    clinicalRisks: string[]; // Potential complications
}

// Analysis status
export type AnalysisStatus = 'ai_confirmed' | 'pending_review' | 'doctor_confirmed';

// Fracture types
export type FractureType =
    | 'normal'
    | 'clavicle'
    | 'humerus'
    | 'radius_ulna'
    | 'metacarpal'
    | 'femur'
    | 'patella'
    | 'tibia_fibula'
    | 'ankle'
    | 'calcaneus'
    | 'metatarsal'
    | 'vertebral'
    | 'pelvic'
    | 'Avulsion fracture'
    | 'Comminuted fracture'
    | 'Compression-Crush fracture'
    | 'Fracture Dislocation'
    | 'Greenstick fracture'
    | 'Hairline Fracture'
    | 'Impacted fracture'
    | 'Intra-articular fracture'
    | 'Longitudinal fracture'
    | 'Oblique fracture'
    | 'Pathological fracture'
    | 'Spiral Fracture'
    | 'Test'
    | 'Train'
    | 'Other';

// User interface
export interface User {
    id: string;
    email: string;
    name: string;
    password?: string; // Optional as we don't always fetch it
    role: UserRole;
    createdAt: string;
}

// Analysis case interface
export interface AnalysisCase {
    id: string;
    userId: string;
    imageUrl: string;
    imageData?: string; // Optional, legacy
    fractureType: FractureType;
    confidence: number; // 0-100
    status: AnalysisStatus;
    aiDiagnosis: FractureType;
    doctorDiagnosis?: FractureType;
    doctor_diagnosis?: FractureType; // DB field mapping
    doctorNotes?: string;
    doctor_notes?: string; // DB field mapping
    doctorId?: string;
    doctor_id?: string; // DB field mapping
    language: Language;
    createdAt: string;
    reviewedAt?: string;
    metadata?: any; // For DICOM or other extra data
    patientInfo?: PatientInfo;
    llmInsights?: LLMInsights;
}

// Analysis result from AI
export interface AnalysisResult {
    fractureType: FractureType;
    confidence: number;
    status: AnalysisStatus;
    label: string;
    description: string;
    metadata?: Record<string, string>;
}

// Fracture type labels for internationalization
export interface FractureLabels {
    [key: string]: {
        en: string;
        th: string;
        zh: string;
        ja: string;
    };
}
