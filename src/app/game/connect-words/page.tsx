'use client';
import { IoArrowBackCircle } from 'react-icons/io5';
import data from '../../data/eng_germ_dict.json';
import { useEffect, useState } from 'react';
import { utils } from '@/utils/utils';
import Link from 'next/link';

export default function ConnectWordsPage() {
  const [pairs, setPairs] = useState<[string, string][]>([]);
  const [germanWords, setGermanWords] = useState<string[]>([]);
  const [englishWords, setEnglishWords] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ german: string | null; english: string | null }>({ german: null, english: null });
  const [matches, setMatches] = useState<[string, string][]>([]);
  const [matchColors, setMatchColors] = useState<{ [key: string]: string }>({});

  function setup() {
    const allEntries = Object.entries(data) as [string, string | string[]][];
    const filtered = allEntries.filter(([_, val]) => typeof val === 'string');
    const randomItems = filtered.sort(() => 0.5 - Math.random()).slice(0, 8);

    const mappedPairs: [string, string][] = randomItems.map(([eng, ger]) => [ger as string, eng]);
    const shuffledGerman = mappedPairs.map(p => p[0]).sort(() => 0.5 - Math.random());
    const shuffledEnglish = mappedPairs.map(p => p[1]).sort(() => 0.5 - Math.random());

    setPairs(mappedPairs);
    setGermanWords(shuffledGerman);
    setEnglishWords(shuffledEnglish);
  }

  useEffect(() => {
    setup();
  }, []);

  const handleSelect = (word: string, type: 'german' | 'english') => {
    const updated = { ...selected, [type]: word };

    if (updated.german && updated.english) {
      const found = pairs.find(([g, e]) => g === updated.german && e === updated.english);
      if (found) {
        const newColor = utils.getRandomColor();
        setMatches([...matches, found]);
        setMatchColors(prev => ({
          ...prev,
          [found[0]]: newColor,
          [found[1]]: newColor,
        }));
        utils.playSound('/correct.mp3');
      } else {
        utils.playSound('/wrong.mp3');
      }
      setSelected({ german: null, english: null });
    } else {
      setSelected(updated);
    }
  };

  return (
    <div className="text-center bg-white py-6 min-h-screen">
      <div className="pl-5 text-xl pt-1 montserrat-black w-full text-left flex items-center justify-between px-4 mb-3">
        <Link href={'/'} className="text-black text-5xl">
          <IoArrowBackCircle />
        </Link>
        <div>
          Connect Words
        </div>
      </div>
      <div className='flex justify-end px-6 pb-2'>
        <div className='border text-black/80 border-black/10 w-min flex flex-col rounded-lg px-2 py-1'>
          <div className='text-xs'>Matches</div>
          <div className='font-bold text-lg'>
            {matches.length}
          </div>
        </div>
      </div>
      <hr className="text-black/10" />
      <div className="flex items-start justify-center gap-5 px-4 bg-white">
        <div>
          {germanWords.map((word, i) => {
            const matchedColor = matchColors[word];
            return (
              <div
                key={i}
                onClick={() => handleSelect(word, 'german')}
                className={`cursor-pointer py-2 px-3 my-4 border text-black/80 border-black/10 rounded-full shadow-md text-base font-medium transform transition duration-300 hover:scale-80 
                  ${matchedColor
                    ? `pointer-events-none`
                    : selected.german === word ? 'bg-slate-200 scale-80 border-dashed' : ' font-bold'
                  }
                `}
                style={{
                  opacity: matchedColor ? 0.7 : 1,
                  backgroundColor: matchedColor || ''
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
                className={`cursor-pointer py-2 px-3 font-light border border-black/10 my-4 rounded-full shadow-md text-base font-medium transform transition duration-300 hover:scale-80 
                  ${matchedColor
                    ? 'pointer-events-none opacity-85'
                    : selected.english === word ? 'bg-gray-200 scale-80 border-dashed' : '  font-bold'
                  }
                  `}
                style={{
                  opacity: matchedColor ? 0.7 : 1,
                  backgroundColor: matchedColor || '',
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
      </div>
      <hr className='my-4 text-black/10' />
      <button onClick={setup}
        // disabled={matches.length != pairs.length}
        // style={{ opacity: matches.length != pairs.length ? 0.5 : 1 }}
        className='bg-black text-white px-10 mt-2 rounded-full py-2'>Next</button>
    </div>
  );
}
