import Groq from 'groq-sdk';
import Groq from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
  realtime: { transport: ws }
});
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function parseIntent(message, history) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 300,
    messages: [
      {
        role: 'system',
        content: `You are a real estate search assistant. Extract search filters from the user message.
Return ONLY valid JSON, no extra text:
{
  "minPrice": number or null,
  "maxPrice": number or null,
  "bedrooms": number or null,
  "city": string or null,
  "type": "apartment"|"house"|"villa"|"studio" or null,
  "reply": "short friendly sentence about what you are searching for"
}`
      },
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ]
  });
  const clean = response.choices[0].message.content.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

async function queryDatabase(filters) {
  let query = supabase.from('properties').select('*').order('price').limit(6);
  if (filters.minPrice) query = query.gte('price', filters.minPrice);
  if (filters.maxPrice) query = query.lte('price', filters.maxPrice);
  if (filters.bedrooms) query = query.eq('bedrooms', filters.bedrooms);
  if (filters.city) query = query.ilike('city', `%${filters.city}%`);
  if (filters.type) query = query.eq('type', filters.type);
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function searchProperties(message, history) {
  const filters = await parseIntent(message, history);
  const properties = await queryDatabase(filters);
  return { reply: filters.reply, filters, properties, count: properties.length };
}
