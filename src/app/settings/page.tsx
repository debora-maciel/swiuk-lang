"use client"
import { LanguageType, useLanguage } from "../core/context/language/LanguageContext";
import { useTheme } from "../core/context/theme/ThemeContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Dropdown, MenuProps } from "antd";
import { Modal } from 'antd';
import { useState } from "react";

export default function Settings() {
    const { onChangeTheme, colors, theme } = useTheme();
    const { language, targetLanguage } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteKey, setDeleteKey] = useState<string | null>(null);

    const items: MenuProps['items'] = [
        {
            key: 'label',
            label: 'Theme',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: 'system',
            label: 'System',
        },
        {
            key: 'light',
            label: 'Light',
        },
        {
            key: 'dark',
            label: 'Dark',
        },
    ];

    const handleClick: MenuProps['onClick'] = (info) => {
        onChangeTheme(info.key as 'light' | 'dark' | 'system');
    };

    function getLang(lang: LanguageType) {
        switch (lang) {
            case 'de':
                return 'Deutsch'
            case 'en':
                return 'English'
            default:
                return 'Français'
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

    return (
        <div className={`w-full min-h-screen flex overflow-y-scroll px-4 pt-4 items-start gap-4 ${colors.backgroundLight} pb-20`}>
            <div className={`${colors.background} ${colors.text} pb-10 w-full rounded-4xl flex flex-col flex items-center justify-center`}>
                <div className={`font-bold text-xl pt-4`}>
                    Settings
                </div>
                <div className={`mt-4 w-full px-3 gap-2 border-t text-sm ${colors.border10} flex flex-col items-center `}>
                    <div className={`${colors.border10} w-full text-center py-2`}>General</div>
                    <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                        <div className="">
                            Theme
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
                                    {theme} <MdKeyboardArrowDown />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                        <div>
                            Language
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
                                    {getLang(language)} <MdKeyboardArrowDown />
                                </div>
                            </Dropdown>
                        </div>
                    </div>
                    {[
                        {
                            title: "English",
                            keyUnknown: "knownWords",
                            keyKnown: "unknownWords",
                        },
                        {
                            title: "German",
                            keyUnknown: "DEknownWords",
                            keyKnown: "DEunknownWords",
                        },
                        {
                            title: "French",
                            keyUnknown: "FRknownWords",
                            keyKnown: "FRunknownWords",
                        }
                    ]
                        .map((d) => (
                            <div key={d.title} className={`p-2 flex flex-col items-center w-full`}>
                                <div className={`${colors.border10} w-full text-center py-2`}>{d.title}</div>
                                <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                                    <div>
                                        Delete all known words
                                    </div>
                                    <div>
                                        <button onClick={() => openDeleteConfirm(d.keyKnown)} className={`text-white bg-red-600 px-4 py-2 rounded-full`}>Delete all</button>
                                    </div>
                                </div>
                                <div className={`p-2 flex justify-between items-center w-full border-b ${colors.border10} pb-2`}>
                                    <div>
                                        Delete all unknown words
                                    </div>
                                    <div>
                                        <button onClick={() => openDeleteConfirm(d.keyUnknown)} className={`text-white bg-red-600 px-4 py-2 rounded-full`}>Delete all</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <Modal
                title="Do you want to delete these items?"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>This will remove all saved words under this category.</p>
            </Modal>
        </div>
    )
}