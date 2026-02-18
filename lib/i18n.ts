export type LanguageCode = 'th' | 'en' | 'zh' | 'ja';

export const LANGUAGES: Record<LanguageCode, any> = {
    th: {
        name: "ไทย",
        title: "🦴 ระบบวิเคราะห์กระดูกหัก",
        subtitle: "ระบบวิเคราะห์ภาพ X-ray กระดูกหักด้วย AI เทคโนโลยี YOLO11x-cls รองรับไฟล์ DICOM",
        description: "🏥 เครื่องมือช่วยวิเคราะห์เบื้องต้นสำหรับการตรวจหาประเภทของกระดูกหัก 12 รูปแบบ รองรับทั้งรูปภาพทั่วไปและไฟล์ DICOM",
        system_status: "สถานะระบบ",
        model_ready: "🟢 พร้อมใช้งาน",
        model_error: "🔴 ไม่พบโมเดล",
        dicom_supported: "🟢 รองรับ DICOM",
        dicom_not_supported: "🔴 ไม่รองรับ DICOM",
        upload_section: "อัปโหลดภาพ X-ray",
        upload_description: "เลือกประเภทไฟล์ที่ต้องการอัปโหลดเพื่อวิเคราะห์การหักของกระดูก",
        file_type_label: "เลือกประเภทไฟล์",
        image_type: "รูปภาพทั่วไป",
        dicom_type: "ไฟล์ DICOM",
        image_info: "📝 รูปภาพทั่วไป:",
        image_formats: "รองรับ: JPG, PNG, JPEG, BMP, TIFF",
        dicom_info: "🏥 ไฟล์ DICOM:",
        dicom_formats: "รองรับ: .dcm, .dicom",
        upload_image: "อัปโหลดรูปภาพ X-ray",
        upload_dicom: "อัปโหลดไฟล์ DICOM (.dcm)",
        analyze_button: "🔍 วิเคราะห์ภาพ X-ray",
        result_section: "📊 ผลการวิเคราะห์เบื้องต้น",
        result_description: "ผลลัพธ์เบื้องต้นจากการวิเคราะห์ประเภทการหักของกระดูก พร้อมข้อมูล DICOM metadata",
        waiting_upload: "รอการอัปโหลดภาพ",
        waiting_description: "กรุณาอัปโหลดภาพ X-ray หรือไฟล์ DICOM เพื่อเริ่มการวิเคราะห์เบื้องต้น",
        bone_types_title: "🦴 ประเภทการหักของกระดูกที่ระบบสามารถวิเคราะห์ได้",
        dicom_section_title: "🏥 ข้อมูลเกี่ยวกับ DICOM",
        system_info_title: "ℹ️ ข้อมูลเกี่ยวกับระบบ",
        disclaimer_title: "🏥 ข้อจำกัดความรับผิดชอบ:",
        disclaimer_text: "ระบบนี้เป็นเครื่องมือช่วยในการวิเคราะห์เบื้องต้นเท่านั้น<br>ไม่สามารถใช้แทนการวินิจฉัยของแพทย์ผู้เชี่ยวชาญได้ กรุณาปรึกษาแพทย์ออร์โธปิดิกส์เพื่อการตรวจสอบและรักษาที่เหมาะสม",
        powered_by: "Powered by YOLO11x-cls & Gradio | ระบบวิเคราะห์กระดูกหัก v2.5 รองรับ 4 ภาษา",
        analysis_result: "ผลการวิเคราะห์เบื้องต้น",
        confidence: "ความมั่นใจ",
        file_type: "ประเภทไฟล์",
        detailed_results: "📊 ผลลัพธ์โดยละเอียดเบื้องต้น (Top 5)",
        dicom_metadata: "📋 ข้อมูล DICOM Metadata",
        warning: "⚠️ คำเตือน:",
        warning_text: "ผลการวิเคราะห์นี้เป็นเพียงข้อมูลเบื้องต้นเท่านั้น ไม่สามารถใช้แทนการวินิจฉัยของแพทย์ผู้เชี่ยวชาญได้ กรุณาปรึกษาแพทย์ออร์โธปิดิกส์เพื่อการตรวจสอบและรักษาที่เหมาะสม",
        confidence_too_low: "⚠️ ความมั่นใจไม่เพียงพอ",
        min_confidence: "ต้องการความมั่นใจอย่างน้อย",
        no_image: "❌ ไม่พบรูปภาพหรือไฟล์ DICOM",
        no_image_desc: "กรุณาอัปโหลดรูปภาพ X-ray หรือไฟล์ DICOM เพื่อทำการวิเคราะห์",
        no_model: "⚠️ ไม่พบโมเดล",
        no_model_desc: "กรุณาอัปโหลดไฟล์ model.pt หรือตรวจสอบการติดตั้ง",
        process_error: "❌ เกิดข้อผิดพลาดในการประมวลผล",
        dicom_error: "❌ ไม่สามารถประมวลผลไฟล์ DICOM ได้",
        install_pydicom: "📦 การติดตั้ง pydicom:",
        install_instruction: "เพื่อใช้งานฟีเจอร์ DICOM กรุณาติดตั้ง:",

        // Buttons
        start_analysis: "เริ่มการวิเคราะห์",
        save_record: "บันทึกในประวัติผู้ป่วย",
        re_analyze: "วิเคราะห์ภาพใหม่",

        // Patient Form
        patient_context: 'ข้อมูลผู้ป่วย',
        patient_desc: 'ทางเลือก: ระบุรายละเอียดทางการแพทย์เพื่อความแม่นยำในการวิเคราะห์',
        age: 'อายุ (ปี)',
        gender: 'เพศ',
        gender_male: 'ชาย',
        gender_female: 'หญิง',
        gender_other: 'อื่นๆ',
        moi: 'สาเหตุการบาดเจ็บ',
        moi_placeholder: 'เช่น อุบัติเหตุรถยนต์, หกล้ม',
        pain_level: 'ระดับความเจ็บปวด (1-10)',
        medical_history: 'ประวัติการรักษา / ปัจจัยเสี่ยง',
        medical_history_placeholder: 'เช่น โรคกระดูกพรุน, เบาหวาน, การสูบบุหรี่, ประวัติกระดูกหัก',

        // LLM Section
        processing_ai: 'กำลังประมวลผล...',
        processing_vision: 'กำลังรันโมเดล Vision...',
        processing_llm: 'กำลังสังเคราะห์ข้อมูลเชิงลึกทางคลินิก...',
        clinical_reasoning: 'ระบบการใช้เหตุผลเชิงคลินิก',
        diff_dx: 'การวินิจฉัยแยกโรค',
        rec_steps: 'ขั้นตอนที่แนะนำ',
        clinical_risks: 'ความเสี่ยงทางคลินิก',
        llm_disclaimer: 'คำเตือน: การวิเคราะห์นี้เป็นการผสมผสานระหว่าง Computer Vision และ AI ช่วยตัดสินใจเชิงคลินิก กรุณาตรวจสอบผลลัพธ์ทางการแพทย์อีกครั้งเสมอ',

        // Validation
        invalid_image: '❌ รูปภาพไม่ถูกต้อง',
        invalid_image_desc: 'รูปภาพที่อัปโหลดดูเหมือนไม่ใช่ภาพ X-ray หรือภาพไม่มีคุณภาพเพียงพอ กรุณาลองใหม่อีกครั้ง'
    },
    en: {
        name: "English",
        title: "🦴 Bone Fracture Analysis System",
        subtitle: "AI-powered X-ray bone fracture analysis system using YOLO11x-cls technology with DICOM support",
        description: "🏥 Preliminary analysis tool for detecting 12 types of bone fractures, supporting both regular images and DICOM files",
        system_status: "System Status",
        model_ready: "🟢 Ready",
        model_error: "🔴 Model Not Found",
        dicom_supported: "🟢 DICOM Supported",
        dicom_not_supported: "🔴 DICOM Not Supported",
        upload_section: "Upload X-ray Image",
        upload_description: "Select the file type you want to upload for bone fracture analysis",
        file_type_label: "Select File Type",
        image_type: "Regular Image",
        dicom_type: "DICOM File",
        image_info: "📝 Regular Image:",
        image_formats: "Supported: JPG, PNG, JPEG, BMP, TIFF",
        dicom_info: "🏥 DICOM File:",
        dicom_formats: "Supported: .dcm, .dicom",
        upload_image: "Upload X-ray Image",
        upload_dicom: "Upload DICOM File (.dcm)",
        analyze_button: "🔍 Analyze X-ray Image",
        result_section: "📊 Analysis Results",
        result_description: "Preliminary results from bone fracture type analysis with DICOM metadata information",
        waiting_upload: "Waiting for Image Upload",
        waiting_description: "Please upload an X-ray image or DICOM file to start the preliminary analysis",
        dicom_section_title: "🏥 DICOM Information",
        system_info_title: "ℹ️ System Information",
        disclaimer_title: "🏥 Disclaimer:",
        disclaimer_text: "This system is a preliminary analysis tool only<br>It cannot replace diagnosis by medical specialists. Please consult an orthopedic doctor for proper examination and treatment",
        confidence_too_low: "⚠️ Insufficient Confidence",
        min_confidence: "Minimum confidence required",
        no_image: "❌ No Image or DICOM File Found",
        no_image_desc: "Please upload an X-ray image or DICOM file for analysis",
        no_model: "⚠️ Model Not Found",
        no_model_desc: "Please upload model.pt file or check installation",
        dicom_error: "❌ Cannot Process DICOM File",
        install_pydicom: "📦 Installing pydicom:",
        install_instruction: "To use DICOM features, please install:",
        analysis_result: 'Analysis Result',
        confidence: 'Confidence',
        file_type: 'File Type',
        detailed_results: 'Detailed Analysis',
        warning: 'Warning:',
        warning_text: 'This AI is an assistive tool. Final diagnosis must be confirmed by a doctor.',
        bone_types_title: 'Supported Bone & Joint Types',
        powered_by: 'Powered by YOLO11x-cls & Supabase',
        process_error: 'Processing Error',
        save_success: 'Saved successfully',
        save_error: 'Save failed',

        // Patient Form
        patient_context: 'Patient Context',
        patient_desc: 'Optional: Provide medical details for accurate analysis',
        age: 'Age (Years)',
        gender: 'Gender',
        gender_male: 'Male',
        gender_female: 'Female',
        gender_other: 'Other',
        moi: 'Mechanism of Injury',
        moi_placeholder: 'e.g. Car accident, Fall',
        pain_level: 'Pain Level (1-10)',
        medical_history: 'Medical History / Risk Factors',
        medical_history_placeholder: 'e.g. Osteoporosis, Diabetes, Smoking, Previous Fractures',

        // LLM Section
        processing_ai: 'Processing...',
        processing_vision: 'Running Vision Model...',
        processing_llm: 'Synthesizing Clinical Insights...',
        clinical_reasoning: 'Clinical Reasoning Engine',
        diff_dx: 'Differential Diagnosis',
        rec_steps: 'Recommended Steps',
        clinical_risks: 'Clinical Risks',
        llm_disclaimer: 'Disclaimer: This analysis combines Computer Vision and AI Clinical Reasoning. Please verify all findings clinically.',

        // Buttons
        start_analysis: 'Start Analysis',
        save_record: 'Save to Patient Record',
        re_analyze: 'Analyze New Image',

        // Validation
        invalid_image: '❌ Invalid Image',
        invalid_image_desc: 'The uploaded image does not appear to be an X-ray or is of insufficient quality. Please try again.'
    },
    zh: {
        name: "中文",
        title: "🦴 骨折分析系统",
        subtitle: "基于YOLO11x-cls技术的AI驱动X光骨折分析系统，支持DICOM格式",
        description: "🏥 用于检测12种骨折类型的初步分析工具，支持常规图像和DICOM文件",
        system_status: "系统状态",
        model_ready: "🟢 已就绪",
        model_error: "🔴 未找到模型",
        dicom_supported: "🟢 支持DICOM",
        dicom_not_supported: "🔴 不支持DICOM",
        upload_section: "上传X光图像",
        upload_description: "选择要上传进行骨折分析的文件类型",
        file_type_label: "选择文件类型",
        image_type: "常规图像",
        dicom_type: "DICOM文件",
        image_info: "📝 常规图像：",
        image_formats: "支持格式：JPG, PNG, JPEG, BMP, TIFF",
        dicom_info: "🏥 DICOM文件：",
        dicom_formats: "支持格式：.dcm, .dicom",
        upload_image: "上传X光图像",
        upload_dicom: "上传DICOM文件 (.dcm)",
        analyze_button: "🔍 分析X光图像",
        result_section: "📊 分析结果",
        result_description: "骨折类型分析的初步结果，包含DICOM元数据信息",
        waiting_upload: "等待图像上传",
        waiting_description: "请上传X光图像或DICOM文件以开始初步分析",
        dicom_section_title: "🏥 DICOM信息",
        system_info_title: "ℹ️ 系统信息",
        disclaimer_title: "🏥 免责声明：",
        disclaimer_text: "本系统仅为初步分析工具<br>不能替代医学专家的诊断。请咨询骨科医生进行适当的检查和治疗",
        detailed_results: "📊 详细初步结果 (前5项)",
        dicom_metadata: "📋 DICOM元数据信息",
        warning: "⚠️ 警告：",
        warning_text: "此分析结果仅供初步参考。不能替代医学专家的诊断。请咨询骨科医生进行适当的检查和治疗",
        confidence_too_low: "⚠️ 置信度不足",
        min_confidence: "所需最低置信度",
        no_image: "❌ 未找到图像或DICOM文件",
        no_image_desc: "请上传X光图像或DICOM文件进行分析",
        no_model: "⚠️ 未找到模型",
        no_model_desc: "请上传model.pt文件或检查安装",
        process_error: "❌ 处理过程中发生错误",
        dicom_error: "❌ 无法处理DICOM文件",
        install_pydicom: "📦 安装pydicom：",
        install_instruction: "要使用DICOM功能，请安装：",

        // Buttons
        start_analysis: "开始分析",
        save_record: "保存到患者记录",
        re_analyze: "分析新图像",

        // Patient Form
        patient_context: '患者基本信息',
        patient_desc: '可选：提供医疗细节以获得更准确的分析',
        age: '年龄 (岁)',
        gender: '性别',
        gender_male: '男',
        gender_female: '女',
        gender_other: '其他',
        moi: '致伤机制',
        moi_placeholder: '例如：车祸、跌倒',
        pain_level: '疼痛等级 (1-10)',
        medical_history: '病史 / 风险因素',
        medical_history_placeholder: '例如：骨质疏松症、糖尿病、吸烟、既往骨折',

        // LLM Section
        processing_ai: '处理中...',
        processing_vision: '运行视觉模型...',
        processing_llm: '合成临床见解...',
        clinical_reasoning: '临床推理引擎',
        diff_dx: '鉴别诊断',
        rec_steps: '建议步骤',
        clinical_risks: '临床风险',
        llm_disclaimer: '免责声明：此分析结合了计算机视觉和 AI 临床推理。请在临床上核实所有发现。',

        // Validation
        invalid_image: '❌ 无效图像',
        invalid_image_desc: '上传的图像似乎不是 X 光片或质量不足。请重试。'
    },
    ja: {
        name: "日本語",
        title: "🦴 骨折分析システム",
        subtitle: "YOLO11x-cls技術を使用したAI駆動X線骨折分析システム、DICOM対応",
        description: "🏥 12種類の骨折タイプを検出する予備分析ツール、通常の画像とDICOMファイルの両方をサポート",
        system_status: "システム状態",
        model_ready: "🟢 準備完了",
        model_error: "🔴 モデルが見つかりません",
        dicom_supported: "🟢 DICOM対応",
        dicom_not_supported: "🔴 DICOM非対応",
        upload_section: "X線画像をアップロード",
        upload_description: "骨折分析のためにアップロードするファイルタイプを選択してください",
        file_type_label: "ファイルタイプを選択",
        image_type: "通常の画像",
        dicom_type: "DICOMファイル",
        image_info: "📝 通常の画像：",
        image_formats: "対応形式：JPG, PNG, JPEG, BMP, TIFF",
        dicom_info: "🏥 DICOMファイル：",
        dicom_formats: "対応形式：.dcm, .dicom",
        upload_image: "X線画像をアップロード",
        upload_dicom: "DICOMファイルをアップロード (.dcm)",
        analyze_button: "🔍 X線画像を分析",
        result_section: "📊 分析結果",
        result_description: "DICOMメタデータ情報を含む骨折タイプ分析の予備結果",
        waiting_upload: "画像のアップロードを待機中",
        waiting_description: "予備分析を開始するには、X線画像またはDICOMファイルをアップロードしてください",
        bone_types_title: "🦴 システムが分析できる骨折の種類",
        dicom_section_title: "🏥 DICOM情報",
        system_info_title: "ℹ️ システム情報",
        disclaimer_title: "🏥 免責事項：",
        disclaimer_text: "このシステムは予備分析ツールのみです<br>医学専門家の診断に代わるものではありません。適切な検査と治療のため整形外科医にご相談ください",
        powered_by: "YOLO11x-cls & Gradio | 骨折分析システム v2.5 4言語対応",
        analysis_result: "予備分析結果",
        confidence: "信頼度",
        file_type: "ファイルタイプ",
        detailed_results: "📊 詳細な予備結果 (上位5項目)",
        dicom_metadata: "📋 DICOMメタデータ情報",
        warning: "⚠️ 警告：",
        warning_text: "この分析結果は予備情報のみです。医学専門家の診断に代わるものではありません。適切な検査と治療のため整形外科医にご相談ください",
        confidence_too_low: "⚠️ 信頼度不足",
        min_confidence: "必要最小信頼度",
        no_image: "❌ 画像またはDICOMファイルが見つかりません",
        no_image_desc: "分析のためX線画像またはDICOMファイルをアップロードしてください",
        no_model: "⚠️ モデルが見つかりません",
        no_model_desc: "model.ptファイルをアップロードするかインストールを確認してください",
        process_error: "❌ 処理中にエラーが発生しました",
        dicom_error: "❌ DICOMファイルを処理できません",
        install_pydicom: "📦 pydicomのインストール：",
        install_instruction: "DICOM機能を使用するには、インストールしてください：",

        // Buttons
        start_analysis: "分析を開始",
        save_record: "患者記録に保存",
        re_analyze: "新しい画像を分析",

        // Patient Form
        patient_context: '患者コンテキスト',
        patient_desc: '任意：正確な分析のために医療詳細を入力してください',
        age: '年齢 (歳)',
        gender: '性別',
        gender_male: '男性',
        gender_female: '女性',
        gender_other: 'その他',
        moi: '受傷機転',
        moi_placeholder: '例：交通事故、転倒',
        pain_level: '痛みレベル (1-10)',
        medical_history: '病歴 / リスク要因',
        medical_history_placeholder: '例：骨粗鬆症、糖尿病、喫煙、過去の骨折',

        // LLM Section
        processing_ai: '処理中...',
        processing_vision: 'ビジョンモデルを実行中...',
        processing_llm: '臨床的洞察を合成中...',
        clinical_reasoning: '臨床推論エンジン',
        diff_dx: '鑑別診断',
        rec_steps: '推奨される手順',
        clinical_risks: '臨床的リスク',
        llm_disclaimer: '免責事項：この分析はコンピュータービジョンとAIによる臨床推論を組み合わせたものです。すべての所見を臨床的に確認してください。',

        // Validation
        invalid_image: '❌ 無効な画像',
        invalid_image_desc: 'アップロードされた画像は X 線写真ではないか、品質が不十分なようです。もう一度お試しください。'
    }
};

