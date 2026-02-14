import * as ort from 'onnxruntime-web';

// Configure ONNX Runtime
ort.env.wasm.wasmPaths = 'https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/';

export interface ModelPrediction {
    prediction: 'fracture' | 'normal';
    confidence: number;
    fractureType?: string;
    location?: string;
    severity?: string;
}

/**
 * Client-Side Model using ONNX Runtime Web
 * Runs fracture detection model in browser
 */
export class ClientModel {
    private static session: ort.InferenceSession | null = null;
    private static modelPath = '/models/model.onnx';
    private static isLoading = false;

    /**
     * Load model (singleton)
     */
    private static async loadModel(): Promise<ort.InferenceSession> {
        if (this.session) return this.session;

        if (this.isLoading) {
            // Wait for ongoing load
            while (this.isLoading) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            if (this.session) return this.session;
        }

        this.isLoading = true;

        try {
            console.log('🔄 กำลังโหลด AI model...');

            this.session = await ort.InferenceSession.create(this.modelPath, {
                executionProviders: ['wasm'],
                graphOptimizationLevel: 'all'
            });

            console.log('✅ โหลด model สำเร็จ');
            return this.session;

        } catch (error: any) {
            console.error('❌ โหลด model ล้มเหลว:', error);
            throw new Error(`ไม่สามารถโหลด AI model ได้: ${error.message}`);
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Preprocess image to tensor
     */
    private static async preprocessImage(file: File): Promise<ort.Tensor> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const targetSize = 224; // YOLO classification typically 224x224
                canvas.width = targetSize;
                canvas.height = targetSize;

                const ctx = canvas.getContext('2d');
                if (!ctx) return reject('No canvas context');

                // Black letterboxing
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, targetSize, targetSize);

                // Aspect ratio fit
                const ratio = img.width / img.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (ratio > 1) {
                    drawWidth = targetSize;
                    drawHeight = targetSize / ratio;
                    offsetX = 0;
                    offsetY = (targetSize - drawHeight) / 2;
                } else {
                    drawHeight = targetSize;
                    drawWidth = targetSize * ratio;
                    offsetX = (targetSize - drawWidth) / 2;
                    offsetY = 0;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                const imageData = ctx.getImageData(0, 0, targetSize, targetSize);
                const { data } = imageData;

                // Convert to float32 array (NCHW format)
                const input = new Float32Array(1 * 3 * targetSize * targetSize);

                // ImageNet normalization
                const mean = [0.485, 0.456, 0.406];
                const std = [0.229, 0.224, 0.225];

                for (let i = 0; i < targetSize * targetSize; i++) {
                    const r = data[i * 4] / 255.0;
                    const g = data[i * 4 + 1] / 255.0;
                    const b = data[i * 4 + 2] / 255.0;

                    input[i] = (r - mean[0]) / std[0];
                    input[i + targetSize * targetSize] = (g - mean[1]) / std[1];
                    input[i + 2 * targetSize * targetSize] = (b - mean[2]) / std[2];
                }

                const tensor = new ort.Tensor('float32', input, [1, 3, targetSize, targetSize]);
                resolve(tensor);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Interpret YOLO classification output
     */
    private static interpretPrediction(output: ort.Tensor): ModelPrediction {
        const data = output.data as Float32Array;

        // YOLO classification output is typically [batch, num_classes]
        // Find max probability
        let maxIndex = 0;
        let maxValue = data[0];

        for (let i = 1; i < data.length; i++) {
            if (data[i] > maxValue) {
                maxValue = data[i];
                maxIndex = i;
            }
        }

        // Apply softmax to get probability
        const expSum = Array.from(data).reduce((sum, val) => sum + Math.exp(val), 0);
        const confidence = Math.exp(maxValue) / expSum;

        // Class mapping (adjust based on your model's classes)
        // Index 0 = normal, others = fracture types
        const isNormal = maxIndex === 0;

        const fractureTypes = [
            'normal',
            'clavicle',
            'humerus',
            'radius_ulna',
            'metacarpal',
            'femur',
            'patella',
            'tibia_fibula',
            'ankle',
            'calcaneus',
            'metatarsal',
            'vertebral',
            'pelvic'
        ];

        const fractureType = fractureTypes[maxIndex] || 'fracture';

        return {
            prediction: isNormal ? 'normal' : 'fracture',
            confidence: confidence,
            fractureType: isNormal ? undefined : fractureType,
            location: isNormal ? undefined : 'detected',
            severity: confidence > 0.8 ? 'high' : confidence > 0.6 ? 'moderate' : 'low'
        };
    }

    /**
     * Predict fracture from image
     */
    static async predict(
        file: File,
        onProgress?: (message: string) => void
    ): Promise<ModelPrediction> {
        try {
            onProgress?.('Loading model...');
            const session = await this.loadModel();

            onProgress?.('Preprocessing image...');
            const inputTensor = await this.preprocessImage(file);

            onProgress?.('Running inference...');
            const feeds = { images: inputTensor };
            const results = await session.run(feeds);

            // YOLO output typically named 'output0' or similar
            const outputTensor = results[Object.keys(results)[0]];

            onProgress?.('Interpreting results...');
            const prediction = this.interpretPrediction(outputTensor);

            return prediction;

        } catch (error: any) {
            console.error('❌ Prediction error:', error);
            throw error;
        }
    }
}
