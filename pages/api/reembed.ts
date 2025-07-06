import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { chunkText } from '@/lib/chunker';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Get all documents
    const { data, error } = await supabase.from('documents').select('*');
    if (error) throw error;

    // 2. For each document, break it into chunks
    for (const doc of data) {
      const chunks = chunkText(doc.content, 500); // chunk size 500 chars

      // 3. Embed each chunk and store
      for (const chunk of chunks) {
        const embeddingResponse = await openai.embeddings.create({
          model: 'text-embedding-ada-002',
          input: chunk,
        });
        const [{ embedding }] = embeddingResponse.data;

        await supabase.from('documents').insert({
          content: chunk,
          embedding,
        });
      }

      // 4. Optionally, remove old doc
      await supabase.from('documents').delete().eq('id', doc.id);
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Reembed error:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}