export const FRACTURE_LABELS: Record<LanguageCode, string[]> = {
    th: [
        "กระดูกหักแบบการฉีกขาด",
        "กระดูกหักเป็นชิ้นเล็กหลายชิ้น",
        "กระดูกหักจากการอัดแรง",
        "กระดูกหักพร้อมข้อเคล็ด",
        "กระดูกหักไม่ทะลุ (ในเด็ก)",
        "รอยแตกเล็กๆ บนกระดูก",
        "ส่วนของกระดูกชนเข้าหากัน",
        "กระดูกหักทะลุผ่านข้อต่อ",
        "กระดูกหักตามแนวยาว",
        "กระดูกหักเป็นเส้นทแยง",
        "กระดูกหักจากโรคประจำตัว",
        "กระดูกหักเป็นเกลียว"
    ],
    en: [
        "Avulsion Fracture",
        "Comminuted Fracture",
        "Compression-Crush Fracture",
        "Fracture Dislocation",
        "Greenstick Fracture",
        "Hairline Fracture",
        "Impacted Fracture",
        "Intra-articular Fracture",
        "Longitudinal Fracture",
        "Oblique Fracture",
        "Pathological Fracture",
        "Spiral Fracture"
    ],
    zh: [
        "撕脱性骨折",
        "粉碎性骨折",
        "压缩性骨折",
        "骨折脱位",
        "轻度骨折",
        "发丝骨折",
        "嵌插性骨折",
        "关节内骨折",
        "纵行骨折",
        "斜行骨折",
        "病理性骨折",
        "螺旋性骨折"
    ],
    ja: [
        "裂離骨折",
        "粉砕骨折",
        "圧迫骨折",
        "骨折脱臼",
        "若木骨折",
        "ヘアライン骨折",
        "嵌入骨折",
        "関節内骨折",
        "縦骨折",
        "斜骨折",
        "病的骨折",
        "らせん骨折"
    ]
};

