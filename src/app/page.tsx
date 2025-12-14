"use client"
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { IoGameController } from "react-icons/io5";
import { BiConversation } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi2";
import { IoEarth, IoArrowForward, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FiAward } from "react-icons/fi";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useTheme } from "./core/context/theme/ThemeContext";
import { translations } from "./core/variables/translation";
import { useLanguage } from "./core/context/language/LanguageContext";
import { useUser } from "@/lib/supabase/hooks";
import { getWordCounts } from "@/lib/supabase/words";

const cefrLevels = [
  { level: 'A1', min: 0, max: 500, color: '#22c55e', description: { en: 'Beginner', de: 'Anfänger', fr: 'Débutant', pt: 'Iniciante' } },
  { level: 'A2', min: 500, max: 1000, color: '#84cc16', description: { en: 'Elementary', de: 'Grundlegend', fr: 'Élémentaire', pt: 'Elementar' } },
  { level: 'B1', min: 1000, max: 2000, color: '#eab308', description: { en: 'Intermediate', de: 'Mittelstufe', fr: 'Intermédiaire', pt: 'Intermediário' } },
  { level: 'B2', min: 2000, max: 4000, color: '#f97316', description: { en: 'Upper Intermediate', de: 'Obere Mittelstufe', fr: 'Intermédiaire Supérieur', pt: 'Intermediário Superior' } },
  { level: 'C1', min: 4000, max: 8000, color: '#ef4444', description: { en: 'Advanced', de: 'Fortgeschritten', fr: 'Avancé', pt: 'Avançado' } },
  { level: 'C2', min: 8000, max: 16000, color: '#a855f7', description: { en: 'Mastery', de: 'Meisterschaft', fr: 'Maîtrise', pt: 'Domínio' } },
];

const cefrTranslations = {
  en: { title: 'CEFR Level', wordsToNext: 'words to next level', words: 'words' },
  de: { title: 'CEFR-Niveau', wordsToNext: 'Wörter bis zum nächsten Level', words: 'Wörter' },
  fr: { title: 'Niveau CECR', wordsToNext: 'mots pour le niveau suivant', words: 'mots' },
  pt: { title: 'Nível CEFR', wordsToNext: 'palavras para o próximo nível', words: 'palavras' },
};

