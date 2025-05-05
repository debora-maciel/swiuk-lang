import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { IoGameController } from "react-icons/io5";
import { IoIosInformation } from "react-icons/io";
import { MdOutlineGTranslate } from "react-icons/md";
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full overflow-y-scroll pt-4">
      <div className="flex items-start justify-center h-full gap-10 xl:gap-20 xl:flex-row flex-col">
        <div className="border-black text-black w-5/6 border border-black/10 rounded py-3" >
          <div className="pl-19 leading-3 font-bold text-md">Words</div>
          <div className="flex items-start pr-3 gap-3">
            <div className="text-black ml-2 w-min p-2 rounded-full border border-black/20 ">
              <TiSortAlphabeticallyOutline size={30} />
            </div>
            <p className="p-2 text-black/70 leading-5 text-sm">
              Here you can have register words that you already know and also learn new ones if you do not know them yet.
            </p>
          </div>
          <div className="flex items-center gap-2 justify-end pr-5 pt-4 border-t mt-1 border-black/10 rounded-r-xl text-black/50">
            <div className="w-full flex items-center gap-4 pl-10">
              <div className="flex flex-col items-center justify-center text-sm font-black w-[40px] gap-1">
                <Image src="/german.png" alt="de" width={50} height={50} className="rounded" />
                120
              </div>
              <div className="flex flex-col items-center justify-center text-sm font-bold w-[40px] gap-1">
                <Image src="/english.avif" alt="de" width={50} height={50} className="rounded" />
                300
              </div>
            </div>
            <button className="rounded-full border border-black/20 text-black/50">
              <IoIosInformation size={40} />
            </button>
            <Link href={'/words/choose-language'}
              className="text-white bg-black border border-black/30 rounded-full text-md py-2 px-4 font-[600]">
              Continue
            </Link>
          </div>
        </div>
        <div className="border-black text-black w-5/6 border border-black/10 rounded py-3" >
          <div className="pl-19 leading-3 font-bold text-md">Connect Words</div>
          <div className="flex items-start pr-3 gap-3">
            <div className="text-black ml-2 w-min p-2 rounded-full border border-black/20 ">
              <IoGameController size={30} />
            </div>
            <p className="p-2 text-black/70 leading-5 text-sm">
              Here you can have register words that you already know and also learn new ones if you do not know them yet.
            </p>
          </div>
          <div className="flex gap-2 items-center justify-end pr-5 pt-4 border-t mt-1 border-black/10 rounded-r-xl text-black/70">
            <div className="w-full flex items-center gap-4 pl-10">
              <div className="flex font-normal text-sm font-black gap-1 border px-2 rounded border-black/20">
                Matches: <b className="text-black/60">23</b>
              </div>
            </div>
            <button className="rounded-full border border-black/20 text-black/50">
              <IoIosInformation size={40} />
            </button>
            <Link href={'/game/connect-words'} className="bg-black text-white border border-black/30 rounded-full py-2 px-4 font-semibold">Play</Link>
          </div>
        </div>
        <div className="border-black text-black w-5/6 border border-black/10 rounded py-3" >
          <div className="pl-19 leading-3 font-bold text-md">Translator</div>
          <div className="flex items-start pr-3 gap-3">
            <div className="text-black w-min p-2 ml-2 rounded-full border border-black/20">
              <MdOutlineGTranslate size={30} />
            </div>
            <p className="p-2 text-black/70 leading-5 text-sm">
              Here you can have register words that you already know and also learn new ones if you do not know them yet.
            </p>
          </div>
          <div className="flex gap-2 items-center justify-end pr-5 pt-4 border-t mt-1 border-black/10 rounded-r-xl">
            <div className="w-full flex items-center gap-1 pl-10">
              <div className="rounded-full border border-black/20 text-black/60 p-2 text-sm font-bold">
                DE
              </div>
              <div className="rounded-full border border-black/20 text-black/60 p-2 text-sm font-bold">
                EN
              </div>
            </div>
            <button className="rounded-full border border-black/20 text-black/50">
              <IoIosInformation size={40} />
            </button>
            <Link href={'/game/connect-words'}
              className="text-white bg-black border border-black/30 rounded-full text-md py-2 px-4 font-[600]">
              Navigate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}