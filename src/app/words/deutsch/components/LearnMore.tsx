import { FcGoogle } from "react-icons/fc";

export default function LearnMore({words, currentWord} : {words: string[], currentWord: number}) {
    return (
        <>
            <div className="text-sm w-2/3 mt-6 mb-2 font-bold text-slate-900/70 pl-4 text-black/60">Search the word.</div>
            <div className="w-full flex items-center justify-start gap-2 pl-4 ">
                <a href={"https://www.google.com/search?q=" + words[currentWord] + "+translation"} target="_blank" rel="noopener noreferrer">
                    <button
                        className="cursor-pointer text-white rounded-full text-[25px]">
                        <FcGoogle />
                    </button>
                </a>
            </div>
        </>
    )
}