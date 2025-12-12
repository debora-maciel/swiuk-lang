"use client"
import { ReactNode } from "react";
import { useTheme } from "../context/theme/ThemeContext";
import { ConfigProvider } from 'antd';

interface ILayout {
    children: ReactNode
}

export default function Layout({ children }: ILayout) {
    const { colors } = useTheme();

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
            <div className={`${colors.background} min-h-screen`}>
                {/* Mobile: full width, Desktop: left margin for sidebar */}
                <div className={`md:ml-64 overflow-x-hidden`}>
                    {children}
                </div>
            </div>
        </ConfigProvider>
    )
}