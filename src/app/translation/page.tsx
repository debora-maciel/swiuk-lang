'use client';
import { PiCopy } from "react-icons/pi";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dict from '../data/eng_germ_dict.json';
import { IoArrowBackCircle } from 'react-icons/io5';
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
        setInput(value);
        setTranslation(null);
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
    }, []);

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
        <>
            {/* Toast */}
            {showToast && (
                <div className="fixed bottom-20 right-5 bg-black text-white px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 z-50">
                    Copied to clipboard!
                </div>
            )}

            <div className="pl-5 text-xl pt-1 montserrat-black w-full text-left flex items-center justify-between px-4 mb-3">
                <Link href={'/'} className="text-black text-5xl">
                    <IoArrowBackCircle />
                </Link>
                <h1 className="text-2xl font-bold mb-4 w-4/6 pt-4">Translator</h1>
            </div>

            <div className="p-4 max-w-md mx-auto text-center relative">
                <div className="flex justify-center items-center gap-4 mb-4">
                    <span>{direction === 'de-en' ? 'Deutsch → English' : 'English → Deutsch'}</span>
                    <button
                        onClick={handleSwitch}
                        className="bg-gray-200 px-3 py-1 rounded text-sm"
                    >
                        ↔ Switch
                    </button>
                </div>

                <input
                    type="text"
                    className="border p-2 w-full rounded-lg pl-4"
                    placeholder={direction === 'de-en' ? 'Type a German word' : 'Type an English word'}
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                />

                {suggestions.length > 0 && (
                    <ul
                        ref={suggestionsRef}
                        className="absolute z-10 bg-white border w-full text-left max-h-40 overflow-y-auto rounded-x rounded-b shadow-md"
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

                <button
                    onClick={() => handleTranslate()}
                    className="bg-black text-white px-4 py-2 rounded-lg w-full mt-2"
                >
                    Translate
                </button>

                {translation && (
                    <div className="mt-20 text-lg flex flex-col items-center gap-2">
                        <div className="flex items-center flex-col w-full rounded border-[0.9px] border-slate-300 bg-slate-300/10">
                            <div className="relative group flex items-center justify-end w-full">
                                <button
                                    onClick={handleCopy}
                                    className="text-xs cursor-pointer flex items-center gap-1 text-gray-700 px-2 py-1 rounded hover:text-black"
                                >
                                    <PiCopy /> Copy
                                </button>
                            </div>
                            <span className="pb-4">
                                {Array.isArray(translation)
                                    ? translation.join(', ')
                                    : translation}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
