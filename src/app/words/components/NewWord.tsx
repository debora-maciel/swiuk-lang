"use client"
import { Modal } from "antd"
import debounce from "lodash.debounce";
import { useEffect, useRef, useState } from "react";
import dataDE from '../../data/eng_germ_dict.json';
import dataFR from '../../data/french.json';
import dataEN from "./../../data/words.json";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import { BsPlus } from "react-icons/bs";
import { useGlobalMessage } from "@/app/core/components/Message";
import { useTheme } from "@/app/core/context/theme/ThemeContext";
import { useLanguage } from "@/app/core/context/language/LanguageContext";
import { saveWord, WordLanguage } from "@/lib/supabase/words";

const translations = {
    en: {
        addNewKnownWord: "Add new known word",
        searchForWord: "Search for word",
        cancel: "Cancel",
        confirm: "Confirm",
        addTheseWords: "Add these words into the Known Words?",
        wordAlreadyKnown: "Word already known!",
        wordAdded: "Word added successfully!",
        wordsAdded: "Words added successfully!",
        newWord: "+ New word",
    },
    de: {
        addNewKnownWord: "Neues bekanntes Wort hinzufügen",
        searchForWord: "Nach Wort suchen",
        cancel: "Abbrechen",
        confirm: "Bestätigen",
        addTheseWords: "Diese Wörter zu den bekannten Wörtern hinzufügen?",
        wordAlreadyKnown: "Wort bereits bekannt!",
        wordAdded: "Wort erfolgreich hinzugefügt!",
        wordsAdded: "Wörter erfolgreich hinzugefügt!",
        newWord: "+ Neues Wort",
    },
    fr: {
        addNewKnownWord: "Ajouter un mot connu",
        searchForWord: "Rechercher un mot",
        cancel: "Annuler",
        confirm: "Confirmer",
        addTheseWords: "Ajouter ces mots aux mots connus?",
        wordAlreadyKnown: "Mot déjà connu!",
        wordAdded: "Mot ajouté avec succès!",
        wordsAdded: "Mots ajoutés avec succès!",
        newWord: "+ Nouveau mot",
    },
    pt: {
        addNewKnownWord: "Adicionar palavra conhecida",
        searchForWord: "Pesquisar palavra",
        cancel: "Cancelar",
        confirm: "Confirmar",
        addTheseWords: "Adicionar estas palavras às palavras conhecidas?",
        wordAlreadyKnown: "Palavra já conhecida!",
        wordAdded: "Palavra adicionada com sucesso!",
        wordsAdded: "Palavras adicionadas com sucesso!",
        newWord: "+ Nova palavra",
    },
};

interface INewModal {
    known: 'DEknownWords' | "knownWords" | 'FRknownWords';
    icon: 'small' | 'default';
    unknown: 'FRunknownWords' | 'DEunknownWords' | "unknownWords";
    onOk?: () => void;
    lang: 'DE' | 'EN'| 'FR';
}

