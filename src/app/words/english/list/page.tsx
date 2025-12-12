"use client";

import { useState, useEffect } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import ListWordTable from "../../components/ListWord";
import HeaderBack from "@/app/core/components/HeaderBack";
import { useTheme } from "@/app/core/context/theme/ThemeContext";
import { useUser } from "@/lib/supabase/hooks";
import { getWordsByLanguage, saveWord } from "@/lib/supabase/words";

export default function ListWords() {
    const [knownWords, setKnownWords] = useState<string[]>([]);
    const [unknownWords, setUnknownWords] = useState<string[]>([]);
    const [searchUnknown, setSearchUnknown] = useState('');
    const { colors } = useTheme();
    const [searchKnown, setSearchKnown] = useState('');
    const [viewKnown, setViewKnown] = useState(true);
    const { user } = useUser();

    async function onLoad() {
        if (user) {
            const { known, unknown } = await getWordsByLanguage('english');
            setKnownWords(known);
            setUnknownWords(unknown);
        } else {
            const known = JSON.parse(localStorage.getItem("knownWords") || "[]");
            const notKnown = JSON.parse(localStorage.getItem("unknownWords") || "[]");
            setKnownWords(known);
            setUnknownWords(notKnown);
        }
    }

    useEffect(() => {
        onLoad();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    function onRemoveKnownWord(word: string) {
        let notKnown = JSON.parse(localStorage.getItem("unknownWords") || "[]");
        if (!Array.isArray(notKnown)) notKnown = [];

        localStorage.setItem("knownWords", JSON.stringify(knownWords.filter((w) => w !== word)));
        localStorage.setItem("unknownWords", JSON.stringify([...notKnown, word]));
        saveWord(word, 'english', 'unknown');

        onLoad();
    }

    function onAddKnownWord(word: string) {
        let known = JSON.parse(localStorage.getItem("knownWords") || "[]");
        if (!Array.isArray(known)) known = [];

        localStorage.setItem("unknownWords", JSON.stringify(unknownWords.filter((w) => w !== word)));
        localStorage.setItem("knownWords", JSON.stringify([...known, word]));
        saveWord(word, 'english', 'known');

        onLoad();
    }

    return (
        <div className={`${colors.backgroundLight} w-full py-2 flex flex-col min-h-screen`}>
            <HeaderBack link="/words/english" title="English" />
            <div className="contents w-4/6">
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
                                key={'unknown english'}
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