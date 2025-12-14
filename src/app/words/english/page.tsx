"use client";
import { useState, useEffect } from "react";
import data from "./../../data/words.json";
import { HiMiniXMark } from "react-icons/hi2";
import { IoCheckmark, IoPlaySkipForward } from "react-icons/io5";
import LearnMore from "./components/LearnMore";
import { utils } from "../../../utils/utils";
import Link from "next/link";
import NewWord from "../components/NewWord";
import { useTheme } from "@/app/core/context/theme/ThemeContext";
import { useLanguage } from "@/app/core/context/language/LanguageContext";
import HeaderBack from "@/app/core/components/HeaderBack";
import { saveWord, getWordsByLanguage } from "@/lib/supabase/words";
import { useUser } from "@/lib/supabase/hooks";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const translations = {
    en: {
        unknown: "Unknown",
        known: "Known",
        all: "All",
        skip: "Skip",
    },
    de: {
        unknown: "Unbekannt",
        known: "Bekannt",
        all: "Alle",
        skip: "Überspringen",
    },
    fr: {
        unknown: "Inconnu",
        known: "Connu",
        all: "Tout",
        skip: "Passer",
    },
    pt: {
        unknown: "Desconhecido",
        known: "Conhecido",
        all: "Todos",
        skip: "Pular",
    },
};

type WordEntry = {
    MEANINGS: Array<[string, string, string[], any[]]>;
    ANTONYMS: string[];
    SYNONYMS: string[];
};

function getWordProps(
    dictionary: any,
    word: string
): WordEntry | null {
    const entry = dictionary[word];
    return entry ?? null;
}

