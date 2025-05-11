export default function SettingsLayout({
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