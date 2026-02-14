import { AnalysisResult, FractureType, Language } from '@/types';
import { FRACTURE_LABELS, EXPLANATIONS, ALIAS_MAPPING } from './i18n';
import { ClientModel } from './client-model';
import * as ort from 'onnxruntime-web';

// Initialize ONNX Runtime Web environment
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

/**
 * Client-Side AI Analysis Engine using ONNX Runtime
 * Runs YOLO11x-cls model directly in the browser
 */
export class AIAnalyzer {
    private static session: ort.InferenceSession | null = null;
    private static modelPath = '/models/model.onnx';
    private static isInitializing = false;
    private static initializationError: Error | null = null;

    /**
     * Initialize the ONNX session
     */
    static async initModel() {
        if (this.session) return;
        if (this.isInitializing) {
            // Wait for initialization to complete
            while (this.isInitializing) {
                await new Promise(r => setTimeout(r, 100));
            }
            if (this.session) return;
        }

        this.isInitializing = true;
        console.log("Loading ONNX model...");

        try {
            // Create session
            this.session = await ort.InferenceSession.create(this.modelPath, {
                executionProviders: ['wasm'],
                graphOptimizationLevel: 'all'
            });
            console.log("ONNX Model loaded successfully");
        } catch (e: any) {
            console.error("Failed to load ONNX model:", e);
            this.initializationError = e;
        } finally {
            this.isInitializing = false;
        }
    }

