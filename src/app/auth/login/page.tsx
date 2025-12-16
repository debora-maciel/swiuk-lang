'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useTheme } from '@/app/core/context/theme/ThemeContext'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { RiEyeLine, RiEyeOffLine, RiLockLine } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const { colors } = useTheme()
  const next = searchParams.get('next') || '/'

  // Detect effective dark mode (handles 'system' theme)
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setIsDarkMode(isDark)
    }

    checkDarkMode()

    // Watch for class changes on html element
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push(next)
      router.refresh()
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })

    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className={`w-full max-w-md rounded-3xl ${colors.background} p-8 shadow-xl`}>

        <div className="mb-8 flex flex-col items-center">
          <Image
            src={isDarkMode ? '/logo-dark-2.png' : '/logo-off.png'}
            alt="Swiuk Lang"
            width={160}
            height={54}
            className="mb-6"
            priority
          />
          <h1 className={`text-center text-2xl font-bold ${colors.text}`}>
            Login
          </h1>
          <p className={`mt-2 text-center text-sm ${colors.text50}`}>
            Welcome back! Please login to your account
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition-all focus-within:border-gray-300 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-gray-600 dark:focus-within:bg-gray-800">
            <HiOutlineMail className="mr-2 h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label htmlFor="email" className="block text-[9px] leading-tight text-gray-400">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ fontSize: '14px' }}
                className={`w-full bg-transparent ${colors.text} text-[10px] leading-tight outline-none placeholder:text-gray-400`}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition-all focus-within:border-gray-300 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-gray-600 dark:focus-within:bg-gray-800">
            <RiLockLine className="mr-2 h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <label htmlFor="password" className="block text-[10px] leading-tight text-gray-400">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ fontSize: '14px' }}
                className={`w-full bg-transparent ${colors.text} text-[10px] leading-tight outline-none placeholder:text-gray-400`}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2"
            >
              {showPassword ? (
                <RiEyeOffLine className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <RiEyeLine className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Forget password?
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/auth/signup"
              className={`flex-1 rounded-2xl border border-gray-200 ${colors.background} py-3.5 text-center font-semibold ${colors.text} transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800`}
            >
              Sign up
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-2xl bg-orange-500 py-3.5 font-semibold text-white transition-all hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Continue'}
            </button>
          </div>
        </form>

        {/* Divider */}
        {/* <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
          <span className="px-4 text-sm text-gray-400">Or</span>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
        </div> */}

        {/* Social Login */}
        {/* <div className="flex justify-center gap-4">
          <button
            onClick={() => handleOAuthLogin('github')}
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 ${colors.background} transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700`}
          >
            <FaGithub size={22} className={colors.text} />
          </button>
          <button
            onClick={() => handleOAuthLogin('google')}
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 ${colors.background} transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700`}
          >
            <FcGoogle size={22} />
          </button>
        </div> */}

      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
