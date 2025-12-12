// context/ThemeContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { systemColors } from '../../variables/colors';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: ThemeType;
    onChangeTheme: (theme: ThemeType) => void;
    colors: typeof systemColors;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>('system');
    const [mounted, setMounted] = useState(false);

    // Only run on client after hydration
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('theme') as ThemeType;
        if (saved) setTheme(saved);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (theme === 'dark') {
            root.classList.add('dark');
        } else if (theme === 'system') {
            // Check system preference
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (systemPrefersDark) {
                root.classList.add('dark');
            }
        }
        // For 'light', we don't add any class (default is light)
    }, [theme, mounted]);

    const colors = systemColors;

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
