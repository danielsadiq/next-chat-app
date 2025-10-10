import { supabase } from "./supabase";

export const getUsers = async function () {
  const { data: profiles, error } = await supabase.from("profiles").select("*");
  if (error) {
    console.error(error);
    throw new Error("Users could not be fetched");
  }
  return profiles;
};

export async function getUser(id:string){
  const {data:profile, error} = await supabase
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
    .single()

  if (userError || !user) throw userError || new Error("User not found")

  // Step 2️⃣: Get all conversation IDs Daniel participates in
  const { data: userConversations, error: convoError } = await supabase
    .from("participants")
    .select("conversation_id")
    .eq("user_id", user.id)


  if (convoError) throw convoError
  const conversationIds = userConversations.map((p) => p.conversation_id)
  if (!conversationIds.length) return []

  const names = await Promise.all(

    conversationIds.map(async (x) => {
      const {data} = await supabase.from("conversations").select("title").eq("id", x).single();
      return data?.title;
    })
  )
  return names

  // Step 3️⃣: Find all *other* participants (people he’s texted or who texted him)
  // const { data: contacts, error: contactsError } = await supabase
  //   .from("participants")
  //   .select(`
  //     conversation_id,
  //     profiles (
  //       id,
  //       display_name,
  //       email,
  //       status
  //     ),
  //     conversation:conversations (
  //       id,
  //       title,
  //       type,
  //       last_message_id,
  //       last_message:messages(content, created_at)
  //     )
  //   `)
  //   .in("conversation_id", conversationIds)
  //   .neq("user_id", user.id) // exclude Daniel himself
  //   .order("conversation_id", { ascending: true })

  // if (contactsError) throw contactsError

  // return contacts
}

