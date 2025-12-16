import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import ProfileClient from "./ProfileClient";

interface UserStats {
  english: { known: number; unknown: number };
  german: { known: number; unknown: number };
  french: { known: number; unknown: number };
}

interface UserProfile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

async function getProfileData(username: string) {
  const supabase = createAdminClient();

  // Get the user profile by username
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (profileError || !profileData) {
    return null;
  }

  // Get their word counts using admin client (bypasses RLS)
  const { data: wordsData } = await supabase
    .from('words')
    .select('language, status')
    .eq('user_id', profileData.id);

  const counts: UserStats = {
    english: { known: 0, unknown: 0 },
    german: { known: 0, unknown: 0 },
    french: { known: 0, unknown: 0 },
  };

  if (wordsData) {
    wordsData.forEach((row: { language: string; status: string }) => {
      const lang = row.language as 'english' | 'german' | 'french';
      const status = row.status as 'known' | 'unknown';
      if (counts[lang]) {
        counts[lang][status]++;
      }
    });
  }

  return {
    profile: profileData as UserProfile,
    stats: counts,
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const data = await getProfileData(username);

  if (!data) {
    notFound();
  }

  return <ProfileClient profile={data.profile} stats={data.stats} />;
}
