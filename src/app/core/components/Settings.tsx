import React from 'react';
import { FiSettings } from "react-icons/fi";
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useTheme } from '../theme/ThemeContext';

export default function Settings() {
    const { onChangeTheme, colors } = useTheme();

    const items: MenuProps['items'] = [
        {
            key: 'label',
            label: 'Theme',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'system',
            label: 'System',
        },
        {
            key: 'light',
            label: 'Light',
        },
        {
            key: 'dark',
            label: 'Dark',
        },
    ];

    const handleClick: MenuProps['onClick'] = (info) => {
        onChangeTheme(info.key as 'light' | 'dark' | 'system');
    };

    return (
        <Dropdown
            menu={{
                items,
                onClick: handleClick,
            }}
            trigger={['click']}
        >
            <FiSettings className={colors.text} size={20}/>
        </Dropdown>
    );
}