export const ALIAS_MAPPING = {
    "Avulsion fracture": 0,
    "Comminuted fracture": 1,
    "Compression-Crush fracture": 2,
    "Fracture Dislocation": 3,
    "Greenstick fracture": 4,
    "Hairline Fracture": 5,
    "Impacted fracture": 6,
    "Intra-articular fracture": 7,
    "Longitudinal fracture": 8,
    "Oblique fracture": 9,
    "Pathological fracture": 10,
    "Spiral Fracture": 11
};

export const EXPLANATIONS: Record<LanguageCode, Record<string, string>> = {
    th: {
        "Avulsion fracture": "🔹 กระดูกหักแบบการฉีกขาด - ชิ้นเล็กๆ ของกระดูกถูกดึงออกมาพร้อมกับเอ็นหรือเส้นใย สาเหตุจากการเคลื่อนไหวกะทันหัน เช่น กระโดด วิ่ง หรือเปลี่ยนทิศทางอย่างรวดเร็ว พบบ่อยที่ข้อเท้า เข้าเฝ่า นิ้วมือ",
        "Comminuted fracture": "🔴 กระดูกหักเป็นชิ้นเล็กหลายชิ้น - กระดูกแตกเป็นชิ้นเล็กชิ้นน้อย 3 ชิ้นขึ้นไป สาเหตุจากอุบัติเหตุรุนแรง เช่น อุบัติเหตุรถยนต์ ตกจากที่สูง ความรุนแรงสูงมาก ต้องการผ่าตัดและใส่โลหะยึดกระดูก",
        "Compression-Crush fracture": "🟠 กระดูกหักจากการอัดแรง - กระดูกถูกบีบอัดจนแบนหรือยุบ สาเหตุจากการตกจากที่สูง กระดูกพรุน ใส่น้ำหนักมาก พบบ่อยในกระดูกสันหลัง ข้อมือ อาจทำให้สูงลดถ้าเป็นกระดูกสันหลัง",
        "Fracture Dislocation": "🔴 กระดูกหักพร้อมข้อเคล็ด - กระดูกหักและข้อต่อเคลื่อนออกจากตำแหน่งพร้อมกัน เป็นฉุกเฉินทางการแพทย์ อาจกดทับเส้นประสาท หลอดเลือด ต้องรีบปรับกระดูกเข้าที่และผ่าตัด",
        "Greenstick fracture": "🟢 กระดูกหักไม่ทะลุ - กระดูกงอแต่ไม่หักขาด เหมือนกิ่งไผ่เขียวที่งอ พบในเด็กเป็นหลัก (กระดูกยังอ่อน ยืดหยุ่นได้) อาการปวดน้อย บวมเล็กน้อย การรักษาใส่เฝือก หายเร็วกว่าผู้ใหญ่",
        "Hairline Fracture": "🟡 รอยแตกเล็กๆ บนกระดูก - รอยแตกเล็กๆ บางๆ ไม่เห็นชัดใน X-ray สาเหตุจากการใช้งานซ้ำๆ กิจกรรมที่ต้องใช้แรงกระแทก อาการปวดเมื่อกิจกรรม หายเมื่อพัก การรักษาพักผ่อน หลีกเลี่ยงกิจกรรมที่เสี่ยง",
        "Impacted fracture": "🟠 ส่วนของกระดูกชนเข้าหากัน - ปลายกระดูกชิ้นหนึ่งเสียบเข้าไปในอีกชิ้น สาเหตุจากการล้มแรงๆ โดยเฉพาะผู้สูงอายุ พบบ่อยที่คอกระดูกต้นขา ข้อมือ ข้อดีคือกระดูกติดกันเองได้ ไม่เคลื่อนตำแหน่ง",
        "Intra-articular fracture": "🔴 กระดูกหักทะลุผ่านข้อต่อ - รอยหักทะลุผ่านผิวข้อต่อ ทำให้ข้อต่อเสียหายถาวร อาจเป็นข้อเสื่อม ต้องผ่าตัดเพื่อซ่อมผิวข้อให้เรียบ อาจมีแทรกซ้อนข้อติด ข้อเสื่อม การติดเชื้อ",
        "Longitudinal fracture": "🟡 กระดูกหักตามแนวยาว - รอยหักวิ่งไปตามแนวยาวของกระดูก สาเหตุจากแรงกระแทกตามแนวแกนกระดูก พบในกระดูกแขน ขา การรักษามักใส่เฝือก เพราะกระดูกไม่เคลื่อนตำแหน่ง",
        "Oblique fracture": "🟠 กระดูกหักเป็นเส้นทแยง - รอยหักเป็นเส้นทแยงผ่านกระดูก สาเหตุจากแรงบิดผสมกับแรงกระแทก ลักษณะเด่นคือมักเคลื่อนตำแหน่งง่าย การรักษาอาจต้องผ่าตัดใส่โลหะยึด",
        "Pathological fracture": "🔴 กระดูกหักจากโรคประจำตัว - กระดูกหักจากแรงเพียงเล็กน้อย เพราะกระดูกอ่อนแอ สาเหตุจากมะเร็งกระดูก กระดูกพรุน ติดเชื้อกระดูก อาการหักง่าย หายช้า กลับมาหักซ้ำได้ ต้องรักษาโรคต้นเหตุควบคู่",
        "Spiral Fracture": "🟠 กระดูกหักเป็นเกลียว - รอยหักเป็นเกลียวรอบกระดูก สาเหตุจากแรงบิดแรงๆ เช่น เล่นกีฬา หรือการบิดขณะเท้าติดพื้น พบบ่อยในกระดูกแขน ขา ข้อระวังอาจทำลายเส้นประสาทและหลอดเลือดรอบข้าง"
    },
    en: {
        "Avulsion fracture": "🔹 Avulsion fracture - Small bone fragments pulled away with tendons or ligaments. Caused by sudden movements like jumping, running, or rapid direction changes. Commonly occurs at ankle, pelvis, or fingers with symptoms of localized pain, swelling, and difficulty using the affected area",
        "Comminuted fracture": "🔴 Comminuted fracture - Bone breaks into 3+ small fragments. Caused by severe trauma like car accidents or falls from height. High severity requiring surgery and metal fixation with long rehabilitation period",
        "Compression-Crush fracture": "🟠 Compression-crush fracture - Bone compressed until flattened or collapsed. Caused by falls from height, osteoporosis, or heavy weight bearing. Common in vertebrae and wrist, may cause height loss if spinal",
        "Fracture Dislocation": "🔴 Fracture with dislocation - Bone fracture with simultaneous joint displacement. Medical emergency that may compress nerves or blood vessels. Requires immediate bone reduction and surgical intervention",
        "Greenstick fracture": "🟢 Greenstick fracture - Incomplete fracture where bone bends but doesn't break completely, like a green bamboo branch. Mainly occurs in children due to soft, flexible bones. Mild pain and swelling, treated with casting, heals faster than in adults",
        "Hairline Fracture": "🟡 Hairline fracture - Small, thin crack not clearly visible on X-ray. Caused by repetitive use or impact activities. Pain during activity, relief with rest. Treatment involves rest and avoiding risky activities",
        "Impacted fracture": "🟠 Impacted fracture - One bone fragment driven into another. Caused by forceful falls, especially in elderly. Common in femoral neck and wrist. Advantage: bones can heal together naturally without displacement",
        "Intra-articular fracture": "🔴 Intra-articular fracture - Fracture line extends through joint surface. Causes permanent joint damage, may lead to arthritis. Requires surgery to smooth joint surface. Complications include stiffness, arthritis, infection",
        "Longitudinal fracture": "🟡 Longitudinal fracture - Fracture runs along bone length. Caused by impact force along bone axis. Found in arm and leg bones. Usually treated with casting as bones don't displace",
        "Oblique fracture": "🟠 Oblique fracture - Diagonal fracture line across bone. Caused by twisting force combined with impact. Characteristic: tends to displace easily. May require surgical fixation with metal hardware",
        "Pathological fracture": "🔴 Pathological fracture - Fracture from minimal force due to weakened bone. Caused by bone cancer, osteoporosis, or bone infection. Symptoms: fractures easily, heals slowly, may re-fracture. Requires treating underlying disease",
        "Spiral Fracture": "🟠 Spiral fracture - Helical fracture pattern around bone. Caused by strong twisting force during sports or when foot is planted while body twists. Common in arm and leg bones. Caution: may damage surrounding nerves and blood vessels"
    },
    zh: {
        "Avulsion fracture": "🔹 撕脱性骨折 - 小块骨片与肌腱或韧带一起被撕脱。由突然运动引起，如跳跃、跑步或快速变向。常发生在踝关节、骨盆或手指，症状为局部疼痛、肿胀和活动困难",
        "Comminuted fracture": "🔴 粉碎性骨折 - 骨头破碎成3片以上的小碎片。由严重外伤引起，如车祸或高处坠落。严重程度高，需要手术和金属固定，康复期长",
        "Compression-Crush fracture": "🟠 压缩性骨折 - 骨头受压直至扁平或塌陷。由高处坠落、骨质疏松或重压引起。常见于脊椎和腕部，脊椎骨折可能导致身高降低",
        "Fracture Dislocation": "🔴 骨折脱位 - 骨折伴随关节同时脱位。属于医疗急症，可能压迫神经或血管。需要紧急复位和手术治疗",
        "Greenstick fracture": "🟢 轻度骨折 - 不完全骨折，骨头弯曲但未完全断裂，如绿色竹枝弯曲。主要发生在儿童，因骨质软而有弹性。疼痛轻微，肿胀不明显，用石膏治疗，比成人愈合更快",
        "Hairline Fracture": "🟡 发丝骨折 - X光片上不太清楚的细小裂缝。由反复使用或冲击活动引起。活动时疼痛，休息时缓解。治疗方法是休息并避免危险活动",
        "Impacted fracture": "🟠 嵌插性骨折 - 一块骨片嵌入另一块中。由强烈摔倒引起，特别是老年人。常见于股骨颈和腕部。优点是骨头可以自然愈合而不移位",
        "Intra-articular fracture": "🔴 关节内骨折 - 骨折线延伸穿过关节面。造成永久性关节损伤，可能导致关节炎。需要手术修复关节面。并发症包括关节僵硬、关节炎、感染",
        "Longitudinal fracture": "🟡 纵行骨折 - 沿骨头长度方向的骨折。由沿骨轴的冲击力引起。见于臂骨和腿骨。通常用石膏治疗，因骨头不会移位",
        "Oblique fracture": "🟠 斜行骨折 - 穿过骨头的斜线骨折。由扭转力结合冲击引起。特点是容易移位。可能需要金属固定手术",
        "Pathological fracture": "🔴 病理性骨折 - 因骨质脆弱而由轻微外力引起的骨折。由骨癌、骨质疏松或骨感染引起。症状：易骨折、愈合慢、可能再次骨折。需要同时治疗潜在疾病",
        "Spiral Fracture": "🟠 螺旋性骨折 - 围绕骨头的螺旋状骨折模式。由强烈扭转力引起，如运动时或脚固定身体扭转时。常见于臂骨和腿骨。注意：可能损伤周围神经和血管"
    },
    ja: {
        "Avulsion fracture": "🔹 裂離骨折 - 腱や靱帯と共に小さな骨片が引き剥がされる。ジャンプ、ランニング、急な方向転換などの突然の動きが原因。足首、骨盤、指に多く見られ、局所的な痛み、腫れ、患部の使用困難が症状",
        "Comminuted fracture": "🔴 粉砕骨折 - 骨が3つ以上の小さな破片に砕ける。交通事故や高所からの落下などの重大な外傷が原因。重症度が高く、手術と金属固定が必要で、長期のリハビリテーションが必要",
        "Compression-Crush fracture": "🟠 圧迫骨折 - 骨が平らになったり潰れるまで圧迫される。高所からの落下、骨粗鬆症、重い荷重が原因。脊椎と手首に多く、脊椎の場合は身長低下を引き起こす可能性",
        "Fracture Dislocation": "🔴 骨折脱臼 - 骨折と関節の同時脱臼。神経や血管を圧迫する可能性がある緊急事態。即座の整復と外科的介入が必要",
        "Greenstick fracture": "🟢 若木骨折 - 骨が曲がるが完全に折れない不完全骨折、緑の竹枝のような状態。骨が柔らかく柔軟な小児に主に発生。軽度の痛みと腫れ、ギプスで治療、成人より早く治癒",
        "Hairline Fracture": "🟡 ヘアライン骨折 - X線で明確に見えない細い小さなひび。反復使用や衝撃活動が原因。活動中の痛み、休息時の緩和。治療は休息と危険な活動の回避",
        "Impacted fracture": "🟠 嵌入骨折 - 一つの骨片が別の骨片に押し込まれる。特に高齢者の強い転倒が原因。大腿骨頚部と手首に多い。利点：骨が自然に治癒でき、ずれない",
        "Intra-articular fracture": "🔴 関節内骨折 - 骨折線が関節面を通る。永続的な関節損傷を引き起こし、関節炎につながる可能性。関節面を滑らかにする手術が必要。合併症には関節の硬直、関節炎、感染が含まれる",
        "Longitudinal fracture": "🟡 縦骨折 - 骨の長さに沿って走る骨折。骨軸に沿った衝撃力が原因。腕と脚の骨に見られる。骨がずれないため通常ギプスで治療",
        "Oblique fracture": "🟠 斜骨折 - 骨を横切る斜めの骨折線。衝撃と組み合わされた捻転力が原因。特徴：ずれやすい傾向。金属固定による外科的固定が必要な場合がある",
        "Pathological fracture": "🔴 病的骨折 - 骨が弱くなったために最小限の力で起こる骨折。骨がん、骨粗鬆症、骨感染が原因。症状：骨折しやすい、治癒が遅い、再骨折の可能性。基礎疾患の治療が必要",
        "Spiral Fracture": "🟠 らせん骨折 - 骨の周りのらせん状骨折パターン。スポーツ中や足が固定された状態での身体の捻転による強い捻転力が原因。腕と脚の骨に多い。注意：周囲の神経と血管を損傷する可能性"
    }
};

