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

  data.forEach((row: { language: string; status: string }) => {
    const lang = row.language as WordLanguage
    const status = row.status as WordStatus
    if (counts[lang]) {
      counts[lang][status]++
    }
  })

  return { ...counts, error: null }
}

export async function getWordsByLanguage(language: WordLanguage) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { known: [] as string[], unknown: [] as string[], error: 'Not authenticated' }
  }

  const { data, error } = await supabase
    .from('words')
    .select('word, status')
    .eq('user_id', user.id)
    .eq('language', language)

  if (error || !data) {
    return { known: [] as string[], unknown: [] as string[], error }
  }

  const known = data.filter((w: { word: string; status: string }) => w.status === 'known').map((w: { word: string; status: string }) => w.word)
  const unknown = data.filter((w: { word: string; status: string }) => w.status === 'unknown').map((w: { word: string; status: string }) => w.word)

  return { known, unknown, error: null }
}

export async function deleteWordsByStatus(
  language: WordLanguage,
  status: WordStatus
) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('words')
    .delete()
    .eq('user_id', user.id)
    .eq('language', language)
    .eq('status', status)

  return { error }
}

export async function deleteWord(
  word: string,
  language: WordLanguage
) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('words')
    .delete()
    .eq('user_id', user.id)
    .eq('word', word)
    .eq('language', language)

  return { error }
}

