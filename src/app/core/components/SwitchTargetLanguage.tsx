import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useTheme } from '../context/theme/ThemeContext';
import { TargetLanguageType, useLanguage } from '../context/language/LanguageContext';
import Image from 'next/image';

export default function SwitchTargetLanguage() {
    const { targetLanguage, onChangeTargetLanguage } = useLanguage();
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
            key: 'deutsch',
            label: 'Deutsch',
            icon: <Image width={20} height={20} alt='de' src={'/german.png'}/>,
        },
        {
            key: 'english',
            label: 'English',
            icon: <Image width={20} height={20} alt='en' src={'/english.png'}/>,
        },
        {
            key: 'french',
            label: 'French',
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
            }}
            trigger={['click']}
        >
            <div className={`${colors.text} flex gap-3 font-semibold`}>
                <div className={` border px-1 font-semibold rounded uppercase`}>{targetLanguage}</div>
            </div>
        </Dropdown>
    );
}
