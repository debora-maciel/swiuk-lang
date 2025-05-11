"use client"

import Link from "next/link";
import { useTheme } from "../context/theme/ThemeContext";
import SwitchTargetLanguage from "./SwitchTargetLanguage";
import { RiMenu4Fill } from "react-icons/ri";
import { Drawer } from "antd";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';


export default function Navbar() {
    const { colors } = useTheme();
    const [open, setOpen] = useState(false);
    const router = useRouter();
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

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Drawer
                closable={{ 'aria-label': 'Close Button' }}
                styles={{
                    content: {
                        width: '200px'
                    }
                }}
                classNames={
                    {
                        header: `${colors.background} ${colors.text}`,
                        body: `${colors.background} ${colors.text}`,
                    }
                }
                size="large"
                placement={"left"}
                title="Swiuk Lang"
                onClose={onClose}
                closeIcon={
                    <IoClose className={`${colors.text}`} />
                }
                open={open}
            >
                <div className="h-full w-full">
                    {menu.map((m) => (
                        <div onClick={() => { setOpen(false); router.push(m.link) }} key={m.name}
                            className={`${pathname == m.link ? colors.textReverse + ' font-bold ' +
                                colors.backgroundReverse : colors.text + ' ' +
                            colors.background} pt-4 px-4 pb-4 border-b-0 flex items-center justify-start gap-3 capitalize rounded-4xl rounded-br-4xl `}>
                            {m.icon} {m.name}
                        </div>
                    ))}
                </div>
            </Drawer>

            <div className={`${colors.background} ${colors.border10} pl-5 text-base py-4 montserrat-black w-full text-left flex items-center justify-between px-4`}>
                <RiMenu4Fill onClick={showDrawer} className={`${colors.text}`} size={25} />
                <Link href={'/'} className={colors.text}>Swiuk Lang</Link>
                <div className="flex items-center gap-4">
                    <SwitchTargetLanguage />
                </div>
            </div>
        </>
    )
}