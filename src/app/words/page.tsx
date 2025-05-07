"use client";
import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";

export default function WordDragManager() {
    return (
        <>
            <div className="pl-5 text-xl pt-1 montserrat-black w-full text-left flex items-end justify-between px-4 mb-3 ">
                <Link href={'/'} className="text-black text-4xl">
                    <IoArrowBackCircle />
                </Link>
                <div className="pr-28">
                    Chose language
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <p className="mb-10 text-lg font-bold text-left w-3/5">
                </p>
                <Link href={'/words/deutsch'} className="border w-3/5 border-black/20 rounded-xl shadow-md p-4">
                    <div className="flex gap-3 font-semibold">
                        <div className="border px-1 font-semibold rounded ">DE</div>
                        Deutsch
                    </div>
                    <p className="text-gray-700 text-sm pt-2">
                        German (Deutsch) is a West Germanic language primarily spoken in Germany, Austria, Switzerland,
                        Liechtenstein, Luxembourg, and parts of Belgium and Italy (South Tyrol).
                    </p>
                </Link>
                <Link href={'/words/english'} className="border w-3/5 border-black/20 rounded-xl shadow-md p-4 mt-5">
                    <div className="flex gap-3 font-semibold">
                        <div className="border px-1 font-semibold rounded ">EN</div>
                        English
                    </div>
                    <p className="text-gray-700 text-sm pt-2">
                        English is a West Germanic language originally spoken in early medieval England. Today, it is the
                        global lingua franca, widely used in international communication, science, business, entertainment,
                        and diplomacy.
                    </p>
                </Link>
            </div>
        </>
    );
}
