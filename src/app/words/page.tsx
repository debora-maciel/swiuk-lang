"use client";
import Link from "next/link";
import { useTheme } from "../core/context/theme/ThemeContext";
import HeaderBack from "../core/components/HeaderBack";
import { useLanguage } from "../core/context/language/LanguageContext";
import { translations } from "../core/variables/translation";

export default function WordDragManager() {
    const { colors } = useTheme();
    const { language } = useLanguage();
    const t = translations.language[language];

    const options = [
        {
            id: 1,
            quick: "DE",
            data: t.de,
            link: "/words/deutsch"
        },
        {
            id: 2,
            quick: "EN",
            data: t.en,
            link: "/words/english"
        },
        {
            id: 3,
            quick: "FR",
            data: t.fr,
            link: "/words/french"
        }
    ];

    return (
        <div className={`min-h-screen ${colors.backgroundLight}`}>
            <HeaderBack link="/" title={t.title} />
            <div className={`flex flex-col justify-center items-center w-full gap-5`}>
                {options.map((o) => (
                    <Link key={o.id} href={o.link} className={`border w-3/5 ${colors.border20} ${colors.background} rounded-xl shadow-md p-4`}>
                        <div className={`${colors.text} flex gap-3 font-semibold`}>
                            <div className={`border px-1 font-semibold rounded`}>{o.quick}</div>
                            {o.data.label}
                        </div>
                        <p className={`${colors.text60} text-sm pt-2`}>
                            {o.data.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
