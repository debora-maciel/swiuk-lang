import Link from "next/link";
import { IoArrowBackCircle } from "react-icons/io5";
import { useTheme } from "../context/theme/ThemeContext";

interface IHeaderBack {
    title: string;
    link?: string
}

export default function HeaderBack({ title, link }: IHeaderBack) {
    const { colors } = useTheme();

    return (
        <div className="pl-5 text-xl pt-1 montserrat-black w-full text-left flex items-center justify-between px-4 mb-3">
            {link && (
                <Link href={link} className={`${colors.text} text-4xl`}>
                    <IoArrowBackCircle />
                </Link>
            )}
            <h1 className={`${colors.text} text-2xl font-bold  mb-4 ${link ? 'w-4/6' : 'w-full text-center pr-10'} pt-4`}>{title}</h1>
        </div>
    )
}