'use client'

import { createClient } from './client'

export type WordLanguage = 'english' | 'german' | 'french'
export type WordStatus = 'known' | 'unknown'

export async function saveWord(
  word: string,
  language: WordLanguage,
  status: WordStatus,
  translation?: string
) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('words')
    .upsert(
      {
        user_id: user.id,
        word,
        language,
        status,
        translation: translation || null,
      },
      {
        onConflict: 'user_id,word,language',
      }
    )
    .select()

  return { data, error }
}

export async function getWordCounts(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('words')
    .select('language, status')
    .eq('user_id', userId)

  if (error || !data) {
    return {
      english: { known: 0, unknown: 0 },
      german: { known: 0, unknown: 0 },
      french: { known: 0, unknown: 0 },
      error
    }
  }

  const counts = {
    english: { known: 0, unknown: 0 },
    german: { known: 0, unknown: 0 },
    french: { known: 0, unknown: 0 },
  }

  data.forEach((row) => {
    const lang = row.language as WordLanguage
    const status = row.status as WordStatus
    if (counts[lang]) {
      counts[lang][status]++
    }
  })

  return { ...counts, error: null }
}

export async function syncLocalStorageToSupabase() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const localStorageKeys = {
    english: { known: 'knownWords', unknown: 'unknownWords' },
    german: { known: 'DEknownWords', unknown: 'DEunknownWords' },
    french: { known: 'FRknownWords', unknown: 'FRunknownWords' },
  }

  const wordsToInsert: {
    user_id: string
    word: string
    language: WordLanguage
    status: WordStatus
  }[] = []

  for (const [language, keys] of Object.entries(localStorageKeys)) {
    const knownWords = JSON.parse(localStorage.getItem(keys.known) || '[]') as string[]
    const unknownWords = JSON.parse(localStorage.getItem(keys.unknown) || '[]') as string[]

    knownWords.forEach((word) => {
      wordsToInsert.push({
        user_id: user.id,
        word,
        language: language as WordLanguage,
        status: 'known',
      })
    })

    unknownWords.forEach((word) => {
      wordsToInsert.push({
        user_id: user.id,
        word,
        language: language as WordLanguage,
        status: 'unknown',
      })
    })
  }

  if (wordsToInsert.length === 0) {
    return { data: [], error: null }
  }

  const { data, error } = await supabase
    .from('words')
    .upsert(wordsToInsert, {
      onConflict: 'user_id,word,language',
    })

  return { data, error }
}
