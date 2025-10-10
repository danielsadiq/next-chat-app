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
    }[];
  }[];
    participants: {
        user_id: string;
        profiles: {
            id: string;
            display_name: string;
        }[];
    }[];
}
[];

export const getUsers = async function () {
  const { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return profiles;
};

export async function getUser(id: string) {
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return profile;
}

export async function getUserChats(email: string) {
  // Step 1️⃣: Find Daniel’s user ID
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (userError || !user) throw userError || new Error("User not found");

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
      last_message_id,
      last_message:messages!fk_last_message (
        content,
        created_at,
        sender_id,
        sender:profiles!messages_sender_id_fkey (
          display_name
        )
      ),
      participants (
        user_id,
        profiles (
          id,
          display_name
        )
      )
    )
  `
    )
    .eq("user_id", user.id); // must be string UUID

  if (error) console.error(error);

  // Post-process results:
  const conversations = data?.map((part) => {
    const c: ConversationType = part.conversations;
    if (c.type === "private") {
      const other = c.participants
        .map((p) => p.profiles)
        .find((p) => p.id !== user.id);
      return {
        id: c.id,
        name: other?.display_name || "Unknown",
        type: "private",
        created_at: c.created_at,
      };
    } else {
      return {
        id: c.id,
        name: c.title,
        type: "group",
        created_at: c.created_at,
      };
    }
  });
  return conversations
}
