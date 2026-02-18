'use client';

import React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { PAGE_TRANSLATIONS } from '@/lib/i18n';

interface ConfidenceBarProps {
    confidence: number;
    className?: string;
}

export function ConfidenceBar({ confidence, className = '' }: ConfidenceBarProps) {
    const { language } = useLanguage();
    const t = PAGE_TRANSLATIONS[language];
    const isHighConfidence = confidence >= 70;

    const barColor = isHighConfidence
        ? 'from-emerald-500 to-green-500'
        : 'from-amber-500 to-orange-500';

    const statusBadge = isHighConfidence ? (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {t.confidence_confirmed}
        </span>
    ) : (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            {t.confidence_pending}
        </span>
    );

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">{t.confidence_score}</span>
                <span className="text-2xl font-bold text-white">{confidence.toFixed(1)}%</span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
                <div
                    className={`absolute inset-y-0 left-0 bg-gradient-to-r ${barColor} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${confidence}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">{statusBadge}</div>
        </div>
    );
}
