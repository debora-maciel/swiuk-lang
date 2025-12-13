"use client"

import { useEffect, useState } from "react";
import { useTheme } from "../core/context/theme/ThemeContext";
import { useLanguage } from "../core/context/language/LanguageContext";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { IoGameController } from "react-icons/io5";
import { FiTrendingUp, FiTarget, FiAward, FiBookOpen } from "react-icons/fi";

const translations = {
    en: {
        title: "Your Progress",
        subtitle: "Track your language learning journey",
        totalWords: "Total Words Learned",
        wordsThisWeek: "This Week",
        gamesPlayed: "Games Played",
        streak: "Day Streak",
        english: "English",
        german: "German",
        french: "French",
        known: "Known",
        unknown: "To Learn",
        total: "Total",
        noData: "Start learning to see your progress!",
        keepGoing: "Keep going!",
        great: "Great progress!",
        amazing: "Amazing work!",
    },
    de: {
        title: "Dein Fortschritt",
        subtitle: "Verfolge deine Sprachlernreise",
        totalWords: "Gelernte Wörter",
        wordsThisWeek: "Diese Woche",
        gamesPlayed: "Gespielte Spiele",
        streak: "Tage Serie",
        english: "Englisch",
        german: "Deutsch",
        french: "Französisch",
        known: "Bekannt",
        unknown: "Zu lernen",
        total: "Gesamt",
        noData: "Fang an zu lernen, um deinen Fortschritt zu sehen!",
        keepGoing: "Weiter so!",
        great: "Toller Fortschritt!",
        amazing: "Erstaunliche Arbeit!",
    },
    fr: {
        title: "Votre Progression",
        subtitle: "Suivez votre parcours d'apprentissage",
        totalWords: "Mots Appris",
        wordsThisWeek: "Cette Semaine",
        gamesPlayed: "Parties Jouées",
        streak: "Jours Consécutifs",
        english: "Anglais",
        german: "Allemand",
        french: "Français",
        known: "Connus",
        unknown: "À apprendre",
        total: "Total",
        noData: "Commencez à apprendre pour voir votre progression!",
        keepGoing: "Continuez!",
        great: "Bon progrès!",
        amazing: "Travail incroyable!",
    },
    pt: {
        title: "Seu Progresso",
        subtitle: "Acompanhe sua jornada de aprendizado",
        totalWords: "Palavras Aprendidas",
        wordsThisWeek: "Esta Semana",
        gamesPlayed: "Jogos Jogados",
        streak: "Dias Seguidos",
        english: "Inglês",
        german: "Alemão",
        french: "Francês",
        known: "Conhecidas",
        unknown: "Para Aprender",
        total: "Total",
        noData: "Comece a aprender para ver seu progresso!",
        keepGoing: "Continue assim!",
        great: "Ótimo progresso!",
        amazing: "Trabalho incrível!",
    },
};

interface LanguageStats {
    known: number;
    unknown: number;
    total: number;
}

