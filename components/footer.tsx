'use client';

import React from 'react';

export function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-8">
                {/* Disclaimer */}
                <div className="mb-6 bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
                    <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                        </svg>
                        ข้อจำกัดความรับผิดชอบ
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        ระบบนี้เป็นเครื่องมือช่วยในการวิเคราะห์เบื้องต้นเท่านั้น
                        ไม่สามารถใช้แทนการวินิจฉัยของแพทย์ผู้เชี่ยวชาญได้
                        กรุณาปรึกษาแพทย์ออร์โธปิดิกส์เพื่อการตรวจสอบและรักษาที่เหมาะสม
                    </p>
                </div>

                {/* Footer Info */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-500">Design by</span>
                        <span className="font-bold text-cyan-400">BFAW</span>
                    </div>

                    <div className="text-center">
                        <p className="flex items-center gap-2 justify-center flex-wrap">
                            <span className="text-slate-500">Powered by</span>
                            <span className="font-semibold text-cyan-400">YOLO11x-cls</span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            ระบบวิเคราะห์กระดูกหัก v3 รองรับ 4 ภาษา
                        </p>
                    </div>

                    <div className="text-slate-500 text-xs">
                        © {new Date().getFullYear()} BFAW
                    </div>
                </div>
            </div>
        </footer>
    );
}
