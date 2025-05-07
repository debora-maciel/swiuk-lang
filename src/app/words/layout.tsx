export default function WordLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full flex flex-col items-start justify-start overflow-y-scroll">
            {children}
        </div>
    );
}