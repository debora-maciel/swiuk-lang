export default function TranslateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-orange-400 w-full h-screen flex items-center justify-center">
            {children}
        </div>
    );
}