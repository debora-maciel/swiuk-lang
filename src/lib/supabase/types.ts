// Database types - Update these based on your Supabase tables
// You can generate these automatically using: npx supabase gen types typescript

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Example database schema for your word learning app
export interface Database {
  public: {
    Tables: {
      words: {
        Row: {
          id: string
          user_id: string
          word: string
          translation: string
          language: 'english' | 'german' | 'french'
          status: 'known' | 'unknown'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          word: string
          translation: string
          language: 'english' | 'german' | 'french'
          status?: 'known' | 'unknown'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          word?: string
          translation?: string
          language?: 'english' | 'german' | 'french'
          status?: 'known' | 'unknown'
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          theme: 'light' | 'dark' | 'system'
          ui_language: string
          target_language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: 'light' | 'dark' | 'system'
          ui_language?: string
          target_language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: 'light' | 'dark' | 'system'
          ui_language?: string
          target_language?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
