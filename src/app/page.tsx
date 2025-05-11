"use client"
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { MdOutlineGTranslate } from "react-icons/md";
import { IoGameController } from "react-icons/io5";
import { IoIosInformation } from "react-icons/io";
import { Popover } from 'antd';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useTheme } from "./core/context/theme/ThemeContext";
import { translations } from "./core/variables/translation";
import { useLanguage } from "./core/context/language/LanguageContext";

export default function Home() {
  const [DEknownWords, setDEKnownWords] = useState<string[]>([]);
  const [ENknownWords, setENKnownWords] = useState<string[]>([]);
  const [matches, setMatches] = useState<string[]>([]);
  const { language } = useLanguage();
  const { colors } = useTheme();

  const t = translations.home[language];

  useEffect(() => {
    const DEknown = JSON.parse(localStorage.getItem("DEknownWords") || "[]");
    const ENknown = JSON.parse(localStorage.getItem("knownWords") || "[]");
    const matchesData = JSON.parse(localStorage.getItem("matches") || "[]");

    setMatches(matchesData);
    setDEKnownWords(DEknown);
    setENKnownWords(ENknown);
  }, []);

  return (
    <div className={`w-full flex overflow-y-scroll px-4 pt-4 items-start gap-4 ${colors.backgroundLight} pb-20`}>
      <div className={`${colors.background} w-full flex items-center justify-center h-full pb-10 p-3 gap-10 rounded-4xl flex-col`}>
        <div className="w-5/6 px-2 mx-auto">
          <h1 className={`${colors.text90} font-bold mb-2 text-lg`}>
            {t.welcome}
          </h1>
          <p className={`text-[15px] ${colors.text70}`}>
            {t.description}
          </p>
        </div>

        <div className={`${colors.border10} ${colors.text} w-11/12 border rounded-xl py-2`}>
          <div className={`${colors.border10} pl-19 leading-3 font-bold text-md flex items-center justify-between w-full pr-2`}>
            <div>{t.words.title}</div>
            <Popover content={<div className="w-full pb-4">{t.words.popover}</div>} title={t.words.title}>
              <button className={`rounded-full border ${colors.border20} ${colors.text50}`}>
                <IoIosInformation size={22} />
              </button>
            </Popover>
          </div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} ml-2 w-min p-2 rounded-full border ${colors.border20}`}>
              <TiSortAlphabeticallyOutline size={30} />
            </div>
            <p className={`${colors.text70} p-2 leading-5 text-sm`}>
              {t.words.desc}
            </p>
          </div>
          <div className={`${colors.border10} ${colors.text50} flex items-center gap-2 justify-end pr-5 pt-4 border-t mt-1 rounded-r-xl`}>
            <div className="w-full flex items-start gap-4 pl-10">
              <div className={`${colors.border20} flex border rounded-t-full flex-col items-center justify-center text-sm font-black w-[40px] gap-1`}>
                <div className={`border-b ${colors.border20} ${colors.text60} py-2 text-xs font-bold`}>DE</div>
                <div className={`text-md ${colors.text60} font-[900]`}>{DEknownWords.length}</div>
              </div>
              <div className={`${colors.border20} flex border rounded-t-full flex-col items-center justify-center text-sm font-black w-[40px] gap-1`}>
                <div className={`border-b ${colors.border20} ${colors.text60} py-2 text-xs font-bold`}>EN</div>
                <div className={`text-md ${colors.text60} font-[900]`}>{ENknownWords.length}</div>
              </div>
            </div>
            <Link href={'/words/'} className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-full text-md py-2 px-4 font-[600]`}>
              {t.words.track}
            </Link>
          </div>
        </div>

        {/* Game Box */}
        <div className={`${colors.border10} ${colors.text} w-11/12 border rounded-xl py-3`}>
          <div className={`${colors.border10} pl-19 leading-3 font-bold text-md flex items-center justify-between w-full pr-2`}>
            <div>{t.connect.title}</div>
            <Popover content={<div className="w-full pb-4">{t.connect.popover}</div>} title={t.connect.title}>
              <button className={`rounded-full border ${colors.border20} ${colors.text50}`}>
                <IoIosInformation size={22} />
              </button>
            </Popover>
          </div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} ml-2 w-min p-2 rounded-full border ${colors.border20}`}>
              <IoGameController size={30} />
            </div>
            <p className={`p-2 ${colors.text70} leading-5 text-sm`}>
              {t.connect.desc}
            </p>
          </div>
          <div className={`${colors.border10} ${colors.text50} flex items-center gap-2 justify-end pr-5 pt-4 border-t mt-1 rounded-r-xl`}>
            <div className={"w-full flex items-start gap-4 pl-3"}>
              <div className={`${colors.border20} ${colors.text} flex font-normal text-sm font-black gap-1 border px-2 rounded-full`}>
                {t.connect.matchesLabel} <b className={colors.text60}>{matches.length}</b>
              </div>
            </div>
            <Link href={'/game/connect-words'} className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-full text-md py-2 px-4 font-[600]`}>
              {t.connect.play}
            </Link>
          </div>
        </div>

        {/* Translator Box */}
        <div className={`${colors.border10} ${colors.text} w-11/12 border rounded-xl py-2`}>
          <div className={`${colors.border10} pl-19 leading-3 font-bold text-md flex items-center justify-between w-full pr-2`}>
            <div>{t.translator.title}</div>
            <Popover content={<div className="w-full pb-4">{t.translator.popover}</div>} title={t.translator.title}>
              <button className={`${colors.border20} ${colors.text50} rounded-full border`}>
                <IoIosInformation size={22} />
              </button>
            </Popover>
          </div>
          <div className="flex items-start pr-3 gap-3">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border20} w-min p-2 ml-2 rounded-full border`}>
              <MdOutlineGTranslate size={30} />
            </div>
            <p className={`${colors.text70} p-2 leading-5 text-sm`}>
              {t.translator.desc}
            </p>
          </div>
          <div className={`${colors.border10} flex gap-2 items-center justify-end pr-5 pt-4 border-t mt-1 rounded-r-xl`}>
            <div className="w-full flex items-center gap-1 pl-10">
              <div className={`${colors.border20} ${colors.text60} rounded-full border p-2 text-sm font-bold`}>DE</div>
              <div className={`${colors.border20} ${colors.text60} rounded-full border p-2 text-sm font-bold`}>EN</div>
            </div>
            <Link href={'/translation'} className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-full text-md py-2 px-4 font-[600]`}>
              {t.translator.navBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
