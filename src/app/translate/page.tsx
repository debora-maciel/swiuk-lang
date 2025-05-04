"use client";
import { useState, useEffect } from "react";
import data from "./data/english.json";
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

export default function TranslatePage() {
    const [words, setWords] = useState<string[]>([]);
    const [currentWord, setCurrentWord] = useState<number>(0);
    const [correctWords, setCorrectWords] = useState<number>(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    useEffect(() => {
        const shuffledWords = shuffleArray(Object.keys(data));
        setWords(shuffledWords);
    }, []);

    const styleCorrect = isCorrect === null
        ? "text-orange-800 bg-orange-100 border-6 border-orange-300 "
        : isCorrect === true
            ? "text-green-800 bg-green-100 border-6 border-green-300 transform transition duration-300 ease-in-out scale-110"
            : "text-red-800 bg-red-100 border-6 border-red-300 ";

    const styleBorderCorrect = isCorrect === null
        ? "bg-orange-400"
        : isCorrect === true
            ? "bg-green-400 translate-x-full opacity-0"
            : "bg-red-400 -translate-x-full opacity-0";

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
        <div className="bg-orange-800 w-full h-full xl:rounded-lg flex items-center justify-center p-4">
            <div className="flex flex-col justify-start items-start w-full h-full">
                <div className="w-full h-1/3 flex items-center justify-end gap-1 text-3xl xl:text-5xl font-bolder ">
                    <div className="bg-green-100 text-green-900 montserrat-semibold rounded-full px-3">{correctWords}</div>
                    <b className="text-white font-bold pl-2">
                        /
                    </b>
                    <div className="text-white px-2 montserrat-bold">{words.length}</div>
                </div>
                <div className="mx-auto flex items-end gap-1 max-w-max">
                    <div className={styleBorderCorrect + " mx-auto py-3 p-4 rounded-xl transition-all duration-700 ease-in transform max-w-max"}>
                        <h1 className={styleCorrect + " rounded shadow-md text-3xl xl:text-5xl font-bold px-10 py-4 capitalize"}>
                            {words[currentWord]}
                        </h1>
                    </div>
                    <div className="h-full w-full flex flex-col items-center justify-center gap-2 px-2">
                        <a href={"https://www.google.com/search?q=" + words[currentWord]} target="_blank" rel="noopener noreferrer">
                            <button className="cursor-pointer text-white rounded-full text-[23px]">
                                <FcGoogle />
                            </button>
                        </a>
                        <a href={"https://www.merriam-webster.com/dictionary/" + words[currentWord]} target="_blank" rel="noopener noreferrer">
                            <button className="cursor-pointer text-white rounded-full w-[23px]">
                                <Image className="rounded-full" alt="icon-m-w" src={mw} />
                            </button>
                        </a>
                        <a href={"https://www.dictionary.com/browse/" + words[currentWord]} target="_blank" rel="noopener noreferrer">
                            <button className="cursor-pointer text-white rounded-full w-[23px]">
                                <Image className="rounded-full" alt="icon-m-w" src={dc} />
                            </button>
                        </a>

                    </div>
                </div>
                <div className="flex flex-row justify-between gap-20 max-w-min mx-auto py-4 mt-8">
                    <button onClick={handleIncorrect} className="cursor-pointer text-red-700 bg-white rounded-full border-4 border-red-500 text-[80px] xl:text-[110px]">
                        <FaCircleXmark/>
                    </button>
                    <button onClick={handleCorrect} className="cursor-pointer text-green-700 bg-white rounded-full border-4 border-green-500 text-[80px] xl:text-[110px]">
                        <FaCircleCheck/>
                    </button>
                </div>
            </div>
        </div>
    );
}