export default function Home() {
  const [DEknownWords, setDEKnownWords] = useState<number>(0);
  const [ENknownWords, setENKnownWords] = useState<number>(0);
  const [FRknownWords, setFRKnownWords] = useState<number>(0);
  const [matches, setMatches] = useState<string[]>([]);
  const [isLoadingCounts, setIsLoadingCounts] = useState(true);
  const [cefrExpanded, setCefrExpanded] = useState(false);
  const { language, targetLanguage } = useLanguage();
  const { colors } = useTheme();
  const { user, loading: authLoading } = useUser();

  const t = translations.home[language];

  const isGerman = targetLanguage === 'deutsch' || targetLanguage?.toLowerCase().includes('german') || targetLanguage?.toLowerCase().includes('deutsch');
  const isEnglish = targetLanguage === 'english' || targetLanguage?.toLowerCase().includes('english') || targetLanguage?.toLowerCase().includes('eng');
  const isFrench = targetLanguage === 'français' || targetLanguage?.toLowerCase().includes('french') || targetLanguage?.toLowerCase().includes('fran');

  // Show Connect Words only for German<->English combinations
  const showConnectGame = (isGerman && language === 'en') || (isEnglish && language === 'de');

  // Get word count for target language
  const targetLanguageWordCount = isGerman ? DEknownWords : isEnglish ? ENknownWords : isFrench ? FRknownWords : 0;
  const targetLanguageName = isGerman ? 'German' : isEnglish ? 'English' : isFrench ? 'French' : '';

  const getCurrentLevel = (wordCount: number) => {
    for (let i = cefrLevels.length - 1; i >= 0; i--) {
      if (wordCount >= cefrLevels[i].min) {
        return cefrLevels[i];
      }
    }
    return cefrLevels[0];
  };

  const getProgressToNextLevel = (wordCount: number) => {
    const current = getCurrentLevel(wordCount);
    if (current.level === 'C2') return 100;
    const progressInLevel = wordCount - current.min;
    const levelRange = current.max - current.min;
    return Math.min(Math.round((progressInLevel / levelRange) * 100), 100);
  };

  const cefrT = cefrTranslations[language];

  useEffect(() => {
    const matchesData = JSON.parse(localStorage.getItem("matches") || "[]");
    setMatches(matchesData);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    async function loadWordCounts() {
      setIsLoadingCounts(true);
      try {
        if (user) {
          const counts = await getWordCounts(user.id);
          setDEKnownWords(counts.german.known);
          setENKnownWords(counts.english.known);
          setFRKnownWords(counts.french.known);
        } else {
          setDEKnownWords(0);
          setENKnownWords(0);
          setFRKnownWords(0);
        }
      } finally {
        setIsLoadingCounts(false);
      }
    }

    loadWordCounts();
  }, [user, authLoading]);

  const totalWords = DEknownWords + ENknownWords + FRknownWords;

  return (
    <div className={`w-full max-w-full min-h-screen ${colors.backgroundLight} px-4 py-6 md:px-8 md:py-10 overflow-hidden`}>
      {/* Quick Stats Bar */}
      <div className={`${colors.background} ${colors.border10} border rounded-2xl p-4 md:p-6 mb-8 md:mb-10`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full overflow-hidden flex flex-col shadow-sm">
                <div className="flex-1 bg-black"></div>
                <div className="flex-1 bg-[#DD0000]"></div>
                <div className="flex-1 bg-[#FFCC00]"></div>
              </div>
              <div>
                <div className={`${colors.text50} text-xs uppercase tracking-wide`}>German</div>
                <div className={`${colors.text} text-xl md:text-2xl font-bold`}>
                  {isLoadingCounts ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} /> : DEknownWords}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-white relative shadow-sm">
                <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-[#CE1124] -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-[#CE1124] -translate-x-1/2"></div>
              </div>
              <div>
                <div className={`${colors.text50} text-xs uppercase tracking-wide`}>English</div>
                <div className={`${colors.text} text-xl md:text-2xl font-bold`}>
                  {isLoadingCounts ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} /> : ENknownWords}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full overflow-hidden flex shadow-sm">
                <div className="flex-1 bg-[#002395]"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-[#ED2939]"></div>
              </div>
              <div>
                <div className={`${colors.text50} text-xs uppercase tracking-wide`}>French</div>
                <div className={`${colors.text} text-xl md:text-2xl font-bold`}>
                  {isLoadingCounts ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} /> : FRknownWords}
                </div>
              </div>
            </div>
          </div>
          <div className={`${colors.border10} border-l pl-6 hidden md:block`}>
            <div className={`${colors.text50} text-xs uppercase tracking-wide`}>Total Words</div>
            <div className={`${colors.text} text-2xl font-bold`}>
              {isLoadingCounts ? <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} /> : totalWords}
            </div>
          </div>
        </div>
      </div>

      {/* CEFR Level Card */}
      {targetLanguageName && (
        <div className={`${colors.background} ${colors.border10} border rounded-2xl p-4 md:p-6 mb-8 md:mb-10`}>
          <div className="flex items-center gap-2 mb-4">
            <FiAward className={colors.text60} size={18} />
            <span className={`${colors.text60} text-sm font-medium`}>{cefrT.title} - {targetLanguageName}</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl md:text-2xl shrink-0"
              style={{ backgroundColor: getCurrentLevel(targetLanguageWordCount).color }}
            >
              {getCurrentLevel(targetLanguageWordCount).level}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className={`${colors.text} font-semibold text-base md:text-lg`}>
                    {getCurrentLevel(targetLanguageWordCount).description[language]}
                  </div>
                  <div className={`${colors.text60} text-xs md:text-sm`}>
                    {isLoadingCounts ? '...' : `${targetLanguageWordCount} ${cefrT.words}`}
                  </div>
                </div>
                {getCurrentLevel(targetLanguageWordCount).level !== 'C2' && (
                  <div className={`text-right ${colors.text60} text-xs md:text-sm hidden sm:block`}>
                    <div>{getCurrentLevel(targetLanguageWordCount).max - targetLanguageWordCount} {cefrT.wordsToNext}</div>
                    <div className="text-xs mt-0.5">→ {cefrLevels[cefrLevels.findIndex(l => l.level === getCurrentLevel(targetLanguageWordCount).level) + 1]?.level}</div>
                  </div>
                )}
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${getProgressToNextLevel(targetLanguageWordCount)}%`,
                    backgroundColor: getCurrentLevel(targetLanguageWordCount).color
                  }}
                />
              </div>
            </div>
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setCefrExpanded(!cefrExpanded)}
            className={`w-full mt-4 pt-4 border-t ${colors.border10} flex items-center justify-center gap-2 ${colors.text60} hover:${colors.text} transition-colors`}
          >
            <span className="text-sm">
              {cefrExpanded
                ? (language === 'en' ? 'Hide levels' : language === 'de' ? 'Stufen ausblenden' : language === 'fr' ? 'Masquer les niveaux' : 'Ocultar níveis')
                : (language === 'en' ? 'Show all levels' : language === 'de' ? 'Alle Stufen anzeigen' : language === 'fr' ? 'Afficher tous les niveaux' : 'Mostrar todos os níveis')
              }
            </span>
            {cefrExpanded ? <IoChevronUp size={16} /> : <IoChevronDown size={16} />}
          </button>

          {/* Expandable CEFR Levels Grid */}
          {cefrExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {cefrLevels.map((level) => {
                  const isCurrentLevel = getCurrentLevel(targetLanguageWordCount).level === level.level;
                  const isPassed = targetLanguageWordCount >= level.max;
                  return (
                    <div
                      key={level.level}
                      className={`rounded-xl p-3 text-center transition-all ${
                        isCurrentLevel
                          ? 'ring-2 ring-offset-2'
                          : isPassed
                            ? 'opacity-60'
                            : 'opacity-40'
                      }`}
                      style={{
                        backgroundColor: isCurrentLevel ? level.color + '20' : 'transparent',
                        borderColor: level.color,
                        // @ts-expect-error ringColor is valid
                        '--tw-ring-color': level.color,
                      }}
                    >
                      <div
                        className="font-bold text-lg mb-1"
                        style={{ color: level.color }}
                      >
                        {level.level}
                      </div>
                      <div className={`text-xs ${colors.text60}`}>
                        {level.min}-{level.max}
                      </div>
                      <div className={`text-xs ${colors.text50} mt-1`}>
                        {level.description[language]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
        {/* Words Card */}
        <Link href="/words" className={`group ${colors.background} ${colors.border10} border rounded-2xl p-6 flex flex-col hover:shadow-xl hover:border-transparent transition-all duration-300`}>
          <div className="flex items-start justify-between mb-5">
            <div className={`${colors.backgroundReverse} ${colors.textReverse} p-3 rounded-xl`}>
              <TiSortAlphabeticallyOutline size={24} />
            </div>
            <IoArrowForward className={`${colors.text50} group-hover:${colors.text} group-hover:translate-x-1 transition-all`} size={20} />
          </div>
          <h3 className={`${colors.text} text-lg font-bold mb-2`}>{t.words.title}</h3>
          <p className={`${colors.text50} text-sm leading-relaxed`}>
            {t.words.desc}
          </p>
        </Link>

        {/* Connect Game Card */}
        {showConnectGame && (
          <Link href="/game/connect-words" className={`group ${colors.background} ${colors.border10} border rounded-2xl p-6 flex flex-col hover:shadow-xl hover:border-transparent transition-all duration-300`}>
            <div className="flex items-start justify-between mb-5">
              <div className={`${colors.backgroundReverse} ${colors.textReverse} p-3 rounded-xl`}>
                <IoGameController size={24} />
              </div>
              <div className="flex items-center gap-2">
                <span className={`${colors.text50} text-xs`}>{matches.length} {t.connect.matchesLabel.replace(':', '')}</span>
                <IoArrowForward className={`${colors.text50} group-hover:${colors.text} group-hover:translate-x-1 transition-all`} size={20} />
              </div>
            </div>
            <h3 className={`${colors.text} text-lg font-bold mb-2`}>{t.connect.title}</h3>
            <p className={`${colors.text50} text-sm leading-relaxed`}>
              {t.connect.desc}
            </p>
          </Link>
        )}

        {/* Vocabulary Card */}
        <Link href="/vocabulary" className={`group ${colors.background} ${colors.border10} border rounded-2xl p-6 flex flex-col hover:shadow-xl hover:border-transparent transition-all duration-300`}>
          <div className="flex items-start justify-between mb-5">
            <div className={`${colors.backgroundReverse} ${colors.textReverse} p-3 rounded-xl`}>
              <BiConversation size={24} />
            </div>
            <IoArrowForward className={`${colors.text50} group-hover:${colors.text} group-hover:translate-x-1 transition-all`} size={20} />
          </div>
          <h3 className={`${colors.text} text-lg font-bold mb-2`}>{t.vocabulary.title}</h3>
          <p className={`${colors.text50} text-sm leading-relaxed mb-4`}>
            {t.vocabulary.desc}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className={`${colors.backgroundLight} ${colors.text60} rounded-full px-3 py-1 text-xs`}>Travel</span>
            <span className={`${colors.backgroundLight} ${colors.text60} rounded-full px-3 py-1 text-xs`}>Work</span>
            <span className={`${colors.backgroundLight} ${colors.text60} rounded-full px-3 py-1 text-xs`}>+6</span>
          </div>
        </Link>
      </div>

      {/* Languages Section */}
      <div>
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className={`${colors.text} font-bold text-xl md:text-2xl mb-1`}>
              {t.languagesSection.title}
            </h2>
            <p className={`${colors.text50} text-sm`}>
              {t.languagesSection.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* English */}
          <div className={`${colors.background} ${colors.border10} border rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-white relative shadow-sm">
                <div className="absolute top-1/2 left-0 right-0 h-[5px] bg-[#CE1124] -translate-y-1/2"></div>
                <div className="absolute left-1/2 top-0 bottom-0 w-[5px] bg-[#CE1124] -translate-x-1/2"></div>
              </div>
              <div>
                <h3 className={`${colors.text} text-lg font-bold`}>{t.languagesSection.english.name}</h3>
                <div className={`flex items-center gap-1.5 ${colors.text50}`}>
                  <HiUserGroup size={14} />
                  <span className="text-sm">{t.languagesSection.english.speakers}</span>
                </div>
              </div>
            </div>
            <p className={`${colors.text60} text-sm leading-relaxed mb-4`}>
              {t.languagesSection.english.description}
            </p>
            <div className={`flex items-start gap-2 ${colors.text50} text-xs`}>
              <IoEarth size={14} className="mt-0.5 shrink-0" />
              <span>{t.languagesSection.english.countries}</span>
            </div>
          </div>

          {/* German */}
          <div className={`${colors.background} ${colors.border10} border rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex flex-col shadow-sm">
                <div className="flex-1 bg-black"></div>
                <div className="flex-1 bg-[#DD0000]"></div>
                <div className="flex-1 bg-[#FFCC00]"></div>
              </div>
              <div>
                <h3 className={`${colors.text} text-lg font-bold`}>{t.languagesSection.german.name}</h3>
                <div className={`flex items-center gap-1.5 ${colors.text50}`}>
                  <HiUserGroup size={14} />
                  <span className="text-sm">{t.languagesSection.german.speakers}</span>
                </div>
              </div>
            </div>
            <p className={`${colors.text60} text-sm leading-relaxed mb-4`}>
              {t.languagesSection.german.description}
            </p>
            <div className={`flex items-start gap-2 ${colors.text50} text-xs`}>
              <IoEarth size={14} className="mt-0.5 shrink-0" />
              <span>{t.languagesSection.german.countries}</span>
            </div>
          </div>

          {/* French */}
          <div className={`${colors.background} ${colors.border10} border rounded-2xl p-5 md:p-6 hover:shadow-lg transition-all duration-300`}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex shadow-sm">
                <div className="flex-1 bg-[#002395]"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-[#ED2939]"></div>
              </div>
              <div>
                <h3 className={`${colors.text} text-lg font-bold`}>{t.languagesSection.french.name}</h3>
                <div className={`flex items-center gap-1.5 ${colors.text50}`}>
                  <HiUserGroup size={14} />
                  <span className="text-sm">{t.languagesSection.french.speakers}</span>
                </div>
              </div>
            </div>
            <p className={`${colors.text60} text-sm leading-relaxed mb-4`}>
              {t.languagesSection.french.description}
            </p>
            <div className={`flex items-start gap-2 ${colors.text50} text-xs`}>
              <IoEarth size={14} className="mt-0.5 shrink-0" />
              <span>{t.languagesSection.french.countries}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
