import { Language } from '@/types';

// Detailed fracture information interface
export interface FractureDetail {
    name: string;
    description: string;
    causes: string[];
    commonLocations: string[];
    symptoms: string[];
    treatment: string[];
    imagePath: string; // Path to example image
}

// Complete fracture details - 4 languages
export const FRACTURE_DETAILS: Record<Language, Record<string, FractureDetail>> = {
    th: {
        "Avulsion fracture": {
            name: "กระดูกหักแบบการฉีกขาด",
            description: "เกิดจากการดึงของกล้ามเนื้อหรือเอ็นที่ติดกับกระดูก ทำให้ชิ้นเล็กๆ ของกระดูกหลุดออกมา",
            causes: [
                "การเคลื่อนไหวกะทันหัน เช่น กระโดด วิ่งเร็ว",
                "การหมุนหรือเปลี่ยนทิศทางอย่างรวดเร็ว",
                "การเล่นกีฬาที่ใช้แรงมาก เช่น ฟุตบอล บาสเกตบอล"
            ],
            commonLocations: [
                "ข้อเท้า (Ankle)",
                "เข้าเฝ่า (Pelvis)",
                "นิ้วมือและนิ้วเท้า (Fingers and Toes)",
                "ข้อศอก (Elbow)"
            ],
            symptoms: [
                "ปวดเฉพาะจุดที่บาดเจ็บ",
                "บวม และอาจมีรอยช้ำ",
                "จำกัดการเคลื่อนไหว",
                "อาจได้ยินเสียงแตก ตอนบาดเจ็บ"
            ],
            treatment: [
                "พักผ่อน ยกขาหรือแขนที่บาดเจ็บ",
                "ประคบเย็น 15-20 นาที",
                "ใส่เฝือกหรือผ้าพันยึดข้อ 3-6 สัปดาห์",
                "กายภาพบำบัดหลังเฝือกถอด",
                "ผ่าตัดในกรณีที่ชิ้นกระดูกเคลื่อนไกลมาก"
            ],
            imagePath: "/fractures/avulsion.jpg"
        },
        "Comminuted fracture": {
            name: "กระดูกหักเป็นชิ้นเล็กหลายชิ้น",
            description: "กระดูกแตกเป็นชิ้นเล็ก 3 ชิ้นขึ้นไป จากอุบัติเหตุรุนแรง",
            causes: [
                "อุบัติเหตุรถยนต์ความเร็วสูง",
                "ตกจากที่สูง",
                "การกระทบกระแทกแรงมาก",
                "กระสุนปืน (กรณีพิเศษ)"
            ],
            commonLocations: [
                "กระดูกต้นขา (Femur)",
                "กระดูกแข้ง (Tibia)",
                "กระดูกต้นแขน (Humerus)",
                "กระดูกเชิงกราน (Pelvis)"
            ],
            symptoms: [
                "ปวดรุนแรงมาก",
                "บวมมาก อาจมีเลือดออกในเนื้อเยื่อ",
                "ไม่สามารถขยับขาหรือแขนได้",
                "รูปร่างผิดปกติ (Deformity)",
                "อาจช็อกจากการบาดเจ็บ"
            ],
            treatment: [
                "ผ่าตัดเกือบทุกกรณี",
                "ใส่แผ่นโลหะและสกรูยึดกระดูก",
                "กายภาพบำบัดระยะยาว 6-12 เดือน",
                "อาจต้องปลูกถ่ายกระดูกในบางกรณี",
                "ติดตามผลด้วย X-ray สม่ำเสมอ"
            ],
            imagePath: "/fractures/comminuted.jpg"
        },
        "Compression-Crush fracture": {
            name: "กระดูกหักจากการอัดแรง",
            description: "กระดูกถูกบีบอัดจนแบนหรือยุบ มักเกิดในกระดูกสันหลัง",
            causes: [
                "ตกจากที่สูงลงมาในท่ายืน",
                "โรคกระดูกพรุน (Osteoporosis)",
                "อุบัติเหตุรถยนต์",
                "การยกของหนักผิดท่า"
            ],
            commonLocations: [
                "กระดูกสันหลังส่วนอก (Thoracic spine)",
                "กระดูกสันหลังส่วนเอว (Lumbar spine)",
                "ส้นเท้า (Calcaneus)",
                "ข้อมือ (Wrist - Radius)"
            ],
            symptoms: [
                "ปวดหลังเฉียบพลัน",
                "สูงลดลง (ถ้าเป็นกระดูกสันหลัง)",
                "หลังค่อม ท่าทางผิดปกติ",
                "อาจมีอาการปวดเมื่อหายใจลึก",
                "อาการ ชามีความรุนแรงมากในผู้สูงอายุ"
            ],
            treatment: [
                "พักผ่อน หลีกเลี่ยงการยกของหนัก",
                "สวมเสื้อพยุงหลัง (Back brace) 6-12 สัปดาห์",
                "ทาน Vertebroplasty (ฉีดซีเมนต์เข้ากระดูก)",
                "กายภาพบำบัดเพื่อสร้างความแข็งแรงกล้ามเนื้อ",
                "ยารักษาโรคกระดูกพรุน (ถ้ามี)"
            ],
            imagePath: "/fractures/compression.jpg"
        },
        "Fracture Dislocation": {
            name: "กระดูกหักพร้อมข้อเคล็ด",
            description: "กระดูกหักและข้อกระดูกเคลื่อนออกจากตำแหน่งพร้อมกัน เป็นอันตรายสูง",
            causes: [
                "อุบัติเหตุรุนแรง เช่น อุบัติเหตุรถยนต์",
                "การล้มหกจากที่สูง",
                "การกระแทกแรงโดยตรงที่ข้อต่อ",
                "กีฬาที่มีการปะทะกันแรง เช่น รักบี้"
            ],
            commonLocations: [
                "ข้อศอก (Elbow)",
                "ข้อเท้า (Ankle)",
                "ข้อสะโพก (Hip)",
                "ข้อไหล่ (Shoulder)"
            ],
            symptoms: [
                "ปวดรุนแรงมาก",
                "ข้อผิดรูปอย่างเห็นได้ชัด",
                "บวมและช้ำทันที",
                "ไม่สามารถขยับข้อได้เลย",
                "อาจมีชาหรือเย็นปลายมือปลายเท้า (กดทับเส้นประสาท/หลอดเลือด)"
            ],
            treatment: [
                "ฉุกเฉิน! รีบปรับข้อเข้าที่ทันที",
                "ผ่าตัดเกือบทุกกรณี",
                "ใส่โลหะุยึดกระดูก",
                "เฝือกหลังผ่าตัด 6-8 สัปดาห์",
                "กายภาพบำบัดอย่างเข้มข้น 3-6 เดือน",
                "ติดตามอาการแทรกซ้อนระยะยาว"
            ],
            imagePath: "/fractures/dislocation.jpg"
        },
        "Greenstick fracture": {
            name: "กระดูกหักไม่ทะลุ (ในเด็ก)",
            description: "กระดูกงอแต่ไม่หักขาด เหมือนกิ่งไผ่เขียวที่งอ พบในเด็กเป็นหลัก",
            causes: [
                "การล้มจากความสูงต่ำ เช่น จากจักรยาน",
                "การกระทบที่ไม่รุนแรงมาก",
                "กระดูกเด็กยืดหยุ่นจึงไม่หักขาด",
                "กีฬาของเด็ก เช่น การเล่นในสนามเด็กเล่น"
            ],
            commonLocations: [
                "กระดูกแขนข้างนอก (Radius - Forearm)",
                "กระดูกแขนข้างใน (Ulna)",
                "กระดูกหน้าแข้ง (Tibia)",
                "กระดูกนิ้ว (Finger bones)"
            ],
            symptoms: [
                "ปวดปานกลาง ไม่รุนแรงเหมือนกระดูกหักทั่วไป",
                "บวมเล็กน้อย",
                "จำกัดการขยับแขนหรือขา",
                "เด็กอาจร้องไห้แต่ยังใช้แขนได้บ้าง"
            ],
            treatment: [
                "ใส่เฝือก 3-4 สัปดาห์",
                "หายเร็วกว่าผู้ใหญ่",
                "ไม่ค่อยต้องผ่าตัด",
                "กระดูกเด็กเจริญเติบโตได้ดี สามารถปรับตัวแก้ไขได้เอง",
                "ติดตามเจริญเติบโตของกระดูก"
            ],
            imagePath: "/fractures/greenstick.jpg"
        },
        "Hairline Fracture": {
            name: "รอยแตกเล็กๆ บนกระดูก",
            description: "รอยร้าวเล็กๆ บนกระดูก มองไม่เห็นชัดใน X-ray",
            causes: [
                "การใช้งานซ้ำๆ เป็นเวลานาน (Repetitive stress)",
                "วิ่งระยะไกล กระโดดเชือก ออกกำลังกายหนัก",
                "การเต้นรำ บัลเล่ต์",
                "กระดูกพรุนในผู้สูงอายุ"
            ],
            commonLocations: [
                "กระดูกหน้าแข้ง (Tibia)",
                "กระดูกเมตาทาร์ซัล (Metatarsals - เท้า)",
                "กระดูกสะโพก (Hip)",
                "กระดูกสันหลังส่วนเอว (Lumbar spine)"
            ],
            symptoms: [
                "ปวดเมื่อออกกำลังกาย หายเมื่อพัก",
                "ปวดค่อยๆ เพิ่มขึ้นเรื่อยๆ",
                "บวมเล็กน้อย อาจไม่มี",
                "กดเจ็บเฉพาะจุด",
                "X-ray อาจมองไม่เห็น ต้องใช้ MRI"
            ],
            treatment: [
                "พักผ่อน หยุดกิจกรรมที่ทำให้เกิด 6-8 สัปดาห์",
                "ประคบเย็น",
                "รองเท้าพิเศษหรือ Boot",
                "ยาแก้ปวดตามความจำเป็น",
                "กลับไปออกกำลังกายอย่างค่อยเป็นค่อยไป",
                "ปรับเปลี่ยนรูปแบบการออกกำลังกาย"
            ],
            imagePath: "/fractures/hairline.jpg"
        },
        "Impacted fracture": {
            name: "ส่วนของกระดูกชนเข้าหากัน",
            description: "ปลายกระดูกชิ้นหนึ่งเสียบเข้าไปในอีกชิ้น มักพบในผู้สูงอายุ",
            causes: [
                "การล้มแรงๆ โดยเฉพาะผู้สูงอายุ",
                "กระดูกพรุนทำให้กระดูกอ่อนตัว",
                "การลงจากที่สูงโดยยืดแขนหรือขาออกมารับน้ำหนัก",
                "อุบัติเหตุรถยนต์"
            ],
            commonLocations: [
                "คอกระดูกต้นขา (Femoral neck - สะโพก)",
                "ข้อมือ (Wrist - Distal radius)",
                "กระดูกต้นแขน (Proximal humerus - ไหล่)",
                "กระดูกสันหลัง (Vertebrae)"
            ],
            symptoms: [
                "ปวดมาก โดยเฉพาะเมื่อขยับ",
                "บวม อาจมีช้ำ",
                "แขนหรือขาสั้นลงเล็กน้อย",
                "ไม่สามารถยืนหรือกางแขนได้",
                "ในคอกระดูกต้นขา: ขาหมุนออกนอก"
            ],
            treatment: [
                "กระดูกอาจติดกันเองได้ (มีเสถียรภาพ)",
                "อาจไม่ต้องผ่าตัดถ้าไม่เคลื่อนตำแหน่ง",
                "ใส่เฝือกหรือ Sling 6-8 สัปดาห์",
                "กรณีเคลื่อน: ผ่าตัดยึดด้วยสกรู",
                "กายภาพบำบัดเพื่อฟื้นฟูการเคลื่อนไหว",
                "ยารักษากระดูกพรุนถ้ามี"
            ],
            imagePath: "/fractures/impacted.jpg"
        },
        "Intra-articular fracture": {
            name: "กระดูกหักทะลุผ่านข้อต่อ",
            description: "รอยหักทะลุผ่านผิวข้อต่อ อันตรายต่อการทำงานของข้อ",
            causes: [
                "การกระทบแรงโดยตรงที่ข้อต่อ",
                "การล้มหกราบลงในท่าแปลกๆ",
                "อุบัติเหตุกีฬา",
                "อุบัติเหตุจราจร"
            ],
            commonLocations: [
                "ข้อเข่า (Knee - Tibial plateau)",
                "ข้อศอก (Elbow)",
                "ข้อเท้า (Ankle)",
                "ข้อมือ (Wrist)"
            ],
            symptoms: [
                "ปวดรุนแรงมากในข้อ",
                "บวมมากภายในข้อ (เลือดออกในข้อ)",
                "ไม่สามารถขยับข้อได้เลย",
                "ข้อผิดรูป อาจคดงอไม่ตรง",
                "หากเสียหายมาก: จำกัดการทำงานของข้อถาวร"
            ],
            treatment: [
                "ผ่าตัดเกือบทุกกรณี",
                "ต้องซ่อมผิวข้อให้เรียบ เพื่อป้องกันข้อเสื่อม",
                "ใส่โลหะยึดอย่างแม่นยำ",
                "กายภาพบำบัดระยะยาว 6-12 เดือน",
                "ติดตามอาการข้อเสื่อม (Arthritis) ในระยะยาว",
                "อาจต้องผ่าตัดเปลี่ยนข้อเทียมในอนาคต"
            ],
            imagePath: "/fractures/intraarticular.jpg"
        },
        "Longitudinal fracture": {
            name: "กระดูกหักตามแนวยาว",
            description: "รอยหักวิ่งไปตามแนวยาวของกระดูก",
            causes: [
                "แรงกระแทกตามแนวแกนกระดูก",
                "การกระโดดลงมาจากที่สูง",
                "อุบัติเหตุรถยนต์ (กระแทกในท่ายืด)",
                "การกระทบโดยตรงในทิศทางยาว"
            ],
            commonLocations: [
                "กระดูกแขนข้างนอก (Radius)",
                "กระดูกแขนข้างใน (Ulna)",
                "กระดูกหน้าแข้ง (Tibia)",
                "กระดูกนิ้ว (Phalanges)"
            ],
            symptoms: [
                "ปวดตามแนวยาวของกระดูก",
                "บวมและช้ำ",
                "จำกัดการเคลื่อนไหว",
                "กระดูกมักไม่เคลื่อนตำแหน่ง (Stable)"
            ],
            treatment: [
                "มักใส่เฝือก 6-8 สัปดาห์",
                "ไม่ค่อยต้องผ่าตัด เพราะกระดูกไม่เคลื่อน",
                "พักผ่อน ไม่รับน้ำหนัก",
                "กายภาพบำบัดหลังเฝือกถอด",
                "ติดตามด้วย X-ray เป็นระยะ"
            ],
            imagePath: "/fractures/longitudinal.jpg"
        },
        "Oblique fracture": {
            name: "กระดูกหักเป็นเส้นทแยง",
            description: "รอยหักเป็นเส้นเฉียงผ่านกระดูก มักเคลื่อนตำแหน่งง่าย",
            causes: [
                "แรงบิดผสมกับแรงกระแทก",
                "การล้มในขณะเคลื่อนไหว",
                "อุบัติเหตุกีฬา",
                "อุบัติเหตุรถยนต์"
            ],
            commonLocations: [
                "กระดูกแข้ง (Tibia)",
                "กระดูกแน่ (Fibula)",
                "กระดูกต้นแขน (Humerus)",
                "กระดูกต้นขา (Femur)"
            ],
            symptoms: [
                "ปวดมาก",
                "บวมและช้ำเลือดออก",
                "กระดูกเคลื่อนตำแหน่ง เห็นผิดรูปชัด",
                "ไม่สามารถใช้แขนหรือขาได้",
                "อาจมีเสี้ยงกระดูกยื่นออกมา (กรณีเปิด)"
            ],
            treatment: [
                "มักต้องผ่าตัด",
                "ใส่แผ่นโลหะและสกรูยึด",
                "เฝือกหลังผ่าตัด 6-12 สัปดาห์",
                "กายภาพบำบัด 3-6 เดือน",
                "ติดตามการประกอบกระดูกด้วย X-ray"
            ],
            imagePath: "/fractures/oblique.jpg"
        },
        "Pathological fracture": {
            name: "กระดูกหักจากโรคประจำตัว",
            description: "เกิดจากแรงเพียงเล็กน้อย เพราะกระดูกอ่อนแอจากโรค",
            causes: [
                "มะเร็งกระดูก (Primary or Metastatic)",
                "โรคกระดูกพรุน (Osteoporosis)",
                "ติดเชื้อในกระดูก (Osteomyelitis)",
                "โรคต่างๆ ที่ทำลายกระดูก เช่น Paget's disease"
            ],
            commonLocations: [
                "กระดูกสันหลัง (Spine)",
                "กระดูกต้นขา (Femur)",
                "กระดูกสะโพก (Hip)",
                "กระดูกต้นแขน (Humerus)"
            ],
            symptoms: [
                "ปวดก่อนหัก (โรคทำลายกระดูกอยู่แล้ว)",
                "หักง่ายจากกิจกรรมเล็กน้อย",
                "หายช้า กระดูกไม่ติดกัน",
                "กลับมาหักซ้ำได้ง่าย",
                "อาจมีอาการอื่นของโรค เช่น น้ำหนักลด เบื่ออาหาร"
            ],
            treatment: [
                "รักษาโรคต้นเหตุเป็นหลัก",
                "เคมีบำบัด / รังสีรักษา (ถ้าเป็นมะเร็ง)",
                "ยาแก้ปวดระดับแรง",
                "อาจผ่าตัดยึดกระดูก หรือใส่โลหะเสริม",
                "ติดตามโรคอย่างใกล้ชิด",
                "กายภาพบำบัดเบาๆ ตามความเหมาะสม"
            ],
            imagePath: "/fractures/pathological.jpg"
        },
        "Spiral Fracture": {
            name: "กระดูกหักเป็นเกลียว",
            description: "รอยหักเป็นเกลียวรอบกระดูก เกิดจากแรงบิดม้วน",
            causes: [
                "การกีฬา: ฟุตบอล บาสเกตบอล สกี",
                "การบิดขณะเท้าติดพื้น แต่ร่างกายหมุน",
                "การล้มขณะวิ่ง",
                "อุบัติเหตุที่มีการบิดม้วน"
            ],
            commonLocations: [
                "กระดูกแข้ง (Tibia)",
                "กระดูกต้นขา (Femur)",
                "กระดูกแน่ (Fibula)",
                "กระดูกต้นแขน (Humerus)"
            ],
            symptoms: [
                "ปวดรุนแรงทันที",
                "บวมและช้ำมาก",
                "ขาหรือแขนผิดรูป บิดเบี้ยว",
                "ไม่สามารถรับน้ำหนักหรือยกของได้",
                "อันตราย: อาจกดทับเส้นประสาทและหลอดเลือด"
            ],
            treatment: [
                "ผ่าตัดเกือบทุกกรณี",
                "ใส่แกนโลหะยาว (Intramedullary rod)",
                "เฝือก 8-12 สัปดาห์",
                "กายภาพบำบัดระยะยาว 4-6 เดือน",
                "ระวังการติดเชื้อและภาวะแทรกซ้อน",
                "หายเต็มที่อาจใช้เวลา 6-12 เดือน"
            ],
            imagePath: "/fractures/spiral.jpg"
        }
    },
    // สร้าง structure เหมือนกันสำหรับอีก 3 ภาษา แต่ข้อมูลต่างกัน
    en: {
        "Avulsion fracture": {
            name: "Avulsion Fracture",
            description: "Occurs when a tendon or ligament pulls away a bone fragment",
            causes: [
                "Sudden movements like jumping or sprinting",
                "Rapid rotation or direction changes",
                "High-impact sports: football, basketball"
            ],
            commonLocations: [
                "Ankle",
                "Pelvis",
                "Fingers and toes",
                "Elbow"
            ],
            symptoms: [
                "Localized pain at injury site",
                "Swelling and possible bruising",
                "Limited range of motion",
                "May hear popping sound during injury"
            ],
            treatment: [
                "Rest and elevate injured limb",
                "Ice application 15-20 minutes",
                "Splint or immobilization 3-6 weeks",
                "Physical therapy after cast removal",
                "Surgery if fragment displaced significantly"
            ],
            imagePath: "/fractures/avulsion.jpg"
        },
        "Comminuted fracture": {
            name: "Comminuted Fracture",
            description: "Bone breaks into 3 or more fragments from severe trauma",
            causes: [
                "High-speed motor vehicle accidents",
                "Falls from significant height",
                "Severe impact trauma",
                "Gunshot wounds (special cases)"
            ],
            commonLocations: [
                "Femur (thigh bone)",
                "Tibia (shin bone)",
                "Humerus (upper arm)",
                "Pelvis"
            ],
            symptoms: [
                "Severe pain",
                "Significant swelling with possible hemorrhage",
                "Complete inability to move limb",
                "Visible deformity",
                "Risk of shock from trauma"
            ],
            treatment: [
                "Surgery in almost all cases",
                "Metal plates and screws fixation",
                "Long-term physical therapy 6-12 months",
                "Bone grafting may be necessary",
                "Regular X-ray monitoring"
            ],
            imagePath: "/fractures/comminuted.jpg"
        },
        "Compression-Crush fracture": {
            name: "Compression-Crush Fracture",
            description: "Bone compressed until flattened or collapsed, common in spine",
            causes: [
                "Falls from height landing upright",
                "Osteoporosis",
                "Car accidents",
                "Improper heavy lifting"
            ],
            commonLocations: [
                "Thoracic spine",
                "Lumbar spine",
                "Calcaneus (heel)",
                "Wrist (distal radius)"
            ],
            symptoms: [
                "Sudden back pain",
                "Loss of height (if spine)",
                "Kyphosis (hunched back)",
                "Pain when breathing deeply",
                "More severe symptoms in elderly"
            ],
            treatment: [
                "Rest, avoid heavy lifting",
                "Back brace support 6-12 weeks",
                "Vertebroplasty (cement injection)",
                "Physical therapy for muscle strengthening",
                "Osteoporosis medication if applicable"
            ],
            imagePath: "/fractures/compression.jpg"
        },
        "Fracture Dislocation": {
            name: "Fracture with Dislocation",
            description: "Fracture combined with joint displacement, high risk injury",
            causes: [
                "Severe trauma like car accidents",
                "Falls from significant height",
                "Direct impact to joint",
                "High-contact sports like rugby"
            ],
            commonLocations: [
                "Elbow",
                "Ankle",
                "Hip",
                "Shoulder"
            ],
            symptoms: [
                "Severe pain",
                "Obvious joint deformity",
                "Immediate swelling and bruising",
                "Complete inability to move joint",
                "Numbness or coldness in extremities (nerve/vessel compression)"
            ],
            treatment: [
                "Emergency! Immediate reduction required",
                "Surgery in almost all cases",
                "Metal fixation",
                "Cast after surgery 6-8 weeks",
                "Intensive physical therapy 3-6 months",
                "Long-term complication monitoring"
            ],
            imagePath: "/fractures/dislocation.jpg"
        },
        "Greenstick fracture": {
            name: "Greenstick Fracture",
            description: "Bone bends but doesn't break completely, like green bamboo",
            causes: [
                "Falls from low heights (bicycles)",
                "Low-impact trauma",
                "Children's bones are flexible",
                "Playground injuries"
            ],
            commonLocations: [
                "Radius (forearm)",
                "Ulna (forearm)",
                "Tibia (shin)",
                "Finger bones"
            ],
            symptoms: [
                "Moderate pain, not severe like complete fractures",
                "Minimal swelling",
                "Limited movement of arm or leg",
                "Child may cry but still use limb somewhat"
            ],
            treatment: [
                "Cast immobilization 3-4 weeks",
                "Faster healing than adults",
                "Rarely requires surgery",
                "Children's bones remodel well naturally",
                "Monitor bone growth"
            ],
            imagePath: "/fractures/greenstick.jpg"
        },
        "Hairline Fracture": {
            name: "Hairline Fracture",
            description: "Small crack in bone, not clearly visible on X-ray",
            causes: [
                "Repetitive stress over time",
                "Long-distance running, jumping rope",
                "Dance, ballet",
                "Osteoporosis in elderly"
            ],
            commonLocations: [
                "Tibia (shin bone)",
                "Metatarsals (foot bones)",
                "Hip",
                "Lumbar spine"
            ],
            symptoms: [
                "Pain during activity, relief with rest",
                "Gradually worsening pain",
                "Minimal or no swelling",
                "Point tenderness",
                "May not show on X-ray, need MRI"
            ],
            treatment: [
                "Rest from causative activity 6-8 weeks",
                "Ice application",
                "Special shoes or walking boot",
                "Pain medication as needed",
                "Gradual return to activity",
                "Modify exercise routine"
            ],
            imagePath: "/fractures/hairline.jpg"
        },
        "Impacted fracture": {
            name: "Impacted Fracture",
            description: "Broken bone ends driven into each other, common in elderly",
            causes: [
                "Forceful falls, especially in elderly",
                "Osteoporosis weakening bones",
                "Landing with outstretched arm or leg",
                "Motor vehicle accidents"
            ],
            commonLocations: [
                "Femoral neck (hip)",
                "Distal radius (wrist)",
                "Proximal humerus (shoulder)",
                "Vertebrae (spine)"
            ],
            symptoms: [
                "Severe pain with movement",
                "Swelling, possible bruising",
                "Limb appears slightly shortened",
                "Inability to stand or raise arm",
                "In femoral neck: leg rotated outward"
            ],
            treatment: [
                "Bones may heal naturally (stable)",
                "May not require surgery if non-displaced",
                "Cast or sling 6-8 weeks",
                "If displaced: surgical screw fixation",
                "Physical therapy for mobility restoration",
                "Osteoporosis treatment if present"
            ],
            imagePath: "/fractures/impacted.jpg"
        },
        "Intra-articular fracture": {
            name: "Intra-articular Fracture",
            description: "Fracture extends through joint surface, dangerous for joint function",
            causes: [
                "Direct impact to joint",
                "Falls landing awkwardly",
                "Sports injuries",
                "Traffic accidents"
            ],
            commonLocations: [
                "Knee (tibial plateau)",
                "Elbow",
                "Ankle",
                "Wrist"
            ],
            symptoms: [
                "Severe pain in joint",
                "Significant joint swelling (hemarthrosis)",
                "Complete inability to move joint",
                "Joint deformity, misalignment",
                "If severe: permanent joint dysfunction"
            ],
            treatment: [
                "Surgery in almost all cases",
                "Joint surface must be smoothed to prevent arthritis",
                "Precise metal fixation",
                "Long-term physical therapy 6-12 months",
                "Monitor for arthritis development",
                "May require joint replacement in future"
            ],
            imagePath: "/fractures/intraarticular.jpg"
        },
        "Longitudinal fracture": {
            name: "Longitudinal Fracture",
            description: "Fracture line runs along the length of bone",
            causes: [
                "Impact force along bone axis",
                "Jumping from height",
                "Car accidents (stretched position)",
                "Direct longitudinal impact"
            ],
            commonLocations: [
                "Radius (forearm)",
                "Ulna (forearm)",
                "Tibia (shin)",
                "Phalanges (fingers)"
            ],
            symptoms: [
                "Pain along bone length",
                "Swelling and bruising",
                "Limited movement",
                "Usually stable (non-displaced)"
            ],
            treatment: [
                "Cast immobilization 6-8 weeks",
                "Rarely requires surgery (stable fracture)",
                "Rest, non-weight bearing",
                "Physical therapy after cast removal",
                "Regular X-ray follow-up"
            ],
            imagePath: "/fractures/longitudinal.jpg"
        },
        "Oblique fracture": {
            name: "Oblique Fracture",
            description: "Diagonal fracture line across bone, tends to displace",
            causes: [
                "Twisting force combined with impact",
                "Falls while moving",
                "Sports accidents",
                "Motor vehicle accidents"
            ],
            commonLocations: [
                "Tibia (shin bone)",
                "Fibula (calf bone)",
                "Humerus (upper arm)",
                "Femur (thigh bone)"
            ],
            symptoms: [
                "Severe pain",
                "Swelling and bruising",
                "Visible displacement and deformity",
                "Inability to use limb",
                "Bone ends may protrude (open fracture)"
            ],
            treatment: [
                "Usually requires surgery",
                "Metal plates and screws",
                "Cast after surgery 6-12 weeks",
                "Physical therapy 3-6 months",
                "X-ray monitoring of healing"
            ],
            imagePath: "/fractures/oblique.jpg"
        },
        "Pathological fracture": {
            name: "Pathological Fracture",
            description: "Fracture from minimal force due to bone weakening disease",
            causes: [
                "Bone cancer (primary or metastatic)",
                "Osteoporosis",
                "Osteomyelitis (bone infection)",
                "Bone-destroying diseases like Paget's disease"
            ],
            commonLocations: [
                "Spine",
                "Femur (thigh bone)",
                "Hip",
                "Humerus (upper arm)"
            ],
            symptoms: [
                "Pain before fracture (disease present)",
                "Fractures easily from minor activities",
                "Slow healing, non-union",
                "Prone to re-fracture",
                "Other disease symptoms: weight loss, appetite loss"
            ],
            treatment: [
                "Treat underlying disease primarily",
                "Chemotherapy/radiation (if cancer)",
                "Strong pain medication",
                "May require surgical fixation or reinforcement",
                "Close disease monitoring",
                "Gentle physical therapy as appropriate"
            ],
            imagePath: "/fractures/pathological.jpg"
        },
        "Spiral Fracture": {
            name: "Spiral Fracture",
            description: "Fracture spirals around bone from twisting force",
            causes: [
                "Sports: football, basketball, skiing",
                "Twisting while foot planted, body rotates",
                "Falls while running",
                "Twisting accidents"
            ],
            commonLocations: [
                "Tibia (shin bone)",
                "Femur (thigh bone)",
                "Fibula (calf bone)",
                "Humerus (upper arm)"
            ],
            symptoms: [
                "Immediate severe pain",
                "Significant swelling and bruising",
                "Twisted, deformed limb appearance",
                "Cannot bear weight or lift objects",
                "Danger: may compress nerves and blood vessels"
            ],
            treatment: [
                "Surgery in almost all cases",
                "Long intramedullary rod insertion",
                "Cast 8-12 weeks",
                "Long-term physical therapy 4-6 months",
                "Monitor for infection and complications",
                "Full recovery may take 6-12 months"
            ],
            imagePath: "/fractures/spiral.jpg"
        }
    },
    zh: {
        // ข้อมูลภาษาจีนแบบเดียวกัน
        "Avulsion fracture": {
            name: "撕脱性骨折",
            description: "肌腱或韧带拉扯导致骨片脱落",
            causes: ["突然运动如跳跃或冲刺", "快速旋转或改变方向", "高冲击运动：足球、篮球"],
            commonLocations: ["踝关节", "骨盆", "手指和脚趾", "肘部"],
            symptoms: ["受伤部位局部疼痛", "肿胀可能有瘀伤", "活动范围受限", "受伤时可能听到爆裂声"],
            treatment: ["休息并抬高受伤肢体", "冷敷15-20分钟", "夹板固定3-6周", "拆除石膏后物理治疗", "如骨片明显移位需手术"],
            imagePath: "/fractures/avulsion.jpg"
        },
        "Comminuted fracture": {
            name: "粉碎性骨折",
            description: "严重创伤导致骨头碎裂成3个或更多碎片",
            causes: ["高速车祸", "从高处坠落", "严重撞击创伤", "枪伤（特殊情况）"],
            commonLocations: ["股骨（大腿骨）", "胫骨（小腿骨）", "肱骨（上臂）", "骨盆"],
            symptoms: ["剧烈疼痛", "严重肿胀可能出血", "完全无法移动肢体", "明显畸形", "创伤性休克风险"],
            treatment: ["几乎都需手术", "金属板和螺钉固定", "长期物理治疗6-12月", "可能需要植骨", "定期X光监测"],
            imagePath: "/fractures/comminuted.jpg"
        },
        // ... ข้อมูลอื่นๆ
    },
    ja: {
        // ข้อมูลภาษาญี่ปุ่นแบบเดียวกัน
        "Avulsion fracture": {
            name: "裂離骨折",
            description: "腱や靱帯が骨片を引き離す",
            causes: ["ジャンプや疾走などの突然の動き", "急速な回転や方向転換", "高衝撃スポーツ：サッカー、バスケットボール"],
            commonLocations: ["足首", "骨盤", "指と足指", "肘"],
            symptoms: ["受傷部位の局所的な痛み", "腫れと打撲の可能性", "可動域制限", "受傷時にポップ音が聞こえることがある"],
            treatment: ["休息し受傷肢を挙上", "15-20分間冷却", "3-6週間添え木固定", "ギプス除去後の理学療法", "骨片が大きく転位している場合は手術"],
            imagePath: "/fractures/avulsion.jpg"
        },
        "Comminuted fracture": {
            name: "粉砕骨折",
            description: "重度の外傷により骨が3つ以上の破片に砕ける",
            causes: ["高速自動車事故", "高所からの転落", "重度の衝撃外傷", "銃創（特殊なケース）"],
            commonLocations: ["大腿骨", "脛骨", "上腕骨", "骨盤"],
            symptoms: ["激しい痛み", "出血を伴う著しい腫れ", "肢の完全な動作不能", "明らかな変形", "外傷性ショックのリスク"],
            treatment: ["ほぼ全例で手術が必要", "金属プレートとねじでの固定", "6-12ヶ月の長期理学療法", "骨移植が必要な場合あり", "定期的なX線モニタリング"],
            imagePath: "/fractures/comminuted.jpg"
        },
        // ... ข้อมูลอื่นๆ
    }
};

// Original brief fracture info for cards
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

//  Fracture type keys for modal linking
export const FRACTURE_TYPE_KEYS = [
    "Avulsion fracture",
    "Comminuted fracture",
    "Compression-Crush fracture",
    "Fracture Dislocation",
    "Greenstick fracture",
    "Hairline Fracture",
    "Impacted fracture",
    "Intra-articular fracture",
    "Longitudinal fracture",
    "Oblique fracture",
    "Pathological fracture",
    "Spiral Fracture"
];
