export default function TranslateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-orange-100 w-full h-screen flex flex-col items-center justify-center">
            <div className="pl-5 text-xl pt-2 montserrat-black w-full text-left border-t-6 border-orange-400">Swiuk Lang</div>
            {children}
        </div>
    );
}