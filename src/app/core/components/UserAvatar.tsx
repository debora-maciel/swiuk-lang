"use client"

import { useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useTheme } from '../context/theme/ThemeContext';
import { FiLogOut, FiCheck } from 'react-icons/fi';

// Animal avatars with emojis and colors
const animalAvatars = [
    { id: 'fox', emoji: '🦊', color: 'from-orange-400 to-orange-600' },
    { id: 'panda', emoji: '🐼', color: 'from-gray-400 to-gray-600' },
    { id: 'koala', emoji: '🐨', color: 'from-slate-400 to-slate-600' },
    { id: 'lion', emoji: '🦁', color: 'from-amber-400 to-amber-600' },
    { id: 'owl', emoji: '🦉', color: 'from-yellow-600 to-yellow-800' },
    { id: 'penguin', emoji: '🐧', color: 'from-sky-400 to-sky-600' },
];

interface UserAvatarProps {
    userName: string;
    userEmail: string;
    onSignOut: () => void;
    logoutText: string;
}

export default function UserAvatar({ userName, userEmail, onSignOut, logoutText }: UserAvatarProps) {
    const { colors, theme } = useTheme();
    const [selectedAvatar, setSelectedAvatar] = useState<string>('fox');
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);
    const [isDark, setIsDark] = useState(theme === 'dark');

    useEffect(() => {
        // Load saved avatar from localStorage
        const saved = localStorage.getItem('userAvatar');
        if (saved) {
            setSelectedAvatar(saved);
        }
    }, []);

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

    const handleAvatarChange = (avatarId: string) => {
        setSelectedAvatar(avatarId);
        localStorage.setItem('userAvatar', avatarId);
        setShowAvatarPicker(false);
    };

    const currentAvatar = animalAvatars.find(a => a.id === selectedAvatar) || animalAvatars[0];

    const items: MenuProps['items'] = [
        {
            key: 'info',
            label: (
                <div className="py-2 px-1">
                    <div className="font-medium" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>{userName}</div>
                    <div className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{userEmail}</div>
                </div>
            ),
            disabled: true,
        },
        { type: 'divider' },
        {
            key: 'avatar-label',
            label: (
                <div className="text-xs font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
                    Choose Avatar
                </div>
            ),
            disabled: true,
        },
        {
            key: 'avatars',
            label: (
                <div className="grid grid-cols-3 gap-2 py-2">
                    {animalAvatars.map((avatar) => (
                        <button
                            key={avatar.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAvatarChange(avatar.id);
                            }}
                            className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatar.color} flex items-center justify-center text-lg relative hover:scale-110 transition-transform ${
                                selectedAvatar === avatar.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                            }`}
                        >
                            {avatar.emoji}
                            {selectedAvatar === avatar.id && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                    <FiCheck size={10} className="text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            ),
        },
        { type: 'divider' },
        {
            key: 'logout',
            label: <span style={{ color: isDark ? '#ffffff' : '#1f2937' }}>{logoutText}</span>,
            icon: <FiLogOut size={16} style={{ color: isDark ? '#ffffff' : '#1f2937' }} />,
            onClick: onSignOut,
        },
    ];

    return (
        <Dropdown
            menu={{
                items,
                style: { backgroundColor: isDark ? '#1f2937' : '#ffffff', minWidth: '200px' },
            }}
            trigger={['click']}
            placement="bottomRight"
        >
            <button className={`w-9 h-9 rounded-full bg-gradient-to-br ${currentAvatar.color} flex items-center justify-center text-lg shadow-sm hover:scale-105 transition-transform cursor-pointer`}>
                {currentAvatar.emoji}
            </button>
        </Dropdown>
    );
}
