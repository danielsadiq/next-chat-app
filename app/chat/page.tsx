import { getUserChats } from "@/lib/data-services";
import HomeHeader from "./HomeHeader";
import Conversation from "./Conversation";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import GetStartedPage from "@/components/GetStartedPage";
import ConversationList from "./ConversationList";

export default async function page() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const chats = await getUserChats(user?.email ?? "");

  if (error || !user) {
    redirect("/login");
  }
  return (
    <>
      <HomeHeader userId={user.id} />
        {chats.length > 0 ? (
          <ConversationList chats={chats} />
        ) : (
          <GetStartedPage />
        )}
    </>
  );
}

// async function Conversations() {
//   const chats = await getUserChats("danielsadiq93@gmail.com");
//   return (
//     <main>
//       {chats?.map((chat) => (
//         <Conversation chat={chat} key={chat.id} />
//       ))}
//     </main>
//   );
// }
