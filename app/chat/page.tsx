import { getUserChats } from "@/lib/data-services";
import HomeHeader from "./HomeHeader";
import Conversations from "./Conversation";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabaseServer";
import { getUser } from "@/lib/api-users";

export default async function page() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }, error
  } = await supabase.auth.getUser();
  console.log(user);
  const userInfo = await getUser(user?.id ?? "");
  const chats = await getUserChats(user?.email ?? "")

  if (error || !user) {
    redirect("/login");
  }
  return (
    <div className="max-w-lg md:max-w-xl mx-auto py-12 space-y-6">
      <HomeHeader userId={user.id} />
      {chats.length > 0 ? "Yes" : "No"}
    </div>
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
