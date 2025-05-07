"use client";

import HeaderBack from "@/app/core/components/HeaderBack";
import { useTheme } from "@/app/core/theme/ThemeContext";
import { IoIosArrowRoundForward } from "react-icons/io";
import ListWordTable from "../../components/ListWord";
import { useState, useEffect } from "react";

export default function ListWords() {
    const [knownWords, setKnownWords] = useState<string[]>([]);
    const [unknownWords, setUnknownWords] = useState<string[]>([]);
    const [searchUnknown, setSearchUnknown] = useState('');
    const [searchKnown, setSearchKnown] = useState('');
    const [viewKnown, setViewKnown] = useState(true);
    const { colors } = useTheme();

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
            <HeaderBack link="/words/deutsch" title="Deutsch" />
            <div className="w-full min-h-max">
                <div onClick={() => setViewKnown(!viewKnown)} className="flex items-center pb-1 justify-end px-4 text-sm mb-2">
                    <span className={`${colors.textReverse} ${colors.backgroundReverse} flex items-center rounded-full px-2 py-[2px] text-sm`}>
                        {viewKnown ? 'Uknown' : 'Known'}
                        <span className={`${colors.text} ${colors.background} rounded-full text-black px-1 py-[2px] text-[10px] ml-2`}>
                            {viewKnown ? unknownWords.length : knownWords.length}
                        </span>
                    </span>
                    <div className={`${colors.text} `}>
                        <IoIosArrowRoundForward size={15} />
                    </div>
                </div>
                {
                    viewKnown ? (
                        <ListWordTable key={'known deutsch'}
                            data={knownWords}
                            title="Known Words"
                            known="DEknownWords"
                            unknown="DEunknownWords"
                            lang={"DE"}
                            onLoad={onLoad}
                            searchString={searchKnown}
                            setSearchString={setSearchKnown}
                            onAddKnownWord={onAddKnownWord}
                            onRemoveKnownWord={onRemoveKnownWord}
                            isKnown={true}
                        />
                    )
                        :
                        (
                            <ListWordTable
                                key={'unknown deutsch'}
                                data={unknownWords}
                                title="Unknown Words"
                                known="DEknownWords"
                                unknown="DEunknownWords"
                                lang={"DE"}
                                onLoad={onLoad}
                                searchString={searchUnknown}
                                setSearchString={setSearchUnknown}
                                onAddKnownWord={onAddKnownWord}
                                onRemoveKnownWord={onRemoveKnownWord}
                                isKnown={false}
                            />
                        )
                }
            </div>
        </div>
    )
}