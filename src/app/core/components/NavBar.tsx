"use client"

import Link from "next/link";
import { useTheme } from "../context/theme/ThemeContext";
import { useAuth } from "../context/auth/AuthContext";
import { useLanguage } from "../context/language/LanguageContext";
import SwitchTargetLanguage from "./SwitchTargetLanguage";
import { RiMenu4Fill } from "react-icons/ri";
import { Drawer } from "antd";
import { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { SiGoogleanalytics } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { IoClose, IoGameController } from "react-icons/io5";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { BiConversation } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { usePathname, useRouter } from 'next/navigation';
import { Dropdown } from "antd";
import { translations } from "../variables/translation";

export default function Navbar() {
    const { colors, theme } = useTheme();
    const { user, loading, signOut } = useAuth();
    const { targetLanguage, language } = useLanguage();
    const [isDark, setIsDark] = useState(theme === 'dark');

    useEffect(() => {
        const checkDark = () => {
            if (theme === 'dark') return true;
            if (theme === 'system' && typeof window !== 'undefined') {
                return window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            return false;
        };
        setIsDark(checkDark());
    }, [theme]);

    // Also check on mount for system preference
    useEffect(() => {
        if (theme === 'system' && typeof window !== 'undefined') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setIsDark(mediaQuery.matches);

            const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
            mediaQuery.addEventListener('change', handler);
            return () => mediaQuery.removeEventListener('change', handler);
        }
    }, [theme]);
    const t = translations.menu[language];
    const isFrench = targetLanguage === 'français' || targetLanguage?.toLowerCase().includes('french') || targetLanguage?.toLowerCase().includes('fran');
    const isGerman = targetLanguage === 'deutsch' || targetLanguage?.toLowerCase().includes('german') || targetLanguage?.toLowerCase().includes('deutsch');
    const isEnglish = targetLanguage === 'english' || targetLanguage?.toLowerCase().includes('english') || targetLanguage?.toLowerCase().includes('eng');

    // Show Connect Words only for German<->English combinations
    const showConnectGame = (isGerman && language === 'en') || (isEnglish && language === 'de');

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
            name: t.home,
            link: "/",
            icon: <AiFillHome size={22} />
        },
        {
            name: t.words,
            link: "/words",
            icon: <TiSortAlphabeticallyOutline size={22} />
        },
        ...(showConnectGame ? [{
            name: t.connectGame,
            link: "/game/connect-words",
            icon: <IoGameController size={22} />
        }] : []),
        {
            name: t.vocabulary,
            link: "/vocabulary",
            icon: <BiConversation size={22} />
        },
        {
            name: t.dashboard,
            link: "/dashboard",
            icon: <SiGoogleanalytics size={22} />
        },
        {
            name: t.settings,
            link: "/settings",
            icon: <IoMdSettings size={22} />
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
                        width: '280px',
                        boxShadow: 'none'
                    },
                    wrapper: {
                        boxShadow: 'none'
                    }
                }}
                classNames={{
                    header: `${colors.background} ${colors.text} border-b ${colors.border10}`,
                    body: `${colors.background} ${colors.text}`,
                    content: `${colors.background}`,
                    wrapper: ''
                }}
                size="large"
                placement={"left"}
                title="Swiuk Lang"
                onClose={onClose}
                closeIcon={
                    <IoClose className={`${colors.text}`} />
                }
                open={open}
            >
                <nav className="h-full w-full">
                    {menu.map((m) => (
                        <Link
                            href={m.link}
                            onClick={() => setOpen(false)}
                            key={m.name}
                            className={`${pathname === m.link
                                ? `${colors.textReverse} font-semibold ${colors.backgroundReverse}`
                                : `hover:${colors.backgroundLight}`
                            } py-3 px-4 flex items-center gap-3 rounded-lg mb-1 transition-all no-underline`}
                            style={{ color: pathname !== m.link ? (isDark ? '#ffffff' : '#1f2937') : undefined }}>
                            {m.icon}
                            <span>{m.name}</span>
                        </Link>
                    ))}
                </nav>
            </Drawer>

            <div className="md:hidden">
            {isFrench && (
                <div className="h-1 w-full flex">
                    <div className="flex-1 bg-[#002395]"></div>
                    <div className="flex-1 bg-white"></div>
                    <div className="flex-1 bg-[#ED2939]"></div>
                </div>
            )}
            {isGerman && (
                <div className="h-1 w-full flex flex-col">
                    <div className="flex-1 bg-black"></div>
                    <div className="flex-1 bg-[#DD0000]"></div>
                    <div className="flex-1 bg-[#FFCC00]"></div>
                </div>
            )}
            {isEnglish && (
                <div className="h-3 w-full relative bg-white">
                    <div className="absolute top-1/2 left-0 right-0 h-[6px] bg-[#CE1124] -translate-y-1/2"></div>
                    <div className="absolute left-1/2 top-0 bottom-0 w-[6px] bg-[#CE1124] -translate-x-1/2"></div>
                </div>
            )}
            <div className={`${colors.background} ${colors.border10} pl-5 text-base py-4 montserrat-black w-full text-left flex items-center justify-between px-4`}>
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
                                                    <div className="font-medium" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>{userName}</div>
                                                    <div className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{userEmail}</div>
                                                </div>
                                            ),
                                            disabled: true,
                                        },
                                        { type: 'divider' },
                                        {
                                            key: 'logout',
                                            label: <span style={{ color: isDark ? '#ffffff' : '#1f2937' }}>{t.logout}</span>,
                                            icon: <FiLogOut size={16} style={{ color: isDark ? '#ffffff' : '#1f2937' }} />,
                                            onClick: handleSignOut,
                                        },
                                    ],
                                    style: { backgroundColor: isDark ? '#1f2937' : '#ffffff' },
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
                                {t.login}
                            </Link>
                        )
                    )}
                </div>
            </div>
            </div>

            {/* Desktop Header with Language Switcher */}
            <div className="hidden md:block">
                {isFrench && (
                    <div className="h-1 w-full flex">
                        <div className="flex-1 bg-[#002395]"></div>
                        <div className="flex-1 bg-white"></div>
                        <div className="flex-1 bg-[#ED2939]"></div>
                    </div>
                )}
                {isGerman && (
                    <div className="h-1 w-full flex flex-col">
                        <div className="flex-1 bg-black"></div>
                        <div className="flex-1 bg-[#DD0000]"></div>
                        <div className="flex-1 bg-[#FFCC00]"></div>
                    </div>
                )}
                {isEnglish && (
                    <div className="h-3 w-full relative bg-white">
                        <div className="absolute top-1/2 left-0 right-0 h-[6px] bg-[#CE1124] -translate-y-1/2"></div>
                        <div className="absolute left-1/2 top-0 bottom-0 w-[6px] bg-[#CE1124] -translate-x-1/2"></div>
                    </div>
                )}
                <div className={`flex ${colors.background} ${colors.border10} border-b py-4 px-8 items-center justify-between`}>
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
                                                        <div className="font-medium" style={{ color: isDark ? '#ffffff' : '#1f2937' }}>{userName}</div>
                                                        <div className="text-xs" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>{userEmail}</div>
                                                    </div>
                                                ),
                                                disabled: true,
                                            },
                                            { type: 'divider' },
                                            {
                                                key: 'logout',
                                                label: <span style={{ color: isDark ? '#ffffff' : '#1f2937' }}>{t.logout}</span>,
                                                icon: <FiLogOut size={16} style={{ color: isDark ? '#ffffff' : '#1f2937' }} />,
                                                onClick: handleSignOut,
                                            },
                                        ],
                                        style: { backgroundColor: isDark ? '#1f2937' : '#ffffff' },
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
                                    {t.login}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}