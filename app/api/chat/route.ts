import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';
import { DEFAULT_MODEL, isAllowedModel } from '@/lib/models';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model?: string } =
    await req.json();

  // Validate model against allowlist — never trust raw client input
  const resolvedModel = model && isAllowedModel(model) ? model : DEFAULT_MODEL;

  const result = streamText({
    model: resolvedModel,
    instructions: `You are Hyperion, an AI assistant built for professionals.
    You help users summarize meetings, emails, and documents, extract insights,
    and create structured action plans. Be concise, accurate, and professional.`,
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
