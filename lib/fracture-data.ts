import { FractureLabels, FractureType } from '@/types';

// Fracture type labels in 4 languages
export const fractureLabels: FractureLabels = {
    normal: {
        en: 'No Fracture Detected',
        th: 'ไม่พบการหัก',
        zh: '未检测到骨折',
        ja: '骨折は検出されませんでした',
    },
    clavicle: {
        en: 'Clavicle Fracture',
        th: 'กระดูกไหปลาร้าหัก',
        zh: '锁骨骨折',
        ja: '鎖骨骨折',
    },
    humerus: {
        en: 'Humerus Fracture',
        th: 'กระดูกต้นแขนหัก',
        zh: '肱骨骨折',
        ja: '上腕骨骨折',
    },
    radius_ulna: {
        en: 'Radius/Ulna Fracture',
        th: 'กระดูกแขนข้อมือหัก',
        zh: '桡骨/尺骨骨折',
        ja: '橈骨/尺骨骨折',
    },
    metacarpal: {
        en: 'Metacarpal Fracture',
        th: 'กระดูกฝ่ามือหัก',
        zh: '掌骨骨折',
        ja: '中手骨骨折',
    },
    femur: {
        en: 'Femur Fracture',
        th: 'กระดูกต้นขาหัก',
        zh: '股骨骨折',
        ja: '大腿骨骨折',
    },
    patella: {
        en: 'Patella Fracture',
        th: 'กระดูกสะบ้าหัก',
        zh: '髌骨骨折',
        ja: '膝蓋骨骨折',
    },
    tibia_fibula: {
        en: 'Tibia/Fibula Fracture',
        th: 'กระดูกแข้ง/น่องหัก',
        zh: '胫骨/腓骨骨折',
        ja: '脛骨/腓骨骨折',
    },
    ankle: {
        en: 'Ankle Fracture',
        th: 'กระดูกข้อเท้าหัก',
        zh: '踝骨骨折',
        ja: '足首骨折',
    },
    calcaneus: {
        en: 'Calcaneus Fracture',
        th: 'กระดูกส้นเท้าหัก',
        zh: '跟骨骨折',
        ja: '踵骨骨折',
    },
    metatarsal: {
        en: 'Metatarsal Fracture',
        th: 'กระดูกฝ่าเท้าหัก',
        zh: '跖骨骨折',
        ja: '中足骨骨折',
    },
    vertebral: {
        en: 'Vertebral Fracture',
        th: 'กระดูกสันหลังหัก',
        zh: '椎骨骨折',
        ja: '椎骨骨折',
    },
    pelvic: {
        en: 'Pelvic Fracture',
        th: 'กระดูกเชิงกรานหัก',
        zh: '骨盆骨折',
        ja: '骨盤骨折',
    },
    // Detailed AI Types (Matching backend output)
    "Avulsion fracture": {
        en: 'Avulsion Fracture',
        th: 'กระดูกหักแบบการฉีกขาด',
        zh: '撕脱性骨折',
        ja: '裂離骨折',
    },
    "Comminuted fracture": {
        en: 'Comminuted Fracture',
        th: 'กระดูกหักเป็นชิ้นเล็กหลายชิ้น',
        zh: '粉碎性骨折',
        ja: '粉砕骨折',
    },
    "Compression-Crush fracture": {
        en: 'Compression-Crush Fracture',
        th: 'กระดูกหักจากการอัดแรง',
        zh: '压缩性骨折',
        ja: '圧迫骨折',
    },
    "Fracture Dislocation": {
        en: 'Fracture Dislocation',
        th: 'กระดูกหักพร้อมข้อเคล็ด',
        zh: '骨折脱位',
        ja: '骨折脱臼',
    },
    "Greenstick fracture": {
        en: 'Greenstick Fracture',
        th: 'กระดูกหักไม่ทะลุ (ในเด็ก)',
        zh: '轻度骨折',
        ja: '若木骨折',
    },
    "Hairline Fracture": {
        en: 'Hairline Fracture',
        th: 'รอยแตกเล็กๆ บนกระดูก',
        zh: '发丝骨折',
        ja: 'ヘアライン骨折',
    },
    "Impacted fracture": {
        en: 'Impacted Fracture',
        th: 'ส่วนของกระดูกชนเข้าหากัน',
        zh: '嵌插性骨折',
        ja: '嵌入骨折',
    },
    "Intra-articular fracture": {
        en: 'Intra-articular Fracture',
        th: 'กระดูกหักทะลุผ่านข้อต่อ',
        zh: '关节内骨折',
        ja: '関節内骨折',
    },
    "Longitudinal fracture": {
        en: 'Longitudinal Fracture',
        th: 'กระดูกหักตามแนวยาว',
        zh: '纵行骨折',
        ja: '縦骨折',
    },
    "Oblique fracture": {
        en: 'Oblique Fracture',
        th: 'กระดูกหักเป็นเส้นทแยง',
        zh: '斜行骨折',
        ja: '斜骨折',
    },
    "Pathological fracture": {
        en: 'Pathological Fracture',
        th: 'กระดูกหักจากโรคประจำตัว',
        zh: '病理性骨折',
        ja: '病的骨折',
    },
    "Spiral Fracture": {
        en: 'Spiral Fracture',
        th: 'กระดูกหักเป็นเกลียว',
        zh: '螺旋性骨折',
        ja: 'らせん骨折',
    },
    "Test": {
        en: 'Test Case',
        th: 'กรณีทดสอบ',
        zh: '测试用例',
        ja: 'テストケース',
    },
    "Train": {
        en: 'Training Case',
        th: 'กรณีฝึกสอน',
        zh: '训练用例',
        ja: 'トレーニングケース',
    }
};

// Get all fracture types
export const fractureTypes: FractureType[] = Object.keys(fractureLabels) as FractureType[];

// Helper function to get label in specific language
export const getFractureLabel = (type: FractureType | string, language: 'en' | 'th' | 'zh' | 'ja'): string => {
    const labels = (fractureLabels as any)[type];
    if (!labels) return String(type);
    return labels[language] || labels['en'] || String(type);
};
