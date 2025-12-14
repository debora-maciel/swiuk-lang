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
        const { known, unknown } = await getWordsByLanguage('french');
        setKnownWords(known);
        setUnknownWords(unknown);
    }

    useEffect(() => {
        if (user) {
            onLoad();
        }
    }, [user]);

    async function onRemoveKnownWord(word: string) {
        await saveWord(word, 'french', 'unknown');
        onLoad();
    }

    async function onAddKnownWord(word: string) {
        await saveWord(word, 'french', 'known');
        onLoad();
    }

    return (
        <div className="w-full py-2 flex flex-col min-h-screen">
            <HeaderBack link="/words/french" title="French" />
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
                            unknown="FRunknownWords"
                            key={'known french'}
                            title="Known Words"
                            known="FRknownWords"
                            data={knownWords}
                            onLoad={onLoad}
                            isKnown={true}
                            lang={"FR"}
                        />
                    )
                        :
                        (
                            <ListWordTable
                                onRemoveKnownWord={onRemoveKnownWord}
                                setSearchString={setSearchUnknown}
                                onAddKnownWord={onAddKnownWord}
                                searchString={searchUnknown}
                                key={'unknown french'}
                                unknown="FRunknownWords"
                                title="Unknown Words"
                                data={unknownWords}
                                known="FRknownWords"
                                onLoad={onLoad}
                                isKnown={false}
                                lang={"FR"}
                            />
                        )
                }
            </div>
        </div>
    )
}