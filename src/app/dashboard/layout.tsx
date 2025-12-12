'use client'

import ProtectedRoute from '../core/components/ProtectedRoute'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="w-full flex flex-col items-start justify-start overflow-y-scroll">
                {children}
            </div>
        </ProtectedRoute>
    );
}
