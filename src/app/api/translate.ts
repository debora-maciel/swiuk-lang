// pages/api/translate.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text, source = 'de', target = 'en' } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional: Add 'Accept': 'application/json' if needed
      },
      body: JSON.stringify({
        q: text,
        source,
        target,
        format: 'text',
      }),
    });

    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    const data = await response.json();

    res.status(200).json({ translation: data.translatedText });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed', details: error });
  }
}
