"use client"

import { useTheme } from "../context/theme/ThemeContext";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { usePathname } from "next/navigation";
import { IoMdSettings } from "react-icons/io";

export default function MenuHome() {
    const { colors } = useTheme();
    const pathname = usePathname();

    const menu = [
        {
            name: "home",
            link: "/",
            icon: <AiFillHome size={22} className={``} />
        },
        {
            name: "dashboard",
            link: "/dashboard",
            icon: <SiGoogleanalytics size={22} className={``} />
        },
        {
            name: "settings",
            link: "/settings",
            icon: <IoMdSettings size={22} className={``} />
        },
    ]

    return (
        <div className={`${colors.background} rounded-tr-4xl rounded-br-4xl flex flex-col flex min-h-min items-start justify-center mt-10`}>
            {menu.map((m) => (
                <Link key={m.name} href={m.link}
                    className={`${pathname == m.link ? colors.textReverse + ' ' + colors.backgroundReverse : colors.text + ' ' + colors.background} pt-4 pr-4 pb-4 border-b-0 flex items-end justify-center rounded-tr-4xl rounded-br-4xl `}>
                        {m.icon}
                </Link>
            ))}

        </div>
    )
}