'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type LanguageType = 'en' | 'de' | 'fr';

interface LanguageContextType {
    language: LanguageType;
    onChangeLanguage: (lang: LanguageType) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<LanguageType>('en');

    useEffect(() => {
        const saved = localStorage.getItem('language') as LanguageType;
        if (saved) setLanguage(saved);
    }, []);


    const onChangeLanguage = (newTheme: LanguageType) => {
        localStorage.setItem('language', newTheme);
        setLanguage(newTheme);
    };

    return (
        <LanguageContext.Provider key={language} value={{ language, onChangeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
    return context;
};