export default function NewWord(props: INewModal) {
    const { openMessage, contextHolder } = useGlobalMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { colors } = useTheme();
    const { language } = useLanguage();
    const t = translations[language];
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const suggestionsRef = useRef<HTMLUListElement>(null);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    const debouncedUpdateSuggestions = debounce((value: string) => {
        const dic = props.lang === 'DE'
            ? Object.keys(dataDE)
            : props.lang === 'FR'
                ? Object.keys(dataFR)
                : Object.keys(dataEN);

        const filtered = dic
            .filter((word): word is string => typeof word === 'string')
            .filter((word) => word.toLowerCase().startsWith(value.toLowerCase()))
            .slice(0, 400);

        setSuggestions(value ? filtered : []);
    }, 150);

    const handleChange = (value: string) => {
        setInput(value);
        setHighlightIndex(-1);
        debouncedUpdateSuggestions(value);
    };

    const handleSelectSuggestion = (word: string) => {
        const alreadyInList = selectedWords.includes(word);

        if (!alreadyInList) {
            setSelectedWords(prev => [...prev, word]);
        } else {
            openMessage('error', t.wordAlreadyKnown)
        }

        setInput('');
        setSuggestions([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightIndex((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightIndex >= 0) {
                handleSelectSuggestion(suggestions[highlightIndex]);
            } else {
                setSuggestions([]);
            }
        }
    };

    const boldMatch = (suggestion: string) => {
        const i = suggestion.toLowerCase().indexOf(input.toLowerCase());
        if (i === -1) return suggestion;
        const before = suggestion.slice(0, i);
        const match = suggestion.slice(i, i + input.length);
        const after = suggestion.slice(i + input.length);
        return (<>{before}<strong>{match}</strong>{after}</>);
    };

    async function onAddWord() {
        const langMap: Record<string, WordLanguage> = {
            'EN': 'english',
            'DE': 'german',
            'FR': 'french'
        };
        const supabaseLang = langMap[props.lang];

        await Promise.all(selectedWords.map(word => saveWord(word, supabaseLang, 'known')));

        if (props.onOk) props.onOk();

        openMessage('success', selectedWords.length > 1 ? t.wordsAdded : t.wordAdded)
        handleOk();
        setSelectedWords([]);
        setInput('');
    }

    useEffect(() => {
        return () => {
            debouncedUpdateSuggestions.cancel();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {props.icon === 'default' ? (
                <button
                    onClick={showModal}
                    className={` ${colors.background} cursor-pointer border ${colors.border30} ${colors.text60} font-normal rounded-full px-2 py-1`}>
                    {t.newWord}
                </button>
            ) : (
                <button
                    onClick={showModal}
                    className={`${colors.background}  cursor-pointer flex items-center border rounded-full ${colors.border30} ${colors.text80} p-2`}>
                    <BsPlus size={25} />
                </button>
            )}

            <Modal
                open={isModalOpen}
                onCancel={handleCancel}
                styles={{
                    content: {
                        background: 'transparent'
                    }
                }}
                modalRender={(modal) => (
                    <div className={`rounded-xl p-4 border ${colors.border10} ${colors.background} ${colors.text}`}>
                        {modal}
                    </div>
                )}
                closeIcon={
                    <IoClose className={`${colors.text} text-xl hover:text-red-500 transition duration-200`} />
                }
                title={<div className={`leading-4 border-b pb-4 ${colors.border10} ${colors.background} ${colors.text}`}>{t.addNewKnownWord}</div>}
                footer={[
                    <div key={'footer-new-word'} className={`flex items-center justify-between border-t ${colors.border10} ${colors.text}  pt-4 ${colors.background}`}>
                        <button
                            key={'button-cancel'}
                            className={`${colors.border20} ${colors.text80} border rounded-full px-6 py-2`}
                            onClick={handleOk}
                        >
                            {t.cancel}
                        </button>
                        <button
                            disabled={selectedWords.length === 0}
                            key={'button-submit'}
                            onClick={onAddWord}
                            style={{ opacity: selectedWords.length > 0 ? 1 : 0.4 }}
                            className={`${colors.background} ${colors.text} px-6 py-2 border rounded-full`}
                        >
                            {t.confirm}
                        </button>
                    </div>
                ]}
            >
                <div className={`border ${colors.border20} rounded-lg flex items-center pl-2 mt-4`}>
                    <IoSearchOutline />
                    <input
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                        onKeyDown={handleKeyDown}
                        className={`w-full px-2 py-2 focus:outline-none focus:ring-0 ${props.lang === 'EN' ? 'lowercase' : ''}`}
                        placeholder={t.searchForWord}
                    />
                </div>

                {selectedWords.length > 0 && (
                    <div className={`${colors.backgroundSlate200} rounded-lg my-4 flex flex-col h-min border border-slate-200`}>
                        <div className={`flex items-center justify-between pl-4 pr-2 pt-2 ${colors.text}`}>
                            {t.addTheseWords}
                            <div
                                onClick={() => {
                                    setInput('');
                                    setSelectedWords([]);
                                }}
                                className={`cursor-pointer border rounded-full ${colors.border} ${colors.text} p-1`}
                            >
                                <HiMiniXMark size={15} />
                            </div>
                        </div>
                        <div className={`flex flex-wrap gap-2 p-4`}>
                            {selectedWords.map((w, idx) => (
                                <div
                                    key={idx}
                                    className={`${colors.background} border border-gray-300 rounded-full px-3 py-1 text-sm flex items-center gap-2`}
                                >
                                    <span className={props.lang === 'EN' ? 'lowercase' : ''}>{w}</span>
                                    <button
                                        onClick={() => setSelectedWords(prev => prev.filter(word => word !== w))}
                                        className={`text-gray-500 hover:text-red-600`}
                                    >
                                        <HiMiniXMark size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    {suggestions.length > 0 && (
                        <ul
                            ref={suggestionsRef}
                            style={{ top: selectedWords.length > 0 ? "37%" : "54%" }}
                            className={`absolute z-10 ${colors.background} border-0 w-5/6 text-left max-h-40 overflow-y-auto rounded-x rounded-b shadow-md top-[37%]`}
                        >
                            {suggestions.map((sug, index) => (
                                <li
                                    key={sug}
                                    className={`px-3 py-2 cursor-pointer ${props.lang === 'EN' ? 'lowercase' : ''} ${index === highlightIndex ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50'}`}
                                    onMouseDown={() => handleSelectSuggestion(sug)}
                                >
                                    {boldMatch(sug)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </Modal>
            {contextHolder}
        </div>
    );
}
