"use client"

import { useState } from "react";
import { FiAward, FiShare2, FiCheck } from "react-icons/fi";
import { TiSortAlphabeticallyOutline } from "react-icons/ti";

const cefrLevels = [
  { level: 'A1', min: 0, max: 500, color: '#22c55e', description: 'Beginner' },
  { level: 'A2', min: 500, max: 1000, color: '#84cc16', description: 'Elementary' },
  { level: 'B1', min: 1000, max: 2000, color: '#eab308', description: 'Intermediate' },
  { level: 'B2', min: 2000, max: 4000, color: '#f97316', description: 'Upper Intermediate' },
  { level: 'C1', min: 4000, max: 8000, color: '#ef4444', description: 'Advanced' },
  { level: 'C2', min: 8000, max: 16000, color: '#a855f7', description: 'Mastery' },
];

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

const GermanFlag = () => (
  <div className="w-10 h-10 rounded-full overflow-hidden flex flex-col shadow-lg">
    <div className="flex-1 bg-black"></div>
    <div className="flex-1 bg-[#DD0000]"></div>
    <div className="flex-1 bg-[#FFCC00]"></div>
  </div>
);

const EnglishFlag = () => (
  <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white relative shadow-lg">
    <div className="absolute top-1/2 left-0 right-0 h-[4px] bg-[#CE1124] -translate-y-1/2"></div>
    <div className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-[#CE1124] -translate-x-1/2"></div>
  </div>
);

const FrenchFlag = () => (
  <div className="w-10 h-10 rounded-full overflow-hidden flex shadow-lg">
    <div className="flex-1 bg-[#002395]"></div>
    <div className="flex-1 bg-white"></div>
    <div className="flex-1 bg-[#ED2939]"></div>
  </div>
);

const getCurrentLevel = (wordCount: number) => {
  for (let i = cefrLevels.length - 1; i >= 0; i--) {
    if (wordCount >= cefrLevels[i].min) {
      return cefrLevels[i];
    }
  }
  return cefrLevels[0];
};

const getProgressToNextLevel = (wordCount: number) => {
  const current = getCurrentLevel(wordCount);
  if (current.level === 'C2') return 100;
  const progressInLevel = wordCount - current.min;
  const levelRange = current.max - current.min;
  return Math.min(Math.round((progressInLevel / levelRange) * 100), 100);
};

interface ProfileClientProps {
  profile: UserProfile;
  stats: UserStats;
}

export default function ProfileClient({ profile, stats }: ProfileClientProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const totalWords = stats.english.known + stats.german.known + stats.french.known;
  const displayName = profile.display_name || profile.username;
  const memberSince = new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const languages = [
    { name: 'English', key: 'english' as const, flag: <EnglishFlag />, color: '#3b82f6' },
    { name: 'German', key: 'german' as const, flag: <GermanFlag />, color: '#f59e0b' },
    { name: 'French', key: 'french' as const, flag: <FrenchFlag />, color: '#ef4444' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Share Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-all"
          >
            {copied ? <FiCheck size={18} /> : <FiShare2 size={18} />}
            <span className="text-sm">{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={displayName}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/30 shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <h1 className="text-3xl font-bold text-white mb-1">{displayName}</h1>
            <p className="text-white/60 text-sm">@{profile.username}</p>
            <p className="text-white/40 text-xs mt-1">Learning since {memberSince}</p>
          </div>

          {/* Total Words */}
          <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl p-6 mb-8 text-center border border-white/10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <TiSortAlphabeticallyOutline className="text-white/60" size={28} />
              <span className="text-white/60 text-sm uppercase tracking-wider">Total Words Learned</span>
            </div>
            <div className="text-5xl md:text-6xl font-bold text-white">{totalWords.toLocaleString()}</div>
          </div>

          {/* Languages Grid */}
          <div className="space-y-4 mb-8">
            {languages.map((lang) => {
              const wordCount = stats[lang.key].known;
              const level = getCurrentLevel(wordCount);
              const progress = getProgressToNextLevel(wordCount);

              return (
                <div
                  key={lang.key}
                  className="bg-white/5 rounded-2xl p-4 border border-white/10"
                >
                  <div className="flex items-center gap-4">
                    {lang.flag}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{lang.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white/60 text-sm">{wordCount} words</span>
                          <div
                            className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: level.color }}
                          >
                            {level.level}
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${progress}%`, backgroundColor: level.color }}
                        />
                      </div>
                      <div className="text-white/40 text-xs mt-1">{level.description}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CEFR Levels Legend */}
          <div className="border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <FiAward className="text-white/60" size={16} />
              <span className="text-white/60 text-xs uppercase tracking-wider">CEFR Levels</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {cefrLevels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                  style={{ backgroundColor: lvl.color + '30', color: lvl.color }}
                >
                  <span className="font-bold">{lvl.level}</span>
                  <span className="text-white/60 hidden sm:inline">({lvl.min}+)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <p className="text-white/40 text-xs">
              Learning languages with <span className="text-purple-400 font-medium">Swiuk</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
