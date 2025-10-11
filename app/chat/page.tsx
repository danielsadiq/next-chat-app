import { getUserChats } from "@/lib/dataServices";
import { TimestampFormatter } from "@/utils/timeStampFormatter";

export default function page() {
  return (
    <div className="px-20 py-12 h-screen">
      <Header />
      <Body />
    </div>
  );
}

function Header() {
  return (
    <div className="flex justify-between">
      <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black"></div>
      <h1 className="text-3xl font-bold">Chat App</h1>
      <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black"></div>
    </div>
  );
}

async function Body() {
  const chats = await getUserChats("daniel@example.com");
  console.log(chats);

  return (
    <main className="mt-12 p-6">
      {chats?.map((chat) => (
        <div className="flex items-center gap-4 my-4" key={chat.id}>
          <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black">
          </div>
          <div className="flex-1">
            <h2 className="font-bold">{chat.name}</h2>
            <p>{chat.lastMessage?.content}</p>
          </div>
          <div className="ml-auto">
            <span>{TimestampFormatter.format(chat.lastMessage?.timestamp)}</span>
          </div>
        </div>
      ))}
    </main>
  );
}
