'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Language } from '@/types';
import { FRACTURE_DETAILS, FractureDetail } from '@/lib/education-data';

interface FractureDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    fractureKey: string;
    language: Language;
}

export function FractureDetailModal({ isOpen, onClose, fractureKey, language }: FractureDetailModalProps) {
    if (!isOpen) return null;

    const detail: FractureDetail | undefined = FRACTURE_DETAILS[language]?.[fractureKey];

    if (!detail) return null;

    const labels = {
        th: {
            causes: "สาเหตุการเกิด",
            locations: "ตำแหน่งที่พบได้บ่อย",
            symptoms: "อาการ",
            treatment: "การดูแลรักษา",
            close: "ปิด"
        },
        en: {
            causes: "Causes",
            locations: "Common Locations",
            symptoms: "Symptoms",
            treatment: "Treatment",
            close: "Close"
        },
        zh: {
            causes: "病因",
            locations: "常见部位",
            symptoms: "症状",
            treatment: "治疗",
            close: "关闭"
        },
        ja: {
            causes: "原因",
            locations: "好発部位",
            symptoms: "症状",
            treatment: "治療",
            close: "閉じる"
        }
    };

    const t = labels[language];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30 shadow-2xl animate-scale-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-6 flex items-center justify-between border-b border-cyan-500/30 backdrop-blur-sm z-10">
                    <h2 className="text-2xl font-bold text-white">{detail.name}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label={t.close}
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Description */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <p className="text-slate-200 leading-relaxed">{detail.description}</p>
                    </div>

                    {/* Image Placeholder */}
                    <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700">
                        <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                            <img
                                src={detail.imagePath}
                                alt={detail.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    // Fallback to placeholder if image not found
                                    e.currentTarget.style.display = 'none';
                                    if (e.currentTarget.nextElementSibling) {
                                        (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
                                    }
                                }}
                            />
                            <div className="hidden flex-col items-center justify-center text-slate-500 gap-2" style={{ display: 'none' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <p className="text-sm">Image coming soon</p>
                            </div>
                        </div>
                    </div>

                    {/* Causes */}
                    <div>
                        <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-cyan-500 rounded-full"></span>
                            {t.causes}
                        </h3>
                        <ul className="space-y-2">
                            {detail.causes.map((cause, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-300">
                                    <span className="text-cyan-400 mt-1">•</span>
                                    <span>{cause}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Common Locations */}
                    <div>
                        <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                            {t.locations}
                        </h3>
                        <ul className="space-y-2">
                            {detail.commonLocations.map((location, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-300">
                                    <span className="text-blue-400 mt-1">•</span>
                                    <span>{location}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Symptoms */}
                    <div>
                        <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
                            {t.symptoms}
                        </h3>
                        <ul className="space-y-2">
                            {detail.symptoms.map((symptom, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-300">
                                    <span className="text-amber-400 mt-1">•</span>
                                    <span>{symptom}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Treatment */}
                    <div>
                        <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                            <span className="w-1.5 h-6 bg-green-500 rounded-full"></span>
                            {t.treatment}
                        </h3>
                        <ul className="space-y-2">
                            {detail.treatment.map((step, index) => (
                                <li key={index} className="flex items-start gap-3 text-slate-300">
                                    <span className="text-green-400 font-semibold mt-0.5">{index + 1}.</span>
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-slate-900/90 backdrop-blur-sm p-4 border-t border-slate-700 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/50"
                    >
                        {t.close}
                    </button>
                </div>
            </div>
        </div>
    );
}
