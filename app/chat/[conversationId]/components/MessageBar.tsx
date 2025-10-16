"use client"

import { useUser } from "@/context/UserContext";
import { createMessage } from "@/lib/data-services";
import { useRef } from "react";

export default function MessageBar({convoId}: {convoId:string}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {user} = useUser();
  // useEffect(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [messages]);
  async function handleSend(e: React.FormEvent) {
      e.preventDefault();
      const content = inputRef.current?.value?.trim();
      if (!content) return;
  
      const newMessage = {
        conversation_id: convoId,
        sender_id: user?.id ?? "null",
        content,
        type: "text",
      };
      await createMessage(newMessage);
      inputRef.current!.value = "";
    }
  return (
    <form
      onSubmit={handleSend}
      className="sticky bottom-0 flex items-center gap-2 bg-white p-3 border-t border-gray-200"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Send
      </button>
    </form>
  )
}