"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import NewWord from "../../components/NewWord";
import ListWordTable from "../../components/ListWord";

export default function ListWords() {
    const [knownWords, setKnownWords] = useState<string[]>([]);
    const [unknownWords, setUnknownWords] = useState<string[]>([]);
    const [searchUnknown, setSearchUnknown] = useState('');
    const [searchKnown, setSearchKnown] = useState('');
    const [viewKnown, setViewKnown] = useState(true);

    function onLoad() {
        const known = JSON.parse(localStorage.getItem("knownWords") || "[]");
        const notKnown = JSON.parse(localStorage.getItem("unknownWords") || "[]");

        setKnownWords(known);
        setUnknownWords(notKnown);
    }

    useEffect(() => {
        onLoad();
    }, []);

    function onRemoveKnownWord(word: string) {
        let notKnown = JSON.parse(localStorage.getItem("unknownWords") || "[]");
        if (!Array.isArray(notKnown)) notKnown = [];

        localStorage.setItem("knownWords", JSON.stringify(knownWords.filter((w) => w !== word)));
        localStorage.setItem("unknownWords", JSON.stringify([...notKnown, word]));

        onLoad();
    }


    function onAddKnownWord(word: string) {
        let known = JSON.parse(localStorage.getItem("knownWords") || "[]");
        if (!Array.isArray(known)) known = [];

        localStorage.setItem("unknownWords", JSON.stringify(unknownWords.filter((w) => w !== word)));
        localStorage.setItem("knownWords", JSON.stringify([...known, word]));

        onLoad();
    }

    function onAddNewWord(word: string) {

    }

    return (
        <div className="w-full py-2 flex flex-col">
            <div className="pl-5 text-xl pt-1 montserrat-black w-full text-left flex items-center justify-between px-4 mb-3">
                <Link href={'/words/english'} className="text-black text-4xl">
                    <IoArrowBackCircle />
                </Link>
                <div>
                    English
                </div>
            </div>
            <div className="contents w-4/6">
                <div onClick={() => setViewKnown(!viewKnown)} className="flex items-center pb-1 justify-end px-4 text-sm">
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
                        <ListWordTable
                            onRemoveKnownWord={onRemoveKnownWord}
                            setSearchString={setSearchKnown}
                            onAddKnownWord={onAddKnownWord}
                            searchString={searchKnown}
                            unknown="unknownWords"
                            key={'known english'}
                            title="Known Words"
                            known="knownWords"
                            data={knownWords}
                            onLoad={onLoad}
                            isKnown={true}
                            lang={"EN"}
                        />
                    )
                        :
                        (
                            <ListWordTable
                                onRemoveKnownWord={onRemoveKnownWord}
                                setSearchString={setSearchUnknown}
                                onAddKnownWord={onAddKnownWord}
                                searchString={searchUnknown}
                                key={'unknown deutsch'}
                                unknown="unknownWords"
                                title="Unknown Words"
                                data={unknownWords}
                                known="knownWords"
                                onLoad={onLoad}
                                isKnown={false}
                                lang={"EN"}
                            />
                        )
                }
            </div>
        </div>
    )
}