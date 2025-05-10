import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import mw from "../../../../../public/mw.png";
import dc from "../../../../../public/dictionarydotcom.png";
import { useTheme } from "@/app/core/context/theme/ThemeContext";

export default function LearnMore({ words, currentWord }: { words: string[], currentWord: number }) {
    const { colors } = useTheme();

    return (
        <>
            <div className={`text-sm w-2/3 mt-6 mb-2 font-bold pl-4 ${colors.textSlate800}`}>Search the word.</div>
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
        </>
    )
}