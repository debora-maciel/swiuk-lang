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
    <div className={`w-full max-w-full min-h-screen ${colors.backgroundLight} px-4 py-6 md:p-12 overflow-hidden`}>
      {/* Header Section */}
      <div className="mb-8 md:mb-12">
        <h1 className={`${colors.text90} font-bold mb-3 text-lg md:text-4xl`}>
          {t.welcome}
        </h1>
        <p className={`text-[15px] md:text-xl ${colors.text70} max-w-3xl`}>
          {t.description}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Words Card */}
        <div className={`${colors.background} ${colors.border10} ${colors.text} border rounded-xl lg:rounded-2xl p-6 lg:p-8 flex flex-col hover:shadow-lg transition-shadow`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} p-4 rounded-2xl`}>
              <TiSortAlphabeticallyOutline size={32} />
            </div>
            <div className="flex-1">
              <h3 className={`${colors.text} text-xl lg:text-2xl font-bold mb-1`}>{t.words.title}</h3>
            </div>
            <Popover content={<div className="max-w-xs">{t.words.popover}</div>} title={t.words.title}>
              <button className={`rounded-full border ${colors.border20} ${colors.text50} p-1`}>
                <IoIosInformation size={20} />
              </button>
            </Popover>
          </div>

          <p className={`${colors.text70} text-sm lg:text-base mb-6 flex-1`}>
            {t.words.desc}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <div className={`${colors.border20} flex border rounded-xl flex-col items-center justify-center px-4 py-3`}>
              <div className={`${colors.text60} text-xs font-bold mb-1`}>DE</div>
              <div className={`text-2xl ${colors.text} font-bold`}>{DEknownWords.length}</div>
            </div>
            <div className={`${colors.border20} flex border rounded-xl flex-col items-center justify-center px-4 py-3`}>
              <div className={`${colors.text60} text-xs font-bold mb-1`}>EN</div>
              <div className={`text-2xl ${colors.text} font-bold`}>{ENknownWords.length}</div>
            </div>
          </div>

          <Link href={'/words/'} className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-xl text-center text-base py-3 px-6 font-semibold hover:opacity-90 transition-opacity`}>
            {t.words.track}
          </Link>
        </div>

        {/* Game Card */}
        <div className={`${colors.background} ${colors.border10} ${colors.text} border rounded-xl lg:rounded-2xl p-6 lg:p-8 flex flex-col hover:shadow-lg transition-shadow`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} p-4 rounded-2xl`}>
              <IoGameController size={32} />
            </div>
            <div className="flex-1">
              <h3 className={`${colors.text} text-xl lg:text-2xl font-bold mb-1`}>{t.connect.title}</h3>
            </div>
            <Popover content={<div className="max-w-xs">{t.connect.popover}</div>} title={t.connect.title}>
              <button className={`rounded-full border ${colors.border20} ${colors.text50} p-1`}>
                <IoIosInformation size={20} />
              </button>
            </Popover>
          </div>

          <p className={`${colors.text70} text-sm lg:text-base mb-6 flex-1`}>
            {t.connect.desc}
          </p>

          <div className="mb-6">
            <div className={`${colors.border20} ${colors.text} flex items-center gap-2 border px-4 py-2 rounded-xl w-fit`}>
              <span className="text-sm">{t.connect.matchesLabel}</span>
              <span className={`${colors.text} font-bold text-lg`}>{matches.length}</span>
            </div>
          </div>

          <Link href={'/game/connect-words'} className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-xl text-center text-base py-3 px-6 font-semibold hover:opacity-90 transition-opacity`}>
            {t.connect.play}
          </Link>
        </div>

        {/* Translator Card */}
        <div className={`${colors.background} ${colors.border10} ${colors.text} border rounded-xl lg:rounded-2xl p-6 lg:p-8 flex flex-col hover:shadow-lg transition-shadow`}>
          <div className="flex items-center gap-4 mb-6">
            <div className={`${colors.textReverse} ${colors.backgroundReverse} p-4 rounded-2xl`}>
              <MdOutlineGTranslate size={32} />
            </div>
            <div className="flex-1">
              <h3 className={`${colors.text} text-xl lg:text-2xl font-bold mb-1`}>{t.translator.title}</h3>
            </div>
            <Popover content={<div className="max-w-xs">{t.translator.popover}</div>} title={t.translator.title}>
              <button className={`rounded-full border ${colors.border20} ${colors.text50} p-1`}>
                <IoIosInformation size={20} />
              </button>
            </Popover>
          </div>

          <p className={`${colors.text70} text-sm lg:text-base mb-6 flex-1`}>
            {t.translator.desc}
          </p>

          <div className="flex items-center gap-2 mb-6">
            <div className={`${colors.border20} ${colors.text60} rounded-xl border px-4 py-2 text-sm font-bold`}>DE</div>
            <div className={`${colors.border20} ${colors.text60} rounded-xl border px-4 py-2 text-sm font-bold`}>EN</div>
          </div>

          <Link href={'/translation'} className={`${colors.textReverse} ${colors.backgroundReverse} ${colors.border30} border rounded-xl text-center text-base py-3 px-6 font-semibold hover:opacity-90 transition-opacity`}>
            {t.translator.navBtn}
          </Link>
        </div>
      </div>
    </div>
  )
}
