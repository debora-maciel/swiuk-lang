'use client'

import Link from 'next/link'
import { useTheme } from '@/app/core/context/theme/ThemeContext'

export default function AuthErrorPage() {
  const { colors } = useTheme()

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className={`w-full max-w-md rounded-lg border ${colors.border20} ${colors.background} p-8 shadow-lg text-center`}>
        <div className="mb-4 text-5xl">⚠️</div>
        <h1 className={`mb-4 text-2xl font-bold ${colors.text}`}>Authentication Error</h1>
        <p className={`mb-6 ${colors.text60}`}>
          Something went wrong during authentication. Please try again.
        </p>
        <Link
          href="/auth/login"
          className={`inline-block rounded-md ${colors.backgroundReverse} ${colors.textReverse} px-6 py-2 font-medium transition-opacity hover:opacity-90`}
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}
