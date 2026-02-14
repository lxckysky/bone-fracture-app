import { FractureType, LLMInsights, PatientInfo, Language } from '@/types';

/**
 * Context-Aware Gemini Service for Clinical Reasoning
 * แก้ไขปัญหา 404 และปรับปรุงการสกัด JSON
 */
export class GeminiService {
    // ใช้ Environment Variable แทนการ Hardcode (เพื่อความปลอดภัยและอัปเดตง่าย)
    private static API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

    // แก้ไข URL: ใช้ gemini-2.5-flash ซึ่งเป็นโมเดลเสถียรล่าสุดใน v1beta
    private static API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=`;

    static async generateInsights(
        fractureType: FractureType | string,
        confidence: number,
        patientInfo?: PatientInfo,
        language: Language = 'en',
        customPrompt?: string
    ): Promise<LLMInsights> {

        const now = new Date().toLocaleTimeString();
        console.log(`[${now}] GeminiService: เริ่มการวิเคราะห์เชิงลึก...`);

        try {
            return await this.generateGeminiInsights(this.API_KEY, fractureType, confidence, patientInfo, language);
        } catch (error: any) {
            console.error(`[${now}] Gemini Error:`, error.message);

            // ระบบสำรอง (Fallback) กรณี API มีปัญหา
            console.log("GeminiService: ใช้ระบบสำรอง (Manual Rules)");
            await new Promise(resolve => setTimeout(resolve, 500));

            return {
                contextualSummary: language === 'th'
                    ? `การวิเคราะห์เบื้องต้นพบความเสี่ยงระดับ ${Math.round(confidence * 100)}% สำหรับ ${fractureType}`
                    : `Preliminary clinical analysis for ${fractureType} with ${Math.round(confidence * 100)}% confidence.`,
                differentialDiagnosis: language === 'th'
                    ? ["การบาดเจ็บของเนื้อเยื่ออ่อนร่วมด้วย", "ภาวะกระดูกช้ำ (Bone Bruise)", "รอยร้าวขนาดเล็กที่อาจมองไม่เห็น"]
                    : ["Soft tissue injury", "Bone bruise", "Occult fracture"],
                recommendedNextSteps: language === 'th'
                    ? ["ประเมินความมั่นคงของข้อต่อ", "พิจารณาการส่งตรวจ CT Scan หากอาการไม่ดีขึ้น", "ปรึกษาแพทย์เฉพาะทางด้านออร์โธปิดิกส์"]
                    : ["Assess joint stability", "Consider CT Scan if symptoms persist", "Orthopedic specialist consultation"],
                clinicalRisks: language === 'th'
                    ? ["ความเสี่ยงต่อภาวะแทรกซ้อนของเส้นประสาท", "ภาวะบวมน้ำในเนื้อเยื่อ"]
                    : ["Potential nerve involvement", "Soft tissue edema"]
            };
        }
    }

    private static async generateGeminiInsights(
        apiKey: string,
        type: string,
        confidence: number,
        patient?: PatientInfo,
        lang: Language = 'en'
    ): Promise<LLMInsights> {

        // สร้าง Prompt ให้กำหนดรูปแบบอย่างเข้มงวดเพื่อบังคับให้ AI ตอบ JSON เท่านั้น
        const prompt = `You are a Senior Orthopedic Surgeon. Analyze this fracture case and respond with ONLY valid JSON.

Fracture: ${type}
Confidence: ${Math.round(confidence * 100)}%
Patient: Age ${patient?.age || 'N/A'}, Gender ${patient?.gender || 'N/A'}, Injury: ${patient?.mechanismOfInjury || 'Unknown'}

CRITICAL RULES:
1. Response MUST be ONLY valid JSON - no markdown, no code blocks, no explanation
2. Use ${lang === 'th' ? 'Thai language' : 'English language'} for all text
3. Keep all text SHORT and CONCISE (max 2-3 sentences per field)
4. Follow this EXACT structure:

{
   "contextualSummary": "Brief clinical summary here",
   "differentialDiagnosis": ["diagnosis 1", "diagnosis 2", "diagnosis 3"],
   "recommendedNextSteps": ["step 1", "step 2", "step 3"],
   "clinicalRisks": ["risk 1", "risk 2"]
}

Return the JSON now:`;

        const response = await fetch(`${this.API_URL}${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.2, // ปรับให้คำตอบคงที่ขึ้น
                    topP: 0.95,
                    maxOutputTokens: 2048, // เพิ่มขึ้นเพื่อป้องกันการตัดทอน
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `HTTP Error ${response.status}`);
        }

        const result = await response.json();

        if (!result.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("API ตอบกลับมาว่างเปล่า");
        }

        const rawText = result.candidates[0].content.parts[0].text;

        // ป้องกัน Error กรณี AI ตอบ Markdown มาด้วย (เช่น ```json ... ```)
        try {
            // ลบ markdown code block wrappers ออกก่อน (```json ... ``` หรือ ``` ... ```)
            let cleanedText = rawText.trim();

            // ตรวจสอบและลบ markdown code blocks
            if (cleanedText.startsWith('```')) {
                // ลบ ```json หรือ ``` ที่ขึ้นต้น และ ``` ที่ลงท้าย
                cleanedText = cleanedText.replace(/^```(?:json)?\s*\n?/i, '').replace(/\n?```\s*$/i, '');
            }

            // หา JSON object ในข้อความ (non-greedy match)
            const jsonMatch = cleanedText.match(/\{[\s\S]*?\}(?=\s*$)/);
            if (!jsonMatch) {
                console.error("ไม่พบรูปแบบ JSON ในคำตอบ:", cleanedText);
                throw new Error("ไม่พบรูปแบบ JSON ในคำตอบ");
            }

            const output = JSON.parse(jsonMatch[0]);

            return {
                contextualSummary: output.contextualSummary || "วิเคราะห์เสร็จสิ้น",
                differentialDiagnosis: output.differentialDiagnosis || [],
                recommendedNextSteps: output.recommendedNextSteps || [],
                clinicalRisks: output.clinicalRisks || []
            };
        } catch (parseError) {
            console.error("JSON Parse Error:", rawText);
            console.error("Parse Error Details:", parseError);
            throw new Error("ไม่สามารถประมวลผลคำตอบจาก AI ได้");
        }
    }
}