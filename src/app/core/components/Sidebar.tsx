"use client"

import Link from "next/link";
import { useTheme } from "../context/theme/ThemeContext";
import { useLanguage } from "../context/language/LanguageContext";
import { usePathname } from 'next/navigation';
import { AiFillHome } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { IoGameController } from "react-icons/io5";
import { MdOutlineGTranslate } from "react-icons/md";
import { BiConversation } from "react-icons/bi";
import { translations } from "../variables/translation";

export default function Sidebar() {
    const { colors } = useTheme();
    const { language } = useLanguage();
    const pathname = usePathname();
    const t = translations.menu[language];

    const menu = [
        {
            name: t.home,
            link: "/",
            icon: <AiFillHome size={20} />
        },
        {
            name: t.words,
            link: "/words",
            icon: <TiSortAlphabeticallyOutline size={20} />
        },
        {
            name: t.connectGame,
            link: "/game/connect-words",
            icon: <IoGameController size={20} />
        },
        {
            name: t.translator,
            link: "/translation",
            icon: <MdOutlineGTranslate size={20} />
        },
        {
            name: t.vocabulary,
            link: "/vocabulary",
            icon: <BiConversation size={20} />
        },
        {
            name: t.dashboard,
            link: "/dashboard",
            icon: <SiGoogleanalytics size={20} />
        },
        {
            name: t.settings,
            link: "/settings",
            icon: <IoMdSettings size={20} />
        },
    ]

    return (
        <aside className={`hidden md:flex flex-col ${colors.background} ${colors.border10} border-r h-screen w-64 fixed left-0 top-0 z-50`}>
            <div className={`p-6 border-b ${colors.border10}`}>
                <h1 className={`${colors.text} text-xl font-bold`}>Swiuk Lang</h1>
            </div>

            <nav className="flex-1 p-4">
                {menu.map((item) => (
                    <Link
                        key={item.name}
                        href={item.link}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                            pathname === item.link
                                ? `${colors.backgroundReverse} ${colors.textReverse} font-semibold`
                                : `${colors.text} hover:${colors.backgroundLight}`
                        }`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
