"use client";
import Link from "next/link";


export default function WordDragManager() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <p className="mb-10 text-lg font-bold text-left w-3/5">
        Chose language
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
      <Link href={'/words/'} className="border w-3/5 border-black/20 rounded-xl shadow-md p-4 mt-5">
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
  );
}
