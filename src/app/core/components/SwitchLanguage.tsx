import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useTheme } from '../context/theme/ThemeContext';
import { useLanguage } from '../context/language/LanguageContext';
import Image from 'next/image';

export default function SwitchLanguage() {
    const { language, onChangeLanguage } = useLanguage();
    const { colors} = useTheme();

    const items: MenuProps['items'] = [
        {
            key: 'label',
            label: 'Language',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'de',
            label: 'Deutsch',
            icon: <Image width={20} height={20} alt='de' src={'/german.png'}/>,
        },
        {
            key: 'en',
            label: 'English',
            icon: <Image width={20} height={20} alt='en' src={'/english.png'}/>,
        },
        {
            key: 'fr',
            label: 'French',
            icon: <Image width={20} height={20} alt='fr' src={'/french.png'}/>,
        },
    ];

    const handleClick: MenuProps['onClick'] = (info) => {
        onChangeLanguage(info.key as 'en' | 'fr' | 'de');
    };

    return (
        <Dropdown
            menu={{
                items,
                selectable: true,
                selectedKeys: [language],
                onClick: handleClick,
            }}
            trigger={['click']}
        >
            <div className={`${colors.text} flex gap-3 font-semibold`}>
                <div className={` border px-1 font-semibold rounded uppercase`}>{language}</div>
            </div>
        </Dropdown>
    );
}
