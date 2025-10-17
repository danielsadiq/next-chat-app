// import { getUserChats } from "@/lib/data-services";
// import HomeHeader from "./HomeHeader";
// import Conversation from "./Conversation";
import { getUser } from "@/lib/api-users";

export default async function page() {
  const user = await getUser("danielsadiq937@gmail.com");
  console.log(user)
  return (
    <div className="max-w-lg md:max-w-xl mx-auto py-12 space-y-6">
      {/* <HomeHeader /> */}
      {/* <Conversations /> */}
      Jeol
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
