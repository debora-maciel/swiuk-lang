"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import NewWord from "../../components/NewWord";

export default function ListWords() {
    const [knownWords, setKnownWords] = useState<string[]>([]);
    const [unknownWords, setUnknownWords] = useState<string[]>([]);
    const [searchUnknown, setSearchUnknown] = useState('');
    const [searchKnown, setSearchKnown] = useState('');
    const [viewKnown, setViewKnown] = useState(true);

    function onLoad() {
        const known = JSON.parse(localStorage.getItem("DEknownWords") || "[]");
        const notKnown = JSON.parse(localStorage.getItem("DEunknownWords") || "[]");

        setKnownWords(known);
        setUnknownWords(notKnown);
    }

    useEffect(() => {
        onLoad();
    }, []);

    function onRemoveKnownWord(word: string) {
        let notKnown = JSON.parse(localStorage.getItem("DEunknownWords") || "[]");
        if (!Array.isArray(notKnown)) notKnown = [];

        localStorage.setItem("DEknownWords", JSON.stringify(knownWords.filter((w) => w !== word)));
        localStorage.setItem("DEunknownWords", JSON.stringify([...notKnown, word]));

        onLoad();
    }


    function onAddKnownWord(word: string) {
        let known = JSON.parse(localStorage.getItem("DEknownWords") || "[]");
        if (!Array.isArray(known)) known = [];

        localStorage.setItem("DEunknownWords", JSON.stringify(unknownWords.filter((w) => w !== word)));
        localStorage.setItem("DEknownWords", JSON.stringify([...known, word]));

        onLoad();
    }

    return (
        <div className="w-full py-2 flex flex-col">
            <div className="pl-5 text-xl pt-1 montserrat-black w-full text-left flex items-center justify-between px-4 mb-3">
                <Link href={'/words/deutsch'} className="text-black text-4xl">
                    <IoArrowBackCircle />
                </Link>
                <div>
                    Deutsch
                </div>
            </div>
            <div className="w-full min-h-max">
                <div onClick={() => setViewKnown(!viewKnown)} className="flex items-center pb-1 justify-end px-4 text-sm mb-2">
                    <span className="bg-black flex items-center rounded-full text-white px-2 py-[2px] text-sm">
                        {viewKnown ? 'Uknown' : 'Known'}
                        <span className="bg-white rounded-full text-black px-1 py-[2px] text-[10px] ml-2">
                            {viewKnown ? unknownWords.length : knownWords.length}
                        </span>
                    </span>

                    <IoIosArrowRoundForward size={15} />
                </div>
                {
                    viewKnown ? (
                        <div className="border-separate rounded-l-lg border-spacing-2 border border-black/10 dark:border-black/10">
                            <div className="w-full flex items-center px-4 pt-2">
                                <div className="ml-2 px-2 p-[2px] font-bold border-[1px] border-black rounded-full">
                                    {knownWords.length}
                                </div>
                                <div className="w-3/5 text-right font-bold">
                                    Known
                                </div>
                                <div className="flex w-2/4 flex justify-end pr-1 text-sm">
                                    <NewWord key={'knwn'} icon="small" lang="DE" known="DEknownWords" unknown="DEunknownWords" onOk={onLoad} />
                                </div>
                            </div>
                            <div className="border border-black/20 rounded-full flex items-center justify-start gap-2 py-2 mt-2 shadow-md mb-2 px-2 mx-4">
                                <IoIosSearch />
                                <input
                                    value={searchKnown}
                                    onChange={(evt) => setSearchKnown(evt.target.value)}
                                    className="text-sm font-light w-full focus:outline-none focus:ring-0" placeholder="Search for a word" />
                            </div>
                            {knownWords.length === 0 && (
                                <div className="w-full text-center text-sm">
                                    No known words was found
                                </div>
                            )}
                            <div className="w-full flex flex-col gap-3 overflow-y-scroll max-h-[400px] border-y py-2 border-black/10 px-6">
                                {knownWords.filter((w) => w.toLowerCase().includes(searchKnown.toLowerCase()))
                                    .map((w, i) => (
                                        <div key={w + i} className="border text-black/50 border-black/20 flex items-center justify-between rounded-full py-1 px-3 lowercase dark:border-black/20">
                                            {w}
                                            <div className="flex gap-2">
                                                <a href={`https://www.google.com/search?q=${w.toLowerCase()}+meaning`} className="border rounded-full border-black/10 text-black/60 p-1">
                                                    <IoIosSearch />
                                                </a>
                                                <div onClick={() => onRemoveKnownWord(w)} className="border rounded-full border-black/10 text-black/60 p-1">
                                                    <IoIosRemove />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )
                        :
                        (
                            <div className="border-separate rounded-l-lg border-spacing-2 border border-black/10 dark:border-black/10">
                                <div className="w-full flex items-center px-4 pt-2">
                                    <div className="ml-2 px-2 p-[2px] font-bold border-[1px] border-black rounded-full">
                                        {unknownWords.length}
                                    </div>
                                    <div className="w-3/5 text-right">
                                        Unknown
                                    </div>
                                    <div className="flex w-2/4 flex justify-end pr-1 text-sm">
                                        <NewWord key={'unkwde'} icon="small" lang="DE" known="DEknownWords" unknown="DEunknownWords" onOk={onLoad} />
                                    </div>
                                </div>
                                <div className="border border-black/20 rounded-full flex items-center justify-start gap-2 py-2 mt-2 shadow-md mb-2 px-2 mx-4">
                                    <IoIosSearch />
                                    <input
                                        value={searchUnknown}
                                        onChange={(evt) => setSearchUnknown(evt.target.value)}
                                        className="text-sm w-full font-light focus:outline-none focus:ring-0" placeholder="Search for a word" />
                                </div>
                                <div className="w-full flex flex-col gap-3 overflow-y-scroll max-h-[500px] border-y py-2 border-black/10 px-6">
                                    {unknownWords.filter((w) => w.toLowerCase().includes(searchUnknown.toLowerCase()))
                                        .map((w, i) => (
                                            <div key={w + i} className="border text-black/50 border-black/20 flex items-center justify-between rounded-full py-1 px-3 lowercase dark:border-black/20">
                                                {w}
                                                <div className="flex gap-2">
                                                    <a href={`https://www.google.com/search?q=${w.toLowerCase()}+meaning`} className="border rounded-full border-black/10 text-black/60 p-1">
                                                        <IoIosSearch />
                                                    </a>
                                                    <div onClick={() => onAddKnownWord(w)} className="border rounded-full border-black/10 text-black/60 p-1">
                                                        <IoIosAdd />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )
                }
            </div>
        </div >
    )
}