// ========== PAGE TRANSLATIONS ==========
export const PAGE_TRANSLATIONS: Record<LanguageCode, {
    // Navbar
    nav_home: string;
    nav_history: string;
    nav_doctor: string;
    nav_admin: string;
    nav_login: string;
    nav_logout: string;
    nav_title: string;
    nav_subtitle: string;
    // Footer
    footer_disclaimer_title: string;
    footer_disclaimer_text: string;
    footer_version: string;
    // Login
    login_welcome: string;
    login_subtitle: string;
    login_demo: string;
    login_email: string;
    login_password: string;
    login_submit: string;
    login_loading: string;
    login_no_account: string;
    login_signup_link: string;
    // Signup
    signup_title: string;
    signup_subtitle: string;
    signup_name: string;
    signup_name_placeholder: string;
    signup_email: string;
    signup_password: string;
    signup_confirm: string;
    signup_submit: string;
    signup_loading: string;
    signup_has_account: string;
    signup_login_link: string;
    signup_password_mismatch: string;
    signup_password_short: string;
    signup_failed: string;
    // History
    history_title: string;
    history_subtitle: string;
    history_filter_all: string;
    history_filter_confirmed: string;
    history_filter_pending: string;
    history_filter_reviewed: string;
    history_loading: string;
    history_empty: string;
    history_empty_desc: string;
    history_start_analysis: string;
    history_date: string;
    history_diagnosis: string;
    history_details: string;
    history_user: string;
    history_language: string;
    history_doctor_notes: string;
    // Doctor
    doctor_title: string;
    doctor_subtitle: string;
    doctor_pending: string;
    doctor_reviewed: string;
    doctor_table_patient: string;
    doctor_table_diagnosis: string;
    doctor_table_confidence: string;
    doctor_table_date: string;
    doctor_table_actions: string;
    doctor_review: string;
    doctor_delete: string;
    doctor_ai_diagnosis: string;
    doctor_your_diagnosis: string;
    doctor_confirm_ai: string;
    doctor_override: string;
    doctor_notes: string;
    doctor_notes_placeholder: string;
    doctor_submit: string;
    doctor_submitting: string;
    doctor_no_pending: string;
    doctor_no_pending_desc: string;
    doctor_access_denied: string;
    doctor_access_denied_desc: string;
    // Admin
    admin_title: string;
    admin_subtitle: string;
    admin_total_users: string;
    admin_total_doctors: string;
    admin_total_cases: string;
    admin_pending_cases: string;
    admin_confirmed: string;
    admin_reviewed: string;
    admin_user_management: string;
    admin_case_management: string;
    admin_name: string;
    admin_email: string;
    admin_role: string;
    admin_actions: string;
    admin_change_role: string;
    admin_delete: string;
    admin_access_denied: string;
    admin_case_mgmt_desc: string;
    admin_system_info: string;
    // Confidence Bar
    confidence_score: string;
    confidence_confirmed: string;
    confidence_pending: string;
    // Common
    loading: string;
    close: string;
    cancel: string;
    confirm: string;
    delete_confirm: string;
    delete_confirm_msg: string;
    guest: string;
}> = {
    th: {
        // Navbar
        nav_home: "หน้าหลัก",
        nav_history: "ประวัติ",
        nav_doctor: "แพทย์",
        nav_admin: "ผู้ดูแล",
        nav_login: "เข้าสู่ระบบ",
        nav_logout: "ออกจากระบบ",
        nav_title: "ระบบวิเคราะห์กระดูกหัก",
        nav_subtitle: "ระบบวิเคราะห์เชิงวิชาชีพ",
        // Footer
        footer_disclaimer_title: "ข้อจำกัดความรับผิดชอบ",
        footer_disclaimer_text: "ระบบนี้เป็นเครื่องมือช่วยในการวิเคราะห์เบื้องต้นเท่านั้น ไม่สามารถใช้แทนการวินิจฉัยของแพทย์ผู้เชี่ยวชาญได้ กรุณาปรึกษาแพทย์ออร์โธปิดิกส์เพื่อการตรวจสอบและรักษาที่เหมาะสม",
        footer_version: "ระบบวิเคราะห์กระดูกหัก v3 รองรับ 4 ภาษา",
        // Login
        login_welcome: "ยินดีต้อนรับ",
        login_subtitle: "เข้าสู่ระบบเพื่อเข้าถึงประวัติการวิเคราะห์",
        login_demo: "บัญชีตัวอย่าง:",
        login_email: "อีเมล",
        login_password: "รหัสผ่าน",
        login_submit: "เข้าสู่ระบบ",
        login_loading: "กำลังเข้าสู่ระบบ...",
        login_no_account: "ยังไม่มีบัญชี?",
        login_signup_link: "สมัครสมาชิก",
        // Signup
        signup_title: "สร้างบัญชี",
        signup_subtitle: "เข้าร่วมระบบวิเคราะห์กระดูกหัก",
        signup_name: "ชื่อ-นามสกุล",
        signup_name_placeholder: "สมชาย ใจดี",
        signup_email: "อีเมล",
        signup_password: "รหัสผ่าน",
        signup_confirm: "ยืนยันรหัสผ่าน",
        signup_submit: "สร้างบัญชี",
        signup_loading: "กำลังสร้างบัญชี...",
        signup_has_account: "มีบัญชีอยู่แล้ว?",
        signup_login_link: "เข้าสู่ระบบ",
        signup_password_mismatch: "รหัสผ่านไม่ตรงกัน",
        signup_password_short: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
        signup_failed: "การลงทะเบียนล้มเหลว",
        // History
        history_title: "ประวัติการวิเคราะห์",
        history_subtitle: "ดูประวัติการวิเคราะห์ X-ray ทั้งหมดของคุณ",
        history_filter_all: "ทั้งหมด",
        history_filter_confirmed: "ยืนยันแล้ว",
        history_filter_pending: "รอตรวจสอบ",
        history_filter_reviewed: "แพทย์ตรวจสอบ",
        history_loading: "กำลังโหลด...",
        history_empty: "ยังไม่มีประวัติ",
        history_empty_desc: "เริ่มวิเคราะห์ภาพ X-ray เพื่อสร้างประวัติ",
        history_start_analysis: "เริ่มวิเคราะห์",
        history_date: "วันที่",
        history_diagnosis: "ผลวินิจฉัย",
        history_details: "รายละเอียด",
        history_user: "ผู้ใช้",
        history_language: "ภาษา",
        history_doctor_notes: "หมายเหตุแพทย์",
        // Doctor
        doctor_title: "แผงควบคุมแพทย์",
        doctor_subtitle: "ตรวจสอบและยืนยันผล AI ที่มีความมั่นใจต่ำ",
        doctor_pending: "รอตรวจสอบ",
        doctor_reviewed: "ตรวจสอบแล้ว",
        doctor_table_patient: "ผู้ป่วย",
        doctor_table_diagnosis: "ผลวินิจฉัย AI",
        doctor_table_confidence: "ความมั่นใจ",
        doctor_table_date: "วันที่",
        doctor_table_actions: "การดำเนินการ",
        doctor_review: "ตรวจสอบ",
        doctor_delete: "ลบ",
        doctor_ai_diagnosis: "ผลวินิจฉัย AI",
        doctor_your_diagnosis: "การวินิจฉัยของคุณ",
        doctor_confirm_ai: "ยืนยันผล AI",
        doctor_override: "แก้ไขผลวินิจฉัย",
        doctor_notes: "หมายเหตุแพทย์",
        doctor_notes_placeholder: "เพิ่มหมายเหตุทางคลินิก...",
        doctor_submit: "ส่งการตรวจสอบ",
        doctor_submitting: "กำลังส่ง...",
        doctor_no_pending: "ไม่มีเคสรอตรวจ",
        doctor_no_pending_desc: "ทุกเคสได้รับการตรวจสอบแล้ว",
        doctor_access_denied: "ไม่มีสิทธิ์เข้าถึง",
        doctor_access_denied_desc: "หน้านี้สำหรับแพทย์เท่านั้น",
        // Admin
        admin_title: "แผงควบคุมผู้ดูแล",
        admin_subtitle: "จัดการผู้ใช้และข้อมูลระบบ",
        admin_total_users: "ผู้ใช้ทั้งหมด",
        admin_total_doctors: "แพทย์ทั้งหมด",
        admin_total_cases: "เคสทั้งหมด",
        admin_pending_cases: "รอตรวจสอบ",
        admin_confirmed: "ยืนยันแล้ว",
        admin_reviewed: "แพทย์ตรวจสอบ",
        admin_user_management: "จัดการผู้ใช้",
        admin_case_management: "จัดการเคส",
        admin_name: "ชื่อ",
        admin_email: "อีเมล",
        admin_role: "บทบาท",
        admin_actions: "การดำเนินการ",
        admin_change_role: "เปลี่ยนบทบาท",
        admin_delete: "ลบ",
        admin_access_denied: "ไม่มีสิทธิ์เข้าถึง เฉพาะผู้ดูแลระบบเท่านั้น",
        admin_case_mgmt_desc: "ดูและจัดการประวัติการวิเคราะห์ทั้งหมด",
        admin_system_info: "ข้อมูลระบบ",
        // Confidence Bar
        confidence_score: "คะแนนความมั่นใจ",
        confidence_confirmed: "✓ AI ยืนยัน",
        confidence_pending: "⚠ รอแพทย์ตรวจสอบ",
        // Common
        loading: "กำลังโหลด...",
        close: "ปิด",
        cancel: "ยกเลิก",
        confirm: "ยืนยัน",
        delete_confirm: "ยืนยันการลบ",
        delete_confirm_msg: "คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?",
        guest: "ผู้ใช้งานทั่วไป",
    },
    en: {
        nav_home: "Home",
        nav_history: "History",
        nav_doctor: "Doctor",
        nav_admin: "Admin",
        nav_login: "Login",
        nav_logout: "Logout",
        nav_title: "Bone Fracture Analysis Website",
        nav_subtitle: "Professional Analysis System",
        footer_disclaimer_title: "Disclaimer",
        footer_disclaimer_text: "This system is a preliminary analysis tool only. It cannot replace the diagnosis of a specialist doctor. Please consult an orthopedic doctor for proper examination and treatment.",
        footer_version: "Bone Fracture Analysis v3 supporting 4 languages",
        login_welcome: "Welcome Back",
        login_subtitle: "Sign in to access your medical analysis history",
        login_demo: "Demo Accounts:",
        login_email: "Email Address",
        login_password: "Password",
        login_submit: "Sign In",
        login_loading: "Signing In...",
        login_no_account: "Don't have an account?",
        login_signup_link: "Sign Up",
        signup_title: "Create Account",
        signup_subtitle: "Join our medical analysis platform",
        signup_name: "Full Name",
        signup_name_placeholder: "John Doe",
        signup_email: "Email Address",
        signup_password: "Password",
        signup_confirm: "Confirm Password",
        signup_submit: "Create Account",
        signup_loading: "Creating Account...",
        signup_has_account: "Already have an account?",
        signup_login_link: "Sign In",
        signup_password_mismatch: "Passwords do not match",
        signup_password_short: "Password must be at least 6 characters",
        signup_failed: "Registration failed",
        history_title: "Analysis History",
        history_subtitle: "View all your X-ray analysis history",
        history_filter_all: "All",
        history_filter_confirmed: "Confirmed",
        history_filter_pending: "Pending",
        history_filter_reviewed: "Reviewed",
        history_loading: "Loading...",
        history_empty: "No History Yet",
        history_empty_desc: "Start analyzing X-ray images to build your history",
        history_start_analysis: "Start Analysis",
        history_date: "Date",
        history_diagnosis: "Diagnosis",
        history_details: "Details",
        history_user: "User",
        history_language: "Language",
        history_doctor_notes: "Doctor Notes",
        doctor_title: "Doctor Dashboard",
        doctor_subtitle: "Review and verify low-confidence AI diagnoses",
        doctor_pending: "Pending Review",
        doctor_reviewed: "Reviewed",
        doctor_table_patient: "Patient",
        doctor_table_diagnosis: "AI Diagnosis",
        doctor_table_confidence: "Confidence",
        doctor_table_date: "Date",
        doctor_table_actions: "Actions",
        doctor_review: "Review",
        doctor_delete: "Delete",
        doctor_ai_diagnosis: "AI Diagnosis",
        doctor_your_diagnosis: "Your Diagnosis",
        doctor_confirm_ai: "Confirm AI Diagnosis",
        doctor_override: "Override Diagnosis",
        doctor_notes: "Doctor Notes",
        doctor_notes_placeholder: "Add clinical notes...",
        doctor_submit: "Submit Review",
        doctor_submitting: "Submitting...",
        doctor_no_pending: "No Pending Cases",
        doctor_no_pending_desc: "All cases have been reviewed",
        doctor_access_denied: "Access Denied",
        doctor_access_denied_desc: "This page is for doctors only",
        admin_title: "Admin Dashboard",
        admin_subtitle: "Manage users and system data",
        admin_total_users: "Total Users",
        admin_total_doctors: "Total Doctors",
        admin_total_cases: "Total Cases",
        admin_pending_cases: "Pending Cases",
        admin_confirmed: "Confirmed",
        admin_reviewed: "Doctor Reviewed",
        admin_user_management: "User Management",
        admin_case_management: "Case Management",
        admin_name: "Name",
        admin_email: "Email",
        admin_role: "Role",
        admin_actions: "Actions",
        admin_change_role: "Change Role",
        admin_delete: "Delete",
        admin_access_denied: "Access denied. Admin only.",
        admin_case_mgmt_desc: "View and manage all analysis cases",
        admin_system_info: "System Information",
        confidence_score: "Confidence Score",
        confidence_confirmed: "✓ AI Confirmed",
        confidence_pending: "⚠ Pending Doctor Review",
        loading: "Loading...",
        close: "Close",
        cancel: "Cancel",
        confirm: "Confirm",
        delete_confirm: "Confirm Delete",
        delete_confirm_msg: "Are you sure you want to delete this item?",
        guest: "Guest User",
    },
    zh: {
        nav_home: "首页",
        nav_history: "历史",
        nav_doctor: "医生",
        nav_admin: "管理员",
        nav_login: "登录",
        nav_logout: "注销",
        nav_title: "骨折分析系统",
        nav_subtitle: "专业分析系统",
        footer_disclaimer_title: "免责声明",
        footer_disclaimer_text: "本系统仅为初步分析工具，不能替代专科医生的诊断。请咨询骨科医生进行适当的检查和治疗。",
        footer_version: "骨折分析系统 v3 支持4种语言",
        login_welcome: "欢迎回来",
        login_subtitle: "登录以访问您的医疗分析历史",
        login_demo: "演示账户：",
        login_email: "电子邮件",
        login_password: "密码",
        login_submit: "登录",
        login_loading: "登录中...",
        login_no_account: "还没有账户？",
        login_signup_link: "注册",
        signup_title: "创建账户",
        signup_subtitle: "加入我们的医疗分析平台",
        signup_name: "姓名",
        signup_name_placeholder: "张三",
        signup_email: "电子邮件",
        signup_password: "密码",
        signup_confirm: "确认密码",
        signup_submit: "创建账户",
        signup_loading: "创建中...",
        signup_has_account: "已有账户？",
        signup_login_link: "登录",
        signup_password_mismatch: "密码不匹配",
        signup_password_short: "密码至少6个字符",
        signup_failed: "注册失败",
        history_title: "分析历史",
        history_subtitle: "查看所有X光分析历史",
        history_filter_all: "全部",
        history_filter_confirmed: "已确认",
        history_filter_pending: "待审核",
        history_filter_reviewed: "已审核",
        history_loading: "加载中...",
        history_empty: "暂无历史",
        history_empty_desc: "开始分析X光图像以创建历史",
        history_start_analysis: "开始分析",
        history_date: "日期",
        history_diagnosis: "诊断结果",
        history_details: "详情",
        history_user: "用户",
        history_language: "语言",
        history_doctor_notes: "医生备注",
        doctor_title: "医生仪表板",
        doctor_subtitle: "审查和验证低置信度AI诊断",
        doctor_pending: "待审核",
        doctor_reviewed: "已审核",
        doctor_table_patient: "患者",
        doctor_table_diagnosis: "AI诊断",
        doctor_table_confidence: "置信度",
        doctor_table_date: "日期",
        doctor_table_actions: "操作",
        doctor_review: "审查",
        doctor_delete: "删除",
        doctor_ai_diagnosis: "AI诊断",
        doctor_your_diagnosis: "您的诊断",
        doctor_confirm_ai: "确认AI诊断",
        doctor_override: "覆盖诊断",
        doctor_notes: "医生备注",
        doctor_notes_placeholder: "添加临床备注...",
        doctor_submit: "提交审查",
        doctor_submitting: "提交中...",
        doctor_no_pending: "没有待审核病例",
        doctor_no_pending_desc: "所有病例已审核完毕",
        doctor_access_denied: "拒绝访问",
        doctor_access_denied_desc: "此页面仅限医生使用",
        admin_title: "管理员仪表板",
        admin_subtitle: "管理用户和系统数据",
        admin_total_users: "总用户数",
        admin_total_doctors: "总医生数",
        admin_total_cases: "总病例数",
        admin_pending_cases: "待审核",
        admin_confirmed: "已确认",
        admin_reviewed: "医生已审核",
        admin_user_management: "用户管理",
        admin_case_management: "病例管理",
        admin_name: "姓名",
        admin_email: "邮箱",
        admin_role: "角色",
        admin_actions: "操作",
        admin_change_role: "更改角色",
        admin_delete: "删除",
        admin_access_denied: "拒绝访问，仅限管理员",
        admin_case_mgmt_desc: "查看和管理所有分析病例",
        admin_system_info: "系统信息",
        confidence_score: "置信度分数",
        confidence_confirmed: "✓ AI已确认",
        confidence_pending: "⚠ 待医生审查",
        loading: "加载中...",
        close: "关闭",
        cancel: "取消",
        confirm: "确认",
        delete_confirm: "确认删除",
        delete_confirm_msg: "确定要删除此项吗？",
        guest: "访客用户",
    },
    ja: {
        nav_home: "ホーム",
        nav_history: "履歴",
        nav_doctor: "医師",
        nav_admin: "管理者",
        nav_login: "ログイン",
        nav_logout: "ログアウト",
        nav_title: "骨折分析システム",
        nav_subtitle: "プロフェッショナル分析システム",
        footer_disclaimer_title: "免責事項",
        footer_disclaimer_text: "本システムは初期分析ツールに過ぎません。専門医の診断の代わりにはなりません。適切な検査と治療のために整形外科医にご相談ください。",
        footer_version: "骨折分析システム v3 4言語対応",
        login_welcome: "おかえりなさい",
        login_subtitle: "医療分析履歴にアクセスするにはログインしてください",
        login_demo: "デモアカウント：",
        login_email: "メールアドレス",
        login_password: "パスワード",
        login_submit: "ログイン",
        login_loading: "ログイン中...",
        login_no_account: "アカウントをお持ちでありませんか？",
        login_signup_link: "新規登録",
        signup_title: "アカウント作成",
        signup_subtitle: "医療分析プラットフォームに参加",
        signup_name: "氏名",
        signup_name_placeholder: "山田太郎",
        signup_email: "メールアドレス",
        signup_password: "パスワード",
        signup_confirm: "パスワード確認",
        signup_submit: "アカウント作成",
        signup_loading: "作成中...",
        signup_has_account: "既にアカウントをお持ちですか？",
        signup_login_link: "ログイン",
        signup_password_mismatch: "パスワードが一致しません",
        signup_password_short: "パスワードは6文字以上必要です",
        signup_failed: "登録に失敗しました",
        history_title: "分析履歴",
        history_subtitle: "すべてのX線分析履歴を表示",
        history_filter_all: "すべて",
        history_filter_confirmed: "確認済み",
        history_filter_pending: "保留中",
        history_filter_reviewed: "レビュー済み",
        history_loading: "読み込み中...",
        history_empty: "履歴なし",
        history_empty_desc: "X線画像の分析を開始して履歴を作成しましょう",
        history_start_analysis: "分析開始",
        history_date: "日付",
        history_diagnosis: "診断結果",
        history_details: "詳細",
        history_user: "ユーザー",
        history_language: "言語",
        history_doctor_notes: "医師メモ",
        doctor_title: "医師ダッシュボード",
        doctor_subtitle: "低信頼度のAI診断を確認・検証",
        doctor_pending: "確認待ち",
        doctor_reviewed: "確認済み",
        doctor_table_patient: "患者",
        doctor_table_diagnosis: "AI診断",
        doctor_table_confidence: "信頼度",
        doctor_table_date: "日付",
        doctor_table_actions: "アクション",
        doctor_review: "レビュー",
        doctor_delete: "削除",
        doctor_ai_diagnosis: "AI診断",
        doctor_your_diagnosis: "あなたの診断",
        doctor_confirm_ai: "AI診断を確認",
        doctor_override: "診断を変更",
        doctor_notes: "医師メモ",
        doctor_notes_placeholder: "臨床メモを追加...",
        doctor_submit: "レビュー提出",
        doctor_submitting: "送信中...",
        doctor_no_pending: "保留中の症例なし",
        doctor_no_pending_desc: "すべての症例がレビュー済みです",
        doctor_access_denied: "アクセス拒否",
        doctor_access_denied_desc: "このページは医師専用です",
        admin_title: "管理者ダッシュボード",
        admin_subtitle: "ユーザーとシステムデータを管理",
        admin_total_users: "総ユーザー数",
        admin_total_doctors: "総医師数",
        admin_total_cases: "総症例数",
        admin_pending_cases: "保留中",
        admin_confirmed: "確認済み",
        admin_reviewed: "医師レビュー済み",
        admin_user_management: "ユーザー管理",
        admin_case_management: "症例管理",
        admin_name: "名前",
        admin_email: "メール",
        admin_role: "役割",
        admin_actions: "アクション",
        admin_change_role: "役割変更",
        admin_delete: "削除",
        admin_access_denied: "アクセス拒否。管理者のみ。",
        admin_case_mgmt_desc: "すべての分析症例を表示および管理",
        admin_system_info: "システム情報",
        confidence_score: "信頼度スコア",
        confidence_confirmed: "✓ AI確認済み",
        confidence_pending: "⚠ 医師確認待ち",
        loading: "読み込み中...",
        close: "閉じる",
        cancel: "キャンセル",
        confirm: "確認",
        delete_confirm: "削除確認",
        delete_confirm_msg: "この項目を削除してよろしいですか？",
        guest: "ゲストユーザー",
    }
};
