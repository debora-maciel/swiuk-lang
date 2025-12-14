"use client"

import { useTheme } from "@/app/core/context/theme/ThemeContext";
import { useLanguage } from "@/app/core/context/language/LanguageContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";
import { MdFlight, MdWork, MdRestaurant, MdShoppingCart, MdLocalHospital, MdSchool, MdNumbers, MdQuestionMark } from "react-icons/md";
import { HiSpeakerWave } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { Dropdown } from "antd";
import { topicData, vocabularyTranslations, speedLabels, topics } from "@/app/core/variables/vocabulary";

const topicIcons: Record<string, React.ReactNode> = {
  travel: <MdFlight size={24} />,
  work: <MdWork size={24} />,
  restaurant: <MdRestaurant size={24} />,
  shopping: <MdShoppingCart size={24} />,
  health: <MdLocalHospital size={24} />,
  education: <MdSchool size={24} />,
  numbers: <MdNumbers size={24} />,
  basics: <MdQuestionMark size={24} />,
};

export default function TopicPage() {
  const { colors } = useTheme();
  const { language, targetLanguage } = useLanguage();
  const params = useParams();
  const topic = params.topic as string;
  const t = vocabularyTranslations[language];
  const levels = topicData[topic];
  const topicInfo = topics.find(tp => tp.id === topic);
  const [activeTab, setActiveTab] = useState<"phrases" | "conversations">("phrases");
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  // Determine target language key for translations
  const isFrench = targetLanguage === 'français' || targetLanguage?.toLowerCase().includes('french') || targetLanguage?.toLowerCase().includes('fran');
  const isGerman = targetLanguage === 'deutsch' || targetLanguage?.toLowerCase().includes('german') || targetLanguage?.toLowerCase().includes('deutsch');
  const targetLangKey: 'en' | 'de' | 'fr' = isFrench ? 'fr' : isGerman ? 'de' : 'en';

  // Preload voices on mount (needed for mobile)
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices();
      speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
    }
  }, []);

  if (!levels) {
    return (
      <div className={`min-h-screen ${colors.backgroundLight} flex items-center justify-center`}>
        <p className={colors.text}>Topic not found</p>
      </div>
    );
  }

  const currentLevel = levels.find(l => l.level === selectedLevel) || levels[0];

  const speakText = (text: string, speed: 'very-slow' | 'slow' | 'normal' = 'normal') => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Set language based on target language
      const langCode = isFrench ? 'fr-FR' : isGerman ? 'de-DE' : 'en-US';
      utterance.lang = langCode;

      const speedRates = {
        'very-slow': 0.2,
        'slow': 0.5,
        'normal': 1.0,
      };
      utterance.rate = speedRates[speed];

      const voices = speechSynthesis.getVoices();
      const targetVoice = voices.find(voice => voice.lang.startsWith(langCode.split('-')[0]));
      if (targetVoice) {
        utterance.voice = targetVoice;
      }

      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className="w-full min-h-screen px-4 py-6 md:p-12 relative"
      style={topicInfo?.image ? {
        backgroundImage: `url(${topicInfo.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      } : undefined}
    >
      {topicInfo?.image && (
        <div className="absolute inset-0 bg-black/60 fixed" />
      )}
      <div className={`${!topicInfo?.image ? colors.backgroundLight : ''} relative z-10`}>
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <Link href="/vocabulary" className={`${topicInfo?.image ? 'text-white/80 hover:text-white' : `${colors.text70} hover:${colors.text}`} flex items-center gap-2 mb-4`}>
          <IoArrowBackCircle size={24} />
          <span>{t.backTo}</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className={`${topicInfo?.image ? 'bg-white/20 text-white' : `${colors.textReverse} ${colors.backgroundReverse}`} p-3 rounded-xl`}>
            {topicIcons[topic]}
          </div>
          <h1 className={`${topicInfo?.image ? 'text-white' : colors.text} font-bold text-2xl md:text-4xl`}>
            {t.topics[topic as keyof typeof t.topics]}
          </h1>
        </div>
      </div>

      {/* Level Selector */}
      <div className="mb-6 flex items-center gap-4">
        <Dropdown
          menu={{
            items: [
              {
                key: 'label',
                label: t.level,
                disabled: true,
              },
              { type: 'divider' },
              ...levels.map((level) => ({
                key: String(level.level),
                label: `${t.level} ${level.level}`,
              })),
            ],
            selectable: true,
            selectedKeys: [String(selectedLevel)],
            onClick: (info) => setSelectedLevel(Number(info.key)),
          }}
          trigger={['click']}
        >
          <div className={`${topicInfo?.image ? 'text-white' : colors.text} flex gap-3 font-semibold cursor-pointer`}>
            <div className={`border px-2 py-1 font-semibold rounded ${topicInfo?.image ? 'border-white/50' : ''}`}>
              {t.level} {selectedLevel}
            </div>
          </div>
        </Dropdown>
        <p className={`${topicInfo?.image ? 'text-white/70' : colors.text60} text-sm`}>
          {currentLevel.phrases.length} {t.phrases.toLowerCase()}, {currentLevel.conversations.length} {t.conversations.toLowerCase()}
        </p>
      </div>

      {/* Tabs */}
      <div className={`flex gap-2 mb-6 border-b ${topicInfo?.image ? 'border-white/20' : colors.border10} pb-4`}>
        <button
          onClick={() => setActiveTab("phrases")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "phrases"
              ? `${topicInfo?.image ? 'bg-white text-black' : `${colors.backgroundReverse} ${colors.textReverse}`}`
              : `${topicInfo?.image ? 'text-white/70 hover:text-white' : `${colors.text70} hover:${colors.text}`}`
          }`}
        >
          {t.phrases} ({currentLevel.phrases.length})
        </button>
        <button
          onClick={() => setActiveTab("conversations")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "conversations"
              ? `${topicInfo?.image ? 'bg-white text-black' : `${colors.backgroundReverse} ${colors.textReverse}`}`
              : `${topicInfo?.image ? 'text-white/70 hover:text-white' : `${colors.text70} hover:${colors.text}`}`
          }`}
        >
          {t.conversations} ({currentLevel.conversations.length})
        </button>
      </div>

      {/* Content */}
      {activeTab === "phrases" && (
        <div className="space-y-3">
          {currentLevel.phrases.length === 0 ? (
            <p className={`${colors.text60} text-center py-8`}>No phrases for this level yet</p>
          ) : (
            currentLevel.phrases.map((phrase) => {
              // Get the word in target language (what user is learning)
              const targetWord = phrase.translation[targetLangKey];
              // Get translation in UI language (for understanding)
              // Use pt if available, otherwise fallback to English
              const uiLangKey = language === 'pt' ? (phrase.translation.pt ? 'pt' : 'en') : language;
              const uiTranslation = uiLangKey === targetLangKey
                ? phrase.translation[uiLangKey === 'en' ? 'de' : 'en']
                : (uiLangKey === 'pt' ? phrase.translation.pt : phrase.translation[uiLangKey]) || phrase.translation.en;

              return (
                <div
                  key={phrase.id}
                  className={`${colors.background} ${colors.border10} border rounded-xl p-4 flex items-start justify-between gap-4`}
                >
                  <div className="flex-1">
                    <p className={`${colors.text} text-lg font-medium mb-1`}>{targetWord}</p>
                    <p className={`${colors.text60} text-sm`}>{uiTranslation}</p>
                  </div>
                  <Dropdown
                    menu={{
                      items: [
                        { key: 'very-slow', label: speedLabels[language]['very-slow'] },
                        { key: 'slow', label: speedLabels[language]['slow'] },
                        { key: 'normal', label: speedLabels[language]['normal'] },
                      ],
                      onClick: (info) => speakText(targetWord, info.key as 'very-slow' | 'slow' | 'normal'),
                    }}
                    trigger={['click']}
                  >
                    <button
                      className={`${colors.text70} hover:${colors.text} p-2 rounded-lg transition-all`}
                    >
                      <HiSpeakerWave size={20} />
                    </button>
                  </Dropdown>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === "conversations" && (
        <div className="space-y-6">
          {currentLevel.conversations.length === 0 ? (
            <p className={`${colors.text60} text-center py-8`}>No conversations for this level yet</p>
          ) : (
            currentLevel.conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`${colors.background} ${colors.border10} border rounded-xl overflow-hidden`}
              >
                <div className={`${colors.backgroundReverse} ${colors.textReverse} px-4 py-3 font-medium`}>
                  {language === 'pt' ? (conversation.title.pt || conversation.title.en) : conversation.title[language]}
                </div>
                <div className="p-4 space-y-4">
                  {conversation.lines.map((line, idx) => {
                    // Get the line in target language (what user is learning)
                    const targetLine = line.translation[targetLangKey];
                    // Get translation in UI language (for understanding)
                    // Use pt if available, otherwise fallback to English
                    const uiLangKeyConv = language === 'pt' ? (line.translation.pt ? 'pt' : 'en') : language;
                    const uiTranslation = uiLangKeyConv === targetLangKey
                      ? line.translation[uiLangKeyConv === 'en' ? 'de' : 'en']
                      : (uiLangKeyConv === 'pt' ? line.translation.pt : line.translation[uiLangKeyConv]) || line.translation.en;

                    return (
                      <div key={idx} className={`flex gap-3 ${line.speaker === "B" ? "flex-row-reverse" : ""}`}>
                        <div className={`${colors.background} ${colors.border20} border ${colors.text70} w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0`}>
                          {line.speaker}
                        </div>
                        <div className={`flex-1 ${line.speaker === "B" ? "text-right" : ""}`}>
                          <div className={`${colors.border10} border rounded-lg p-3 inline-block ${line.speaker === "B" ? "text-left" : ""} ${colors.background} `}>
                            <p className={`${colors.text} font-medium mb-1`}>{targetLine}</p>
                            <p className={`${colors.text60} text-sm`}>{uiTranslation}</p>
                          </div>
                          <Dropdown
                            menu={{
                              items: [
                                { key: 'very-slow', label: speedLabels[language]['very-slow'] },
                                { key: 'slow', label: speedLabels[language]['slow'] },
                                { key: 'normal', label: speedLabels[language]['normal'] },
                              ],
                              onClick: (info) => speakText(targetLine, info.key as 'very-slow' | 'slow' | 'normal'),
                            }}
                            trigger={['click']}
                          >
                            <button
                              className={`${colors.text70} hover:${colors.text} p-1 mt-1 ${line.speaker === "B" ? "mr-2" : "ml-2"}`}
                            >
                              <HiSpeakerWave size={16} />
                            </button>
                          </Dropdown>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      </div>
    </div>
  );
}