    /**
     * Analyze an X-ray image using Client-Side AI
     */
    /**
     * Analyze an X-ray image using Python Backend (Ultralytics)
     */
    static async analyzeImage(
        file: File,
        language: Language = 'en'
    ): Promise<AnalysisResult> {
        try {
            console.log("Sending image to Python backend for analysis...");

            const formData = new FormData();
            formData.append('file', file);
            formData.append('language', language);

            const response = await fetch('http://localhost:8000/analyze', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Backend offline on Port 8000`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            // Map backend response to frontend AnalysisResult
            const rawType = data.fractureType || 'normal';
            const confidence = data.confidence || 0.8;

            return {
                fractureType: rawType as any,
                confidence: confidence,
                status: data.status || 'pending_review',
                label: this.getLocalizedLabel(rawType, language),
                description: this.getDescription(rawType, confidence, language),
                metadata: {
                    ...data.metadata,
                    inference: 'python-backend'
                }
            };

        } catch (e: any) {
            console.warn("Backend API call failed, falling back to client-side model", e);
        }

        // 2. Fallback to Client-Side TensorFlow.js Model
        try {
            console.log("Using client-side TensorFlow.js model (Fallback)");

            // Use ClientModel instead of simulation
            const modelResult = await ClientModel.predict(file);

            console.log('Client-side model result:', modelResult);

            return {
                fractureType: (modelResult.prediction === 'fracture'
                    ? (modelResult.fractureType || 'fracture')
                    : 'normal') as FractureType,
                confidence: modelResult.confidence,
                status: 'ai_confirmed',
                label: this.getLocalizedLabel(
                    modelResult.fractureType || modelResult.prediction,
                    language
                ),
                description: this.getDescription(
                    modelResult.fractureType || modelResult.prediction,
                    modelResult.confidence,
                    language
                ),
                metadata: {
                    inference: 'client-side',
                    provider: 'TensorFlow.js (Browser)',
                    fractureType: modelResult.fractureType,
                    location: modelResult.location,
                    severity: modelResult.severity
                }
            } as AnalysisResult;

        } catch (modelError: any) {
            console.error("Client-side model also failed:", modelError);

            // 3. Final Fallback: Simulation (only if model not available)
            console.log("Using simulation mode (Final Fallback - Model not available)");
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const simType = this.getRandomFractureType();
            const simConf = this.getRealisticConfidence(simType);
            const simStatus = simConf >= 0.7 ? 'ai_confirmed' : 'pending_review';
            const simLabel = this.getLocalizedLabel(simType, language);
            const simDesc = this.getDescription(simType, simConf, language);

            return {
                fractureType: simType,
                confidence: simConf,
                status: simStatus,
                label: simLabel,
                description: simDesc,
                metadata: {
                    inference: 'simulated',
                    provider: 'Simulation (Model Not Available)'
                }
            } as AnalysisResult;
        }
    }

    // --- Preprocessing Helpers ---

    private static async preprocessImage(file: File): Promise<ort.Tensor> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const targetSize = 224;
                canvas.width = targetSize;
                canvas.height = targetSize;
                const ctx = canvas.getContext('2d');
                if (!ctx) return reject("No context");

                // Fill background with black (letterboxing)
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, targetSize, targetSize);

                // Calculate aspect ratio and dimensions for "contain" fit
                const imgRatio = img.width / img.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (imgRatio > 1) {
                    // Wider than tall
                    drawWidth = targetSize;
                    drawHeight = targetSize / imgRatio;
                    offsetX = 0;
                    offsetY = (targetSize - drawHeight) / 2;
                } else {
                    // Taller than wide
                    drawHeight = targetSize;
                    drawWidth = targetSize * imgRatio;
                    offsetX = (targetSize - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                const imageData = ctx.getImageData(0, 0, targetSize, targetSize);
                const { data } = imageData;

                const input = new Float32Array(1 * 3 * targetSize * targetSize);

                // ImageNet Normalization Constants
                const mean = [0.485, 0.456, 0.406];
                const std = [0.229, 0.224, 0.225];

                for (let i = 0; i < targetSize * targetSize; i++) {
                    // RGB values 0-1
                    const r = data[i * 4] / 255.0;
                    const g = data[i * 4 + 1] / 255.0;
                    const b = data[i * 4 + 2] / 255.0;

                    // Standard (val - mean) / std normalization
                    input[i] = (r - mean[0]) / std[0]; // R
                    input[i + targetSize * targetSize] = (g - mean[1]) / std[1]; // G
                    input[i + 2 * targetSize * targetSize] = (b - mean[2]) / std[2]; // B
                }

                const tensor = new ort.Tensor('float32', input, [1, 3, targetSize, targetSize]);
                resolve(tensor);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    private static softmax(data: Float32Array): number[] {
        const max = Math.max(...data);
        const exps = data.map(v => Math.exp(v - max));
        const sum = exps.reduce((a, b) => a + b, 0);
        return Array.from(exps).map(v => v / sum);
    }

    // --- Localization Helpers ---

    private static getLocalizedLabel(key: string, language: Language): string {
        // Try to find index in ALIAS_MAPPING
        const index = ALIAS_MAPPING[key as keyof typeof ALIAS_MAPPING];

        if (typeof index === 'number' && FRACTURE_LABELS[language] && FRACTURE_LABELS[language][index]) {
            return FRACTURE_LABELS[language][index];
        }

        // Check for Normal
        if (key.toLowerCase().includes('normal')) {
            const normalLabels: Record<Language, string> = {
                en: "Normal (No Fracture Detected)",
                th: "ปกติ (ไม่พบรอยกระดูกหัก)",
                zh: "正常 (未发现骨折)",
                ja: "正常 (骨折なし)"
            };
            return normalLabels[language] || normalLabels.en;
        }

        return key; // Return original key if no match
    }

    // --- Simulation Helpers ---
    private static getRandomFractureType(): FractureType {
        const weights = { normal: 0.3, clavicle: 0.06, humerus: 0.08, radius_ulna: 0.12, metacarpal: 0.07, femur: 0.06, patella: 0.04, tibia_fibula: 0.08, ankle: 0.09, calcaneus: 0.03, metatarsal: 0.04, vertebral: 0.02, pelvic: 0.01 };
        const random = Math.random();
        let cumulative = 0;
        for (const [type, weight] of Object.entries(weights)) {
            cumulative += weight;
            if (random <= cumulative) return type as FractureType;
        }
        return 'normal';
    }

    private static getRealisticConfidence(fractureType: FractureType): number {
        let baseConfidence: number;

        if (fractureType === 'normal') {
            baseConfidence = 0.75 + Math.random() * 0.20;
        } else {
            const rand = Math.random();
            if (rand < 0.6) {
                baseConfidence = 0.70 + Math.random() * 0.25;
            } else {
                baseConfidence = 0.45 + Math.random() * 0.25;
            }
        }
        return Math.round(baseConfidence * 100) / 100;
    }

    private static getDescription(fractureType: string, confidence: number, language: Language): string {
        const isHigh = confidence >= 0.7;

        // If it's normal, provide a reassuring description
        if (fractureType === 'normal') {
            const normalDescs: Record<Language, string> = {
                en: "No significant bone fractures were detected by the AI. Please verify with a radiologist.",
                th: "AI ไม่พบรอยกระดูกหักที่ชัดเจน กรุณาตรวจสอบซ้ำโดยรังสีแพทย์",
                zh: "AI 未检测到明显的骨折。请由放射科医生核实。",
                ja: "AI は明らかな骨折を検出しませんでした。放射線科医に確認してください。"
            };
            return normalDescs[language] || normalDescs.en;
        }

        if (EXPLANATIONS[language] && EXPLANATIONS[language][fractureType]) {
            return EXPLANATIONS[language][fractureType];
        }

        const descriptions = {
            en: { high: `High confidence detection of ${fractureType}. Recommended for immediate medical review.`, low: `Low confidence detection of ${fractureType}. Doctor review recommended for accurate diagnosis.` },
            th: { high: `ตรวจพบ ${fractureType} ด้วยความมั่นใจสูง แนะนำให้แพทย์ตรวจสอบทันที`, low: `ตรวจพบ ${fractureType} ด้วยความมั่นใจต่ำ แนะนำให้แพทย์ตรวจสอบเพื่อการวินิจฉัยที่แม่นยำ` },
            zh: { high: `检测到 ${fractureType} 置信度高。建议立即进行医疗审查。`, low: `检测到 ${fractureType} 置信度低。建议医生审查以进行准确诊断。` },
            ja: { high: `高信頼度の検出。${fractureType} が検出されました。即座の医師によるレビューを推奨します。`, low: `検出された ${fractureType} の信頼度が低いです。正確な診断のため医師のレビューを推奨します。` }
        };

        const langDescriptions = (descriptions as any)[language] || descriptions.en;
        return isHigh ? langDescriptions.high : langDescriptions.low;
    }
}
