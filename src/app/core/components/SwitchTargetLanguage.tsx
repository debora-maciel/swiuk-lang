import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useTheme } from '../context/theme/ThemeContext';
import { TargetLanguageType, useLanguage } from '../context/language/LanguageContext';
import Image from 'next/image';

export default function SwitchTargetLanguage() {
    const { targetLanguage, onChangeTargetLanguage } = useLanguage();
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

    const items: MenuProps['items'] = [
        {
            key: 'label',
            label: <span style={{ color: textColor60 }}>Language</span>,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'deutsch',
            label: <span style={{ color: textColor }}>Deutsch</span>,
            icon: <Image width={20} height={20} alt='de' src={'/german.png'}/>,
        },
        {
            key: 'english',
            label: <span style={{ color: textColor }}>English</span>,
            icon: <Image width={20} height={20} alt='en' src={'/english.png'}/>,
        },
        {
            key: 'french',
            label: <span style={{ color: textColor }}>French</span>,
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
            <div className={`${colors.text} flex gap-3 font-semibold`}>
                <div className={` border px-1 font-semibold rounded uppercase`}>{targetLanguage}</div>
            </div>
        </Dropdown>
    );
}
