import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// โหลด environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * สคริปต์ลบข้อมูลรูปและเคสเก่าๆ ในฐานข้อมูล
 * 
 * ตัวเลือก:
 * 1. ลบทั้งหมด (All)
 * 2. ลบตามวันที่ (เก่ากว่า X วัน)
 * 3. ลบตาม user_id
 */

interface CleanupOptions {
    mode: 'all' | 'older_than_days' | 'by_user';
    daysOld?: number;       // สำหรับ mode: 'older_than_days'
    userId?: string;        // สำหรับ mode: 'by_user'
}

async function cleanupOldData(options: CleanupOptions) {
    console.log('🧹 เริ่มทำความสะอาดข้อมูล...');
    console.log('ตัวเลือก:', options);

    try {
        let query = supabase.from('cases').select('id, image_path, created_at, user_id');

        // กำหนดเงื่อนไขตาม mode
        if (options.mode === 'older_than_days' && options.daysOld) {
            const cutoffDate = new Date();
            cutoffDate.setDate(cutoffDate.getDate() - options.daysOld);
            query = query.lt('created_at', cutoffDate.toISOString());
            console.log(`📅 จะลบข้อมูลที่เก่ากว่า ${options.daysOld} วัน (ก่อน ${cutoffDate.toLocaleDateString('th-TH')})`);
        } else if (options.mode === 'by_user' && options.userId) {
            query = query.eq('user_id', options.userId);
            console.log(`👤 จะลบข้อมูลของ user: ${options.userId}`);
        } else if (options.mode === 'all') {
            console.log('⚠️  จะลบข้อมูลทั้งหมด!');
        }

        // ดึงข้อมูลที่จะลบ
        const { data: casesToDelete, error: fetchError } = await query;

        if (fetchError) {
            throw new Error(`ไม่สามารถดึงข้อมูลได้: ${fetchError.message}`);
        }

        if (!casesToDelete || casesToDelete.length === 0) {
            console.log('✅ ไม่มีข้อมูลที่ต้องลบ');
            return;
        }

        console.log(`📊 พบข้อมูล ${casesToDelete.length} รายการที่ต้องลบ`);

        // ลบไฟล์รูปจาก Storage ก่อน
        const imagePaths = casesToDelete
            .map(c => c.image_path)
            .filter(path => path); // กรองเฉพาะที่มีค่า

        if (imagePaths.length > 0) {
            console.log(`🗑️  กำลังลบไฟล์รูป ${imagePaths.length} ไฟล์...`);
            const { data: deletedFiles, error: storageError } = await supabase
                .storage
                .from('scans')
                .remove(imagePaths);

            if (storageError) {
                console.warn(`⚠️  ลบไฟล์ใน Storage ไม่สำเร็จบางส่วน:`, storageError.message);
            } else {
                console.log(`✅ ลบไฟล์รูปสำเร็จ ${deletedFiles?.length || 0} ไฟล์`);
            }
        }

        // ลบข้อมูลใน Database
        const caseIds = casesToDelete.map(c => c.id);
        console.log('🗃️  กำลังลบข้อมูลใน Database...');

        const { error: deleteError } = await supabase
            .from('cases')
            .delete()
            .in('id', caseIds);

        if (deleteError) {
            throw new Error(`ไม่สามารถลบข้อมูลใน Database ได้: ${deleteError.message}`);
        }

        console.log(`✅ ลบข้อมูลสำเร็จ ${caseIds.length} รายการ`);
        console.log('🎉 ทำความสะอาดเสร็จสิ้น!');

    } catch (error: any) {
        console.error('❌ เกิดข้อผิดพลาด:', error.message);
        process.exit(1);
    }
}

// ตัวอย่างการใช้งาน
async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log(`
📋 วิธีการใช้งาน:

1. ลบข้อมูลทั้งหมด:
   npm run cleanup -- all

2. ลบข้อมูลเก่ากว่า 30 วัน:
   npm run cleanup -- older_than_days 30

3. ลบข้อมูลของ user คนใดคนหนึ่ง:
   npm run cleanup -- by_user <user_id>

⚠️  คำเตือน: การลบข้อมูลไม่สามารถกู้คืนได้!
        `);
        process.exit(0);
    }

    const mode = args[0] as CleanupOptions['mode'];
    let options: CleanupOptions = { mode };

    if (mode === 'older_than_days') {
        const days = parseInt(args[1]);
        if (isNaN(days)) {
            console.error('❌ กรุณาระบุจำนวนวันเป็นตัวเลข');
            process.exit(1);
        }
        options.daysOld = days;
    } else if (mode === 'by_user') {
        if (!args[1]) {
            console.error('❌ กรุณาระบุ user_id');
            process.exit(1);
        }
        options.userId = args[1];
    }

    // ขอยืนยันก่อนลบ (เฉพาะ mode: all)
    if (mode === 'all') {
        console.log('⚠️⚠️⚠️  คุณกำลังจะลบข้อมูลทั้งหมด! ⚠️⚠️⚠️');
        console.log('กด Ctrl+C ภายใน 5 วินาทีเพื่อยกเลิก...');
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    await cleanupOldData(options);
}

main();
