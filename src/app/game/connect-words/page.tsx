'use client';

import { useEffect, useState } from 'react';
import data from './data/eng_germ_dict.json';

const getRandomColor = () => {
  const r = 100 + Math.floor(Math.random() * 155);
  const g = 100 + Math.floor(Math.random() * 155);
  const b = 100 + Math.floor(Math.random() * 155);
  return `rgb(${r}, ${g}, ${b})`;
};

const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.play();
};

export default function ConnectWordsPage() {
  const [pairs, setPairs] = useState<[string, string][]>([]);
  const [germanWords, setGermanWords] = useState<string[]>([]);
  const [englishWords, setEnglishWords] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ german: string | null; english: string | null }>({ german: null, english: null });
  const [matches, setMatches] = useState<[string, string][]>([]);
  const [matchColors, setMatchColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const allEntries = Object.entries(data) as [string, string | string[]][];
    const filtered = allEntries.filter(([_, val]) => typeof val === 'string');
    const randomItems = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);

    const mappedPairs: [string, string][] = randomItems.map(([eng, ger]) => [ger as string, eng]);
    const shuffledGerman = mappedPairs.map(p => p[0]).sort(() => 0.5 - Math.random());
    const shuffledEnglish = mappedPairs.map(p => p[1]).sort(() => 0.5 - Math.random());

    setPairs(mappedPairs);
    setGermanWords(shuffledGerman);
    setEnglishWords(shuffledEnglish);
  }, []);

  const handleSelect = (word: string, type: 'german' | 'english') => {
    const updated = { ...selected, [type]: word };

    if (updated.german && updated.english) {
      const found = pairs.find(([g, e]) => g === updated.german && e === updated.english);
      if (found) {
        const newColor = getRandomColor();
        setMatches([...matches, found]);
        setMatchColors(prev => ({
          ...prev,
          [found[0]]: newColor,
          [found[1]]: newColor,
        }));
        playSound('/correct.mp3');
      } else {
        playSound('/wrong.mp3');
      }
      setSelected({ german: null, english: null });
    } else {
      setSelected(updated);
    }
  };

  return (
    <div className="text-center p-6 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Connect Words</h1>
      {selected.german && selected.german}
      {selected.english && selected.english}
      <div className="flex items-start justify-center gap-12 flex-wrap">
        <div>
          {germanWords.map((word, i) => {
            const matchedColor = matchColors[word];
            return (
              <div
                key={i}
                onClick={() => handleSelect(word, 'german')}
                className={`cursor-pointer p-3 my-2 rounded-xl border-b-4 shadow-md text-sm font-medium transform transition duration-300 hover:scale-80 
                  ${matchedColor
                    ? `pointer-events-none opacity-90`
                    : selected.german === word ? 'bg-orange-200 border-orange-700 scale-85' : 'bg-white font-bold'
                  }
                `}
                style={{
                  opacity: matchedColor ? 0.4 : 1,
                  backgroundColor: matchedColor || '',
                  borderColor: 'black',
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
        <div>
          {englishWords.map((word, i) => {
            const matchedColor = matchColors[word];
            return (
              <div
                key={i}
                onClick={() => handleSelect(word, 'english')}
                className={`cursor-pointer p-3 my-2 rounded-xl border-b-4 shadow-md text-sm font-medium transform transition duration-300 hover:scale-80 
                  ${matchedColor
                    ? 'pointer-events-none opacity-85'
                    : selected.english === word ? 'bg-orange-200 border-orange-700  scale-90 ' : 'bg-white font-bold'
                  }
                  `}
                style={{
                  opacity: matchedColor ? 0.4 : 1,
                  backgroundColor: matchedColor || '',
                  borderColor: 'black',
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="mt-8 text-lg">
        ✅ Matches: {matches.length} / {pairs.length}
      </div> */}
    </div>
  );
}
