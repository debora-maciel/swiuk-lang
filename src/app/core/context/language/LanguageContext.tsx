'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type LanguageType = 'en' | 'de' | 'fr';
export type TargetLanguageType = 'english' | 'deutsch' | 'français';

interface LanguageContextType {
    language: LanguageType;
    targetLanguage: TargetLanguageType;
    onChangeLanguage: (lang: LanguageType) => void;
    onChangeTargetLanguage: (lang: TargetLanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<LanguageType>('en');
    const [targetLanguage, setTargetLanguage] = useState<TargetLanguageType>('english');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') as LanguageType;
        if (savedLanguage) setLanguage(savedLanguage);

        const savedTargetLanguage = localStorage.getItem('targetLanguage') as TargetLanguageType;
        if (savedTargetLanguage) setTargetLanguage(savedTargetLanguage);
    }, []);


    const onChangeLanguage = (language: LanguageType) => {
        localStorage.setItem('language', language);
        setLanguage(language);
    };

    const onChangeTargetLanguage = (language: TargetLanguageType) => {
        localStorage.setItem('targetLanguage', language);
        setTargetLanguage(language);
    };

    return (
        <LanguageContext.Provider key={language} value={{
            language,
            targetLanguage,
            onChangeTargetLanguage,
            onChangeLanguage
        }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
    return context;
};
