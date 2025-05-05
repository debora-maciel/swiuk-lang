"use client";

import Image from "next/image";
import de from "./../../../../public/german.png";
import en from "./../../../../public/english.avif";
import Link from "next/link";


export default function WordDragManager() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full pt-10 text-2xl font-bold text-orange-800">
      <Link href={'/words/deutsch'} className="border-b-10 border-l-10 border-red-600 rounded-xl flex flex-col gap-10">
        <Image src={de} className="w-[240px] rounded border" alt="german-flag" />
      </Link>
      Deutsch
      <Link href={'/words/'} className="border-b-10 border-l-10 border-indigo-950 rounded-xl flex flex-col gap-10 mt-10">
        <Image src={en} className="w-[240px] rounded-xl" alt="english-flag" />
      </Link>
      English
    </div>
  );
}
