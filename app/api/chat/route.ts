import { createClient } from '@/lib/supabase/server';
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from 'ai';
import { DEFAULT_CHAT_MODEL, isAllowedModel } from '@/lib/models';

export const maxDuration = 60;

const MAX_MESSAGES = 50;
const MAX_PAYLOAD_BYTES = 50 * 1024 * 1024; // file upload size

function errorResponse(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  // ── Auth ──────────────────────────────────────────────────────────────────
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) return errorResponse('Unauthorized', 401);

  // ── Parse ─────────────────────────────────────────────────────────────────
  let body: { messages: UIMessage[]; model?: string; chatId: string };
  try {
    body = await req.json();
  } catch {
    return errorResponse('Invalid request body', 400);
  }

  const { messages, model, chatId } = body;

  // ── Validate chatId ───────────────────────────────────────────────────────
  if (!chatId || typeof chatId !== 'string') {
    return errorResponse('chatId is required', 400);
  }

  // ── Ownership ─────────────────────────────────────────────────────────────
  const { error: chatError } = await supabase
    .from('chats')
    .select('id')
    .eq('id', chatId)
    .eq('user_id', user.id)
    .single();
  if (chatError) return errorResponse('Chat not found', 404);

  // ── Validate messages ─────────────────────────────────────────────────────
  if (!Array.isArray(messages) || messages.length === 0) {
    return errorResponse('messages must be a non-empty array', 400);
  }
  if (messages.length > MAX_MESSAGES) {
    return errorResponse(`Message limit exceeded (max ${MAX_MESSAGES})`, 400);
  }

  // ── Payload size ──────────────────────────────────────────────────────────
  const payloadBytes = new TextEncoder().encode(
    JSON.stringify(messages),
  ).length;
  if (payloadBytes > MAX_PAYLOAD_BYTES) {
    return errorResponse('Request payload too large', 413);
  }

  // ── Model — 400 for explicit invalid; default only when omitted ───────────
  if (model !== undefined && !isAllowedModel(model)) {
    return errorResponse(`Invalid model: ${model}`, 400);
  }
  const resolvedModel = model ?? DEFAULT_CHAT_MODEL;

  // ── Stream ────────────────────────────────────────────────────────────────
  try {
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: resolvedModel,
      abortSignal: req.signal,
      system: `You are Hyperion, an AI assistant. You help users summarize meetings, emails, and documents, extract insights, and create structured action plans. Be concise, accurate, and professional.`,
      messages: modelMessages,
      onFinish: async ({ text, finishReason }) => {
        // Persist only completed responses; skip aborted or errored streams
        if ((finishReason === 'stop' || finishReason === 'length') && text) {
          await supabase.from('messages').insert({
            chat_id: chatId,
            user_id: user.id,
            role: 'assistant',
            content: text,
            model: resolvedModel,
          });
        }
      },
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (err) {
    console.error('[api/chat] error:', err);
    return errorResponse('Failed to process request', 502);
  }
}
