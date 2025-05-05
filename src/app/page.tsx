import { TiSortAlphabeticallyOutline } from "react-icons/ti";
import { IoGameController } from "react-icons/io5";
import { MdOutlineGTranslate } from "react-icons/md";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-screen bg-orange-100"><div className="flex items-center justify-center h-full gap-10 xl:gap-20 xl:flex-row flex-col">
      <div className="text-center flex flex-col gap-3 text-3xl font-bold text-orange-900">
        <Link href={'/words/choose-language'} className="cursor-pointer bg-orange-900 text-white p-2 rounded-full shadow-xl flex items-center justify-center">
          <div className="bg-orange-50 text-white p-4 rounded-full shadow-xl flex items-center justify-center">
            <div className="bg-orange-400 text-white p-7 rounded-full shadow-xl flex items-center justify-center">
              <div className="bg-orange-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-[40px] xl:text-[120px]">
                <TiSortAlphabeticallyOutline />
              </div>
            </div>
          </div>
        </Link>
        Words
      </div>
      <div className="cursor-pointer hover:scale-2 bg-yellow-900 text-white p-2 rounded-full shadow-xl flex items-center justify-center">
        <div className="bg-yellow-50 text-white p-4 rounded-full shadow-xl flex items-center justify-center">
          <div className="bg-yellow-400 text-white p-7 rounded-full shadow-xl flex items-center justify-center">
            <div className="bg-yellow-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-[40px] xl:text-[120px]">
              <IoGameController />
            </div>
          </div>
        </div>
      </div>
      <div className="cursor-pointer hover:scale-2 bg-blue-900 text-white p-2 rounded-full shadow-xl flex items-center justify-center">
        <div className="bg-blue-50 text-white p-4 rounded-full shadow-xl flex items-center justify-center">
          <div className="bg-blue-400 text-white p-7 rounded-full shadow-xl flex items-center justify-center">
            <div className="bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-[40px] xl:text-[120px]">
              <MdOutlineGTranslate />
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
    </div>
  )
}