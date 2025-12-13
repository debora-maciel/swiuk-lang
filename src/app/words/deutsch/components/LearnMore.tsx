"use client";

import { useTheme } from "@/app/core/context/theme/ThemeContext";
import { useLanguage } from "@/app/core/context/language/LanguageContext";
import { FcGoogle } from "react-icons/fc";
import { HiSpeakerWave } from "react-icons/hi2";
import { useEffect, useState } from "react";

const translations = {
    en: {
        searchWord: "Search the word.",
        verySlow: "0.25x",
        slow: "0.5x",
        normal: "1x",
    },
    de: {
        searchWord: "Suche das Wort.",
        verySlow: "0.25x",
        slow: "0.5x",
        normal: "1x",
    },
    fr: {
        searchWord: "Chercher le mot.",
        verySlow: "0.25x",
        slow: "0.5x",
        normal: "1x",
    },
    pt: {
        searchWord: "Pesquisar a palavra.",
        verySlow: "0.25x",
        slow: "0.5x",
        normal: "1x",
    },
};

type SpeedType = 'very-slow' | 'slow' | 'normal';

export default function LearnMore({ words, currentWord }: { words: string[], currentWord: number }) {
    const { colors } = useTheme();
    const { language } = useLanguage();
    const t = translations[language];
    const [selectedSpeed, setSelectedSpeed] = useState<SpeedType>('normal');

    // Preload voices on mount
    useEffect(() => {
        if ('speechSynthesis' in window) {
            speechSynthesis.getVoices();
            speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
        }
    }, []);

    const speakText = () => {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(words[currentWord]);
            utterance.lang = 'de-DE';

            const speedRates = {
                'very-slow': 0.25,
                'slow': 0.5,
                'normal': 1.0,
            };
            utterance.rate = speedRates[selectedSpeed];

            const voices = speechSynthesis.getVoices();
            const targetVoice = voices.find(voice => voice.lang.startsWith('de'));
            if (targetVoice) {
                utterance.voice = targetVoice;
            }

            speechSynthesis.speak(utterance);
        }
    };

    const speedOptions: { key: SpeedType; label: string }[] = [
        { key: 'very-slow', label: t.verySlow },
        { key: 'slow', label: t.slow },
        { key: 'normal', label: t.normal },
    ];

    return (
        <>
            <div className={`text-sm w-2/3 mt-6 mb-2 font-bold pl-4 ${colors.textSlate800}`}>{t.searchWord}</div>
            <div className="w-full flex items-center justify-start gap-3 pl-4">
                <a href={"https://www.google.com/search?q=" + words[currentWord] + "+translation"} target="_blank" rel="noopener noreferrer">
                    <button className="cursor-pointer text-white rounded-full text-[25px]">
                        <FcGoogle />
                    </button>
                </a>
                <button
                    onClick={speakText}
                    className={`cursor-pointer ${colors.text70} hover:${colors.text} p-2 rounded-lg transition-all`}
                >
                    <HiSpeakerWave size={22} />
                </button>
                <div className="flex items-center gap-1">
                    {speedOptions.map((option) => (
                        <button
                            key={option.key}
                            onClick={() => setSelectedSpeed(option.key)}
                            className={`px-2 py-1 text-xs rounded-lg border transition-all ${
                                selectedSpeed === option.key
                                    ? `${colors.backgroundReverse} ${colors.textReverse} border-transparent`
                                    : `${colors.text60} ${colors.border20} hover:${colors.text}`
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}
