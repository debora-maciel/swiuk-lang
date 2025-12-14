import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useTheme } from '../context/theme/ThemeContext';
import { TargetLanguageType, useLanguage } from '../context/language/LanguageContext';
import Image from 'next/image';
import { IoChevronDown } from 'react-icons/io5';

// Small circular flag components
const GermanFlag = () => (
    <div className="w-5 h-5 rounded-full overflow-hidden flex flex-col shrink-0">
        <div className="flex-1 bg-black"></div>
        <div className="flex-1 bg-[#DD0000]"></div>
        <div className="flex-1 bg-[#FFCC00]"></div>
    </div>
);

const EnglishFlag = () => (
    <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-white relative shrink-0">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#CE1124] -translate-y-1/2"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#CE1124] -translate-x-1/2"></div>
    </div>
);

const FrenchFlag = () => (
    <div className="w-5 h-5 rounded-full overflow-hidden flex shrink-0">
        <div className="flex-1 bg-[#002395]"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-[#ED2939]"></div>
    </div>
);

const translations = {
    en: { targetLanguage: 'Target Language', german: 'German', english: 'English', french: 'French' },
    de: { targetLanguage: 'Zielsprache', german: 'Deutsch', english: 'Englisch', french: 'Französisch' },
    fr: { targetLanguage: 'Langue cible', german: 'Allemand', english: 'Anglais', french: 'Français' },
    pt: { targetLanguage: 'Idioma Alvo', german: 'Alemão', english: 'Inglês', french: 'Francês' },
};

export default function SwitchTargetLanguage() {
    const { targetLanguage, onChangeTargetLanguage, language } = useLanguage();
    const t = translations[language];
    const { colors, theme } = useTheme();
    const [isDark, setIsDark] = useState(theme === 'dark');

    useEffect(() => {
        const checkDark = () => {
            if (theme === 'dark') return true;
            if (theme === 'system' && typeof window !== 'undefined') {
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            return false;
        };
        setIsDark(checkDark());
    }, [theme]);

    useEffect(() => {
        if (theme === 'system' && typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setIsDark(mediaQuery.matches);

            const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
            mediaQuery.addEventListener('change', handler);
            return () => mediaQuery.removeEventListener('change', handler);
        }
    }, [theme]);

    const textColor = isDark ? '#ffffff' : '#1f2937';
    const textColor60 = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

    const isGerman = targetLanguage === 'deutsch' || targetLanguage?.toLowerCase().includes('german') || targetLanguage?.toLowerCase().includes('deutsch');
    const isEnglish = targetLanguage === 'english' || targetLanguage?.toLowerCase().includes('english') || targetLanguage?.toLowerCase().includes('eng');
    const isFrench = targetLanguage === 'français' || targetLanguage?.toLowerCase().includes('french') || targetLanguage?.toLowerCase().includes('fran');

    const getDisplayName = () => {
        if (isGerman) return 'DE';
        if (isEnglish) return 'EN';
        if (isFrench) return 'FR';
        return 'EN';
    };

    const getCurrentFlag = () => {
        if (isGerman) return <GermanFlag />;
        if (isEnglish) return <EnglishFlag />;
        if (isFrench) return <FrenchFlag />;
        return <EnglishFlag />;
    };

    const items: MenuProps['items'] = [
        {
            key: 'label',
            label: <span style={{ color: textColor60 }}>{t.targetLanguage}</span>,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'deutsch',
            label: <span style={{ color: textColor }}>{t.german}</span>,
            icon: <Image width={20} height={20} alt='de' src={'/german.png'}/>,
        },
        {
            key: 'english',
            label: <span style={{ color: textColor }}>{t.english}</span>,
            icon: <Image width={20} height={20} alt='en' src={'/english.png'}/>,
        },
        {
            key: 'french',
            label: <span style={{ color: textColor }}>{t.french}</span>,
            icon: <Image width={20} height={20} alt='fr' src={'/french.png'}/>,
        },
    ];

    const handleClick: MenuProps['onClick'] = (info) => {
        onChangeTargetLanguage(info.key as TargetLanguageType);
    };

    return (
        <Dropdown
            menu={{
                items,
                selectable: true,
                selectedKeys: [targetLanguage],
                onClick: handleClick,
                style: { backgroundColor: isDark ? '#1f2937' : '#ffffff' },
            }}
            trigger={['click']}
        >
            <button className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full ${colors.backgroundLight} hover:opacity-80 transition-opacity cursor-pointer`}>
                {getCurrentFlag()}
                <span className={`${colors.text} text-sm font-medium`}>{getDisplayName()}</span>
                <IoChevronDown className={colors.text50} size={14} />
            </button>
        </Dropdown>
    );
}
