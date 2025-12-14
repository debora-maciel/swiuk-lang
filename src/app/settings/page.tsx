"use client"
import { LanguageType, useLanguage } from "../core/context/language/LanguageContext";
import { useTheme } from "../core/context/theme/ThemeContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Dropdown, MenuProps } from "antd";
import { Modal } from 'antd';
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FiShare2, FiCheck, FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { translations } from "../core/variables/translation";
import { deleteWordsByStatus, WordLanguage, WordStatus } from "@/lib/supabase/words";
import { useGlobalMessage } from "../core/components/Message";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/supabase/hooks";
import Link from "next/link";

export default function Settings() {
    const { onChangeTheme, colors, theme } = useTheme();
    const { language, onChangeLanguage } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteInfo, setDeleteInfo] = useState<{ language: WordLanguage; status: WordStatus } | null>(null);
    const { openMessage, contextHolder } = useGlobalMessage();
    const t = translations.settings[language];
    const { user } = useUser();
    const [username, setUsername] = useState('');
    const [savedUsername, setSavedUsername] = useState('');
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isSavingUsername, setIsSavingUsername] = useState(false);
    const [linkCopied, setLinkCopied] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            if (!user) {
                setIsLoadingProfile(false);
                return;
            }
            const supabase = createClient();
            const { data } = await supabase
                .from('profiles')
                .select('username')
                .eq('id', user.id)
                .single();

            if (data?.username) {
                setUsername(data.username);
                setSavedUsername(data.username);
            }
            setIsLoadingProfile(false);
        }
        loadProfile();
    }, [user]);

    async function handleSaveUsername() {
        if (!user || !username.trim()) return;

        // Validate username format
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            openMessage('error', t.usernameHint);
            return;
        }

        setIsSavingUsername(true);
        const supabase = createClient();

        // Check if username is taken
        const { data: existing } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username.toLowerCase())
            .neq('id', user.id)
            .single();

        if (existing) {
            openMessage('error', t.usernameExists);
            setIsSavingUsername(false);
            return;
        }

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                username: username.toLowerCase(),
                updated_at: new Date().toISOString(),
            });

        if (error) {
            openMessage('error', t.usernameError);
        } else {
            setSavedUsername(username.toLowerCase());
            openMessage('success', t.usernameSaved);
        }
        setIsSavingUsername(false);
    }

    function handleCopyLink() {
        const url = `${window.location.origin}/u/${savedUsername}`;
        navigator.clipboard.writeText(url);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    }

    const items: MenuProps['items'] = [
        {
            key: 'label',
            label: t.theme,
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'system',
            label: t.themeSystem,
        },
        {
            key: 'light',
            label: t.themeLight,
        },
        {
            key: 'dark',
            label: t.themeDark,
        },
    ];

    const languages: MenuProps['items'] = [
        {
            key: 'de',
            label: 'Deutsch',
            icon: <Image width={20} height={20} alt='de' src={'/german.png'} />,
        },
        {
            key: 'en',
            label: 'English',
            icon: <Image width={20} height={20} alt='en' src={'/english.png'} />,
        },
        {
            key: 'fr',
            label: 'Français',
            icon: <Image width={20} height={20} alt='fr' src={'/french.png'} />,
        },
        {
            key: 'pt',
            label: 'Português',
            icon: <Image width={20} height={20} alt='pt' src={'/portuguese.svg'} />,
        },
    ];

    const handleClick: MenuProps['onClick'] = (info) => {
        onChangeTheme(info.key as 'light' | 'dark' | 'system');
    };

    const handleChangeLang: MenuProps['onClick'] = (info) => {
        onChangeLanguage(info.key as LanguageType);
    };

    function getLang(lang: LanguageType) {
        switch (lang) {
            case 'de':
                return 'Deutsch'
            case 'en':
                return 'English'
            case 'pt':
                return 'Português'
            default:
                return 'Français'
        }
    }

    function getThemeLabel(themeKey: string) {
        switch (themeKey) {
            case 'system':
                return t.themeSystem;
            case 'light':
                return t.themeLight;
            case 'dark':
                return t.themeDark;
            default:
                return themeKey;
        }
    }

    function openDeleteConfirm(lang: WordLanguage, status: WordStatus) {
        setDeleteInfo({ language: lang, status });
        setIsModalOpen(true);
    }

    async function handleOk() {
        if (deleteInfo) {
            const { error } = await deleteWordsByStatus(deleteInfo.language, deleteInfo.status);
            if (error) {
                openMessage('error', t.deleteError || 'Error deleting words');
            } else {
                openMessage('success', t.deleteSuccess || 'Words deleted successfully');
            }
        }
        setIsModalOpen(false);
    }

    function handleCancel() {
        setIsModalOpen(false);
    }

    const wordCategories = [
        {
            title: t.english,
            language: 'english' as WordLanguage,
        },
        {
            title: t.german,
            language: 'german' as WordLanguage,
        },
        {
            title: t.french,
            language: 'french' as WordLanguage,
        }
    ];

    return (
        <div className={`w-full min-h-screen flex overflow-y-scroll px-4 pt-4 items-start justify-center gap-4 ${colors.backgroundLight} pb-20`}>
            <div className={`${colors.background} ${colors.text} pb-10 w-full max-w-4xl rounded-4xl flex flex-col flex items-center justify-center`}>
                <div className={`font-bold text-xl pt-4`}>
                    {t.title}
                </div>
                <div className={`mt-4 w-full px-3 gap-2 border-t text-sm ${colors.border10} flex flex-col items-center `}>
                    {/* Profile Section */}
                    {user && (
                        <>
                            <div className={`${colors.border10} w-full text-center py-2`}>{t.profile}</div>
                            <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                                <div className="flex-1">
                                    <div className="mb-1">{t.username}</div>
                                    <div className={`${colors.text50} text-xs`}>{t.usernameHint}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                        placeholder={t.usernamePlaceholder}
                                        className={`${colors.backgroundLight} ${colors.text} px-3 py-2 rounded-lg text-sm w-40 border ${colors.border10}`}
                                    />
                                    <button
                                        onClick={handleSaveUsername}
                                        disabled={isSavingUsername || username === savedUsername || !username.trim()}
                                        className={`px-4 py-2 rounded-lg text-sm ${
                                            username !== savedUsername && username.trim()
                                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                                : `${colors.backgroundLight} ${colors.text50}`
                                        } transition-colors`}
                                    >
                                        {isSavingUsername ? '...' : t.saveUsername}
                                    </button>
                                </div>
                            </div>
                            {savedUsername && (
                                <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                                    <div>
                                        <div>{t.shareProfile}</div>
                                        <div className={`${colors.text50} text-xs`}>swiuk.com/u/{savedUsername}</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/u/${savedUsername}`}
                                            target="_blank"
                                            className={`${colors.backgroundLight} px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:opacity-80`}
                                        >
                                            <FiExternalLink size={14} />
                                        </Link>
                                        <button
                                            onClick={handleCopyLink}
                                            className={`bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-purple-700 transition-colors`}
                                        >
                                            {linkCopied ? <FiCheck size={14} /> : <FiShare2 size={14} />}
                                            {linkCopied ? t.linkCopied : t.copyLink}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    <div className={`${colors.border10} w-full text-center py-2`}>{t.general}</div>
                    <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                        <div className="">
                            {t.theme}
                        </div>
                        <div>
                            <Dropdown
                                menu={{
                                    items,
                                    selectable: true,
                                    selectedKeys: [theme],
                                    onClick: handleClick,
                                }}
                                trigger={['click']}
                            >
                                <div className={`flex items-center justify-between gap-2 pr-1 pl-3 capitalize rounded py-1`}>
                                    {getThemeLabel(theme)} <MdKeyboardArrowDown />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                        <div>
                            {t.language}
                        </div>
                        <div>
                            <Dropdown
                                menu={{
                                    items: languages,
                                    selectable: true,
                                    selectedKeys: [language],
                                    onClick: handleChangeLang,
                                }}
                                trigger={['click']}
                            >
                                <div className={`flex items-center justify-between gap-2 pr-1 pl-3 capitalize rounded py-1`}>
                                    {getLang(language)} <MdKeyboardArrowDown />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    {wordCategories.map((d) => (
                            <div key={d.title} className={`p-2 flex flex-col items-center w-full`}>
                                <div className={`${colors.border10} w-full text-center py-2`}>{d.title}</div>
                                <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                                    <div>
                                        {t.deleteKnownWords}
                                    </div>
                                    <div>
                                        <button onClick={() => openDeleteConfirm(d.language, 'known')} className={`text-white bg-red-600 px-4 py-2 rounded-full`}>{t.deleteAll}</button>
                                    </div>
                                </div>
                                <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                                    <div>
                                        {t.deleteUnknownWords}
                                    </div>
                                    <div>
                                        <button onClick={() => openDeleteConfirm(d.language, 'unknown')} className={`text-white bg-red-600 px-4 py-2 rounded-full`}>{t.deleteAll}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <Modal
                title={<div className={`leading-4 text-base border-b pb-4 ${colors.border10} ${colors.background} ${colors.text}`}>{t.deleteConfirmTitle}</div>}
                open={isModalOpen}
                styles={{
                    content: {
                        boxShadow: 'none',
                        background: 'transparent'
                    }
                }}
                closeIcon={
                    <IoClose className={`${colors.text} text-xl hover:text-red-500 transition duration-200`} />
                }
                modalRender={(modal) => (
                    <div className={`rounded-xl border ${colors.border10} ${colors.background} w-[340px] flex flex-col mx-auto ${colors.text}`}>
                        {modal}
                    </div>
                )}
                footer={[
                    <div key={'footer-new-word'} className={`flex items-center justify-between border-t ${colors.border10} ${colors.text}  pt-4 ${colors.background}`}>
                        <button
                            key={'button-cancel'}
                            className={`${colors.border20} ${colors.text80} border text-sm rounded-full px-6 py-2`}
                            onClick={handleCancel}
                        >
                            {t.cancel}
                        </button>
                        <button
                            key={'button-submit'}
                            onClick={() => handleOk()}
                            className={`${colors.background} ${colors.text} px-6 py-2 text-sm border rounded-full`}
                        >
                            {t.confirm}
                        </button>
                    </div>
                ]}
            >
                <p className="text-sm">{t.deleteConfirmMessage}</p>
            </Modal>
            {contextHolder}
        </div>
    )
}
