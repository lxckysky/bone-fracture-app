'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LanguageCode } from '@/lib/i18n';

interface LanguageContextType {
    language: LanguageCode;
    setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<LanguageCode>('th');

    // Load saved language from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('app-language') as LanguageCode;
        if (saved && ['th', 'en', 'zh', 'ja'].includes(saved)) {
            setLanguageState(saved);
        }
    }, []);

    const setLanguage = (lang: LanguageCode) => {
        setLanguageState(lang);
        localStorage.setItem('app-language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
