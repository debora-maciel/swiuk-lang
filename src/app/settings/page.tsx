"use client"
import { LanguageType, useLanguage } from "../core/context/language/LanguageContext";
import { useTheme } from "../core/context/theme/ThemeContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Dropdown, MenuProps } from "antd";
import { Modal } from 'antd';
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { translations } from "../core/variables/translation";

export default function Settings() {
    const { onChangeTheme, colors, theme } = useTheme();
    const { language, onChangeLanguage } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteKey, setDeleteKey] = useState<string | null>(null);
    const t = translations.settings[language];

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

    function openDeleteConfirm(key: string) {
        setDeleteKey(key);
        setIsModalOpen(true);
    }

    function handleOk() {
        if (deleteKey) {
            localStorage.removeItem(deleteKey);
        }
        setIsModalOpen(false);
    }

    function handleCancel() {
        setIsModalOpen(false);
    }

    const wordCategories = [
        {
            title: t.english,
            keyUnknown: "knownWords",
            keyKnown: "unknownWords",
        },
        {
            title: t.german,
            keyUnknown: "DEknownWords",
            keyKnown: "DEunknownWords",
        },
        {
            title: t.french,
            keyUnknown: "FRknownWords",
            keyKnown: "FRunknownWords",
        }
    ];

    return (
        <div className={`w-full min-h-screen flex overflow-y-scroll px-4 pt-4 items-start justify-center gap-4 ${colors.backgroundLight} pb-20`}>
            <div className={`${colors.background} ${colors.text} pb-10 w-full max-w-4xl rounded-4xl flex flex-col flex items-center justify-center`}>
                <div className={`font-bold text-xl pt-4`}>
                    {t.title}
                </div>
                <div className={`mt-4 w-full px-3 gap-2 border-t text-sm ${colors.border10} flex flex-col items-center `}>
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
                                        <button onClick={() => openDeleteConfirm(d.keyKnown)} className={`text-white bg-red-600 px-4 py-2 rounded-full`}>{t.deleteAll}</button>
                                    </div>
                                </div>
                                <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                                    <div>
                                        {t.deleteUnknownWords}
                                    </div>
                                    <div>
                                        <button onClick={() => openDeleteConfirm(d.keyUnknown)} className={`text-white bg-red-600 px-4 py-2 rounded-full`}>{t.deleteAll}</button>
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
        </div>
    )
}
