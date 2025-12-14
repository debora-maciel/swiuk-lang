"use client"
import { ReactNode } from "react";
import { useTheme } from "../context/theme/ThemeContext";
import { ConfigProvider } from 'antd';
import { usePathname } from 'next/navigation';

interface ILayout {
    children: ReactNode
}

export default function Layout({ children }: ILayout) {
    const { colors } = useTheme();
    const pathname = usePathname();
    const isPublicProfile = pathname?.startsWith('/u/');

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#1f2937',
                    colorLink: '#374151',
                    colorLinkHover: '#1f2937',
                },
            }}
        >
            <div className={`${isPublicProfile ? '' : colors.background} min-h-screen`}>
                {/* Mobile: full width, Desktop: left margin for sidebar (unless on public profile) */}
                <div className={`${isPublicProfile ? '' : 'md:ml-64'} overflow-x-hidden`}>
                    {children}
                </div>
            </div>
        </ConfigProvider>
    )
}