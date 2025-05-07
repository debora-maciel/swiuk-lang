'use client';

import { IoIosArrowRoundForward } from "react-icons/io";
import HeaderBack from "../core/components/HeaderBack";
import { useTheme } from "../core/theme/ThemeContext";
import { useEffect, useRef, useState } from 'react';
import { GoArrowSwitch } from "react-icons/go";
import dict from '../data/eng_germ_dict.json';
import { HiMiniXMark } from "react-icons/hi2";
import { PiCopy } from "react-icons/pi";
import debounce from 'lodash.debounce';

type DictType = Record<string, string | string[]>;

function reverseDict(original: DictType): DictType {
    const reversed: DictType = {};
    for (const [de, en] of Object.entries(original)) {
        if (Array.isArray(en)) {
            en.forEach(e => reversed[e.toLowerCase()] = de);
        } else {
            reversed[en.toLowerCase()] = de;
        }
    }
    return reversed;
}

const reversedDict = reverseDict(dict as DictType);

export default function Translator() {
    const [input, setInput] = useState('');
    const { colors } = useTheme();
    const [translation, setTranslation] = useState<string | string[] | null>(null);
    const [direction, setDirection] = useState<'de-en' | 'en-de'>('de-en');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    const handleSwitch = () => {
        setTranslation(null);
        setInput('');
        setSuggestions([]);
        setHighlightIndex(-1);
        setDirection(prev => (prev === 'de-en' ? 'en-de' : 'de-en'));
    };

    const debouncedUpdateSuggestions = debounce((value: string) => {
        const dictToUse = direction === 'de-en' ? dict : reversedDict;
        const filtered = Object.keys(dictToUse)
            .filter((word) => word.toLowerCase().startsWith(value.toLowerCase()))
            .slice(0, 5);
        setSuggestions(value ? filtered : []);
    }, 150);

    const handleChange = (value: string) => {
        handleTranslate(value);
        setInput(value);
        // setTranslation(null);
        setHighlightIndex(-1);
        debouncedUpdateSuggestions(value);
    };

    const handleSelectSuggestion = (word: string) => {
        setInput(word);
        setSuggestions([]);
        handleTranslate(word);
    };

    const handleTranslate = (word?: string) => {
        const lookup = word ?? input.trim();
        const dictToUse = direction === 'de-en' ? dict : reversedDict;

        const result = direction === 'de-en'
            ? (dictToUse as DictType)[lookup]
            : (dictToUse as DictType)[lookup.toLowerCase()];

        setTranslation(result ?? 'No translation found');
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
                handleTranslate(input);
            }
        }
    };

    const handleCopy = () => {
        const text = Array.isArray(translation)
            ? translation.join(', ')
            : translation;

        if (!text || text === 'No translation found') return;

        navigator.clipboard.writeText(text);
        setCopied(true);
        setShowToast(true);
        setTimeout(() => setCopied(false), 1000);
        setTimeout(() => setShowToast(false), 2000);
    };

    useEffect(() => {
        return () => {
            debouncedUpdateSuggestions.cancel();
        };
    }, [null]);

    const boldMatch = (suggestion: string) => {
        const i = suggestion.toLowerCase().indexOf(input.toLowerCase());
        if (i === -1) return suggestion;
        const before = suggestion.slice(0, i);
        const match = suggestion.slice(i, i + input.length);
        const after = suggestion.slice(i + input.length);
        return (
            <>
                {before}
                <strong>{match}</strong>
                {after}
            </>
        );
    };

    return (
        <div className={`${colors.backgroundSecondary} w-full h-full`}>
            {showToast && (
                <div className={`fixed bottom-20 right-5 ${colors.background} text-white px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 z-50`}>
                    Copied to clipboard!
                </div>
            )}

            <HeaderBack title="Translator" link="/" />

            <div className={`max-w-lg mx-auto text-center relative w-full`}>
                <div className={`${colors.text} flex justify-center items-center gap-4 mb-4 w-full`}>
                    <span>{direction === 'de-en' ? (<div className="flex items-center gap-3">Deutsch <IoIosArrowRoundForward /> English</div>) : <div className="flex items-center gap-3"> English<IoIosArrowRoundForward />Deutsch</div>}</span>
                    <button
                        onClick={handleSwitch}
                        className={`${colors.textReverse} bg-gray-200 px-3 py-1 rounded text-sm flex items-center gap-1`}
                    >
                        <GoArrowSwitch /> Switch
                    </button>
                </div>

                <div className="flex items-center w-full justify-center h-full flex-col">
                    <div
                        className={`flex items-start border-t h-full w-full ${colors.border10}`}>
                        <input
                            type="text"
                            className={`${colors.text} p-2 w-full pl-4 focus:outline-none text-base focus:border-black`}
                            placeholder={direction === 'de-en' ? 'Type a German word' : 'Type an English word'}
                            value={input}
                            onChange={(e) => handleChange(e.target.value)}
                            onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="pr-2 pt-2 cursor-pointer" onClick={() => { setInput(''); setTranslation('') }}>
                            <HiMiniXMark size={20} />
                        </div>
                    </div>

                    {suggestions.length > 0 && (
                        <ul
                            ref={suggestionsRef}
                            className={`absolute z-10 ${colors.background} ${colors.text} border-0 w-full text-left max-h-40 overflow-y-auto rounded-x rounded-b shadow-md top-[80%]`}
                        >
                            {suggestions.map((sug, index) => (
                                <li
                                    key={sug}
                                    className={`px-3 py-2 cursor-pointer ${index === highlightIndex ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50'
                                        }`}
                                    onMouseDown={() => handleSelectSuggestion(sug)}
                                >
                                    {boldMatch(sug)}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* <button
                    onClick={() => handleTranslate()}
                    className="bg-black text-white px-4 py-2 rounded-lg w-full mt-2"
                >
                    Translate
                </button> */}

                    {translation && (
                        <div className="h-full text-lg flex flex-col items-center gap-2 w-full">
                            <div className="flex items-center flex-col w-full 
                             border-[0.9px] h-full border-slate-300 bg-slate-300/10">
                                <div className="relative group flex items-center justify-end w-full pt-2">
                                    <span className={`${colors.text} flex items-start justify-start text-base h-full w-full pl-4`}>
                                        {Array.isArray(translation)
                                            ? translation.join(', ')
                                            : translation}
                                    </span>

                                    <button
                                        onClick={handleCopy}
                                        className="text-xs cursor-pointer flex items-center gap-1 text-gray-700 px-2 py-1 rounded hover:text-black"
                                    >
                                        <PiCopy /> Copy
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
