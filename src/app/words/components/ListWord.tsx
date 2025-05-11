import { IoIosAdd, IoIosRemove, IoIosSearch } from "react-icons/io";
import NewWord from "./NewWord";
import { useTheme } from "@/app/core/context/theme/ThemeContext";

interface IListWordTable {
    data: string[];
    title: string;
    isKnown: boolean;
    known: "knownWords" | "DEknownWords";
    unknown: "unknownWords" | "DEunknownWords";
    searchString: string;
    lang: "DE" | "EN"
    setSearchString: (val: string) => void;
    onLoad?: () => void;
    onRemoveKnownWord: (val: string) => void;
    onAddKnownWord: (val: string) => void;
}

export default function ListWordTable(props: IListWordTable) {
    const { colors } = useTheme();

    const { isKnown, data, searchString, title, known, unknown, setSearchString, onRemoveKnownWord, onAddKnownWord, lang, onLoad }
        = props;


    return (
        <div className={`${colors.background} border-separate rounded-l-lg border-spacing-2 border ${colors.border10}`}>
            <div className="w-full flex items-center px-4 pt-2">
                <div className={`ml-2 px-2 p-[2px] font-bold border-[1px] ${colors.border} ${colors.text} rounded-full`}>
                    {data.length}
                </div>
                <div className={`w-3/5 text-right font-bold ${colors.text}`}>
                    {title}
                </div>
                <div className="flex w-2/4 flex justify-end pr-1 text-sm">
                    <NewWord key={'knwn'} icon="small" lang={lang} known={known} unknown={unknown} onOk={onLoad} />
                </div>
            </div>
            <div className={`border ${colors.border20} ${colors.text} rounded-full flex items-center justify-start gap-2 py-2 mt-2 shadow-md mb-2 px-2 mx-4`}>
                <IoIosSearch />
                <input
                    value={searchString}
                    onChange={(evt) => setSearchString(evt.target.value)}
                    className={`${colors.text} text-sm font-light w-full focus:outline-none focus:ring-0`} placeholder="Search for a word" />
            </div>
            {data.length === 0 && (
                <div className={`w-full text-center text-sm p-4 ${colors.text}`}>
                    No known words was found
                </div>
            )}
            <div className={`w-full ${colors.backgroundLight} flex flex-col gap-3 overflow-y-scroll max-h-[400px] border-y py-2 ${colors.border10} px-6`}>
                {data.sort((a, b) => a.localeCompare(b)).filter((w) => w.toLowerCase().includes(searchString.toLowerCase()))
                    .map((w, i) => (
                        <div key={w + i} className={`${colors.background} border ${colors.text50} ${colors.border20} flex items-center justify-between rounded-full py-1 px-3 lowercase`}>
                            {w}
                            <div className="flex gap-2">
                                <a href={`https://www.google.com/search?q=${w.toLowerCase()}+meaning`} className={`border rounded-full ${colors.border10} ${colors.text60} p-1`}>
                                    <IoIosSearch />
                                </a>
                                {isKnown ?
                                    <div
                                        onClick={() => onRemoveKnownWord(w)}
                                        className={`border rounded-full ${colors.border10} ${colors.text60} p-1`}>
                                        <IoIosRemove />
                                    </div>
                                    :
                                    <div
                                        onClick={() => onAddKnownWord(w)}
                                        className={`border rounded-full ${colors.border10} ${colors.text60} p-1`}>
                                        <IoIosAdd />
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}