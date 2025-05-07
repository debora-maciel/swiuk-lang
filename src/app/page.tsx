"use client"
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { MdOutlineGTranslate } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { IoIosInformation } from "react-icons/io";
import { colors } from "./core/variables/colors";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default function Home() {
  const [DEknownWords, setDEKnownWords] = useState<string[]>([]);
  const [ENknownWords, setENKnownWords] = useState<string[]>([]);
  const [matches, setMatches] = useState<string[]>([]);

  useEffect(() => {
    const DEknown = JSON.parse(localStorage.getItem("DEknownWords") || "[]");
    const ENknown = JSON.parse(localStorage.getItem("knownWords") || "[]");
    const matchesData = JSON.parse(localStorage.getItem("matches") || "[]");

    setMatches(matchesData);
    setDEKnownWords(DEknown);
    setENKnownWords(ENknown);

    // getWords();
  }, []);

  // async function getWords() {
  //   await fetch("https://raw.githubusercontent.com/debora-maciel/dictionaryswiuk/main/words.json")
  //     .then(res => res.json())
  //     .then(json => {
  //       console.log(json);
  //     });
  // }

  return (
    <div className="w-full overflow-y-scroll pt-4 pb-10">
      <div className="flex items-center justify-center h-full gap-10 xl:gap-20 xl:flex-row flex-col">
        <div className="w-5/6 px-4 mx-auto">
          <h1 className={`${colors.text90} font-bold mb-2 text-lg `}>
            Welcome to Swiuk Lang
          </h1>
          <p className={`text-[15px] ${colors.text70}`}>
            An immersive environment to expand your German and English vocabulary through structured
            learning, interactive tools, and integrated translation features.
          </p>
        </div>

        <div className={`${colors.border10} ${colors.text} w-5/6 border rounded py-3`}>
          <div className="pl-19 leading-3 font-bold text-md">Words</div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.text} ${colors.border20} ml-2 w-min p-2 rounded-full border`}>
              <TiSortAlphabeticallyOutline size={30} />
            </div>
            <p className={`${colors.text70} p-2 leading-5 text-sm`}>
              Here you can have register words that you already know and also learn new ones if you do not know them yet.
            </p>
          </div>
          <div className={`${colors.border10} ${colors.text50} flex items-center gap-2 justify-end pr-5 pt-4 border-t mt-1 rounded-r-xl`}>
            <div className="w-full flex items-start gap-4 pl-10">
              <div className={`${colors.border20} flex border rounded-t-full flex-col items-center justify-center text-sm font-black w-[40px] gap-1`}>
                <div className={`border-b ${colors.border20} ${colors.text60} py-2 text-xs font-bold`}>
                  DE
                </div>
                <div className={`text-md ${colors.text60} font-[900]`}>
                  {DEknownWords.length}
                </div>
              </div>
              <div className={`${colors.border20} flex border rounded-t-full flex-col items-center justify-center text-sm font-black w-[40px] gap-1`}>
                <div className={`border-b ${colors.border20} ${colors.text60} py-2 text-xs font-bold`}>
                  EN
                </div>
                <div className={`text-md ${colors.text60} font-[900]`}>
                  {ENknownWords.length}
                </div>
              </div>
            </div>
            <button className={`${colors.text50} ${colors.border20} rounded-full border`}>
              <IoIosInformation size={40} />
            </button>
            <Link href={'/words/'}
              className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-full text-md py-2 px-4 font-[600]`}>
              Continue
            </Link>
          </div>
        </div>

        <div className={`${colors.border10} ${colors.text} w-5/6 border rounded py-3`}>
          <div className="pl-19 leading-3 font-bold text-md">Connect Words</div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.text} ml-2 w-min p-2 rounded-full border ${colors.border20} `}>
              <IoGameController size={30} />
            </div>
            <p className={`p-2 ${colors.text70} leading-5 text-sm`}>
              Game to connect words and it{"'"}s translation/meaning.
            </p>
          </div>
          <div className={`${colors.border10} ${colors.text50} flex items-center gap-2 justify-end pr-5 pt-4 border-t mt-1 rounded-r-xl`}>
            <div className="w-full flex items-start gap-4 pl-10">
              <div className={`${colors.border20} ${colors.text} flex font-normal text-sm font-black gap-1 border px-2 rounded-full`}>
                Matches: <b className="text-black/60 dark:text-white/80">
                  {matches.length}
                </b>
              </div>
            </div>
            <button className={`rounded-full border ${colors.border20} ${colors.text50}`}>
              <IoIosInformation size={40} />
            </button>
            <Link href={'/game/connect-words'}
              className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-full text-md py-2 px-4 font-[600]`}>
              Play</Link>
          </div>
        </div>

        <div className={`${colors.border10} ${colors.text} w-5/6 border rounded py-3`}>
          <div className="pl-19 leading-3 font-bold text-md">Translator</div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.text} ${colors.border20} w-min p-2 ml-2 rounded-full border`}>
              <MdOutlineGTranslate size={30} />
            </div>
            <p className={`${colors.text70} p-2 leading-5 text-sm`}>
              No need to get out of the platform to translate a word. Why navigate to the internet if you can translate a word right here?
            </p>
          </div>
          <div className={`${colors.border10} flex gap-2 items-center justify-end pr-5 pt-4 border-t mt-1 rounded-r-xl`}>
            <div className="w-full flex items-center gap-1 pl-10">
              <div className={`${colors.border20} ${colors.text60} rounded-full border p-2 text-sm font-bold`}>
                DE
              </div>
              <div className={`${colors.border20} ${colors.text60} rounded-full border p-2 text-sm font-bold`}>
                EN
              </div>
            </div>
            <button className={`${colors.border20} ${colors.text50} rounded-full border`}>
              <IoIosInformation size={40} />
            </button>
            <Link href={'/translation'}
              className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-full text-md py-2 px-4 font-[600]`}>
              Navigate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}