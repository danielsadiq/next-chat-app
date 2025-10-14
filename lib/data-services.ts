import { MessageType } from "@/types";
import { supabase } from "./supabase";

interface ConversationType {
  id: string;
  type: string;
  title: string;
  created_at: string;
  last_message_id: string;
  last_message: {
    content: string;
    created_at: string;
    sender_id: string;
    sender: {
      display_name: string;
    };
  } | null;
  participants: {
    user_id: string;
    profiles: {
      email: string;
      id: string;
      display_name: string;
    };
  }[];
}

interface LastMessage {
  content: string;
  sender: string;
  timestamp: string;
}

interface ConversationSummary {
  id: string;
  name: string;
  type: string;
  created_at: string;
  lastMessage: LastMessage | null;
}

export async function getUserChats(
  email: string
): Promise<ConversationSummary[]> {
  const { data, error } = await supabase
    .from("participants")
    .select(
      `
      conversation_id,
      conversations (
        id,
        type,
        title,
        created_at,
        participants (
          profiles (email,display_name)
        )
      ),
      profiles!inner(email)
    `
    )
    .eq("profiles.email", email); // 👈 filter directly by email

  if (error) console.error(error);
  // console.log(data);

  // Post-process results:
  const conversations = await Promise.allSettled(
    (data?? []).map(async (part) => {
      const c: ConversationType = part.conversations;

      const { data: lastMsg } = await supabase
        .from("messages")
        .select(
          `
      id,
      content,
      created_at,
      sender_id,
      sender:profiles!messages_sender_id_fkey(display_name)
      `
        )
        .eq("conversation_id", c.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      const lastMessage = lastMsg
        ? {
            content: lastMsg.content,
            sender: lastMsg.sender[0]?.display_name ?? "Unknown",
            timestamp: lastMsg.created_at,
          }
        : null;
      const other = c.participants
        ?.map((p) => p.profiles)
        .find((p) => p.email !== part.profiles.email);

      const name =
        c.type === "private" ? other?.display_name ?? "Unknown" : c.title;

      return {
        id: c.id,
        name,
        type: c.type,
        created_at: c.created_at,
        lastMessage: lastMessage,
      } as ConversationSummary;
    })
  );
  console.log(conversations)
  return (
    conversations
      .filter(
        (r): r is PromiseFulfilledResult<ConversationSummary> =>
          r.status === "fulfilled"
      )
      .map((r) => r.value)
      // 4️⃣ Sort conversations by latest activity
      .sort((a, b) => {
        const aTime = a.lastMessage?.timestamp || a.created_at;
        const bTime = b.lastMessage?.timestamp || b.created_at;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      })
  );
}

export async function getMessages(id: string) {
  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      id,
      content,
      created_at,
      sender_id,
      sender:profiles (
        id,
        display_name,
        avatar_url
      )
    `
    )
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
  // console.log(data);
  return data;
}

export async function createMessage(newMessage: MessageType) {
  const { error } = await supabase
    .from("messages")
    .insert(newMessage)
    .select();
  if (error) {
    console.error(error);
  }
}


export async function getConversationDetails(conversationId:string){
  const { data: conversation, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("id", conversationId)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return conversation;
}