'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { Database } from '@/lib/supabase/types';

type Chat = Database['public']['Tables']['chats']['Row'];
type Message = Database['public']['Tables']['messages']['Row'];
type Upload = Database['public']['Tables']['uploads']['Row'];
type ActionPlan = Database['public']['Tables']['action_plans']['Row'];
type Task = Database['public']['Tables']['tasks']['Row'];

// ==========================================
// CHATS
// ==========================================
export async function getChats() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return { error: error.message };
  return { data };
}

export async function getChat(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('chats')
    .select('*')
    .eq('id', id)
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function createChat(title?: string, model?: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('chats')
    .insert({ user_id: user.id, title: title ?? 'New Chat', model })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function updateChatTitle(id: string, title: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('chats').update({ title }).eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteChat(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('chats').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

// ==========================================
// MESSAGES
// ==========================================
export async function getMessages(chatId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });
  if (error) return { error: error.message };
  return { data };
}

export async function createMessage({
  chatId,
  role,
  content,
  model,
  tokens,
}: {
  chatId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  model?: string;
  tokens?: number;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('messages')
    .insert({ chat_id: chatId, user_id: user.id, role, content, model, tokens })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

// ==========================================
// UPLOADS
// ==========================================
export async function getUploads(chatId?: string) {
  const supabase = await createClient();
  const query = supabase
    .from('uploads')
    .select('*')
    .order('created_at', { ascending: false });
  if (chatId) query.eq('chat_id', chatId);
  const { data, error } = await query;
  if (error) return { error: error.message };
  return { data };
}

export async function createUpload({
  chatId,
  fileName,
  fileType,
  fileSize,
  filePath,
  extractedText,
}: {
  chatId?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  filePath: string;
  extractedText?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('uploads')
    .insert({
      user_id: user.id,
      chat_id: chatId,
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize,
      file_path: filePath,
      extracted_text: extractedText,
    })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function deleteUpload(id: string, filePath: string) {
  const supabase = await createClient();

  // Delete from storage
  const bucket = filePath.startsWith('images/') ? 'images' : 'documents';
  await supabase.storage.from(bucket).remove([filePath]);

  // Delete metadata from db
  const { error } = await supabase.from('uploads').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

// ==========================================
// ACTION PLANS
// ==========================================
export async function getActionPlans(chatId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('action_plans')
    .select('*, tasks(*)')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: false });
  if (error) return { error: error.message };
  return { data };
}

export async function createActionPlan({
  chatId,
  title,
  summary,
}: {
  chatId: string;
  title: string;
  summary?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('action_plans')
    .insert({ user_id: user.id, chat_id: chatId, title, summary })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function deleteActionPlan(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('action_plans').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

// ==========================================
// TASKS
// ==========================================
export async function getTasks(actionPlanId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('action_plan_id', actionPlanId)
    .order('created_at', { ascending: true });
  if (error) return { error: error.message };
  return { data };
}

export async function createTask({
  actionPlanId,
  title,
  description,
  dueDate,
}: {
  actionPlanId: string;
  title: string;
  description?: string;
  dueDate?: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: user.id,
      action_plan_id: actionPlanId,
      title,
      description,
      due_date: dueDate,
    })
    .select()
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function updateTaskStatus(
  id: string,
  status: 'pending' | 'in_progress' | 'completed',
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('tasks')
    .update({ status })
    .eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('tasks').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}
