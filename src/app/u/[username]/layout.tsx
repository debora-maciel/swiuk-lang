import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ username: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name")
    .eq("username", username)
    .single();

  if (!profile) {
    return {
      title: "User Not Found | Swiuk",
      description: "This profile does not exist.",
    };
  }

  const displayName = profile.display_name || profile.username;
  const title = `${displayName}'s Language Learning Profile | Swiuk`;
  const description = `Check out ${displayName}'s vocabulary progress on Swiuk - tracking words learned in English, German, and French with CEFR levels.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `https://swiuk.com/u/${username}`,
      siteName: "Swiuk",
      images: [
        {
          url: "/og-profile.png",
          width: 1200,
          height: 630,
          alt: `${displayName}'s Swiuk Profile`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-profile.png"],
    },
  };
}

export default function ProfileLayout({ children }: Props) {
  return (
    <div className="profile-layout">
      {children}
    </div>
  );
}
