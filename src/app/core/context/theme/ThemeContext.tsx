// context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { darkColors, lightColors, systemColors } from '../../variables/colors';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: ThemeType;
    onChangeTheme: (theme: ThemeType) => void;
    colors: typeof lightColors;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>('system');

    useEffect(() => {
        const saved = localStorage.getItem('theme') as ThemeType;
        if (saved) setTheme(saved);
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark', 'system');
        root.classList.add(theme);
    }, [theme]);

    const colors = useMemo(() => {
        if (theme === 'light') return lightColors;
        if (theme === 'dark') return darkColors;
        return systemColors;
    }, [theme]);

    const onChangeTheme = (newTheme: ThemeType) => {
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider key={theme} value={{ theme, onChangeTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used inside ThemeProvider');
    return context;
};