export default function EnglishWords() {
    const [knownWords, setKnownWords] = useState<string[]>([]);
    const [unknownWords, setUnknownWords] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const { colors } = useTheme();
    const { language } = useLanguage();
    const { user, loading: authLoading } = useUser();
    const t = translations[language];
    const [currentWord, setCurrentWord] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        if (authLoading) return;

        const loadWords = async () => {
            if (user) {
                const { known, unknown } = await getWordsByLanguage('english');
                setKnownWords(known);
                setUnknownWords(unknown);
            }
            setHasLoaded(true);
        };

        loadWords();
    }, [user, authLoading]);

    useEffect(() => {
        const shuffledWords = utils.shuffleArray(Object.keys(data));
        setWords(shuffledWords);
    }, []);

    const wordData = getWordProps(data, words[currentWord]);

    const styleCorrect = isCorrect === null
        ? `${colors.textSlate800} max-w-max`
        : isCorrect === true
            ? "text-green-200 border-t-0 rounded-[20px] transition-all transition-discrete hidden"
            : "text-red-200 rounded-[20px] transition-all transition-discrete hidden";

    const styleBorderCorrect = isCorrect === null
        ? "max-w-max"
        : isCorrect === true
            ? " transition-discrete transition-all"
            : " transition-discrete transition-all";

    function handleCorrect(word: string) {
        setIsCorrect(true);
        setKnownWords(prev => [...prev, word]);
        saveWord(word, 'english', 'known');

        setTimeout(() => {
            setIsCorrect(null);
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 400);
    }

    function handleIncorrect(word: string) {
        setIsCorrect(false);
        setUnknownWords(prev => [...prev, word]);
        saveWord(word, 'english', 'unknown');

        setTimeout(() => {
            setIsCorrect(null);
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 200);
    }

    function handleSkip() {
        setCurrentWord((prev) => (prev + 1) % words.length);
    }

    if (words.length === 0) return null;

    return (
        <div className={`min-h-screen flex flex-col items-center w-full ${colors.backgroundLight}`}>
            <HeaderBack link="/words/" title="English" />
            <div className={`w-full h-full xl:rounded-lg flex items-center justify-center`}>
                <div className={`flex flex-col justify-start items-start w-full h-full`}>
                    <div className={`flex items-center justify-end w-full px-4`}>
                        <Link href={'/words/english/list'} className={`w-full h-[70px] flex items-center justify-end xl:text-5xl font-bolder px-4`}>
                            <div className={`flex flex-col items-center justify-center border ${colors.border10} rounded-l-lg py-1 px-2 min-w-[60px]`}>
                                <div className={`${colors.text60} text-xs`}>
                                    {t.unknown}
                                </div>
                                <div className={`${colors.text60} text-xl`}>
                                    {!hasLoaded ? <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} /> : unknownWords.length}
                                </div>
                            </div>
                            <div className={`flex flex-col items-center justify-center border ${colors.border10} border-x-0 py-1 px-2 min-w-[60px]`}>
                                <div className={`text-xs ${colors.text80}`}>
                                    {t.known}
                                </div>
                                <div className={`font-bold ${colors.text80} text-xl`}>
                                    {!hasLoaded ? <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} /> : knownWords.length}
                                </div>
                            </div>
                            <div className={`flex flex-col items-center justify-center border  ${colors.border10} rounded-r-lg py-1 px-2`}>
                                <div className={`text-xs ${colors.text60}`}>{t.all}</div>
                                <div className={`${colors.text60} text-xl`}>
                                    {utils.formatNumberAbbreviated(words.length)}
                                </div>
                            </div>
                        </Link>
                        <NewWord lang="EN" unknown="unknownWords" known="knownWords" icon="small" />
                    </div>
                    <div className={`${isCorrect === null ? `${colors.background}` : isCorrect ? "bg-green-400" : "bg-red-400"}` + ` mx-auto flex items-center gap-1 w-full h-[130px] border ${colors.border} ${colors.border10}`}>
                        <div className={styleBorderCorrect + ` mx-auto py-3 p-4 rounded-xl transition-all duration-50 ease-in transform max-w-max z-100`}>
                            <h1 className={styleCorrect + " break-all tracking-wider rounded text-3xl xl:text-5xl font-bold px-10 py-4 capitalize"}>
                                {words[currentWord]}
                            </h1>
                        </div>
                    </div>
                    <div className={`flex flex-row justify-center gap-4 w-full mx-auto p-4`}>
                        <button onClick={() => handleIncorrect(words[currentWord])}
                            className={`cursor-pointer ${colors.text60} rounded-full border ${colors.border20} py-2 flex items-center gap-2 justify-between px-6`}>
                            <HiMiniXMark size={20} />
                            {t.unknown}
                        </button>
                        <button onClick={handleSkip}
                            className={`cursor-pointer ${colors.text60} rounded-full border ${colors.border10} py-2 flex items-center gap-2 justify-between px-4`}>
                            <IoPlaySkipForward size={18} />
                        </button>
                        <button onClick={() => handleCorrect(words[currentWord])}
                            className={`cursor-pointer ${colors.text} rounded-full border ${colors.border} py-2 flex items-center gap-2 justify-between px-6`}>
                            <IoCheckmark size={20} />
                            {t.known}
                        </button>
                    </div>
                    <div className={`w-full p-1 mt-1 max-h-[30%] min-h-[30%] px-4`}>
                        <div className={`${colors.backgroundSlate200} rounded-lg p-4 shadow-md border-dashed border-2 border-slate-300 h-full overflow-y-scroll`}>
                            {wordData?.MEANINGS && wordData?.MEANINGS.map((meaning, index) => (
                                <div key={index} className={`text-sm xl:text-lg ${colors.textSlate700} mb-3`}>
                                    <div className={`font-bold ${colors.textSlate800}`}>[{meaning[0]}]</div>
                                    <div className={``}>{meaning[1]}</div>
                                    <div className={`text-md italic mt-2 ${colors.textSlate800}`}>{meaning[2].join(", ")}</div>
                                </div>
                            ))}
                            <div className={`text-sm xl:text-lg font-bold ${colors.textSlate800}`}>[Synonyms]</div>
                            <div className={`text-sm xl:text-lg text-gray-700 mb-3 flex pt-1 flex flex-wrap gap-2`}>
                                {wordData?.SYNONYMS && wordData?.SYNONYMS.map((syn, index) => (
                                    <a href={"https://www.google.com/search?q=" + syn}
                                        className={`border rounded-lg ${colors.backgroundSlate300} ${colors.borderSlate800} ${colors.text70} text-sm px-2 w-max`} key={index}>{syn}</a>
                                ))}
                            </div>
                        </div>
                    </div>
                    <LearnMore key={'learn-more-component'} currentWord={currentWord} words={words} />
                </div>
            </div>
        </div>
    );
}