"use client";
import { useState, useEffect } from "react";
import data from "./data/words.json";
import { FaCircleCheck } from "react-icons/fa6";
import { GrStatusUnknown } from "react-icons/gr";
import mw from "../../../public/mw.png";
import dc from "../../../public/dictionarydotcom.png";
import { FcGoogle } from "react-icons/fc";
import { FaCircleXmark } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

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

export default function Words() {
    const [knownWords, setKnownWords] = useState<string[]>([]);
    const [unknownWords, setUnknownWords] = useState<string[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);


    useEffect(() => {
        const known = JSON.parse(localStorage.getItem("knownWords") || "[]");
        const notKnown = JSON.parse(localStorage.getItem("unknownWords") || "[]");

        setKnownWords(known);
        setUnknownWords(notKnown);
    }, []);

    useEffect(() => {
        const shuffledWords = shuffleArray(Object.keys(data));
        setWords(shuffledWords);
    }, []);

    const wordData = getWordProps(data, words[currentWord]);

    const styleCorrect = isCorrect === null
        ? "text-orange-800 bg-orange-100 border-t-0 rounded-[20px] border-r-0 border-10 border-orange-800 max-w-max"
        : isCorrect === true
            ? "text-green-800 bg-green-100 border-t-0 rounded-[20px] border-r-0 border-10 border-green-800 z-100 transition-all transition-discrete hidden"
            : "text-red-800 bg-red-100 rounded-[20px] border-t-0 border-r-0 border-10 border-red-800 z-100 transition-all transition-discrete hidden";

    const styleBorderCorrect = isCorrect === null
        ? "max-w-max"
        : isCorrect === true
            ? " transition-discrete transition-all"
            : " transition-discrete transition-all";

    function handleCorrect(word: string) {
        setIsCorrect(true);
        knownWords?.push(word);

        localStorage.setItem("knownWords", JSON.stringify(knownWords));

        console.log("knownWords", knownWords);

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
        <div className="w-full h-full xl:rounded-lg flex items-center justify-center p-4">
            <div className="flex flex-col justify-start items-start w-full h-full">
                <Link href={'/words/choose-language'} className="w-full h-[70px] flex items-center justify-end text-3xl xl:text-5xl font-bolder ">
                    <div className="bg-red-100 border border-b-5 border-l-5 border-r-0 text-red-900 montserrat-semibold rounded-lg p-1">{unknownWords.length}</div>
                    <div className="bg-green-100 border border-b-5 border-l-5 border-r-0 text-green-900 montserrat-semibold rounded-lg p-1 mr-4 border-r-1">{knownWords.length}</div>
                    <div className="bg-orange-50 border-t border-b-5 border border-l-5 text-orange-900 montserrat-bold rounded-lg p-1">{words.length}</div>
                </Link>
                <div className={`${isCorrect === null ? "bg-white" : isCorrect ? "bg-green-400" : "bg-red-400"}` + " mx-auto flex items-center gap-1 w-full h-[130px] rounded-lg shadow-md relative z-0"}>
                    <div className="text-orange-200/30 flex flex-wrap absolute w-full h-full z-0 overflow-hidden">
                        {[
                            "rotate-350 top-10 left-10 text-[100px] z-0",
                            "rotate-350 top-2 left-2 text-[20px] z-0 ",
                            "rotate-10 top-7 left-5 text-[20px] z-0",
                            "rotate-345 top-3 right-0 text-[40px] z-0",
                            "rotate-345 bottom-1 left-1 text-[20px] z-0",
                            "rotate-20 bottom-1 left-36 text-[40px] z-0",
                            "rotate-345 bottom-1 left-48 text-[20px] z-0",
                            "rotate-23 bottom-0 left-57 text-[50px] z-0",
                            "rotate-345 bottom-1 right-15 text-[15px] z-0",
                            "rotate-12 top-2 left-12 text-[30px] z-0 ",
                            "rotate-12 top-1 left-50 text-[30px] z-0 ",
                            "rotate-12 top-30 left-5 text-[30px] z-0 ",
                            "rotate-12 top-14 right-0 text-[30px] z-0 ",
                            "rotate-345 top-14 right-10 text-[25px] z-0 ",
                            "rotate-12 top-12 left-0 text-[30px] z-0 ",
                            "rotate-12 top-1 right-13 text-[45px] z-0",
                            "rotate-0 top-1 right-25 text-[20px] z-0",
                            "rotate-0 top-1 right-40 text-[20px] z-0",
                            "rotate-0 right-47 text-[40px] z-0",
                            "rotate-0 top-1 right-60 text-[20px] z-0",
                        ].map((_, index) => (
                            <div className={_ + " absolute"} key={index}>
                                <GrStatusUnknown />
                            </div>
                        ))
                        }
                    </div>
                    <div className={styleBorderCorrect + " mx-auto py-3 p-4 rounded-xl transition-all duration-50 ease-in transform max-w-max z-100"}>
                        <h1 className={styleCorrect + " rounded shadow-md text-xl xl:text-5xl font-bold px-10 py-4 capitalize"}>
                            {words[currentWord]}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-row justify-between gap-20 max-w-min mx-auto py-4">
                    <button onClick={() => handleIncorrect(words[currentWord])} className="cursor-pointer text-red-700 bg-white rounded-full text-[80px] xl:text-[110px]">
                        <FaCircleXmark />
                    </button>
                    <button onClick={() => handleCorrect(words[currentWord])} className="cursor-pointer text-green-700 text-[80px] xl:text-[110px]">
                        <FaCircleCheck />
                    </button>
                </div>
                <div className="w-full p-1 mt-1 max-h-[30%] min-h-[30%]">
                    <div className="bg-orange-200/70 rounded-lg p-4 shadow-md border-dashed border-3 border-orange-300 h-full overflow-y-scroll">
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
                                <a href={"https://www.google.com/search?q=" + syn} className="border rounded-lg bg-orange-300/30 text-red-800 text-xs border-orange-800/20 px-2 w-max" key={index}>{syn}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="text-xs w-2/3 mt-6 mb-2 font-bold text-red-900 pl-4">Tap to learn more.</div>
                <div className="w-full flex items-center justify-start gap-2 pl-4 ">
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