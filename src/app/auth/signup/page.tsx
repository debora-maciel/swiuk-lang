'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useTheme } from '@/app/core/context/theme/ThemeContext'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
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
      <div className="flex min-h-[80vh] items-center justify-center px-4">
        <div className={`w-full max-w-md rounded-lg border ${colors.border20} ${colors.background} p-8 shadow-lg text-center`}>
          <div className="mb-4 text-5xl">📧</div>
          <h1 className={`mb-4 text-2xl font-bold ${colors.text}`}>Check your email</h1>
          <p className={`${colors.text60}`}>
            We&apos;ve sent you a confirmation link to <strong>{email}</strong>.
            Please check your inbox and click the link to verify your account.
          </p>
          <Link
            href="/auth/login"
            className={`mt-6 inline-block rounded-md ${colors.backgroundReverse} ${colors.textReverse} px-6 py-2 font-medium transition-opacity hover:opacity-90`}
          >
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className={`w-full max-w-md rounded-lg border ${colors.border20} ${colors.background} p-8 shadow-lg`}>
        <h1 className={`mb-6 text-center text-2xl font-bold ${colors.text}`}>
          Create Account
        </h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${colors.text70}`}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-1 w-full rounded-md border ${colors.border20} ${colors.backgroundLight} ${colors.text} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${colors.text70}`}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 w-full rounded-md border ${colors.border20} ${colors.backgroundLight} ${colors.text} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className={`block text-sm font-medium ${colors.text70}`}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={`mt-1 w-full rounded-md border ${colors.border20} ${colors.backgroundLight} ${colors.text} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md ${colors.backgroundReverse} ${colors.textReverse} py-2 font-medium transition-opacity hover:opacity-90 disabled:opacity-50`}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className={`flex-1 border-t ${colors.border20}`} />
          <span className={`px-4 text-sm ${colors.text50}`}>or continue with</span>
          <div className={`flex-1 border-t ${colors.border20}`} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleOAuthLogin('google')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md border ${colors.border20} ${colors.background} py-2 font-medium transition-colors ${colors.backgroundHover}`}
          >
            <FcGoogle size={20} />
            <span className={colors.text}>Google</span>
          </button>
          <button
            onClick={() => handleOAuthLogin('github')}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md border ${colors.border20} ${colors.background} py-2 font-medium transition-colors ${colors.backgroundHover}`}
          >
            <FaGithub size={20} className={colors.text} />
            <span className={colors.text}>GitHub</span>
          </button>
        </div>

        <p className={`mt-6 text-center text-sm ${colors.text60}`}>
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
