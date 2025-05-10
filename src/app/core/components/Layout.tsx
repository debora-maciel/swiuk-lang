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
                    colorPrimary: '#62748e',

                },
            }}
        >
            <div className={`${colors.background} h-full`}>
                <div className={`max-w-md mx-auto border-x h-full ${colors.border10}`}>
                    {children}
                </div>
            </div>
        </ConfigProvider>
    )
}