export default function Dashboard() {
    const { colors } = useTheme();
    const { language } = useLanguage();
    const t = translations[language];

    const [stats, setStats] = useState({
        english: { known: 0, unknown: 0, total: 0 } as LanguageStats,
        german: { known: 0, unknown: 0, total: 0 } as LanguageStats,
        french: { known: 0, unknown: 0, total: 0 } as LanguageStats,
        matches: 0,
    });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const ENknown = JSON.parse(localStorage.getItem("knownWords") || "[]");
        const ENunknown = JSON.parse(localStorage.getItem("unknownWords") || "[]");
        const DEknown = JSON.parse(localStorage.getItem("DEknownWords") || "[]");
        const DEunknown = JSON.parse(localStorage.getItem("DEunknownWords") || "[]");
        const FRknown = JSON.parse(localStorage.getItem("FRknownWords") || "[]");
        const FRunknown = JSON.parse(localStorage.getItem("FRunknownWords") || "[]");
        const matches = JSON.parse(localStorage.getItem("matches") || "[]");

        setStats({
            english: {
                known: ENknown.length,
                unknown: ENunknown.length,
                total: ENknown.length + ENunknown.length,
            },
            german: {
                known: DEknown.length,
                unknown: DEunknown.length,
                total: DEknown.length + DEunknown.length,
            },
            french: {
                known: FRknown.length,
                unknown: FRunknown.length,
                total: FRknown.length + FRunknown.length,
            },
            matches: matches.length,
        });
        setHasLoaded(true);
    }, []);

    const totalKnown = stats.english.known + stats.german.known + stats.french.known;
    const totalWords = stats.english.total + stats.german.total + stats.french.total;

    const getMotivation = () => {
        if (totalKnown >= 100) return t.amazing;
        if (totalKnown >= 50) return t.great;
        return t.keepGoing;
    };

    const getProgressPercentage = (known: number, total: number) => {
        if (total === 0) return 0;
        return Math.round((known / total) * 100);
    };

    const ProgressBar = ({ known, total, color }: { known: number; total: number; color: string }) => {
        const percentage = getProgressPercentage(known, total);
        return (
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                />
            </div>
        );
    };

    const LanguageCard = ({
        title,
        stats: langStats,
        color,
        flag,
    }: {
        title: string;
        stats: LanguageStats;
        color: string;
        flag: string;
    }) => (
        <div className={`${colors.background} ${colors.border10} border rounded-2xl p-5 flex flex-col gap-4`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{flag}</span>
                    <h3 className={`${colors.text} font-semibold text-lg`}>{title}</h3>
                </div>
                <div className={`text-2xl font-bold`} style={{ color }}>
                    {langStats.known}
                </div>
            </div>
            <ProgressBar known={langStats.known} total={langStats.total || 1} color={color} />
            <div className="flex justify-between text-sm">
                <span className={colors.text60}>
                    {t.known}: {langStats.known}
                </span>
                <span className={colors.text60}>
                    {t.unknown}: {langStats.unknown}
                </span>
            </div>
        </div>
    );

    if (!hasLoaded) {
        return (
            <div className={`w-full min-h-screen ${colors.backgroundLight} flex items-center justify-center`}>
                <div className={`${colors.text60}`}>Loading...</div>
            </div>
        );
    }

    return (
        <div className={`w-full min-h-screen ${colors.backgroundLight} px-4 py-6 md:p-8 pb-24`}>
            {/* Header */}
            <div className="mb-8">
                <h1 className={`${colors.text} text-2xl md:text-3xl font-bold mb-2`}>{t.title}</h1>
                <p className={`${colors.text60}`}>{t.subtitle}</p>
            </div>

            {/* Stats Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className={`${colors.background} ${colors.border10} border rounded-2xl p-4 flex flex-col`}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <TiSortAlphabeticallyOutline className="text-blue-500" size={20} />
                        </div>
                    </div>
                    <div className={`text-2xl md:text-3xl font-bold ${colors.text}`}>{totalKnown}</div>
                    <div className={`text-sm ${colors.text60}`}>{t.totalWords}</div>
                </div>

                <div className={`${colors.background} ${colors.border10} border rounded-2xl p-4 flex flex-col`}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <FiTrendingUp className="text-green-500" size={20} />
                        </div>
                    </div>
                    <div className={`text-2xl md:text-3xl font-bold ${colors.text}`}>{totalWords}</div>
                    <div className={`text-sm ${colors.text60}`}>{t.total}</div>
                </div>

                <div className={`${colors.background} ${colors.border10} border rounded-2xl p-4 flex flex-col`}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                            <IoGameController className="text-purple-500" size={20} />
                        </div>
                    </div>
                    <div className={`text-2xl md:text-3xl font-bold ${colors.text}`}>{stats.matches}</div>
                    <div className={`text-sm ${colors.text60}`}>{t.gamesPlayed}</div>
                </div>

                <div className={`${colors.background} ${colors.border10} border rounded-2xl p-4 flex flex-col`}>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                            <FiAward className="text-orange-500" size={20} />
                        </div>
                    </div>
                    <div className={`text-2xl md:text-3xl font-bold ${colors.text}`}>
                        {totalKnown > 0 ? getProgressPercentage(totalKnown, totalWords) : 0}%
                    </div>
                    <div className={`text-sm ${colors.text60}`}>{t.known}</div>
                </div>
            </div>

            {/* Motivation Banner */}
            {totalKnown > 0 && (
                <div className={`${colors.backgroundReverse} ${colors.textReverse} rounded-2xl p-5 mb-8 flex items-center gap-4`}>
                    <div className="p-3 rounded-full bg-white/20">
                        <FiTarget size={24} />
                    </div>
                    <div>
                        <div className="font-semibold text-lg">{getMotivation()}</div>
                        <div className="opacity-80 text-sm">
                            {language === 'en' && `You've learned ${totalKnown} words so far!`}
                            {language === 'de' && `Du hast bisher ${totalKnown} Wörter gelernt!`}
                            {language === 'fr' && `Vous avez appris ${totalKnown} mots jusqu'à présent!`}
                            {language === 'pt' && `Você aprendeu ${totalKnown} palavras até agora!`}
                        </div>
                    </div>
                </div>
            )}

            {/* Language Progress Cards */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <FiBookOpen className={colors.text60} size={20} />
                    <h2 className={`${colors.text} font-semibold text-lg`}>
                        {language === 'en' && 'Progress by Language'}
                        {language === 'de' && 'Fortschritt nach Sprache'}
                        {language === 'fr' && 'Progression par Langue'}
                        {language === 'pt' && 'Progresso por Idioma'}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <LanguageCard
                        title={t.english}
                        stats={stats.english}
                        color="#3b82f6"
                        flag="🇬🇧"
                    />
                    <LanguageCard
                        title={t.german}
                        stats={stats.german}
                        color="#f59e0b"
                        flag="🇩🇪"
                    />
                    <LanguageCard
                        title={t.french}
                        stats={stats.french}
                        color="#ef4444"
                        flag="🇫🇷"
                    />
                </div>
            </div>

            {/* Empty State */}
            {totalWords === 0 && (
                <div className={`${colors.background} ${colors.border10} border rounded-2xl p-8 text-center`}>
                    <div className="text-4xl mb-4">📚</div>
                    <p className={`${colors.text60}`}>{t.noData}</p>
                </div>
            )}
        </div>
    );
}
