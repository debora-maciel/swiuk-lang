'use client'

import { useAuth } from '../context/auth/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useTheme } from '../context/theme/ThemeContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { colors } = useTheme()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className={`flex min-h-[60vh] items-center justify-center ${colors.backgroundLight}`}>
        <div className={`${colors.text60} text-lg`}>Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
