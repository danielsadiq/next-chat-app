import { getMessages } from "@/lib/dataServices";
import Body from "./Body";
// import { subscribeToMessages } from "@/lib/services";
// import { useEffect, useState } from "react";

export default function Page({params}: {params: {id:string}}) {
  const {id: convoId} = params
  // const [messages, setMessages] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  console.log(convoId)

  // useEffect(() => {
  //   // 1️⃣ Fetch existing messages
  //   (async () => {
  //     const msgs = await getMessages(convoId);
  //     setMessages(msgs);
  //     setLoading(false);
  //   })();

  //   // 2️⃣ Subscribe to realtime updates
  //   const unsubscribe = subscribeToMessages(convoId, (newMessage) => {
  //     setMessages((prev) => [...prev, newMessage]);
  //   });

  //   // 3️⃣ Cleanup
  //   return unsubscribe;
  // }, [convoId]);

  // if (loading) return <p>Loading chat...</p>;

  return (
    <div className="flex flex-col gap-2 p-4">
      <Header/>
      <Body convoId={convoId} />
      {/* {messages.map((msg) => (
        <div key={msg.id} className="p-2 rounded bg-gray-100">
          <strong>{msg.sender?.display_name || "Unknown"}:</strong> {msg.content}
        </div>
      ))} */}
    </div>
  );
}



// export default function page({params}: {params: {convoId:string}}) {
//   const convos = getMessages(params.convoId);
//   return (
//     <div>
//       <Header/>
//       <div></div>
//     </div>
//   )
// }

function Header() {
  return (
    <div className="flex justify-between">
      <div className="rounded-full w-[3rem] h-[3rem]">{"<"}</div>
      <h1 className="text-3xl font-bold">Daniel</h1>
      <div className="rounded-full w-[3rem] h-[3rem] border-2 border-black"></div>
    </div>
  );
}

