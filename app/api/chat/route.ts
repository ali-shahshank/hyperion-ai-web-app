import { groq } from '@ai-sdk/groq';
import { streamText, toTextStream, createTextStreamResponse } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: groq('llama-3.3-70b-versatile'),
    instructions: `You are Hyperion, an AI assistant built for professionals. 
    You help users summarize meetings, emails, and documents, extract insights, 
    and create structured action plans. Be concise, accurate, and professional.`,
    messages,
  });

  return createTextStreamResponse({
    stream: toTextStream({ stream: result.stream }),
  });
}
