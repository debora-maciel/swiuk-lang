import { IoArrowBackCircle } from "react-icons/io5";
import Link from "next/link";

export default function WordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-orange-100 w-full h-screen flex flex-col items-start justify-start overflow-y-scroll">
            <div className="pl-5 text-xl pt-4 montserrat-black w-full text-left flex items-center justify-between px-4">
                <Link href={'/'} className="text-orange-700 text-5xl">
                    <IoArrowBackCircle />
                </Link>
            </div>
            {children}
        </div>
    );
}