import { GrStatusUnknown } from "react-icons/gr";

export default function Background() {
    return (
        <div className="text-slate-200/20 flex flex-wrap absolute w-full h-full z-0 overflow-hidden">
            {[
                "rotate-350 top-10 left-10 text-[100px] z-0",
                "rotate-350 top-2 left-2 text-[20px] z-0 ",
                "rotate-10 top-7 left-5 text-[20px] z-0",
                "rotate-345 top-3 right-0 text-[40px] z-0",
                "rotate-345 bottom-1 left-1 text-[20px] z-0",
                "rotate-20 bottom-1 left-36 text-[40px] z-0",
                "rotate-345 bottom-1 left-48 text-[20px] z-0",
                "rotate-23 bottom-0 left-57 text-[50px] z-0",
                "rotate-345 bottom-1 right-15 text-[15px] z-0",
                "rotate-12 top-2 left-12 text-[30px] z-0 ",
                "rotate-12 top-1 left-50 text-[30px] z-0 ",
                "rotate-12 top-30 left-5 text-[30px] z-0 ",
                "rotate-12 top-14 right-0 text-[30px] z-0 ",
                "rotate-345 top-14 right-10 text-[25px] z-0 ",
                "rotate-12 top-12 left-0 text-[30px] z-0 ",
                "rotate-12 top-1 right-13 text-[45px] z-0",
                "rotate-0 top-1 right-25 text-[20px] z-0",
                "rotate-0 top-1 right-40 text-[20px] z-0",
                "rotate-0 right-47 text-[40px] z-0",
                "rotate-0 top-1 right-60 text-[20px] z-0",
            ].map((_, index) => (
                <div className={_ + " absolute"} key={index}>
                    <GrStatusUnknown />
                </div>
            ))}
        </div>
    )
}