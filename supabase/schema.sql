-- Supabase Schema for Swiuk Language Learning App
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- WORDS TABLE
-- Stores user's known and unknown words
-- ============================================
create table if not exists public.words (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  word text not null,
  translation text,
  language text not null check (language in ('english', 'german', 'french')),
  status text not null default 'unknown' check (status in ('known', 'unknown')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Ensure unique word per user per language
  unique(user_id, word, language)
);

-- Index for faster queries
create index if not exists words_user_id_idx on public.words(user_id);
create index if not exists words_language_idx on public.words(language);
create index if not exists words_status_idx on public.words(status);

-- ============================================
-- USER PREFERENCES TABLE
-- Stores user settings (theme, language, etc.)
-- ============================================
create table if not exists public.user_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  theme text default 'system' check (theme in ('light', 'dark', 'system')),
  ui_language text default 'en',
  target_language text default 'german',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster queries
create index if not exists user_preferences_user_id_idx on public.user_preferences(user_id);

-- ============================================
-- GAME MATCHES TABLE
-- Stores word connection game results
-- ============================================
create table if not exists public.game_matches (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  word text not null,
  matched_word text not null,
  language text not null check (language in ('english', 'german', 'french')),
  score integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster queries
create index if not exists game_matches_user_id_idx on public.game_matches(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Users can only access their own data
-- ============================================

-- Enable RLS on all tables
alter table public.words enable row level security;
alter table public.user_preferences enable row level security;
alter table public.game_matches enable row level security;

-- Words policies
create policy "Users can view own words"
  on public.words for select
  using (auth.uid() = user_id);

create policy "Users can insert own words"
  on public.words for insert
  with check (auth.uid() = user_id);

create policy "Users can update own words"
  on public.words for update
  using (auth.uid() = user_id);

create policy "Users can delete own words"
  on public.words for delete
  using (auth.uid() = user_id);

-- User preferences policies
create policy "Users can view own preferences"
  on public.user_preferences for select
  using (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on public.user_preferences for insert
  with check (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.user_preferences for update
  using (auth.uid() = user_id);

-- Game matches policies
create policy "Users can view own game matches"
  on public.game_matches for select
  using (auth.uid() = user_id);

create policy "Users can insert own game matches"
  on public.game_matches for insert
  with check (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Triggers for updated_at
create trigger set_words_updated_at
  before update on public.words
  for each row execute function public.handle_updated_at();

create trigger set_user_preferences_updated_at
  before update on public.user_preferences
  for each row execute function public.handle_updated_at();

-- Function to create user preferences on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_preferences (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create preferences for new users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================
-- PROFILES TABLE
-- Stores public user profiles for sharing
-- ============================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster username lookups
create index if not exists profiles_username_idx on public.profiles(username);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles policies (public profiles are viewable by everyone)
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Trigger for updated_at on profiles
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Update handle_new_user function to also create profile
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.user_preferences (user_id)
  values (new.id);
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
