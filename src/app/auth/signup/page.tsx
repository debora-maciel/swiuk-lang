'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useTheme } from '@/app/core/context/theme/ThemeContext'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { RiEyeLine, RiEyeOffLine, RiLockLine } from 'react-icons/ri'
import { HiOutlineMail } from 'react-icons/hi'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const { colors } = useTheme()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
        <div className={`w-full max-w-md rounded-3xl ${colors.background} p-8 shadow-xl text-center`}>
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/30">
              <HiOutlineMail className="h-10 w-10 text-orange-500" />
            </div>
          </div>
          <h1 className={`mb-4 text-2xl font-bold ${colors.text}`}>Check your email</h1>
          <p className={`${colors.text60}`}>
            We&apos;ve sent you a confirmation link to <strong>{email}</strong>.
            Please check your inbox and click the link to verify your account.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-block rounded-xl bg-gray-900 px-8 py-3.5 font-semibold text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          >
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className={`w-full max-w-md rounded-3xl ${colors.background} p-8 shadow-xl`}>
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/logo-off.png"
            alt="Swiuk Lang"
            width={160}
            height={54}
            className="mb-6"
            priority
          />
          <h1 className={`text-center text-2xl font-bold ${colors.text}`}>
            Create Account
          </h1>
          <p className={`mt-2 text-center text-sm ${colors.text50}`}>
            Join Swiuk Lang and start learning today
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Email Input */}
          <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition-all focus-within:border-gray-300 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-gray-600 dark:focus-within:bg-gray-800">
            <HiOutlineMail className="mr-2 h-3.5 w-3.5 text-gray-400" />
            <div className="flex-1">
              <label htmlFor="email" className="block text-[8px] leading-tight text-gray-400">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full bg-transparent ${colors.text} text-[10px] leading-tight outline-none placeholder:text-gray-400`}
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition-all focus-within:border-gray-300 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-gray-600 dark:focus-within:bg-gray-800">
            <RiLockLine className="mr-2 h-3.5 w-3.5 text-gray-400" />
            <div className="flex-1">
              <label htmlFor="password" className="block text-[8px] leading-tight text-gray-400">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full bg-transparent ${colors.text} text-[10px] leading-tight outline-none placeholder:text-gray-400`}
                placeholder="Create a password"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2"
            >
              {showPassword ? (
                <RiEyeOffLine className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
              ) : (
                <RiEyeLine className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative flex items-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition-all focus-within:border-gray-300 focus-within:bg-white dark:border-gray-700 dark:bg-gray-800 dark:focus-within:border-gray-600 dark:focus-within:bg-gray-800">
            <RiLockLine className="mr-2 h-3.5 w-3.5 text-gray-400" />
            <div className="flex-1">
              <label htmlFor="confirmPassword" className="block text-[8px] leading-tight text-gray-400">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={`w-full bg-transparent ${colors.text} text-[10px] leading-tight outline-none placeholder:text-gray-400`}
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-2"
            >
              {showConfirmPassword ? (
                <RiEyeOffLine className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
              ) : (
                <RiEyeLine className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/auth/login"
              className={`flex-1 rounded-2xl border border-gray-200 ${colors.background} py-3.5 text-center font-semibold ${colors.text} transition-all hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800`}
            >
              Login
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-2xl bg-orange-500 py-3.5 font-semibold text-white transition-all hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Continue'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
          <span className="px-4 text-sm text-gray-400">Or</span>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
        </div>

        {/* Social Login */}
        <div className="flex justify-center gap-4">
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
        </div>
      </div>
    </div>
  )
}
