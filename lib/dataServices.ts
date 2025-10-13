import identicon from "github-identicon";
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
          profiles (email,display_name)
        )
      ),
      profiles!inner(email)
    `
    )
    .eq("profiles.email", email); // 👈 filter directly by email

  if (error) console.error(error);
  console.log(data);

  // Post-process results:
  const conversations = data?.map((part) => {
    const c: ConversationType = part.conversations;
    const lastMessage = c.last_message
      ? {
          content: c.last_message.content,
          sender: c.last_message.sender.display_name,
          timestamp: c.last_message.created_at,
        }
      : null;
    let name = c.title;
    if (c.type === "private") {
      const other = c.participants
        ?.map((p) => p.profiles)
        .find((p) => p.email !== part.profiles[0].email);
      name = other?.display_name || "Unknown";
    }

    return {
      id: c.id,
      name,
      type: "private",
      created_at: c.created_at,
      lastMessage: lastMessage,
    };
  });
  return conversations;
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
  console.log(data);
  return data;
}

export async function createUser() {
  const { data: profile, error } = await supabase
    .from("profiles")
    .insert([
      {
        display_name: "James",
        about: "Hey there! I'm on chatapp",
        email: "james@email.com",
      },
    ])
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }
  // 1. Generate avatar
  const buffer = identicon(profile.id);

  // 2. Upload to supabase storage
  const filePath = `${profile.id}.png`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, buffer, {
      cacheControl: "3600",
      contentType: "image/png",
      upsert: false,
    });
  if (uploadError) {
    console.log(uploadError);
  }

  // 🌐 3. Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath);
  console.log(publicUrl);

  // 🧾 4. Save to profiles table
  const { error: dbError } = await supabase
    .from("profiles")
    .update({
      avatar_url: publicUrl,
    })
    .eq("id", profile.id);

  if (dbError) {
    console.error(dbError);
  }
  return profile;
}
