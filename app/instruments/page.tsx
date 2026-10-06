import { getChats, createChat } from '@/lib/actions';
import { createClient } from '@/lib/supabase/server';
import { createMessage, getMessages } from '@/lib/actions';

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Test createChat
  const { data: newChat, error: createError } = await createChat(
    'Test Chat',
    'llama-3.3-70b',
  );

  // Test getChats
  const { data: chats, error: chatsError } = await getChats();

  // Test createMessage using the new chat id
  const { data: newMessage, error: messageError } = await createMessage({
    chatId: newChat?.id ?? '',
    role: 'user',
    content: 'Test message from instruments page',
    model: 'llama-3.3-70b',
    tokens: 10,
  });

  // Test getMessages
  const { data: messages, error: messagesError } = await getMessages(
    newChat?.id ?? '',
  );

  return (
    <main style={{ padding: '24px', fontFamily: 'monospace' }}>
      <h1>DB Validation</h1>

      <section>
        <h2>Auth User</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </section>

      <section>
        <h2>Create Chat</h2>
        {createError && <p style={{ color: 'red' }}>Error: {createError}</p>}
        <pre>{JSON.stringify(newChat, null, 2)}</pre>
      </section>

      <section>
        <h2>Get Chats</h2>
        {chatsError && <p style={{ color: 'red' }}>Error: {chatsError}</p>}
        <pre>{JSON.stringify(chats, null, 2)}</pre>
      </section>
      <section>
        <h2>Create Message</h2>
        {messageError && <p style={{ color: 'red' }}>Error: {messageError}</p>}
        <pre>{JSON.stringify(newMessage, null, 2)}</pre>
      </section>

      <section>
        <h2>Get Messages</h2>
        {messagesError && (
          <p style={{ color: 'red' }}>Error: {messagesError}</p>
        )}
        <pre>{JSON.stringify(messages, null, 2)}</pre>
      </section>
    </main>
  );
}
