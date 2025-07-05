import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, agent_id } = req.body;

  try {
    console.log("Incoming message:", message);

    // 1️⃣ Embed the question
    const embeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
    });
    const [{ embedding }] = embeddingResponse.data;
    console.log("Generated embedding:", embedding.slice(0,10));  // just first 10 for debug

    // 2️⃣ Query the knowledge base with the correct RPC
    const { data: contexts, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding,
      match_threshold: 0.75,
      match_count: 10,
    });

    if (error) {
      console.error("Supabase RPC error:", error);
      return res.status(500).json({ error: 'Error searching knowledge base' });
    }
    console.log("Found contexts:", contexts);

    const contextText = contexts?.map(c => c.content).join('\n\n') || "";
    console.log("Context text for GPT:", contextText.slice(0,300)); // preview only

    // 3️⃣ Create the GPT answer
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a helpful, logical, compliance-aware assistant for insurance agents. Never share more than 3 phone numbers per day.`
        },
        {
          role: 'user',
          content: `Answer this question using the following context:\n${contextText}\n\nQuestion: ${message}`
        }
      ],
    });

    const answer = completion.choices[0].message.content;
    console.log("GPT answer:", answer);

    // 4️⃣ Save to chat_history
    const { error: insertError } = await supabase.from('chat_history').insert({
      agent_id,
      question: message,
      answer,
      timestamp: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Error saving chat history:", insertError);
    } else {
      console.log("Chat history stored successfully.");
    }

    // 5️⃣ Return to frontend
    res.status(200).json({ answer });

  } catch (err) {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

