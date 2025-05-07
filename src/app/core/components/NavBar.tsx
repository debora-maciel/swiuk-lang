"use client"
import Link from "next/link";
import Settings from "./Settings";
import { useTheme } from "../theme/ThemeContext";

export default function Navbar() {
    const { colors } = useTheme();

    return (
        <div className={`${colors.background} ${colors.border10} pl-5 border-b text-base py-2 montserrat-black w-full text-left flex items-center justify-between px-4`}>
            <Link href={'/'} className={colors.text}>Swiuk Lang</Link>
            <div className="flex items-center gap-4">
                <Settings />
            </div>
        </div>
    )
}