"use client"
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { MdOutlineGTranslate } from "react-icons/md";
import { GrAnalytics } from "react-icons/gr";
import { IoGameController } from "react-icons/io5";
import { IoIosInformation } from "react-icons/io";
// import { useTheme } from "./core/theme/useTheme";
import { Popover } from 'antd';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useTheme } from "./core/theme/ThemeContext";

export default function Home() {
  const [DEknownWords, setDEKnownWords] = useState<string[]>([]);
  const [ENknownWords, setENKnownWords] = useState<string[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const { colors } = useTheme();

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

  const contentWords = (
    <div className="w-full pb-4">
      Track and manage your vocabulary. Mark words as “Known” or
      {'”'}Unknown{'”'} to monitor your progress and focus on what matters
      most. Use this section to build and review your personal word bank in German and English.
    </div>
  );

  const contentGame = (
    <div className="w-full pb-4">
      Match words with their correct translations or meanings.
      It’s a fun and interactive way to reinforce your memory, test your understanding,
      and learn faster through repetition and engagement.
    </div>
  );

  const contentTranslator = (
    <div className="w-full pb-4">
      Instantly translate words between German and English right inside the app. No need
      to open another tab or external service — just type a word and get its translation
      immediately.
    </div>
  );

  return (
    <div className={`w-full flex overflow-y-scroll pt-4 items-center pr-4 gap-4 ${colors.backgroundLight} pb-20`}>
      <div className={`flex flex-col flex h-min items-start justify-center`}>
        <Link href={"/dashboard"} className={`${colors.background} pt-4 pr-4 pb-4 border-b-0 flex items-end justify-center rounded-tr-4xl`}>
          <GrAnalytics size={30} className={`${colors.text70}`} />
        </Link>
        <div className={`${colors.background} pt-4 pr-4 pb-4 border-b-0 flex items-end justify-center`}>
          <GrAnalytics size={30} className={`${colors.text70}`} />
        </div>
        <div className={`${colors.background} pt-4 pr-4 pb-4 border-t-0 flex items-end justify-center rounded-br-4xl`}>
          <GrAnalytics size={30} className={`${colors.text70}`} />
        </div>
      </div>

      <div className={`${colors.background} flex items-center justify-center h-full p-3 gap-10 rounded-4xl flex-col`}>
        <div className="w-5/6 px-2 mx-auto">
          <h1 className={`${colors.text90} font-bold mb-2 text-lg`}>
            Welcome to Swiuk Lang
          </h1>
          <p className={`text-[15px] ${colors.text70}`}>
            An immersive environment to expand your German and English vocabulary through structured
            learning, interactive tools, and integrated translation features.
          </p>
        </div>

        <div className={`${colors.border10} ${colors.text} w-11/12 border rounded-xl py-2`}>
          <div className={`${colors.border10} pl-19 leading-3 font-bold text-md flex items-center justify-between w-full pr-2`}>
            <div className="">
              Words
            </div>
            <Popover content={contentWords} style={{ width: '50%' }} title="Connect Words">
              <button className={`rounded-full border ${colors.border20} ${colors.text50}`}>
                <IoIosInformation size={22} />
              </button>
            </Popover>
          </div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} ml-2 w-min p-2 rounded-full border ${colors.border20} `}>
              <TiSortAlphabeticallyOutline size={30} />
            </div>
            <p className={`${colors.text70} p-2 leading-5 text-sm`}>
              Register words you already know and discover new ones to grow your vocabulary in both German and English.
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
            <Link href={'/words/'}
              className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-full text-md py-2 px-4 font-[600]`}>
              Track
            </Link>
          </div>
        </div>

        <div className={`${colors.border10} ${colors.text} w-5/6 border rounded-xl py-3`}>
          <div className={`${colors.border10} pl-19 leading-3 font-bold text-md flex items-center justify-between w-full pr-2`}>
            <div className="">
              Connect Words
            </div>
            <Popover content={contentGame} style={{ width: '50%' }} title="Connect Words">
              <button className={`rounded-full border ${colors.border20} ${colors.text50}`}>
                <IoIosInformation size={22} />
              </button>
            </Popover>
          </div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} ml-2 w-min p-2 rounded-full border ${colors.border20} `}>
              <IoGameController size={30} />
            </div>
            <p className={`p-2 ${colors.text70} leading-5 text-sm`}>
              A fun matching game where you connect words with their correct translations or meanings to reinforce learning.
            </p>
          </div>
          <div className={`${colors.border10} ${colors.text50} flex items-center gap-2 justify-end pr-5 pt-4 border-t mt-1 rounded-r-xl`}>
            <div className={`${colors.border20} ${colors.text60} ml-10 rounded-full border p-2 text-xs font-bold`}>
              DE
            </div>
            <div className={`${colors.border20} ${colors.text60} rounded-full border p-2 text-xs font-bold`}>
              EN
            </div>
            <div className={"w-full flex items-start gap-4"}>
              <div className={`${colors.border20} ${colors.text} flex font-normal text-sm font-black gap-1 border px-2 rounded-full`}>
                Matches: <b className={colors.text60}>
                  {matches.length}
                </b>
              </div>
            </div>
            <Link href={'/game/connect-words'}
              className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-full text-md py-2 px-4 font-[600]`}>
              Play</Link>
          </div>
        </div>

        <div className={`${colors.border10} ${colors.text} w-5/6 border rounded-xl py-2`}>
          <div className={`${colors.border10} pl-19 leading-3 font-bold text-md flex items-center justify-between w-full pr-2`}>
            <div className="">
              Translator
            </div>
            <Popover content={contentTranslator} style={{ width: '50%' }} title="Connect Words">
              <button className={`${colors.border20} ${colors.text50} rounded-full border`}>
                <IoIosInformation size={22} />
              </button>
            </Popover></div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border20} w-min p-2 ml-2 rounded-full border`}>
              <MdOutlineGTranslate size={30} />
            </div>
            <p className={`${colors.text70} p-2 leading-5 text-sm`}>
              Instantly translate words without leaving the platform. No need to open another tab — everything you need is right here.
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