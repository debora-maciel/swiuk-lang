"use client";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";
import { useTheme } from "../core/context/theme/ThemeContext";
import HeaderBack from "../core/components/HeaderBack";

export default function WordDragManager() {
    const { colors } = useTheme();

    const options = [
        {
            id: 1,
            title: 'Deutsch',
            quick: 'DE',
            description: ' German (Deutsch) is a West Germanic language primarily spoken in Germany, Austria, Switzerland, Liechtenstein, Luxembourg, and parts of Belgium and Italy (South Tyrol).',
            link: '/words/deutsch'
        },
        {
            id: 2,
            title: 'English',
            quick: 'EN',
            description: ' English is a West Germanic language originally spoken in early medieval England. Today, it is the global lingua franca, widely used in international communication, science, business, entertainment, and diplomacy.',
            link: '/words/english'
        },
        {
            id: 3,
            title: 'French',
            quick: 'FR',
            description: ' English is a West Germanic language originally spoken in early medieval England. Today, it is the global lingua franca, widely used in international communication, science, business, entertainment, and diplomacy.',
            link: '/words/french'
        },
    ]

    return (
        <div className={`min-h-screen ${colors.backgroundLight}`}>
            <HeaderBack link="/" title="Choose language" />
            <div className={`flex flex-col justify-center items-center w-full gap-5`}>
                <p className={`mb-10 text-lg font-bold text-left w-3/5`}>
                </p>
                {options.map((o) => (
                    <Link key={o.id} href={o.link} className={`border w-3/5 ${colors.border20} ${colors.background} rounded-xl shadow-md p-4`}>
                        <div className={`${colors.text} flex gap-3 font-semibold`}>
                            <div className={` border px-1 font-semibold rounded `}>{o.quick}</div>
                            {o.title}
                        </div>
                        <p className={`${colors.text60} text-sm pt-2`}>
                            {o.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
