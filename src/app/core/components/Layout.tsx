"use client"
import { ReactNode } from "react";
import { useTheme } from "../theme/ThemeContext";

interface ILayout {
    children: ReactNode
}

export default function Layout({ children }: ILayout) {
    const { colors } = useTheme();

    return (
        <div className={`${colors.background} h-full`}>
            <div className={`max-w-md mx-auto border-x h-full ${colors.border10}`}>
                {children}
            </div>
        </div>
    )
}