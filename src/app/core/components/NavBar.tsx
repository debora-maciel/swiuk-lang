"use client"

import Link from "next/link";
import { useTheme } from "../context/theme/ThemeContext";
import { useAuth } from "../context/auth/AuthContext";
import SwitchTargetLanguage from "./SwitchTargetLanguage";
import { RiMenu4Fill } from "react-icons/ri";
import { Drawer } from "antd";
import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown } from "antd";

export default function Navbar() {
    const { colors } = useTheme();
    const { user, loading, signOut } = useAuth();

    // Get user display info
    const userName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
    const userEmail = user?.email || '';
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
        router.refresh();
    };

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
                        width: '200px',
                        boxShadow: 'none'
                    },
                    wrapper: {
                        boxShadow: 'none'
                    }
                }}
                classNames={
                    {
                        header: `${colors.background} ${colors.text}`,
                        body: `${colors.background} ${colors.text}`,
                        content: 'bg-red-500 ',
                        wrapper: ''
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

            <div className={`md:hidden ${colors.background} ${colors.border10} pl-5 text-base py-4 montserrat-black w-full text-left flex items-center justify-between px-4`}>
                <RiMenu4Fill onClick={showDrawer} className={`${colors.text}`} size={25} />
                <Link href={'/'} className={colors.text}>Swiuk Lang</Link>
                <div className="flex items-center gap-3">
                    <SwitchTargetLanguage />
                    {!loading && (
                        user ? (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'info',
                                            label: (
                                                <div className="py-1">
                                                    <div className={`font-medium ${colors.text}`}>{userName}</div>
                                                    <div className={`text-xs ${colors.text60}`}>{userEmail}</div>
                                                </div>
                                            ),
                                            disabled: true,
                                        },
                                        { type: 'divider' },
                                        {
                                            key: 'logout',
                                            label: 'Logout',
                                            icon: <FiLogOut size={16} />,
                                            onClick: handleSignOut,
                                        },
                                    ],
                                }}
                                trigger={['click']}
                                placement="bottomRight"
                            >
                                <button className={`${colors.text60} p-2 rounded-lg ${colors.backgroundHover}`}>
                                    <FiUser size={20} />
                                </button>
                            </Dropdown>
                        ) : (
                            <Link
                                href="/auth/login"
                                className={`${colors.textReverse} ${colors.backgroundReverse} px-3 py-1.5 rounded-lg text-sm font-medium`}
                            >
                                Login
                            </Link>
                        )
                    )}
                </div>
            </div>

            {/* Desktop Header with Language Switcher */}
            <div className={`hidden md:flex ${colors.background} ${colors.border10} border-b py-4 px-8 items-center justify-between`}>
                <div></div>
                <div className="flex items-center gap-4">
                    <SwitchTargetLanguage />
                    {!loading && (
                        user ? (
                            <Dropdown
                                menu={{
                                    items: [
                                        {
                                            key: 'info',
                                            label: (
                                                <div className="py-1">
                                                    <div className={`font-medium ${colors.text}`}>{userName}</div>
                                                    <div className={`text-xs ${colors.text60}`}>{userEmail}</div>
                                                </div>
                                            ),
                                            disabled: true,
                                        },
                                        { type: 'divider' },
                                        {
                                            key: 'logout',
                                            label: 'Logout',
                                            icon: <FiLogOut size={16} />,
                                            onClick: handleSignOut,
                                        },
                                    ],
                                }}
                                trigger={['click']}
                                placement="bottomRight"
                            >
                                <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${colors.border20} ${colors.backgroundHover}`}>
                                    <FiUser size={18} className={colors.text60} />
                                    <span className={`${colors.text} text-sm font-medium max-w-[120px] truncate`}>{userName}</span>
                                </button>
                            </Dropdown>
                        ) : (
                            <Link
                                href="/auth/login"
                                className={`${colors.textReverse} ${colors.backgroundReverse} px-4 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
                            >
                                Login
                            </Link>
                        )
                    )}
                </div>
            </div>
        </>
    )
}