'use client'

import ProtectedRoute from '../core/components/ProtectedRoute'

export default function GameLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>
}
