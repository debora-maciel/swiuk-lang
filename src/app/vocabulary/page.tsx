"use client"

import { useTheme } from "../core/context/theme/ThemeContext";
import { useLanguage } from "../core/context/language/LanguageContext";
import Link from "next/link";
import { MdFlight, MdWork, MdRestaurant, MdShoppingCart, MdLocalHospital, MdSchool, MdNumbers } from "react-icons/md";
import { BiConversation } from "react-icons/bi";

const topics = [
  {
    id: "travel",
    icon: <MdFlight size={28} />,
    levels: 5,
  },
  {
    id: "work",
    icon: <MdWork size={28} />,
    levels: 5,
  },
  {
    id: "restaurant",
    icon: <MdRestaurant size={28} />,
    levels: 5,
  },
  {
    id: "shopping",
    icon: <MdShoppingCart size={28} />,
    levels: 5,
  },
  {
    id: "health",
    icon: <MdLocalHospital size={28} />,
    levels: 5,
  },
  {
    id: "education",
    icon: <MdSchool size={28} />,
    levels: 5,
  },
  {
    id: "numbers",
    icon: <MdNumbers size={28} />,
    levels: 5,
  },
];

const translations = {
  en: {
    title: "Vocabulary Topics",
    subtitle: "Practice ready phrases and conversations for real-world situations",
    levels: "levels",
    topics: {
      travel: "Travel & Transport",
      work: "Work & Business",
      restaurant: "Food & Dining",
      shopping: "Shopping",
      health: "Health & Emergency",
      education: "Education",
      numbers: "Numbers",
    },
  },
  de: {
    title: "Vokabel-Themen",
    subtitle: "Übe fertige Sätze und Gespräche für reale Situationen",
    levels: "Stufen",
    topics: {
      travel: "Reisen & Transport",
      work: "Arbeit & Geschäft",
      restaurant: "Essen & Restaurant",
      shopping: "Einkaufen",
      health: "Gesundheit & Notfall",
      education: "Bildung",
      numbers: "Zahlen",
    },
  },
  fr: {
    title: "Thèmes de vocabulaire",
    subtitle: "Pratiquez des phrases et conversations pour des situations réelles",
    levels: "niveaux",
    topics: {
      travel: "Voyage & Transport",
      work: "Travail & Affaires",
      restaurant: "Cuisine & Restaurant",
      shopping: "Shopping",
      health: "Santé & Urgences",
      education: "Éducation",
      numbers: "Chiffres",
    },
  },
  pt: {
    title: "Temas de Vocabulário",
    subtitle: "Pratique frases e conversas prontas para situações do dia a dia",
    levels: "níveis",
    topics: {
      travel: "Viagem & Transporte",
      work: "Trabalho & Negócios",
      restaurant: "Comida & Restaurante",
      shopping: "Compras",
      health: "Saúde & Emergência",
      education: "Educação",
      numbers: "Números",
    },
  },
};

export default function VocabularyPage() {
  const { colors } = useTheme();
  const { language, targetLanguage } = useLanguage();
  const t = translations[language];
  const isFrench = targetLanguage === 'français' || targetLanguage?.toLowerCase().includes('french') || targetLanguage?.toLowerCase().includes('fran');
  const isGerman = targetLanguage === 'deutsch' || targetLanguage?.toLowerCase().includes('german') || targetLanguage?.toLowerCase().includes('deutsch');
  const isEnglish = targetLanguage === 'english' || targetLanguage?.toLowerCase().includes('english') || targetLanguage?.toLowerCase().includes('eng');
  const hasFlag = isFrench || isGerman || isEnglish;

  return (
    <div className={`w-full max-w-full min-h-screen ${colors.backgroundLight} px-4 py-6 md:p-12 overflow-hidden`}>
      {/* Header Section */}
      <div className={`mb-8 md:mb-12 ${hasFlag ? 'rounded-xl p-4 -mx-4 md:-mx-0 relative overflow-hidden' : ''}`}
        style={
          isFrench
            ? { background: 'linear-gradient(to right, #002395 0%, #002395 33%, #ffffff 33%, #ffffff 66%, #ED2939 66%, #ED2939 100%)' }
            : isGerman
            ? { background: 'linear-gradient(to bottom, #000000 0%, #000000 33%, #DD0000 33%, #DD0000 66%, #FFCC00 66%, #FFCC00 100%)' }
            : isEnglish
            ? { background: '#fff' }
            : {}
        }
      >
        {/* England flag cross */}
        {isEnglish && (
          <>
            <div className="absolute top-1/2 left-0 right-0 h-[20%] bg-[#CE1124] -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-[12%] bg-[#CE1124] -translate-x-1/2"></div>
          </>
        )}
        <div className={`flex items-center gap-3 mb-3 ${hasFlag ? 'bg-black/50 backdrop-blur-sm rounded-lg p-3 w-fit' : ''} relative z-10`}>
          <div className={`${colors.textReverse} ${colors.backgroundReverse} p-3 rounded-xl`}>
            <BiConversation size={24} />
          </div>
          <h1 className={`${hasFlag ? 'text-white' : colors.text90} font-bold text-lg md:text-4xl`}>
            {t.title}
          </h1>
        </div>
        <p className={`text-[15px] md:text-xl max-w-3xl ${hasFlag ? 'text-white bg-black/50 backdrop-blur-sm rounded-lg p-2 w-fit' : colors.text70} relative z-10`}>
          {t.subtitle}
        </p>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/vocabulary/${topic.id}`}
            className={`${colors.background} ${colors.border10} border rounded-xl lg:rounded-2xl p-6 flex flex-col hover:shadow-lg transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`${colors.textReverse} ${colors.backgroundReverse} p-3 rounded-xl`}>
                {topic.icon}
              </div>
              <h3 className={`${colors.text} text-lg lg:text-xl font-bold`}>
                {t.topics[topic.id as keyof typeof t.topics]}
              </h3>
            </div>

            <div className="flex items-center gap-4 mt-auto">
              <div className={`${colors.border20} ${colors.text60} rounded-lg border px-3 py-1 text-sm`}>
                {topic.levels} {t.levels}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
