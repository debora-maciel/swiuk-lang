"use client";
import { useState, useEffect } from "react";
// import data from "./data/english.json";
import data from "./data/words.json";
import { FaCircleCheck } from "react-icons/fa6";
import mw from "../../../public/mw.png";
import dc from "../../../public/dictionarydotcom.png";
import { FcGoogle } from "react-icons/fc";
import { FaCircleXmark } from "react-icons/fa6";
import Image from "next/image";

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

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

export default function TranslatePage() {
    const [words, setWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<number>(0);
    const [correctWords, setCorrectWords] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        const shuffledWords = shuffleArray(Object.keys(data));
        setWords(shuffledWords);
    }, []);

    const wordData = getWordProps(data, words[currentWord]);

    console.log("Word Data:", wordData);

    const styleCorrect = isCorrect === null
        ? "text-orange-800 bg-orange-100 border-t-0 rounded-[20px] border-r-0 border-10 border-orange-800 max-w-max"
        : isCorrect === true
            ? "text-green-800 bg-green-100  transform transition duration-300 ease-in-out scale-110"
            : "text-red-800 border-red-300 ";

    const styleBorderCorrect = isCorrect === null
        ? "max-w-max"
        : isCorrect === true
            ? "translate-x-full opacity-0"
            : "-translate-x-full opacity-0";

    function handleCorrect() {
        setIsCorrect(true);

        setTimeout(() => {
            setIsCorrect(null);
            setCurrentWord((prev) => (prev + 1) % words.length);
            setCorrectWords((prev) => prev + 1);
        }, 1000);
    }

    function handleIncorrect() {
        setIsCorrect(false);

        setTimeout(() => {
            setIsCorrect(null);
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 1000);
    }

    if (words.length === 0) return null; // or loading state
    return (
        <div className="bg-orange-100 w-full h-full xl:rounded-lg flex items-center justify-center p-4">
            <div className="flex flex-col justify-start items-start w-full h-full">
                <div className="w-full h-1/3 flex items-center justify-end text-3xl xl:text-5xl font-bolder ">
                    <div className="bg-green-100 border border-b-5 border-l-5 border-r-0 text-green-900 montserrat-semibold rounded-lg p-1">{correctWords}</div>
                    <div className="bg-orange-50 border-t border-b-5 border border-l-0 text-orange-900 montserrat-bold rounded-lg p-1">{words.length}</div>
                </div>
                <div className="mx-auto flex items-end gap-1 w-full h-[20%] bg-white rounded-lg py-4 shadow-md">
                    <div className={styleBorderCorrect + " mx-auto py-3 p-4 rounded-xl transition-all duration-700 ease-in transform max-w-max"}>
                        <h1 className={styleCorrect + " rounded shadow-md text-xl xl:text-5xl font-bold px-10 py-4 capitalize"}>
                            {words[currentWord]}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-20 max-w-min mx-auto py-4">
                    <button onClick={handleIncorrect} className="cursor-pointer text-red-700 bg-white rounded-full text-[80px] xl:text-[110px]">
                        <FaCircleXmark />
                    </button>
                    <button onClick={handleCorrect} className="cursor-pointer text-green-700 text-[80px] xl:text-[110px]">
                        <FaCircleCheck />
                    </button>
                </div>
                <div className="w-full p-1 mt-4 h-full">
                    <div className="bg-orange-200/70 rounded-lg p-4 shadow-md border-dashed border-3 border-orange-300">
                        {wordData?.MEANINGS.map((meaning, index) => (
                            <div key={index} className="text-sm xl:text-lg text-orange-700 mb-3">
                                <div className="font-bold text-orange-800">[{meaning[0]}]</div>
                                <div className="">{meaning[1]}</div>
                                <div className="text-xs italic mt-2 text-orange-800">{meaning[2].join(", ")}</div>
                            </div>
                        ))}
                        <div className="text-sm xl:text-lg font-bold text-orange-800">[Synonyms]</div>
                        <div className="text-sm xl:text-lg text-gray-700 mb-3 flex pt-1 flex flex-wrap gap-2">
                            {wordData?.SYNONYMS.map((syn, index) => (
                                <div className="border rounded-lg bg-orange-300/30 text-red-800 text-xs border-orange-800/20 px-2 w-max" key={index}>{syn}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-xs w-2/3 mt-6 mb-2 font-bold text-red-900 pl-4">Tap to learn more.</div>
                <div className="w-full flex items-center justify-start gap-2 pl-4">
                    <a href={"https://www.google.com/search?q=" + words[currentWord]} target="_blank" rel="noopener noreferrer">
                        <button
                            className="cursor-pointer text-white rounded-full text-[25px]">
                            <FcGoogle />
                        </button>
                    </a>
                    <a href={"https://www.merriam-webster.com/dictionary/" + words[currentWord]} target="_blank" rel="noopener noreferrer">
                        <button className="cursor-pointer text-white rounded-full w-[30px]">
                            <Image className="rounded-full" alt="icon-m-w" src={mw} />
                        </button>
                    </a>
                    <a href={"https://www.dictionary.com/browse/" + words[currentWord]} target="_blank" rel="noopener noreferrer">
                        <button className="cursor-pointer text-white rounded-full w-[25px]">
                            <Image className="rounded-full" alt="icon-m-w" src={dc} />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}