// Vercel AI Gateway model strings — format: 'provider/model-id'
// Manage at: https://vercel.com/~/ai/ai-gateway/models

// ── Text / Chat models (served via Groq) ────────────────────────────────────
export const CHAT_MODELS = [
  {
    id: 'openai/gpt-oss-120b',
    label: 'GPT OSS 120B',
    description: 'Best for reasoning and complex tasks',
  },
  {
    id: 'openai/gpt-oss-20b',
    label: 'GPT OSS 20B',
    description: 'Fast responses, lightweight tasks',
  },
] as const;

// ── Vision models (image input → text analysis) ──────────────────────────────
export const VISION_MODELS = [
  {
    id: 'google/gemini-2.5-flash-image',
    label: 'Gemini 2.5 Flash',
    description: 'Analyze uploaded images, charts, and screenshots',
  },
] as const;

// ── Image generation models (text prompt → image output) ─────────────────────
export const IMAGE_GEN_MODELS = [
  {
    id: 'bfl/flux-kontext-pro',
    label: 'FLUX Kontext Pro',
    description: 'Generate images from text prompts',
  },
] as const;

// ── Combined allowlist for route validation ───────────────────────────────────
export const ALL_MODELS = [
  ...CHAT_MODELS,
  ...VISION_MODELS,
  ...IMAGE_GEN_MODELS,
] as const;

export type ChatModelId = (typeof CHAT_MODELS)[number]['id'];
export type VisionModelId = (typeof VISION_MODELS)[number]['id'];
export type ImageGenModelId = (typeof IMAGE_GEN_MODELS)[number]['id'];
export type ModelId = (typeof ALL_MODELS)[number]['id'];

export const DEFAULT_CHAT_MODEL: ChatModelId = 'openai/gpt-oss-120b';
export const DEFAULT_VISION_MODEL: VisionModelId =
  'google/gemini-2.5-flash-image';
export const DEFAULT_IMAGE_GEN_MODEL: ImageGenModelId = 'bfl/flux-kontext-pro';

// Legacy alias — used by app/api/chat/route.ts
export const DEFAULT_MODEL = DEFAULT_CHAT_MODEL;

const ALLOWED_MODEL_IDS = ALL_MODELS.map((m) => m.id) as ModelId[];

export const isAllowedModel = (m: string): m is ModelId =>
  ALLOWED_MODEL_IDS.includes(m as ModelId);

export const isChatModel = (m: string): m is ChatModelId =>
  CHAT_MODELS.map((x) => x.id as string).includes(m);
