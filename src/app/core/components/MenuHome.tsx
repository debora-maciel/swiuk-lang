"use client"

import { useTheme } from "../context/theme/ThemeContext";
import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { usePathname } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { BiConversation } from "react-icons/bi";
import { menuItems } from "../variables/menu";

const menuIcons: Record<string, React.ReactNode> = {
    home: <AiFillHome size={22} />,
    dashboard: <SiGoogleanalytics size={22} />,
    vocabulary: <BiConversation size={20} />,
    settings: <IoMdSettings size={22} />,
};

export default function MenuHome() {
    const { colors } = useTheme();
    const pathname = usePathname();

    return (
        <div className={`${colors.background} rounded-tr-4xl rounded-br-4xl flex flex-col flex min-h-min items-start justify-center mt-10`}>
            {menuItems.map((item) => (
                <Link key={item.id} href={item.link}
                    className={`${pathname == item.link ? colors.textReverse + ' ' + colors.backgroundReverse : colors.text + ' ' + colors.background} pt-4 pr-4 pb-4 border-b-0 flex items-end justify-center rounded-tr-4xl rounded-br-4xl `}>
                    {menuIcons[item.id]}
                </Link>
            ))}
        </div>
    )
}
