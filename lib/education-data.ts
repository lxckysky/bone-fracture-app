import { Language } from '@/types';

// Bone fracture types information - 4 languages
export const BONE_FRACTURE_INFO: Record<Language, Array<[string, string]>> = {
    th: [
        ["กระดูกหักแบบการฉีกขาด", "เกิดจากการดึงของกล้ามเนื้อหรือเอ็นที่ติดกับกระดูก"],
        ["กระดูกหักเป็นชิ้นเล็กหลายชิ้น", "กระดูกแตกเป็นชิ้นเล็ก 3 ชิ้นขึ้นไป"],
        ["กระดูกหักจากการอัดแรง", "เกิดจากแรงกดทับ มักพบในกระดูกสันหลัง"],
        ["กระดูกหักพร้อมข้อเคล็ด", "กระดูกหักร่วมกับข้อกระดูกเคลื่อนออกจากตำแหน่ง"],
        ["กระดูกหักไม่ทะลุ (ในเด็ก)", "กระดูกงอแต่ไม่หักทะลุ พบในเด็กที่กระดูกยืดหยุ่น"],
        ["รอยแตกเล็กๆ บนกระดูก", "รอยร้าวเล็กๆ บนกระดูก ไม่หักทะลุ"],
        ["ส่วนของกระดูกชนเข้าหากัน", "ปลายกระดูกที่หักถูกดันให้ซ้อนเข้าหากัน"],
        ["กระดูกหักทะลุผ่านข้อต่อ", "รอยหักทะลุผ่านผิวข้อต่อของกระดูก"],
        ["กระดูกหักตามแนวยาว", "รอยหักวิ่งตามแนวยาวของกระดูก"],
        ["กระดูกหักเป็นเส้นทแยง", "รอยหักเป็นเส้นเฉียงผ่านกระดูก"],
        ["กระดูกหักจากโรคประจำตัว", "เกิดจากกระดูกอ่อนแอด้วยโรค เช่น มะเร็งกระดูก"],
        ["กระดูกหักเป็นเกลียว", "รอยหักวิ่งเป็นเกลียวรอบกระดูก เกิดจากการบิดม้วน"]
    ],
    en: [
        ["Avulsion Fracture", "Caused by tendon or ligament pulling away bone fragment"],
        ["Comminuted Fracture", "Bone breaks into 3 or more fragments"],
        ["Compression-Crush Fracture", "Caused by compression force, common in spine"],
        ["Fracture Dislocation", "Fracture combined with joint dislocation"],
        ["Greenstick Fracture", "Bone bends but doesn't break completely (children)"],
        ["Hairline Fracture", "Small crack in bone without complete break"],
        ["Impacted Fracture", "Broken bone ends are driven into each other"],
        ["Intra-articular Fracture", "Fracture extends through joint surface"],
        ["Longitudinal Fracture", "Fracture line runs along bone length"],
        ["Oblique Fracture", "Diagonal fracture line across bone"],
        ["Pathological Fracture", "Caused by disease weakening bone (e.g., cancer)"],
        ["Spiral Fracture", "Fracture spirals around bone from twisting force"]
    ],
    zh: [
        ["撕脱性骨折", "肌腱或韧带拉扯导致骨片脱落"],
        ["粉碎性骨折", "骨头碎裂成3个或更多碎片"],
        ["压缩性骨折", "由压迫力造成，常见于脊柱"],
        ["骨折脱位", "骨折并伴有关节脱位"],
        ["轻度骨折", "骨头弯曲但未完全断裂（儿童）"],
        ["发丝骨折", "骨头细小裂缝，未完全断裂"],
        ["嵌插性骨折", "断裂的骨端相互嵌入"],
        ["关节内骨折", "骨折延伸穿过关节面"],
        ["纵行骨折", "骨折线沿骨长度方向"],
        ["斜行骨折", "骨折线斜穿骨头"],
        ["病理性骨折", "疾病导致骨质脆弱（如癌症）"],
        ["螺旋性骨折", "扭转力导致骨折螺旋环绕"]
    ],
    ja: [
        ["裂離骨折", "腱や靱帯が骨片を引き離す"],
        ["粉砕骨折", "骨が3つ以上の破片に砕ける"],
        ["圧迫骨折", "圧迫力により発生、脊椎に多い"],
        ["骨折脱臼", "骨折と関節脱臼が合併"],
        ["若木骨折", "骨が曲がるが完全に折れない（小児）"],
        ["ヘアライン骨折", "骨の細いひび、完全骨折ではない"],
        ["嵌入骨折", "骨折端が互いに押し込まれる"],
        ["関節内骨折", "骨折が関節面を通過"],
        ["縦骨折", "骨折線が骨の長さ方向"],
        ["斜骨折", "骨折線が骨を斜めに横断"],
        ["病的骨折", "疾患による骨の脆弱化（癌など）"],
        ["らせん骨折", "ねじれ力により骨折がらせん状"]
    ]
};

// System information - 4 languages
export const SYSTEM_INFO: Record<Language, Array<[string, string]>> = {
    th: [
        ["เทคโนโลยี AI", "ใช้โมเดล YOLO11x-cls ที่ผ่านการฝึกอบรมด้วยข้อมูลภาพ X-ray กระดูกหักคุณภาพสูง"],
        ["ความแม่นยำ", "ระบบสามารถจำแนกประเภทการหักของกระดูกได้ 12 รูปแบบ ด้วยความแม่นยำสูง"],
        ["ความเร็ว", "ประมวลผลรูปภาพและให้ผลลัพธ์ภายในเวลาไม่กี่วินาที"],
        ["LLM วิเคราะห์", "ใช้ Google Gemini วิเคราะห์บริบททางคลินิกและให้คำแนะนำเพิ่มเติม"]
    ],
    en: [
        ["AI Technology", "Uses YOLO11x-cls model trained on high-quality bone fracture X-ray datasets"],
        ["Accuracy", "System can classify 12 types of bone fractures with high accuracy"],
        ["Speed", "Processes images and provides results within seconds"],
        ["LLM Analysis", "Uses Google Gemini for clinical context analysis and recommendations"]
    ],
    zh: [
        ["AI技术", "使用在高质量骨折X光数据集上训练的YOLO11x-cls模型"],
        ["准确性", "系统能高精度分类12种骨折类型"],
        ["速度", "在几秒钟内处理图像并提供结果"],
        ["LLM分析", "使用Google Gemini进行临床背景分析和建议"]
    ],
    ja: [
        ["AI技術", "高品質な骨折X線データセットで訓練されたYOLO11x-clsモデルを使用"],
        ["精度", "システムは12種類の骨折タイプを高精度で分類可能"],
        ["速度", "数秒以内に画像を処理して結果を提供"],
        ["LLM分析", "Google Geminiで臨床コンテキスト分析と推奨事項を提供"]
    ]
};
