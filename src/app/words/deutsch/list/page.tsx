"use client";

import HeaderBack from "@/app/core/components/HeaderBack";
import { useTheme } from "@/app/core/context/theme/ThemeContext";
import { IoIosArrowRoundForward } from "react-icons/io";
import ListWordTable from "../../components/ListWord";
import { useState, useEffect } from "react";
import { useUser } from "@/lib/supabase/hooks";
import { getWordsByLanguage, saveWord } from "@/lib/supabase/words";

export default function ListWords() {
    const [knownWords, setKnownWords] = useState<string[]>([]);
    const [unknownWords, setUnknownWords] = useState<string[]>([]);
    const [searchUnknown, setSearchUnknown] = useState('');
    const [searchKnown, setSearchKnown] = useState('');
    const [viewKnown, setViewKnown] = useState(true);
    const { colors } = useTheme();
    const { user } = useUser();

    async function onLoad() {
        if (user) {
            const { known, unknown } = await getWordsByLanguage('german');
            setKnownWords(known);
            setUnknownWords(unknown);
        } else {
            const known = JSON.parse(localStorage.getItem("DEknownWords") || "[]");
            const notKnown = JSON.parse(localStorage.getItem("DEunknownWords") || "[]");
            setKnownWords(known);
            setUnknownWords(notKnown);
        }
    }

    useEffect(() => {
        onLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    function onRemoveKnownWord(word: string) {
        let notKnown = JSON.parse(localStorage.getItem("DEunknownWords") || "[]");
        if (!Array.isArray(notKnown)) notKnown = [];

        localStorage.setItem("DEknownWords", JSON.stringify(knownWords.filter((w) => w !== word)));
        localStorage.setItem("DEunknownWords", JSON.stringify([...notKnown, word]));
        saveWord(word, 'german', 'unknown');

        onLoad();
    }


    function onAddKnownWord(word: string) {
        let known = JSON.parse(localStorage.getItem("DEknownWords") || "[]");
        if (!Array.isArray(known)) known = [];

        localStorage.setItem("DEunknownWords", JSON.stringify(unknownWords.filter((w) => w !== word)));
        localStorage.setItem("DEknownWords", JSON.stringify([...known, word]));
        saveWord(word, 'german', 'known');

        onLoad();
    }

    return (
        <div className={`${colors.backgroundLight} min-h-screen w-full py-2 flex flex-col`}>
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
                    viewKnown ?
                        (
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