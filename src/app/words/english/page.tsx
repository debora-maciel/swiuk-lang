"use client";
import { useState, useEffect } from "react";
import data from "./../../data/words.json";
import { HiMiniXMark } from "react-icons/hi2";
import { IoCheckmark } from "react-icons/io5";
import LearnMore from "./components/LearnMore";
import { utils } from "../../../utils/utils";
import Link from "next/link";
import NewWord from "../components/NewWord";
import { useTheme } from "@/app/core/context/theme/ThemeContext";
import HeaderBack from "@/app/core/components/HeaderBack";

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
    const { colors } = useTheme();
    const [currentWord, setCurrentWord] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        const known = JSON.parse(localStorage.getItem("knownWords") || "[]");
        const notKnown = JSON.parse(localStorage.getItem("unknownWords") || "[]");

        setKnownWords(known);
        setUnknownWords(notKnown);
    }, []);

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
        knownWords?.push(word);

        localStorage.setItem("knownWords", JSON.stringify(knownWords));

        setTimeout(() => {
            setIsCorrect(null);
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 400);
    }

    function handleIncorrect(word: string) {
        setIsCorrect(false);
        unknownWords?.push(word);

        localStorage.setItem("unknownWords", JSON.stringify(unknownWords));

        setTimeout(() => {
            setIsCorrect(null);
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 200);
    }

    if (words.length === 0) return null;

    return (
        <div className={`min-h-screen flex flex-col items-center w-full ${colors.backgroundLight}`}>
            <HeaderBack link="/words/" title="English" />
            <div className={`w-full h-full xl:rounded-lg flex items-center justify-center`}>
                <div className={`flex flex-col justify-start items-start w-full h-full`}>
                    <div className={`flex items-center justify-end w-full px-4`}>
                        <Link href={'/words/english/list'} className={`w-full h-[70px] flex items-center justify-end xl:text-5xl font-bolder px-4`}>
                            <div className={`flex flex-col items-center justify-center border ${colors.border10} rounded-l-lg py-1 px-2`}>
                                <div className={`${colors.text60} text-xs`}>
                                    Unknown
                                </div>
                                <div className={`${colors.text60} text-xl`}>
                                    {unknownWords.length}
                                </div>
                            </div>
                            <div className={`flex flex-col items-center justify-center border ${colors.border10} border-x-0 py-1 px-2`}>
                                <div className={`text-xs ${colors.text80}`}>
                                    Known
                                </div>
                                <div className={`font-bold ${colors.text80} text-xl`}>
                                    {knownWords.length}
                                </div>
                            </div>
                            <div className={`flex flex-col items-center justify-center border  ${colors.border10} rounded-r-lg py-1 px-2`}>
                                <div className={`text-xs ${colors.text60}`}>All</div>
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
                    <div className={`flex flex-row justify-center gap-16 w-full mx-auto p-4`}>
                        <button onClick={() => handleIncorrect(words[currentWord])}
                            className={`cursor-pointer ${colors.text60} rounded-full border ${colors.border20} py-2 flex items-center gap-2 justify-between px-6`}>
                            <HiMiniXMark size={20} />
                            Unknown
                        </button>
                        <button onClick={() => handleCorrect(words[currentWord])}
                            className={`cursor-pointer ${colors.text} rounded-full border ${colors.border} py-2 flex items-center gap-2 justify-between px-6`}>
                            <IoCheckmark size={20} />
                            Known
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