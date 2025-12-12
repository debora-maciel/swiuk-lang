'use client'

import { useAuth } from '../context/auth/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { useTheme } from '../context/theme/ThemeContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { colors } = useTheme()

  useEffect(() => {
    if (!loading && !user) {
      const loginUrl = `/auth/login?next=${encodeURIComponent(pathname)}`
      router.replace(loginUrl)
    }
  }, [user, loading, router, pathname])

  if (loading) {
    return (
      <div className={`flex min-h-[60vh] items-center justify-center ${colors.backgroundLight}`}>
        <div className={`${colors.text60} text-lg`}>Loading...</div>
      </div>
    )
  }

  if (!user) {
    // Show nothing while redirecting
    return (
      <div className={`flex min-h-[60vh] items-center justify-center ${colors.backgroundLight}`}>
        <div className={`${colors.text60} text-lg`}>Redirecting to login...</div>
      </div>
    )
  }

  return <>{children}</>
}
